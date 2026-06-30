// GET / — Pacific West Concrete homepage.
// Structure follows his northstar (gaytanfoundations.com): dark hero, service grid,
// why-us, featured project, gallery, process, FAQ, free-quote contact. Concrete brand
// (graphite + safety amber), not the AraBuilds proposal styling.

import { page, escapeHtml } from './_lib.js';
import { BRAND, TRUST, SERVICES, WHY, FEATURED, WORK, STEPS, FAQ, PROJECT_TYPES } from './_data.js';

export function onRequestGet() {
  return new Response(page(BRAND, { path: '/', bodyClass: 'has-hero' }, body()), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function body() {
  return hero() + services() + why() + featured() + gallery() + process() + faq() + contact();
}

const trustChip = LICENSED_CHIP();
function LICENSED_CHIP() {
  return BRAND.licensed
    ? `<span class="chip"><span class="d"></span>Licensed &amp; insured${BRAND.cslb ? ' · CSLB #' + escapeHtml(BRAND.cslb) : ''}</span>`
    : '';
}

/* ---------- hero (dark graphite, concrete-form texture) ---------- */
function hero() {
  return `<section class="hero" id="top"><div class="wrap hero-inner">
    <span class="eyebrow">Concrete &amp; Foundations · East Bay</span>
    <h1>Built on a solid <span class="hl">foundation.</span></h1>
    <p class="sub">Family-run concrete out of Alameda. Foundations, retaining walls with real drainage, excavation, driveways and flatwork — done right the first time and built to hold.</p>
    <div class="hero-cta">
      <a class="btn lg" href="#contact">Get a free estimate →</a>
      <a class="btn ghost lg" href="tel:${BRAND.phoneHref}">📞 ${escapeHtml(BRAND.phone)}</a>
    </div>
    <div class="chips">
      ${TRUST.map((t) => `<span class="chip"><span class="d"></span>${escapeHtml(t)}</span>`).join('')}
      ${trustChip}
    </div>
  </div></section>`;
}

/* ---------- services ---------- */
function services() {
  return `<section class="sec" id="services"><div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">What we do</span>
      <h2 class="section-title">Heavy concrete, done by hand.</h2>
      <p class="lede">Not just flatwork. The technical, high-stakes pours — foundations, retaining walls and drainage — are where Pacific West does its best work.</p>
    </div>
    <div class="grid">
      ${SERVICES.map((s) => `<div class="card">
        <div class="ic">${s.ic}</div>
        <h3>${escapeHtml(s.h)}</h3>
        <p>${escapeHtml(s.p)}</p>
        <span class="tag">${escapeHtml(s.tag)}</span>
      </div>`).join('')}
    </div>
  </div></section>`;
}

/* ---------- why ---------- */
function why() {
  return `<section class="sec band" id="why"><div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Why Pacific West</span>
      <h2 class="section-title">The skill is the whole point.</h2>
      <p class="lede">A $15k retaining wall isn't a job you hand to whoever's cheapest. It's a job you hand to someone who's poured a hundred of them and knows where they fail.</p>
    </div>
    <div class="why">
      ${WHY.map((w) => `<div class="it"><h3>${escapeHtml(w.h)}</h3><p>${escapeHtml(w.p)}</p></div>`).join('')}
    </div>
  </div></section>`;
}

function shotPlaceholder(cap) {
  return `<div class="ph"><div><div class="pc">${escapeHtml(cap)}</div><div class="pn">photo coming soon</div></div></div>`;
}

/* ---------- featured project ---------- */
function featured() {
  const f = FEATURED;
  return `<section class="sec" id="work"><div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">${escapeHtml(f.eyebrow)}</span>
      <h2 class="section-title">${escapeHtml(f.title)}</h2>
    </div>
    <div class="feat">
      <div class="copy">
        <h3>${escapeHtml(f.h)}</h3>
        <p>${escapeHtml(f.p)}</p>
        <div class="meta">${f.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join('')}</div>
      </div>
      <div class="shot">${shotPlaceholder(f.cap)}</div>
    </div>
  </div></section>`;
}

/* ---------- gallery ---------- */
function gallery() {
  return `<section class="sec band alt"><div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Recent work</span>
      <h2 class="section-title">Pours we're proud of.</h2>
      <p class="lede">Foundations, walls, driveways and flatwork across the East Bay.</p>
    </div>
    <div class="gal">
      ${WORK.map((p) => `<div class="tile">${p.src ? `<img src="${escapeHtml(p.src)}" alt="${escapeHtml(p.cap)}" loading="lazy">` : shotPlaceholder(p.cap)}</div>`).join('')}
    </div>
  </div></section>`;
}

/* ---------- process ---------- */
function process() {
  return `<section class="sec" id="process"><div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">How it works</span>
      <h2 class="section-title">Simple, start to finish.</h2>
    </div>
    <div class="steps">
      ${STEPS.map((s) => `<div class="step"><h3>${escapeHtml(s.h)}</h3><p>${escapeHtml(s.p)}</p></div>`).join('')}
    </div>
  </div></section>`;
}

/* ---------- faq ---------- */
function faq() {
  return `<section class="sec band" id="faq"><div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Questions</span>
      <h2 class="section-title">Good to know.</h2>
    </div>
    <div class="faq">
      ${FAQ.map((f) => `<details><summary><span class="q">${escapeHtml(f.q)}</span></summary><div class="a">${escapeHtml(f.a)}</div></details>`).join('')}
    </div>
  </div></section>`;
}

/* ---------- contact / free quote ---------- */
function contact() {
  const opts = (arr) => ['', ...arr].map((o) => `<option${o ? '' : ' value=""'}>${o || 'Select…'}</option>`).join('');
  return `<section class="sec contact" id="contact"><div class="wrap">
    <div class="contact-grid">
      <div class="info">
        <span class="eyebrow">Free estimate</span>
        <h2 class="section-title">Tell us about the job.</h2>
        <p class="lede" style="margin-bottom:24px">A few details is all it takes. We'll get back to you, usually same day, to set up a free onsite estimate.</p>
        <div class="qinfo">
          <div class="row"><div class="qic">📞</div><div><div class="k">Call or text</div><div class="v"><a href="tel:${BRAND.phoneHref}">${escapeHtml(BRAND.phone)}</a></div></div></div>
          <div class="row"><div class="qic">🕒</div><div><div class="k">Hours</div><div class="v">${escapeHtml(BRAND.hours)}</div></div></div>
          <div class="row"><div class="qic">📍</div><div><div class="k">Service area</div><div class="v">East Bay &amp; North Bay<small>${escapeHtml(BRAND.areaServed.join(', '))} &amp; nearby</small></div></div></div>
        </div>
      </div>
      <form class="lead" id="leadform" onsubmit="return submitLead(event)">
        <input class="hp" type="text" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true">
        <input type="hidden" name="source" value="homepage-quote">
        <div class="row2">
          <div><label>Name <span class="req">*</span></label><input type="text" name="name" required></div>
          <div><label>Phone <span class="req">*</span></label><input type="tel" name="phone" required></div>
        </div>
        <div class="row2">
          <div><label>Email</label><input type="email" name="email"></div>
          <div><label>Town</label><select name="town">${opts(BRAND.areaServed.concat('Other'))}</select></div>
        </div>
        <label>Project type</label>
        <select name="project">${opts(PROJECT_TYPES)}</select>
        <label>Project details</label>
        <textarea name="message" placeholder="What you're looking to build, rough size, timing…"></textarea>
        <button class="btn lg" type="submit">Request my free estimate →</button>
        <div class="form-msg" id="leadmsg" role="status"></div>
        <p class="fine">No obligation. We'll only use your info to get back to you about your project.</p>
      </form>
    </div>
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
      if(j.success){ f.reset(); msg.className='form-msg ok'; msg.textContent='Got it — we’ll be in touch shortly, usually the same day.'; }
      else { msg.className='form-msg err'; msg.textContent=j.message||'Something went wrong. Please call ${escapeHtml(BRAND.phone)}.'; }
    }catch(err){ msg.className='form-msg err'; msg.textContent='Something went wrong. Please call ${escapeHtml(BRAND.phone)}.'; }
    btn.disabled=false;
  }
  </script>
  </section>`;
}
