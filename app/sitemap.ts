import type { MetadataRoute } from "next";
import { listActiveProducts } from "@/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const products = await listActiveProducts();
  const staticPaths = ["", "/shop", "/about", "/contact", "/size-guide", "/faq", "/privacy", "/terms", "/returns"];
  return [
    ...staticPaths.map((path) => ({ url: `${site}${path || "/"}` })),
    ...["ankara", "kente", "evening", "casual"].map((slug) => ({ url: `${site}/shop/${slug}` })),
    ...products.map((product) => ({ url: `${site}/product/${product.slug}` })),
  ];
}
