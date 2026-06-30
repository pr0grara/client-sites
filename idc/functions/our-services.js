// GET /our-services — the Services page of the multi-page clone.
import { page } from './_lib.js';
import { BRAND, PAGES } from './_data.js';
import { heroLite, servicesSection, marketsSection, statsInline, contactCTA } from './_blocks.js';

export function onRequestGet() {
  const p = PAGES.services;
  const meta = {
    path: '/our-services',
    title: 'Our Services — IDC Consulting Engineers',
    description: p.lede,
    bodyClass: 'has-hero'
  };
  const body =
    heroLite(p) +
    servicesSection('light', p.lede) +
    marketsSection('tint') +
    statsInline('dark') +
    contactCTA();
  return new Response(page(BRAND, meta, body), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
