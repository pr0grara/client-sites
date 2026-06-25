// Generic render + helper library for a client real-estate site.
// Brand-agnostic: every client passes its own BRAND/NAV (see _data.js).
// Canonical source lives in ../../_shared/_lib.js; `npm run sync` copies it here so
// the Pages project is self-contained at deploy time.

export const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });

export const html = (body, status = 200) =>
  new Response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });

export function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---- <head> + open <body> ----
// `bodyClass` lets a page opt into behaviours: e.g. 'has-hero' = a full-bleed media
// hero the fixed nav overlays transparently (otherwise body is padded for the nav).
export function head(brand, { title, description, path = '/', bodyClass = '' } = {}) {
  const t = title || brand.name;
  const desc = description || brand.tagline;
  const url = brand.siteUrl + path;
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(t)}</title>
<meta name="description" content="${escapeHtml(desc)}">
<link rel="canonical" href="${escapeHtml(url)}">
<meta name="theme-color" content="#16233d">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(t)}">
<meta property="og:description" content="${escapeHtml(desc)}">
<meta property="og:url" content="${escapeHtml(url)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='16' fill='%2316233d'/><text x='50' y='72' font-size='62' text-anchor='middle' fill='%23b08d57' font-family='Georgia,serif'>A</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
${realEstateSchema(brand)}
</head><body class="${escapeHtml(bodyClass)}">`;
}

// ---- top navigation ----
// Humble + simple: the name and phone lead; the page links sit slim and light to
// their right ("in case you want more"). Secondary pages stay real <a href> in the
// markup (and are mirrored in the footer) so nothing is lost for SEO when the
// links collapse into the mobile menu. brand.navStock is an optional subtle callout.
//
// Behaviour (timallenproperties.com style): the nav is fixed. At the top of a
// `has-hero` page it's transparent over the hero media; once you scroll it turns
// opaque; scrolling DOWN slides it off the top, scrolling UP brings it back.
export function nav(brand) {
  const links = brand.nav.map((n) => `<a href="${n.href}">${escapeHtml(n.label)}</a>`).join('');
  const stock = brand.navStock
    ? `<a class="nav-stock" href="${brand.navStock.href}">${escapeHtml(brand.navStock.label)}</a>`
    : '';
  return `<header class="nav"><div class="wrap">
  <a class="brand" href="/">${brand.brandHtml}</a>
  <div class="nav-right">
    <a class="nav-phone" href="tel:${brand.phoneHref}">${escapeHtml(brand.phone)}</a>
    <nav class="nav-links" id="navlinks">${links}${stock}</nav>
    <button class="nav-toggle" aria-label="Menu" aria-expanded="false" onclick="var m=document.getElementById('navlinks'),o=m.classList.toggle('open');this.setAttribute('aria-expanded',o)">&#9776;</button>
  </div>
</div></header>
<script>(function(){
  var n=document.currentScript.previousElementSibling,last=window.pageYOffset||0,tick=false;
  function u(){
    var y=window.pageYOffset||0;
    n.classList.toggle('scrolled',y>24);                 // opaque once past the very top
    if(y>last&&y>140)n.classList.add('nav-hidden');      // scrolling down → slide off
    else if(y<last)n.classList.remove('nav-hidden');     // scrolling up → bring back
    last=y;tick=false;
  }
  addEventListener('scroll',function(){if(!tick){requestAnimationFrame(u);tick=true;}},{passive:true});
  u();
})();</script>`;
}

// ---- footer (with required CA real-estate compliance line) ----
export function footer(brand) {
  const cols = brand.footerCols.map((c) => `
    <div class="foot-col"><h4>${escapeHtml(c.title)}</h4>
      ${c.links.map((l) => `<a href="${l.href}">${escapeHtml(l.label)}</a>`).join('')}
    </div>`).join('');
  const yr = brand.year;
  return `<footer class="site"><div class="wrap">
  <div class="foot-top">
    <div class="foot-brand">
      <a class="brand" href="/">${brand.brandHtml}</a>
      <p>${escapeHtml(brand.footerBlurb)}</p>
    </div>
    ${cols}
  </div>
  <div class="foot-legal">
    <span>&copy; ${yr} ${escapeHtml(brand.legalName)}. ${escapeHtml(brand.compliance)}</span>
    <span class="eho">Equal Housing Opportunity</span>
  </div>
</div></footer></body></html>`;
}

// Full-page shell: head + nav + body + footer.
export function page(brand, meta, bodyHtml) {
  return head(brand, meta) + nav(brand) + bodyHtml + footer(brand);
}

// RealEstateAgent JSON-LD (the audit flagged the old site used generic LocalBusiness).
function realEstateSchema(brand) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: brand.name,
    url: brand.siteUrl,
    telephone: brand.phone,
    email: brand.email,
    image: brand.siteUrl + '/assets/heros/auguste.jpg',
    areaServed: brand.areaServed,
    address: brand.address
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}
