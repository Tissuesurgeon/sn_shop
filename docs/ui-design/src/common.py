P=[("Sika Tie-Dye Playsuit","Casual","Playsuit",420,None,"playsuit-2","playsuit-1","New"),
("Adwoa Ankara Wrap Midi","Ankara","Midi",450,None,"d1","d1-b",None),
("Ama Kente-Inspired Maxi","Kente","Maxi",780,None,"d2","d2-b",None),
("Esi Emerald Satin Gown","Evening","Maxi",1250,1450,"d3","d3-b","Sale"),
("Efua Tiered Ankara Maxi","Ankara","Maxi",620,None,"d5","d5-b",None),
("Yaa Velvet Evening Maxi","Evening","Maxi",980,None,"d7","d7-b",None),
("Akosua Linen Shirt Dress","Casual","Midi",380,None,"d4","d4-b",None),
("Adjoa Kente Panel Midi","Kente","Midi",690,None,"d10","d10-b",None),
("Akua Black & Gold Mermaid","Evening","Maxi",1100,None,"d8","d8-b",None),
("Abena Geometric Midi","Casual","Midi",340,None,"d6","d6-b","Sold out"),
("Afia Ankara Sundress","Ankara","Mini",290,None,"d9","d9-b",None)]
def g(n): return f"GH₵{n:,}"
I=lambda n:f"../img/{n}.webp"
ICON={
'bag':'<svg class="ic" viewBox="0 0 24 24"><path d="M5 8h14l-1.2 12H6.2L5 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>',
'search':'<svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></svg>',
'menu':'<svg class="ic" viewBox="0 0 24 24"><path d="M3 7h18M3 12h12M3 17h18"/></svg>',
'heart':'<svg class="ic" style="width:17px;height:17px" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
'ig':'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/></svg>',
'tt':'<svg viewBox="0 0 24 24"><path d="M14 3v11a4 4 0 1 1-4-4"/><path d="M14 3c.5 3 2.5 4.5 5 4.5"/></svg>',
'wa':'<svg viewBox="0 0 24 24"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z"/></svg>',
'phone':'<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
'needle':'<svg viewBox="0 0 120 20" width="120" height="20"><path d="M2 10 L104 8 Q116 10 104 12 Z" fill="#C9952B" stroke="#8a6a1c" stroke-width=".6"/><ellipse cx="104" cy="10" rx="6" ry="1.6" fill="#FBF6EE"/></svg>',
}
def ann(): return '<div class="ann">✂ Free delivery over GH₵1,500 · Pay with MoMo or card · WhatsApp 054 692 3596</div><div class="kente thin"></div>'
def header(active="",count=2):
    nav="".join(f'<a class="{"on" if a==active else ""}">{a}</a>' for a in ["Shop","New in","Ankara","Kente","Evening","Made to measure","Our story"])
    return f'''{ann()}<header class="hd"><div class="w"><span class="ham">{ICON['menu']}</span><a class="logo"><img src="../img/logo.webp" alt="SN Stitches"><span><b>SN</b> <i>Stitches</i></span></a><nav class="nav">{nav}</nav><span class="only-d">{ICON['search']}</span><span class="bag">{ICON['bag']}<span>{count}</span></span></div></header>'''
def soc(): return f'<div class="soc"><span>{ICON["ig"]}</span><span>{ICON["tt"]}</span><span style="background:var(--wa)">{ICON["wa"]}</span><span style="background:var(--mag)">{ICON["phone"]}</span></div>'
def footer():
    return f'''<div class="kente"></div><footer class="ft linen"><div class="w"><div class="ftg"><div><img src="../img/logo.webp" style="height:110px" alt=""><p style="letter-spacing:.22em;font-size:12px;text-transform:uppercase;color:var(--gold7)">Fashion • Design • Stitch</p><p>Handmade dresses, cut &amp; stitched in Accra.</p>{soc()}</div>
<div><h4>Shop</h4><a>New in</a><a>Ankara</a><a>Kente</a><a>Evening</a><a>Made to measure</a></div><div><h4>Help</h4><a>Delivery &amp; returns</a><a>Size guide</a><a>FAQ</a><a>Track my order</a></div>
<div><h4>Visit the studio</h4><p>Accra, Ghana · Mon–Sat 9am–6pm</p><p>📞 054 692 3596</p><p>Instagram @sn_stitches_</p><p>TikTok @sn_stitches</p></div></div>
<div class="legal"><span>© 2026 SN Stitches. All rights reserved.</span><span>Privacy · Terms · Returns · Payments secured by Paystack</span></div></div></footer>
<a class="fab">{ICON['wa'].replace('<svg','<svg style="width:28px;height:28px;fill:none;stroke:#fff;stroke-width:1.8"')}</a>'''
def card(p,i=0,big=False,lift=False):
    n,c,l,pr,cmp,a,b,badge=p
    bd={"New":"p-new","Sale":"p-sale","Sold out":"p-sold"}
    pill=f'<span class="pill {bd[badge]}">{badge}</span>' if badge else ''
    tag=f'<span class="tag">{g(pr)}{f"<s>{g(cmp)}</s>" if cmp else ""}</span>'
    return f'''<a class="card {'hoverlift' if lift else ''}"><div class="ph">{pill}<span class="heart">{ICON['heart']}</span><img src="{I(a)}" alt="{n}">{'<span class="quick">Quick add · choose size</span>' if lift else ''}</div><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-top:12px"><div><h3 style="margin:0 0 2px">{n}</h3><div class="mt">{c} · {l}</div></div>{tag}</div></a>'''
def page(title,body,extra=""):
    return f'<!doctype html><html lang="en-GH"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title><link rel="stylesheet" href="../ds.css"><style>{extra}</style></head><body>{body}</body></html>'
def thread(d,w,h,style): return f'<svg class="thread" style="{style}" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><path d="{d}"/></svg>'
