# SN Stitches — UI Specification

## ▶ The mockups are the source of truth
High-fidelity screens live in **`ui-design/`**. **Match them pixel-closely** (layout, spacing, type sizes, colours, motifs, copy) at 1440px and 390px. Interpolate sensibly in between.
- `ui-design/screens/desktop/NN-name-desktop.png` and `ui-design/screens/mobile/NN-name-mobile.png`. Full-page renders: floating bars (mobile sticky add-to-bag, admin save bar, WhatsApp FAB) are drawn at the end of the page. In the app they are fixed to the viewport.
- `ui-design/html/*.html` + `ui-design/ds.css` are the exact HTML/CSS sources of every mockup. **Open them in a browser and inspect them for exact values.** Port `ds.css` into Tailwind tokens and utilities, not the other way round.
- `ui-design/SN-Stitches-UI-Design.pdf` is the presentation. `ui-design/boards/*.png` are the overview boards.

| # | Screen | # | Screen |
|---|---|---|---|
| 00 | Design system | 07 | Order confirmation |
| 01 | Home | 08 | Our story / About |
| 02 | Shop with filters | 09 | Contact |
| 03 | Product detail (Sika Tie-Dye Playsuit) | 10 | Size guide & FAQ |
| 04 | Cart drawer | 11 | Empty bag |
| 05 | Checkout: delivery | 12 | 404 |
| 06 | Checkout: payment (MoMo network choice) | 21–28 | Admin: login, dashboard, products, product editor, orders, order detail |

Older functional prototype (flows only, superseded visually): `reference-prototype/`.

## 0. Signature visual language: "Atelier"
The store must **not** look like a generic Shopify-style template. Its identity comes from the logo and the craft of tailoring. Every screen should carry at least two of these motifs, used with restraint:

| Motif | Spec | Where |
|---|---|---|
| **Stitch seams** | `1.5px dashed #B0185E` (55–80% opacity). Cards use an **inset stitched outline** (`::after`, inset 7px, inherits radius) | section dividers, accordions, drawer header, checkout sticky bars, featured cards, focus state of inputs (`1.5px dashed` magenta + 3px magenta-50 ring) |
| **Thread line** | SVG path, magenta, `stroke-dasharray: 7 6`, 1.6px, weaving through the hero and between sections. **Motion:** draws on scroll (`stroke-dashoffset` animation, 1.2s ease-out, once). Disabled with `prefers-reduced-motion` | home hero, process section, about hero, 404 |
| **Gold foil** | 1px `#D4A437` border + inner 3px cream gap + 1px gold hairline (`.foil`). Primary buttons have an inner gold hairline. Gold-gradient button on dark backgrounds | hero/gallery photos, primary CTA, dark sections |
| **Linen texture** | cream page with two ultra-faint repeating line gradients (≈3–5% opacity). `.linen` = sand version. CSS only, no image download | page background, footer, quotes, how-to-measure |
| **Kente band** | repeating gold/ink/magenta/green stripe, 4px (thin) or 8px | under announcement bar, above footer, receipt hem, section breaks. Never more than one per viewport |
| **Silk drape** | organic magenta radial-gradient blob behind imagery | hero, about |
| **Arch crops** | `border-radius: 200px 200px 16px 16px` on hero/category/gallery images, mixed with square crops | home, shop categories, PDP, about, 404 |
| **Oversized outlined numerals** | Cormorant 600, transparent fill, 1.2px gold stroke (`-webkit-text-stroke`), 80–160px | look numbers, process steps, checkout sections, stats |
| **Hang-tag prices** | white tag with clipped point and punched hole (`clip-path` polygon + `::before` ring), gold border. `.big`, `.mag` variants | every price (cards, PDP, cart, delivery fees, admin) |
| **Tape-measure size selector** | gold tape with tick marks. Selected size = magenta segment. Sold out = struck-through | PDP, size guide, made-to-measure band |
| **Tailor-label chips** | square-ish label (radius 4) with an inner dashed border. Selected = ink with gold dashes | filters, topics, toggles |
| **Sewn-button icon** | magenta circle with 4 cream holes | cart count badge (with gold ring), toasts, confirmation seal, 404 "0", progress marker |
| **Running-stitch loader** | row of short magenta dashes animating left→right | loading states, uploads, "load more", MoMo approval wait |
| **Needle / spool** | small line icons. Spool illustration for the empty bag | empty states, made-to-measure |

