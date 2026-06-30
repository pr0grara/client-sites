// GET/POST /dashboard — Pili's private area.
// Three tabs share this one gated route (so they share the auth cookie):
//   • Your project — where the site / license / Google stand + the few things we need from him
//   • Resources    — the genuinely useful stuff: C-8 study guides, GBP video shot-list, etc.
//   • Leads        — every estimate request from /api/lead (D1), filter + CSV
//
// Auth: a styled on-brand password screen (not a Basic-Auth popup) + 30-day cookie. Password
// comes from the DASH_PASS secret; the fallback lets it work on first deploy — set the secret
// and rotate. (Fallback reuses the proposal password Pili already knows.)
import { html, escapeHtml } from './_lib.js';
import { BRAND } from './_data.js';
import { PROJECT_INTRO, PROJECT_STATUS, DELIVERABLE_GROUPS, LICENSE_RATIONALE, APPLICATION_STEPS, RESOURCE_GROUPS, DRIVE_URL } from './_project.js';

const COOKIE = 'pwc_dash=1';

const FIELD_LABELS = {
  name: 'Name', phone: 'Phone', email: 'Email', town: 'Town',
  project: 'Project', message: 'Message', source: 'Came from'
};
const HIDE_KEYS = new Set(['botcheck']);

export async function onRequest(context) {
  const { request, env } = context;
  const password = (env.DASH_PASS || 'rebar').toLowerCase();
  const cookie = request.headers.get('Cookie') || '';
  const authed = cookie.split(/;\s*/).indexOf(COOKIE) !== -1;
  const setCookie = COOKIE + '; Path=/; Max-Age=2592000; HttpOnly; SameSite=Lax; Secure';

  if (request.method === 'POST') {
    const form = await request.formData().catch(() => null);
    const pw = form ? String(form.get('pw') || '').trim().toLowerCase() : '';
    if (pw === password) {
      return new Response(null, { status: 303, headers: { Location: '/dashboard', 'Set-Cookie': setCookie } });
    }
    return html(gate(true), 401);
  }

  const url = new URL(request.url);

  if (url.searchParams.get('logout') != null) {
    return new Response(gate(false), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': 'pwc_dash=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure'
      }
    });
  }

  const qpw = url.searchParams.get('pw');
  let okFromQuery = false;
  if (!authed && qpw && qpw.trim().toLowerCase() === password) okFromQuery = true;
  if (!authed && !okFromQuery) return html(gate(false));

  const view = ['leads', 'resources'].includes(url.searchParams.get('view')) ? url.searchParams.get('view') : 'project';
  const wantCsv = url.searchParams.get('format') === 'csv';

  let body;
  if (view === 'leads' || wantCsv) {
    if (!env.DB) {
      body = shell('Leads · ' + BRAND.legalName, topNav('leads') +
        `<p class="empty">Lead storage isn't connected yet. Once the database is wired up, your estimate requests will appear here.</p>`);
    } else {
      const kind = url.searchParams.get('kind') || '';
      const q = (url.searchParams.get('q') || '').trim().toLowerCase();
      const all = (await env.DB.prepare(`SELECT * FROM leads ORDER BY created_at DESC LIMIT 5000`).all()).results || [];
      for (const r of all) r._kind = leadKind(r);

      const matchesSearch = (r) => !q || [r.name, r.email, r.phone, r.town, r.message]
        .some((v) => String(v || '').toLowerCase().includes(q));
      const rows = all.filter((r) => (!kind || r._kind === kind) && matchesSearch(r));

      if (wantCsv) return csvResponse(rows);

      const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
      const bigTicket = new Set(['foundation', 'wall', 'excavation']);
      const agg = {
        total: all.length,
        week: all.filter((r) => r.created_at >= weekAgo).length,
        big: all.filter((r) => bigTicket.has(r._kind)).length,
        kinds: KIND_ORDER.map((k) => ({ k, n: all.filter((r) => r._kind === k).length })).filter((c) => c.n)
      };
      body = renderLeads(rows, agg, { kind, q: url.searchParams.get('q') || '' });
    }
  } else if (view === 'resources') {
    body = renderResources();
  } else {
    body = renderProject();
  }

  const res = html(body);
  if (okFromQuery) res.headers.append('Set-Cookie', setCookie);
  return res;
}

