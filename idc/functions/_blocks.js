// Shared, theme-aware section builders for the IDC site.
// Every page (Home, the subpages, the bold one-pager) composes these, so a section
// is defined once and reused. `theme` picks the band's light/dark treatment:
//   'dark' (default) · 'alt' (dark alt) · 'light' (white) · 'tint' (light grey)
// Light bands flip the CSS palette tokens, so the same markup adapts automatically.

import { escapeHtml, salaryLabel } from './_lib.js';
import { BRAND, HOME, MARKETS, SERVICES, HOME_PROJECTS,
         STATS, PILLARS, GROWTH, LIFE, ROLES } from './_data.js';

export const img = (name) => `/assets/img/${name}.webp`;

const THEME = { dark: '', alt: 'alt', light: 'light', tint: 'tint' };
function band(theme, inner, { id = '', extra = '' } = {}) {
  const cls = ['band', THEME[theme] ?? '', extra].filter(Boolean).join(' ');
  return `<section class="${cls}"${id ? ` id="${id}"` : ''}><div class="wrap">${inner}</div></section>`;
}
function sectionHead({ eyebrow, title, lede }) {
  return `<div class="section-head">
      <span class="label accent">${escapeHtml(eyebrow)}</span>
      <h2 class="section-title">${escapeHtml(title)}</h2>
      ${lede ? `<p class="lede">${escapeHtml(lede)}</p>` : ''}
    </div>`;
}

// ── Heroes ───────────────────────────────────────────────────────────────────
// Scroll-linked parallax for the photo layer. Only the landing + projects
// directory heroes opt in (class `hero-parallax`); one script drives any match
// on the page. Honors prefers-reduced-motion and skips off-screen heroes.
export function heroParallax() {
  return `<script>(function(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var els=[].slice.call(document.querySelectorAll('.hero-parallax .hero-photo'));
  if(!els.length)return;
  var tick=false;
  function u(){
    for(var i=0;i<els.length;i++){
      var p=els[i],r=p.parentElement.getBoundingClientRect();
      if(r.bottom<0||r.top>innerHeight)continue;
      p.style.transform='translate3d(0,'+(-r.top*0.28).toFixed(1)+'px,0)';
    }
    tick=false;
  }
  addEventListener('scroll',function(){if(!tick){requestAnimationFrame(u);tick=true;}},{passive:true});
  addEventListener('resize',function(){if(!tick){requestAnimationFrame(u);tick=true;}},{passive:true});
  u();
})();</script>`;
}

// Full photo hero (homepage): real idcengineers.com bridge behind the blueprint grid.
export function heroHome() {
  return `
  <section class="hero hero-photo-bg hero-parallax">
    <div class="hero-photo" aria-hidden="true"></div>
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-scrim" aria-hidden="true"></div>
    <div class="wrap hero-inner">
      <span class="label accent">${escapeHtml(HOME.heroEyebrow)}</span>
      <h1 class="display">${HOME.heroTitleHtml}</h1>
      <p class="lede">${escapeHtml(HOME.heroLede)}</p>
      <div class="hero-cta">
        <a class="btn accent lg" href="/our-projects">Explore our work</a>
        <a class="btn ghost lg" href="/contact">Get in touch</a>
      </div>
      <div class="hero-foot">
        <span>Irvine, CA</span><i></i><span>Since 1995</span><i></i><span>DBE · WBE certified</span>
      </div>
    </div>
  </section>${heroParallax()}`;
}

// Short subpage banner over one of the firm's photos. `parallax` opts the
// photo layer into the scroll-linked treatment (used by the projects directory).
export function heroLite({ eyebrow, title, lede, img: name, parallax = false }) {
  const cls = 'hero-lite hero-photo-bg' + (parallax ? ' hero-parallax' : '');
  return `
  <section class="${cls}">
    <div class="hero-photo" aria-hidden="true" style="background-image:url('${img(name)}')"></div>
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-scrim" aria-hidden="true"></div>
    <div class="wrap"><div class="hero-lite-inner">
      <span class="label accent">${escapeHtml(eyebrow)}</span>
      <h1>${escapeHtml(title)}</h1>
      ${lede ? `<p>${escapeHtml(lede)}</p>` : ''}
    </div></div>
  </section>${parallax ? heroParallax() : ''}`;
}

