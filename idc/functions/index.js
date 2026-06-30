// GET / — the IDC homepage.
//   default (/)      — homepage of the faithful multi-page idcengineers.com clone:
//                      photo hero + sections that alternate light↔dark, each linking
//                      out to its own page (Our Services, Our Projects, About, Contact).
//   bold  (?v=bold)  — the alternate "ambitious one-pager" pitch: the full recruiting
//                      funnel on a single dark page. Kept as a pitch artifact.
// Everything is composed from ./_blocks.js so sections live in exactly one place.

import { page } from './_lib.js';
import { BRAND, HOME } from './_data.js';
import {
  heroHome, statsBand, marketsSection, servicesSection, projectsSection,
  teamSplit, contactCTA, workSection, whySection, growthSection, lifeSection,
  rolesSection, applySection
} from './_blocks.js';

export function onRequestGet(context) {
  const url = new URL(context.request.url);
  const bold = url.searchParams.get('v') === 'bold';

  const meta = {
    path: '/',
    title: bold
      ? 'Careers at IDC Consulting Engineers — Build California’s Infrastructure'
      : 'IDC Consulting Engineers — Transportation Engineering Since 1995',
    description: bold ? BRAND.tagline : HOME.heroLede,
    bodyClass: 'has-hero' + (bold ? ' v-bold' : '')
  };
  return new Response(page(BRAND, meta, bold ? boldHome() : basicHome()), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// ── Basic homepage (multi-page clone) — alternating light/dark bands ──────────
function basicHome() {
  return heroHome() +
    marketsSection('light', { stats: true }) +
    servicesSection('dark', HOME.servicesLede || 'Structural and civil design plus full project and construction management — one firm across every phase.') +
    projectsSection('tint', { limit: 6, head: true, link: '/our-projects' }) +
    teamSplit('dark') +
    contactCTA();
}

// ── Bold one-pager (?v=bold) — the recruiting funnel on a single dark page ────
function boldHome() {
  return heroBold() +
    statsBand() +
    workSection('dark') +
    whySection('alt') +
    growthSection('dark') +
    lifeSection('alt') +
    rolesSection('dark') +
    applySection();
}

function heroBold() {
  return `
  <section class="hero hero-bold">
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-scrim" aria-hidden="true"></div>
    <div class="wrap hero-inner">
      <span class="label accent">Careers · IDC Consulting Engineers</span>
      <h1 class="display">Design the structures<br>that outlive everyone<br>who built them.</h1>
      <p class="lede">Bridges, interchanges, high-speed rail. Since 1995, IDC has delivered 100+ California structures — and we’re hiring the engineers who’ll design the next hundred.</p>
      <div class="hero-cta">
        <a class="btn accent lg" href="#roles">View open roles</a>
        <a class="btn ghost lg" href="#why">Why engineers join</a>
      </div>
      <div class="hero-foot">
        <span>Irvine, CA</span><i></i><span>DBE · WBE certified</span><i></i><span>$10B+ delivered</span>
      </div>
    </div>
  </section>`;
}
