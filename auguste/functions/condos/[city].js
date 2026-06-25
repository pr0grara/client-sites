// GET /condos/<city> — one SEO-built page per market, generated from CITIES data.
// This is the engine: add a city to _data.js and a new ranking page exists. No build step.

import { page, escapeHtml, html } from '../_lib.js';
import { BRAND, CITIES, REVIEWS } from '../_data.js';

export function onRequestGet(context) {
  const slug = context.params.city;
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) return html(notFound(), 404);

  const meta = {
    path: `/condos/${city.slug}`,
    title: `${city.h1} | Auguste Realtor — Emeryville Condo Specialist`,
    description: `${city.intro} Work with Auguste Vende, $35M+ sold across the East Bay.`
  };
  return new Response(page(BRAND, meta, body(city)), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function body(city) {
  const review = REVIEWS[2]; // Mitch — Emeryville-condo specific, good social proof on these pages
  return `
  <section class="band" style="padding-bottom:0">
    <div class="wrap">
      <span class="label">${city.primary ? 'The Specialty' : 'East Bay Condos'}</span>
      <h1 class="display" style="font-size:clamp(34px,5.5vw,60px);margin:12px 0 18px">${escapeHtml(city.h1)}</h1>
      <p class="lede">${escapeHtml(city.intro)}</p>
      <div class="hero-cta" style="margin-top:26px">
        <a class="btn lg" href="/#search">Search ${escapeHtml(city.name)} listings</a>
        <a class="btn ghost lg" href="/home-value">What's my ${escapeHtml(city.name)} home worth?</a>
      </div>
    </div>
  </section>

  <section class="band"><div class="wrap">
    <div class="section-head">
      <span class="label">Why Auguste here</span>
      <h2 class="section-title">A specialist, not a tourist.</h2>
    </div>
    <div class="cards" style="grid-template-columns:1fr;gap:14px">
      ${city.points.map((p) => `<div class="card"><div class="meta"><div class="sub" style="font-size:15.5px;color:var(--ink);margin:0">${escapeHtml(p)}</div></div></div>`).join('')}
    </div>
  </div></section>

  <section class="searchband"><div class="wrap">
    <span class="label">Live Search</span>
    <h2 class="section-title">Every ${escapeHtml(city.name)} listing, live.</h2>
    <p>Active, pending and sold ${escapeHtml(city.name)} ${escapeHtml(city.kind)} — searchable right here once IDX is connected (Phase 3).</p>
    <div class="idx-mock" aria-hidden="true"><div class="idx-row" style="grid-template-columns:1fr">
      <div class="f" style="text-align:center;color:#fff">🔍 Search ${escapeHtml(city.name)} ${escapeHtml(city.kind)}</div>
    </div></div>
  </div></section>

  <section class="band alt"><div class="wrap" style="max-width:760px">
    <figure class="review" style="border-left:3px solid var(--gold)">
      <div class="stars">★★★★★</div>
      <p style="font-size:17px">${escapeHtml(review.excerpt)}</p>
      <figcaption class="who">${escapeHtml(review.name)}<span>Verified client</span></figcaption>
    </figure>
  </div></section>

  <section class="ctaband"><div class="wrap">
    <span class="label">Buying or selling in ${escapeHtml(city.name)}?</span>
    <h2 class="section-title">Start with a conversation.</h2>
    <p>No pressure — just a straight read on the ${escapeHtml(city.name)} market from someone who sells here every month.</p>
    <div class="hero-cta"><a class="btn gold lg" href="/#contact">Contact Auguste</a><a class="btn ghost lg" href="tel:${BRAND.phoneHref}" style="color:#fff;border-color:rgba(255,255,255,.4)">${escapeHtml(BRAND.phone)}</a></div>
  </div></section>`;
}

function notFound() {
  const links = CITIES.map((c) => `<a class="btn ghost" href="/condos/${c.slug}" style="margin:4px">${escapeHtml(c.name)}</a>`).join('');
  return page(BRAND, { path: '/404', title: 'Not found — Auguste Realtor' }, `
  <section class="band"><div class="wrap" style="text-align:center">
    <span class="label">404</span>
    <h1 class="display" style="font-size:clamp(34px,5vw,56px);margin:12px 0 16px">We don’t cover that one.</h1>
    <p class="lede" style="margin:0 auto 26px">Auguste specializes in East Bay condos. Try one of these:</p>
    <div>${links}</div>
  </div></section>`);
}