**Editorial layout rules**
- Asymmetric hero: a large Cormorant headline (82px desktop / 50px mobile) with **one Great Vibes word** in magenta, overlapping photos (one arch, one stitched square), a hang-tag price on the photo, and an outlined look number.
- Shop/home grids are **not uniform**: a 2×2 feature tile, staggered columns (±60px offset on desktop), quote tiles, and a mix of arch and square crops.
- Craft storytelling blocks: **From sketch to stitch** (4 numbered steps), **Made to measure** (dark band with a tape measure and gold CTA), and an **Instagram/TikTok strip** (@sn_stitches_ / @sn_stitches).
- Subtle Ghanaian textile references only as thin accents (kente band, wax-print photography). Never pattern-filled backgrounds.

**Motion notes** (all ≤ 400ms except the thread draw, and all respect reduced motion):
- Product card hover: lift −6px, soft shadow, the photo gets a white stitched inset outline, a second image cross-fades, and "Quick add" slides up.
- Thread draw on scroll. Hang tag swings 3° on hover. Add to bag: the sewn-button badge "pops" (scale 1→1.25→1) and a toast slides in.
- Drawer slides in 350ms with a cubic-bezier(.2,.8,.2,1). The free-delivery stitch line grows.
- Running-stitch loader: dashes shift 12px per 600ms loop.

**Admin** uses the same tokens but is calmer: an ink sidebar with a kente foot, white cards, stitched highlight only on the primary KPI and the customer card, tag prices, status chips, and a pipeline stepper.
Logo: `assets/sn-stitches-logo.png` (transparent PNG, source) · `assets/logo.webp` (web, 240px) · `assets/favicon.png`.

Mood: **elegant modern African boutique**. Cream backgrounds, generous whitespace, editorial serif headlines, magenta used as the accent and CTA colour, gold for details (eyebrows, borders, dashed "stitch" lines). Never loud. The prints in the photography supply the colour.

---

## 1. Design tokens
### Colour
| Token | Hex | Use |
|---|---|---|
| `magenta-600` (primary) | **#B0185E** | primary CTA, links, price on product page, active states, badges |
| `magenta-700` | #8C1149 | CTA hover/pressed |
| `magenta-50` | #FDF3F7 | selected radio/card background |
| `gold-500` | **#D4A437** | borders, dashed stitch dividers, focus ring, footer top border |
| `gold-700` | #B8891F | eyebrow text, wordmark "SN" (AA on cream for large text) |
| `ink-900` | **#141414** | text, secondary buttons, announcement bar, story section bg |
| `cream-50` | **#FBF6EE** | page background |
| `sand-100` | #F3EADB | footer, image placeholders, alt section bg |
| `line-200` | #E6DCCB | borders, dividers |
| `muted-600` | #6E655C | secondary text (AA on cream) |
| `white` | #FFFFFF | cards, inputs, drawers' footer |
| `success-600` | #1F7A4D | paid/delivered, success toasts |
| `whatsapp-600` | #1F8F4E | WhatsApp buttons only |
| `warning-500` | #C98A0B / bg #FFF8E6 | pending, demo banner, low stock |
| `error-600` | #B3261E / bg #FDECEA | form errors, cancelled |
| `info-600` | #1F4E8C / bg #EAF1FB | processing, shipped |

Status chips (admin): pending = warning, paid = magenta, processing = info, shipped = info (dark), delivered = success, cancelled = error, needs_attention = error outline.

### Typography
- **Headings:** Cormorant Garamond 600 (500 for large display), line-height 1.1, slight negative tracking on display sizes.
- **Body / UI:** Jost 400/500 (300 for small captions), line-height 1.6.
- **Accent script:** Great Vibes, in magenta. Use it **at most once per view** (e.g. "stitched for you", "Thank you", "Stitch."), never for body text, prices or buttons.
- Eyebrows: Jost 500, 12px, uppercase, letter-spacing .22em, gold-700.
- Buttons: Jost 500, 13–14px, uppercase, letter-spacing .08em.

