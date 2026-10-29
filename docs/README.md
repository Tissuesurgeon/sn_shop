# SN Stitches: design pack (v2)

| Path | What |
|---|---|
| `ui-design/` | **High-fidelity UI mockups (source of truth for visuals)** |
| `ui-design/screens/desktop/` · `ui-design/screens/mobile/` | 19 screens × 1440 & 390 full-page PNGs (00 design system · 01–12 storefront · 21–26 admin) |
| `ui-design/SN-Stitches-UI-Design.pdf` | presentation: cover, design system, each screen desktop + mobile with captions, overview boards |
| `ui-design/boards/` | 4 overview boards (storefront desktop, storefront mobile, admin, design system) |
| `ui-design/html/` + `ui-design/ds.css` | HTML/CSS sources of every mockup (inspect for exact values) · `ui-design/src/` = generator + render scripts |
| `UI_SPEC.md` | design system, "Atelier" signature language (§0), components, page specs, states, a11y |
| `SYSTEM_DESIGN.md` | Next.js + Prisma Postgres + Auth.js + Vercel Blob + Paystack + Resend; Prisma schema; payment flow; security; env vars; **Vercel deployment checklist (§14a)** |
| `CURSOR_PROMPT.md` | copy-paste prompt for Cursor's Agent (full, phased with acceptance criteria + short) |
| `SN-Stitches-Design.pdf` | SYSTEM_DESIGN + UI_SPEC as one PDF (diagrams rendered) |
| `assets/` | official logo (`sn-stitches-logo.png`), web logo, favicon |
| `reference-prototype/` | older static prototype (flows/copy only; not deployed) |

**Use:** copy this folder into a new repo as `docs/`, open it in Cursor, and paste the prompt from `CURSOR_PROMPT.md`. Deployment to Vercel is done by Richard (SYSTEM_DESIGN §14a). Nothing in this pack is hosted.

Regenerate mockups: `cd ui-design && python3 src/render.py dsheet,store,admin && python3 src/boards.py && python3 src/deck.py` (needs Python Playwright + Pillow).
