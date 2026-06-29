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

  // Marker data for the map — only buildings we've geocoded. Compact keys keep the
  // inlined JSON small. `</` is escaped so a building name can never break out of the
  // <script>. Pins link by slug to the card's id="bld-<slug>" rendered by buildingCard.
  const mapPoints = BUILDINGS.filter((b) => b.geo).map((b) => ({
    s: b.slug, n: b.name, h: b.neighborhood, t: b.type, sold: b.augusteSold > 0 ? 1 : 0,
    lat: b.geo.lat, lng: b.geo.lng
  }));
  const mapJson = JSON.stringify(mapPoints).replace(/</g, '\\u003c');

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

  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">

  <section class="band" id="dirmapband" style="padding-top:clamp(28px,4vw,46px);padding-bottom:0"><div class="wrap">
    <div class="section-head" style="margin-bottom:clamp(20px,3vw,30px)">
      <span class="label">The map</span>
      <h2 class="section-title">Every building, mapped.</h2>
      <p class="lede" style="max-width:60ch">Tap any pin to jump straight to that building's details below. Gold pins mark the buildings Auguste has personally sold in.</p>
    </div>
    <div id="dirmap" class="dir-map" role="application" aria-label="Map of Emeryville condo buildings"></div>
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

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
  <script>
  (function(){
    var grid=document.getElementById('dirgrid'),
        bar=document.getElementById('dirfilters'),
        count=document.getElementById('dircount');
    if(!grid||!bar)return;
    var cards=[].slice.call(grid.querySelectorAll('.bld'));
    var current='all';

    // Briefly highlight a card and bring it into view (the marker's click target).
    function jumpTo(slug){
      if(current!=='all')applyFilter('all');           // un-hide it first if filtered out
      var el=document.getElementById('bld-'+slug);
      if(!el)return;
      el.scrollIntoView({behavior:'smooth',block:'center'});
      el.classList.remove('bld-flash');
      void el.offsetWidth;                              // restart the animation
      el.classList.add('bld-flash');
    }

    function applyFilter(f){
      current=f;
      bar.querySelectorAll('.chip').forEach(function(c){c.classList.toggle('on',c.getAttribute('data-filter')===f)});
      var shown=0;
      cards.forEach(function(c){
        var ok=(f==='all')||c.getAttribute('data-type')===f;
        c.style.display=ok?'':'none'; if(ok)shown++;
      });
      count.textContent=shown+(shown===1?' building':' buildings');
      if(window.__dirMarkers)window.__dirMarkers.forEach(function(m){
        var ok=(f==='all')||m.type===f;
        if(ok)m.addTo(window.__dirMap); else m.remove();
      });
    }
    bar.addEventListener('click',function(e){
      var btn=e.target.closest('.chip'); if(!btn)return;
      applyFilter(btn.getAttribute('data-filter'));
    });

    // ---- map (Leaflet + CARTO Positron). Degrades gracefully: if the library or
    // its tiles don't load, hide the band so there's never an empty grey box. ----
    var pts=${mapJson}, band=document.getElementById('dirmapband');
    if(!window.L||!pts.length){ if(band)band.style.display='none'; return; }
    var map=L.map('dirmap',{scrollWheelZoom:false,zoomControl:true}).setView([37.838,-122.288],14);
    window.__dirMap=map;
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png',{
      maxZoom:19,subdomains:'abc',
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
    var markers=[], bounds=[];
    pts.forEach(function(p){
      var icon=L.divIcon({className:'',iconSize:[22,22],iconAnchor:[11,11],
        html:'<span class="mappin'+(p.sold?' sold':'')+'"></span>'});
      var m=L.marker([p.lat,p.lng],{icon:icon,title:p.n,keyboard:true});
      m.type=p.t;
      m.bindTooltip(p.n+(p.h?' · '+p.h:''),{direction:'top',offset:[0,-10]});
      m.on('click',function(){jumpTo(p.s);});
      m.addTo(map); markers.push(m); bounds.push([p.lat,p.lng]);
    });
    window.__dirMarkers=markers;
    map.fitBounds(bounds,{padding:[40,40],maxZoom:15});
  })();
  </script>`;
}
