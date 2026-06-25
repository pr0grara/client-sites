// GET /condos/<city> — one SEO-built page per market, generated from CITIES data.
// This is the engine: add a city to _data.js and a new ranking page exists. No build step.

import { page, escapeHtml, html } from '../_lib.js';
import { BRAND, CITIES, REVIEWS, BUILDINGS } from '../_data.js';
import { buildingCard } from '../_buildings.js';

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

  // The building directory is the standout buyer tool, and it's live (unlike the
  // IDX search, still mocked). So when this city has buildings in the directory,
  // it becomes the hero's primary CTA and gets a showcase band. Data-driven: add
  // Oakland/Berkeley buildings to _data.js and their pages light up automatically.
  const cityBuildings = BUILDINGS.filter((b) => b.city === city.name);
  const hasDir = cityBuildings.length > 0;

  const heroCta = hasDir
    ? `<a class="btn gold lg" href="/condos">Browse all ${cityBuildings.length} ${escapeHtml(city.name)} condo buildings</a>
        <a class="btn ghost lg" href="/home-value">What's my ${escapeHtml(city.name)} condo worth?</a>`
    : `<a class="btn lg" href="/#search">Search ${escapeHtml(city.name)} listings</a>
        <a class="btn ghost lg" href="/home-value">What's my ${escapeHtml(city.name)} home worth?</a>`;

  // Teaser: lead with the photographed / sold-in buildings, they look best.
  const teaser = cityBuildings
    .slice()
    .sort((a, b) => (b.img ? 1 : 0) - (a.img ? 1 : 0) || b.augusteSold - a.augusteSold)
    .slice(0, 3)
    .map(buildingCard)
    .join('');

  const dirBand = hasDir
    ? `<section class="band alt"><div class="wrap">
        <div class="section-head">
          <span class="label">The Condo Directory · A buyer's tool</span>
          <h2 class="section-title">Know the building before you buy.</h2>
          <p class="lede">Every major ${escapeHtml(city.name)} condo building, one page each: HOA, amenities, parking, and what units actually trade for. The reference no portal and no other agent hands you, kept by the broker who sells in these buildings every month.</p>
        </div>
        <div class="cards bld-grid">${teaser}</div>
        <div class="hero-cta" style="margin-top:28px">
          <a class="btn gold lg" href="/condos">See all ${cityBuildings.length} ${escapeHtml(city.name)} condo buildings</a>
        </div>
      </div></section>`
    : '';

  return `
  <section class="band" style="padding-bottom:0">
    <div class="wrap">
      <span class="label">${city.primary ? 'The Specialty' : 'East Bay Condos'}</span>
      <h1 class="display" style="font-size:clamp(34px,5.5vw,60px);margin:12px 0 18px">${escapeHtml(city.h1)}</h1>
      <p class="lede">${escapeHtml(city.intro)}</p>
      <div class="hero-cta" style="margin-top:26px">
        ${heroCta}
      </div>
    </div>
  </section>

  ${dirBand}

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
