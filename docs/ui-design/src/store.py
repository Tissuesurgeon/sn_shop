from common import *
S={}
# ---------------- 01 HOME ----------------
S['01-home']=page('Home',header('')+f'''
<section class="hero" style="position:relative;overflow:hidden">
 <div class="w heroin">
  <div class="htxt">
   <p class="eb">New season · Cut &amp; stitched in Accra</p>
   <h1 class="hh">Dresses with a story,<br><span class="sc">stitched</span> for you.</h1>
   <hr class="stitch">
   <p class="lead">Ankara, kente-inspired and evening dresses — designed in our Accra studio and finished by hand, one seam at a time. Delivered to all 16 regions.</p>
   <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn p">Shop the collection</a><a class="btn g">Made to measure</a></div>
   <div class="trust"><span><b>4.9★</b> from 300+ clients</span><span class="momo mtn">MoMo</span><span class="momo tel">Telecel</span><span class="momo at">AT</span><span class="momo visa">VISA</span></div>
  </div>
  <div class="hart">
   <div class="drape" style="width:330px;height:420px;right:-40px;top:30px"></div>
   <div class="foil hi1"><img src="{I('d1')}" alt=""></div>
   <div class="foil hi2 stitched"><img src="{I('playsuit-2')}" alt=""></div>
   <span class="tag big mag hprice">New · {g(420)}</span>
   <div class="hcap"><span class="sc" style="font-size:30px">Sika</span><br><span class="xs muted">TIE-DYE PLAYSUIT · LOOK 01</span></div>
   <span class="num hnum">01</span>
  </div>
 </div>
 {thread("M-20 520 C 200 430, 380 640, 640 520 S 980 300, 1180 420 S 1420 600, 1500 470",1500,700,"left:0;top:40px;width:100%")}
</section>
<div class="kente"></div>
<section class="sec"><div class="w">
 <div class="shead"><div><p class="eb">Fresh off the cutting table</p><h2>New in the <span class="sc">atelier</span></h2></div><a class="lnk">View all 48 pieces →</a></div>
 <div class="ed">
  <div class="edbig stitched" style="border-radius:16px"><img src="{I('d7')}" alt=""><div class="edl"><span class="eb" style="color:#F3D98E">The evening edit</span><h3 style="color:#fff;font-size:40px">Velvet, satin<br>&amp; gold.</h3><a class="btn gold s">Shop evening</a></div></div>
  {''.join(card(p,lift=(i==1)) for i,p in enumerate([P[0],P[2],P[3],P[4]]))}
 </div>
</div></section>
<section class="sec linen" style="position:relative"><div class="w">
 <div class="shead"><div><p class="eb">Find your fabric</p><h2>Shop by <span class="sc">story</span></h2></div></div>
 <div class="cats">
 {''.join(f'<a class="cat"><div class="cph"><img src="{I(im)}" alt=""></div><div class="ctag"><span class="hole"></span><b>{n}</b><small>{d}</small></div></a>' for n,im,d in [("Ankara","d5","Bold wax prints · 14 styles"),("Kente","d2","Woven heritage · 9 styles"),("Evening","d3","Satin &amp; velvet · 11 styles"),("Casual","d4","Linen &amp; playsuits · 14 styles")])}
 </div></div></section>
<section class="sec" style="position:relative"><div class="w">
 <div class="shead" style="justify-content:center;text-align:center"><div><p class="eb">How every SN piece is made</p><h2>From sketch to <span class="sc">stitch</span></h2></div></div>
 <div class="proc">
  {''.join(f'<div class="pstep"><span class="num">{n}</span><h3>{t}</h3><p class="muted sm">{d}</p></div>' for n,t,d in [("01","Sketch","Every design starts in the notebook of our Accra studio."),("02","Select","We hand-pick wax prints, kente-weave &amp; satins from Makola and beyond."),("03","Cut &amp; stitch","Cut to your size, sewn and finished by hand by our seamstresses."),("04","Deliver","Pressed, wrapped in tissue and sent to you anywhere in Ghana.")])}
 </div>
 {thread("M0 60 C 150 0, 300 120, 450 60 S 750 0, 900 60 S 1150 120, 1240 50",1240,130,"left:50%;margin-left:-620px;top:250px")}
</div></section>
<section class="mtm"><div class="w mtmin">
  <div class="mtmimg"><img src="{I('d10')}" alt=""><img class="mtm2 foil" src="{I('d2-c')}" alt=""></div>
  <div><p class="eb" style="color:#F3D98E">Made to measure</p><h2 style="font-size:52px;color:#fff">Your measurements,<br>our <span class="sc" style="color:#F08AB8">needle.</span></h2><hr class="stitch" style="border-color:var(--gold)"><p style="color:#D9CDB8">Choose any dress, send us your bust, waist, hip &amp; length on WhatsApp, and we'll cut it just for you. Ready in 7–10 days, free alterations for 14 days.</p>
  <div class="tape" style="margin:26px 0 30px;max-width:420px">{''.join(f'<span class="tk">{x}</span>' for x in ["32","34","36","38","40","42"])}</div>
  <a class="btn gold">Start a custom order</a> <a class="btn wa" style="margin-left:8px">WhatsApp us</a></div>
</div></section>
<section class="sec"><div class="w">
 <div class="shead"><div><p class="eb">Worn by you</p><h2>@sn_stitches_ <span class="sc">on the gram</span></h2></div><div class="sm">Follow on <b style="color:var(--mag)">Instagram</b> · <b style="color:var(--mag)">TikTok @sn_stitches</b></div></div>
 <div class="igs">{''.join(f'<div class="ig{" tk" if i in (1,4) else ""}"><img src="{I(x)}" alt="">{"<span class=igp>▶ 12.4k</span>" if i in (1,4) else ""}</div>' for i,x in enumerate(["d9","playsuit-1","d1-c","d8","d5-b","d10-c"]))}</div>
</div></section>
'''+footer(),'''
.heroin{display:grid;grid-template-columns:1.05fr 1fr;gap:40px;align-items:center;min-height:700px;position:relative;z-index:3}
.hh{font-size:82px;font-weight:600;letter-spacing:-.02em;line-height:.98}.hh .sc{font-size:1.18em;line-height:.6}
.lead{font-size:18px;color:#3E372F;max-width:470px;margin:0 0 30px}
.trust{display:flex;align-items:center;gap:8px;margin-top:30px;font-size:13.5px;color:var(--muted)}.trust>span:first-child{margin-right:10px}
.hart{position:relative;height:640px}
.hi1{position:absolute;right:40px;top:0;width:360px;height:500px;border-radius:200px 200px 16px 16px;overflow:hidden}.hi1 img,.hi2 img{width:100%;height:100%;object-fit:cover}
.hi2{position:absolute;left:0;bottom:10px;width:250px;height:330px;border-radius:16px;overflow:hidden;background:#fff}
.hprice{position:absolute;left:200px;top:120px;z-index:4}.hcap{position:absolute;right:60px;bottom:40px;text-align:right}.hnum{position:absolute;left:-30px;top:-10px;font-size:150px}
.ed{display:grid;grid-template-columns:1.25fr 1fr 1fr;grid-template-rows:auto auto;gap:36px 24px}
.edbig{grid-row:1/3;position:relative;overflow:hidden;border-radius:16px}.edbig img{width:100%;height:100%;object-fit:cover}.edl{position:absolute;left:0;right:0;bottom:0;padding:40px 30px 30px;background:linear-gradient(transparent,rgba(20,20,20,.8))}
.ed .card:nth-child(3),.ed .card:nth-child(5){margin-top:60px}
.cats{display:grid;grid-template-columns:1.3fr 1fr 1fr 1.3fr;gap:22px;align-items:end}.cat:nth-child(even){transform:translateY(-30px)}
.cph{aspect-ratio:3/4;border-radius:180px 180px 14px 14px;overflow:hidden}.cat:nth-child(even) .cph{border-radius:14px}.cph img{width:100%;height:100%;object-fit:cover}
.ctag{position:relative;background:#fff;border:1px solid var(--gold);margin:-30px 18px 0;padding:14px 16px 14px 40px;clip-path:polygon(22px 0,100% 0,100% 100%,22px 100%,0 50%)}.ctag .hole{position:absolute;left:16px;top:50%;width:9px;height:9px;margin-top:-4.5px;border-radius:50%;border:1.5px solid var(--gold7)}.ctag b{font-family:var(--serif);font-size:26px;display:block;line-height:1}.ctag small{font-size:12px;color:var(--muted);letter-spacing:.05em}
.proc{display:grid;grid-template-columns:repeat(4,1fr);gap:28px;position:relative;z-index:3}.pstep{background:#fff;border-radius:16px;padding:30px 24px;border:1px solid var(--line)}.pstep .num{font-size:80px;display:block;margin-bottom:16px}.pstep:nth-child(even){margin-top:50px}.pstep h3{font-size:28px}
.mtm{background:var(--ink);padding:90px 0;position:relative;overflow:hidden}.mtmin{display:grid;grid-template-columns:1fr 1.1fr;gap:70px;align-items:center}.mtmimg{position:relative;height:520px}.mtmimg>img:first-child{width:78%;height:100%;object-fit:cover;border-radius:16px}.mtm2{position:absolute;right:0;bottom:-30px;width:46%;height:260px;object-fit:cover;border-radius:12px}
.igs{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}.ig{position:relative;aspect-ratio:1;border-radius:12px;overflow:hidden}.ig.tk{aspect-ratio:auto;grid-row:span 1}.ig img{width:100%;height:100%;object-fit:cover}.igp{position:absolute;left:10px;bottom:10px;color:#fff;font-size:12.5px;font-weight:500;text-shadow:0 1px 4px rgba(0,0,0,.6)}
@media(max-width:600px){.heroin{grid-template-columns:1fr;min-height:0;padding-top:24px;gap:10px}.hh{font-size:50px}.lead{font-size:16px}.hart{height:470px;order:-1}.hi1{width:240px;height:350px;right:0}.hi2{width:165px;height:220px}.hprice{left:120px;top:60px}.hnum{font-size:110px;left:4px}.hcap{right:10px;bottom:0}.drape{width:200px!important;height:280px!important}.trust{flex-wrap:wrap}
.ed{grid-template-columns:1fr 1fr}.edbig{grid-column:1/-1;grid-row:auto;height:420px}.ed .card:nth-child(3),.ed .card:nth-child(5){margin-top:0}.ed .card:nth-child(odd){margin-top:28px}
.cats{grid-template-columns:1fr 1fr;gap:28px 14px}.cat:nth-child(even){transform:none}.ctag{margin:-24px 8px 0;padding:10px 10px 10px 32px}.ctag b{font-size:21px}.ctag small{font-size:10.5px}
.proc{grid-template-columns:1fr 1fr;gap:14px}.pstep{padding:20px 16px}.pstep .num{font-size:56px}.pstep h3{font-size:22px}.pstep:nth-child(even){margin-top:30px}
.mtm{padding:56px 0}.mtmin{grid-template-columns:1fr;gap:50px}.mtmimg{height:380px}.mtm h2{font-size:38px!important}.mtm .btn{margin:0 0 10px!important}
.igs{grid-template-columns:repeat(3,1fr);gap:8px}.thread{display:none}.hero .thread{display:block}}''')

