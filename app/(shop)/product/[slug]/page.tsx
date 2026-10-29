import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/product/buy-box";
import { getActiveProduct } from "@/lib/catalog";
import { formatGHS } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = await getActiveProduct((await params).slug);
  if (!product) return { title: "Dress" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: product.images[0] ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getActiveProduct((await params).slug);
  if (!product) notFound();
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.url),
    brand: { "@type": "Brand", name: "SN Stitches" },
    offers: {
      "@type": "Offer",
      priceCurrency: "GHS",
      price: (product.pricePesewas / 100).toFixed(2),
      availability: product.variants.some((variant) => variant.stockQty > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${site}/product/${product.slug}`,
    },
  };

  return (
    <main id="content" className="w pdp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="gallery">
        <div className="gmain foil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.images[0]?.url ?? "/sample/d1.webp"} alt={product.images[0]?.alt ?? product.name} />
        </div>
        {product.images[1] ? (
          <div className="galt stitched">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.images[1].url} alt={product.images[1].alt} />
          </div>
        ) : null}
      </div>
      <BuyBox product={product} />
      <p className="xs muted" style={{ gridColumn: "1 / -1" }}>
        {formatGHS(product.pricePesewas)} · Accra same-day before noon · free delivery over GH₵1,500
      </p>
    </main>
  );
}
