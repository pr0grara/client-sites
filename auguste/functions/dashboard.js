// GET/POST /dashboard — Auguste's private lead dashboard.
// Every lead captured by /api/lead (valuation, contact, buyer alerts, city pages)
// lands in the D1 `leads` table; this is where he reads them so nothing slips.
//
// Auth mirrors the arabuilds plan gate (functions/auguste.js on arabuilds): a styled
// on-brand password screen instead of a Basic-Auth popup, with a 30-day cookie. The
// password comes from the DASH_PASS secret; the fallback below lets it work on first
// deploy — set the secret and rotate (see SECRETS.md).
import { html, escapeHtml } from './_lib.js';
import { BRAND } from './_data.js';
import { PROJECT_INTRO, PROJECT_STATUS, DELIVERABLE_GROUPS, DRIVE_URL } from './_project.js';

const COOKIE = 'auguste_dash=1';

// Friendly labels for the known lead fields, in display order. Anything else in the
// submission JSON is shown after these with a humanized key.
const FIELD_LABELS = {
  name: 'Name', email: 'Email', phone: 'Phone', intent: 'Looking to',
  address: 'Property address', message: 'Message', source: 'Came from'
};
const HIDE_KEYS = new Set(['botcheck']);

export async function onRequest(context) {
  const { request, env } = context;
  // Case-insensitive (matches what's typed on a phone). Compared against lowercased input.
  const password = (env.DASH_PASS || 'emeryville').toLowerCase();
  const cookie = request.headers.get('Cookie') || '';
  const authed = cookie.split(/;\s*/).indexOf(COOKIE) !== -1;
  const setCookie = COOKIE + '; Path=/dashboard; Max-Age=2592000; HttpOnly; SameSite=Lax; Secure';

  if (request.method === 'POST') {
    const form = await request.formData().catch(() => null);
    const pw = form ? String(form.get('pw') || '').trim().toLowerCase() : '';
    if (pw === password) {
      return new Response(null, { status: 303, headers: { Location: '/dashboard', 'Set-Cookie': setCookie } });
    }
    return html(gate(true), 401);
  }

  const url = new URL(request.url);

  // Sign out — the cookie is HttpOnly, so it must be cleared server-side.
  if (url.searchParams.get('logout') != null) {
    return new Response(gate(false), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': 'auguste_dash=; Path=/dashboard; Max-Age=0; HttpOnly; SameSite=Lax; Secure'
      }
    });
  }

  // One-tap link convenience (text himself /dashboard?pw=…). Sets the cookie too.
  const qpw = url.searchParams.get('pw');
  let okFromQuery = false;
  if (!authed && qpw && qpw.trim().toLowerCase() === password) okFromQuery = true;

  if (!authed && !okFromQuery) return html(gate(false));

  // Two tabs share this one gated route (so they share the auth cookie). The project
  // view — site status + what we still need from him — is the default landing now;
  // leads sit behind ?view=leads. (CSV export is a leads-only download.)
  const view = url.searchParams.get('view') === 'leads' ? 'leads' : 'project';
  const wantCsv = url.searchParams.get('format') === 'csv';

  let body;
  if (view === 'leads' || wantCsv) {
    if (!env.DB) {
      body = shell('Leads · ' + BRAND.legalName, topNav('leads', 'Your leads') +
        `<p class="empty">Lead storage isn't connected yet. Once the database is wired up, leads will appear here.</p>`);
    } else {
      const kind = url.searchParams.get('kind') || '';
      const q = (url.searchParams.get('q') || '').trim().toLowerCase();

      // A realtor's lead volume is small; fetch all and filter/categorize in JS so the
      // category (which blends `intent` and `source`) stays consistent everywhere.
      const all = (await env.DB.prepare(
        `SELECT * FROM leads ORDER BY created_at DESC LIMIT 5000`
      ).all()).results || [];
      for (const r of all) r._kind = leadKind(r);

      const matchesSearch = (r) => !q || [r.name, r.email, r.phone, r.address, r.message]
        .some((v) => String(v || '').toLowerCase().includes(q));
      const rows = all.filter((r) => (!kind || r._kind === kind) && matchesSearch(r));

      if (wantCsv) return csvResponse(rows);

      // Summary over ALL leads (the whole picture), independent of the active filter.
      const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
      const agg = {
        total: all.length,
        week: all.filter((r) => r.created_at >= weekAgo).length,
        seller: all.filter((r) => r._kind === 'sell' || r._kind === 'valu').length,
        kinds: KIND_ORDER.map((k) => ({ k, n: all.filter((r) => r._kind === k).length })).filter((c) => c.n)
      };

      body = renderDashboard(rows, agg, { kind, q: url.searchParams.get('q') || '' });
    }
  } else {
    body = renderProject();
  }

  const res = html(body);
  if (okFromQuery) res.headers.append('Set-Cookie', setCookie);
  return res;
}

