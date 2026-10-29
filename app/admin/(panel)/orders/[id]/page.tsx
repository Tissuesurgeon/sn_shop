import { notFound } from "next/navigation";
import { StatusChip } from "@/components/atelier";
import { updateOrderStatus } from "../../actions";
import { formatGHS } from "@/lib/format";
import { canTransition, statusTone } from "@/lib/order-status";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { regionLabel } from "@/lib/regions";
import type { OrderStatus } from "@prisma/client";

const next: OrderStatus[] = ["PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const order = await prisma.order.findUnique({
    where: { id: (await params).id },
    include: { items: true, events: { orderBy: { createdAt: "asc" } }, payments: true, deliveryOption: true },
  });
  if (!order) notFound();
  const phone = order.contactPhone.replace(/\D/g, "");

  return (
    <div className="card2">
      <p className="eb">{order.orderNumber}</p>
      <StatusChip tone={statusTone(order.status)}>{order.status.toLowerCase()}</StatusChip>
      <h2>{order.contactName}</h2>
      <p>
        <a className="btn wa s" href={`https://wa.me/${phone}`}>
          WhatsApp
        </a>{" "}
        <a className="btn g s" href={`tel:${order.contactPhone}`}>
          Call
        </a>
      </p>
      <p className="muted">
        {order.addressLine}
        {order.landmark ? ` · ${order.landmark}` : ""}
        <br />
        {order.city}, {regionLabel(order.region)} {order.gpsAddress ? `· ${order.gpsAddress}` : ""}
        <br />
        {order.deliveryOption.label} · {formatGHS(order.totalPesewas)} · {order.paymentMethod}
      </p>
      {order.items.map((item) => (
        <div className="sr" key={item.id}>
          <span>
            {item.qty} × {item.productName} · {item.size}
          </span>
          <span>{formatGHS(item.lineTotalPesewas)}</span>
        </div>
      ))}
      <h3>Packing slip</h3>
      <div className="box">
        <p>
          <b>{order.orderNumber}</b> · {order.contactName}
        </p>
        <p className="sm">
          {order.addressLine}, {order.city}
          {order.landmark ? ` · ${order.landmark}` : ""}
        </p>
        {order.items.map((item) => (
          <p key={`slip-${item.id}`} className="sm">
            {item.qty} × {item.productName} · {item.size}
            {item.madeToMeasure ? " · made to measure" : ""}
          </p>
        ))}
      </div>
      <h3>Update status</h3>
      <form action={updateOrderStatus} style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <input type="hidden" name="orderId" value={order.id} />
        <select className="in sel" name="to" defaultValue={next.find((status) => canTransition(order.status, status))}>
          {next
            .filter((status) => canTransition(order.status, status))
            .map((status) => (
              <option key={status} value={status}>
                Mark {status.toLowerCase()}
              </option>
            ))}
        </select>
        <input className="in" name="note" placeholder="Note for the timeline" />
        <button className="btn g s" type="submit" disabled={!next.some((status) => canTransition(order.status, status))}>
          Save status
        </button>
      </form>
      <h3>Timeline</h3>
      {order.events.map((event) => (
        <p key={event.id} className="sm">
          {event.createdAt.toLocaleString("en-GH", { timeZone: "Africa/Accra" })} · {event.actor} ·{" "}
          {event.fromStatus ?? "—"} → {event.toStatus ?? "—"} {event.note ? `· ${event.note}` : ""}
        </p>
      ))}
      {order.payments.map((payment) => (
        <p key={payment.id} className="xs muted">
          {payment.reference} · {payment.status} · {formatGHS(payment.amountPesewas)}
        </p>
      ))}
    </div>
  );
}