// ── Markets (icon strip) ─────────────────────────────────────────────────────
export function marketsSection(theme = 'light', { stats = false } = {}) {
  const cells = MARKETS.map((m) => `
    <a class="market" href="/our-projects?market=${encodeURIComponent(m.key)}">
      <span class="market-ico" aria-hidden="true">${marketIcon(m.icon)}</span>
      <span class="market-name">${escapeHtml(m.name)}</span>
    </a>`).join('');
  // Optional stat strip leading the section — used on the homepage so the figures
  // live here, in the first content band, instead of overlapping the hero.
  const statRow = stats ? `<div class="stats inline mkt-stats">${STATS.map((s) => `
    <div class="stat">
      <div class="stat-fig">${escapeHtml(s.figure)}</div>
      <div class="stat-lab">${escapeHtml(s.label)}</div>
    </div>`).join('')}</div>` : '';
  return band(theme, `
    ${statRow}
    ${sectionHead({ eyebrow: 'Our markets', title: 'The infrastructure we engineer.' })}
    <div class="markets">${cells}</div>`, { id: 'markets' });
}

// ── Services (numbered cards) ────────────────────────────────────────────────
export function servicesSection(theme = 'dark', lede = '') {
  const cards = SERVICES.map((s, i) => `
    <article class="svc">
      <div class="svc-no">0${i + 1}</div>
      <h3>${escapeHtml(s.title)}</h3>
      <p>${escapeHtml(s.body)}</p>
    </article>`).join('');
  return band(theme, `
    ${sectionHead({ eyebrow: 'Our services', title: 'Structural, civil, and management, end to end.', lede })}
    <div class="svc-grid">${cards}</div>`, { id: 'services' });
}

// ── Projects (photo gallery) ─────────────────────────────────────────────────
// One project card, framed the way IDC frames theirs: photo, market tag, name,
// and a one-line description. `link` makes the whole card a link (homepage →
// directory); pass null for a static card (the directory itself).
function projectCard(p, link) {
  const inner = `
      <img class="pcard-img" src="${img(p.img)}" alt="${escapeHtml(p.name)}" loading="lazy">
      <div class="pcard-body">
        <div class="pcard-kind">${escapeHtml(p.kind)}</div>
        <div class="pcard-name">${escapeHtml(p.name)}</div>
        ${p.desc ? `<p class="pcard-desc">${escapeHtml(p.desc)}</p>` : ''}
      </div>`;
  const attrs = p.markets ? ` data-markets="${escapeHtml(p.markets.join(' '))}"` : '';
  return link
    ? `<a class="pcard" href="${link}"${attrs}>${inner}</a>`
    : `<article class="pcard"${attrs}>${inner}</article>`;
}

export function projectsSection(theme = 'tint', {
  projects = HOME_PROJECTS, limit = 0, head = true, link = '/our-projects',
  eyebrow = 'Our projects', title = 'Featured projects.', lede = HOME.projectsIntro
} = {}) {
  const list = limit ? projects.slice(0, limit) : projects;
  const cards = list.map((p) => projectCard(p, p.slug ? `/our-projects/${p.slug}` : link)).join('');
  const headHtml = head ? sectionHead({ eyebrow, title, lede }) : '';
  const more = (limit && link) ? `<div class="team-cta" style="margin-top:34px"><a class="btn ghost lg" href="${link}">See all projects</a></div>` : '';
  return band(theme, `${headHtml}<div class="proj-grid">${cards}</div>${more}`, { id: 'work' });
}

// ── Projects directory (filterable by market) ────────────────────────────────
// The whole project list with a market filter bar. Filters share MARKETS keys,
// so "Our markets" cards deep-link here (/our-projects?market=bridges) and the
// matching filter auto-selects on load.
export function projectsDirectory(theme = 'light') {
  const filters = [{ key: 'all', name: 'All projects' },
    ...MARKETS.map((m) => ({ key: m.key, name: m.name }))];
  const fbtns = filters.map((f, i) =>
    `<button class="pf-btn${i === 0 ? ' is-active' : ''}" type="button" data-filter="${f.key}" aria-pressed="${i === 0}">${escapeHtml(f.name)}</button>`).join('');
  const cards = HOME_PROJECTS.map((p) => projectCard(p, p.slug ? `/our-projects/${p.slug}` : null)).join('');
  return band(theme, `
    <div class="proj-filter" role="group" aria-label="Filter projects by market">${fbtns}</div>
    <div class="proj-grid" id="projGrid">${cards}</div>
    <p class="proj-empty" id="projEmpty" hidden>No projects in this market yet.</p>
    ${directoryScript()}`, { id: 'work' });
}