// ─── CSV export ─────────────────────────────────────────────────────────────
function csvResponse(rows) {
  const cols = ['id', 'created_at', 'name', 'email', 'phone', 'intent', 'source', 'address', 'message'];
  const esc = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const lines = [cols.join(',')];
  for (const r of rows) lines.push(cols.map((c) => esc(r[c])).join(','));
  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="auguste-leads.csv"'
    }
  });
}

// ─── render helpers ─────────────────────────────────────────────────────────
function fmtDate(iso) {
  try { return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); }
  catch { return iso; }
}
function timeAgo(iso) {
  const ms = Date.now() - new Date(iso).getTime();
  if (isNaN(ms)) return '';
  const m = Math.round(ms / 6e4);
  if (m < 1) return 'just now';
  if (m < 60) return m + 'm ago';
  const h = Math.round(m / 60);
  if (h < 24) return h + 'h ago';
  const d = Math.round(h / 24);
  if (d < 30) return d + 'd ago';
  return Math.round(d / 30) + 'mo ago';
}
const titleize = (s) => String(s || '').replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

function detailHtml(dataJson, row) {
  let data;
  try { data = JSON.parse(dataJson); } catch { data = {}; }
  // Prefer the structured columns, fall back to the JSON blob.
  const merged = { name: row.name, email: row.email, phone: row.phone, intent: row.intent, address: row.address, message: row.message, source: row.source, ...data };
  const parts = [];
  const seen = new Set();
  for (const key in FIELD_LABELS) {
    seen.add(key);
    const v = merged[key];
    if (v == null || String(v).trim() === '') continue;
    parts.push(`<div class="dt">${escapeHtml(FIELD_LABELS[key])}</div><div class="dd">${escapeHtml(String(v))}</div>`);
  }
  for (const key in merged) {
    if (seen.has(key) || HIDE_KEYS.has(key)) continue;
    const v = merged[key];
    if (v == null || String(v).trim() === '') continue;
    parts.push(`<div class="dt">${escapeHtml(titleize(key))}</div><div class="dd">${escapeHtml(String(v))}</div>`);
  }
  return `<div class="detail">${parts.join('') || '<div class="dd">No extra detail.</div>'}</div>`;
}

// Category a lead falls into, blending the `intent` dropdown and the form `source`
// (the /home-value page sends no intent, only source=home-value → valuation).
const KIND_ORDER = ['sell', 'valu', 'buy', 'rent', 'gen'];
const KIND_LABEL = { sell: 'Selling', valu: 'Valuation', buy: 'Buying', rent: 'Rent / PM', gen: 'General' };
function leadKind(r) {
  const i = String(r.intent || '').toLowerCase();
  const s = String(r.source || '').toLowerCase();
  if (i.includes('sell') || s.includes('sell')) return 'sell';
  if (i.includes('valu') || s.includes('home-value') || s.includes('valu')) return 'valu';
  if (i.includes('buy')) return 'buy';
  if (i.includes('rent') || i.includes('property management')) return 'rent';
  return 'gen';
}