// ─── CSV ───────────────────────────────────────────────────────────────
function csvResponse(rows) {
  const cols = ['id', 'created_at', 'name', 'phone', 'email', 'town', 'project', 'source', 'message'];
  const esc = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const lines = [cols.join(',')];
  for (const r of rows) lines.push(cols.map((c) => esc(r[c])).join(','));
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="pacific-west-leads.csv"' }
  });
}

// ─── helpers ───────────────────────────────────────────────────────────
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

const KIND_ORDER = ['foundation', 'wall', 'excavation', 'flatwork', 'patio', 'other'];
const KIND_LABEL = { foundation: 'Foundation', wall: 'Retaining wall', excavation: 'Excavation', flatwork: 'Driveway / flatwork', patio: 'Patio / pavers', other: 'Other' };
function leadKind(r) {
  const p = String(r.project || '').toLowerCase();
  if (p.includes('foundation') || p.includes('stem')) return 'foundation';
  if (p.includes('retaining') || p.includes('wall')) return 'wall';
  if (p.includes('excavation') || p.includes('grading')) return 'excavation';
  if (p.includes('driveway') || p.includes('flatwork')) return 'flatwork';
  if (p.includes('patio') || p.includes('paver')) return 'patio';
  return 'other';
}

function detailHtml(dataJson, row) {
  let data;
  try { data = JSON.parse(dataJson); } catch { data = {}; }
  const merged = { name: row.name, phone: row.phone, email: row.email, town: row.town, project: row.project, message: row.message, source: row.source, ...data };
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

// ─── leads view ────────────────────────────────────────────────────────
function renderLeads(rows, agg, state) {
  const chip = (label, value, n) => {
    const active = state.kind === value ? ' active' : '';
    const href = value
      ? `?view=leads&kind=${encodeURIComponent(value)}${state.q ? '&q=' + encodeURIComponent(state.q) : ''}`
      : (state.q ? `?view=leads&q=${encodeURIComponent(state.q)}` : '?view=leads');
    return `<a class="chip${active}" href="${href}">${escapeHtml(label)}<b>${n}</b></a>`;
  };
  const kindChips = agg.kinds.map((c) => chip(KIND_LABEL[c.k], c.k, c.n)).join('');

  const rowsHtml = rows.map((r) => {
    const cls = r._kind;
    const contact = [
      r.phone ? `<a href="tel:${escapeHtml(r.phone)}" onclick="event.stopPropagation()">${escapeHtml(r.phone)}</a>` : '',
      r.email ? `<a href="mailto:${escapeHtml(r.email)}" class="sub" onclick="event.stopPropagation()">${escapeHtml(r.email)}</a>` : ''
    ].filter(Boolean).join('');
    const tag = `<span class="tag ${cls}">${escapeHtml(r.project ? titleize(r.project) : KIND_LABEL[cls])}</span>`;
    return `<tbody class="row" data-id="${r.id}">
      <tr class="head" onclick="toggleRow(this)">
        <td class="chk"><span class="dot" onclick="event.stopPropagation();toggleDone(${r.id},this)" title="Mark handled"></span></td>
        <td class="when"><span class="abs">${escapeHtml(fmtDate(r.created_at))}</span><span class="sub">${escapeHtml(timeAgo(r.created_at))}</span></td>
        <td class="who">${escapeHtml(r.name || '—')}${r.message ? `<div class="sub clip">${escapeHtml(r.message)}</div>` : ''}</td>
        <td>${tag}</td>
        <td class="where t-hide">${escapeHtml(r.town || '—')}</td>
        <td class="contact">${contact || '—'}</td>
        <td class="caret">▾</td>
      </tr>
      <tr class="body"><td colspan="7">${detailHtml(r.data, r)}</td></tr>
    </tbody>`;
  }).join('');

  const csvHref = `?view=leads&format=csv${state.kind ? '&kind=' + encodeURIComponent(state.kind) : ''}${state.q ? '&q=' + encodeURIComponent(state.q) : ''}`;
  const filtered = state.kind || state.q;

  const inner = `
  ${topNav('leads')}
  <div class="stats">
    <div class="stat"><div class="n">${agg.total}</div><div class="k">Total requests</div></div>
    <div class="stat"><div class="n">${agg.week}</div><div class="k">New this week</div></div>
    <div class="stat"><div class="n">${agg.big}</div><div class="k">Foundations, walls &amp; excavation</div></div>
  </div>
  <div class="bar">
    ${chip('All', '', agg.total)}
    ${kindChips}
    <form class="search" method="get">
      <input type="hidden" name="view" value="leads">
      ${state.kind ? `<input type="hidden" name="kind" value="${escapeHtml(state.kind)}">` : ''}
      <input type="text" name="q" placeholder="Search name, phone, email, town…" value="${escapeHtml(state.q)}">
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
    <thead><tr><th></th><th>When</th><th>Name</th><th>Project</th><th class="t-hide">Town</th><th>Contact</th><th></th></tr></thead>
    ${rowsHtml}
  </table></div>` : `<p class="empty">${filtered ? 'No requests match that filter.' : "No estimate requests yet. As soon as someone fills out the form on your site, they'll show up here, and you'll get an email."}</p>`}
  <script>
    function toggleRow(el){ el.closest('tbody').classList.toggle('open'); }
    var KEY='pwc_done_leads';
    function getDone(){ try{ return JSON.parse(localStorage.getItem(KEY)||'[]'); }catch(e){ return []; } }
    function setDone(a){ try{ localStorage.setItem(KEY, JSON.stringify(a)); }catch(e){} }
    function toggleDone(id, el){ var d=getDone(), i=d.indexOf(id); if(i===-1)d.push(id); else d.splice(i,1); setDone(d); applyDone(); }
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

// ─── header + tabs ─────────────────────────────────────────────────────
function topNav(active) {
  const TITLES = { project: 'Your project', resources: 'Resources', leads: 'Your leads' };
  const tab = (id, label, href) => `<a class="tab${active === id ? ' active' : ''}" href="${href}">${escapeHtml(label)}</a>`;
  return `
  <header class="top">
    <div>
      <span class="label">${escapeHtml(BRAND.legalName)} · private</span>
      <h1>${escapeHtml(TITLES[active])}</h1>
    </div>
    <a class="signout" href="/dashboard?logout=1">Sign out</a>
  </header>
  <nav class="tabs">
    ${tab('project', 'Your project', '/dashboard')}
    ${tab('resources', 'Resources', '/dashboard?view=resources')}
    ${tab('leads', 'Leads', '/dashboard?view=leads')}
  </nav>`;
}

// ─── project view ──────────────────────────────────────────────────────
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
  ${topNav('project')}
  <p class="intro">${escapeHtml(PROJECT_INTRO)}</p>
  <section class="panel">
    <h2 class="panel-h">Where things stand</h2>
    <ul class="statlist">${statusHtml}</ul>
  </section>
  <section class="panel">
    <h2 class="panel-h">What would help from you</h2>
    <p class="drop">Easiest drop spot is our shared folder: <a href="${escapeHtml(DRIVE_URL)}" target="_blank" rel="noopener">open the Drive ↗</a>. Or just text it to me however's easy.</p>
    ${groupsHtml}
    <p class="checknote">Tap the circle on anything once you've sent it. It only helps you keep track, and it stays on your device.</p>
  </section>
  <section class="panel comms">
    <h2 class="panel-h">Questions on any of this?</h2>
    <p>Text me, or <a href="mailto:azbaghda@gmail.com">send a note</a>, and I'll take care of it. This page is where we keep everything for your business in one spot.</p>
  </section>
  <script>
    var DKEY='pwc_deliverables_sent';
    function dGet(){ try{ return JSON.parse(localStorage.getItem(DKEY)||'[]'); }catch(e){ return []; } }
    function dSet(a){ try{ localStorage.setItem(DKEY, JSON.stringify(a)); }catch(e){} }
    function toggleItem(id){ var d=dGet(), i=d.indexOf(id); if(i===-1)d.push(id); else d.splice(i,1); dSet(d); dApply(); }
    function dApply(){ var d=dGet(); document.querySelectorAll('.dcard').forEach(function(c){ c.classList.toggle('sent', d.indexOf(c.getAttribute('data-id'))!==-1); }); }
    dApply();
  </script>`;
  return shell('Your project · ' + BRAND.legalName, inner);
}

// ─── resources view ────────────────────────────────────────────────────
function renderRationale() {
  const r = LICENSE_RATIONALE;
  return `<section class="panel why">
    <h2 class="panel-h">${escapeHtml(r.tier)}</h2>
    ${r.paras.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
  </section>`;
}

function renderSteps() {
  const s = APPLICATION_STEPS;
  const stepsHtml = s.steps.map((it, i) => {
    const cta = it.href && it.href !== '#'
      ? `<a class="steplink" href="${escapeHtml(it.href)}" target="_blank" rel="noopener">${escapeHtml(it.cta)} ↗</a>`
      : '';
    return `<li class="step">
      <span class="stepnum" aria-hidden="true">${i + 1}</span>
      <div class="stepbody">
        <h4>${escapeHtml(it.title)}</h4>
        <p>${escapeHtml(it.detail)}</p>
        ${it.note ? `<p class="stepnote">${escapeHtml(it.note)}</p>` : ''}
        ${cta}
      </div>
    </li>`;
  }).join('');
  return `<section class="panel">
    <h2 class="panel-h">${escapeHtml(s.tier)}</h2>
    ${s.note ? `<p class="rnote">${escapeHtml(s.note)}</p>` : ''}
    <ol class="steplist">${stepsHtml}</ol>
  </section>`;
}

function renderResources() {
  const groupsHtml = RESOURCE_GROUPS.map((g) => `
    <section class="panel">
      <h2 class="panel-h">${escapeHtml(g.tier)}</h2>
      ${g.note ? `<p class="rnote">${escapeHtml(g.note)}</p>` : ''}
      <div class="rcards">
        ${g.items.map((it) => {
          const isLink = it.href && it.href !== '#';
          const cta = isLink
            ? `<a class="rlink" href="${escapeHtml(it.href)}" target="_blank" rel="noopener">${escapeHtml(it.cta)} ↗</a>`
            : `<span class="rsoon">${escapeHtml(it.cta)}</span>`;
          return `<article class="rcard">
            <div class="rbody"><h4>${escapeHtml(it.title)}</h4><p>${escapeHtml(it.desc)}</p></div>
            ${cta}
          </article>`;
        }).join('')}
      </div>
    </section>`).join('');

  const inner = `
  ${topNav('resources')}
  <p class="intro">Everything you need for your license and your Google profile, in one place. Don't try to do it all at once. Follow the license steps in order, give the exams the real study time they take, and I'll handle everything around them.</p>
  ${renderRationale()}
  ${renderSteps()}
  ${groupsHtml}
  <section class="panel comms">
    <h2 class="panel-h">Stuck on anything?</h2>
    <p>The license is the one thing standing between you and your own jobs. The honest split: the paperwork, the deadlines, and every question you hit are mine to handle. The studying is yours, and there's no shortcut on the hours it takes. Text me the second you're stuck on anything except the one part only you can do, which is putting in the time.</p>
  </section>`;
  return shell('Resources · ' + BRAND.legalName, inner);
}

// ─── page chrome (concrete brand; standalone private tool) ─────────────
function chromeHead(title) {
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#191c20">
<link rel="icon" type="image/png" href="/assets/brand/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root{
    --paper:#f4f2ee;--white:#fff;--ink:#1b1e22;--graphite:#191c20;--slate:#3a4654;
    --accent:#1b1e22;--accent-dk:#000000;--muted:#6b7178;--line:#e2ded6;--line-2:#d2cdc2;
    --sans:"Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    --mono:"SF Mono",ui-monospace,"JetBrains Mono",Menlo,Consolas,monospace;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{-webkit-text-size-adjust:100%}
  body{background:var(--paper);color:var(--ink);font-family:var(--sans);font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased;padding:clamp(18px,4vw,40px)}
  a{color:var(--accent-dk);text-decoration:none}
  a:hover{color:var(--accent)}
  .wrap{max-width:1040px;margin:0 auto}
  .label{font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--accent-dk)}
  h1{color:var(--graphite);font-weight:800;font-size:clamp(28px,5vw,40px);line-height:1.05;letter-spacing:-1px;margin-top:4px}

  .brand{display:inline-flex;align-items:center;gap:11px;color:var(--graphite)}
  .brand-logo{height:46px;width:auto;display:block}

  /* gate */
  .gate{min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:16px}
  .gate h2{font-size:24px;color:var(--graphite);font-weight:800;letter-spacing:-.4px}
  .gate p{color:var(--muted);max-width:36ch}
  .gate form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:4px}
  .gate input{font-family:var(--mono);font-size:15px;color:var(--ink);background:var(--white);border:1.5px solid var(--line-2);border-radius:7px;padding:13px 15px;min-width:230px}
  .gate input:focus{outline:none;border-color:var(--accent)}
  .gate button{font-family:var(--sans);font-weight:700;font-size:15px;border:2px solid var(--accent);background:var(--accent);color:#fff;border-radius:7px;padding:13px 24px;cursor:pointer}
  .gate button:hover{background:var(--accent-dk);border-color:var(--accent-dk)}
  .err{color:#b3402a;font-size:13px;min-height:1em}

  /* top + tabs */
  .top{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:14px}
  .signout{font-size:12.5px;color:var(--muted)}
  .signout:hover{color:var(--graphite)}
  .tabs{display:flex;gap:18px;border-bottom:1px solid var(--line);margin-bottom:24px}
  .tab{font-size:14px;font-weight:700;color:var(--muted);padding:9px 2px;margin-bottom:-1px;border-bottom:2px solid transparent}
  .tab:hover{color:var(--graphite)}
  .tab.active{color:var(--graphite);border-bottom-color:var(--accent)}

  .intro{color:var(--ink);font-size:15.5px;max-width:66ch;margin-bottom:26px}
  .panel{background:var(--white);border:1px solid var(--line);border-radius:10px;padding:clamp(16px,3vw,26px);margin-bottom:18px}
  .panel-h{color:var(--graphite);font-weight:800;font-size:21px;line-height:1.1;letter-spacing:-.4px;margin-bottom:14px}

  /* status list */
  .statlist{list-style:none}
  .st{display:flex;gap:13px;padding:13px 0;border-bottom:1px solid var(--line)}
  .st:first-child{padding-top:0}.st:last-child{padding-bottom:0;border-bottom:none}
  .st-mark{flex:none;width:11px;height:11px;border-radius:50%;margin-top:5px;border:2px solid var(--line-2);background:var(--white)}
  .st-done .st-mark{background:var(--accent);border-color:var(--accent)}
  .st-doing .st-mark{background:var(--graphite);border-color:var(--graphite)}
  .st-title{font-weight:700;color:var(--graphite);font-size:14.5px;display:flex;align-items:center;gap:9px;flex-wrap:wrap}
  .st-detail{color:var(--ink);font-size:13.5px;margin-top:3px;max-width:70ch}
  .st-pill{font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;padding:2px 8px;border-radius:999px;border:1px solid var(--line-2);color:var(--muted);background:var(--paper)}
  .st-pill.done{color:#8a4d12;border-color:#edc79a;background:#fbefe0}
  .st-pill.doing{color:#2a3b52;border-color:#bcc6d4;background:#eef1f6}

  /* deliverables */
  .drop{color:var(--ink);font-size:14px;margin-bottom:6px}
  .dgroup{margin-top:22px}
  .dgroup h3{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent-dk)}
  .dgroup-note{color:var(--muted);font-size:13px;margin:3px 0 12px}
  .dcards{display:flex;flex-direction:column;gap:10px}
  .dcard{display:flex;gap:13px;align-items:flex-start;border:1px solid var(--line);border-radius:9px;padding:14px 15px;background:var(--paper)}
  .dcard.sent{background:#f3f6ee;border-color:#cfe0bf}
  .dcheck{flex:none;width:20px;height:20px;margin-top:1px;border:2px solid var(--line-2);border-radius:50%;background:var(--white);cursor:pointer;position:relative;transition:.15s}
  .dcheck:hover{border-color:var(--accent)}
  .dcard.sent .dcheck{background:#5a8c3a;border-color:#5a8c3a}
  .dcard.sent .dcheck::after{content:"";position:absolute;left:5px;top:1px;width:5px;height:10px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
  .dbody h4{font-size:16px;font-weight:800;color:var(--graphite);letter-spacing:-.2px}
  .dcard.sent .dbody h4{text-decoration:line-through;text-decoration-color:var(--line-2);color:var(--muted)}
  .dask{color:var(--ink);font-size:14px;margin-top:4px}
  .dwhy{color:var(--muted);font-size:13px;margin-top:7px}
  .dwhy span{font-weight:700;color:var(--accent-dk);text-transform:uppercase;letter-spacing:.6px;font-size:10.5px;margin-right:4px}
  .checknote{color:var(--muted);font-size:12.5px;margin-top:18px;font-style:italic}
  .comms p{color:var(--ink);font-size:14.5px;max-width:66ch}

  /* resources */
  .rnote{color:var(--muted);font-size:13.5px;margin-bottom:16px;max-width:70ch}
  .rcards{display:flex;flex-direction:column;gap:10px}
  .rcard{display:flex;gap:16px;align-items:center;justify-content:space-between;flex-wrap:wrap;border:1px solid var(--line);border-radius:9px;padding:15px 16px;background:var(--paper)}
  .rbody{flex:1;min-width:240px}
  .rbody h4{font-size:15.5px;font-weight:800;color:var(--graphite)}
  .rbody p{color:var(--muted);font-size:13.5px;margin-top:4px;max-width:64ch}
  .rlink{flex:none;font-weight:700;font-size:13.5px;color:#fff;background:var(--accent);border:2px solid var(--accent);border-radius:7px;padding:9px 15px;white-space:nowrap}
  .rlink:hover{background:var(--accent-dk);border-color:var(--accent-dk);color:#fff}
  .rsoon{flex:none;font-size:12px;font-weight:600;color:var(--muted);background:var(--white);border:1px dashed var(--line-2);border-radius:7px;padding:8px 13px;white-space:nowrap}

  /* why-this-license explainer */
  .why p{color:var(--ink);font-size:14px;max-width:70ch;margin-top:10px}
  .why p:first-of-type{margin-top:0}

  /* license steps (numbered walkthrough) */
  .steplist{list-style:none;counter-reset:step}
  .step{display:flex;gap:15px;padding:16px 0;border-bottom:1px solid var(--line)}
  .step:first-child{padding-top:2px}.step:last-child{padding-bottom:2px;border-bottom:none}
  .stepnum{flex:none;width:28px;height:28px;border-radius:50%;background:var(--graphite);color:#fff;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;margin-top:1px}
  .stepbody{flex:1}
  .stepbody h4{font-size:16px;font-weight:800;color:var(--graphite);letter-spacing:-.2px}
  .stepbody p{color:var(--ink);font-size:14px;margin-top:4px;max-width:68ch}
  .stepnote{color:var(--muted);font-size:13px;font-style:italic;border-left:2px solid var(--line-2);padding-left:11px;margin-top:9px}
  .steplink{display:inline-block;margin-top:10px;font-weight:700;font-size:13.5px;color:#fff;background:var(--accent);border:2px solid var(--accent);border-radius:7px;padding:8px 14px}
  .steplink:hover{background:var(--accent-dk);border-color:var(--accent-dk);color:#fff}

  /* stats */
  .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:22px}
  .stat{background:var(--white);border:1px solid var(--line);border-radius:8px;padding:16px 18px}
  .stat .n{font-size:32px;font-weight:800;color:var(--graphite);line-height:1;letter-spacing:-1px}
  .stat .k{font-size:12px;color:var(--muted);margin-top:5px;letter-spacing:.3px}

  /* filter bar */
  .bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:14px}
  .chip{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line-2);background:var(--white);color:var(--ink);padding:7px 13px;border-radius:999px;font-size:13px;font-weight:600}
  .chip b{color:var(--accent-dk);font-weight:700}
  .chip.active{border-color:var(--graphite);background:var(--graphite);color:#fff}
  .chip.active b{color:#fff}
  .search{margin-left:auto;display:flex;gap:8px}
  .search input{font-family:var(--sans);font-size:14px;color:var(--ink);background:var(--white);border:1px solid var(--line-2);border-radius:7px;padding:9px 13px;min-width:min(280px,60vw)}
  .search input:focus{outline:none;border-color:var(--accent)}
  .btn-sm{font-family:var(--sans);font-weight:700;font-size:13.5px;border:2px solid var(--accent);background:var(--accent);color:#fff;border-radius:7px;padding:9px 16px;cursor:pointer}
  .btn-sm:hover{background:var(--accent-dk);border-color:var(--accent-dk)}
  .tools{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:13px;color:var(--muted);margin-bottom:14px}
  .tools .toggle{display:inline-flex;align-items:center;gap:7px;cursor:pointer;color:var(--ink)}
  .tools .sep{flex:1}
  @media(max-width:640px){.tools .sep{display:none}}

  /* table */
  .tablewrap{background:var(--white);border:1px solid var(--line);border-radius:10px;overflow:hidden}
  table{width:100%;border-collapse:collapse;font-size:14px}
  thead th{text-align:left;color:var(--muted);font-size:10.5px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;padding:12px;border-bottom:1px solid var(--line)}
  tbody.row{border-bottom:1px solid var(--line)}
  tbody.row:last-child{border-bottom:none}
  tr.head{cursor:pointer}
  tr.head:hover td{background:#faf8f4}
  td{padding:12px;vertical-align:top}
  .chk{width:34px}
  .dot{display:inline-block;width:17px;height:17px;border:2px solid var(--line-2);border-radius:50%;cursor:pointer;vertical-align:middle;transition:.15s}
  .dot:hover{border-color:var(--accent)}
  tbody.done .dot{background:var(--accent);border-color:var(--accent)}
  tbody.done .head td{opacity:.5}
  .when{white-space:nowrap}
  .when .abs{display:block;color:var(--graphite);font-weight:600;font-size:13px}
  .sub{color:var(--muted);font-size:12px}
  .who{font-weight:700;color:var(--graphite)}
  .clip{font-weight:400;max-width:34ch;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .contact{white-space:nowrap}.contact a{display:block}
  .caret{color:var(--muted);text-align:right;width:28px}
  tbody.open .caret{color:var(--accent-dk);transform:rotate(180deg)}
  .tag{font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;white-space:nowrap;border:1px solid}
  .tag.foundation,.tag.wall,.tag.excavation{color:#8a4d12;border-color:#edc79a;background:#fbefe0}
  .tag.flatwork{color:#2a3b52;border-color:#bcc6d4;background:#eef1f6}
  .tag.patio{color:#3a5a2a;border-color:#bcd6a8;background:#eef5e8}
  .tag.other{color:var(--muted);border-color:var(--line-2);background:var(--paper)}
  tr.body{display:none}
  tbody.open tr.body{display:table-row}
  tbody.open tr.body td{background:#faf8f4}
  .detail{display:grid;grid-template-columns:auto 1fr;gap:6px 18px;padding:6px 2px}
  .detail .dt{color:var(--muted);font-size:13px}
  .detail .dd{color:var(--ink);font-size:13.5px;white-space:pre-wrap}
  .empty{background:var(--white);border:1px dashed var(--line-2);border-radius:10px;padding:48px 24px;text-align:center;color:var(--muted)}

  @media(max-width:680px){
    .t-hide{display:none}
    .search{margin-left:0;width:100%}.search input{flex:1;min-width:0}
    .stats{gap:8px}.stat{padding:13px}.stat .n{font-size:26px}
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
    <a class="brand" href="/"><img class="brand-logo" src="/assets/brand/logo-dark.png" alt="Pacific West Concrete &amp; Landscaping"></a>
    <h2>Your private dashboard</h2>
    <p>Enter your password to see your project, your resources, and the leads coming in from your site.</p>
    <form method="post" action="/dashboard">
      <input type="password" name="pw" placeholder="Password" autofocus autocomplete="current-password" aria-label="Password">
      <button type="submit">Open dashboard →</button>
    </form>
    <div class="err">${error ? 'Wrong password. Try again.' : ''}</div>
  </div>` + chromeFoot;
}
