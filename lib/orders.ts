import { randomBytes } from "node:crypto";
import type { GhanaRegion, PaymentChannel, PaymentMethod, Prisma, Size } from "@prisma/client";
import { z } from "zod";
import { quoteDelivery } from "@/lib/delivery";
import { toE164 } from "@/lib/phone";
import { prisma } from "@/lib/prisma";
import { demoPaymentsEnabled, paymentsConfigured } from "@/lib/paystack";
import { GHANA_REGIONS } from "@/lib/regions";
import { sendOrderEmails } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const regionValues = GHANA_REGIONS.map((region) => region.value) as [GhanaRegion, ...GhanaRegion[]];

export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        variantId: z.string().min(1),
        qty: z.number().int().min(1).max(8),
        madeToMeasure: z.boolean(),
      }),
    )
    .min(1),
  fullName: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(10).max(20),
  email: z.string().trim().email().max(120),
  region: z.enum(regionValues),
  city: z.string().trim().min(2).max(80),
  gpsAddress: z
    .string()
    .trim()
    .max(20)
    .optional()
    .refine((value) => !value || /^[A-Za-z]{2}-\d{3,4}-\d{4}$/.test(value), "Enter a GhanaPost GPS code"),
  addressLine: z.string().trim().min(5).max(200),
  landmark: z.string().trim().max(120).optional(),
  deliveryCode: z.string().min(1),
  paymentMethod: z.enum(["MOMO", "CARD", "WHATSAPP"]),
  momoNetwork: z.enum(["MTN", "TELECEL", "AIRTELTIGO"]).optional(),
  marketingOptIn: z.boolean().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export type PricedLine = {
  variantId: string;
  productId: string;
  name: string;
  slug: string;
  size: Size;
  colourName: string;
  image: string;
  qty: number;
  madeToMeasure: boolean;
  unitPricePesewas: number;
  lineTotalPesewas: number;
  stockQty: number;
  available: boolean;
};

export async function priceCart(items: CheckoutInput["items"]): Promise<{
  lines: PricedLine[];
  subtotalPesewas: number;
  hasMadeToMeasure: boolean;
}> {
  const variants = await prisma.productVariant.findMany({
    where: { id: { in: items.map((item) => item.variantId) }, isActive: true, product: { status: "ACTIVE" } },
    include: {
      product: { include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } } },
    },
  });
  const byId = new Map(variants.map((variant) => [variant.id, variant]));
  const lines: PricedLine[] = [];
  for (const item of items) {
    const variant = byId.get(item.variantId);
    if (!variant) continue;
    const base = variant.priceOverridePesewas ?? variant.product.pricePesewas;
    const fee = item.madeToMeasure ? (variant.product.mtmFeePesewas ?? 0) : 0;
    const unit = base + fee;
    const available = item.madeToMeasure || variant.stockQty >= item.qty;
    lines.push({
      variantId: variant.id,
      productId: variant.productId,
      name: variant.product.name,
      slug: variant.product.slug,
      size: variant.size,
      colourName: variant.colourName,
      image: variant.product.images[0]?.url ?? "/sample/d1.webp",
      qty: item.qty,
      madeToMeasure: item.madeToMeasure,
      unitPricePesewas: unit,
      lineTotalPesewas: unit * item.qty,
      stockQty: variant.stockQty,
      available,
    });
  }
  return {
    lines,
    subtotalPesewas: lines.reduce((sum, line) => sum + line.lineTotalPesewas, 0),
    hasMadeToMeasure: lines.some((line) => line.madeToMeasure),
  };
}

