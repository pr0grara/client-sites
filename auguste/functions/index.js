// GET / — Auguste Realtor homepage.
// Structure blends his inspiration sites: timallenproperties.com (luxury hero +
// stat callouts, serif headlines, sold/top-sales, testimonial + local-expertise)
// and sashabayrealtor.com (hero, 3 quick-action cards, IDX search band, community
// cards, contact form) — all aimed at the "Emeryville condo specialist" positioning.

import { page, escapeHtml } from './_lib.js';
import { BRAND, STATS, BIO, REVIEWS, CITIES, MULTIFAMILY, SOLD } from './_data.js';

export function onRequestGet() {
  return new Response(page(BRAND, { path: '/' }, body()), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function body() {
  return hero() + stats() + actions() + about() + sold() + search() + communities() + reviews() + ctaband() + contact();
}

/* ---------- hero ---------- */
function hero() {
  return `<section class="hero"><div class="wrap">
    <div class="hero-copy">
      <span class="label">Emeryville · Oakland · Berkeley · Alameda</span>
      <h1 class="display">The Emeryville<br><em>condo specialist.</em></h1>
      <p class="lede">Over $35M sold and 60+ homes closed in seven years. Whether you're selling your condo or buying your first, I bring calm, candor, and sharp negotiation to every step — and I sell your home, seamlessly.</p>
      <div class="hero-cta">
        <a class="btn lg" href="#search">Search homes</a>
        <a class="btn ghost lg" href="/home-value">What's my condo worth?</a>
      </div>
    </div>
    <div class="hero-photo">
      <img src="/assets/heros/hero.jpg" alt="Auguste Vende, Emeryville real estate broker" width="600" height="750">
    </div>
  </div></section>`;
}

/* ---------- stat strip ---------- */
function stats() {
  return `<div class="stats"><div class="wrap">
    ${STATS.map((s) => `<div class="stat"><div class="n">${escapeHtml(s.n)}</div><div class="k">${escapeHtml(s.k)}</div></div>`).join('')}
  </div></div>`;
}

/* ---------- 3 quick-action cards (Sasha-style) ---------- */
function actions() {
  const cards = [
    { ic: '⌕', h: 'Find your home', p: 'Search every active East Bay condo and home on the MLS — live, right here.', go: 'Search listings', href: '#search' },
    { ic: '⌂', h: "What's my condo worth?", p: 'A real, Emeryville-specific valuation from the agent who sells these buildings.', go: 'Get my value', href: '/home-value' },
    { ic: '✉', h: 'Get listing alerts', p: 'New Emeryville condos the moment they hit the market — straight to your inbox.', go: 'Set up alerts', href: '#contact' }
  ];
  return `<div class="wrap"><div class="actions">
    ${cards.map((c) => `<a class="action" href="${c.href}">
      <div class="ic">${c.ic}</div>
      <h3>${escapeHtml(c.h)}</h3>
      <p>${escapeHtml(c.p)}</p>
      <span class="go">${escapeHtml(c.go)}</span>
    </a>`).join('')}
  </div></div>`;
}

/* ---------- about ---------- */
function about() {
  return `<section class="band about" id="about"><div class="wrap">
    <div class="about-photo"><img src="/assets/heros/auguste.jpg" alt="Auguste Vende" width="500" height="500"></div>
    <div class="about-body">
      <span class="label">Meet Auguste</span>
      <h2 class="section-title">From a Paris jazz stage to the East Bay’s condo market.</h2>
      ${BIO.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
      <div class="hero-cta" style="margin-top:8px">
        <a class="btn" href="#contact">Work with Auguste</a>
        <a class="btn ghost" href="tel:${BRAND.phoneHref}">${escapeHtml(BRAND.phone)}</a>
      </div>
    </div>
  </div></section>`;
}

/* ---------- recently sold ---------- */
function sold() {
  return `<section class="band alt" id="sold"><div class="wrap">
    <div class="section-head center">
      <span class="label">Recently Sold</span>
      <h2 class="section-title">Sixty homes closed, and counting.</h2>
      <p class="lede" style="margin:0 auto">For a seller deciding who to trust with their condo, nothing beats a wall of homes already sold. These are Auguste’s own closings, building by building, and live MLS-sold comps update alongside them on their own.</p>
    </div>
    <div class="cards">
      ${SOLD.map((s) => `<div class="card">
        <div class="ph">${s.img ? `<img src="/assets/sold/${escapeHtml(s.img)}" alt="${escapeHtml(s.title)}, sold by Auguste" loading="lazy">` : escapeHtml(s.note || 'Photo from Auguste')}<span class="badge sold">Sold</span></div>
        <div class="meta"><div class="addr">${escapeHtml(s.title)}</div><div class="sub">${escapeHtml(s.sub)}</div><div class="price">${escapeHtml(s.price)}</div></div>
      </div>`).join('')}
      <div class="slot-note"><b>A few more closings on the way.</b> Five recent sales are awaiting their photos, and the live MLS feed adds sold comps automatically once IDX is connected.</div>
    </div>
  </div></section>`;
}

/* ---------- IDX search band (placeholder for the live widget) ---------- */
function search() {
  return `<section class="searchband" id="search"><div class="wrap">
    <span class="label">Live Home Search</span>
    <h2 class="section-title">Search every East Bay listing — on Auguste’s site, not Zillow.</h2>
    <p>Real MLS listings, searchable by city, price, beds and status — including Sold comps. Buyers stay here instead of leaving for the portals.</p>
    <div class="idx-mock" aria-hidden="true">
      <div class="idx-row">
        <div class="f">City — Emeryville ▾</div>
        <div class="f">Status — Active ▾</div>
        <div class="f">Price — Any ▾</div>
        <div class="f">Beds — Any ▾</div>
      </div>
      <div class="idx-row" style="grid-template-columns:1fr">
        <div class="f" style="text-align:center;color:#fff">🔍 Search 1,200+ East Bay listings</div>
      </div>
      <div class="idx-note">Preview of the live IDX search — wired to the MLS feed in Phase 3 (iHomeFinder).</div>
    </div>
  </div></section>`;
}

/* ---------- communities ---------- */
function communities() {
  const cards = CITIES.map((c) => `<a class="${c.primary ? 'primary' : ''}" href="/condos/${c.slug}">
    <div class="c-in">
      <span class="c-k">${c.primary ? 'The Specialty' : 'East Bay'}</span>
      <div class="c-t">${escapeHtml(c.name)} Condos</div>
      <div class="c-s">${escapeHtml(c.card)}</div>
    </div>
  </a>`).join('');
  return `<section class="band" id="communities"><div class="wrap">
    <div class="section-head">
      <span class="label">Communities</span>
      <h2 class="section-title">One lane owned, then the ones next door.</h2>
      <p class="lede">Emeryville condos first — the niche Auguste owns — then the neighboring cities and small multifamily, the way his business actually works.</p>
    </div>
    <div class="comm">${cards}</div>
    <div class="slot-note" style="margin-top:18px;background:var(--paper-2)">
      <b>${escapeHtml(MULTIFAMILY.title)}.</b> ${escapeHtml(MULTIFAMILY.blurb)}
    </div>
  </div></section>`;
}

/* ---------- reviews ---------- */
function reviews() {
  return `<section class="band alt" id="reviews"><div class="wrap">
    <div class="section-head center">
      <span class="label">Client Reviews</span>
      <h2 class="section-title">“He has my best interests at heart.”</h2>
    </div>
    <div class="reviews-grid">
      ${REVIEWS.map((r) => `<figure class="review">
        <div class="stars">★★★★★</div>
        <p>${escapeHtml(r.excerpt)}</p>
        <figcaption class="who">${escapeHtml(r.name)}<span>Verified client</span></figcaption>
      </figure>`).join('')}
    </div>
  </div></section>`;
}

/* ---------- seller CTA band ---------- */
function ctaband() {
  return `<section class="ctaband"><div class="wrap">
    <span class="label">Thinking of selling?</span>
    <h2 class="section-title">Find out what your Emeryville condo is worth.</h2>
    <p>A real valuation from the broker who sells your building — not an automated guess. No obligation, no pressure.</p>
    <div class="hero-cta"><a class="btn gold lg" href="/home-value">Get my home value</a></div>
  </div></section>`;
}

/* ---------- contact ---------- */
function contact() {
  return `<section class="band contact" id="contact"><div class="wrap">
    <div class="info">
      <span class="label">Get in touch</span>
      <h2 class="section-title">Let’s talk about your move.</h2>
      <p class="lede" style="margin-bottom:24px">Buying, selling, renting, or just want a straight answer on the market — reach out and I’ll get right back to you.</p>
      <p><span class="k">Call or text</span><a href="tel:${BRAND.phoneHref}" style="font-weight:600;color:var(--navy)">${escapeHtml(BRAND.phone)}</a></p>
      <p><span class="k">Email</span><a href="mailto:${BRAND.email}" style="font-weight:600;color:var(--navy)">${escapeHtml(BRAND.email)}</a></p>
      <p><span class="k">Office</span>2324 Powell Street, Emeryville, CA 94608</p>
    </div>
    <form class="lead" id="leadform" onsubmit="return submitLead(event)">
      <input class="hp" type="text" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true">
      <input type="hidden" name="source" value="homepage-contact">
      <div class="row">
        <input type="text" name="name" placeholder="Your name" required>
        <input type="tel" name="phone" placeholder="Phone">
      </div>
      <input type="email" name="email" placeholder="Email" required>
      <select name="intent" aria-label="I'm interested in">
        <option value="">I'm interested in…</option>
        <option>Selling a condo / home</option>
        <option>Buying a condo / home</option>
        <option>A home valuation</option>
        <option>Renting / property management</option>
        <option>Just have a question</option>
      </select>
      <textarea name="message" placeholder="Anything you'd like me to know?"></textarea>
      <button class="btn gold lg" type="submit">Send message</button>
      <div class="form-msg" id="leadmsg" role="status"></div>
    </form>
  </div>
  <script>
  async function submitLead(e){
    e.preventDefault();
    var f=e.target, msg=document.getElementById('leadmsg'), btn=f.querySelector('button');
    var data={}; new FormData(f).forEach(function(v,k){data[k]=v;});
    msg.className='form-msg'; msg.textContent='Sending…'; btn.disabled=true;
    try{
      var r=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      var j=await r.json();
      if(j.success){ f.reset(); msg.className='form-msg ok'; msg.textContent='Thanks — I’ll be in touch shortly.'; }
      else { msg.className='form-msg err'; msg.textContent=j.message||'Something went wrong. Please call (510) 421-6994.'; }
    }catch(err){ msg.className='form-msg err'; msg.textContent='Something went wrong. Please call (510) 421-6994.'; }
    btn.disabled=false;
  }
  </script>
  </section>`;
}
