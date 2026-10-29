import Link from "next/link";
import { SiteChrome } from "@/components/site/chrome";
import "./store.css";

export default function NotFound() {
  return (
    <SiteChrome>
      <main id="content" className="w" style={{ padding: "80px 0", textAlign: "center" }}>
        <p className="num" style={{ fontSize: 120 }}>
          404
        </p>
        <h1>
          This page came <span className="sc">unstitched.</span>
        </h1>
        <p className="muted">The link may be old or the dress has sold out. Let&apos;s get you back on the thread.</p>
        <Link className="btn p" href="/shop">
          Shop the collection
        </Link>
      </main>
    </SiteChrome>
  );
}