| Style | Mobile | Desktop |
|---|---|---|
| Display (hero h1) | 40px | 60px |
| H1 page | 34px | 52px |
| H2 section | 30px | 44px |
| H3 card/product name | 19px | 20px |
| Body | 16px | 16px |
| Small | 13–14px | 14px |
| Price (PDP) | 22px magenta | 24px |

### Spacing, radii, elevation
- 4px base scale: 4, 8, 12, 16, 20, 24, 32, 40, 56, 72, 96. Section padding 56px mobile / 72–96px desktop. Container max 1200px, gutters 20px (mobile) / 32px.
- Radii: inputs 10px, cards/images 14px, chips and buttons **pill (999px)**, drawers 0.
- Shadows: minimal. Drawer `0 0 40px rgba(0,0,0,.12)`. Cards are flat, and hover zooms the image instead of adding a shadow.
- Motion: 200–350ms ease-out. Respect `prefers-reduced-motion`.
- Signature detail: **dashed magenta or gold "stitch" lines** (2px dashed) as dividers, echoing the logo badge.

### Breakpoints (mobile-first)
`sm 480` · `md 768` · `lg 1024` · `xl 1280`. Design at 360–390px first. Product grid 2 cols < 768, 3 cols ≥ 768, 4 cols ≥ 1024.

## 2. Components
- **Announcement bar:** ink bg, cream text 12px, one line, scrolls on mobile if long. Editable in admin.
- **Header (sticky, 64px mobile / 72px desktop):** cream 94% with blur and a bottom border. Mobile: hamburger · centred logo (48px tall) · bag icon with magenta count badge. Desktop: logo + "SN *Stitches*" wordmark left, nav right (Home, Shop all, Ankara, Kente, Evening, Casual, Our story, Contact), search icon [P2], bag. Nav links get a magenta underline that animates on hover.
- **Mobile menu:** full-width sheet below the header, 48px tap rows, socials row at the bottom (IG, TikTok, WhatsApp).
- **Buttons:** Primary (magenta fill, white text). Secondary (ink fill). Ghost (1.5px ink outline). WhatsApp (green with WA icon). Text link (magenta, underline). Sizes: 48px tall (default, a good tap target), 40px small. Disabled: 50% opacity, no hover. Loading: spinner + "Processing…".
- **Product card:** 3:4 image, radius 14. The second image crossfades on hover (desktop). "View dress" pill slides up on hover. Badges top-left: Sale (magenta), New (ink), Sold out (muted), Sample (gold outline, admin/preview only). Below: name (serif 19–20), meta "ANKARA · MIDI" (caps, muted), price (strike-through compare-at).
- **Category tile:** 4:5 image, bottom gradient, serif name and gold small-caps count.
- **Chips (filters):** pill, white with a line border. Selected = ink fill. 36px tall.
- **Size selector:** 52×46 rounded-10 buttons XS–XXL. Selected = ink. Out of stock = 35% opacity with strike-through and `aria-disabled`, tooltip "Sold out – WhatsApp us to pre-order".
- **Colour swatch:** pill with a 24px circle and the colour name.
- **Quantity stepper:** pill, − / value / +, 1–10.
- **Inputs:** 48px, white, line border, radius 10. Label above (13px muted). Focus = 2px gold outline. Error = error border + message below with an icon. Phone input shows a 🇬🇭 +233 prefix hint.
- **Radio cards:** delivery and payment choices, full width, magenta border + magenta-50 bg when selected, price right-aligned.
- **Payment logos row:** MTN MoMo (yellow), Telecel Cash (red), AirtelTigo Money (blue), Visa/Mastercard. Small and honest, no fake "secured" claims beyond "Payments by Paystack".
- **Cart drawer:** right sheet, full width on mobile, 420px on desktop. Line items (76px thumb, name, size · colour, stepper, remove, line total), free-delivery progress bar (gold), subtotal, Checkout (primary) and Order via WhatsApp (green). Escape/scrim closes it. Focus is trapped.
- **Toast:** ink pill at bottom centre, 2.5s, `role=status`.
- **Accordion:** serif summary with +/– (Details, Fabric & care, Delivery & returns).
- **Skeletons:** sand-100 blocks with a shimmer for cards, PDP and table rows.
- **Empty state:** script line ("Your bag is empty") + short text + ghost CTA.
- **Footer:** sand bg, gold 3px top border. Logo + tagline "FASHION • DESIGN • STITCH", columns Shop / Help / Studio. Socials: Instagram **@sn_stitches_**, TikTok **@sn_stitches**, WhatsApp/Call **054 692 3596**. Legal links (Privacy, Terms, Returns).
- **Floating WhatsApp button** (mobile, bottom-right, 56px, green). Hidden on checkout and while the drawer is open.

