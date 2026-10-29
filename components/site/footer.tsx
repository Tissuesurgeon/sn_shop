import Link from "next/link";

export function SiteFooter({ phone, instagram, tiktok }: { phone: string; instagram: string; tiktok: string }) {
  return (
    <>
      <div className="kente" />
      <footer className="ft linen">
        <div className="w">
          <div className="ftg">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo.webp" alt="SN Stitches" style={{ height: 110, width: "auto" }} />
              <p style={{ letterSpacing: "0.22em", fontSize: 12, textTransform: "uppercase", color: "var(--gold7)" }}>
                Fashion • Design • Stitch
              </p>
              <p>Handmade dresses, cut & stitched in Accra.</p>
              <div className="soc">
                <a href={`https://instagram.com/${instagram}`} aria-label="Instagram">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </a>
                <a href={`https://www.tiktok.com/@${tiktok}`} aria-label="TikTok">
                  <svg viewBox="0 0 24 24">
                    <path d="M14 3v11a4 4 0 1 1-4-4" />
                    <path d="M14 3c.5 3 2.5 4.5 5 4.5" />
                  </svg>
                </a>
                <a href="https://wa.me/233546923596" aria-label="WhatsApp" style={{ background: "var(--wa)" }}>
                  <svg viewBox="0 0 24 24">
                    <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" />
                  </svg>
                </a>
                <a href="tel:+233546923596" aria-label="Call the studio" style={{ background: "var(--mag)" }}>
                  <svg viewBox="0 0 24 24">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4>Shop</h4>
              <Link href="/shop">New in</Link>
              <Link href="/shop/ankara">Ankara</Link>
              <Link href="/shop/kente">Kente</Link>
              <Link href="/shop/evening">Evening</Link>
              <Link href="/contact">Made to measure</Link>
            </div>
            <div>
              <h4>Help</h4>
              <Link href="/faq">Delivery & returns</Link>
              <Link href="/size-guide">Size guide</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Track my order</Link>
            </div>
            <div>
              <h4>Visit the studio</h4>
              <p>Accra, Ghana · Mon–Sat 9am–6pm</p>
              <p>☎ {phone}</p>
              <p>Instagram @{instagram}</p>
              <p>TikTok @{tiktok}</p>
            </div>
          </div>
          <div className="legal">
            <span>© 2026 SN Stitches. All rights reserved.</span>
            <span>
              <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> ·{" "}
              <Link href="/returns">Returns</Link> · Payments secured by Paystack
            </span>
          </div>
        </div>
      </footer>
      <a className="fab" href="https://wa.me/233546923596" aria-label="WhatsApp the studio">
        <svg style={{ width: 28, height: 28, fill: "none", stroke: "#fff", strokeWidth: 1.8 }} viewBox="0 0 24 24">
          <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" />
        </svg>
      </a>
    </>
  );
}
