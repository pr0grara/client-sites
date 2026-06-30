// GET /careers — the Careers page: the one thing idcengineers.com lacks, a real
// hiring funnel. This is the elevation the clone adds. (The single-page version of
// the same pitch lives at /?v=bold.)
import { page } from '../_lib.js';
import { BRAND, PAGES } from '../_data.js';
import { heroLite, statsInline, whySection, lifeSection, rolesSection, applySection } from '../_blocks.js';

export function onRequestGet() {
  const p = PAGES.careers;
  const meta = {
    path: '/careers',
    title: 'Careers at IDC Consulting Engineers',
    description: p.lede,
    bodyClass: 'has-hero'
  };
  const body =
    heroLite(p) +
    statsInline('dark') +
    whySection('light') +
    lifeSection('tint') +
    rolesSection('dark') +
    applySection();
  return new Response(page(BRAND, meta, body), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
