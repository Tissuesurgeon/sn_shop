(() => {
const C = window.SN_CONFIG, P = window.SN_PRODUCTS;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = $('#app');
const money = n => 'GH₵' + Number(n).toLocaleString('en-GH', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const byId = id => P.find(p => p.id === id);
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const CATS = [...new Set(P.map(p => p.category))];
const DEMO = !C.PAYSTACK_PUBLIC_KEY;

/* ---------- cart (localStorage) ---------- */
const KEY = 'sn_cart_v1';
let cart = []; try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch { cart = []; }
const save = () => { localStorage.setItem(KEY, JSON.stringify(cart)); renderCart(); };
const subtotal = () => cart.reduce((s, l) => s + (byId(l.id)?.price || 0) * l.qty, 0);
function addToCart(id, size, colour, qty = 1) {
  const l = cart.find(x => x.id === id && x.size === size && x.colour === colour);
  l ? l.qty += qty : cart.push({ id, size, colour, qty }); save(); toast('Added to your bag'); openCart();
}
function setQty(i, q) { if (q < 1) cart.splice(i, 1); else cart[i].qty = Math.min(q, 10); save(); }

function renderCart() {
  cart = cart.filter(l => byId(l.id));
  $('#cartCount').textContent = cart.reduce((s, l) => s + l.qty, 0);
  const body = $('#cartItems'), foot = $('#cartFoot');
  if (!cart.length) { body.innerHTML = `<div class="empty"><p class="script" style="font-size:2rem">Your bag is empty</p><p>Find something beautiful.</p><a class="btn ghost" href="#/shop" data-close>Shop dresses</a></div>`; foot.innerHTML = ''; return; }
  body.innerHTML = cart.map((l, i) => { const p = byId(l.id); return `<div class="line"><img src="${p.images[0]}" alt="${esc(p.name)}"><div><h5>${esc(p.name)}</h5><div class="v">Size ${l.size} · ${esc(l.colour)}</div><div class="qty" style="margin-top:8px"><button data-q="${i}" data-d="-1" aria-label="Decrease">−</button><span>${l.qty}</span><button data-q="${i}" data-d="1" aria-label="Increase">+</button></div><button class="rm" data-rm="${i}">Remove</button></div><div class="price">${money(p.price * l.qty)}</div></div>`; }).join('');
  const st = subtotal(), left = C.FREE_DELIVERY_OVER - st;
  foot.innerHTML = `<div class="sum"><span>Subtotal</span><b>${money(st)}</b></div><p class="note">${left > 0 ? `Add ${money(left)} more for free delivery.` : 'You qualify for free delivery 🎉'} Delivery calculated at checkout.</p><div class="foot-btns"><a class="btn mag block" href="#/checkout" data-close>Checkout</a><button class="btn wa block" data-wa>Order via WhatsApp</button></div>`;
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-q],[data-rm],[data-close],[data-wa],[data-scroll],.wa-link'); if (!t) return;
  if (t.dataset.q) setQty(+t.dataset.q, cart[+t.dataset.q].qty + +t.dataset.d);
  if (t.dataset.rm) setQty(+t.dataset.rm, 0);
  if ('close' in t.dataset) closeCart();
  if ('wa' in t.dataset) { e.preventDefault(); window.open(waLink(), '_blank', 'noopener'); }
  if (t.classList.contains('wa-link')) { e.preventDefault(); window.open(`https://wa.me/${C.WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello SN Stitches! I have a question about your dresses.')}`, '_blank', 'noopener'); }
  if (t.dataset.scroll) { setTimeout(() => document.getElementById(t.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' }), 120); }
});
function waLink(extra = {}) {
  const lines = cart.map(l => { const p = byId(l.id); return `• ${p.name} — Size ${l.size}, ${l.colour} × ${l.qty} = ${money(p.price * l.qty)}`; });
  let msg = `Hello SN Stitches! 👗 I'd like to order:\n\n${lines.join('\n')}\n\nSubtotal: ${money(subtotal())}`;
  if (extra.name) msg += `\n\nName: ${extra.name}\nPhone: ${extra.phone}\nRegion: ${extra.region}\nAddress/landmark: ${extra.address}\nDelivery: ${extra.delivery}`;
  msg += `\n\nPlease confirm availability & delivery. Thank you!`;
  return `https://wa.me/${C.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
const drawer = $('#drawer'), scrim = $('#scrim');
function openCart() { drawer.classList.add('on'); scrim.classList.add('on'); drawer.setAttribute('aria-hidden', 'false'); }
function closeCart() { drawer.classList.remove('on'); scrim.classList.remove('on'); drawer.setAttribute('aria-hidden', 'true'); }
$('#cartBtn').onclick = openCart; $('#closeCart').onclick = closeCart; scrim.onclick = closeCart;
document.addEventListener('keydown', e => e.key === 'Escape' && closeCart());
$('#menuBtn').onclick = () => $('#nav').classList.toggle('open');
$('#nav').addEventListener('click', () => $('#nav').classList.remove('open'));
let tt; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2200); }
$('#yr').textContent = new Date().getFullYear();

/* ---------- views ---------- */
const card = p => `<a class="card" href="#/product/${p.id}"><div class="ph">${p.compareAt ? '<span class="pill">Sale</span>' : ''}<img src="${p.images[0]}" alt="${esc(p.name)}" loading="lazy" width="768" height="1024"><img class="alt" src="${p.images[1] || p.images[0]}" alt="" loading="lazy"><span class="quick">View dress</span></div><h3>${esc(p.name)}</h3><div class="meta">${p.category} · ${p.length}</div><div class="price">${money(p.price)}${p.compareAt ? `<s>${money(p.compareAt)}</s>` : ''}</div></a>`;

function home() {
  const feat = P.filter(p => p.featured).slice(0, 4);
  const catImg = { Ankara: 'assets/img/d5.webp', Kente: 'assets/img/d2.webp', Evening: 'assets/img/d7.webp', Casual: 'assets/img/d4.webp' };
  app.innerHTML = `
  <section class="hero"><img src="assets/img/hero.webp" alt="Two women wearing SN Stitches Ankara and kente-inspired dresses" fetchpriority="high"><div class="wrap"><div class="hero-txt"><p class="eyebrow">New season · Made in Accra</p><h1>Dresses with a story, <span class="script">stitched for you</span></h1><p>Ankara, kente-inspired and evening dresses, designed and hand-finished in Ghana. Delivered across all 16 regions.</p><div class="actions"><a class="btn mag" href="#/shop">Shop the collection</a><a class="btn ghost" href="#/shop?cat=Evening">Evening edit</a></div></div></div></section>
  <section class="section wrap"><div class="section-head"><div><p class="eyebrow">Loved right now</p><h2>Featured dresses</h2></div><a class="link-u" href="#/shop">View all dresses →</a></div><div class="grid">${feat.map(card).join('')}</div></section>
  <section class="section wrap" style="padding-top:0"><div class="section-head"><div><p class="eyebrow">Find your style</p><h2>Shop by category</h2></div></div><div class="cats">${CATS.map(c => `<a class="cat" href="#/shop?cat=${c}"><img src="${catImg[c] || P.find(p => p.category === c).images[0]}" alt="${c} dresses" loading="lazy"><span><small>${P.filter(p => p.category === c).length} styles</small>${c}</span></a>`).join('')}</div></section>
  <section class="section story" id="story"><div class="wrap story-in"><img src="assets/img/d10.webp" alt="SN Stitches kente panel dress" loading="lazy"><div><p class="eyebrow">Our story</p><h2>Fashion. Design. <span class="script">Stitch.</span></h2><div class="stitch"></div><p>SN Stitches began at a single sewing machine in Accra, with a love for bold wax prints and the craft of kente. Every dress is designed in-house and finished by hand by local seamstresses — cut to flatter, made to last, and proudly Ghanaian.</p><p>From Sunday service to Saturday weddings, we make pieces that let you walk in with confidence.</p><a class="btn ghost" style="color:#fff;border-color:#fff;margin-top:10px" href="#/shop">Discover the collection</a></div></div></section>
  <section class="section wrap" id="delivery"><div class="usp"><div><h4>Delivery across Ghana</h4><p>Same/next-day in Accra · 2–4 days to every region.</p></div><div><h4>Pay your way</h4><p>MTN MoMo, Telecel Cash, AirtelTigo Money or card — secured by Paystack.</p></div><div><h4>Perfect fit</h4><p>XS–XXL, plus made-to-measure. Free alterations within 14 days.</p></div></div></section>
  <section class="section wrap" id="sizes" style="padding-top:0"><div class="section-head"><div><p class="eyebrow">Size guide</p><h2>Find your size</h2></div></div><div style="overflow:auto"><table class="sizetable"><tr><th>Size</th><th>UK</th><th>Bust (in)</th><th>Waist (in)</th><th>Hips (in)</th></tr>${[['XS', 6, 32, 25, 35], ['S', 8, 34, 27, 37], ['M', 10, 36, 29, 39], ['L', 12, 38, 31, 41], ['XL', 14, 40, 33, 43], ['XXL', 16, 42, 35, 45]].map(r => `<tr>${r.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</table></div></section>`;
}

function shop(q) {
  const st = { cat: q.get('cat') ? [q.get('cat')] : [], size: [], max: Math.max(...P.map(p => p.price)), sort: 'featured' };
  const maxP = st.max;
  app.innerHTML = `<div class="wrap"><div class="page-head"><p class="eyebrow">The collection</p><h1>Shop dresses</h1></div>
  <div class="shop"><aside class="filters" id="filters"><h4>Category</h4><div class="chips" id="fCat">${CATS.map(c => `<button class="chip" data-v="${c}">${c}</button>`).join('')}</div>
  <h4>Size</h4><div class="chips" id="fSize">${SIZES.map(s => `<button class="chip" data-v="${s}">${s}</button>`).join('')}</div>
  <h4>Max price: <span id="pv"></span></h4><div class="range"><input type="range" id="fPrice" min="200" max="${maxP}" step="10" value="${maxP}" aria-label="Maximum price"></div>
  <p style="margin-top:20px"><button class="chip" id="reset">Clear filters</button></p></aside>
  <div><div class="toolbar"><button class="btn ghost filter-toggle" id="ft">Filters</button><span class="count" id="count"></span><select id="sort" aria-label="Sort"><option value="featured">Featured</option><option value="new">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="az">Name A–Z</option></select></div><div class="grid" id="list"></div></div></div></div>`;
  const draw = () => {
    $$('#fCat .chip').forEach(b => b.classList.toggle('on', st.cat.includes(b.dataset.v)));
    $$('#fSize .chip').forEach(b => b.classList.toggle('on', st.size.includes(b.dataset.v)));
    $('#pv').textContent = money(st.max);
    let list = P.filter(p => (!st.cat.length || st.cat.includes(p.category)) && (!st.size.length || st.size.some(s => p.sizes.includes(s))) && p.price <= st.max);
    const s = { low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, az: (a, b) => a.name.localeCompare(b.name), new: (a, b) => P.indexOf(b) - P.indexOf(a), featured: (a, b) => (b.featured | 0) - (a.featured | 0) }[st.sort];
    list = [...list].sort(s);
    $('#count').textContent = `${list.length} dress${list.length === 1 ? '' : 'es'}`;
    $('#list').innerHTML = list.length ? list.map(card).join('') : `<div class="empty" style="grid-column:1/-1">No dresses match those filters.</div>`;
  };
  const tog = (arr, v) => { const i = arr.indexOf(v); i > -1 ? arr.splice(i, 1) : arr.push(v); draw(); };
  $('#fCat').onclick = e => e.target.dataset.v && tog(st.cat, e.target.dataset.v);
  $('#fSize').onclick = e => e.target.dataset.v && tog(st.size, e.target.dataset.v);
  $('#fPrice').oninput = e => { st.max = +e.target.value; draw(); };
  $('#sort').onchange = e => { st.sort = e.target.value; draw(); };
  $('#reset').onclick = () => { st.cat = []; st.size = []; st.max = maxP; $('#fPrice').value = maxP; draw(); };
  $('#ft').onclick = () => $('#filters').classList.toggle('open');
  draw();
}

function product(id) {
  const p = byId(id); if (!p) { app.innerHTML = `<div class="wrap empty"><h1>Dress not found</h1><a class="btn" href="#/shop">Back to shop</a></div>`; return; }
  let sel = { size: null, colour: p.colours[0].name, qty: 1, img: 0 };
  const rel = P.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  app.innerHTML = `<div class="wrap"><div class="pdp"><div class="gallery"><div class="thumbs">${p.images.map((s, i) => `<button data-i="${i}" aria-label="Image ${i + 1}"><img src="${s}" alt=""></button>`).join('')}</div><div class="main-img"><img id="mainImg" src="${p.images[0]}" alt="${esc(p.name)}" width="768" height="1024"></div></div>
  <div><div class="crumbs"><a href="#/">Home</a> / <a href="#/shop?cat=${p.category}">${p.category}</a> / ${esc(p.name)}</div><p class="eyebrow">${p.category} · ${p.length}</p><h1>${esc(p.name)}</h1><div class="price">${money(p.price)}${p.compareAt ? `<s>${money(p.compareAt)}</s>` : ''}</div><p style="color:#4a423a">${esc(p.description)}</p>
  <div class="opt"><label class="t">Colour: <b id="cv">${esc(sel.colour)}</b></label><div class="chips">${p.colours.map(c => `<button class="swatch on" data-c="${esc(c.name)}"><i style="background:${c.hex}"></i>${esc(c.name)}</button>`).join('')}</div></div>
  <div class="opt"><label class="t">Size <a href="#/" data-scroll="sizes" style="float:right;text-transform:none;letter-spacing:0;color:var(--mag)">Size guide</a></label><div class="sizes">${SIZES.map(s => `<button class="size" data-s="${s}" ${p.sizes.includes(s) ? '' : 'disabled title="Out of stock"'}>${s}</button>`).join('')}</div><div class="err" id="sErr"></div></div>
  <div class="buy-row"><div class="qty"><button id="qm" aria-label="Decrease">−</button><span id="qv">1</span><button id="qp" aria-label="Increase">+</button></div><button class="btn mag" id="add">Add to bag — ${money(p.price)}</button></div>
  <p class="note" style="margin-top:12px">✦ Ships in 1–3 days · Pay with MoMo or card · Questions? <a href="#" class="wa-link" style="color:var(--mag)">WhatsApp us</a></p>
  <details class="details" open><summary>Details</summary><ul>${p.details.map(d => `<li>${esc(d)}</li>`).join('')}</ul></details><details class="details"><summary>Delivery & returns</summary><ul><li>Accra: same-day (order by 12pm) or next-day</li><li>All other regions: 2–4 working days</li><li>Exchanges within 7 days on unworn items</li></ul></details></div></div>
  ${rel.length ? `<section class="section" style="padding-top:10px"><div class="section-head"><h2>You may also love</h2></div><div class="grid">${rel.map(card).join('')}</div></section>` : ''}</div>`;
  const setImg = i => { sel.img = i; $('#mainImg').src = p.images[i]; $$('.thumbs button').forEach((b, j) => b.classList.toggle('on', i === j)); }; setImg(0);
  $('.thumbs').onclick = e => { const b = e.target.closest('button'); b && setImg(+b.dataset.i); };
  $('.sizes').onclick = e => { const b = e.target.closest('.size'); if (!b || b.disabled) return; sel.size = b.dataset.s; $$('.size').forEach(x => x.classList.toggle('on', x === b)); $('#sErr').textContent = ''; };
  const q = d => { sel.qty = Math.max(1, Math.min(10, sel.qty + d)); $('#qv').textContent = sel.qty; $('#add').textContent = `Add to bag — ${money(p.price * sel.qty)}`; };
  $('#qm').onclick = () => q(-1); $('#qp').onclick = () => q(1);
  $('#add').onclick = () => { if (!sel.size) { $('#sErr').textContent = 'Please choose a size.'; return; } addToCart(p.id, sel.size, sel.colour, sel.qty); };
}

function checkout() {
  if (!cart.length) { app.innerHTML = `<div class="wrap empty"><h1>Your bag is empty</h1><p>Add a dress before checking out.</p><a class="btn" href="#/shop">Shop dresses</a></div>`; return; }
  app.innerHTML = `<div class="wrap"><div class="page-head" style="padding-bottom:20px"><h1>Checkout</h1></div><form class="checkout" id="co" novalidate><div>
  ${DEMO ? `<div class="demo"><b>Demo mode:</b> no Paystack key is set in <code>config.js</code>, so payment is simulated — nothing is charged.</div>` : ''}
  <div class="box"><h3>Contact</h3><div class="fields"><label class="full">Full name<input name="name" required autocomplete="name"></label><label>Phone (MoMo number)<input name="phone" type="tel" required placeholder="024 123 4567" autocomplete="tel"></label><label>Email<input name="email" type="email" required autocomplete="email" placeholder="you@example.com"></label></div></div>
  <div class="box"><h3>Delivery</h3><div class="fields"><label class="full">Region<select name="region" required><option value="">Select your region</option>${C.REGIONS.map(r => `<option>${r}</option>`).join('')}</select></label><label>City / town<input name="city" required></label><label>Digital address (GhanaPost GPS)<input name="gps" placeholder="GA-123-4567"></label><label class="full">Address & landmark<textarea name="address" rows="2" required placeholder="e.g. House 12, behind Shell filling station, East Legon"></textarea></label></div>
  <div style="margin-top:16px" id="dopts"><p class="note">Choose your region to see delivery options.</p></div></div>
  <div class="box"><h3>Payment</h3>
  <label class="radio on"><input type="radio" name="pay" value="momo" checked><span class="rt"><b>Mobile Money</b><small>You'll approve the payment on your phone.</small><span class="momo"><span class="mtn">MTN MoMo</span><span class="tel">Telecel Cash</span><span class="at">AirtelTigo Money</span></span></span></label>
  <label class="radio"><input type="radio" name="pay" value="card"><span class="rt"><b>Debit / credit card</b><small>Visa, Mastercard, Verve — secured by Paystack.</small></span></label>
  <label class="radio"><input type="radio" name="pay" value="whatsapp"><span class="rt"><b>Order via WhatsApp</b><small>Send your order to us on WhatsApp and pay on confirmation.</small></span></label>
  <div class="err" id="coErr"></div><button class="btn mag block" id="payBtn" type="submit" style="margin-top:8px">Pay now</button><p class="note" style="text-align:center;margin-top:10px">🔒 Payments processed securely by Paystack.</p></div></div>
  <aside class="osum"><div class="box"><h3>Order summary</h3><div id="oLines"></div><div class="sum" style="margin-top:12px"><span>Subtotal</span><span id="oSub"></span></div><div class="sum"><span>Delivery</span><span id="oDel">—</span></div><div class="sum total"><span>Total</span><span id="oTot"></span></div></div></aside></form></div>`;
  $('#oLines').innerHTML = cart.map(l => { const p = byId(l.id); return `<div class="line"><img src="${p.images[0]}" alt=""><div><h5>${esc(p.name)}</h5><div class="v">${l.size} · ${esc(l.colour)} · ×${l.qty}</div></div><div>${money(p.price * l.qty)}</div></div>`; }).join('');
  const f = $('#co'); let delivery = null;
  const totals = () => { const st = subtotal(); let d = delivery ? delivery.price : 0; if (delivery && st >= C.FREE_DELIVERY_OVER) d = 0; $('#oSub').textContent = money(st); $('#oDel').textContent = delivery ? (d ? money(d) : 'Free') : '—'; $('#oTot').textContent = money(st + d); const pay = f.pay.value; $('#payBtn').textContent = pay === 'whatsapp' ? 'Send order on WhatsApp' : `Pay ${money(st + d)}${pay === 'momo' ? ' with MoMo' : ' by card'}`; return { st, d, total: st + d }; };
  f.region.onchange = () => { const acc = f.region.value === 'Greater Accra'; const opts = C.DELIVERY.filter(o => o.region === 'any' || (acc ? o.region === 'accra' : o.region === 'other')); delivery = f.region.value ? opts[0] : null;
    $('#dopts').innerHTML = f.region.value ? opts.map((o, i) => `<label class="radio ${i ? '' : 'on'}"><input type="radio" name="del" value="${o.id}" ${i ? '' : 'checked'}><span class="rt"><b>${o.label}</b></span><b>${o.price ? money(o.price) : 'Free'}</b></label>`).join('') : '<p class="note">Choose your region to see delivery options.</p>'; totals(); };
  f.addEventListener('change', e => { if (e.target.name === 'del') delivery = C.DELIVERY.find(o => o.id === e.target.value); if (['del', 'pay'].includes(e.target.name)) $$(`input[name=${e.target.name}]`).forEach(r => r.closest('.radio').classList.toggle('on', r.checked)); totals(); });
  totals();
  f.onsubmit = e => {
    e.preventDefault(); const d = Object.fromEntries(new FormData(f)); const err = $('#coErr');
    const phoneOk = /^(\+?233|0)\d{9}$/.test((d.phone || '').replace(/[\s-]/g, ''));
    const missing = ['name', 'phone', 'email', 'region', 'city', 'address'].filter(k => !String(d[k] || '').trim());
    if (missing.length) { err.textContent = 'Please fill in: ' + missing.join(', ') + '.'; f[missing[0]].focus(); return; }
    if (!phoneOk) { err.textContent = 'Enter a valid Ghana phone number, e.g. 024 123 4567.'; f.phone.focus(); return; }
    if (!/^\S+@\S+\.\S+$/.test(d.email)) { err.textContent = 'Enter a valid email address.'; f.email.focus(); return; }
    if (!delivery) { err.textContent = 'Choose a delivery option.'; return; }
    err.textContent = ''; const t = totals(); const ref = 'SNS-' + Date.now().toString(36).toUpperCase();
    const order = { ref, date: new Date().toISOString(), customer: d, delivery: delivery.label, items: cart.map(l => ({ ...l, name: byId(l.id).name, price: byId(l.id).price })), ...t, method: d.pay };
    if (d.pay === 'whatsapp') { window.open(waLink({ ...d, region: `${d.region}, ${d.city}`, delivery: delivery.label }), '_blank', 'noopener'); return done({ ...order, status: 'Sent via WhatsApp — awaiting confirmation' }); }
    pay(order);
  };
}
function pay(order) {
  const btn = $('#payBtn');
  if (DEMO) { btn.disabled = true; btn.textContent = 'Processing (demo)…'; setTimeout(() => done({ ...order, status: 'Paid (demo — simulated)', payRef: 'DEMO-' + order.ref }), 1400); return; }
  const go = () => { const h = window.PaystackPop.setup({ key: C.PAYSTACK_PUBLIC_KEY, email: order.customer.email, amount: Math.round(order.total * 100), currency: C.CURRENCY, ref: order.ref,
      channels: order.method === 'momo' ? ['mobile_money'] : ['card'],
      metadata: { custom_fields: [{ display_name: 'Customer', variable_name: 'customer', value: order.customer.name }, { display_name: 'Phone', variable_name: 'phone', value: order.customer.phone }, { display_name: 'Region', variable_name: 'region', value: order.customer.region }] },
      callback: r => done({ ...order, status: 'Paid', payRef: r.reference }), onClose: () => toast('Payment window closed') }); h.openIframe(); };
  if (window.PaystackPop) return go();
  const s = document.createElement('script'); s.src = 'https://js.paystack.co/v1/inline.js'; s.onload = go; s.onerror = () => toast('Could not load Paystack. Check your connection.'); document.head.appendChild(s);
}
function done(order) { localStorage.setItem('sn_last_order', JSON.stringify(order)); cart = []; save(); location.hash = '#/confirmation'; }
function confirmation() {
  let o; try { o = JSON.parse(localStorage.getItem('sn_last_order')); } catch { }
  if (!o) { app.innerHTML = `<div class="wrap empty"><h1>No recent order</h1><a class="btn" href="#/shop">Shop dresses</a></div>`; return; }
  app.innerHTML = `<div class="wrap confirm"><div class="tick">✓</div><p class="eyebrow">Order ${esc(o.ref)}</p><h1>Medaase, ${esc(o.customer.name.split(' ')[0])}! <span class="script">Thank you</span></h1><p>Your order is confirmed. We'll call or WhatsApp you on <b>${esc(o.customer.phone)}</b> to arrange delivery, and a receipt will go to <b>${esc(o.customer.email)}</b>.</p>
  <div class="box">${o.items.map(i => `<div class="sum"><span>${esc(i.name)} (${i.size}) × ${i.qty}</span><span>${money(i.price * i.qty)}</span></div>`).join('')}<div class="sum"><span>Delivery — ${esc(o.delivery)}</span><span>${o.d ? money(o.d) : 'Free'}</span></div><div class="sum total"><span>Total</span><span>${money(o.total)}</span></div>
  <p class="note" style="margin-top:12px">Status: <b>${esc(o.status)}</b>${o.payRef ? ` · Ref: ${esc(o.payRef)}` : ''}<br>Ship to: ${esc(o.customer.address)}, ${esc(o.customer.city)}, ${esc(o.customer.region)}</p></div>
  <a class="btn mag" href="#/shop">Continue shopping</a></div>`;
}

/* ---------- router ---------- */
function route() {
  closeCart(); $('#nav').classList.remove('open');
  const h = location.hash.slice(1) || '/'; const [path, qs] = h.split('?'); const q = new URLSearchParams(qs || '');
  const parts = path.split('/').filter(Boolean);
  if (!parts.length) home(); else if (parts[0] === 'shop') shop(q); else if (parts[0] === 'product') product(parts[1]); else if (parts[0] === 'checkout') checkout(); else if (parts[0] === 'confirmation') confirmation(); else home();
  window.scrollTo(0, 0); document.title = 'SN Stitches — ' + ({ shop: 'Shop', product: byId(parts[1])?.name, checkout: 'Checkout', confirmation: 'Order confirmed' }[parts[0]] || 'Fashion • Design • Stitch');
}
window.addEventListener('hashchange', route); renderCart(); route();
})();
