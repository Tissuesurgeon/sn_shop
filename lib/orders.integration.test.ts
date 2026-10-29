import { afterAll, describe, expect, it, vi } from "vitest";
import { prisma } from "./prisma";

const demo = process.env.NEXT_PUBLIC_DEMO_PAYMENTS === "true" && process.env.NODE_ENV !== "production";

describe("paid orders", () => {
  const created: string[] = [];

  afterAll(async () => {
    if (created.length === 0) return;
    await prisma.payment.deleteMany({ where: { orderId: { in: created } } });
    await prisma.order.deleteMany({ where: { id: { in: created } } });
    await prisma.$disconnect();
  });

  it.skipIf(!demo)("marks one demo order paid, decrements stock once, and logs both emails", async () => {
    const variant = await prisma.productVariant.findFirst({
      where: { product: { slug: "sika-tie-dye-playsuit" }, size: "M", stockQty: { gte: 1 } },
    });
    expect(variant).toBeTruthy();
    if (!variant) return;
    if (variant.stockQty < 2) {
      await prisma.productVariant.update({ where: { id: variant.id }, data: { stockQty: 2 } });
    }
    const before = Math.max(variant.stockQty, 2);
    const logs: string[] = [];
    const spy = vi.spyOn(console, "log").mockImplementation((...args: unknown[]) => {
      logs.push(args.map(String).join(" "));
    });

    try {
    const { createOrder, markOrderPaid } = await import("./orders");
    const result = await createOrder({
      items: [{ variantId: variant.id, qty: 1, madeToMeasure: false }],
      fullName: "Ama Mensah",
      phone: "0244127788",
      email: "ama@example.com",
      region: "GREATER_ACCRA",
      city: "Accra",
      addressLine: "12 Oxford Street, Osu",
      deliveryCode: "ACCRA_NEXT_DAY",
      paymentMethod: "CARD",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const order = await prisma.order.findUnique({
      where: { orderNumber: result.orderNumber },
      include: { payments: true },
    });
    expect(order?.status).toBe("PAID");
    if (order) created.push(order.id);
    const after = await prisma.productVariant.findUnique({ where: { id: variant.id } });
    expect(after?.stockQty).toBe(before - 1);

    const payment = order?.payments[0];
    expect(payment?.status).toBe("SUCCESS");
    if (payment) {
      const replay = await markOrderPaid(payment.reference, {
        amountPesewas: order?.totalPesewas ?? 0,
        currency: "GHS",
        channel: "CARD",
      });
      expect(replay.ok && replay.first).toBe(false);
    }
    const again = await prisma.productVariant.findUnique({ where: { id: variant.id } });
    expect(again?.stockQty).toBe(before - 1);

    const ownerMails = logs.filter((line) => line.includes("New paid order"));
    const receipts = logs.filter((line) => line.includes("Your SN Stitches order"));
    expect(ownerMails).toHaveLength(1);
    expect(receipts).toHaveLength(1);
    } finally {
      spy.mockRestore();
      await prisma.productVariant.update({ where: { id: variant.id }, data: { stockQty: before } });
    }
  });
});
