import { CartDrawer } from "@/components/cart/drawer";
import { formatGHS } from "@/lib/format";
import { getSettings } from "@/lib/settings";
import { SiteFooter } from "./footer";
import { SiteHeader } from "./header";

export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const announcement =
    settings.announcementText ||
    `✂ Free delivery over ${formatGHS(settings.freeDeliveryThresholdPesewas)} · Pay with MoMo or card · WhatsApp 054 692 3596`;

  return (
    <div className="shop-root">
      <SiteHeader announcement={announcement} />
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
