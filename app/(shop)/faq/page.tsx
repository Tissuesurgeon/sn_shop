const faqs = [
  ["Delivery", "Greater Accra: same-day before 12:00 (GH₵40) or next-day (GH₵25). Other regions: 2–4 working days, GH₵55. Free delivery over GH₵1,500, except studio pickup."],
  ["Payment", "MTN, Telecel and AirtelTigo MoMo, plus card, via Paystack. You can also place the order on WhatsApp and the studio will confirm it."],
  ["Returns", "Unworn ready-to-wear can be exchanged within 7 days. Made-to-measure includes free alterations for 14 days."],
  ["Made to measure", "Add it on the dress page. After checkout, send bust, waist, hip and length on WhatsApp. Ready in 7–10 days."],
  ["Care", "Wax prints and linen: cold wash. Satin, velvet and tie-dye: follow the care note on the dress."],
];

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <main id="content" className="w" style={{ padding: "56px 0 80px" }}>
      <p className="eb">FAQ</p>
      <h1>
        Delivery, returns & <span className="sc">more</span>
      </h1>
      {faqs.map(([title, copy]) => (
        <details key={title} open style={{ borderTop: "1px dashed rgba(176,24,94,.4)", padding: "14px 0" }}>
          <summary style={{ fontFamily: "var(--serif)", fontSize: 24, cursor: "pointer" }}>{title}</summary>
          <p className="muted">{copy}</p>
        </details>
      ))}
    </main>
  );
}