export async function createOrder(raw: CheckoutInput) {
  const parsed = checkoutSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }
  const input = parsed.data;
  if (input.paymentMethod !== "WHATSAPP" && !demoPaymentsEnabled() && !paymentsConfigured()) {
    return {
      ok: false as const,
      error: "Payments are not configured yet. Order via WhatsApp, or ask the studio to add Paystack keys.",
    };
  }
  const phone = toE164(input.phone);
  if (!phone) return { ok: false as const, error: "Enter a 10-digit Ghana number, e.g. 024 412 7788" };
  if (!rateLimit(`order:${phone}`, 8, 15 * 60 * 1000)) {
    return { ok: false as const, error: "Too many attempts. Please wait a few minutes." };
  }

  const priced = await priceCart(input.items);
  if (priced.lines.length !== input.items.length || priced.lines.some((line) => !line.available)) {
    return { ok: false as const, error: "A size in your bag just sold out. Review your bag and try again." };
  }

  const [settings, option] = await Promise.all([
    prisma.storeSettings.findUnique({ where: { id: "default" } }),
    prisma.deliveryOption.findUnique({ where: { code: input.deliveryCode } }),
  ]);
  if (!option || !option.isActive) return { ok: false as const, error: "Choose a delivery option." };
  const quote = quoteDelivery(option, {
    region: input.region,
    subtotalPesewas: priced.subtotalPesewas,
    freeThresholdPesewas: settings?.freeDeliveryThresholdPesewas ?? 150000,
    hasMadeToMeasure: priced.hasMadeToMeasure,
  });
  if (!quote.available) return { ok: false as const, error: "That delivery option is not available for this order." };

  const totalPesewas = priced.subtotalPesewas + quote.feePesewas;
  const customer = await prisma.customer.upsert({
    where: { phone },
    create: {
      fullName: input.fullName,
      phone,
      email: input.email,
      marketingOptIn: input.marketingOptIn ?? false,
    },
    update: {
      fullName: input.fullName,
      email: input.email,
      marketingOptIn: input.marketingOptIn ?? false,
    },
  });

  const [next] = await prisma.$queryRaw<{ next: bigint }[]>`SELECT nextval('order_number_seq') AS next`;
  const order = await prisma.order.create({
    data: {
      orderNumber: `SNS-${next?.next ?? ""}`,
      paymentMethod: input.paymentMethod as PaymentMethod,
      momoNetwork: input.paymentMethod === "MOMO" ? (input.momoNetwork ?? null) : null,
      customer: { connect: { id: customer.id } },
      contactName: input.fullName,
      contactPhone: phone,
      contactEmail: input.email,
      region: input.region,
      city: input.city,
      gpsAddress: input.gpsAddress || null,
      addressLine: input.addressLine,
      landmark: input.landmark || null,
      deliveryOption: { connect: { id: option.id } },
      deliveryFeePesewas: quote.feePesewas,
      subtotalPesewas: priced.subtotalPesewas,
      totalPesewas,
      items: {
        create: priced.lines.map((line) => ({
          productId: line.productId,
          variantId: line.variantId,
          productName: line.name,
          size: line.size,
          colourName: line.colourName,
          unitPricePesewas: line.unitPricePesewas,
          qty: line.qty,
          madeToMeasure: line.madeToMeasure,
          lineTotalPesewas: line.lineTotalPesewas,
        })),
      },
      events: {
        create: { actor: "customer", toStatus: "PENDING", note: "Order placed" },
      },
    },
  });

  if (input.paymentMethod === "WHATSAPP") {
    const text = [
      `Hello SN Stitches, I'd like to order ${order.orderNumber}.`,
      ...priced.lines.map((line) => `${line.qty}× ${line.name} (${line.size}${line.madeToMeasure ? ", made to measure" : ""})`),
      `Total ${totalPesewas / 100} GHS`,
      `${input.fullName}, ${phone}`,
      `${input.addressLine}, ${input.city}`,
    ].join("\n");
    const number = settings?.whatsappNumber ?? "233546923596";
    return {
      ok: true as const,
      orderNumber: order.orderNumber,
      token: order.accessToken,
      whatsappUrl: `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
    };
  }

  const reference = `pay_${order.id}_${randomBytes(3).toString("hex")}`;
  await prisma.payment.create({
    data: {
      orderId: order.id,
      reference,
      amountPesewas: totalPesewas,
      channel: (input.paymentMethod === "CARD" ? "CARD" : "MOBILE_MONEY") as PaymentChannel,
    },
  });

  if (demoPaymentsEnabled()) {
    await markOrderPaid(reference, { amountPesewas: totalPesewas, currency: "GHS", channel: input.paymentMethod });
    return { ok: true as const, orderNumber: order.orderNumber, token: order.accessToken, demo: true };
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      amount: totalPesewas,
      currency: "GHS",
      reference,
      channels: input.paymentMethod === "CARD" ? ["card"] : ["mobile_money"],
      callback_url: `${site}/api/paystack/callback`,
      metadata: { order_id: order.id, order_number: order.orderNumber },
    }),
  });
  const payload = (await response.json()) as {
    status?: boolean;
    data?: { access_code?: string; reference?: string };
    message?: string;
  };
  if (!response.ok || !payload.status || !payload.data?.access_code) {
    return { ok: false as const, error: payload.message ?? "Paystack could not start this payment." };
  }
  return {
    ok: true as const,
    orderNumber: order.orderNumber,
    token: order.accessToken,
    accessCode: payload.data.access_code,
    reference,
  };
}

export async function markOrderPaid(
  reference: string,
  verified: { amountPesewas: number; currency: string; channel?: string; raw?: unknown },
) {
  const result = await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findUnique({
      where: { reference },
      include: { order: { include: { items: true } } },
    });
    if (!payment) return { ok: false as const, reason: "missing" as const };
    if (verified.currency !== "GHS" || verified.amountPesewas !== payment.order.totalPesewas) {
      await tx.order.update({ where: { id: payment.orderId }, data: { needsAttention: true } });
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED", raw: (verified.raw ?? undefined) as Prisma.InputJsonValue | undefined },
      });
      return { ok: false as const, reason: "mismatch" as const };
    }
    if (payment.status === "SUCCESS" && payment.order.status !== "PENDING") {
      return { ok: true as const, first: false, orderId: payment.orderId };
    }
    if (payment.order.status !== "PENDING") {
      return { ok: true as const, first: false, orderId: payment.orderId };
    }

    let needsAttention = false;
    for (const item of payment.order.items) {
      if (item.madeToMeasure) continue;
      const updated = await tx.productVariant.updateMany({
        where: { id: item.variantId, stockQty: { gte: item.qty } },
        data: { stockQty: { decrement: item.qty } },
      });
      if (updated.count === 0) needsAttention = true;
    }

    await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "SUCCESS",
        verifiedAt: new Date(),
        channel: verified.channel === "CARD" ? "CARD" : verified.channel === "WHATSAPP" ? "OTHER" : "MOBILE_MONEY",
        raw: (verified.raw ?? undefined) as Prisma.InputJsonValue | undefined,
      },
    });
    await tx.order.update({
      where: { id: payment.orderId },
      data: {
        status: "PAID",
        paidAt: new Date(),
        stockCommitted: true,
        needsAttention,
        notifiedAt: new Date(),
      },
    });
    await tx.orderEvent.create({
      data: {
        orderId: payment.orderId,
        fromStatus: "PENDING",
        toStatus: "PAID",
        actor: "paystack",
        note: "Payment verified",
      },
    });
    return { ok: true as const, first: true, orderId: payment.orderId };
  });

  if (result.ok && result.first) {
    const order = await prisma.order.findUnique({
      where: { id: result.orderId },
      include: { items: true, deliveryOption: true },
    });
    if (order) {
      try {
        await sendOrderEmails(order);
      } catch (error) {
        console.error("Order email failed", error);
      }
    }
  }
  return result;
}
