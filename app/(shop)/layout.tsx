import { SiteChrome } from "@/components/site/chrome";
import "../store.css";

const organization = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "SN Stitches",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  telephone: "+233546923596",
  address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
  sameAs: ["https://instagram.com/sn_stitches_", "https://www.tiktok.com/@sn_stitches"],
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteChrome>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      {children}
    </SiteChrome>
  );
}
