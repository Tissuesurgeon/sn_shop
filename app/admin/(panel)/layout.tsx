import type { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/auth";
import { requireAdmin } from "@/lib/require-admin";
import "../../store.css";

const links = [
  ["/admin", "Dashboard"],
  ["/admin/orders", "Orders"],
  ["/admin/products", "Products"],
  ["/admin/settings", "Settings"],
];

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const session = await requireAdmin();
  const name = session.user?.name ?? "Owner";

  return (
    <div className="adm">
      <aside className="side">
        <div className="lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.webp" alt="" />
          <div>
            <b style={{ color: "#fff" }}>SN Stitches</b>
            <small style={{ display: "block", color: "var(--gold)", letterSpacing: "0.14em", fontSize: 11 }}>
              ATELIER ADMIN
            </small>
          </div>
        </div>
        {links.map(([href, label]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
        <form
          style={{ marginTop: "auto" }}
          action={async () => {
            "use server";
            await requireAdmin();
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button className="btn g s" type="submit" style={{ color: "#fff", borderColor: "#fff" }}>
            Sign out
          </button>
        </form>
      </aside>
      <main className="amain">
        <div className="atop">
          <div>
            <p className="eb">Atelier admin</p>
            <h1>Good morning, {name.split(" ")[0]}</h1>
          </div>
          <Link className="btn p s" href="/admin/products/new">
            + Add product
          </Link>
        </div>
        {children}
      </main>
      <nav className="abot">
        {links.map(([href, label]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
