import Link from "next/link";
import { StatusChip } from "@/components/atelier";
import { formatGHS } from "@/lib/format";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

const tones = {
  PENDING: "pending",
  PAID: "paid",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "cancelled",
} as const;

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  await requireAdmin();
  const { status, q } = await searchParams;
  const orders = await prisma.order.findMany({
    where: {
      ...(status ? { status: status as "PENDING" } : {}),
      ...(q
        ? {
            OR: [
              { orderNumber: { contains: q, mode: "insensitive" } },
              { contactName: { contains: q, mode: "insensitive" } },
              { contactPhone: { contains: q } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="card2">
      <h3>Orders</h3>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["", "PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((item) => (
          <Link key={item || "all"} className={status === item || (!status && !item) ? "lbl on" : "lbl"} href={item ? `/admin/orders?status=${item}` : "/admin/orders"}>
            {item || "All"}
          </Link>
        ))}
      </div>
      <form>
        <input className="in" name="q" placeholder="Order #, name or phone" defaultValue={q} />
      </form>
      <table className="t">
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <Link href={`/admin/orders/${order.id}`}>
                  <b>{order.orderNumber}</b>
                </Link>
              </td>
              <td>{order.contactName}</td>
              <td>{formatGHS(order.totalPesewas)}</td>
              <td>
                <StatusChip tone={tones[order.status]}>{order.status.toLowerCase()}</StatusChip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
