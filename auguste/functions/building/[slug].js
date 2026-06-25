// GET /building/<slug> — one page per condo building, generated from BUILDINGS.
// This is the SEO surface (an owner googling "Watergate Emeryville condos" lands
// here) and the listing-pitch artifact ("your building is already on my site").
// Add a building to _data.js and this page exists. No build step.

import { page, escapeHtml, html } from '../_lib.js';
import { BRAND, BUILDINGS } from '../_data.js';
import { hoaShort, TYPE_LABEL, buildingCard } from '../_buildings.js';

export function onRequestGet(context) {
  const b = BUILDINGS.find((x) => x.slug === context.params.slug);
  if (!b) return html(notFound(), 404);

  const meta = {
    path: `/building/${b.slug}`,
    title: `${b.name} — ${b.city} Condos | Auguste Realtor`,
    description: `${b.name} in ${b.city}: ${b.blurb}`.slice(0, 300)
  };
  return new Response(page(BRAND, meta, body(b)), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// One spec row, dropped entirely when we have no value to show.
function row(label, value) {
  if (!value) return '';
  return `<div class="spec"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
}

function body(b) {
  const typeLabel = TYPE_LABEL[b.type] || b.type;
  const hoa = hoaShort(b.hoa) || 'Confirming with Auguste';

  // His own closings here — the strongest line on the page when it exists.
  const track = b.augusteSold > 0
    ? `<section class="band alt" style="padding-top:clamp(34px,5vw,56px);padding-bottom:clamp(34px,5vw,56px)"><div class="wrap">
        <div class="track">
          <div class="track-n">${b.augusteSold}</div>
          <div class="track-t">
            <span class="label">Auguste's track record here</span>
            <p>Auguste has personally closed <b>${b.augusteSold} ${b.augusteSold === 1 ? 'sale' : 'sales'}</b> in ${escapeHtml(b.name)}. He knows the floor plans, the HOA, and what each line of units actually trades for — not from a portal, from doing the deals.</p>
          </div>
        </div>
      </div></section>`
    : '';

  const specs = [
    row('Building type', typeLabel),
    row('Year built', b.yearBuilt ? String(b.yearBuilt) : ''),
    row('Stories', b.stories ? String(b.stories) : ''),
    row('Total units', b.units ? b.units.toLocaleString('en-US') : ''),
    row('HOA dues', hoa),
    row('HOA includes', b.hoaIncludes && b.hoaIncludes.length ? b.hoaIncludes.join(', ') : ''),
    row('Parking', b.parking),
    row('Pets', b.pets),
    row('Unit mix', b.unitMix),
    row('Typical price', b.priceRange)
  ].join('');

  const amenities = b.amenities && b.amenities.length
    ? `<div class="b-block"><span class="label">Amenities</span>
        <div class="chips static">${b.amenities.map((a) => `<span class="chip tag">${escapeHtml(a)}</span>`).join('')}</div>
      </div>`
    : '';

  const transit = b.transit
    ? `<div class="b-block"><span class="label">Getting around</span><p class="b-text">${escapeHtml(b.transit)}</p></div>`
    : '';

  const verify = !b.verified
    ? `<p class="dir-note" style="margin-top:26px">These details come from public records and are approximate while Auguste confirms them. HOA dues, pet rules, and parking change over time — verify against current HOA documents before writing an offer.</p>`
    : '';

  // Related: same neighborhood first, then fall back to same type. Up to 3.
  const related = BUILDINGS
    .filter((x) => x.slug !== b.slug)
    .sort((x, y) => {
      const xs = (x.neighborhood === b.neighborhood ? 2 : 0) + (x.type === b.type ? 1 : 0);
      const ys = (y.neighborhood === b.neighborhood ? 2 : 0) + (y.type === b.type ? 1 : 0);
      return ys - xs || y.augusteSold - x.augusteSold;
    })
    .slice(0, 3);

  return `
  <section class="band b-hero" style="padding-bottom:clamp(30px,4vw,48px)"><div class="wrap">
    <a class="b-back" href="/condos">← All ${escapeHtml(b.city)} condo buildings</a>
    ${b.img ? `<div class="b-cover"><img src="/assets/${escapeHtml(b.img)}" alt="${escapeHtml(b.name)}, ${escapeHtml(b.city)}" width="1200" height="520"></div>` : ''}
    <span class="label" style="display:block;margin-top:${b.img ? '0' : '14px'}">${escapeHtml(typeLabel)} · ${escapeHtml(b.neighborhood)} · ${escapeHtml(b.city)}</span>
    <h1 class="display" style="font-size:clamp(34px,5.5vw,60px);margin:10px 0 16px">${escapeHtml(b.name)}</h1>
    ${b.aka && b.aka.length ? `<p class="b-aka">Also known as ${b.aka.map(escapeHtml).join(', ')}</p>` : ''}
    <p class="lede" style="max-width:66ch">${escapeHtml(b.blurb)}</p>
    <div class="hero-cta" style="margin-top:24px">
      <a class="btn lg" href="/#contact">Ask about ${escapeHtml(b.name)}</a>
      <a class="btn ghost lg" href="/home-value">What's my unit worth?</a>
    </div>
  </div></section>

  ${track}

  <section class="band"><div class="wrap b-main">
    <div class="b-specs">
      <div class="section-head" style="margin-bottom:18px">
        <span class="label">The building</span>
        <h2 class="section-title" style="font-size:clamp(26px,3.4vw,36px)">Specs at a glance</h2>
      </div>
      <dl class="specs">${specs}</dl>
      ${verify}
    </div>
    <aside class="b-side">
      ${amenities}
      ${transit}
    </aside>
  </div></section>

  <section class="searchband"><div class="wrap">
    <span class="label">Live Search</span>
    <h2 class="section-title">Active units in ${escapeHtml(b.name)}.</h2>
    <p>Every active, pending, and sold unit in this building — searchable right here once IDX is connected (Phase 3). Until then, ${escapeHtml(b.name.split(' ')[0])} listings reach Auguste directly.</p>
    <div class="idx-mock" aria-hidden="true"><div class="idx-row" style="grid-template-columns:1fr">
      <div class="f" style="text-align:center;color:#fff">🔍 Units for sale in ${escapeHtml(b.name)}</div>
    </div></div>
  </div></section>

  ${related.length ? `<section class="band alt"><div class="wrap">
    <div class="section-head"><span class="label">Nearby</span><h2 class="section-title" style="font-size:clamp(26px,3.4vw,36px)">More ${escapeHtml(b.city)} buildings</h2></div>
    <div class="cards bld-grid">${related.map(buildingCard).join('')}</div>
  </div></section>` : ''}

  <section class="ctaband"><div class="wrap">
    <span class="label">${escapeHtml(b.name)}</span>
    <h2 class="section-title">Buying or selling here? Start with the specialist.</h2>
    <p>A straight read on this building from the broker who sells in it — no pressure, no obligation.</p>
    <div class="hero-cta"><a class="btn gold lg" href="/#contact">Contact Auguste</a><a class="btn ghost lg" href="tel:${BRAND.phoneHref}" style="color:#fff;border-color:rgba(255,255,255,.4)">${escapeHtml(BRAND.phone)}</a></div>
  </div></section>`;
}

function notFound() {
  const links = BUILDINGS.slice(0, 8)
    .map((b) => `<a class="btn ghost" href="/building/${b.slug}" style="margin:4px">${escapeHtml(b.name)}</a>`)
    .join('');
  return page(BRAND, { path: '/404', title: 'Building not found — Auguste Realtor' }, `
  <section class="band"><div class="wrap" style="text-align:center">
    <span class="label">404</span>
    <h1 class="display" style="font-size:clamp(34px,5vw,56px);margin:12px 0 16px">We don't have that building yet.</h1>
    <p class="lede" style="margin:0 auto 26px">Browse the full Emeryville condo directory, or jump to one of these:</p>
    <div style="margin-bottom:22px">${links}</div>
    <a class="btn gold lg" href="/condos">All condo buildings</a>
  </div></section>`);
}
