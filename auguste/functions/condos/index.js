// GET /condos — the condo-building directory ("the main condo stock").
// A buyer's reference tool that doubles as seller exposure: when an owner googles
// their building, this hub and the per-building pages are what rank.
//
// Driven entirely by BUILDINGS in _data.js. Add a building there and it appears here
// and gets its own /building/<slug> page. No build step.

import { page, escapeHtml } from '../_lib.js';
import { BRAND, BUILDINGS } from '../_data.js';
import { buildingCard, TYPE_LABEL } from '../_buildings.js';

export function onRequestGet() {
  const meta = {
    path: '/condos',
    title: 'Emeryville Condo Building Directory | Auguste Realtor',
    description:
      'A building-by-building guide to Emeryville condos — high-rises, lofts, and mid-rises with HOA, amenities, and price ranges. Built by Auguste Vende, the Emeryville condo specialist.'
  };
  return new Response(page(BRAND, meta, body()), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function body() {
  // Featured first (the buildings he has actually closed in), then by size.
  const sorted = [...BUILDINGS].sort(
    (a, b) => b.augusteSold - a.augusteSold || (b.units || 0) - (a.units || 0)
  );

  const totalUnits = BUILDINGS.reduce((n, b) => n + (b.units || 0), 0);
  const soldIn = BUILDINGS.filter((b) => b.augusteSold > 0).length;

  // Filter chips — the types actually present, in a sensible order.
  const order = ['high-rise', 'mid-rise', 'loft', 'townhome', 'garden'];
  const present = order.filter((t) => BUILDINGS.some((b) => b.type === t));
  const chips = [`<button class="chip on" data-filter="all">All buildings</button>`]
    .concat(present.map((t) => `<button class="chip" data-filter="${t}">${escapeHtml(TYPE_LABEL[t])}</button>`))
    .join('');

  return `
  <section class="band" style="padding-bottom:0"><div class="wrap">
    <span class="label">The Condo Directory</span>
    <h1 class="display" style="font-size:clamp(34px,5.5vw,62px);margin:12px 0 18px">Emeryville, building by building.</h1>
    <p class="lede" style="max-width:64ch">Most condo buyers shop one building at a time — the HOA, the parking, the views, what actually sold. So here is the city's main condo stock in one place: ${BUILDINGS.length} buildings, roughly ${totalUnits.toLocaleString('en-US')} homes, with the details that decide a purchase. Auguste has personally closed sales in ${soldIn} of them.</p>
    <div class="dir-stats">
      <div class="dstat"><div class="n">${BUILDINGS.length}</div><div class="k">Buildings mapped</div></div>
      <div class="dstat"><div class="n">${totalUnits.toLocaleString('en-US')}</div><div class="k">Homes covered</div></div>
      <div class="dstat"><div class="n">${soldIn}</div><div class="k">Where Auguste has sold</div></div>
    </div>
  </div></section>

  <section class="band" style="padding-top:clamp(28px,4vw,46px)"><div class="wrap">
    <div class="dir-bar">
      <div class="chips" id="dirfilters">${chips}</div>
      <span class="dir-count" id="dircount">${BUILDINGS.length} buildings</span>
    </div>
    <div class="cards bld-grid" id="dirgrid">
      ${sorted.map(buildingCard).join('')}
    </div>
    <p class="dir-note">Building details are gathered from public records and are approximate while Auguste confirms them. HOA dues and policies change — always verify against current HOA documents before you write an offer. East Oakland is intentionally excluded.</p>
  </div></section>

  <section class="ctaband"><div class="wrap">
    <span class="label">Found a building you like?</span>
    <h2 class="section-title">Get inside one before it hits Zillow.</h2>
    <p>Auguste sells in these buildings every month and hears about units early. Tell him what you're after and he'll keep an eye out — buying or selling.</p>
    <div class="hero-cta"><a class="btn gold lg" href="/#contact">Contact Auguste</a><a class="btn ghost lg" href="tel:${BRAND.phoneHref}" style="color:#fff;border-color:rgba(255,255,255,.4)">${escapeHtml(BRAND.phone)}</a></div>
  </div></section>

  <script>
  (function(){
    var grid=document.getElementById('dirgrid'),
        bar=document.getElementById('dirfilters'),
        count=document.getElementById('dircount');
    if(!grid||!bar)return;
    var cards=[].slice.call(grid.querySelectorAll('.bld'));
    bar.addEventListener('click',function(e){
      var btn=e.target.closest('.chip'); if(!btn)return;
      var f=btn.getAttribute('data-filter');
      bar.querySelectorAll('.chip').forEach(function(c){c.classList.toggle('on',c===btn)});
      var shown=0;
      cards.forEach(function(c){
        var ok=(f==='all')||c.getAttribute('data-type')===f;
        c.style.display=ok?'':'none'; if(ok)shown++;
      });
      count.textContent=shown+(shown===1?' building':' buildings');
    });
  })();
  </script>`;
}
