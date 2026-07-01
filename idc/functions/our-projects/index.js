// GET /our-projects — the filterable projects directory of the multi-page clone.
import { page } from '../_lib.js';
import { BRAND, PAGES } from '../_data.js';
import { heroLite, projectsDirectory, contactCTA } from '../_blocks.js';

export function onRequestGet() {
  const p = PAGES.projects;
  const meta = {
    path: '/our-projects',
    title: 'Our Projects — IDC Consulting Engineers',
    description: p.lede,
    bodyClass: 'has-hero'
  };
  const body =
    heroLite({ ...p, parallax: true }) +
    projectsDirectory('light') +
    contactCTA();
  return new Response(page(BRAND, meta, body), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