// Client-side filtering for the projects directory. Reads ?market=<key> (or the
// URL hash) on load so deep links from the markets cards open pre-filtered, and
// keeps the URL in sync as the visitor switches filters.
function directoryScript() {
  return `<script>
  (function(){
    var grid=document.getElementById('projGrid');
    if(!grid)return;
    var btns=[].slice.call(document.querySelectorAll('.pf-btn'));
    var cards=[].slice.call(grid.querySelectorAll('.pcard'));
    var empty=document.getElementById('projEmpty');
    var keys=btns.map(function(b){return b.getAttribute('data-filter');});
    function apply(f){
      var shown=0;
      cards.forEach(function(c){
        var m=(c.getAttribute('data-markets')||'').split(' ');
        var show=f==='all'||m.indexOf(f)>-1;
        c.classList.toggle('is-hidden',!show);
        if(show)shown++;
      });
      btns.forEach(function(b){
        var on=b.getAttribute('data-filter')===f;
        b.classList.toggle('is-active',on);
        b.setAttribute('aria-pressed',on);
      });
      if(empty)empty.hidden=shown>0;
    }
    function initial(){
      var u=new URL(window.location.href);
      var f=u.searchParams.get('market')||(window.location.hash||'').replace('#','')||'all';
      return keys.indexOf(f)>-1?f:'all';
    }
    btns.forEach(function(b){b.addEventListener('click',function(){
      var f=b.getAttribute('data-filter');
      apply(f);
      var url=f==='all'?location.pathname:location.pathname+'?market='+f;
      history.replaceState(null,'',url);
    });});
    var start=initial();
    apply(start);
    // Arrived from a home-page "what we do" market card (deep-linked + filtered)?
    // Softly scroll past the hero to the filtered results, clearing the fixed nav.
    if(start!=='all'){
      var target=document.querySelector('.proj-filter')||grid;
      var nav=document.querySelector('.nav');
      var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      requestAnimationFrame(function(){
        var offset=(nav?nav.offsetHeight:0)+24;
        var endY=target.getBoundingClientRect().top+window.pageYOffset-offset;
        var startY=window.pageYOffset||0,dist=endY-startY;
        // The stylesheet sets html{scroll-behavior:smooth}, which would re-animate
        // every per-frame scrollTo and fight this loop. Drive it ourselves.
        var root=document.documentElement,prevSB=root.style.scrollBehavior;
        root.style.scrollBehavior='auto';
        if(reduce||Math.abs(dist)<4){window.scrollTo(0,endY);root.style.scrollBehavior=prevSB;return;}
        // Premium reveal: the train is already rolling at load — a lead-in gives
        // it nonzero speed from frame one — then it builds through medium and
        // brakes on a smooth maglev airbrake to a dead stop. Final velocity is
        // still 0, so no jerk on arrival. 'lead' sets how much it's already
        // moving at t=0 (0 = dead standstill, higher = more initial roll). ~0.9s.
        var lead=0.95;
        function ease(t){return lead*(1-(1-t)*(1-t))+(1-lead)*(t*t*t*t*(5-4*t));}
        var dur=900,t0=performance.now(),done=false;
        function stop(){done=true;off();}
        function off(){
          root.style.scrollBehavior=prevSB;
          removeEventListener('wheel',stop);
          removeEventListener('touchstart',stop);
          removeEventListener('keydown',stop);
        }
        // Never fight the visitor: any manual scroll input cancels the animation.
        addEventListener('wheel',stop,{passive:true});
        addEventListener('touchstart',stop,{passive:true});
        addEventListener('keydown',stop);
        function step(now){
          if(done)return;
          var p=Math.min(1,(now-t0)/dur);
          window.scrollTo(0,startY+dist*ease(p));
          if(p<1)requestAnimationFrame(step);else off();
        }
        requestAnimationFrame(step);
      });
    }
  })();
  </script>`;
}

