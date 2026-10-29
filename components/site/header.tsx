"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cartCount, useCart } from "@/components/cart/store";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?sort=new", label: "New in" },
  { href: "/shop/ankara", label: "Ankara" },
  { href: "/shop/kente", label: "Kente" },
  { href: "/shop/evening", label: "Evening" },
  { href: "/shop?length=PLAYSUIT", label: "Made to measure" },
  { href: "/about", label: "Our story" },
];

export function SiteHeader({ announcement }: { announcement: string }) {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const count = useCart((state) => cartCount(state.lines));
  const setOpen = useCart((state) => state.setOpen);

  return (
    <>
      <div className="ann">{announcement}</div>
      <div className="kente thin" />
      <header className="hd">
        <div className="w">
          <button className="ham" type="button" aria-label="Menu" onClick={() => setMenu((open) => !open)}>
            <svg className="ic" viewBox="0 0 24 24">
              <path d="M3 7h18M3 12h12M3 17h18" />
            </svg>
          </button>
          <Link className="logo" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.webp" alt="SN Stitches" />
            <span>
              <b>SN</b> <i>Stitches</i>
            </span>
          </Link>
          <nav className="nav" aria-label="Shop">
            {links.map((link) => (
              <Link key={link.href} className={path === link.href ? "on" : ""} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <Link className="only-d" href="/shop" aria-label="Search the shop">
            <svg className="ic" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="6" />
              <path d="m20 20-4.5-4.5" />
            </svg>
          </Link>
          <button className="bag" type="button" aria-label="Open bag" onClick={() => setOpen(true)}>
            <svg className="ic" viewBox="0 0 24 24">
              <path d="M5 8h14l-1.2 12H6.2L5 8z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
            {count > 0 ? <span>{count}</span> : null}
          </button>
        </div>
        <nav className={menu ? "nav-drawer open" : "nav-drawer"} aria-label="Mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenu(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