function renderDashboard(rows, agg, state) {
  const chip = (label, value, n) => {
    const active = state.kind === value ? ' active' : '';
    const href = value
      ? `?view=leads&kind=${encodeURIComponent(value)}${state.q ? '&q=' + encodeURIComponent(state.q) : ''}`
      : (state.q ? `?view=leads&q=${encodeURIComponent(state.q)}` : '?view=leads');
    return `<a class="chip${active}" href="${href}">${escapeHtml(label)}<b>${n}</b></a>`;
  };

  const intentChips = agg.kinds.map((c) => chip(KIND_LABEL[c.k], c.k, c.n)).join('');

  const rowsHtml = rows.map((r) => {
    const cls = r._kind;
    const contact = [
      r.phone ? `<a href="tel:${escapeHtml(r.phone)}" onclick="event.stopPropagation()">${escapeHtml(r.phone)}</a>` : '',
      r.email ? `<a href="mailto:${escapeHtml(r.email)}" class="sub" onclick="event.stopPropagation()">${escapeHtml(r.email)}</a>` : ''
    ].filter(Boolean).join('');
    const where = escapeHtml(r.address || r.source || '—');
    const intentTag = `<span class="tag ${cls}">${escapeHtml(r.intent ? titleize(r.intent) : KIND_LABEL[cls])}</span>`;
    return `<tbody class="row" data-id="${r.id}">
      <tr class="head" onclick="toggleRow(this)">
        <td class="chk"><span class="dot" onclick="event.stopPropagation();toggleDone(${r.id},this)" title="Mark handled"></span></td>
        <td class="when"><span class="abs">${escapeHtml(fmtDate(r.created_at))}</span><span class="sub">${escapeHtml(timeAgo(r.created_at))}</span></td>
        <td class="who">${escapeHtml(r.name || '—')}${r.message ? `<div class="sub clip">${escapeHtml(r.message)}</div>` : ''}</td>
        <td>${intentTag}</td>
        <td class="where t-hide">${where}</td>
        <td class="contact">${contact || '—'}</td>
        <td class="caret">▾</td>
      </tr>
      <tr class="body"><td colspan="7">${detailHtml(r.data, r)}</td></tr>
    </tbody>`;
  }).join('');

  const csvHref = `?view=leads&format=csv${state.kind ? '&kind=' + encodeURIComponent(state.kind) : ''}${state.q ? '&q=' + encodeURIComponent(state.q) : ''}`;
  const filtered = state.kind || state.q;

  const inner = `
  ${topNav('leads', 'Your leads')}

  <div class="stats">
    <div class="stat"><div class="n">${agg.total}</div><div class="k">Total leads</div></div>
    <div class="stat"><div class="n">${agg.week}</div><div class="k">New this week</div></div>
    <div class="stat"><div class="n">${agg.seller}</div><div class="k">Seller &amp; valuation</div></div>
  </div>

  <div class="bar">
    ${chip('All', '', agg.total)}
    ${intentChips}
    <form class="search" method="get">
      <input type="hidden" name="view" value="leads">
      ${state.kind ? `<input type="hidden" name="kind" value="${escapeHtml(state.kind)}">` : ''}
      <input type="text" name="q" placeholder="Search name, email, phone, address…" value="${escapeHtml(state.q)}">
      <button class="btn-sm" type="submit">Search</button>
    </form>
  </div>

  <div class="tools">
    <label class="toggle"><input type="checkbox" id="hideDone" onchange="applyDone()"> Hide handled</label>
    <span class="sep"></span>
    <a href="${csvHref}">Download CSV ↓</a>
    ${filtered ? ` · <a href="?view=leads">Clear filters</a>` : ''}
  </div>

  ${rows.length ? `<div class="tablewrap"><table>
    <thead><tr>
      <th></th><th>When</th><th>Name</th><th>Looking to</th><th class="t-hide">Address / source</th><th>Contact</th><th></th>
    </tr></thead>
    ${rowsHtml}
  </table></div>` : `<p class="empty">${filtered ? 'No leads match that filter.' : "No leads yet. As soon as someone fills out a form on your site, they'll show up here, and you'll get an email."}</p>`}

  <script>
    function toggleRow(el){ el.closest('tbody').classList.toggle('open'); }
    var KEY='auguste_done_leads';
    function getDone(){ try{ return JSON.parse(localStorage.getItem(KEY)||'[]'); }catch(e){ return []; } }
    function setDone(a){ try{ localStorage.setItem(KEY, JSON.stringify(a)); }catch(e){} }
    function toggleDone(id, el){
      var d=getDone(), i=d.indexOf(id);
      if(i===-1)d.push(id); else d.splice(i,1);
      setDone(d); applyDone();
    }
    function applyDone(){
      var d=getDone(), hide=document.getElementById('hideDone') && document.getElementById('hideDone').checked;
      document.querySelectorAll('tbody.row').forEach(function(tb){
        var id=parseInt(tb.getAttribute('data-id'),10), done=d.indexOf(id)!==-1;
        tb.classList.toggle('done', done);
        tb.style.display = (done && hide) ? 'none' : '';
      });
    }
    applyDone();
  </script>`;

  return shell('Your leads · ' + BRAND.legalName, inner);
}

