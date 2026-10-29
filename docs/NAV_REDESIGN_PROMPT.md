# Cursor prompt — SN Stitches header / nav redesign ("Classic, logo-only")

You are working in the SN Stitches Next.js 15 (App Router) + Tailwind v4 store. Redesign the storefront header to match the mockups in `docs/nav/` (start with `docs/nav/board-final.png`; individual screens: `final-desktop.png`, `final-desktop-open.png`, `final-tablet.png`, `final-mobile.png`, `final-mobile-open.png`). Keep it clean and conventional, like Zara/COS/Reformation or a premium Shopify theme. No decorative motifs.

## Files in scope
- `components/site/header.tsx`: **rewrite** `SiteHeader` (client component). Keep the export name and the `{ announcement }` prop so `components/site/chrome.tsx` doesn't change.
- `components/site/chrome.tsx`: only shorten the default announcement. Drop the "✂" and the WhatsApp part on mobile. Suggested text: `Free delivery over GH₵X · Pay with MoMo or card`.
- `app/store.css`: **replace** the header rules `.hd`, `.hd .w`, `.logo`, `.logo img`, `.logo b`, `.logo i`, `.nav`, `.nav a.on`, `.bag`, `.bag span`, `.ham`, `.nav-drawer`, and the header bits of the `@media (max-width:600px)` block (`.ham`, `.nav`, `.nav-drawer.open`, `.hd .w`). Remove `.kente.thin` under the announcement in the header. Don't touch unrelated rules (`.heroin`, `.progress`, etc.).
- New route: `app/(shop)/made-to-measure/page.tsx` **does not exist yet, so create it**. A simple page is enough: intro, how it works (consult on WhatsApp → measurements → fabric → fitting), and a WhatsApp CTA to `https://wa.me/233546923596`.
- Optional: `public/brand/logo-badge@2x.png` (copy from `docs/nav/logo-badge@2x.png`). It's the badge tightly cropped from `sn-stitches-logo.png`, 443×480, transparent. It's sharper than the current 240×260 `logo.webp`.

## Links (exact, only routes that exist)
```ts
type NavLink = { href: string; label: string; isActive: (p: string, q: URLSearchParams) => boolean };
const CATS = ["ankara", "kente", "evening", "casual"]; // matches app/(shop)/shop/[category] `allowed`
export const NAV: NavLink[] = [
  { href: "/shop", label: "Shop", isActive: (p, q) => p.startsWith("/shop") && q.get("sort") !== "new" && !["/shop/ankara","/shop/kente"].includes(p) }, // has dropdown
  { href: "/shop?sort=new", label: "New in", isActive: (p, q) => p.startsWith("/shop") && q.get("sort") === "new" },
  { href: "/shop/ankara", label: "Ankara", isActive: (p) => p === "/shop/ankara" },
  { href: "/shop/kente", label: "Kente", isActive: (p) => p === "/shop/kente" },
  { href: "/made-to-measure", label: "Bespoke", isActive: (p) => p.startsWith("/made-to-measure") },
  { href: "/about", label: "Our story", isActive: (p) => p === "/about" },
];
export const SHOP_MENU = [
  { href: "/shop", label: "All dresses" }, { href: "/shop/ankara", label: "Ankara" },
  { href: "/shop/kente", label: "Kente" }, { href: "/shop/evening", label: "Evening" },
  { href: "/shop/casual", label: "Casual" },
]; // then divider, "New in" (/shop?sort=new), "Bespoke · made to measure →" (/made-to-measure, magenta)
```
Bugs this fixes: "Made to measure" used to point to `/shop?length=PLAYSUIT`. Active state used `path === href`, so it never matched query routes or sub-paths. Use `usePathname()` + `useSearchParams()`, and wrap the header in `<Suspense>` in chrome.tsx if the build complains.
Don't add Account, Wishlist, Gift cards or similar. Those routes don't exist.

## Layout
**Desktop ≥ 900px.** A sticky solid white header (`#fff`) with a 1px `var(--line)` bottom border, 76px tall, a 3-column grid (`200px 1fr 200px`) and 40px side padding.
- Left: **logo badge image only**, `height:56px; width:auto`, `alt="SN Stitches"`, linking to `/`, with `aria-label="SN Stitches home"`. **No "SN Stitches" text anywhere in the header.** Delete the `<span><b>SN</b> <i>Stitches</i></span>`.
- Centre: the links, gap 34px, Jost 13.5px, letter-spacing .04em, ink colour. Active link gets a 1.5px ink underline at the bottom (`::after`). Hover goes to magenta. "Shop" gets a small chevron.
- Right: Search button, then Bag button (existing `setOpen(true)`), each a 40×40 hit area with 22px line SVG icons (stroke 1.4, round caps). The bag count is a magenta (`--mag`) pill, min 17px, white 10px text, top-right of the icon. Show it only when count > 0 and cap it at "9+". The bag button's aria-label is `Bag, N items`.
- Shop dropdown: opens on hover (150ms intent delay) and on click/Enter/ArrowDown. It's a 250px white panel with a 1px border and a soft shadow, sitting under the "Shop" link. It has a "SHOP BY STYLE" eyebrow (11px, .14em, muted), the SHOP_MENU items, a divider, New in, and Bespoke in magenta. The page behind it is dimmed `rgba(20,20,20,.35)`. It closes on Esc, outside click or route change. Use `aria-haspopup`/`aria-expanded` on the trigger.

