> **Reference prototype only — not the product.** Visual/UX reference for the Cursor build. Do not deploy. See ../SYSTEM_DESIGN.md, ../UI_SPEC.md, ../CURSOR_PROMPT.md.

# SN Stitches — storefront (v1 preview)

Static, mobile-first store for **SN Stitches** (Fashion • Design • Stitch). Plain HTML/CSS/vanilla JS — no build step, ~2.5 MB total incl. images, works on any static host.

```
index.html     page shell (header, footer, cart drawer)
styles.css     design system (magenta #B0185E, gold #D4A437, black, cream #FBF6EE)
config.js      ← Paystack key, WhatsApp number, delivery prices, regions
products.js    ← the product catalogue (SAMPLE DATA)
app.js         router (#/, #/shop, #/product/<id>, #/checkout, #/confirmation), cart, checkout
assets/        logo.webp/png, favicon.png, img/*.webp (AI-generated sample photos)
```

Run locally: `python3 -m http.server 8080` in this folder → http://localhost:8080

## Edit products
Open `products.js`. Each dress is one object — copy one, change `id` (unique, url-safe), `name`,
`category` (Ankara / Kente / Evening / Casual — new categories appear automatically), `length`,
`price` (GH₵, number), optional `compareAt` (shows "Sale"), `colours`, `sizes` (subset of XS–XXL),
`images` (first = main, second = hover image), `featured` (shows on home page), `description`, `details`.
Put photos in `assets/img/` (portrait 3:4, ~768×1024 WebP keeps it fast on mobile data).
**All 12 current products and photos are placeholders** — replace with real stock and photography.

## Paystack (MoMo + card)
In `config.js` set `PAYSTACK_PUBLIC_KEY: "pk_test_..."` (then `pk_live_...` when live). Only ever the **public** key.
- Empty key ⇒ **demo mode**: a banner shows on checkout and payment is simulated.
- With a key, checkout loads Paystack Inline (`js.paystack.co/v1/inline.js`), currency GHS, amount in pesewas,
  channel `mobile_money` (MTN, Telecel, AirtelTigo) or `card`.
- ⚠ Before going live, **verify each transaction server-side** (Paystack `GET /transaction/verify/:reference`
  with your secret key, e.g. a small serverless function or Paystack webhook) — the browser callback alone isn't proof of payment.
  Enable GHS + Mobile Money on your Paystack dashboard.

## WhatsApp orders
Set `WHATSAPP_NUMBER` in `config.js` to digits only in international format, e.g. `233241234567`
(currently placeholder `233200000000`). "Order via WhatsApp" (cart drawer + checkout) opens
`wa.me/<number>?text=…` prefilled with items, sizes, quantities, subtotal and delivery details.

## Delivery
`DELIVERY` in `config.js`: Accra same-day / next-day (shown for Greater Accra), other regions, studio pickup.
`FREE_DELIVERY_OVER` sets the free-delivery threshold. All 16 regions are listed in `REGIONS`.

## Deploy
Any static host works — upload this folder as-is (no build):
- **Netlify**: drag-and-drop the folder at app.netlify.com/drop.
- **Cloudflare Pages / Vercel / GitHub Pages**: point at the repo, build command none, output dir `/`.
- **Hugging Face Space**: create a Space with SDK "Static", upload these files (`README.md` front-matter needs `sdk: static`).
Routing uses `#/` hashes, so no rewrite rules are needed.

## Next steps
Real product photos & prices, real WhatsApp number, Paystack account + server-side verification,
order notifications (email/WhatsApp to the owner, e.g. via a webhook → Google Sheet), custom domain, analytics.
