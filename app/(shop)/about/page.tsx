export const metadata = { title: "Our story" };

export default function AboutPage() {
  return (
    <main id="content" className="w" style={{ padding: "64px 0 80px" }}>
      <p className="eb">Our story</p>
      <h1 style={{ fontSize: 64 }}>
        Fashion. Design.
        <br />
        <span className="sc">Stitch.</span>
      </h1>
      <p className="lead">
        SN Stitches began with one Singer machine, a stack of wax-print offcuts and a promise: dresses that fit Ghanaian women properly, made by Ghanaian hands.
      </p>
      <p className="muted" style={{ maxWidth: 640 }}>
        The studio is in Accra. We cut Ankara, kente-inspired cloth and evening fabrics to size, finish every seam by hand, and send dresses to all 16 regions. Instagram @sn_stitches_ · TikTok @sn_stitches · 054 692 3596.
      </p>
    </main>
  );
}
