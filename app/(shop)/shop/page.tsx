import { ShopListing } from "@/components/shop/listing";
import type { ShopQuery } from "@/lib/catalog";

export default async function ShopPage({ searchParams }: { searchParams: Promise<ShopQuery> }) {
  return <ShopListing category="" query={await searchParams} />;
}