// ─── shared header + tabs ────────────────────────────────────────────────────
// Both views live under /dashboard so they share the auth cookie; the tabs just
// flip the ?view param. `title` is the per-view <h1>.
function topNav(active, title) {
  const tab = (id, label, href) =>
    `<a class="tab${active === id ? ' active' : ''}" href="${href}">${escapeHtml(label)}</a>`;
  return `
  <header class="top">
    <div>
      <span class="label">${escapeHtml(BRAND.legalName)} · private</span>
      <h1>${escapeHtml(title)}</h1>
    </div>
    <a class="signout" href="/dashboard?logout=1">Sign out</a>
  </header>
  <nav class="tabs">
    ${tab('project', 'Your project', '/dashboard')}
    ${tab('leads', 'Leads', '/dashboard?view=leads')}
  </nav>`;
}

// ─── project view (status + the asks) ────────────────────────────────────────
const STATE_LABEL = { done: 'Done', doing: 'In progress', next: 'Next up', later: 'Later' };

function renderProject() {
  const statusHtml = PROJECT_STATUS.map((s) => `
    <li class="st st-${s.state}">
      <span class="st-mark" aria-hidden="true"></span>
      <div class="st-text">
        <div class="st-title">${escapeHtml(s.title)} <span class="st-pill ${s.state}">${STATE_LABEL[s.state] || ''}</span></div>
        <div class="st-detail">${escapeHtml(s.detail)}</div>
      </div>
    </li>`).join('');

  const groupsHtml = DELIVERABLE_GROUPS.map((g) => `
    <section class="dgroup">
      <h3>${escapeHtml(g.tier)}</h3>
      ${g.note ? `<p class="dgroup-note">${escapeHtml(g.note)}</p>` : ''}
      <div class="dcards">
        ${g.items.map((it) => `
        <article class="dcard" data-id="${escapeHtml(it.id)}">
          <button type="button" class="dcheck" onclick="toggleItem('${escapeHtml(it.id)}')" aria-label="Mark '${escapeHtml(it.title)}' as sent" title="Mark as sent"></button>
          <div class="dbody">
            <h4>${escapeHtml(it.title)}</h4>
            <p class="dask">${escapeHtml(it.ask)}</p>
            <p class="dwhy"><span>Why</span> ${escapeHtml(it.why)}</p>
          </div>
        </article>`).join('')}
      </div>
    </section>`).join('');

  const inner = `
  ${topNav('project', 'Your project')}

  <p class="intro">${escapeHtml(PROJECT_INTRO)}</p>

  <section class="panel">
    <h2 class="panel-h">Where things stand</h2>
    <ul class="statlist">${statusHtml}</ul>
  </section>

  <section class="panel">
    <h2 class="panel-h">What would help from you</h2>
    <p class="drop">Easiest drop spot is our shared folder: <a href="${escapeHtml(DRIVE_URL)}" target="_blank" rel="noopener">open the Drive ↗</a>. Or just reply to my last message and send it however's easy.</p>
    ${groupsHtml}
    <p class="checknote">Tap the circle on anything once you've sent it. It only helps you keep track, and it stays on your device.</p>
  </section>

  <section class="panel comms">
    <h2 class="panel-h">Questions on any of this?</h2>
    <p>Text me, or <a href="mailto:azbaghda@gmail.com">send a note</a>, and I'll take care of it. Over time this page will grow into where we keep everything for your site in one place.</p>
  </section>

  <script>
    var DKEY='auguste_deliverables_sent';
    function dGet(){ try{ return JSON.parse(localStorage.getItem(DKEY)||'[]'); }catch(e){ return []; } }
    function dSet(a){ try{ localStorage.setItem(DKEY, JSON.stringify(a)); }catch(e){} }
    function toggleItem(id){
      var d=dGet(), i=d.indexOf(id);
      if(i===-1)d.push(id); else d.splice(i,1);
      dSet(d); dApply();
    }
    function dApply(){
      var d=dGet();
      document.querySelectorAll('.dcard').forEach(function(c){
        c.classList.toggle('sent', d.indexOf(c.getAttribute('data-id'))!==-1);
      });
    }
    dApply();
  </script>`;

  return shell('Your project · ' + BRAND.legalName, inner);
}

