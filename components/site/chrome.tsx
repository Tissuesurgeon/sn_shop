import { Suspense } from "react";
import { CartDrawer } from "@/components/cart/drawer";
import { formatGHS } from "@/lib/format";
import { getSettings } from "@/lib/settings";
import { SiteFooter } from "./footer";
import { SiteHeader } from "./header";

function HeaderFallback({ announcement }: { announcement: string }) {
  return (
    <>
      <div className="ann">{announcement}</div>
      <header className="hd">
        <div className="hd-bar" />
      </header>
    </>
  );
}

export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const announcement =
    settings.announcementText ||
    `Free delivery over ${formatGHS(settings.freeDeliveryThresholdPesewas)} · Pay with MoMo or card`;

  return (
    <div className="shop-root">
      <Suspense fallback={<HeaderFallback announcement={announcement} />}>
        <SiteHeader announcement={announcement} instagram={settings.instagram} tiktok={settings.tiktok} />
      </Suspense>
      {children}
      <SiteFooter
        phone="054 692 3596"
        instagram={settings.instagram}
        tiktok={settings.tiktok}
      />
      <CartDrawer freeThreshold={settings.freeDeliveryThresholdPesewas} />
    </div>
  );
}