## 3. Storefront pages
### Home (`/`) — mockup 01 (the mockup wins over the text where they differ)
1. Announcement bar → header.
2. **Hero:** campaign image right/background with a cream gradient on the left on desktop; image on top and text below on mobile. Eyebrow "NEW SEASON · MADE IN ACCRA", H1 "Dresses with a story, *stitched for you*" (script line), one-sentence copy, CTAs "Shop the collection" (primary) + "Evening edit" (ghost).
3. **Featured dresses:** 4 cards (2×2 mobile) + "View all →".
4. **Shop by category:** 4 tiles.
5. **Our story teaser:** ink section, image + text, "Fashion. Design. *Stitch.*", dashed magenta stitch divider, CTA "Our story".
6. **Value props:** Delivery across Ghana · Pay with MoMo or card · Perfect fit (XS–XXL + made-to-measure). Cards with a gold dashed border.
7. **Instagram/TikTok strip:** "Follow @sn_stitches_" with 6 images linking to IG (P1 static images, P2 feed).
8. Footer.

### Shop (`/shop`, `/shop/[category]`) — mockup 02
- Page head: eyebrow + H1 + short category description.
- Desktop: left filter rail 240px. Mobile: "Filters (n)" button opens a bottom sheet with "Show N dresses" and "Clear".
- Filters: Category (chips), Size (chips XS–XXL, matches products with that size in stock), Price (range slider + presets "Under GH₵400 / 400–800 / 800+"), Length (Mini/Midi/Maxi), In stock only (toggle).
- Toolbar: result count, sort select (Featured, Newest, Price low→high, high→low, Name A–Z).
- Filters reflect in the URL query (shareable, back button works). Grid with skeletons while loading. Empty: "No dresses match those filters" + Clear filters. Pagination: "Load more" (24 per page).

### Product (`/product/[slug]`) — mockup 03
- Desktop 2 columns (gallery 55%). Gallery: vertical thumbs + main 3:4 image, click to zoom/lightbox. Mobile: swipeable carousel with dots, thumbs below.
- Right: breadcrumbs, eyebrow (category · length), H1, price (magenta) + compare-at, short description, Colour swatches, Size selector + "Size guide" link (opens a modal with the table), stock hint ("Only 2 left in M"), quantity, **Add to bag** (primary, full width on mobile, **sticky bottom bar on mobile** once scrolled past it), "Order this on WhatsApp" text link, shipping line "Ships in 1–3 days · Accra same-day available".
- Made-to-order: label "Made for you in N days", plus a measurements note.
- Accordions: Details, Fabric & care, Delivery & returns.
- "You may also love": 4 cards from the same category.
- Validation: Add without a size gives an inline error "Please choose a size" and focuses the size group.

### Cart drawer — mockup 04
As in the component spec. Prices re-validated on open (server action). If an item is no longer available: inline warning on the line and the Checkout button disabled until it's removed. The free-delivery bar reads "Add GH₵600 more for free delivery" / "You've unlocked free delivery 🎉".

