import { notFound } from "next/navigation";
import { ShopListing } from "@/components/shop/listing";
import type { ShopQuery } from "@/lib/catalog";

const allowed = new Set(["ankara", "kente", "evening", "casual"]);

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<ShopQuery>;
}) {
  const { category } = await params;
  if (!allowed.has(category)) notFound();
  return <ShopListing category={category} query={await searchParams} />;
}
