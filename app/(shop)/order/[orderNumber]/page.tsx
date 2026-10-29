import { notFound } from "next/navigation";
import { StatusChip } from "@/components/atelier";
import { formatGHS } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { regionLabel } from "@/lib/regions";
import { OrderPoll } from "./poll";

const tone = {
  PENDING: "pending",
  PAID: "paid",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "cancelled",
} as const;

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderNumber: string }>;
  searchParams: Promise<{ t?: string }>;
}) {
  const { orderNumber } = await params;
  const { t } = await searchParams;
  if (!t) notFound();
  const order = await prisma.order.findFirst({
    where: { orderNumber, accessToken: t },
    include: { items: true, deliveryOption: true },
  });
  if (!order) notFound();

  return (
    <main id="content" className="w" style={{ padding: "48px 0 80px", maxWidth: 760 }}>
      <p className="eb">Order {order.orderNumber}</p>
      <h1>
        {order.status === "PAID" || order.status === "PROCESSING" ? "It's confirmed." : "We're confirming payment."}{" "}
        <span className="sc">Thank you.</span>
      </h1>
      <StatusChip tone={tone[order.status]}>{order.status.toLowerCase()}</StatusChip>
      <OrderPoll orderNumber={order.orderNumber} token={t} status={order.status} />
      <div className="box" style={{ marginTop: 24 }}>
        {order.items.map((item) => (
          <div className="sr" key={item.id}>
            <span>
              {item.qty} × {item.productName} · {item.size}
              {item.madeToMeasure ? " · made to measure" : ""}
            </span>
            <span>{formatGHS(item.lineTotalPesewas)}</span>
          </div>
        ))}
        <div className="sr">
          <span>Delivery · {order.deliveryOption.label}</span>
          <span>{formatGHS(order.deliveryFeePesewas)}</span>
        </div>
        <div className="sr">
          <b>Total</b>
          <b>{formatGHS(order.totalPesewas)}</b>
        </div>
        <p className="sm muted">
          {order.contactName} · {order.city}, {regionLabel(order.region)}
          <br />
          {order.deliveryOption.etaText}
        </p>
      </div>
      <p>
        <a className="btn wa" href="https://wa.me/233546923596">
          WhatsApp the studio
        </a>
      </p>
    </main>
  );
}
