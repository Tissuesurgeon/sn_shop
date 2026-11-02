import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { BuyBox } from "@/components/product/buy-box";
import { isAdminRole, type SessionRole } from "@/lib/admin-access";
import { coverImage, getActiveProduct, type CatalogProduct } from "@/lib/catalog";
import { formatGHS } from "@/lib/format";

async function loadProduct(slug: string, preview?: string) {
  let includeDraft = false;
  if (preview === "1") {
    const session = await auth();
    includeDraft = isAdminRole(session?.user?.role as SessionRole);
  }
  return getActiveProduct(slug, { includeDraft });
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string | string[] }>;
}): Promise<Metadata> {
  const product = await loadProduct((await params).slug, firstValue((await searchParams).preview));
  if (!product) return { title: "Dress" };
  const cover = coverImage(product.images);
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: cover ? [cover.url] : [],
    },
  };
}

function GalleryTile({
  media,
  preload,
}: {
  media: CatalogProduct["images"][number];
  preload: "metadata" | "none";
}) {
  const video = media.kind === "VIDEO";
  return (
    <div className={video ? "galt stitched is-video" : "galt stitched"}>
      {video ? (
        <video
          src={media.url}
          poster={media.posterUrl ?? undefined}
          muted
          autoPlay
          loop
          playsInline
          preload={preload}
          aria-label={media.alt}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.url} alt={media.alt} />
      )}
    </div>
  );
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string | string[] }>;
}) {
  const product = await loadProduct((await params).slug, firstValue((await searchParams).preview));
  if (!product) notFound();
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const cover = coverImage(product.images);
  const rest = product.images.filter((media) => media !== cover);
  const firstVideo = rest.find((media) => media.kind === "VIDEO")?.url;
  const photos = product.images.filter((media) => media.kind !== "VIDEO");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: photos.map((image) => image.url),
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
          <img src={cover?.url ?? "/sample/d1.webp"} alt={cover?.alt ?? product.name} />
        </div>
        {rest.length > 0 ? (
          <div className="grest">
            {rest.map((media) => (
              <GalleryTile
                key={`${media.sortOrder}-${media.url}`}
                media={media}
                preload={media.kind === "VIDEO" && media.url === firstVideo ? "metadata" : "none"}
              />
            ))}
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