# ---------------- 02 SHOP ----------------
prods=P[:]
S['02-shop']=page('Shop',header('Shop')+f'''
<section class="w shh"><div><p class="eb">The collection · 48 pieces</p><h1>All <span class="sc">dresses</span></h1></div><p class="muted" style="max-width:420px">Wax prints, kente weaves, silk-soft satins. Every piece cut and finished by hand in Accra — XS to XXL, or made to your measure.</p></section>
<div class="w"><div class="catrow">{''.join(f'<span class="lbl {"on" if i==0 else ""}">{x}</span>' for i,x in enumerate(["All · 48","Ankara · 14","Kente · 9","Evening · 11","Casual · 14","Made to measure"]))}</div></div>
<hr class="seam" style="max-width:1160px;margin:0 auto">
<div class="w shop">
 <aside class="filt only-d">
  <h4>Size</h4><div>{''.join(f'<span class="lbl {"on" if s in ("M","L") else ""}">{s}</span>' for s in ["XS","S","M","L","XL","XXL"])}</div>
  <h4>Length</h4><div>{''.join(f'<span class="lbl {"on" if s=="Maxi" else ""}">{s}</span>' for s in ["Mini","Midi","Maxi","Playsuit"])}</div>
  <h4>Price</h4><div class="rng"><div class="bar"><i></i><b style="left:8%"></b><b style="left:72%"></b></div><div class="sm" style="display:flex;justify-content:space-between"><span>GH₵300</span><span>GH₵1,100</span></div></div>
  <h4>Colour</h4><div class="sw">{''.join(f'<i style="background:{c}"></i>' for c in ["#B0185E","#D4A437","#1F3E8C","#0F5B3E","#B4583F","#141414","#F3EBDD"])}</div>
  <label class="tog"><span class="sw2 on"></span> In stock only</label>
  <div class="mtmbox stitched"><span class="btnicon"><i></i><i></i><i></i><i></i></span><h4 style="margin:10px 0 4px">Can't find your size?</h4><p class="sm muted" style="margin:0 0 12px">Any dress can be cut to your measurements.</p><a class="lnk">Made to measure →</a></div>
 </aside>
 <div>
  <div class="tb"><span class="only-m btn g s" style="display:inline-flex!important">Filters · 3</span><span class="sm muted only-d">Showing <b style="color:var(--ink)">11</b> of 48 · <span class="lbl" style="height:30px;font-size:12.5px">M ✕</span><span class="lbl" style="height:30px;font-size:12.5px">L ✕</span><span class="lbl" style="height:30px;font-size:12.5px">Maxi ✕</span></span><span class="in sel" style="width:220px;height:42px;font-size:14px">Sort: Featured</span></div>
  <div class="mas">
   {card(P[0])}{card(P[2])}
   <div class="feat stitched"><img src="{I('d3')}" alt=""><div class="fl"><p class="eb" style="color:#F3D98E">Look 07 · Evening</p><h3 style="font-size:36px;color:#fff">Esi Emerald<br>Satin Gown</h3><span class="tag big">{g(1250)}<s>{g(1450)}</s></span></div></div>
   {card(P[1],lift=True)}{card(P[4])}{card(P[5])}{card(P[7])}
   <div class="quote linen"><span class="sc" style="font-size:44px;line-height:1">“</span><p style="font-family:var(--serif);font-size:24px;line-height:1.25;margin:0 0 14px">The fit was perfect — they altered my Ama maxi in two days for my sister's engagement.</p><span class="xs muted">— NANA A., KUMASI ★★★★★</span></div>
   {card(P[8])}{card(P[6])}{card(P[9])}
  </div>
  <div style="text-align:center;margin:50px 0 80px"><div class="running" style="margin-bottom:14px">{"<i></i>"*8}</div><p class="sm muted">You've seen 11 of 48</p><a class="btn g">Load more dresses</a></div>
 </div>
</div>'''+footer(),'''
.shh{display:flex;justify-content:space-between;align-items:flex-end;padding:56px 40px 26px;gap:20px}.shh h1{font-size:72px;margin:0}
.catrow{padding:6px 0 18px;white-space:nowrap;overflow:hidden}
.shop{display:grid;grid-template-columns:250px 1fr;gap:44px;padding-top:32px}
.filt h4{font-size:21px;margin:26px 0 10px}.filt h4:first-child{margin-top:0}
.rng .bar{position:relative;height:3px;background:var(--line);margin:18px 6px 12px}.rng i{position:absolute;left:8%;right:28%;height:3px;background:var(--mag)}.rng b{position:absolute;top:-9px;width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid var(--mag);margin-left:-10px}
.sw{display:flex;gap:9px;flex-wrap:wrap}.sw i{width:28px;height:28px;border-radius:50%;box-shadow:0 0 0 1px var(--line)}.sw i:first-child{box-shadow:0 0 0 2px var(--cream),0 0 0 3.5px var(--mag)}
.tog{display:flex;gap:10px;align-items:center;margin:24px 0;font-size:14.5px}.sw2{width:40px;height:24px;border-radius:12px;background:var(--mag);position:relative}.sw2::after{content:"";position:absolute;right:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff}
.mtmbox{background:#fff;border-radius:14px;padding:22px}
.tb{display:flex;justify-content:space-between;align-items:center;margin-bottom:26px;gap:10px}
.mas{display:grid;grid-template-columns:repeat(3,1fr);gap:40px 24px;grid-auto-flow:dense}
.feat{grid-column:span 2;grid-row:span 2;position:relative;border-radius:16px;overflow:hidden}.feat img{width:100%;height:100%;object-fit:cover;object-position:center 20%}.fl{position:absolute;left:0;right:0;bottom:0;padding:50px 32px 32px;background:linear-gradient(transparent,rgba(20,20,20,.82))}
.mas>.card:nth-child(3n+2){margin-top:0}
.quote{border-radius:16px;padding:32px;display:flex;flex-direction:column;justify-content:center;border:1px dashed var(--mag)}
@media(max-width:600px){.shh{flex-direction:column;align-items:flex-start;padding:30px 20px 16px}.shh h1{font-size:46px}.shh p{font-size:14.5px}
.shop{grid-template-columns:1fr;padding-top:18px}.mas{grid-template-columns:1fr 1fr;gap:26px 12px}.feat{grid-column:1/-1;grid-row:auto;height:460px}.feat h3{font-size:30px!important}.quote{grid-column:1/-1;padding:24px}.quote p{font-size:20px!important}.tb .in{width:160px!important}.mas>.card:nth-child(even){margin-top:24px}}''')
S['_card']=None
del S['_card']
# ---------------- 03 PRODUCT ----------------
def pdp(drawer=False):
    tape=''.join(f'<span class="tk {"on" if s=="M" else ""} {"x" if s=="XXL" else ""}">{s}</span>' for s in ["XS","S","M","L","XL","XXL"])
    body=header('Shop',count=3 if drawer else 2)+f'''
<div class="w crumbs xs muted">HOME &nbsp;/&nbsp; SHOP &nbsp;/&nbsp; CASUAL &nbsp;/&nbsp; <span style="color:var(--ink)">SIKA TIE-DYE PLAYSUIT</span></div>
<section class="w pdp">
 <div class="gal">
  <div class="g1 foil"><img src="{I('playsuit-2')}" alt="Model wearing the Sika tie-dye playsuit"><span class="pill p-new" style="position:absolute;top:16px;left:16px">New</span><span class="gdots only-m"><i class="on"></i><i></i><i></i></span></div>
  <div class="g2 stitched only-d"><img src="{I('playsuit-1')}" alt="Sika playsuit on mannequin"></div>
  <div class="g3 only-d"><img src="{I('playsuit-1')}" alt="" style="object-position:50% 35%;transform:scale(1.7)"></div>
  <span class="num only-d" style="position:absolute;left:-24px;bottom:-30px;font-size:140px">07</span>
 </div>
 <div class="info">
  <p class="eb">Casual · Playsuit · Look 07</p>
  <h1 class="pt">Sika Tie-Dye<br><span class="sc">Playsuit</span></h1>
  <div style="display:flex;align-items:center;gap:14px;margin:18px 0"><span class="tag big">{g(420)}</span><span class="sm muted">or 3 × GH₵140 with MoMo</span></div>
  <p class="muted">Hand-dyed in Aburi in burnt orange, charcoal and gold. A relaxed camp collar, short sleeves and a self-tie waist over easy shorts with pockets — Saturday in Osu, sorted.</p>
  <hr class="seam" style="margin:22px 0">
  <div class="opt"><span class="lab">COLOUR — <b style="color:var(--ink)">Harmattan Sunset</b></span><div class="sw" style="display:flex;gap:10px"><i class="swc on" style="background:linear-gradient(135deg,#E07A1F,#3A3A3A 60%,#D4A437)"></i><i class="swc" style="background:linear-gradient(135deg,#1F3E8C,#F3EBDD)"></i></div></div>
  <div class="opt"><span class="lab" style="display:flex;justify-content:space-between">SIZE — <b style="color:var(--ink);margin-right:auto;margin-left:4px">M (UK 10)</b><a class="lnk" style="font-size:13px">📏 Size guide</a></span><div class="tape">{tape}</div><p class="xs" style="color:var(--mag);margin:8px 0 0">● Only 2 left in M · XXL sold out — <u>WhatsApp to pre-order</u></p></div>
  <div class="buy"><div class="qty"><span>−</span><span>1</span><span>+</span></div><a class="btn p" style="flex:1">Add to bag — {g(420)}</a></div>
  <a class="btn wa b" style="margin-top:12px">Order this on WhatsApp</a>
  <div class="mtmc stitched"><span class="btnicon"><i></i><i></i><i></i><i></i></span><div><b>Make it to measure +GH₵80</b><br><span class="sm muted">Send your measurements after checkout. Ready in 7–10 days.</span></div><span class="sw2"></span></div>
  <div class="perks xs"><span>🧵 Hand-finished in Accra</span><span>🚚 Accra same-day</span><span>↺ 7-day exchange</span></div>
  {''.join(f'<details {"open" if i==0 else ""}><summary>{t}</summary><p class="sm muted">{d}</p></details>' for i,(t,d) in enumerate([("The details","100% cotton poplin, hand tie-dyed · Camp collar, button front · Self-tie belt · Side pockets · Model is 5'8\" and wears S"),("Fabric &amp; care","Cold hand wash inside out, dry in shade to protect the dye."),("Delivery &amp; returns","Accra same-day (order by 12pm) GH₵40 · next-day GH₵25 · other regions 2–4 days GH₵55 · free over GH₵1,500.")]))}
 </div>
</section>
<section class="sec" style="padding-top:20px"><div class="w"><div class="kente thin" style="margin-bottom:50px"></div><div class="shead"><h2>Style it <span class="sc">with</span></h2><a class="lnk">More casual →</a></div><div class="grid">{''.join(card(p) for p in [P[6],P[10],P[1],P[9]])}</div></div></section>
<div class="stickybuy only-m"><span class="tag">{g(420)}</span><a class="btn p" style="flex:1;height:46px">Add to bag · M</a></div>
'''+footer()
    if drawer:
        lines=[(P[0],"M","Harmattan Sunset",1),(P[2],"L","Heritage Gold",1)]
        st=420+780
        body+=f'''<div class="drawer-scrim" style="position:fixed"></div><aside class="drw"><div class="dh"><h3>Your bag <span class="sc" style="font-size:26px">(2)</span></h3><span style="font-size:22px">✕</span></div>
<div class="fd"><div class="xs"><b>Add {g(1500-st)} more</b> for free delivery</div><div class="fdb"><i style="width:{st/15}%"></i><span class="btnicon" style="left:{st/15}%"><i></i><i></i><i></i><i></i></span></div></div>
<div class="dl">{''.join(f'<div class="li"><img src="{I(p[5])}" alt=""><div><h4>{p[0]}</h4><div class="xs muted">Size {s} · {c}</div><div style="display:flex;align-items:center;gap:14px;margin-top:10px"><div class="qty" style="height:36px"><span>−</span><span>{q}</span><span>+</span></div><a class="xs muted" style="text-decoration:underline">Remove</a></div></div><span class="tag">{g(p[3])}</span></div>' for p,s,c,q in lines)}
<div class="upsell linen"><img src="{I('d9')}" alt=""><div><span class="xs muted">Complete the look</span><br><b style="font-family:var(--serif);font-size:18px">Afia Ankara Sundress</b><br><span class="sm">{g(290)}</span></div><a class="btn g s">+ Add</a></div></div>
<div class="df"><div style="display:flex;justify-content:space-between;font-size:17px"><span>Subtotal</span><b>{g(st)}</b></div><p class="xs muted" style="margin:4px 0 14px">Delivery &amp; MoMo/card fees calculated at checkout.</p><a class="btn p b">Checkout securely</a><a class="btn wa b" style="margin-top:10px">Order via WhatsApp</a><p class="xs muted" style="text-align:center;margin:12px 0 0"><span class="momo mtn">MoMo</span><span class="momo tel">Telecel</span><span class="momo at">AT</span><span class="momo visa">VISA</span><span class="momo mc">MC</span></p></div></aside>
<div style="position:fixed;left:40px;bottom:30px;z-index:60" class="only-d"><span class="toast"><span class="btnicon"><i></i><i></i><i></i><i></i></span> Sika Tie-Dye Playsuit added to your bag</span></div>'''
    return page('Product',body,'''
.crumbs{padding:26px 40px 0;letter-spacing:.1em}
.pdp{display:grid;grid-template-columns:1.15fr 1fr;gap:70px;padding:26px 40px 40px}
.gal{position:relative;display:grid;grid-template-columns:1.6fr 1fr;grid-template-rows:1fr 1fr;gap:16px;height:820px}
.gal>div{border-radius:16px;overflow:hidden;position:relative}.gal img{width:100%;height:100%;object-fit:cover}.g1{grid-row:1/3;border-radius:240px 240px 16px 16px!important}
.pt{font-size:68px;line-height:.95}.pt .sc{font-size:1.15em}
.opt{margin:20px 0}.swc{width:38px;height:38px;border-radius:50%;display:block}.swc.on{box-shadow:0 0 0 3px var(--cream),0 0 0 4.5px var(--mag)}
.buy{display:flex;gap:12px;margin-top:26px}
.mtmc{display:flex;gap:14px;align-items:center;background:#fff;border-radius:14px;padding:18px;margin:20px 0}.mtmc>div{flex:1;font-size:15px}.sw2{width:40px;height:24px;border-radius:12px;background:var(--line);position:relative;flex:none}.sw2::after{content:"";position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff}
.perks{display:flex;gap:18px;color:var(--muted);margin-bottom:12px;flex-wrap:wrap}
details{border-top:1px dashed rgba(176,24,94,.4)}details summary{list-style:none;padding:16px 0;font-family:var(--serif);font-size:21px;display:flex;justify-content:space-between}details summary::after{content:"+";color:var(--mag)}details[open] summary::after{content:"–"}
.stickybuy{display:none}
.drw{position:fixed;top:0;right:0;width:460px;height:100vh;background:var(--cream);z-index:50;display:flex;flex-direction:column;box-shadow:-20px 0 50px rgba(0,0,0,.2);border-left:3px solid var(--gold)}
.dh{display:flex;justify-content:space-between;align-items:center;padding:22px 26px;border-bottom:1.5px dashed rgba(176,24,94,.5)}.dh h3{font-size:32px;margin:0}
.fd{padding:16px 26px}.fdb{position:relative;height:4px;background:var(--line);border-radius:2px;margin:14px 0 6px}.fdb>i{position:absolute;left:0;top:0;bottom:0;background:repeating-linear-gradient(90deg,var(--mag) 0 8px,transparent 8px 12px)}.fdb .btnicon{position:absolute;top:-9px;margin-left:-11px}
.dl{flex:1;overflow:hidden;padding:0 26px}.li{display:grid;grid-template-columns:84px 1fr auto;gap:16px;padding:18px 0;border-bottom:1px solid var(--line)}.li img{width:84px;height:110px;object-fit:cover;border-radius:10px}.li h4{font-size:19px;margin:0 0 2px}.li .qty span{width:32px}
.upsell{display:flex;gap:14px;align-items:center;border-radius:14px;padding:12px;margin-top:18px}.upsell img{width:56px;height:72px;object-fit:cover;border-radius:8px}.upsell>div{flex:1}
.df{background:#fff;padding:22px 26px;border-top:1px solid var(--line)}
@media(max-width:600px){.crumbs{padding:14px 20px 0;font-size:10.5px}.pdp{grid-template-columns:1fr;gap:24px;padding:14px 20px}.gal{display:block;height:auto}.g1{height:470px;border-radius:200px 200px 14px 14px!important}.gdots{position:absolute;bottom:14px;left:0;right:0;display:flex!important;justify-content:center;gap:6px}.gdots i{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.7)}.gdots i.on{background:var(--mag);width:20px;border-radius:4px}
.pt{font-size:46px}.tape .tk{height:54px;font-size:13.5px}.buy .btn{padding:0 14px;font-size:12px}
.stickybuy{display:flex!important;position:fixed;left:0;right:0;bottom:0;gap:12px;align-items:center;padding:12px 16px 18px;background:rgba(251,246,238,.97);border-top:1.5px dashed rgba(176,24,94,.5);z-index:30}.fab{bottom:90px}
.drw{width:100%;border-left:0}.dh{padding:18px 20px}.fd,.dl,.df{padding-left:20px;padding-right:20px}.li{grid-template-columns:70px 1fr}.li img{width:70px;height:92px}.li .tag{grid-column:2;justify-self:start}}''')
S['03-product']=pdp()
S['04-cart-drawer']=pdp(True)
# ---------------- 05/06 CHECKOUT ----------------
def cohead(step):
    steps=["Bag","Delivery","Payment","Done"]
    st=''.join(f'<span class="cs {"d" if i<step else ""} {"on" if i==step else ""}"><i>{"✓" if i<step else i+1}</i>{s}</span>' for i,s in enumerate(steps))
    return f'<div class="kente thin"></div><header class="hd"><div class="w" style="justify-content:space-between"><a class="logo" style="position:static;transform:none"><img src="../img/logo.webp" alt="SN Stitches"><span class="only-d"><b>SN</b> <i>Stitches</i></span></a><div class="csteps">{st}</div><span class="sm muted only-d">🔒 Secure checkout · Paystack</span></div></header>'
