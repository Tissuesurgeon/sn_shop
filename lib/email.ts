import type { DeliveryOption, Order, OrderItem } from "@prisma/client";
import { formatGHS } from "@/lib/format";

type FullOrder = Order & { items: OrderItem[]; deliveryOption: DeliveryOption };

function shell(title: string, body: string) {
  return `<div style="max-width:560px;margin:0 auto;padding:32px 20px;background:#FBF6EE;color:#141414;font-family:Georgia,serif">
    <p style="letter-spacing:0.18em;text-transform:uppercase;color:#B8891F;font-size:12px">SN Stitches</p>
    <h1 style="font-size:32px;margin:8px 0 16px">${title}</h1>
    <div style="height:6px;background:#D4A437;margin-bottom:20px"></div>
    ${body}
    <p style="color:#6E655C;font-size:13px;margin-top:28px">Fashion · Design · Stitch · Accra</p>
  </div>`;
}

export async function sendOrderEmails(order: FullOrder) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const owner = process.env.ORDER_NOTIFY_EMAIL;
  const from = process.env.EMAIL_FROM || "SN Stitches <orders@localhost>";
  const whatsapp = `https://wa.me/${order.contactPhone.replace(/\D/g, "")}`;
  const items = order.items
    .map((item) => `${item.qty} × ${item.productName} · ${item.size} · ${formatGHS(item.lineTotalPesewas)}`)
    .join("<br>");

  const ownerHtml = shell(
    `New paid order ${order.orderNumber}`,
    `<p>${items}</p>
     <p>Total ${formatGHS(order.totalPesewas)} · ${order.deliveryOption.label}</p>
     <p>${order.contactName}<br>${order.contactPhone}<br>${order.addressLine}, ${order.city}${order.landmark ? ` · ${order.landmark}` : ""}</p>
     <p><a href="${whatsapp}" style="color:#B0185E">Chat customer on WhatsApp</a> · <a href="${site}/admin/orders/${order.id}" style="color:#B0185E">Open in admin</a></p>`,
  );

  const receiptHtml = shell(
    `Receipt ${order.orderNumber}`,
    `<p>Thank you, ${order.contactName}. Your order is paid and the studio is stitching it.</p>
     <p>${items}</p>
     <p>Total ${formatGHS(order.totalPesewas)}. ${order.deliveryOption.etaText}.</p>
     <p><a href="https://wa.me/233546923596" style="color:#B0185E">WhatsApp SN Stitches</a></p>`,
  );

  await deliver(from, owner, `New paid order ${order.orderNumber}`, ownerHtml);
  await deliver(from, order.contactEmail, `Your SN Stitches order ${order.orderNumber}`, receiptHtml);
}

async function deliver(from: string, to: string | null | undefined, subject: string, html: string) {
  if (!to) {
    console.log(`Email skipped (no recipient): ${subject}`);
    return;
  }
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`Email to ${to}: ${subject}\n${html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}`);
    return;
  }
  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const { error } = await resend.emails.send({ from, to, subject, html });
  if (error) throw new Error(error.message);
}