// ── Project detail (one page per project, content from idcengineers.com) ─────
// Photo banner + overview/summary prose + a fact panel (client, location,
// timeline, cost). Market tags deep-link back into the filtered directory.
export function projectDetail(p, d = {}) {
  const marketName = (k) => (MARKETS.find((m) => m.key === k) || {}).name || k;
  const tags = (p.markets || []).map((k) =>
    `<a class="tag" href="/our-projects?market=${encodeURIComponent(k)}">${escapeHtml(marketName(k))}</a>`).join('');
  const facts = [
    ['Client', d.owner],
    ['Location', d.location],
    ['Timeline', d.date],
    ['Est. cost', d.cost]
  ].filter(([, v]) => v).map(([k, v]) =>
    `<div class="fact"><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('');
  const summary = (d.summary || []).map((s) => `<p>${escapeHtml(s)}</p>`).join('');
  return `
  <section class="hero-lite hero-photo-bg project-hero">
    <div class="hero-photo" aria-hidden="true" style="background-image:url('${img(p.img)}')"></div>
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-scrim" aria-hidden="true"></div>
    <div class="wrap"><div class="hero-lite-inner">
      <a class="back" href="/our-projects">&larr; All projects</a>
      <span class="label accent">${escapeHtml(p.kind)}</span>
      <h1>${escapeHtml(p.name)}</h1>
      ${p.desc ? `<p>${escapeHtml(p.desc)}</p>` : ''}
    </div></div>
  </section>

  <section class="band project-detail"><div class="wrap role-cols">
    <div class="role-content">
      ${d.overview ? `<h2 class="sub-title">Project overview</h2><p>${escapeHtml(d.overview)}</p>` : ''}
      ${summary ? `<h2 class="sub-title">IDC&rsquo;s role</h2>${summary}` : ''}
      ${tags ? `<div class="proj-markets"><span class="proj-markets-k">Markets</span><div class="role-tags">${tags}</div></div>` : ''}
    </div>
    <aside class="role-aside">
      <dl class="facts">${facts}</dl>
      <a class="btn accent lg full" href="/contact">Discuss a project</a>
      <p class="aside-note">Want IDC on your project? Tell us what you&rsquo;re building and we&rsquo;ll be in touch.</p>
    </aside>
  </div></section>`;
}

// ── About / team (photo + prose split) ───────────────────────────────────────
export function teamSplit(theme = 'dark') {
  return band(theme, `
    <div class="split narrow">
      <div class="split-copy">
        <span class="label accent">Our team</span>
        <h2 class="section-title">${escapeHtml(HOME.teamTitle)}</h2>
        <p class="lede">${escapeHtml(HOME.teamBody)}</p>
        <div class="team-cta"><a class="btn accent lg" href="/about">About IDC</a></div>
      </div>
      <div class="split-img"><img src="${img('office-lobby')}" alt="Inside IDC's Irvine office" loading="lazy"></div>
    </div>`, { id: 'team' });
}

// ── Stats (overlap card on home, inline grid elsewhere) ──────────────────────
export function statsBand() {
  const cells = STATS.map((s) => `
    <div class="stat">
      <div class="stat-fig">${escapeHtml(s.figure)}</div>
      <div class="stat-lab">${escapeHtml(s.label)}</div>
    </div>`).join('');
  return `<section class="band stats-band"><div class="wrap"><div class="stats">${cells}</div></div></section>`;
}
export function statsInline(theme = 'dark') {
  const cells = STATS.map((s) => `
    <div class="stat">
      <div class="stat-fig">${escapeHtml(s.figure)}</div>
      <div class="stat-lab">${escapeHtml(s.label)}</div>
    </div>`).join('');
  return band(theme, `<div class="stats inline">${cells}</div>`);
}

// ── Get-in-touch CTA (own dark gradient band) ────────────────────────────────
export function contactCTA() {
  return `<section class="band cta-band"><div class="wrap">
    <div class="cta-inner">
      <div>
        <span class="label accent">Get in touch</span>
        <h2 class="section-title">${escapeHtml(HOME.contactTitle)}</h2>
        <p class="lede">${escapeHtml(HOME.contactBody)}</p>
      </div>
      <div class="cta-actions">
        <a class="btn accent lg" href="/contact">Contact us</a>
        <a class="btn ghost lg" href="tel:${BRAND.phoneHref}">${escapeHtml(BRAND.phone)}</a>
      </div>
    </div>
  </div></section>`;
}

// ── Contact page (info + message form) ───────────────────────────────────────
export function contactSection(theme = 'tint') {
  const a = BRAND.address;
  return band(theme, `
    <div class="contact-grid">
      <div class="contact-info">
        <div class="contact-row"><span class="k">Call</span><a class="v" href="tel:${BRAND.phoneHref}">${escapeHtml(BRAND.phone)}</a></div>
        <div class="contact-row"><span class="k">Email</span><a class="v" href="mailto:${escapeHtml(BRAND.email)}">${escapeHtml(BRAND.email)}</a></div>
        <div class="contact-row"><span class="k">Office</span><span class="v">${escapeHtml(a.streetAddress)}<br>${escapeHtml(a.addressLocality)}, ${escapeHtml(a.addressRegion)} ${escapeHtml(a.postalCode)}</span></div>
        <div class="contact-row"><span class="k">Careers</span><a class="v" href="/careers">View open roles &rarr;</a></div>
      </div>
      <form class="apply-form" id="contactForm" novalidate>
        <input type="text" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">
        <div class="row2">
          <label>Full name<input name="name" required autocomplete="name"></label>
          <label>Email<input name="email" type="email" required autocomplete="email"></label>
        </div>
        <label>Phone<input name="phone" type="tel" autocomplete="tel"></label>
        <label>How can we help?<textarea name="message" rows="5" placeholder="Tell us about your project, or your interest in joining the team."></textarea></label>
        <button class="btn accent lg" type="submit">Send message</button>
        <p class="form-note" id="contactNote" role="status"></p>
      </form>
    </div>
    ${formScript('contactForm', 'contactNote', 'contact-page', 'Thanks — your message is in. We’ll be in touch.', 'Submit application', 'Send message')}`);
}

// ════════ Recruiting blocks (careers page + bold one-pager) ══════════════════

export function workSection(theme = 'dark') {
  // Candidate-framed marquee projects (same photo gallery, recruiting copy).
  return projectsSection(theme, {
    limit: 6, link: '/our-projects',
    eyebrow: 'The work',
    title: 'The projects on your résumé in five years.',
    lede: 'Most engineers spend a career hoping to touch work like this. At IDC it’s the assignment, not the lottery.'
  });
}

export function whySection(theme = 'alt') {
  const cards = PILLARS.map((p, i) => `
    <article class="pillar">
      <div class="pillar-no">0${i + 1}</div>
      <div class="pillar-tag">${escapeHtml(p.tag)}</div>
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.body)}</p>
    </article>`).join('');
  return band(theme, `
    ${sectionHead({ eyebrow: 'Why IDC', title: 'Big-firm projects. Small-firm proximity.', lede: 'You shouldn’t have to choose between landmark work and actually being seen. Here you don’t.' })}
    <div class="pillar-grid">${cards}</div>`, { id: 'why' });
}

export function growthSection(theme = 'dark') {
  const steps = GROWTH.map((g, i) => `
    <li class="rung">
      <div class="rung-no">${i + 1}</div>
      <div class="rung-body">
        <h4>${escapeHtml(g.step)}</h4>
        <p>${escapeHtml(g.detail)}</p>
      </div>
    </li>`).join('');
  return band(theme, `
    ${sectionHead({ eyebrow: 'Growth & licensure', title: 'Hired to be grown, not parked.', lede: 'A real, mentored road to your PE and SE — walked by the people who now run this firm.' })}
    <ol class="ladder">${steps}</ol>`, { id: 'growth' });
}

export function lifeSection(theme = 'alt') {
  const cards = LIFE.map((l) => `
    <article class="life">
      <h4>${escapeHtml(l.title)}</h4>
      <p>${escapeHtml(l.body)}</p>
    </article>`).join('');
  return band(theme, `
    ${sectionHead({ eyebrow: 'Life at IDC', title: 'The parts that don’t fit on a job post.' })}
    <div class="life-grid">${cards}</div>`, { id: 'life' });
}

export function rolesSection(theme = 'dark') {
  const rows = ROLES.map((r) => {
    const pay = salaryLabel(r);
    return `
    <a class="role" href="/careers/${r.slug}">
      <div class="role-main">
        <h3>${escapeHtml(r.title)}</h3>
        <p>${escapeHtml(r.summary)}</p>
        <div class="role-tags">
          <span class="tag">${escapeHtml(r.discipline)}</span>
          <span class="tag">${escapeHtml(r.level)}</span>
          <span class="tag">${escapeHtml(r.location)}</span>
        </div>
      </div>
      <div class="role-side">
        ${pay ? `<div class="role-pay">${escapeHtml(pay)}</div>` : ''}
        <span class="role-go">View role &rarr;</span>
      </div>
    </a>`;
  }).join('');
  return band(theme, `
    ${sectionHead({ eyebrow: 'Open roles', title: 'Where you’d come in.', lede: 'Don’t see the exact title? Strong engineers are worth a conversation — send us your work below.' })}
    <div class="role-list">${rows}</div>`, { id: 'roles' });
}

export function applySection() {
  const opts = ROLES.map((r) => `<option value="${escapeHtml(r.title)}">${escapeHtml(r.title)}</option>`).join('');
  return `<section class="band apply-band" id="apply"><div class="wrap">
    <div class="apply-card">
      <div class="apply-copy">
        <span class="label accent">Apply</span>
        <h2 class="section-title">Start the conversation.</h2>
        <p>Tell us who you are and what you’ve built. We’ll read it and get back to you.</p>
        <p class="apply-alt">Prefer email? <a href="mailto:${escapeHtml(BRAND.email)}">${escapeHtml(BRAND.email)}</a></p>
      </div>
      <form class="apply-form" id="applyForm" novalidate>
        <input type="text" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">
        <div class="row2">
          <label>Full name<input name="name" required autocomplete="name"></label>
          <label>Email<input name="email" type="email" required autocomplete="email"></label>
        </div>
        <div class="row2">
          <label>Phone<input name="phone" type="tel" autocomplete="tel"></label>
          <label>Role of interest
            <select name="intent">
              <option value="">General / not sure</option>
              ${opts}
            </select>
          </label>
        </div>
        <label>Portfolio or LinkedIn URL<input name="address" placeholder="linkedin.com/in/…  or  a project link"></label>
        <label>Tell us about your work<textarea name="message" rows="4" placeholder="Licenses (PE/SE/EIT), the kind of structures you’ve designed, and what you’re looking for next."></textarea></label>
        <button class="btn accent lg" type="submit">Submit application</button>
        <p class="form-note" id="formNote" role="status"></p>
      </form>
    </div>
  </div></section>
  ${formScript('applyForm', 'formNote', 'careers-apply', 'Thanks — your application is in. We’ll be in touch.', 'Submit application', 'Submit application')}`;
}

// Shared client-side submit handler for the apply + contact forms.
function formScript(formId, noteId, source, okMsg, idleLabel, idleLabelOut) {
  const out = idleLabelOut || idleLabel;
  return `<script>
  (function(){
    var f=document.getElementById(${JSON.stringify(formId)}),note=document.getElementById(${JSON.stringify(noteId)});
    if(!f)return;
    f.addEventListener('submit',async function(e){
      e.preventDefault();
      var btn=f.querySelector('button[type=submit]');
      var data=Object.fromEntries(new FormData(f).entries());
      data.source=${JSON.stringify(source)};
      note.textContent='';btn.disabled=true;btn.textContent='Submitting…';
      try{
        var r=await fetch('/api/apply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
        var j=await r.json();
        if(j.success){f.reset();note.className='form-note ok';note.textContent=${JSON.stringify(okMsg)};}
        else{note.className='form-note err';note.textContent=j.message||'Something went wrong. Email ${BRAND.email}.';}
      }catch(err){note.className='form-note err';note.textContent='Network error. Email ${BRAND.email}.';}
      btn.disabled=false;btn.textContent=${JSON.stringify(out)};
    });
  })();
  </script>`;
}

// Inline line icons for the markets strip — simple, stroke-based, theme-colored.
export function marketIcon(key) {
  const ic = {
    road: '<path d="M3 21 8 3M21 21 16 3M12 6v3M12 13v3"/>',
    bridge: '<path d="M2 9c4 0 4 9 10 9s6-9 10-9M2 9h20M4 9v10M20 9v10"/>',
    rail: '<path d="M8 3 6 21M16 3l2 18M4 8h16M4 15h16"/>',
    transit: '<rect x="5" y="3" width="14" height="14" rx="2"/><path d="M5 11h14M8 21l1-4M16 21l-1-4"/>',
    port: '<path d="M12 3v18M12 8a4 4 0 0 1 4-4M12 8a4 4 0 0 0-4-4M4 12a8 8 0 0 0 16 0"/>'
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ic[key] || ''}</svg>`;
}
