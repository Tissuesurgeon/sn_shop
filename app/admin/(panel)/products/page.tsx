import Link from "next/link";
import { requireAdmin } from "@/lib/require-admin";
import { formatGHS } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  await requireAdmin();
  const products = await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true, variants: true, images: { take: 1, orderBy: { sortOrder: "asc" } } },
  });

  return (
    <div className="card2">
      <h3>Products</h3>
      <table className="t">
        <thead>
          <tr>
            <th>Dress</th>
            <th>Status</th>
            <th>Price</th>
            <th className="only-d">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <Link href={`/admin/products/${product.id}`}>
                  <b>{product.name}</b>
                </Link>
                <div className="xs muted">
                  {product.category.name}
                  {product.isSample ? " · sample" : ""}
                </div>
              </td>
              <td>{product.status.toLowerCase()}</td>
              <td>{formatGHS(product.pricePesewas)}</td>
              <td className="only-d">
                {product.variants.map((variant) => (
                  <span key={variant.id} className="xs" style={{ marginRight: 8 }}>
                    {variant.size}:{variant.stockQty}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
