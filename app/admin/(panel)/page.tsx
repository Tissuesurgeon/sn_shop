import Link from "next/link";
import { StatusChip } from "@/components/atelier";
import { formatGHS } from "@/lib/format";
import { statusTone } from "@/lib/order-status";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  await requireAdmin();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const week = new Date(start);
  week.setDate(week.getDate() - 6);
  const [today, weekOrders, recent, low] = await Promise.all([
    prisma.order.aggregate({
      where: { paidAt: { gte: start }, status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] } },
      _sum: { totalPesewas: true },
      _count: true,
    }),
    prisma.order.findMany({
      where: { paidAt: { gte: week }, status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] } },
      select: { totalPesewas: true, status: true },
    }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 8, include: { customer: true } }),
    prisma.productVariant.findMany({
      where: { stockQty: { lte: 2 }, isActive: true },
      include: { product: { include: { images: { take: 1, orderBy: { sortOrder: "asc" } } } } },
      orderBy: { stockQty: "asc" },
      take: 6,
    }),
  ]);
  const weekTotal = weekOrders.reduce((sum, order) => sum + order.totalPesewas, 0);
  const attention = recent.filter((order) => order.needsAttention || order.status === "PENDING" || order.status === "PAID");

  return (
    <div>
      <div className="kpis">
        <div className="kpi stitched">
          <span className="xs muted">Sales today</span>
          <div className="v" style={{ color: "var(--mag)" }}>
            {formatGHS(today._sum.totalPesewas ?? 0)}
          </div>
          <span>{today._count} paid</span>
        </div>
        <div className="kpi">
          <span className="xs muted">This week</span>
          <div className="v">{formatGHS(weekTotal)}</div>
          <span>{weekOrders.length} orders</span>
        </div>
        <div className="kpi">
          <span className="xs muted">To process</span>
          <div className="v">{attention.length}</div>
        </div>
        <div className="kpi">
          <span className="xs muted">Low stock</span>
          <div className="v">{low.length} sizes</div>
        </div>
      </div>
      <div className="card2" style={{ marginTop: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Recent orders</h3>
          <Link className="lnk" href="/admin/orders">
            All orders →
          </Link>
        </div>
        <table className="t">
          <tbody>
            {recent.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link href={`/admin/orders/${order.id}`}>
                    <b>{order.orderNumber}</b>
                  </Link>
                </td>
                <td className="only-d">{order.contactName}</td>
                <td>{formatGHS(order.totalPesewas)}</td>
                <td>
                  <StatusChip tone={statusTone(order.status)}>{order.status.toLowerCase()}</StatusChip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {recent.length === 0 ? <p className="muted">No orders yet.</p> : null}
      </div>
      <div className="card2" style={{ marginTop: 18 }}>
        <h3>Low stock</h3>
        {low.map((variant) => (
          <div className="sr" key={variant.id}>
            <span>
              {variant.product.name} · {variant.size}
            </span>
            <span>{variant.stockQty} left</span>
          </div>
        ))}
      </div>
    </div>
  );
}
