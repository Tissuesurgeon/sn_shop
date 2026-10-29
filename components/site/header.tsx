"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { cartCount, useCart } from "@/components/cart/store";
import { DRAWER_LINKS, NAV, SHOP_MENU, drawerLinkActive, shopMenuActive } from "./nav";

const PAY_MARK = " · Pay with";

function useCartCount() {
  return useSyncExternalStore(
    useCart.subscribe,
    () => cartCount(useCart.getState().lines),
    () => 0,
  );
}

function highlightMoMo(text: string) {
  const parts = text.split("MoMo");
  if (parts.length === 1) return text;
  return parts.map((part, index) =>
    index === 0 ? (
      part
    ) : (
      <span key={index}>
        <span className="ann-mo">MoMo</span>
        {part}
      </span>
    ),
  );
}

function Announcement({ text }: { text: string }) {
  const splitAt = text.indexOf(PAY_MARK);
  const lead = splitAt === -1 ? text : text.slice(0, splitAt);
  const pay = splitAt === -1 ? "" : text.slice(splitAt);
  return (
    <div className="ann">
      {highlightMoMo(lead)}
      {pay ? <span className="ann-pay">{highlightMoMo(pay)}</span> : null}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg className="hd-ic" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.8-3.8" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg className="hd-ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="hd-ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function handleOf(value: string | undefined, fallback: string) {
  return (value || fallback).replace(/^@/, "");
}

export function SiteHeader({
  announcement,
  instagram,
  tiktok,
}: {
  announcement: string;
  instagram?: string;
  tiktok?: string;
}) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const searchKey = searchParams.toString();
  const count = useCartCount();
  const setOpen = useCart((state) => state.setOpen);
  const menuId = useId();
  const drawerId = useId();
  const shopRef = useRef<HTMLDivElement>(null);
  const shopLinkRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const hamRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | null>(null);
  const drawerWasOpen = useRef(false);
  const pendingMenuFocus = useRef(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [draft, setDraft] = useState(query);
  const ig = handleOf(instagram, "sn_stitches_");
  const tt = handleOf(tiktok, "sn_stitches");
  const bagLabel = `Bag, ${count} items`;

  useEffect(() => {
    setDraft(query);
  }, [query]);

  useEffect(() => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    setShopOpen(false);
    setDrawer(false);
    setSearchOpen(Boolean(query));
  }, [path, searchKey, query]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!shopOpen || !pendingMenuFocus.current) return;
    pendingMenuFocus.current = false;
    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  }, [shopOpen]);

  useEffect(() => {
    if (!shopOpen) return;
    function onPointer(event: MouseEvent) {
      if (!shopRef.current?.contains(event.target as Node)) setShopOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [shopOpen]);

  useEffect(() => {
    if (!shopOpen && !searchOpen && !drawer) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setShopOpen(false);
      setSearchOpen(false);
      setDrawer(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shopOpen, searchOpen, drawer]);

  useEffect(() => {
    if (drawer) {
      drawerWasOpen.current = true;
      closeRef.current?.focus();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    if (drawerWasOpen.current) {
      drawerWasOpen.current = false;
      hamRef.current?.focus();
    }
  }, [drawer]);

  function clearHover() {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  }

  function openShopSoon() {
    clearHover();
    hoverTimer.current = window.setTimeout(() => setShopOpen(true), 150);
  }

  function onMenuKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]') ?? []);
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setShopOpen(false);
      shopLinkRef.current?.focus();
    }
  }

  function trapDrawerTab(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !drawerRef.current) return;
    const items = Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>("a, button, input, [tabindex]:not([tabindex='-1'])"),
    ).filter((node) => !node.hasAttribute("disabled"));
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <Announcement text={announcement} />
      <header className="hd">
        <div className="hd-bar">
          <Link className="logo" href="/" aria-label="SN Stitches home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-badge@2x.png" alt="SN Stitches" />
          </Link>
          <nav className="nav" aria-label="Shop">
            {NAV.map((link) =>
              link.label === "Shop" ? (
                <div
                  key={link.href}
                  className="nav-shop"
                  ref={shopRef}
                  onMouseEnter={openShopSoon}
                  onMouseLeave={() => {
                    clearHover();
                    setShopOpen(false);
                  }}
                >
                  <Link
                    ref={shopLinkRef}
                    href={link.href}
                    className={link.isActive(path, searchParams) ? "on" : ""}
                    aria-haspopup="true"
                    aria-expanded={shopOpen}
                    aria-controls={menuId}
                    onClick={(event) => {
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                      event.preventDefault();
                      setShopOpen((open) => !open);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        if (shopOpen) menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
                        else {
                          pendingMenuFocus.current = true;
                          setShopOpen(true);
                        }
                      }
                    }}
                  >
                    Shop
                    <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2.2 4.4 6 8l3.8-3.6" />
                    </svg>
                  </Link>
                  <div
                    id={menuId}
                    ref={menuRef}
                    className={shopOpen ? "shop-menu open" : "shop-menu"}
                    role="menu"
                    aria-hidden={!shopOpen}
                    onKeyDown={onMenuKey}
                  >
                    <p>Shop by style</p>
                    {SHOP_MENU.map((item) => (
                      <Link
                        key={item.href}
                        role="menuitem"
                        href={item.href}
                        className={shopMenuActive(item.href, path, searchParams) ? "on" : ""}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <hr />
                    <Link role="menuitem" href="/shop?sort=new">
                      New in
                    </Link>
                    <Link role="menuitem" className="mag" href="/made-to-measure">
                      Bespoke · made to measure →
                    </Link>
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className={link.isActive(path, searchParams) ? "on" : ""}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>
          <div className="hd-tools">
            <button
              className="hd-icon"
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
            >
              <SearchIcon />
            </button>
            <button className="bag" type="button" aria-label={bagLabel} onClick={() => setOpen(true)}>
              <BagIcon />
              {count > 0 ? <span>{count > 9 ? "9+" : count}</span> : null}
            </button>
            <button
              ref={hamRef}
              className="ham"
              type="button"
              aria-label="Menu"
              aria-expanded={drawer}
              aria-controls={drawerId}
              onClick={() => setDrawer(true)}
            >
              <svg className="hd-ic" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
        {searchOpen ? (
          <form className="hd-search" action="/shop" method="get">
            <SearchIcon />
            <input
              ref={searchRef}
              name="q"
              value={draft}
              placeholder="Search dresses, fabrics…"
              aria-label="Search dresses"
              onChange={(event) => setDraft(event.target.value)}
            />
            <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
              <CloseIcon />
            </button>
          </form>
        ) : null}
        {shopOpen ? <div className="hd-dim" onClick={() => setShopOpen(false)} /> : null}
      </header>
      {drawer ? <div className="hd-scrim" onClick={() => setDrawer(false)} /> : null}
      <div
        id={drawerId}
        ref={drawerRef}
        className={drawer ? "nav-drawer open" : "nav-drawer"}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!drawer}
        inert={!drawer}
        onKeyDown={trapDrawerTab}
      >
        <div className="drawer-top">
          <Link href="/" aria-label="SN Stitches home" onClick={() => setDrawer(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-badge@2x.png" alt="" />
          </Link>
          <button ref={closeRef} type="button" aria-label="Close menu" onClick={() => setDrawer(false)}>
            <CloseIcon />
          </button>
        </div>
        <form className="drawer-search" action="/shop" method="get">
          <SearchIcon />
          <input key={query} name="q" defaultValue={query} placeholder="Search dresses…" aria-label="Search dresses" />
        </form>
        <nav aria-label="Menu">
          {DRAWER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={drawerLinkActive(link.href, path, searchParams) ? "on" : ""}
              onClick={() => setDrawer(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="drawer-help">
          <Link href="/size-guide" onClick={() => setDrawer(false)}>
            Size guide
          </Link>
          <Link href="/faq" onClick={() => setDrawer(false)}>
            FAQ
          </Link>
          <Link href="/contact" onClick={() => setDrawer(false)}>
            Contact
          </Link>
        </div>
        <div className="drawer-talk">
          <p>Talk to us</p>
          <a href="https://wa.me/233546923596">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12.5c.4 2 2.2 3.6 4.2 3.8l1.2-1.4-1.5-1.1" />
            </svg>
            <span>WhatsApp</span>
            <em>054 692 3596</em>
          </a>
          <a href={`https://instagram.com/${ig}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" rx="4" />
              <circle cx="12" cy="12" r="3.5" />
            </svg>
            <span>Instagram</span>
            <em>@{ig}</em>
          </a>
          <a href={`https://tiktok.com/@${tt}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 6v8.2a3.2 3.2 0 1 1-2.4-3.1" />
              <path d="M14 6c.4 2.2 1.8 3.4 4 3.6" />
            </svg>
            <span>TikTok</span>
            <em>@{tt}</em>
          </a>
        </div>
      </div>
    </>
  );
}
