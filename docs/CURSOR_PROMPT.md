# Cursor Agent prompt: build the SN Stitches store

**How to use:** create an empty Git repo, copy this whole folder into it as `docs/`, open the repo in Cursor and paste the **full prompt** below into Agent. Review each phase, then say "continue with Phase N". Richard deploys to Vercel himself afterwards (SYSTEM_DESIGN §14a). The agent must never deploy.

---

## FULL PROMPT (copy everything inside the fence)

```text
You are building the production e-commerce website + admin for SN Stitches, a Ghanaian fashion brand selling dresses ("Fashion • Design • Stitch"). Customers are mostly in Ghana. Prices are in Ghana cedis (GH₵/GHS). Payment is Mobile Money (MTN, Telecel, AirtelTigo) and card via Paystack, plus "Order via WhatsApp".

SOURCE OF TRUTH: read all of these before writing code
1. docs/ui-design/: HIGH-FIDELITY MOCKUPS. Match them PIXEL-CLOSELY at 1440px and 390px:
   - docs/ui-design/screens/desktop/*.png and docs/ui-design/screens/mobile/*.png (numbered: 00 design system, 01–12 storefront, 21–28 admin)
   - docs/ui-design/html/*.html + docs/ui-design/ds.css: the exact HTML/CSS behind every mockup. Open them in a browser, inspect them for exact sizes, colours, spacing, clip-paths and gradients, and port them into Tailwind tokens/utilities and React components.
   - docs/ui-design/SN-Stitches-UI-Design.pdf and docs/ui-design/boards/*.png: overview.
   - docs/ui-design/img/: sample product photos (incl. the Sika Tie-Dye Playsuit playsuit-1/2.webp) and logo.
2. docs/UI_SPEC.md: design tokens, components, states, accessibility, and §0 "Atelier" signature visual language (stitch seams, thread line, gold foil, linen texture, kente bands, arch crops, outlined numerals, hang-tag prices, tape-measure size selector, tailor-label chips, sewn-button badges, running-stitch loader, motion notes). This identity is mandatory: the store must NOT look like a generic template.
3. docs/SYSTEM_DESIGN.md: stack, full Prisma schema draft (§4), routes and actions (§5), payment flow (§6), notifications, admin, delivery rules, security, env vars (§14), deployment checklist (§14a, for Richard, not you), phases.
4. docs/assets/sn-stitches-logo.png: the official logo (transparent PNG). Use it in the header, footer, admin, emails, favicon/app icons (generate sizes) and OG image. Never redraw or recolour it.
5. docs/reference-prototype/: an older functional prototype. Use it for flows and copy only; the mockups supersede its visuals.

BRAND FACTS
- Instagram @sn_stitches_ (https://instagram.com/sn_stitches_) · TikTok @sn_stitches (https://www.tiktok.com/@sn_stitches)
- Phone 054 692 3596 → tel:+233546923596 · WhatsApp https://wa.me/233546923596
- Colours: magenta #B0185E, gold #D4A437, ink #141414, cream #FBF6EE (+ neutrals/states in UI_SPEC). Fonts via next/font/google: Cormorant Garamond (headings), Jost (UI/body), Great Vibes (one script word per view, max).

STACK (do not substitute without asking)
Next.js 15 App Router + TypeScript strict + Tailwind CSS v4 (+ shadcn/ui/Radix primitives where useful) · Prisma ORM + Prisma Postgres (pooled DATABASE_URL at runtime, DIRECT_URL for migrations; follow the CURRENT Prisma docs for config/driver-adapter details) · Auth.js (NextAuth v5) with @auth/prisma-adapter: Resend magic link (+ optional credentials), role OWNER/STAFF for admin · Vercel Blob for product photos (client uploads from the admin editor via a token route) · Paystack (Popup/Inline on the client; initialize/verify REST + webhook on the server) · Resend + React Email · Zod · Zustand (persist) cart · Vitest + Playwright · pnpm.

NON-NEGOTIABLE RULES
1. All keys and secrets come from env vars. Create .env.example with every variable in SYSTEM_DESIGN §14, using empty/placeholder values. Never hardcode keys. Never expose DATABASE_URL, DIRECT_URL, AUTH_SECRET, PAYSTACK_SECRET_KEY, BLOB_READ_WRITE_TOKEN or RESEND_API_KEY to the client.
2. Money is an Int in pesewas in the DB and server code. One formatGHS() helper produces "GH₵1,250".
3. The server recomputes every price, fee, discount and total. Never trust client amounts.
4. An order becomes PAID only after Paystack verify (callback) or a webhook whose x-paystack-signature HMAC-SHA512 (raw body, PAYSTACK_SECRET_KEY) passes a constant-time compare. The amount and currency must match. markOrderPaid is idempotent and runs inside prisma.$transaction (payment, status, conditional stock decrement, OrderEvent). Notifications are sent once (notifiedAt).
5. No RLS: authorization is in code. requireAdmin() is the first statement of EVERY admin server action and admin route (incl. the Blob upload-token route), and middleware.ts also guards /admin/**. Public queries go through lib/catalog.ts (ACTIVE products only). Write tests proving anonymous/CUSTOMER users are rejected.
6. Seed (prisma/seed.ts, idempotent): categories; ~12 SAMPLE dresses from docs/reference-prototype/products.js PLUS "Sika Tie-Dye Playsuit" (GH₵420, Casual, images playsuit-2 main / playsuit-1), each with isSample=true and a clear "SAMPLE DATA" comment; variants XS–XXL with stock 0–8 (some sold out); images copied to /public/sample (and uploaded to Blob if BLOB_READ_WRITE_TOKEN is set); 4 delivery options; StoreSettings (WhatsApp 233546923596, IG, TikTok, phone, free-delivery threshold 150000 pesewas); OWNER user from SEED_ADMIN_EMAIL.
7. DO NOT DEPLOY. Do not run `vercel`, do not create cloud resources, do not push to any remote. Local development only: a local Postgres (Docker) or a Prisma Postgres dev DB whose URLs I put in .env.local, with a local fallback for uploads (save them to /public/uploads in dev when BLOB_READ_WRITE_TOKEN is missing). Ask me when you need a key or a decision.
8. Mobile-first and light: Server Components by default; client components only for the cart, gallery, filters, checkout and admin forms; next/image with sizes; load the Paystack script only on checkout; <150 KB JS on shop/product; ISR + revalidateTag('products') so browsing costs ~0 DB operations (Prisma Free = 200k ops/month).
9. WCAG 2.2 AA (UI_SPEC §6). Respect prefers-reduced-motion for every motion note.
10. Visual fidelity: after each UI phase, run Playwright to screenshot your pages at 1440 and 390 and compare them side by side with the matching docs/ui-design/screens PNGs. List the differences and fix them before reporting. Implement every signature motif shown.
11. Work in phases. At the end of each one: run lint, typecheck, unit tests and the relevant e2e tests; report acceptance criteria ✅/❌ with screenshots; then STOP for my review.

PHASES & ACCEPTANCE CRITERIA

Phase 0: Setup & design system
- Next.js + TS strict + Tailwind v4 + ESLint/Prettier + shadcn/ui + Vitest + Playwright + Prisma installed. Tailwind theme = UI_SPEC tokens. next/font for the 3 fonts.
- Build the "Atelier" UI kit as components matching mockup 00: Button (primary with gold hairline, secondary, ghost, gold, WhatsApp, small, loading, disabled, focus), Input/Select/Textarea (stitched focus, error), HangTag price, TapeMeasure size selector, TailorLabel chip, RadioCard, StatusChip, Pill badges, SewnButton badge, RunningStitch loader, Toast, Seam, KenteBand, ThreadLine (SVG + scroll draw), StitchedCard, Foil frame, linen background, OutlinedNumeral, ProductCard (hover lift + stitch outline + quick add).
- /design-system dev page that reproduces mockup 00.
- Logo assets generated from docs/assets/sn-stitches-logo.png. .env.example complete. README setup steps.
✅ when: /design-system visually matches 00-design-system (desktop and mobile) closely; lint/typecheck/tests pass; no secrets in the repo.

Phase 1: Database, auth, seed
- schema.prisma from SYSTEM_DESIGN §4 (adapt to the current Prisma version), initial migration + SQL migration for CHECK (stockQty >= 0) and order-number generation; Prisma client singleton (reuse across invocations); seed as rule 6.
- Auth.js v5 (Prisma adapter, Resend magic link; credentials optional), role on User, requireAdmin(), middleware for /admin/**, admin login page = mockup 21.
✅ when: `prisma migrate reset` + seed run cleanly; seeded OWNER can sign in; non-admin is blocked by middleware AND server actions (tests); the login page matches mockup 21.

Phase 2: Storefront catalogue
- Layout (announcement + kente band, header with sewn-button bag count, footer with socials, mobile WhatsApp FAB) and pages Home (01), Shop with URL-synced filters & sort (02), Product (03, tape-measure sizes, sold-out states, made-to-measure toggle, sticky mobile add bar), About (08), Contact (09), Size guide & FAQ (10), 404 (12). SEO per SYSTEM_DESIGN §11 (JSON-LD with GHS, sitemap, robots, OG).
✅ when: each page matches its mockup at 1440 and 390 (side-by-side screenshots attached); filters survive refresh/back; Lighthouse mobile (prod build) ≥ 90 performance and ≥ 95 accessibility/SEO on the product page; no CLS from fonts/images; thread-line and hover motions work and are disabled with reduced motion.

Phase 3: Cart, checkout & Paystack
- Cart drawer (04) and empty bag (11). Zustand persist; server re-validation; free-delivery stitch progress; Order via WhatsApp (prefilled wa.me to 233546923596).
- Checkout as in mockups 05 (contact, region of all 16, city, GhanaPost GPS, address + landmark, delivery radio cards from the DB with the 12:00 Africa/Accra same-day cutoff, free over the threshold, studio pickup) and 06 (MoMo with MTN/Telecel/AirtelTigo network cards + MoMo number, card, WhatsApp). Ghana phone → E.164.
- createOrder → Paystack initialize (GHS, pesewas, channels, metadata) → Popup → /api/paystack/callback verify → /order/[orderNumber]?t=token (07). POST /api/paystack/webhook with signature check. The confirmation page polls while PENDING (max 20). Dev-only demo flag NEXT_PUBLIC_DEMO_PAYMENTS (ignored in production).
✅ when: with Paystack TEST keys, a MoMo and a card payment each end PAID with stock decremented once and the confirmation page matching 07; a replayed webhook is a no-op; a bad signature returns 401; a tampered client price is ignored; a Playwright e2e at 390px covers browse → add → checkout (demo) → confirmation.

Phase 4: Notifications
- Branded React Email templates (logo, cream, magenta, kente rule): owner "New paid order" to ORDER_NOTIFY_EMAIL (WhatsApp-the-customer + admin link) and the customer receipt. Sent once from markOrderPaid. Console fallback without RESEND_API_KEY.
✅ when: one test order produces exactly one owner email and one receipt with correct content.

Phase 5: Admin (mockups 22–26)
- Dashboard (KPIs, 7-day sales, needs attention, recent orders, low stock), Products list with per-size stock mini-grid, Product editor (fields, Vercel Blob client upload with progress + reorder + alt text + delete, colour × size stock grid, status/featured/made-to-measure/sample toggles, SEO preview, sticky save bar), Orders list with pipeline overview, Order detail with status stepper (allowed transitions only, cancel = restock), timeline, notes, WhatsApp/Call, packing slip. Mobile admin uses the bottom tab bar.
✅ when: from a 390px screen the owner can create a product with photos and stock and see it in the shop within seconds; status changes write OrderEvents; every admin screen matches its mockup; authorization tests pass.

Phase 6: Hardening & handover
- Security headers + CSP (Paystack domains, Blob domain), rate limits (login/magic link, createOrder), error boundaries, skeletons and empty states (running-stitch loader), analytics events behind a flag, privacy/terms/returns placeholder pages, Prisma operation-budget notes.
- README: local setup, env vars, how to replace sample products, and a link to SYSTEM_DESIGN §14a for Richard's Vercel deployment. Build command `prisma migrate deploy && next build`. DO NOT DEPLOY.
✅ when: `pnpm build` passes, all tests are green, and the final report lists the placeholders (sample products/photos, policies, studio address, email) and any differences from the mockups.

Start with Phase 0. Before coding, reply with a short plan, the folder structure and any questions.
```

