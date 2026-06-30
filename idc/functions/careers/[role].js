// GET /careers/<slug> — one page per open role, generated from ROLES in _data.js.
// Add a role to _data.js and a new page exists, with JobPosting schema for
// Google for Jobs. No build step.

import { page, escapeHtml, html, jobPostingSchema, salaryLabel } from '../_lib.js';
import { BRAND, ROLES } from '../_data.js';

export function onRequestGet(context) {
  const slug = context.params.role;
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) return html(notFound(), 404);

  const pay = salaryLabel(role);
  const meta = {
    path: `/careers/${role.slug}`,
    title: `${role.title} — Careers at IDC Consulting Engineers`,
    description: role.summary
  };
  return new Response(page(BRAND, meta, body(role, pay)), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function list(items) {
  return `<ul class="ticks">${items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
}

function body(role, pay) {
  const datePosted = new Date().toISOString().slice(0, 10);
  const touch = (role.youWillTouch || [])
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('');

  const facts = [
    ['Discipline', role.discipline],
    ['Level', role.level],
    ['Type', role.type],
    ['Location', role.location],
    ['Licensure', role.license],
    pay ? ['Pay range', pay] : null
  ].filter(Boolean).map(([k, v]) => `
    <div class="fact"><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('');

  return `
  ${jobPostingSchema(BRAND, role, datePosted)}
  <section class="band role-hero"><div class="wrap">
    <a class="back" href="/#roles">&larr; All open roles</a>
    <span class="label accent">${escapeHtml(role.discipline)} · IDC Consulting Engineers</span>
    <h1 class="display" style="font-size:clamp(34px,5.5vw,62px)">${escapeHtml(role.title)}</h1>
    <p class="lede">${escapeHtml(role.summary)}</p>
    ${touch ? `<div class="role-tags" style="margin-top:18px">${touch}</div>` : ''}
    <div class="hero-cta" style="margin-top:26px">
      <a class="btn accent lg" href="#apply">Apply for this role</a>
      <a class="btn ghost lg" href="mailto:${escapeHtml(BRAND.email)}?subject=${encodeURIComponent(role.title)}">Email us</a>
    </div>
  </div></section>

  <section class="band role-detail"><div class="wrap role-cols">
    <div class="role-content">
      <h2 class="sub-title">What you’ll do</h2>
      ${list(role.responsibilities)}
      <h2 class="sub-title">What we’re looking for</h2>
      ${list(role.requirements)}
      ${role.niceToHave && role.niceToHave.length ? `<h2 class="sub-title">Nice to have</h2>${list(role.niceToHave)}` : ''}
    </div>
    <aside class="role-aside">
      <dl class="facts">${facts}</dl>
      <a class="btn accent lg full" href="#apply">Apply now</a>
      <p class="aside-note">IDC is a certified DBE / SBE / UDBE / WBE firm and an Equal Opportunity Employer.</p>
    </aside>
  </div></section>

  ${applyForm(role)}`;
}

function applyForm(role) {
  return `<section class="band apply-band" id="apply"><div class="wrap">
    <div class="apply-card">
      <div class="apply-copy">
        <span class="label accent">Apply</span>
        <h2 class="section-title">Apply: ${escapeHtml(role.title)}</h2>
        <p>A real engineer reads every application. Tell us what you’ve built and we’ll get back to you.</p>
        <p class="apply-alt">Prefer email? <a href="mailto:${escapeHtml(BRAND.email)}?subject=${encodeURIComponent(role.title)}">${escapeHtml(BRAND.email)}</a></p>
      </div>
      <form class="apply-form" id="applyForm" novalidate>
        <input type="text" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">
        <input type="hidden" name="intent" value="${escapeHtml(role.title)}">
        <div class="row2">
          <label>Full name<input name="name" required autocomplete="name"></label>
          <label>Email<input name="email" type="email" required autocomplete="email"></label>
        </div>
        <div class="row2">
          <label>Phone<input name="phone" type="tel" autocomplete="tel"></label>
          <label>Portfolio or LinkedIn URL<input name="address" placeholder="linkedin.com/in/…"></label>
        </div>
        <label>Tell us about your work<textarea name="message" rows="4" placeholder="Licenses (PE/SE/EIT), the structures you’ve designed, and what you’re looking for next."></textarea></label>
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
      data.source='role:${role.slug}';
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

function notFound() {
  const links = ROLES.map((r) => `<a class="btn ghost" href="/careers/${r.slug}" style="margin:4px">${escapeHtml(r.title)}</a>`).join('');
  return page(BRAND, { path: '/404', title: 'Role not found — IDC Careers' }, `
  <section class="band"><div class="wrap" style="text-align:center;padding-top:60px">
    <span class="label accent">404</span>
    <h1 class="display" style="font-size:clamp(34px,5vw,56px);margin:12px 0 16px">That role isn’t open.</h1>
    <p class="lede" style="margin:0 auto 26px">Here’s what we’re hiring for right now:</p>
    <div>${links}</div>
  </div></section>`);
}
