# SN Stitches

Ghanaian dress shop for SN Stitches (Fashion · Design · Stitch). Prices are stored as pesewas and shown as Ghana cedis, for example GH₵1,250. Paystack handles MoMo and card. WhatsApp is 054 692 3596.

This repository is local development only. Richard deploys to Vercel himself — see [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md) §14a. Do not run `vercel` from this project.

## Local setup

Requirements: Node 20+, pnpm.

```bash
pnpm install
cp .env.example .env
```

Prisma reads `.env`. On Vercel, `DATABASE_URL` must be the Prisma Postgres string that starts with `prisma+postgres://` (Prisma Console → Connect). The `postgres://…@db.prisma.io:5432` string is `DIRECT_URL` only, for migrations. Vercel cannot open port 5432, so the shop stays empty when `DATABASE_URL` uses that host. Do not point either URL at local Docker.

Set `AUTH_SECRET`, `AUTH_URL=http://localhost:3000`, `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, and `ADMIN_EMAILS` to that owner email. For a local checkout without Paystack keys, set `NEXT_PUBLIC_DEMO_PAYMENTS=true`. That flag is ignored when `NODE_ENV=production`. Leave `PAYSTACK_SECRET_KEY`, `RESEND_API_KEY`, and `BLOB_READ_WRITE_TOKEN` empty until you have them. Never commit `.env`.

```bash
pnpm exec prisma migrate deploy
pnpm exec prisma db seed
pnpm dev
```

`migrate deploy` applies migrations to Prisma Postgres. The seed loads the sample dresses and the owner. The shop is at [http://localhost:3000](http://localhost:3000). Sign in at [http://localhost:3000/admin/login](http://localhost:3000/admin/login). The fixture `customer@snstitches.com` uses the same password and is turned away. With email keys empty, magic links and order emails print in the server console.

Replace the sample dresses from Admin → Products. They are marked `isSample` in `prisma/seed.ts`. Photos uploaded without a Blob token are written to `public/uploads`, which is gitignored. Studio address, privacy, terms, and returns pages are placeholders.

Prisma keeps a small query budget: catalogue pages select public product fields only, and order numbers come from the database sequence `order_number_seq` starting at SNS-24001. Stock cannot go below zero.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

`pnpm build` runs `prisma migrate deploy` and then `next build`. Playwright compares `/design-system` and `/admin/login` with the mockups, and walks the shop at 390px through a demo checkout.

## Brand assets

`public/brand/sn-stitches-logo.png` is the official logo. Do not redraw or recolour it.

```bash
node scripts/generate-brand-assets.mjs
```

The header uses `public/brand/logo.webp`.
