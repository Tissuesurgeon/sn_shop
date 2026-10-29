"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { OrderStatus, Size } from "@prisma/client";
import { canTransition } from "@/lib/order-status";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

const sizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

function cedisToPesewas(value: FormDataEntryValue | null): number {
  const cedis = Number(String(value ?? "0").replace(/,/g, ""));
  if (!Number.isFinite(cedis) || cedis < 0) return 0;
  return Math.round(cedis * 100);
}

export async function saveProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const slugBase = String(formData.get("slug") ?? name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const data = {
    name,
    slug: slugBase || `dress-${Date.now()}`,
    description: String(formData.get("description") ?? ""),
    details: String(formData.get("details") ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    length: (String(formData.get("length") ?? "MIDI") || "MIDI") as "MINI" | "MIDI" | "MAXI" | "PLAYSUIT",
    pricePesewas: cedisToPesewas(formData.get("price")),
    compareAtPesewas: formData.get("compareAt") ? cedisToPesewas(formData.get("compareAt")) : null,
    status: (String(formData.get("status") ?? "DRAFT") || "DRAFT") as "DRAFT" | "ACTIVE" | "ARCHIVED",
    isFeatured: formData.get("featured") === "on",
    madeToMeasure: formData.get("madeToMeasure") === "on",
    mtmFeePesewas: formData.get("mtmFee") ? cedisToPesewas(formData.get("mtmFee")) : null,
    leadTimeDays: Number(formData.get("leadTime") ?? 0) || null,
    categoryId: String(formData.get("categoryId") ?? ""),
  };
  if (!data.categoryId) return;
  const product = id
    ? await prisma.product.update({ where: { id }, data })
    : await prisma.product.create({ data });

  const colourName = String(formData.get("colourName") ?? "Default");
  const colourHex = String(formData.get("colourHex") ?? "#B0185E");
  for (const size of sizes) {
    const qty = Number(formData.get(`stock_${size}`) ?? 0);
    const stockQty = Number.isFinite(qty) ? Math.max(0, qty) : 0;
    const existing = await prisma.productVariant.findFirst({ where: { productId: product.id, size } });
    if (existing) {
      await prisma.productVariant.update({
        where: { id: existing.id },
        data: { colourName, colourHex, stockQty },
      });
      continue;
    }
    const sku = `SN-${product.slug}-${size}-${colourName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    await prisma.productVariant.create({
      data: { productId: product.id, size, colourName, colourHex, sku, stockQty },
    });
  }
  revalidateTag("products");
  revalidatePath("/shop");
  revalidatePath(`/admin/products/${product.id}`);
  if (!id) redirect(`/admin/products/${product.id}`);
}

export async function uploadProductImage(formData: FormData) {
  await requireAdmin();
  const productId = String(formData.get("productId") ?? "");
  const file = formData.get("file");
  if (!productId || !(file instanceof File) || file.size === 0 || file.size > 8_000_000) return;
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) return;
  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^\w.]+/g, "-");
  let url = "";
  let pathname = "";
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`products/${productId}/${safeName}`, bytes, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: file.type,
      addRandomSuffix: true,
    });
    url = blob.url;
    pathname = blob.pathname;
  } else {
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const filename = `${Date.now()}-${safeName}`;
    await writeFile(path.join(dir, filename), bytes);
    url = `/uploads/${filename}`;
    pathname = `uploads/${filename}`;
  }
  await prisma.productImage.create({
    data: { productId, url, pathname, alt: String(formData.get("alt") ?? "Dress photo") },
  });
  revalidateTag("products");
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const orderId = String(formData.get("orderId") ?? "");
  const to = String(formData.get("to") ?? "") as OrderStatus;
  const note = String(formData.get("note") ?? "");
  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } });
  if (!order || !canTransition(order.status, to)) return;
  await prisma.$transaction(async (tx) => {
    if (to === "CANCELLED" && order.stockCommitted) {
      for (const item of order.items) {
        if (item.madeToMeasure) continue;
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stockQty: { increment: item.qty } },
        });
      }
    }
    await tx.order.update({
      where: { id: orderId },
      data: { status: to, stockCommitted: to === "CANCELLED" ? false : order.stockCommitted },
    });
    await tx.orderEvent.create({
      data: { orderId, fromStatus: order.status, toStatus: to, note: note || null, actor: "admin" },
    });
  });
  revalidatePath(`/admin/orders/${orderId}`);
}

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  await prisma.storeSettings.update({
    where: { id: "default" },
    data: {
      freeDeliveryThresholdPesewas: cedisToPesewas(formData.get("threshold")),
      whatsappNumber: String(formData.get("whatsapp") ?? "233546923596"),
      contactPhone: String(formData.get("phone") ?? ""),
      instagram: String(formData.get("instagram") ?? ""),
      tiktok: String(formData.get("tiktok") ?? ""),
      announcementText: String(formData.get("announcement") ?? "") || null,
      contactEmail: String(formData.get("email") ?? "") || null,
    },
  });
  revalidatePath("/");
}
