import glob,os
from playwright.sync_api import sync_playwright
R='/workspace/sn-stitches-spec/ui-design/'
cap={'00-design-system':'Design system “Atelier”: palette from the logo, Cormorant/Jost/Great Vibes, stitched focus states, hang-tag prices, tape-measure sizes, sewn-button badges.',
'01-home':'Asymmetric editorial hero with arch-cropped overlapping photos, a magenta drape and a thread line weaving through. Mixed-size “New in” grid, hang-tag category tiles, From sketch to stitch, made-to-measure band, IG/TikTok strip.',
'02-shop':'Tailor-label filters (size, length, colour, price), a staggered editorial grid with a feature tile and a customer quote, prices on hang tags, a made-to-measure prompt and a running-stitch “load more”.',
'03-product':'Arch gallery with oversized look number, tape-measure size selector (sold-out XXL), low-stock hint, WhatsApp order, made-to-measure toggle, seam-divided accordions. Mobile: carousel + sticky add bar.',
'04-cart-drawer':'Gold-edged drawer, free-delivery progress drawn as a running stitch with a sewn-button marker, upsell, Checkout + Order via WhatsApp, payment marks, toast.',
'05-checkout-delivery':'Stitched step tracker, numbered sections, Ghana phone and GhanaPost GPS fields, inline error, delivery radio cards with hang-tag fees (Accra same/next-day, pickup), sticky receipt summary.',
'06-checkout-payment':'Mobile Money first with MTN / Telecel / AirtelTigo network cards, MoMo number and approval guidance, card and WhatsApp options, Paystack assurance, running-stitch loader.',
'07-confirmation':'“Medaase, Akosua! Thank you.” Sewn-button seal, delivery tracker, receipt with pinked edge and kente hem, WhatsApp help, share to @sn_stitches_.',
'08-about':'Our story: editorial headline, outlined gold stats, arch imagery with drape, a seam timeline From sketch to stitch, founder quote on linen.',
'09-contact':'Stitched contact cards: WhatsApp & call 054 692 3596, Instagram @sn_stitches_, TikTok @sn_stitches; message form with tailor-label topics; studio card.',
'10-size-guide-faq':'Tape-measure size header and highlighted table, how-to-measure figure with stitched guides, FAQ accordions grouped by topic (delivery, payment, returns, made to measure).',
'11-empty-cart':'Empty state: magenta thread spool illustration, script headline, two CTAs and recommendations.',
'12-404':'“This page came unstitched.” 4-button-4 numeral, search and recovery CTAs.',
'21-admin-login':'Branded admin sign-in with password + magic link, inline error, editorial image panel.',
'22-admin-dashboard':'KPIs, 7-day sales chart, needs-attention queue, recent orders and low-stock list. Mobile uses a bottom tab bar.',
'23-admin-products':'Status tabs, search, product rows with hang-tag price, per-size stock mini-grid (low/zero highlighted), Sample badges.',
'24-admin-product-editor':'Details, Vercel Blob photo uploader (drag, reorder, progress), colour × size stock grid, status, toggles, search preview and sticky save bar.',
'25-admin-orders':'Pipeline overview Pending → Paid → Processing → Shipped → Delivered / Cancelled with counts and values, searchable order table.',
'27-admin-new-listing':'Add new listing (/admin/products/new): 6-step guided flow. Photos (drag/drop or camera, reorder, main pick, alt text, Phase-2 studio-shot helper), details, pricing in GH₵ with made-to-measure add-on, colour × size stock with quick-fill, live preview, publish checklist. Mobile: sticky Save draft / Next bar.',
'28-admin-new-listing-published':'Success state: “Listing published!” with View in shop, Share to Instagram, WhatsApp and TikTok, copy link, and Add another listing.',
'26-admin-order-detail':'Status stepper with the next action, items with stock check, Paystack-verified timeline, customer WhatsApp/Call, delivery address and printable slip.'}
keys=sorted(os.path.basename(f).rsplit('-',1)[0] for f in glob.glob(R+'screens/desktop/*.png'))
def pg(k):
    t=k.split('-',1)[1].replace('-',' ').title().replace('Faq','FAQ')
    sec='Admin' if k.startswith('2') else ('Design system' if k.startswith('00') else 'Storefront')
    return f'''<section class="pg"><div class="hd"><span class="n">{k[:2]}</span><div><p class="eb">{sec}</p><h2>{t}</h2></div><p class="cap">{cap.get(k,'')}</p></div>
<div class="shots"><figure class="d"><img src="file://{R}screens/desktop/{k}-desktop.png"><figcaption>Desktop · 1440</figcaption></figure><figure class="m"><img src="file://{R}screens/mobile/{k}-mobile.png"><figcaption>Mobile · 390</figcaption></figure></div><div class="kente"></div></section>'''
css='''@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Great+Vibes&family=Jost:wght@400;500&display=swap');
@page{size:1600px 1000px;margin:0}*{box-sizing:border-box}body{margin:0;font-family:Jost;background:#FBF6EE;color:#141414}
.pg{width:1600px;height:1000px;page-break-after:always;position:relative;padding:40px 56px 0;overflow:hidden}
.hd{display:grid;grid-template-columns:auto 360px 1fr;gap:24px;align-items:center;border-bottom:1.5px dashed #B0185E;padding-bottom:16px}.n{font-family:'Cormorant Garamond';font-size:84px;line-height:.8;color:transparent;-webkit-text-stroke:1.3px #D4A437}
h2{font-family:'Cormorant Garamond';font-size:44px;margin:0;line-height:1}.eb{letter-spacing:.22em;text-transform:uppercase;font-size:12px;color:#B8891F;margin:0 0 6px}.cap{font-size:16px;color:#4A433B;margin:0;line-height:1.5}
.shots{display:flex;gap:34px;margin-top:24px;height:800px;align-items:flex-start}figure{margin:0;display:flex;flex-direction:column;gap:8px}figure img{border-radius:10px;border:1px solid #E6DCCB;box-shadow:0 20px 40px -24px rgba(0,0,0,.35);object-fit:cover;object-position:top;background:#fff}
.d img{width:1100px;height:760px}.m img{width:340px;height:760px;border-radius:26px;border:8px solid #141414}figcaption{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6E655C}
.kente{position:absolute;left:0;right:0;bottom:0;height:10px;background:repeating-linear-gradient(90deg,#D4A437 0 18px,#141414 18px 22px,#B0185E 22px 34px,#141414 34px 38px,#1E6B47 38px 44px,#141414 44px 48px)}
.cover{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#FBF6EE}.cover img{width:300px}.cover h1{font-family:'Cormorant Garamond';font-size:96px;margin:10px 0 0}.cover .sc{font-family:'Great Vibes';color:#B0185E;font-size:110px;line-height:.8}
.board img{width:100%;height:860px;object-fit:contain}'''
cover=f'''<section class="pg cover"><img src="file://{R}img/logo.webp"><h1>UI Design <span class="sc">v1</span></h1><p class="eb" style="margin-top:20px">Storefront · Admin · Design system — Fashion • Design • Stitch</p><p style="color:#6E655C">High-fidelity mockups at 1440 & 390 · Prepared for Richard Frimpong · October 2026<br>Instagram @sn_stitches_ · TikTok @sn_stitches · WhatsApp 054 692 3596</p><div class="kente"></div></section>'''
boards=''.join(f'<section class="pg board"><div class="hd" style="grid-template-columns:1fr"><h2>Overview — {t}</h2></div><img src="file://{R}boards/{b}"><div class="kente"></div></section>' for b,t in [('01-storefront-desktop.png','storefront desktop'),('02-storefront-mobile.png','storefront mobile'),('03-admin.png','admin')])
html=f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>{cover}{"".join(pg(k) for k in keys)}{boards}</body></html>'
open('/tmp/deck.html','w').write(html)
with sync_playwright() as p:
    b=p.chromium.launch();g=b.new_page();g.goto('file:///tmp/deck.html',wait_until='networkidle');g.wait_for_timeout(800)
    g.pdf(path=R+'SN-Stitches-UI-Design.pdf',width='1600px',height='1000px',print_background=True);b.close()
