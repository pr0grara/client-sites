// Brand-agnostic study-guide renderer. Canonical source; vendored into client projects
// via `npm run sync`. Self-contained (own <head> + CSS), themed by the client's BRAND
// (logo + names + optional brand.guideAccent). No dependency on the real-estate _lib.js.
//
//   renderGuide(brand, guide, { section, basePath })  → full HTML page (overview or one section)
//   renderGate(brand, { error, action })              → brand-themed password screen
//   escapeHtml(s)                                      → exported for the route
//
// Routing model mirrors the dashboard: one route, `?s=<sectionId>` selects a section;
// no `?s` shows the overview/table of contents.

export function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ── shared chrome ───────────────────────────────────────────────────────
function chrome(brand, title, inner) {
  const accent = brand.guideAccent || '#1b1e22';
  const accentDk = brand.guideAccentDk || '#000000';
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#191c20">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root{
    --paper:#f4f2ee;--white:#fff;--ink:#1b1e22;--graphite:#191c20;--muted:#6b7178;
    --line:#e2ded6;--line-2:#d2cdc2;--accent:${accent};--accent-dk:${accentDk};
    --sans:"Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{-webkit-text-size-adjust:100%}
  body{background:var(--paper);color:var(--ink);font-family:var(--sans);font-size:15.5px;line-height:1.65;-webkit-font-smoothing:antialiased;padding:clamp(18px,4vw,40px)}
  a{color:var(--accent-dk);text-decoration:none}a:hover{color:var(--accent)}
  .wrap{max-width:860px;margin:0 auto}
  .brand{display:inline-flex;align-items:center;gap:11px;color:var(--graphite)}
  .brand-logo,.brand img{height:40px;width:auto;display:block}
  .topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:22px}
  .topbar .back{font-size:13px;color:var(--muted);font-weight:600}
  .topbar .back:hover{color:var(--graphite)}
  .eyebrow{font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--accent-dk)}
  h1{color:var(--graphite);font-weight:800;font-size:clamp(26px,4.5vw,38px);line-height:1.07;letter-spacing:-.8px;margin-top:6px}
  .lede{color:var(--ink);font-size:16px;max-width:64ch;margin-top:12px}
  .panel{background:var(--white);border:1px solid var(--line);border-radius:11px;padding:clamp(16px,3vw,26px);margin-top:18px}
  .panel h2{color:var(--graphite);font-weight:800;font-size:20px;letter-spacing:-.3px;margin-bottom:12px}
  .panel h3{color:var(--graphite);font-weight:700;font-size:14px;letter-spacing:.4px;text-transform:uppercase;margin:18px 0 9px;color:var(--accent-dk)}

  /* exam facts */
  .facts{list-style:none;display:grid;gap:8px}
  .facts li{padding-left:22px;position:relative;font-size:14.5px}
  .facts li::before{content:"";position:absolute;left:2px;top:9px;width:7px;height:7px;border-radius:50%;background:var(--accent)}

  /* TOC */
  .toc{list-style:none;display:flex;flex-direction:column;gap:10px}
  .toc a{display:flex;align-items:center;gap:14px;border:1px solid var(--line);border-radius:10px;padding:14px 16px;background:var(--paper);color:var(--ink)}
  .toc a:hover{border-color:var(--accent);background:#fff}
  .toc .wt{flex:none;width:54px;text-align:center;font-weight:800;color:var(--accent-dk);font-size:17px}
  .toc .wt small{display:block;font-size:9.5px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted)}
  .toc .tt{font-weight:700;color:var(--graphite);font-size:15.5px}
  .toc .tt small{display:block;font-weight:500;color:var(--muted);font-size:12.5px;margin-top:1px}
  .toc .go{margin-left:auto;color:var(--muted)}

  /* concept list */
  .key{list-style:none;display:grid;gap:11px}
  .key li{padding-left:22px;position:relative;font-size:15px}
  .key li::before{content:"\\2713";position:absolute;left:0;top:0;color:var(--accent);font-weight:800}

  /* numbers table */
  .nums{width:100%;border-collapse:collapse;font-size:14.5px;margin-top:4px}
  .nums td{padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
  .nums tr:last-child td{border-bottom:none}
  .nums .lab{color:var(--graphite);font-weight:600;width:46%}
  .nums .val{color:var(--ink);font-weight:700}
  .nums .src{display:block;color:var(--muted);font-weight:500;font-size:12px;margin-top:2px}

  /* math */
  .math{border:1px solid var(--line);border-radius:9px;padding:13px 15px;background:var(--paper);margin-top:10px}
  .math .mq{font-weight:700;color:var(--graphite)}
  .math .w{color:var(--ink);font-size:14px;margin-top:5px}
  .math .a{margin-top:6px;font-weight:700;color:var(--accent-dk)}

  /* practice questions — options visible, answer reveals on click */
  .q{border:1px solid var(--line);border-radius:10px;padding:15px 16px;margin-top:12px;background:#fff}
  .qq{font-weight:700;color:var(--graphite);font-size:15px}
  .q .choices{list-style:none;display:grid;gap:7px;margin:11px 0 6px}
  .q .choices li{font-size:14.5px;color:var(--ink);padding:8px 11px 8px 34px;position:relative;border:1px solid var(--line);border-radius:7px;background:var(--paper)}
  .q .choices li .ltr{position:absolute;left:12px;top:8px;font-weight:800;color:var(--accent-dk)}
  details.ans{margin-top:4px}
  details.ans>summary{list-style:none;cursor:pointer;display:inline-block;font-size:13px;font-weight:700;color:var(--accent-dk);border:1.5px solid var(--line-2);border-radius:7px;padding:7px 14px;background:var(--paper)}
  details.ans>summary::-webkit-details-marker{display:none}
  details.ans>summary:hover{border-color:var(--accent)}
  details.ans[open]>summary{margin-bottom:9px}
  .ansbody{padding:11px 13px;border-radius:8px;background:#f1f6ec;border:1px solid #cfe0bf;font-size:14px;color:var(--ink)}
  .ansbody b{display:block;color:#3a5a2a;margin-bottom:3px}
  .reveal{font-size:12.5px;color:var(--muted);font-weight:600;margin-top:2px}

  /* section nav */
  .pager{display:flex;justify-content:space-between;gap:12px;margin-top:22px}
  .pager a{flex:1;border:1px solid var(--line);border-radius:9px;padding:13px 15px;background:#fff}
  .pager a:hover{border-color:var(--accent)}
  .pager .dir{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--muted);font-weight:700}
  .pager .nm{font-weight:700;color:var(--graphite);font-size:14.5px}
  .pager .next{text-align:right}
  .pager .ph{flex:1}

  .note{color:var(--muted);font-size:12.5px;margin-top:18px;font-style:italic;max-width:70ch}
  .srclist{list-style:none;display:grid;gap:6px;margin-top:4px}
  .srclist a{font-size:13.5px;color:var(--accent-dk)}
  .srclist li{padding-left:16px;position:relative}
  .srclist li::before{content:"\\2197";position:absolute;left:0;top:0;color:var(--muted)}
  .cta{display:inline-block;margin-top:16px;font-weight:700;font-size:15px;color:#fff;background:var(--accent);border:2px solid var(--accent);border-radius:8px;padding:12px 22px}
  .cta:hover{background:var(--accent-dk);border-color:var(--accent-dk);color:#fff}
  .badge{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.5px;color:var(--accent-dk);background:var(--paper);border:1px solid var(--line-2);border-radius:999px;padding:3px 10px;vertical-align:middle}

  /* gate */
  .gate{min-height:78vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:15px}
  .gate h2{font-size:23px;color:var(--graphite);font-weight:800}
  .gate p{color:var(--muted);max-width:38ch}
  .gate form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:4px}
  .gate input{font-size:15px;color:var(--ink);background:#fff;border:1.5px solid var(--line-2);border-radius:7px;padding:13px 15px;min-width:230px}
  .gate input:focus{outline:none;border-color:var(--accent)}
  .gate button{font-weight:700;font-size:15px;border:2px solid var(--accent);background:var(--accent);color:#fff;border-radius:7px;padding:13px 24px;cursor:pointer}
  .gate button:hover{background:var(--accent-dk);border-color:var(--accent-dk)}
  .err{color:#b3402a;font-size:13px;min-height:1em}
  @media(max-width:560px){.pager{flex-direction:column}}
</style>
</head><body><main class="wrap">${inner}</main></body></html>`;
}

const logo = (brand) => brand.brandHtml || `<span class="brand-logo">${escapeHtml(brand.legalName || brand.name || '')}</span>`;

// ── overview / table of contents ────────────────────────────────────────
function renderOverview(brand, guide, basePath) {
  const facts = (guide.examFacts || []).map((f) => `<li>${escapeHtml(f)}</li>`).join('');
  const toc = guide.sections.map((s) => `
    <a href="${basePath}?s=${encodeURIComponent(s.id)}">
      <span class="wt">${s.weight}%<small>of exam</small></span>
      <span class="tt">${escapeHtml(s.title)}<small>${(s.key && s.key.length) || 0} key points · ${(s.questions && s.questions.length) || 0} practice Q</small></span>
      <span class="go">→</span>
    </a>`).join('');
  const sources = (guide.sources || []).map((s) =>
    `<li><a href="${escapeHtml(s.href)}" target="_blank" rel="noopener">${escapeHtml(s.label)}</a></li>`).join('');
  const first = guide.sections[0];
  const inner = `
  <div class="topbar"><a class="brand" href="/">${logo(brand)}</a><a class="back" href="/dashboard?view=resources">← Back to resources</a></div>
  <span class="eyebrow">Study guide · built for you</span>
  <h1>${escapeHtml(guide.title)}</h1>
  <p class="lede">${escapeHtml(guide.subtitle || '')}</p>
  <section class="panel">
    <h2>What the exam is</h2>
    <ul class="facts">${facts}</ul>
    <a class="cta" href="${basePath}?s=${encodeURIComponent(first.id)}">Start with ${escapeHtml(first.title)} →</a>
  </section>
  <section class="panel">
    <h2>The seven sections <span class="badge">heaviest first</span></h2>
    <div class="toc">${toc}</div>
  </section>
  <section class="panel">
    <h2>Where this comes from</h2>
    <ul class="srclist">${sources}</ul>
    <p class="note">Grounded in the official sources above; figures verified as of ${escapeHtml(guide.verifiedAsOf || '')}. Tax, wage, and safety numbers change — confirm the current figure against the cited source before you rely on it. This guide is a study aid, not legal advice.</p>
  </section>`;
  return chrome(brand, guide.title, inner);
}

// ── one section ─────────────────────────────────────────────────────────
function renderSection(brand, guide, section, basePath) {
  const idx = guide.sections.findIndex((s) => s.id === section.id);
  const prev = guide.sections[idx - 1];
  const next = guide.sections[idx + 1];

  const key = (section.key || []).map((k) => `<li>${escapeHtml(k)}</li>`).join('');
  const nums = (section.numbers || []).map((n) =>
    `<tr><td class="lab">${escapeHtml(n.label)}</td><td class="val">${escapeHtml(n.value)}<span class="src">${escapeHtml(n.src)}</span></td></tr>`).join('');
  const math = (section.math || []).map((m) => `
    <div class="math"><div class="mq">${escapeHtml(m.prompt)}</div><div class="w">${escapeHtml(m.work)}</div><div class="a">Answer: ${escapeHtml(m.answer)}</div></div>`).join('');
  const ltr = ['A', 'B', 'C', 'D', 'E'];
  const qs = (section.questions || []).map((q, i) => {
    const choices = q.choices.map((c, j) =>
      `<li><span class="ltr">${ltr[j]}</span>${escapeHtml(c)}</li>`).join('');
    return `<div class="q">
      <div class="qq">${i + 1}. ${escapeHtml(q.q)}</div>
      <ul class="choices">${choices}</ul>
      <details class="ans">
        <summary>Reveal answer</summary>
        <div class="ansbody"><b>${ltr[q.answer]} — ${escapeHtml(q.choices[q.answer])}</b>${escapeHtml(q.explain)}</div>
      </details>
    </div>`;
  }).join('');

  const pager = `
  <div class="pager">
    ${prev ? `<a href="${basePath}?s=${encodeURIComponent(prev.id)}"><div class="dir">← Previous</div><div class="nm">${escapeHtml(prev.title)}</div></a>` : `<span class="ph"></span>`}
    ${next ? `<a class="next" href="${basePath}?s=${encodeURIComponent(next.id)}"><div class="dir">Next →</div><div class="nm">${escapeHtml(next.title)}</div></a>` : `<a class="next" href="${basePath}"><div class="dir">Done →</div><div class="nm">Back to contents</div></a>`}
  </div>`;

  const inner = `
  <div class="topbar"><a class="brand" href="/">${logo(brand)}</a><a class="back" href="${basePath}">← All sections</a></div>
  <span class="eyebrow">${section.weight}% of the exam</span>
  <h1>${escapeHtml(section.title)}</h1>
  <p class="lede">${escapeHtml(section.intro || '')}</p>
  <section class="panel">
    <h2>What to know</h2>
    <ul class="key">${key}</ul>
    ${nums ? `<h3>Numbers to memorize</h3><table class="nums">${nums}</table>` : ''}
    ${math ? `<h3>Worked examples</h3>${math}` : ''}
  </section>
  <section class="panel">
    <h2>Practice questions</h2>
    <p class="reveal">Read the options and pick your answer, then hit “Reveal answer” to check it.</p>
    ${qs}
  </section>
  ${pager}
  <p class="note">Section ${idx + 1} of ${guide.sections.length}. Figures verified as of ${escapeHtml(guide.verifiedAsOf || '')}; confirm time-sensitive numbers against the cited source. Study aid, not legal advice.</p>`;
  return chrome(brand, `${section.title} · ${guide.title}`, inner);
}

// ── public entry points ─────────────────────────────────────────────────
export function renderGuide(brand, guide, { section, basePath = '/guide/law-business' } = {}) {
  const sec = section && guide.sections.find((s) => s.id === section);
  return sec ? renderSection(brand, guide, sec, basePath) : renderOverview(brand, guide, basePath);
}

export function renderGate(brand, { error = false, action = '' } = {}) {
  const inner = `
  <div class="gate">
    <a class="brand" href="/">${logo(brand)}</a>
    <h2>Your study guide</h2>
    <p>Enter your dashboard password to open the Law &amp; Business study guide we built for you.</p>
    <form method="post" action="${escapeHtml(action)}">
      <input type="password" name="pw" placeholder="Password" autofocus autocomplete="current-password" aria-label="Password">
      <button type="submit">Open the guide →</button>
    </form>
    <div class="err">${error ? 'Wrong password. Try again.' : ''}</div>
  </div>`;
  return chrome(brand, 'Study guide · ' + (brand.legalName || ''), inner);
}