### Checkout (`/checkout`) — mockups 05 & 06 (delivery step, then payment step with MoMo network cards)
- Single page, guest checkout. Mobile order: collapsible **order summary** at the top ("Show order summary · GH₵940"), then sections. Desktop: form left, sticky summary right.
- Sections: **1 Contact** (full name, phone required + "We'll call/WhatsApp this number", email required for the receipt). **2 Delivery** (region select with all 16, city/town, GhanaPost GPS optional, address & landmark textarea, delivery option radio cards that appear after the region is chosen, with price/ETA; same-day greys out after 12:00 with the reason). **3 Payment** (radio cards: Mobile Money [MTN, Telecel, AirtelTigo logos, "Approve on your phone"], Card, Order via WhatsApp [pay on confirmation]). Optional discount code [P2]. Order note (optional).
- CTA reflects the method: "Pay GH₵940 with Mobile Money" / "Pay GH₵940 by card" / "Send order on WhatsApp".
- Errors: inline per field + a summary at the top. Focus goes to the first error. Ghana phone validation (`0XXXXXXXXX` or `+233XXXXXXXXX`).
- States: submitting (button spinner, form disabled), Paystack popup open, popup closed ("Payment not completed — try again or choose another method"), payment failed, config missing (warning banner, in dev only).

### Confirmation (`/order/[orderNumber]`) — mockup 07
Magenta check circle, eyebrow "ORDER SNS-24001", H1 "Medaase, Akosua! *Thank you*". Copy: we'll call/WhatsApp on the phone number, receipt sent to the email. Summary box (items, delivery, total, status, Paystack ref, ship-to). If the status is still pending: "Confirming your payment…" with a poll every 3s up to 60s, then the message "We're confirming with your network — you'll get an email shortly". CTAs: Continue shopping · Chat with us on WhatsApp (prefilled with the order number).

### About / Our story (`/about`) — mockup 08
Editorial: hero image, the story of SN Stitches (Accra studio, hand-finished, wax print and kente), "Fashion • Design • Stitch" values in three columns, studio photos, CTA to shop. **Copy is placeholder for the owner to supply.**

### Contact (`/contact`) — mockup 09
Cards: **WhatsApp** (button → `wa.me/233546923596`), **Call** `tel:+233546923596` (054 692 3596), **Instagram** @sn_stitches_ (instagram.com/sn_stitches_), **TikTok** @sn_stitches (tiktok.com/@sn_stitches), email [placeholder]. Studio hours (Mon–Sat 9am–6pm, assumption) and location (Accra; exact address TBC). Simple contact form [P2] (stores a message and emails the owner).

### Size guide (`/size-guide`, also as a modal) — mockup 10
Table XS–XXL × UK size, bust, waist, hips (inches, cm toggle), how-to-measure illustration, "Between sizes? Size up, or WhatsApp us for made-to-measure."

### FAQ / Delivery & returns (`/faq`) — mockup 10
Accordions grouped: Ordering & payment (MoMo, card, WhatsApp, is it safe), Delivery (zones, fees, cutoffs, free threshold, pickup), Sizing & made-to-measure, Returns & exchanges (7 days, unworn, tags on, exchange or store credit; **policy is an assumption to confirm**), Care. FAQPage JSON-LD.

