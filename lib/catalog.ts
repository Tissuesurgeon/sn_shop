import { cache } from "react";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { activeProductSelect } from "@/lib/catalog-select";

export { activeProductSelect };

export type CatalogProduct = Prisma.ProductGetPayload<{ select: typeof activeProductSelect }>;

export const listActiveProducts = cache(async () => {
  return prisma.product.findMany({
    where: { status: "ACTIVE" },
    orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    select: activeProductSelect,
  });
});

export const getActiveProduct = cache(async (slug: string) => {
  return prisma.product.findFirst({
    where: { slug, status: "ACTIVE" },
    select: activeProductSelect,
  });
});

export function productInStock(product: CatalogProduct): boolean {
  return product.variants.some((variant) => variant.stockQty > 0);
}

export function lengthLabel(length: string): string {
  if (length === "PLAYSUIT") return "Playsuit";
  return length.charAt(0) + length.slice(1).toLowerCase();
}

export type ShopQuery = {
  category?: string;
  size?: string;
  length?: string;
  sort?: string;
  q?: string;
  stock?: string;
  min?: string;
  max?: string;
};

export function filterCatalog(products: CatalogProduct[], query: ShopQuery): CatalogProduct[] {
  let rows = products.slice();
  if (query.category) {
    rows = rows.filter((product) => product.category.slug === query.category);
  }
  if (query.size) {
    rows = rows.filter((product) =>
      product.variants.some((variant) => variant.size === query.size && variant.stockQty > 0),
    );
  }
  if (query.length) {
    rows = rows.filter((product) => product.length === query.length);
  }
  if (query.q) {
    const needle = query.q.toLowerCase();
    rows = rows.filter((product) => product.name.toLowerCase().includes(needle));
  }
  if (query.stock === "1") {
    rows = rows.filter(productInStock);
  }
  const min = Number(query.min);
  const max = Number(query.max);
  if (Number.isFinite(min) && query.min) rows = rows.filter((product) => product.pricePesewas >= min);
  if (Number.isFinite(max) && query.max) rows = rows.filter((product) => product.pricePesewas <= max);

  if (query.sort === "price-asc") rows.sort((a, b) => a.pricePesewas - b.pricePesewas);
  else if (query.sort === "price-desc") rows.sort((a, b) => b.pricePesewas - a.pricePesewas);
  else if (query.sort === "new") rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return rows;
}