**Mobile + tablet < 900px.** Change the breakpoint from 600px to **900px**. The header is 64px tall.
- **Logo on the LEFT**, badge only, `height:44px`.
- **Far right, in this order:** Search, Bag (with count), **Hamburger as the last item**.
- The inline nav is hidden.

**Drawer (< 900px).** It **slides in from the RIGHT**: `position:fixed; inset:0 0 0 auto; width:min(340px,88vw)`, `transform: translateX(100%)` → `0`, 250ms ease. It sits over a scrim `rgba(20,20,20,.45)`. From top to bottom:
1. A 64px top row with the badge (40px) on the left and a Close (X) button on the right.
2. A search form (GET `/shop`, `name="q"`, cream field).
3. The links: Shop all, New in, Ankara, Kente, Evening, Casual, Bespoke · made to measure, Our story. They're 16px with 14px/20px padding. Active is magenta with a 3px magenta bar on the left edge.
4. Small muted links: Size guide `/size-guide`, FAQ `/faq`, Contact `/contact`.
5. Pushed to the bottom (`margin-top:auto`), a cream "TALK TO US" block:
   - WhatsApp, green icon, `https://wa.me/233546923596`, labelled 054 692 3596
   - Instagram `https://instagram.com/sn_stitches_` (@sn_stitches_)
   - TikTok `https://tiktok.com/@sn_stitches` (@sn_stitches)
   - Prefer `settings.instagram`/`settings.tiktok` if they're passed down; pass them from chrome.tsx as optional props.

Drawer behaviour:
- `role="dialog" aria-modal="true" aria-label="Menu"`. The hamburger has `aria-expanded` and `aria-controls`.
- Focus moves to the close button when it opens and returns to the hamburger when it closes. Trap Tab inside the drawer.
- Esc closes it. Clicking the scrim closes it. It closes on route change (`useEffect` on pathname + search params).
- Lock body scroll while it's open (`document.body.style.overflow='hidden'`, then restore).
- Respect `prefers-reduced-motion` (no transition).

## Search (real, not a link)
- Desktop: the search icon opens a full-width bar under the header: an input (autofocus, placeholder "Search dresses, fabrics…") inside `<form action="/shop" method="get">` with `name="q"`, plus a close button. Esc closes it.
- Mobile: the search icon opens the same bar under the header. The drawer also has its own field.
- On `/shop?q=…` prefill the input. `lib/catalog.ts` already filters by `query.q`.

## Styles
- Palette: `--mag #B0185E`, `--gold #D4A437`, `--ink #141414`, `--cream #FBF6EE`, `--line`, `--muted`, all from globals.css. Use colour sparingly: ink text on white, magenta only for the count, active-in-drawer, hover and the Bespoke CTA.
- Fonts: Jost (`var(--sans)`) for all nav UI. Cormorant isn't used in the header.
- Announcement bar: ink background, white 12px text, letter-spacing .06em, "MoMo" in gold.
- Icons are inline SVG, `fill:none; stroke:currentColor; stroke-width:1.4`. No icon fonts.
- Focus: `:focus-visible { outline:2px solid var(--gold); outline-offset:3px }`.

## Acceptance checklist
- [ ] At 1440 and 1024 the header matches `final-desktop.png`: badge-only logo left, 6 links centred, search + bag right, nothing wraps.
- [ ] The Shop dropdown matches `final-desktop-open.png` and works with mouse and keyboard (Enter/Esc/arrows/Tab).
- [ ] At 899px and below the header matches `final-tablet.png`/`final-mobile.png`: logo left; search, bag, hamburger on the right; no inline links.
- [ ] The drawer opens from the RIGHT and matches `final-mobile-open.png`. Esc, scrim, X and link clicks all close it. Body doesn't scroll behind it. Focus is trapped and then restored.
- [ ] Active state is right on `/shop`, `/shop?sort=new`, `/shop/ankara`, `/shop/kente`, `/shop/evening` (Shop active), `/made-to-measure` and `/about`.
- [ ] "Bespoke" goes to `/made-to-measure`, and that page exists and renders.
- [ ] Search submits to `/shop?q=kente` and shows filtered results. The input is prefilled after navigating.
- [ ] No "SN Stitches" text in the header at any width. The logo is sharp on 2× screens.
- [ ] The bag count shows only when it's above 0, reads "9+" past 9, and the aria-label includes the count.
- [ ] Header is sticky, white, with a 1px bottom border. No layout shift when the cart hydrates.
- [ ] `npm run build` and lint pass. No hydration warnings.
- [ ] Known follow-up: `sort=new` currently sorts by name in `lib/catalog.ts`. Switch it to `createdAt desc` so "New in" really means new.
