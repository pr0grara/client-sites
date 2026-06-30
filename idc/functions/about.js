// GET /about — the About / team page of the multi-page clone.
import { page } from './_lib.js';
import { BRAND, PAGES } from './_data.js';
import { heroLite, teamSplit, statsInline, contactCTA } from './_blocks.js';

export function onRequestGet() {
  const p = PAGES.about;
  const meta = {
    path: '/about',
    title: 'About IDC — Transportation Engineering Since 1995',
    description: p.lede,
    bodyClass: 'has-hero'
  };
  const body =
    heroLite(p) +
    teamSplit('light') +
    statsInline('dark') +
    contactCTA();
  return new Response(page(BRAND, meta, body), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
