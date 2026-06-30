// Render + helper library for the IDC careers site.
// Tailored from the client-sites _shared/_lib.js: same head/nav/footer/page
// contract, but swapped for an engineering-firm recruiting site —
// Organization + JobPosting JSON-LD (Google for Jobs) instead of RealEstateAgent,
// and an EEO + certifications footer instead of the real-estate compliance line.
//
// NOTE: this file intentionally diverges from _shared/_lib.js (which is
// real-estate-flavored). Don't `npm run sync` over it. Generalizing _shared so
// brand supplies its own schema + legal footer is a future cleanup.

export const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });

export const html = (body, status = 200) =>
  new Response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });

export function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---- <head> + open <body> ----
// `bodyClass` opts into behaviours: 'has-hero' = full-bleed hero the fixed nav
// overlays transparently; 'v-bold' = the bolder hero variant (see site.css).
export function head(brand, { title, description, path = '/', bodyClass = '' } = {}) {
  const t = title || brand.name;
  const desc = description || brand.tagline;
  const url = brand.siteUrl + path;
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(t)}</title>
<meta name="description" content="${escapeHtml(desc)}">
<link rel="canonical" href="${escapeHtml(url)}">
<meta name="theme-color" content="#0a1320">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(t)}">
<meta property="og:description" content="${escapeHtml(desc)}">
<meta property="og:url" content="${escapeHtml(url)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='14' fill='%230a1320'/><text x='50' y='70' font-size='46' font-weight='800' text-anchor='middle' fill='%233f8efc' font-family='Archivo,Arial,sans-serif' letter-spacing='1'>IDC</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
${orgSchema(brand)}
</head><body class="${escapeHtml(bodyClass)}">`;
}

// ---- top navigation ----
// Wordmark + phone lead; slim page links to the right; navStock is the
// highlighted "Open roles" CTA. Fixed, transparent over a hero at the very top,
// opaque once scrolled, slides off on scroll-down / back on scroll-up.
export function nav(brand) {
  const links = brand.nav
    .filter((n) => n.href !== brand.navStock?.href) // navStock is rendered once, highlighted
    .map((n) => `<a href="${n.href}">${escapeHtml(n.label)}</a>`).join('');
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
    n.classList.toggle('scrolled',y>24);
    if(y>last&&y>140)n.classList.add('nav-hidden');
    else if(y<last)n.classList.remove('nav-hidden');
    last=y;tick=false;
  }
  addEventListener('scroll',function(){if(!tick){requestAnimationFrame(u);tick=true;}},{passive:true});
  u();
})();</script>`;
}

// ---- footer (EEO + certifications + address) ----
export function footer(brand) {
  const cols = brand.footerCols.map((c) => `
    <div class="foot-col"><h4>${escapeHtml(c.title)}</h4>
      ${c.links.map((l) => `<a href="${l.href}">${escapeHtml(l.label)}</a>`).join('')}
    </div>`).join('');
  const certs = (brand.certifications || [])
    .map((c) => `<span class="cert">${escapeHtml(c)}</span>`).join('');
  const a = brand.address;
  return `<footer class="site"><div class="wrap">
  <div class="foot-top">
    <div class="foot-brand">
      <a class="brand" href="/">${brand.brandHtml}</a>
      <p>${escapeHtml(brand.footerBlurb)}</p>
      <div class="certs">${certs}</div>
    </div>
    ${cols}
  </div>
  <p class="eeo">${escapeHtml(brand.eeo)}</p>
  <div class="foot-legal">
    <span>&copy; ${brand.year} ${escapeHtml(brand.legalName)}. ${escapeHtml(a.streetAddress)}, ${escapeHtml(a.addressLocality)}, ${escapeHtml(a.addressRegion)} ${escapeHtml(a.postalCode)}.</span>
    <span class="muted">Designing the future, building trust.</span>
  </div>
</div></footer></body></html>`;
}

// Full-page shell: head + nav + body + footer.
export function page(brand, meta, bodyHtml) {
  return head(brand, meta) + nav(brand) + bodyHtml + footer(brand);
}

// ---- Organization JSON-LD (every page) ----
function orgSchema(brand) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.legalName,
    url: 'https://www.idcengineers.com',
    telephone: brand.phone,
    email: brand.email,
    foundingDate: '1995',
    address: brand.address,
    sameAs: ['https://www.linkedin.com/company/idc-consulting-engineers']
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

// ---- JobPosting JSON-LD (role pages → Google for Jobs) ----
// Embedded in the role page body. The pay range + employmentType + datePosted
// are what make a posting eligible for the rich Google-for-Jobs treatment.
export function jobPostingSchema(brand, role, datePosted) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: role.title,
    description: role.summary,
    employmentType: 'FULL_TIME',
    datePosted,
    hiringOrganization: {
      '@type': 'Organization',
      name: brand.legalName,
      sameAs: 'https://www.idcengineers.com'
    },
    jobLocation: {
      '@type': 'Place',
      address: brand.address
    },
    directApply: true
  };
  if (role.salaryMin && role.salaryMax) {
    data.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: { '@type': 'QuantitativeValue', minValue: role.salaryMin, maxValue: role.salaryMax, unitText: 'YEAR' }
    };
  }
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

// Tiny helper: format a salary range for display.
export function salaryLabel(role) {
  if (!role.salaryMin || !role.salaryMax) return '';
  const k = (n) => '$' + Math.round(n / 1000) + 'k';
  return `${k(role.salaryMin)} – ${k(role.salaryMax)}`;
}
