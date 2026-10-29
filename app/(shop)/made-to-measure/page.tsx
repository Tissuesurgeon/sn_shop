import { whatsappHref } from "@/lib/settings";

export const metadata = { title: "Made to measure" };

const steps = [
  ["Consult on WhatsApp", "Tell us the occasion, the cloth you want, and when you need the dress."],
  ["Measurements", "We send a short guide. You reply with bust, waist, hip and length."],
  ["Fabric", "Choose from the studio cloth, or send your own Ankara or kente."],
  ["Fitting", "We cut and stitch in Accra, then arrange a fitting or delivery across Ghana."],
];

export default function MadeToMeasurePage() {
  return (
    <main id="content" className="w mtm">
      <p className="eb">Bespoke</p>
      <h1>Made to measure.</h1>
      <p className="lead">A dress cut to your measurements, stitched in Accra.</p>
      <ol>
        {steps.map(([title, body], index) => (
          <li key={title}>
            <span>0{index + 1}</span>
            <div>
              <h2>{title}</h2>
              <p className="muted">{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <a className="btn wa" href={whatsappHref("233546923596", "Hello SN Stitches, I would like a made-to-measure dress.")}>
        WhatsApp the studio
      </a>
    </main>
  );
}