---

## SHORT PROMPT

```text
Build the SN Stitches dress store + admin (Ghana, GH₵, Paystack MoMo/card, WhatsApp orders). Match the mockups in docs/ui-design/ (screens/desktop + screens/mobile PNGs, html/ + ds.css sources) pixel-closely, including the "Atelier" signature motifs in docs/UI_SPEC.md §0 (stitch seams, thread line, gold foil, linen, kente bands, arch crops, hang-tag prices, tape-measure sizes, sewn-button badges). Follow docs/SYSTEM_DESIGN.md: Next.js 15 App Router + TS + Tailwind v4, Prisma ORM + Prisma Postgres (pooled DATABASE_URL, DIRECT_URL for migrations; schema draft in §4, money as Int pesewas), Auth.js v5 + Prisma adapter with requireAdmin() in every admin action + middleware (no RLS), Vercel Blob client uploads in the product editor, a 6-step Add new listing flow (/admin/products/new) with draft/publish, Paystack initialize → popup → server verify + HMAC-verified idempotent webhook, Resend emails, Zod, Zustand cart, Vitest + Playwright, pnpm. Use docs/assets/sn-stitches-logo.png. Seed ~12 SAMPLE dresses + the Sika Tie-Dye Playsuit (isSample=true). Brand: IG @sn_stitches_, TikTok @sn_stitches, WhatsApp 233546923596 / 054 692 3596. All keys from env (.env.example). DO NOT deploy or push; Richard deploys to Vercel himself. Work in phases 0–6 (design system → DB/auth/seed → catalogue → cart/checkout/Paystack → emails → admin → hardening). After each phase run lint/typecheck/tests, compare screenshots with the mockups, report ✅/❌ and stop.
```

**Add new listing (`/admin/products/new`, mockups 27/28):**
- ✅ "+ Add new listing" on /admin/products opens the 6-step flow; desktop and mobile match screenshots 27/28.
- ✅ Photos upload to Vercel Blob, can be reordered, a main photo can be picked, and alt text is required.
- ✅ Slug auto-fills and is checked for uniqueness. Price is stored as Int pesewas; compare-at must be greater than price.
- ✅ Colour × size grid creates ProductVariants; quick-fill works.
- ✅ Save draft is always possible (status DRAFT, autosave). Publish is disabled until the checklist passes, and the server re-validates.
- ✅ After publishing, the success screen shows links for View, Instagram, WhatsApp and TikTok; the product appears in the shop via revalidatePath.