## 4. Admin pages (`/admin`)
Admin UI uses the same tokens but is denser: white surfaces, 14px body, ink sidebar on desktop, bottom tab bar on mobile (Dashboard, Orders, Products, Settings). It must work well on the owner's phone.
- **Login:** centred card on cream, logo, email + password, "Send magic link" alt, errors inline. Non-admin users see "You don't have access."
- **Dashboard:** KPI cards (Today's sales, This week, Orders to process, Low stock), "Needs attention" list (paid but not processed > 24h, stock conflicts), recent orders table, quick actions (Add product, View pending).
- **Products list:** search, category/status filters, table on desktop (thumb, name, category, price, total stock, status, featured) and cards on mobile. Bulk archive [P2]. "Sample" badge.
- **Product editor:** two columns on desktop. Left: name, slug (auto), description (textarea/markdown), details bullets, category, length, price, compare-at, made-to-order + lead days. Images: dropzone, thumbnails reorderable (drag), alt text, set main, delete. **Variants grid:** colours × sizes, stock number inputs, row/column quick-fill, active toggles. Right: status (Draft/Active/Archived), featured toggle, SEO title/description with a Google preview. Sticky save bar with unsaved-changes guard. Toast on save.
- **Orders list:** status tabs with counts, search, date range, table (order #, date, customer, phone, region, total, payment method, status chip). Tap a row to open the detail.
- **Order detail:** header (order # + status chip + date). **Pipeline stepper** Pending → Paid → Processing → Shipped/Out for delivery → Delivered with the next-action button ("Mark processing", "Mark shipped" with an optional courier/tracking note) and "Cancel order" (confirm dialog, restock). Items with images, sizes and qty. Customer card with **WhatsApp** and **Call** buttons and a copy-address button. Payment card (method, channel, Paystack ref, verified time). Timeline of events and internal notes. Print packing slip.
- **Settings:** store contacts/socials, announcement text, free-delivery threshold, delivery options table (label, fee, ETA, cutoff, active).

## 5. States
| State | Pattern |
|---|---|
| Loading | skeletons (no spinners for page content). Button spinners for actions |
| Empty | script headline + one line + CTA (bag, search results, orders list "No orders yet") |
| Error | inline field errors. Page-level error card with "Try again" + WhatsApp help link. Custom 404 "This dress has wandered off" with links to shop |
| Offline / slow | images have sand placeholders and blur-up. Cart works offline. Checkout shows "You're offline" if `navigator.onLine` is false |
| Sold out | card badge, PDP sizes disabled, "WhatsApp to pre-order" |

## 6. Accessibility
- WCAG 2.2 AA: text contrast ≥ 4.5:1 (magenta #B0185E on cream ≈ 6.4:1 ✓, gold only for large text and decoration; use gold-700 for small eyebrow text).
- All interactive targets ≥ 44×44px. Visible gold focus ring. Skip-to-content link.
- Semantic landmarks, one H1 per page, form labels tied to inputs, `aria-live` for cart count and toasts and errors, `aria-pressed` on size/filter chips, radio groups use fieldset/legend.
- Drawer/modal: focus trap, Escape closes, focus returns to the trigger, `inert` background.
- Alt text describes the dress (colour, print, cut). Decorative images use `alt=""`.
- Prefers-reduced-motion disables zoom/crossfade. Language `en-GH`. Prices read as "GH₵450" with `aria-label="450 Ghana cedis"`.

## 7. Content & formatting
- Currency: `GH₵1,250` (no decimals unless needed). Ghana phone display `054 692 3596`. Dates `29 Oct 2026`, times in Africa/Accra.
- Tone: warm, confident, a little Ghanaian ("Medaase", "Akwaaba"), short sentences.
- All seed products, prices and photos are **samples**. Mark them in the admin and replace them before launch.


## Admin · Add new listing (`/admin/products/new`), mockups 27 & 28
This page is separate from the product editor (24). Open it from the **"+ Add new listing"** button on the Products list (23).
- **Stepper:** 01 Photos → 02 Details → 03 Pricing → 04 Sizes & stock → 05 Preview → 06 Publish. Desktop shows the steps as numbered stitched cards on one page. Mobile shows a compact stepper and one step at a time.
- **01 Photos:** drag/drop, file picker or camera (`capture="environment"`) upload to Vercel Blob. Drag to reorder, star the main photo, alt text required for each photo. "Generate studio shot" is shown disabled with a *Phase 2* tag.
- **02 Details:** name; slug auto-generated (editable, uniqueness checked); description; category; length/style (DressLength incl. PLAYSUIT); fabric; care; tags.
- **03 Pricing:** price in GH₵ (stored as pesewas), optional compare-at (must be greater than price), made-to-measure toggle plus GH₵ add-on fee.
- **04 Sizes & stock:** grid of colours × XS–XXL with quick-fill ("all = 2", "clear").
- **05 Live preview:** product card (hang-tag price) plus a phone mock of the product page; updates live.
- **06 Publish checklist:** ≥1 photo with alt text, name, price, category, ≥1 size in stock. **Publish** stays disabled until every item passes. **Save draft** is always available.
- **Autosave:** draft saved every 10 s and on blur ("Saved · 12:04").
- **Mobile:** sticky bottom bar with "Save draft / Next: <step> →"; topbar actions hidden.
- **28 Success:** seal plus "Listing published!", hero photo with price tag. Actions: View in shop, Share to Instagram @sn_stitches_ (download image + copy caption), Share on WhatsApp (`wa.me/?text=`), TikTok, copy link. Also: Add another listing / Edit / Back to products.