// ─── page chrome ─────────────────────────────────────────────────────────────
// Standalone (no public site nav/footer) — this is a private tool. Brand tokens
// match assets/site.css so it still feels like Auguste's site.
function chromeHead(title) {
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#16233d">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='16' fill='%2316233d'/><text x='50' y='72' font-size='62' text-anchor='middle' fill='%23b08d57' font-family='Georgia,serif'>A</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --paper:#faf8f4;--white:#fff;--ink:#222932;--navy:#16233d;--navy-2:#23344f;
    --gold:#b08d57;--gold-dk:#8c6a3a;--muted:#6c7480;--line:#e7e1d6;--line-2:#d8d0c2;
    --serif:"Cormorant Garamond",Georgia,serif;
    --sans:"Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{-webkit-text-size-adjust:100%}
  body{background:var(--paper);color:var(--ink);font-family:var(--sans);font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased;padding:clamp(18px,4vw,40px)}
  a{color:var(--gold-dk);text-decoration:none}
  a:hover{color:var(--gold)}
  .wrap{max-width:1040px;margin:0 auto}
  .label{font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold-dk)}
  h1{font-family:var(--serif);color:var(--navy);font-weight:600;font-size:clamp(30px,5vw,42px);line-height:1.05;letter-spacing:.2px;margin-top:4px}

  /* gate */
  .gate{min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:16px}
  .gate .brand{font-family:var(--serif);font-size:30px;color:var(--navy);font-weight:600}
  .gate .brand b{font-family:"Cormorant Garamond",serif;font-style:italic;color:var(--gold-dk)}
  .gate h2{font-family:var(--serif);font-size:26px;color:var(--navy);font-weight:600}
  .gate p{color:var(--muted);max-width:36ch}
  .gate form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:4px}
  .gate input{font-family:var(--sans);font-size:15px;color:var(--ink);background:var(--white);border:1px solid var(--line-2);border-radius:3px;padding:13px 15px;min-width:230px}
  .gate input:focus{outline:none;border-color:var(--gold)}
  .gate button{font-family:var(--sans);font-weight:600;font-size:15px;border:1px solid var(--navy);background:var(--navy);color:#fff;border-radius:3px;padding:13px 24px;cursor:pointer}
  .gate button:hover{background:var(--navy-2)}
  .err{color:#b3402a;font-size:13px;min-height:1em}

  /* top */
  .top{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:14px}
  .signout{font-size:12.5px;color:var(--muted)}
  .signout:hover{color:var(--navy)}

  /* tabs */
  .tabs{display:flex;gap:4px;border-bottom:1px solid var(--line);margin-bottom:24px}
  .tab{font-size:14px;font-weight:600;color:var(--muted);padding:9px 4px;margin-bottom:-1px;border-bottom:2px solid transparent}
  .tab+.tab{margin-left:18px}
  .tab:hover{color:var(--navy)}
  .tab.active{color:var(--navy);border-bottom-color:var(--gold)}

  /* project view */
  .intro{color:var(--ink);font-size:15.5px;max-width:64ch;margin-bottom:26px}
  .panel{background:var(--white);border:1px solid var(--line);border-radius:8px;padding:clamp(16px,3vw,26px);margin-bottom:18px}
  .panel-h{font-family:var(--serif);color:var(--navy);font-weight:600;font-size:23px;line-height:1.1;margin-bottom:14px}

  /* status list */
  .statlist{list-style:none}
  .st{display:flex;gap:13px;padding:13px 0;border-bottom:1px solid var(--line)}
  .st:first-child{padding-top:0}
  .st:last-child{padding-bottom:0;border-bottom:none}
  .st-mark{flex:none;width:11px;height:11px;border-radius:50%;margin-top:5px;border:2px solid var(--line-2);background:var(--white)}
  .st-done .st-mark{background:var(--gold);border-color:var(--gold)}
  .st-doing .st-mark{background:var(--navy);border-color:var(--navy)}
  .st-title{font-weight:600;color:var(--navy);font-size:14.5px;display:flex;align-items:center;gap:9px;flex-wrap:wrap}
  .st-detail{color:var(--ink);font-size:13.5px;margin-top:3px;max-width:68ch}
  .st-pill{font-size:10px;font-weight:600;letter-spacing:.6px;text-transform:uppercase;padding:2px 8px;border-radius:999px;border:1px solid var(--line-2);color:var(--muted);background:var(--paper)}
  .st-pill.done{color:#6b5320;border-color:#e3c08a;background:#fbf2e2}
  .st-pill.doing{color:#1c4a6e;border-color:#aacbe0;background:#eaf3f9}

  /* deliverables */
  .drop{color:var(--ink);font-size:14px;margin-bottom:6px}
  .dgroup{margin-top:22px}
  .dgroup h3{font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold-dk)}
  .dgroup-note{color:var(--muted);font-size:13px;margin:3px 0 12px}
  .dcards{display:flex;flex-direction:column;gap:10px}
  .dcard{display:flex;gap:13px;align-items:flex-start;border:1px solid var(--line);border-radius:7px;padding:14px 15px;background:var(--paper)}
  .dcard.sent{background:#f3f6ee;border-color:#cfe0bf}
  .dcheck{flex:none;width:20px;height:20px;margin-top:1px;border:2px solid var(--line-2);border-radius:50%;background:var(--white);cursor:pointer;position:relative;transition:background .15s,border-color .15s}
  .dcheck:hover{border-color:var(--gold)}
  .dcard.sent .dcheck{background:#5a8c3a;border-color:#5a8c3a}
  .dcard.sent .dcheck::after{content:"";position:absolute;left:5px;top:1px;width:5px;height:10px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
  .dbody h4{font-family:var(--serif);font-size:18px;font-weight:600;color:var(--navy);line-height:1.15}
  .dcard.sent .dbody h4{text-decoration:line-through;text-decoration-color:var(--line-2);color:var(--muted)}
  .dask{color:var(--ink);font-size:14px;margin-top:4px}
  .dwhy{color:var(--muted);font-size:13px;margin-top:7px}
  .dwhy span{font-weight:600;color:var(--gold-dk);text-transform:uppercase;letter-spacing:.6px;font-size:10.5px;margin-right:4px}
  .checknote{color:var(--muted);font-size:12.5px;margin-top:18px;font-style:italic}
  .comms p{color:var(--ink);font-size:14.5px;max-width:64ch}

  /* stats */
  .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:22px}
  .stat{background:var(--white);border:1px solid var(--line);border-radius:6px;padding:16px 18px}
  .stat .n{font-family:var(--serif);font-size:32px;font-weight:600;color:var(--navy);line-height:1}
  .stat .k{font-size:12px;color:var(--muted);margin-top:5px;letter-spacing:.3px}

  /* filter bar */
  .bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:14px}
  .chip{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line-2);background:var(--white);color:var(--ink);padding:7px 13px;border-radius:999px;font-size:13px;font-weight:500}
  .chip b{color:var(--gold-dk);font-weight:600}
  .chip.active{border-color:var(--navy);background:var(--navy);color:#fff}
  .chip.active b{color:#fff}
  .search{margin-left:auto;display:flex;gap:8px}
  .search input{font-family:var(--sans);font-size:14px;color:var(--ink);background:var(--white);border:1px solid var(--line-2);border-radius:3px;padding:9px 13px;min-width:min(280px,60vw)}
  .search input:focus{outline:none;border-color:var(--gold)}
  .btn-sm{font-family:var(--sans);font-weight:600;font-size:13.5px;border:1px solid var(--navy);background:var(--navy);color:#fff;border-radius:3px;padding:9px 16px;cursor:pointer}
  .btn-sm:hover{background:var(--navy-2)}

  .tools{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:13px;color:var(--muted);margin-bottom:14px}
  .tools .toggle{display:inline-flex;align-items:center;gap:7px;cursor:pointer;color:var(--ink)}
  .tools .sep{flex:1}
  @media(max-width:640px){.tools .sep{display:none}}

  /* table */
  .tablewrap{background:var(--white);border:1px solid var(--line);border-radius:8px;overflow:hidden}
  table{width:100%;border-collapse:collapse;font-size:14px}
  thead th{text-align:left;color:var(--muted);font-size:10.5px;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;padding:12px;border-bottom:1px solid var(--line)}
  tbody.row{border-bottom:1px solid var(--line)}
  tbody.row:last-child{border-bottom:none}
  tr.head{cursor:pointer}
  tr.head:hover td{background:#fcfaf6}
  td{padding:12px;vertical-align:top}
  .chk{width:34px}
  .dot{display:inline-block;width:17px;height:17px;border:2px solid var(--line-2);border-radius:50%;cursor:pointer;vertical-align:middle;transition:background .15s,border-color .15s}
  .dot:hover{border-color:var(--gold)}
  tbody.done .dot{background:var(--gold);border-color:var(--gold)}
  tbody.done .head td{opacity:.5}
  .when{white-space:nowrap}
  .when .abs{display:block;color:var(--navy);font-weight:500;font-size:13px}
  .sub{color:var(--muted);font-size:12px}
  .who{font-weight:600;color:var(--navy)}
  .clip{font-weight:400;max-width:34ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .contact{white-space:nowrap}
  .contact a{display:block}
  .caret{color:var(--muted);text-align:right;width:28px}
  tbody.open .caret{color:var(--gold-dk);transform:rotate(180deg)}
  .tag{font-size:11px;font-weight:600;padding:3px 9px;border-radius:999px;white-space:nowrap;border:1px solid}
  .tag.sell{color:#7a4a12;border-color:#e3c08a;background:#fbf2e2}
  .tag.valu{color:#7a4a12;border-color:#e3c08a;background:#fbf2e2}
  .tag.buy{color:#1c4a6e;border-color:#aacbe0;background:#eaf3f9}
  .tag.rent{color:#3a5a2a;border-color:#bcd6a8;background:#eef5e8}
  .tag.gen{color:var(--muted);border-color:var(--line-2);background:var(--paper)}
  tr.body{display:none}
  tbody.open tr.body{display:table-row}
  tbody.open tr.body td{background:#fcfaf6}
  .detail{display:grid;grid-template-columns:auto 1fr;gap:6px 18px;padding:6px 2px}
  .detail .dt{color:var(--muted);font-size:13px}
  .detail .dd{color:var(--ink);font-size:13.5px;white-space:pre-wrap}
  .empty{background:var(--white);border:1px dashed var(--line-2);border-radius:8px;padding:48px 24px;text-align:center;color:var(--muted)}

  @media(max-width:680px){
    .t-hide{display:none}
    .search{margin-left:0;width:100%}
    .search input{flex:1;min-width:0}
    .stats{gap:8px}
    .stat{padding:13px}
    .stat .n{font-size:26px}
    .clip{max-width:24ch}
  }
</style>
</head><body><main class="wrap">`;
}
const chromeFoot = `</main></body></html>`;

function shell(title, inner) { return chromeHead(title) + inner + chromeFoot; }

function gate(error) {
  return chromeHead('Private · ' + BRAND.legalName) + `
  <div class="gate">
    <a class="brand" href="/">${BRAND.brandHtml}</a>
    <h2>Your lead dashboard</h2>
    <p>Enter your password to see the leads coming in from your site.</p>
    <form method="post" action="/dashboard">
      <input type="password" name="pw" placeholder="Password" autofocus autocomplete="current-password" aria-label="Password">
      <button type="submit">Open dashboard →</button>
    </form>
    <div class="err">${error ? 'Wrong password. Try again.' : ''}</div>
  </div>` + chromeFoot;
}
