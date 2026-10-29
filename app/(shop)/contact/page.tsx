import { whatsappHref } from "@/lib/settings";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main id="content" className="w" style={{ padding: "64px 0 80px", textAlign: "center" }}>
      <p className="eb">Contact the studio</p>
      <h1>
        Let&apos;s talk <span className="sc">fabric.</span>
      </h1>
      <p className="muted" style={{ maxWidth: 560, margin: "0 auto 24px" }}>
        Questions about sizing, a custom order or your delivery? We usually reply on WhatsApp within the hour, Mon–Sat 9am–6pm.
      </p>
      <a className="btn wa" href={whatsappHref("233546923596", "Hello SN Stitches, I have a question about an order.")}>
        WhatsApp 054 692 3596
      </a>
      <p className="sm muted" style={{ marginTop: 18 }}>
        Accra, Ghana · Mon–Sat 9am–6pm
      </p>
    </main>
  );
}
