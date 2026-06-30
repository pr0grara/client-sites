// GET /our-projects/<slug> — one page per project, content drawn directly from
// the matching page on idcengineers.com/projects-main1 (see PROJECT_DETAILS in
// _data.js). Add a project to HOME_PROJECTS + PROJECT_DETAILS and a page exists.

import { page, escapeHtml, html } from '../_lib.js';
import { BRAND, HOME_PROJECTS, PROJECT_DETAILS } from '../_data.js';
import { projectDetail, contactCTA } from '../_blocks.js';

export function onRequestGet(context) {
  const slug = context.params.project;
  const p = HOME_PROJECTS.find((x) => x.slug === slug);
  if (!p) return html(notFound(), 404);

  const d = PROJECT_DETAILS[slug] || {};
  const meta = {
    path: `/our-projects/${slug}`,
    title: `${p.name} — IDC Consulting Engineers`,
    description: p.desc,
    bodyClass: 'has-hero'
  };
  return new Response(page(BRAND, meta, projectDetail(p, d) + contactCTA()), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function notFound() {
  const links = HOME_PROJECTS.map((p) =>
    `<a class="btn ghost" href="/our-projects/${p.slug}" style="margin:4px">${escapeHtml(p.name)}</a>`).join('');
  return page(BRAND, { path: '/404', title: 'Project not found — IDC Consulting Engineers' }, `
  <section class="band"><div class="wrap" style="text-align:center;padding-top:60px">
    <span class="label accent">404</span>
    <h1 class="display" style="font-size:clamp(34px,5vw,56px);margin:12px 0 16px">That project isn&rsquo;t here.</h1>
    <p class="lede" style="margin:0 auto 26px">Browse the full list of IDC projects:</p>
    <div>${links}</div>
  </div></section>`);
}