def summary(fee="GH₵40",tot="GH₵1,240",open_=True):
    return f'''<aside class="osum"><div class="box stitched" style="border-radius:18px"><div class="only-m oshead"><span>🧾 Show order summary</span><b>{tot}</b></div><div class="osb"><h3 style="font-size:28px">Order summary</h3>
{''.join(f'<div class="oli"><div class="oim"><img src="{I(p[5])}" alt=""><span>1</span></div><div style="flex:1"><b style="font-family:var(--serif);font-size:18px">{p[0]}</b><div class="xs muted">Size {s}</div></div><span>{g(p[3])}</span></div>' for p,s in [(P[0],"M"),(P[2],"L")])}
<div class="code"><span class="in ph" style="height:44px;flex:1">Discount code</span><a class="btn g s">Apply</a></div>
<div class="sr"><span>Subtotal</span><span>GH₵1,200</span></div><div class="sr"><span>Delivery · Accra same-day</span><span>{fee}</span></div><div class="sr muted xs"><span>Add GH₵300 for free delivery</span></div><hr class="seam" style="margin:14px 0"><div class="sr tot"><span>Total</span><span>{tot}</span></div></div></div>
<div class="assure"><span>🧵 Hand-finished</span><span>↺ 7-day exchange</span><span>💬 054 692 3596</span></div></aside>'''
COCSS='''.csteps{display:flex;gap:6px;align-items:center}.cs{display:flex;align-items:center;gap:8px;font-size:13.5px;color:var(--muted)}.cs:not(:last-child)::after{content:"";width:46px;border-top:1.5px dashed var(--line);margin:0 6px}.cs.d:not(:last-child)::after{border-color:var(--mag)}.cs i{font-style:normal;width:26px;height:26px;border-radius:50%;border:1.5px solid var(--line);display:grid;place-items:center;font-size:12px;background:#fff}.cs.on{color:var(--ink);font-weight:500}.cs.on i{border-color:var(--mag);color:var(--mag);box-shadow:0 0 0 4px var(--mag50)}.cs.d i{background:var(--mag);border-color:var(--mag);color:#fff}
.co{display:grid;grid-template-columns:1.35fr 1fr;gap:56px;padding:44px 40px 90px}.co h1{font-size:54px}
.sect{margin-bottom:22px}.sect h3{font-size:28px;display:flex;align-items:center;gap:12px}.sect h3 .n{font-family:var(--serif);color:transparent;-webkit-text-stroke:1px var(--gold7);font-size:44px;line-height:1}
.f2{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}.f2 .full{grid-column:1/-1}
.osum{position:sticky;top:20px;align-self:start}.oshead{display:none}.oli{display:flex;gap:14px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)}.oim{position:relative}.oim img{width:58px;height:74px;object-fit:cover;border-radius:8px}.oim span{position:absolute;top:-8px;right:-8px;width:22px;height:22px;border-radius:50%;background:var(--mag);color:#fff;font-size:11px;display:grid;place-items:center;box-shadow:0 0 0 2px #fff}
.code{display:flex;gap:10px;margin:16px 0}.sr{display:flex;justify-content:space-between;margin:8px 0;font-size:15px}.sr.tot{font-family:var(--serif);font-size:28px;font-weight:600}
.assure{display:flex;justify-content:space-around;font-size:12.5px;color:var(--muted);margin-top:16px}
.net{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:14px 0 18px}.nw{border:1.5px solid var(--line);border-radius:14px;padding:14px;text-align:center;background:#fff;font-size:13.5px;position:relative}.nw .lg{height:46px;border-radius:10px;display:grid;place-items:center;font-weight:800;font-size:15px;margin-bottom:8px}.nw.on{border:1.5px dashed var(--mag);background:var(--mag50)}.nw.on::after{content:"✓";position:absolute;top:-9px;right:-9px;width:22px;height:22px;border-radius:50%;background:var(--mag);color:#fff;font-size:12px;display:grid;place-items:center}
.momobox{background:var(--warnb);border-radius:12px;padding:14px 16px;font-size:14px;display:flex;gap:12px;margin-top:6px}
@media(max-width:600px){.csteps .cs{font-size:0;gap:0}.cs:not(:last-child)::after{width:18px;margin:0 3px}.cs.on{font-size:12px;gap:6px}.co{grid-template-columns:1fr;padding:20px 16px 110px;gap:20px}.co h1{font-size:38px}.osum{order:-1;position:static}.osb{display:none}.oshead{display:flex!important;justify-content:space-between}.f2{grid-template-columns:1fr}.assure{display:none}.net{gap:8px}.nw{padding:10px 6px;font-size:12px}.nw .lg{font-size:12px;height:38px}.sect h3{font-size:24px}.sect h3 .n{font-size:34px}.cobar{position:fixed;left:0;right:0;bottom:0;padding:12px 16px 18px;background:rgba(251,246,238,.97);border-top:1.5px dashed rgba(176,24,94,.5);z-index:30}}'''
regs=["Greater Accra","Ashanti","Central","Eastern","Western"]
S['05-checkout-delivery']=page('Checkout',cohead(1)+f'''<div class="w co"><div>
<p class="eb">Step 2 of 3</p><h1>Where should we <span class="sc">send it?</span></h1>
<div class="box sect"><h3><span class="n">01</span>Your details</h3><div class="f2">
<div class="fld full"><span class="lab">Full name</span><span class="in">Akosua Mensah</span></div>
<div class="fld"><span class="lab">Phone (we'll call / WhatsApp)</span><span class="in">🇬🇭 &nbsp;024 412 7788</span></div>
<div class="fld"><span class="lab">Email for your receipt</span><span class="in f">akosua.mensah@gmail|</span></div></div></div>
<div class="box sect"><h3><span class="n">02</span>Delivery address</h3><div class="f2">
<div class="fld"><span class="lab">Region</span><span class="in sel">Greater Accra</span></div>
<div class="fld"><span class="lab">City / town</span><span class="in">East Legon</span></div>
<div class="fld"><span class="lab">GhanaPost GPS (optional)</span><span class="in">GA-492-7731</span></div>
<div class="fld"><span class="lab">Phone for rider</span><span class="in e">024 41</span><div class="fe">⚠ Enter a 10-digit Ghana number, e.g. 024 412 7788</div></div>
<div class="fld full"><span class="lab">Address &amp; landmark</span><span class="in ta">House 12, Lagos Avenue — behind the Shell filling station, blue gate</span></div></div>
<h4 style="font-size:22px;margin:10px 0 12px">Delivery option</h4>
<label class="rc on"><span class="rd"></span><span class="t"><b>Accra same-day</b><small>Order before 12:00 · arrives by 7pm today</small></span><span class="tag">GH₵40</span></label>
<label class="rc"><span class="rd"></span><span class="t"><b>Accra next-day</b><small>Arrives tomorrow, Fri 30 Oct</small></span><span class="tag">GH₵25</span></label>
<label class="rc"><span class="rd"></span><span class="t"><b>Pick up at the studio</b><small>Accra · Mon–Sat 9am–6pm · we'll WhatsApp when ready</small></span><span class="tag">Free</span></label>
<p class="xs muted" style="margin:6px 0 0">Outside Greater Accra? Courier / VIP-bus parcel to all 16 regions in 2–4 working days · GH₵55.</p></div>
<div class="cobar"><a class="btn p b">Continue to payment →</a></div><p class="sm muted" style="text-align:center">← Back to bag</p>
</div>{summary()}</div>''',COCSS)
S['06-checkout-payment']=page('Payment',cohead(2)+f'''<div class="w co"><div>
<p class="eb">Step 3 of 3</p><h1>How would you like <span class="sc">to pay?</span></h1>
<div class="box sect" style="padding:20px 24px"><div class="sr sm"><span class="muted">Contact</span><span>Akosua Mensah · 024 412 7788</span><a class="lnk" style="font-size:13px">Change</a></div><hr class="seam" style="opacity:.4;margin:10px 0"><div class="sr sm"><span class="muted">Ship to</span><span>House 12, Lagos Ave, East Legon · Same-day</span><a class="lnk" style="font-size:13px">Change</a></div></div>
<div class="box sect"><h3><span class="n">03</span>Payment</h3>
<label class="rc on" style="align-items:flex-start"><span class="rd" style="margin-top:3px"></span><span class="t"><b>Mobile Money</b><small>Approve the prompt on your phone — no card needed.</small>
<div class="net">
<div class="nw on"><div class="lg" style="background:#FFCC00;color:#000">MTN</div>MTN MoMo</div>
<div class="nw"><div class="lg" style="background:#E60000;color:#fff">telecel</div>Telecel Cash</div>
<div class="nw"><div class="lg" style="background:#0033A0;color:#fff">AT</div>AirtelTigo Money</div></div>
<div class="fld"><span class="lab">MoMo number</span><span class="in f">🇬🇭 &nbsp;024 412 7788</span></div>
<div class="momobox"><span>📲</span><span>After you tap Pay, you'll get a prompt from <b>MTN MoMo</b> on 024 412 7788. Enter your PIN to approve. Don't close this page.</span></div></span></label>
<label class="rc"><span class="rd"></span><span class="t"><b>Debit / credit card</b><small>Visa, Mastercard, Verve · 3-D Secure</small></span><span><span class="momo visa">VISA</span><span class="momo mc">MC</span></span></label>
<label class="rc"><span class="rd"></span><span class="t"><b>Order via WhatsApp</b><small>Send your bag to 054 692 3596 and pay when we confirm</small></span><span class="momo" style="background:var(--wa);color:#fff">WA</span></label>
<div class="cobar" style="margin-top:20px"><a class="btn p b" style="height:56px;font-size:14px">Pay GH₵1,240 with MTN MoMo</a></div>
<p class="xs muted" style="text-align:center;margin:12px 0 0">🔒 Payments processed securely by <b>Paystack</b>. We never see your PIN or card number.</p></div>
<div style="display:flex;align-items:center;gap:14px;justify-content:center" class="sm muted"><span class="running">{"<i></i>"*6}</span> Loading state: “Waiting for your approval…” (running-stitch loader)</div>
</div>{summary()}</div>''',COCSS)
# ---------------- 07 CONFIRM ----------------
S['07-confirmation']=page('Confirmed',cohead(3)+f'''<section class="cf"><div class="w cfin">
<div class="cfl">
<div class="seal"><span class="btnicon" style="width:76px;height:76px;grid-template-columns:12px 12px;gap:10px"><i style="width:12px;height:12px"></i><i style="width:12px;height:12px"></i><i style="width:12px;height:12px"></i><i style="width:12px;height:12px"></i></span></div>
<p class="eb">Order SNS-24017 · Paid with MTN MoMo</p>
<h1 class="ct">Medaase, Akosua!<br><span class="sc">Thank you.</span></h1>
<p class="muted" style="max-width:520px">Your order is confirmed and already on the cutting table. We'll WhatsApp you on <b style="color:var(--ink)">024 412 7788</b> when the rider leaves, and your receipt is on its way to akosua.mensah@gmail.com.</p>
<div class="track">{''.join(f'<div class="tsp {c}"><i>{ic}</i><b>{t}</b><span class="xs muted">{d}</span></div>' for c,ic,t,d in [("d","✓","Paid","1:24 pm"),("cur","✂","Being prepared","now"),("","🛵","Out for delivery","by 5 pm"),("","⌂","Delivered","today")])}</div>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:30px"><a class="btn p">Continue shopping</a><a class="btn wa">Chat about my order</a></div>
</div>
<div class="receipt"><div class="rh"><img src="../img/logo.webp" alt="" style="height:70px;margin:0 auto 6px"><p class="eb" style="text-align:center;margin:0">Receipt · 29 Oct 2026</p></div>
{''.join(f'<div class="sr"><span>{p[0]} · {s}</span><span>{g(p[3])}</span></div>' for p,s in [(P[0],"M"),(P[2],"L")])}
<div class="sr"><span>Accra same-day</span><span>GH₵40</span></div><hr class="seam" style="margin:12px 0"><div class="sr tot" style="font-family:var(--serif);font-size:26px;font-weight:600"><span>Total paid</span><span>GH₵1,240</span></div>
<p class="xs muted" style="margin:14px 0 0">Ship to: House 12, Lagos Avenue, East Legon, Greater Accra (behind Shell, blue gate) · GA-492-7731<br>Paystack ref: T7781203345 · MTN MoMo ••7788</p>
<div class="kente thin" style="margin:18px -28px -28px"></div></div>
</div></section>
<section class="sec" style="padding-top:20px"><div class="w"><div class="shead"><h2>Share your <span class="sc">look</span></h2><span class="sm">Tag <b style="color:var(--mag)">@sn_stitches_</b> on Instagram &amp; <b style="color:var(--mag)">@sn_stitches</b> on TikTok for a feature ✨</span></div></div></section>'''+footer(),COCSS+'''
.cf{padding:60px 0 30px;position:relative}.cfin{display:grid;grid-template-columns:1.3fr 1fr;gap:60px;align-items:start}.ct{font-size:72px;line-height:.98}.ct .sc{font-size:1.15em}
.seal{width:110px;height:110px;border-radius:50%;border:2px dashed var(--mag);display:grid;place-items:center;margin-bottom:22px}
.track{display:grid;grid-template-columns:repeat(4,1fr);margin-top:30px;position:relative}.tsp{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;position:relative;font-size:14px}.tsp i{font-style:normal;width:44px;height:44px;border-radius:50%;background:#fff;border:1.5px solid var(--line);display:grid;place-items:center;z-index:1;margin-bottom:6px}.tsp.d i{background:var(--mag);color:#fff;border-color:var(--mag)}.tsp.cur i{border:2px dashed var(--mag);color:var(--mag)}.tsp:not(:last-child)::after{content:"";position:absolute;top:22px;left:50%;width:100%;border-top:2px dashed var(--line)}.tsp.d::after{border-color:var(--mag)!important}
.receipt{background:#fff;border:1px solid var(--line);padding:28px;border-radius:4px;box-shadow:0 20px 40px -24px rgba(0,0,0,.3);transform:rotate(1.2deg);position:relative;overflow:hidden}.receipt::before{content:"";position:absolute;top:0;left:0;right:0;height:10px;background:radial-gradient(circle at 6px -2px,var(--cream) 6px,transparent 6.5px) 0 0/12px 10px}
@media(max-width:600px){.cf{padding:30px 0}.cfin{grid-template-columns:1fr;gap:36px}.ct{font-size:46px}.seal{width:90px;height:90px}.track{grid-template-columns:repeat(4,minmax(0,1fr))}.tsp{font-size:11.5px}.tsp i{width:36px;height:36px}.tsp:not(:last-child)::after{top:18px}.receipt{transform:none}}''')
# ---------------- 08 ABOUT ----------------
S['08-about']=page('Our story',header('Our story')+f'''
<section class="ab1"><div class="w abin">
<div><p class="eb">Our story</p><h1 class="abh">Fashion. Design.<br><span class="sc">Stitch.</span></h1><p class="lead2">SN Stitches began with one Singer machine, a stack of wax-print offcuts and a promise: dresses that fit Ghanaian women properly, made by Ghanaian hands.</p>
<div class="stats">{''.join(f'<div><span class="num" style="font-size:72px">{n}</span><span class="sm muted">{t}</span></div>' for n,t in [("6","seamstresses in our Accra studio"),("16","regions we deliver to"),("1.2k","dresses stitched so far")])}</div></div>
<div class="abimg"><div class="drape" style="width:260px;height:340px;left:-40px;bottom:-30px"></div><img class="a1 foil" src="{I('d2')}" alt=""><img class="a2 stitched" src="{I('d10-c')}" alt=""><span class="tag big" style="position:absolute;right:20px;top:30px;z-index:4">Est. Accra</span></div>
</div>{thread("M0 80 C 300 0, 500 160, 760 70 S 1200 10, 1440 90",1440,160,"left:0;bottom:-40px;width:100%")}</section>
<div class="kente"></div>
<section class="sec"><div class="w">
<div class="shead" style="justify-content:center;text-align:center"><div><p class="eb">The atelier process</p><h2>From sketch to <span class="sc">stitch</span></h2></div></div>
<div class="tl">{''.join(f'<div class="tli {"r" if i%2 else ""}"><div class="tlimg"><img src="{I(im)}" alt=""></div><div class="tlt"><span class="num">{n}</span><h3>{t}</h3><p class="muted">{d}</p></div></div>' for i,(n,t,d,im) in enumerate([("01","Sketch","Our designer starts every collection in pencil — silhouettes inspired by Accra's street style and our grandmothers' kaba.","d1-c"),("02","Select the cloth","Wax prints from Makola, kente-woven strips from Bonwire, satins and velvets for the evening edit.","d2-c"),("03","Cut &amp; stitch","Patterns graded XS–XXL or drafted to your measurements, then sewn and finished by hand.","d7-c"),("04","Press &amp; deliver","Steamed, tissue-wrapped with a hand-written note and sent same-day across Accra.","d5-c")]))}</div>
</div></section>
<section class="quoteb linen"><div class="w" style="text-align:center;max-width:900px"><span class="sc" style="font-size:80px;line-height:.5">“</span><p style="font-family:var(--serif);font-size:40px;line-height:1.2;margin:10px 0 20px">Every seam is a signature. We want you to feel the hands that made your dress.</p><p class="eb">— Founder, SN Stitches</p></div></section>
'''+footer(),'''
.ab1{position:relative;padding:60px 0 90px}.abin{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}.abh{font-size:96px;line-height:.92}.abh .sc{font-size:1.2em}.lead2{font-size:19px;color:#3E372F;max-width:500px}
.stats{display:flex;gap:40px;margin-top:36px}.stats>div{display:flex;flex-direction:column;max-width:140px}
.abimg{position:relative;height:620px}.a1{position:absolute;right:0;top:0;width:72%;height:88%;object-fit:cover;border-radius:220px 220px 16px 16px;z-index:2}.a2{position:absolute;left:0;bottom:0;width:44%;height:52%;object-fit:cover;border-radius:16px;z-index:3;border:6px solid var(--cream)}
.tl{position:relative;display:flex;flex-direction:column;gap:60px}.tl::before{content:"";position:absolute;left:50%;top:0;bottom:0;border-left:2px dashed var(--mag);opacity:.6}
.tli{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}.tli.r .tlimg{order:2}.tlimg{height:360px;border-radius:16px;overflow:hidden}.tlimg img{width:100%;height:100%;object-fit:cover}.tlt .num{font-size:96px;display:block;margin-bottom:10px}.tlt h3{font-size:40px}
.quoteb{padding:90px 0}
@media(max-width:600px){.ab1{padding:30px 0 50px}.abin{grid-template-columns:1fr;gap:30px}.abh{font-size:58px}.lead2{font-size:16px}.stats{gap:16px}.stats .num{font-size:50px!important}.abimg{height:420px}.tl::before{left:16px}.tli{grid-template-columns:1fr;gap:16px;padding-left:40px}.tli.r .tlimg{order:0}.tlimg{height:240px}.tlt .num{font-size:60px}.tlt h3{font-size:30px}.quoteb{padding:56px 0}.quoteb p:first-of-type{font-size:28px!important}}''')
# ---------------- 09 CONTACT ----------------
S['09-contact']=page('Contact',header('')+f'''
<section class="w cth"><p class="eb">Contact the studio</p><h1>Let's talk <span class="sc">fabric.</span></h1><p class="muted" style="max-width:560px;margin:0 auto">Questions about sizing, a custom order or your delivery? We usually reply on WhatsApp within the hour, Mon–Sat 9am–6pm.</p></section>
<section class="w ctg">
<a class="cc wa stitched"><span class="ci">{ICON['wa']}</span><h3>WhatsApp</h3><p>054 692 3596</p><span class="btn s" style="background:#fff;color:var(--wa);border-color:#fff">Start a chat →</span></a>
<a class="cc stitched"><span class="ci" style="background:var(--mag)">{ICON['phone']}</span><h3>Call us</h3><p>054 692 3596</p><span class="lnk">tel:+233 54 692 3596</span></a>
<a class="cc stitched ig"><span class="ci" style="background:linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)">{ICON['ig']}</span><h3>Instagram</h3><p>@sn_stitches_</p><span class="lnk">New drops &amp; styling →</span></a>
<a class="cc stitched"><span class="ci" style="background:var(--ink)">{ICON['tt']}</span><h3>TikTok</h3><p>@sn_stitches</p><span class="lnk">Behind the seams →</span></a>
</section>
<section class="sec"><div class="w ct2">
<div class="box stitched" style="border-radius:18px"><h3 style="font-size:32px">Send a message</h3><div class="fld"><span class="lab">Your name</span><span class="in">Efua Owusu</span></div><div class="fld"><span class="lab">Phone or email</span><span class="in">020 555 0192</span></div><div class="fld"><span class="lab">Topic</span><div>{''.join(f'<span class="lbl {"on" if i==1 else ""}">{t}</span>' for i,t in enumerate(["Order","Made to measure","Sizing","Wholesale"]))}</div></div><div class="fld"><span class="lab">Message</span><span class="in ta" style="height:120px">Hello! I'd like the Ama maxi in a shorter length for my graduation on 14 Nov…</span></div><a class="btn p">Send message</a></div>
<div class="visit"><img src="{I('d4-b')}" alt=""><div class="vt linen"><p class="eb">Visit the studio</p><h3 style="font-size:34px">Accra, Ghana</h3><p class="muted sm">Fittings &amp; pickups by appointment.<br>Mon–Sat · 9:00am – 6:00pm<br>Exact address shared on WhatsApp.</p><hr class="seam" style="width:80px;margin:14px 0"><p class="sm">Wholesale &amp; bridal parties: <b>054 692 3596</b></p></div></div>
</div></section>'''+footer(),'''
.cth{text-align:center;padding:70px 40px 40px}.cth h1{font-size:84px}
.ctg{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.cc{background:#fff;border-radius:18px;padding:30px 26px;border:1px solid var(--line)}.cc.wa{background:var(--wa);color:#fff;border:0}.cc.wa::after{border-color:rgba(255,255,255,.5)}.cc h3{font-size:30px;margin:18px 0 2px}.cc p{font-size:19px;margin:0 0 18px;font-weight:500}
.ci{width:54px;height:54px;border-radius:50%;background:rgba(255,255,255,.2);display:grid;place-items:center}.ci svg{width:26px;height:26px;fill:none;stroke:#fff;stroke-width:1.7}
.ct2{display:grid;grid-template-columns:1.1fr 1fr;gap:40px}.visit{position:relative;border-radius:18px;overflow:hidden;min-height:520px}.visit>img{width:100%;height:100%;object-fit:cover;position:absolute}.vt{position:absolute;left:24px;right:24px;bottom:24px;border-radius:14px;padding:24px}
@media(max-width:600px){.cth{padding:40px 20px 24px}.cth h1{font-size:52px}.ctg{grid-template-columns:1fr 1fr;gap:12px}.cc{padding:20px 16px}.cc h3{font-size:24px}.cc p{font-size:15px}.ct2{grid-template-columns:1fr}.visit{min-height:440px}}''')
# ---------------- 10 SIZE + FAQ ----------------
rows=[('XS',6,32,25,35),('S',8,34,27,37),('M',10,36,29,39),('L',12,38,31,41),('XL',14,40,33,43),('XXL',16,42,35,45)]
S['10-size-guide-faq']=page('Size guide & FAQ',header('')+f'''
<section class="w sgh"><div><p class="eb">Help · Size guide &amp; FAQ</p><h1>Find your <span class="sc">perfect fit</span></h1></div><div class="sgt"><span class="lbl on">Inches</span><span class="lbl">Centimetres</span></div></section>
<section class="w sgg">
<div class="box stitched" style="border-radius:18px;padding:0;overflow:hidden"><div class="tapehead"><div class="tape" style="max-width:none;border-radius:0;border:0">{''.join(f'<span class="tk {"on" if r[0]=="M" else ""}">{r[0]}</span>' for r in rows)}</div></div>
<table class="t sgtab"><tr><th>Size</th><th>UK</th><th>Bust</th><th>Waist</th><th>Hips</th></tr>{''.join(f'<tr class="{"hl" if r[0]=="M" else ""}"><td><b>{r[0]}</b></td><td>{r[1]}</td><td>{r[2]}"</td><td>{r[3]}"</td><td>{r[4]}"</td></tr>' for r in rows)}</table></div>
<div class="howto linen"><h3 style="font-size:30px">How to measure</h3><div class="fig"><svg viewBox="0 0 120 240" width="120" height="240"><path d="M60 14a14 14 0 1 1 0 .1M42 46q18-8 36 0l8 60-10 6 6 90H38l6-90-10-6z" fill="#fff" stroke="#141414" stroke-width="1.4"/><path d="M38 70h44M44 108h32M36 140h48" stroke="#B0185E" stroke-width="2" stroke-dasharray="4 3"/></svg><ol class="sm"><li><b>Bust</b> — around the fullest part, tape level.</li><li><b>Waist</b> — the narrowest point, above the navel.</li><li><b>Hips</b> — the fullest part, feet together.</li></ol></div><p class="sm muted">Between sizes? Size up — or choose <b style="color:var(--mag)">Made to measure</b> and we'll cut it for you.</p><a class="btn wa s">Ask a stylist on WhatsApp</a></div>
</section>
<div class="kente thin" style="max-width:1160px;margin:70px auto 0"></div>
<section class="sec"><div class="w faq">
<div><p class="eb">FAQ</p><h2 style="font-size:52px">Delivery, returns &amp; <span class="sc">more</span></h2><div style="margin-top:20px">{''.join(f'<span class="lbl {"on" if i==0 else ""}" style="display:flex;margin-bottom:8px;width:max-content">{t}</span>' for i,t in enumerate(["Delivery","Payment","Returns &amp; exchanges","Made to measure","Care"]))}</div></div>
<div>{''.join(f'<details {"open" if i<2 else ""}><summary>{q}</summary><p class="muted">{a}</p></details>' for i,(q,a) in enumerate([("How fast is delivery in Accra?","Order before 12pm for same-day delivery (GH₵40), or choose next-day (GH₵25). Riders call you before arriving."),("Do you deliver outside Accra?","Yes — to all 16 regions by courier or VIP-bus parcel in 2–4 working days for GH₵55. Free on orders over GH₵1,500."),("Which payment methods do you accept?","MTN MoMo, Telecel Cash, AirtelTigo Money, Visa and Mastercard via Paystack — or order on WhatsApp."),("Can I return or exchange?","Unworn items with tags can be exchanged or credited within 7 days. Made-to-measure pieces are final sale, but alterations are free for 14 days."),("Can I pick up from the studio?","Yes, pickup in Accra is free. We'll WhatsApp you when your order is ready.")]))}</div>
</div></section>'''+footer(),'''
.sgh{display:flex;justify-content:space-between;align-items:flex-end;padding:60px 40px 30px}.sgh h1{font-size:72px;margin:0}
.sgg{display:grid;grid-template-columns:1.4fr 1fr;gap:30px}.sgtab td,.sgtab th{text-align:center;font-size:16px}.sgtab tr.hl td{background:var(--mag50);color:var(--mag);font-weight:600}
.howto{border-radius:18px;padding:30px}.fig{display:flex;gap:20px;align-items:center}.fig ol{padding-left:18px}.fig li{margin-bottom:10px}
.faq{display:grid;grid-template-columns:1fr 1.6fr;gap:60px}
details{border-top:1px dashed rgba(176,24,94,.4)}details summary{list-style:none;padding:20px 0;font-family:var(--serif);font-size:24px;display:flex;justify-content:space-between}details summary::after{content:"+";color:var(--mag)}details[open] summary::after{content:"–"}
@media(max-width:600px){.sgh{flex-direction:column;align-items:flex-start;gap:16px;padding:30px 20px 20px}.sgh h1{font-size:46px}.sgg{grid-template-columns:1fr}.sgtab td,.sgtab th{padding:10px 6px;font-size:14px}.faq{grid-template-columns:1fr;gap:20px}.faq h2{font-size:38px!important}details summary{font-size:20px}}''')
# ---------------- 11 EMPTY / 12 404 ----------------
S['11-empty-cart']=page('Empty bag',header('',count=0)+f'''<section class="w emp"><div class="spool"><svg viewBox="0 0 160 160" width="200" height="200"><rect x="40" y="20" width="80" height="14" rx="4" fill="#D4A437"/><rect x="40" y="126" width="80" height="14" rx="4" fill="#D4A437"/><rect x="52" y="34" width="56" height="92" fill="#B0185E"/>{''.join(f'<path d="M52 {40+i*8} H108" stroke="#8C1149" stroke-width="1.5"/>' for i in range(11))}<path d="M108 80 C 150 90, 140 150, 70 150 S 10 120, 20 150" fill="none" stroke="#B0185E" stroke-width="2" stroke-dasharray="6 5"/></svg></div>
<h1>Your bag is <span class="sc">empty</span></h1><p class="muted">Nothing on the cutting table yet. Let's find something worth stitching.</p><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:24px"><a class="btn p">Shop new in</a><a class="btn g">Made to measure</a></div></section>
<section class="sec" style="padding-top:20px"><div class="w"><div class="shead"><h2>Loved this <span class="sc">week</span></h2></div><div class="grid">{''.join(card(p) for p in [P[0],P[3],P[1],P[7]])}</div></div></section>'''+footer(),'''.emp{text-align:center;padding:80px 20px 40px}.emp h1{font-size:68px}.spool{display:grid;place-items:center;margin-bottom:10px}@media(max-width:600px){.emp{padding:50px 20px 20px}.emp h1{font-size:46px}.spool svg{width:150px;height:150px}}''')
S['12-404']=page('404',header('')+f'''<section class="w nf"><div class="nfl"><span class="big4">4<span class="btnicon" style="width:150px;height:150px;grid-template-columns:22px 22px;gap:18px;vertical-align:middle"><i style="width:22px;height:22px"></i><i style="width:22px;height:22px"></i><i style="width:22px;height:22px"></i><i style="width:22px;height:22px"></i></span>4</span>
<h1>This page came <span class="sc">unstitched.</span></h1><p class="muted">The link may be old or the dress has sold out. Let's get you back on the thread.</p>
<div class="in" style="max-width:480px;margin:24px 0 16px">{ICON['search']}<span style="margin-left:10px;color:#A39A8F">Search dresses, e.g. “kente maxi”</span></div>
<div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn p">Back to the shop</a><a class="btn wa">Ask us on WhatsApp</a></div></div>
<div class="nfimg"><img class="foil" src="{I('d6')}" alt=""></div>{thread("M0 40 C 200 120, 400 -20, 600 60 S 900 140, 1100 40",1100,160,"left:40px;bottom:-60px")}</section>'''+footer(),'''.nf{display:grid;grid-template-columns:1.2fr 1fr;gap:50px;align-items:center;padding:60px 40px 120px;position:relative}.big4{font-family:var(--serif);font-size:200px;line-height:1;color:var(--ink);display:flex;align-items:center;gap:10px}.nf h1{font-size:60px}.nfimg img{height:560px;width:100%;object-fit:cover;border-radius:220px 220px 16px 16px}
@media(max-width:600px){.nf{grid-template-columns:1fr;padding:30px 20px 60px}.big4{font-size:120px}.big4 .btnicon{width:90px!important;height:90px!important;grid-template-columns:14px 14px!important;gap:12px!important}.big4 .btnicon i{width:14px!important;height:14px!important}.nf h1{font-size:42px}.nfimg{display:none}}''')
