import { saveSettings } from "../actions";
import { requireAdmin } from "@/lib/require-admin";
import { getSettings } from "@/lib/settings";

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await getSettings();
  return (
    <form className="card2" action={saveSettings}>
      <h3>Studio settings</h3>
      <div className="fld">
        <label className="lab" htmlFor="threshold">Free delivery threshold (GH₵)</label>
        <input className="in" id="threshold" name="threshold" defaultValue={settings.freeDeliveryThresholdPesewas / 100} />
      </div>
      <div className="fld">
        <label className="lab" htmlFor="whatsapp">WhatsApp number</label>
        <input className="in" id="whatsapp" name="whatsapp" defaultValue={settings.whatsappNumber} />
      </div>
      <div className="fld">
        <label className="lab" htmlFor="phone">Phone</label>
        <input className="in" id="phone" name="phone" defaultValue={settings.contactPhone} />
      </div>
      <div className="fld">
        <label className="lab" htmlFor="instagram">Instagram</label>
        <input className="in" id="instagram" name="instagram" defaultValue={settings.instagram} />
      </div>
      <div className="fld">
        <label className="lab" htmlFor="tiktok">TikTok</label>
        <input className="in" id="tiktok" name="tiktok" defaultValue={settings.tiktok} />
      </div>
      <div className="fld">
        <label className="lab" htmlFor="email">Contact email</label>
        <input className="in" id="email" name="email" defaultValue={settings.contactEmail ?? ""} />
      </div>
      <div className="fld">
        <label className="lab" htmlFor="announcement">Announcement bar</label>
        <input className="in" id="announcement" name="announcement" defaultValue={settings.announcementText ?? ""} />
      </div>
      <button className="btn p" type="submit">
        Save settings
      </button>
    </form>
  );
}
