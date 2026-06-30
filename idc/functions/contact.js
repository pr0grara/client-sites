// GET /contact — the Contact page (info + message form → /api/apply).
import { page } from './_lib.js';
import { BRAND, PAGES } from './_data.js';
import { heroLite, contactSection } from './_blocks.js';

export function onRequestGet() {
  const p = PAGES.contact;
  const meta = {
    path: '/contact',
    title: 'Contact IDC Consulting Engineers',
    description: p.lede,
    bodyClass: 'has-hero'
  };
  const body =
    heroLite(p) +
    contactSection('tint');
  return new Response(page(BRAND, meta, body), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
