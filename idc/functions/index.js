// GET / — the IDC careers landing.
// Two hero treatments for the pitch: default (match + elevate IDC's dark look)
// and ?v=bold (a bolder, blueprint-driven hero). Everything below the hero is
// shared. No build step.

import { page, escapeHtml, salaryLabel } from './_lib.js';
import { BRAND, STATS, PILLARS, PROJECTS, GROWTH, LIFE, ROLES } from './_data.js';

export function onRequestGet(context) {
  const url = new URL(context.request.url);
  const bold = url.searchParams.get('v') === 'bold';

  const meta = {
    path: '/',
    title: 'Careers at IDC Consulting Engineers — Build California’s Infrastructure',
    description: BRAND.tagline,
    bodyClass: 'has-hero' + (bold ? ' v-bold' : '')
  };
  return new Response(page(BRAND, meta, body(bold)), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function body(bold) {
  return hero(bold) + statsStrip() + workSection() + whySection() +
         growthSection() + lifeSection() + rolesSection() + applySection();
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function hero(bold) {
  return `
  <section class="hero ${bold ? 'hero-bold' : ''}">
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-scrim" aria-hidden="true"></div>
    <div class="wrap hero-inner">
      <span class="label accent">Careers · IDC Consulting Engineers</span>
      <h1 class="display">Design the structures<br>that outlive everyone<br>who built them.</h1>
      <p class="lede">Bridges, interchanges, high-speed rail. Since 1995, IDC has delivered 100+ California structures — and we’re hiring the engineers who’ll design the next hundred.</p>
      <div class="hero-cta">
        <a class="btn accent lg" href="#roles">View open roles</a>
        <a class="btn ghost lg" href="#why">Why engineers join</a>
      </div>
      <div class="hero-foot">
        <span>Irvine, CA</span><i></i><span>DBE · WBE certified</span><i></i><span>$10B+ delivered</span>
      </div>
    </div>
  </section>`;
}

// ── Proof stats ──────────────────────────────────────────────────────────────
function statsStrip() {
  const cells = STATS.map((s) => `
    <div class="stat">
      <div class="stat-fig">${escapeHtml(s.figure)}</div>
      <div class="stat-lab">${escapeHtml(s.label)}</div>
    </div>`).join('');
  return `<section class="band stats-band"><div class="wrap"><div class="stats">${cells}</div></div></section>`;
}

// ── The work (marquee projects, framed for a candidate) ──────────────────────
function workSection() {
  const cards = PROJECTS.map((p) => `
    <article class="proj">
      <div class="proj-kind">${escapeHtml(p.kind)}</div>
      <h3 class="proj-name">${escapeHtml(p.name)}</h3>
      <p>${escapeHtml(p.blurb)}</p>
    </article>`).join('');
  return `<section class="band" id="work"><div class="wrap">
    <div class="section-head">
      <span class="label accent">The work</span>
      <h2 class="section-title">The projects on your résumé in five years.</h2>
      <p class="lede">Most engineers spend a career hoping to touch work like this. At IDC it’s the assignment, not the lottery.</p>
    </div>
    <div class="proj-grid">${cards}</div>
  </div></section>`;
}

// ── Why IDC (pillars) ────────────────────────────────────────────────────────
function whySection() {
  const cards = PILLARS.map((p, i) => `
    <article class="pillar">
      <div class="pillar-no">0${i + 1}</div>
      <div class="pillar-tag">${escapeHtml(p.tag)}</div>
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.body)}</p>
    </article>`).join('');
  return `<section class="band alt" id="why"><div class="wrap">
    <div class="section-head">
      <span class="label accent">Why IDC</span>
      <h2 class="section-title">Big-firm projects. Small-firm proximity.</h2>
      <p class="lede">You shouldn’t have to choose between landmark work and actually being seen. Here you don’t.</p>
    </div>
    <div class="pillar-grid">${cards}</div>
  </div></section>`;
}

// ── Growth / licensure ladder ────────────────────────────────────────────────
function growthSection() {
  const steps = GROWTH.map((g, i) => `
    <li class="rung">
      <div class="rung-no">${i + 1}</div>
      <div class="rung-body">
        <h4>${escapeHtml(g.step)}</h4>
        <p>${escapeHtml(g.detail)}</p>
      </div>
    </li>`).join('');
  return `<section class="band" id="growth"><div class="wrap">
    <div class="section-head">
      <span class="label accent">Growth & licensure</span>
      <h2 class="section-title">Hired to be grown, not parked.</h2>
      <p class="lede">A real, mentored road to your PE and SE — walked by the people who now run this firm.</p>
    </div>
    <ol class="ladder">${steps}</ol>
  </div></section>`;
}

// ── Life at IDC ──────────────────────────────────────────────────────────────
function lifeSection() {
  const cards = LIFE.map((l) => `
    <article class="life">
      <h4>${escapeHtml(l.title)}</h4>
      <p>${escapeHtml(l.body)}</p>
    </article>`).join('');
  return `<section class="band alt" id="life"><div class="wrap">
    <div class="section-head">
      <span class="label accent">Life at IDC</span>
      <h2 class="section-title">The parts that don’t fit on a job post.</h2>
    </div>
    <div class="life-grid">${cards}</div>
  </div></section>`;
}

// ── Open roles ───────────────────────────────────────────────────────────────
function rolesSection() {
  const rows = ROLES.map((r) => {
    const pay = salaryLabel(r);
    return `
    <a class="role" href="/careers/${r.slug}">
      <div class="role-main">
        <h3>${escapeHtml(r.title)}</h3>
        <p>${escapeHtml(r.summary)}</p>
        <div class="role-tags">
          <span class="tag">${escapeHtml(r.discipline)}</span>
          <span class="tag">${escapeHtml(r.level)}</span>
          <span class="tag">${escapeHtml(r.location)}</span>
        </div>
      </div>
      <div class="role-side">
        ${pay ? `<div class="role-pay">${escapeHtml(pay)}</div>` : ''}
        <span class="role-go">View role &rarr;</span>
      </div>
    </a>`;
  }).join('');
  return `<section class="band" id="roles"><div class="wrap">
    <div class="section-head">
      <span class="label accent">Open roles</span>
      <h2 class="section-title">Where you’d come in.</h2>
      <p class="lede">Don’t see the exact title? Strong engineers are worth a conversation — send us your work below.</p>
    </div>
    <div class="role-list">${rows}</div>
  </div></section>`;
}

// ── General application ──────────────────────────────────────────────────────
function applySection() {
  const opts = ROLES.map((r) => `<option value="${escapeHtml(r.title)}">${escapeHtml(r.title)}</option>`).join('');
  return `<section class="band apply-band" id="apply"><div class="wrap">
    <div class="apply-card">
      <div class="apply-copy">
        <span class="label accent">Apply</span>
        <h2 class="section-title">Start the conversation.</h2>
        <p>Tell us who you are and what you’ve built. A real engineer reads every one — not a resume bot. We’ll get back to you.</p>
        <p class="apply-alt">Prefer email? <a href="mailto:${escapeHtml(BRAND.email)}">${escapeHtml(BRAND.email)}</a></p>
      </div>
      <form class="apply-form" id="applyForm" novalidate>
        <input type="text" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">
        <div class="row2">
          <label>Full name<input name="name" required autocomplete="name"></label>
          <label>Email<input name="email" type="email" required autocomplete="email"></label>
        </div>
        <div class="row2">
          <label>Phone<input name="phone" type="tel" autocomplete="tel"></label>
          <label>Role of interest
            <select name="intent">
              <option value="">General / not sure</option>
              ${opts}
            </select>
          </label>
        </div>
        <label>Portfolio or LinkedIn URL<input name="address" placeholder="linkedin.com/in/…  or  a project link"></label>
        <label>Tell us about your work<textarea name="message" rows="4" placeholder="Licenses (PE/SE/EIT), the kind of structures you’ve designed, and what you’re looking for next."></textarea></label>
        <button class="btn accent lg" type="submit">Submit application</button>
        <p class="form-note" id="formNote" role="status"></p>
      </form>
    </div>
  </div></section>
  <script>
  (function(){
    var f=document.getElementById('applyForm'),note=document.getElementById('formNote');
    f.addEventListener('submit',async function(e){
      e.preventDefault();
      var btn=f.querySelector('button[type=submit]');
      var data=Object.fromEntries(new FormData(f).entries());
      data.source='careers-apply';
      note.textContent='';btn.disabled=true;btn.textContent='Submitting…';
      try{
        var r=await fetch('/api/apply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
        var j=await r.json();
        if(j.success){f.reset();note.className='form-note ok';note.textContent='Thanks — your application is in. We’ll be in touch.';}
        else{note.className='form-note err';note.textContent=j.message||'Something went wrong. Email careers@idcengineers.com.';}
      }catch(err){note.className='form-note err';note.textContent='Network error. Email careers@idcengineers.com.';}
      btn.disabled=false;btn.textContent='Submit application';
    });
  })();
  </script>`;
}
