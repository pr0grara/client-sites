// Shared render helpers for the condo-building directory (/condos) and the
// per-building pages (/building/<slug>). Underscore-prefixed, so Pages treats this
// as an import module, not a route — same convention as _data.js / _lib.js.
//
// Markup lives here; the facts live in BUILDINGS in _data.js. A redesign rewrites
// this file and leaves the research untouched (that is the whole point — see the
// BUILDINGS comment in _data.js).

import { escapeHtml } from './_lib.js';

const money = (n) => '$' + Number(n).toLocaleString('en-US');

export const TYPE_LABEL = {
  'high-rise': 'High-rise',
  'mid-rise': 'Mid-rise',
  loft: 'Loft',
  townhome: 'Townhomes',
  garden: 'Garden community'
};

// HOA range → short human string, or null when we have nothing to show yet.
export function hoaShort(hoa) {
  if (!hoa || hoa.min == null) return null;
  if (hoa.max == null) return `From ${money(hoa.min)}/mo`;
  if (hoa.max === hoa.min) return `~${money(hoa.min)}/mo`;
  return `${money(hoa.min)}–${money(hoa.max)}/mo`;
}

// One compact "fact line" for a card: built · units · HOA, skipping unknowns.
function factLine(b) {
  const bits = [];
  if (b.yearBuilt) bits.push(`Built ${b.yearBuilt}`);
  if (b.units) bits.push(`${b.units.toLocaleString('en-US')} units`);
  const hoa = hoaShort(b.hoa);
  if (hoa) bits.push(`HOA ${hoa.replace('/mo', '')}`);
  return bits.join(' · ');
}

// A directory card. Reuses the existing .card / .ph / .meta system; .bld adds the
// monogram placeholder + type chip + "sold here" proof badge.
export function buildingCard(b) {
  const sold = b.augusteSold > 0
    ? `<span class="badge sold">Auguste sold ${b.augusteSold}</span>`
    : '';
  const price = b.priceRange ? `<div class="price">${escapeHtml(b.priceRange)}</div>` : '';
  // Real photo when we have one (the buildings Auguste has sold in); otherwise a
  // monogram placeholder so the card still looks intentional, not broken.
  const fill = b.img
    ? `<img src="/assets/${escapeHtml(b.img)}" alt="${escapeHtml(b.name)}, ${escapeHtml(b.city)}" loading="lazy">`
    : `<span class="bld-mono" aria-hidden="true">${escapeHtml(b.name.replace(/^The\s+/i, '').charAt(0))}</span>`;
  return `<a class="card bld${b.img ? ' has-img' : ''}" href="/building/${b.slug}" data-type="${b.type}" data-sold="${b.augusteSold > 0 ? 1 : 0}">
    <div class="ph">
      <span class="bld-type">${escapeHtml(TYPE_LABEL[b.type] || b.type)}</span>
      ${sold}
      ${fill}
    </div>
    <div class="meta">
      <div class="addr">${escapeHtml(b.name)}</div>
      <div class="sub">${escapeHtml(b.neighborhood)} · ${escapeHtml(b.city)}</div>
      <div class="feat">${escapeHtml(factLine(b))}</div>
      ${price}
    </div>
  </a>`;
}
