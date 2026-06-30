// All Pacific West Concrete content + brand config. The only file you rewrite per client.
// (Layout/markup lives in index.js + _lib.js; this is just the data.)
//
// LAUNCH GATES — Pili is not licensed yet (CSLB C-8 in progress) and not bonded/insured.
// Copy below is deliberately truthful: no licensed/insured/bonded claims, no fake stats or
// reviews. The day the license issues:
//   1. set licensed:true + cslb:'#######'   → turns on the trust badge + schema credential
//   2. set noindex:false                     → lets Google index the site
//   3. swap phone to the Twilio tracking line (lead attribution) — see clients/pili in arabuilds
//   4. drop real photo URLs into WORK below  → replaces the placeholder tiles

const YEAR = new Date().getUTCFullYear();

export const BRAND = {
  name: 'Pacific West Concrete — Foundations, Retaining Walls & Concrete · East Bay',
  legalName: 'Pacific West Concrete & Landscaping',
  tagline: 'Family-run East Bay concrete: foundations, retaining walls with real drainage, excavation, driveways and flatwork. Built to hold. Free onsite estimates.',
  siteUrl: 'https://www.pacificwestconcrete.com',
  // Pili's real logo (from his intake doc): the leaf-and-P emblem + wordmark.
  // White version for the dark nav/footer; the dashboard login swaps in the dark version.
  brandHtml: '<img class="brand-logo" src="/assets/brand/logo-light.png" alt="Pacific West Concrete & Landscaping" width="240" height="68">',

  phone: '510-240-2876',          // TODO: swap to Twilio tracking line at launch
  phoneHref: '+15102402876',
  email: 'Masaniai51@gmail.com',  // kept OFF the public page (spam) — used only as the lead reply-to
  hours: 'Mon–Fri · 6am – 6pm',
  openingHours: 'Mo-Fr 06:00-18:00',

  // launch gates
  noindex: true,
  licensed: false,
  cslb: '',

  nav: [
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/#work' },
    { label: 'Process', href: '/#process' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Free estimate', href: '/#contact' }
  ],

  footerBlurb: 'Second-generation concrete out of Alameda. The heavy, technical pours — foundations, retaining walls and drainage — done right the first time.',
  footerCols: [
    { title: 'Services', links: [
      { label: 'Foundations & stem walls', href: '/#services' },
      { label: 'Retaining walls & drainage', href: '/#services' },
      { label: 'Excavation & grading', href: '/#services' },
      { label: 'Driveways & flatwork', href: '/#services' },
      { label: 'Patios & pavers', href: '/#services' }
    ]},
    { title: 'Service area', links: [
      { label: 'Alameda', href: '/#contact' },
      { label: 'Berkeley', href: '/#contact' },
      { label: 'Walnut Creek', href: '/#contact' },
      { label: 'Benicia', href: '/#contact' },
      { label: 'Tiburon', href: '/#contact' }
    ]},
    { title: 'Get in touch', links: [
      { label: 'Call or text 510-240-2876', href: 'tel:+15102402876' },
      { label: 'Request a free estimate', href: '/#contact' }
    ]}
  ],

  year: YEAR,
  // No license claim until the C-8 is in hand. At launch, append e.g. 'CSLB #1234567.'
  compliance: 'Family-owned & operated. Serving the East Bay & North Bay.',
  areaServed: ['Alameda', 'Berkeley', 'Walnut Creek', 'Benicia', 'Tiburon'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Alameda',
    addressRegion: 'CA',
    addressCountry: 'US'
  }
};

// Trust chips under the hero. Licensed/insured chip only appears once it's real.
export const TRUST = [
  'Family-owned & operated',
  'Free onsite estimates',
  'Serving the East Bay & North Bay'
];

// Services — lead with the high-ticket strengths (foundations, walls + drainage, excavation).
export const SERVICES = [
  { ic: '🏗️', h: 'Foundations & Stem Walls', p: 'New foundations, footings, slabs and stem walls poured to spec for new builds and additions. The base everything else stands on.', tag: 'New builds · additions' },
  { ic: '🧱', h: 'Retaining Walls & Drainage', p: 'Engineered retaining walls with full perforated drainage and dissipators. Hold back a hillside the right way, so it stays held back.', tag: 'Our specialty' },
  { ic: '⛏️', h: 'Excavation & Grading', p: 'Site prep, excavation, grading and dirt haul. We get the ground ready and level before a single yard is poured.', tag: 'Site prep' },
  { ic: '🚗', h: 'Driveways & Flatwork', p: 'Driveways, walkways, sidewalks and slabs on a proper compacted base. Clean lines, no shortcuts, built to last.', tag: 'Residential' },
  { ic: '🪨', h: 'Patios & Pavers', p: 'Patios, paver installs and decorative flatwork that add real usable space and real value to a home.', tag: 'Outdoor living' },
  { ic: '🌿', h: 'Landscaping', p: 'Hardscape and landscape work to finish the job, from grading and walls to the green that ties it all together.', tag: 'Finishing touches' }
];

export const WHY = [
  { h: 'Second-generation concrete', p: 'The trade was handed down and taken further, from driveways and patios into foundations, retaining walls and excavation.' },
  { h: 'The owner runs your job', p: 'Pili bids it, runs the crew and stands behind the work. The person who quotes your project is the person who builds it.' },
  { h: 'Built for the hard pours', p: 'Real drainage behind retaining walls. A proper compacted base under flatwork. The details that decide whether concrete lasts.' },
  { h: 'Straight talk, honest bids', p: 'A clear written estimate — what it costs and what it takes — no surprises halfway through the job.' }
];

// Featured project — Troy's job, stated factually (no invented customer quote).
export const FEATURED = {
  eyebrow: 'Featured project',
  title: "A hillside that wasn't going anywhere.",
  h: '10-inch retaining wall, full drainage, and a mudslide brought back to grade.',
  p: 'After a slide took out a hillside, Pacific West ran the whole job end to end: major excavation to bring the ground back, a ten-inch reinforced retaining wall, and a full perforated drainage system with a dissipator so water has somewhere to go. The kind of work that has to be right the first time.',
  tags: ['Retaining wall', 'Perforated drainage', 'Excavation', 'Run by the owner'],
  cap: 'Retaining wall + drainage'
};

// Gallery. Add { src:'/assets/work/foo.jpg', cap:'…' } as real photos come in; empty src
// renders a clean labelled placeholder so the layout is launch-ready either way.
export const WORK = [
  { src: '', cap: 'Retaining wall + drainage' },
  { src: '', cap: 'Foundation & stem wall' },
  { src: '', cap: 'Driveway' },
  { src: '', cap: 'Excavation & grading' },
  { src: '', cap: 'Patio & pavers' },
  { src: '', cap: 'Finished flatwork' }
];

export const STEPS = [
  { h: 'Free onsite estimate', p: 'We come out, look at the job, and get you a clear written bid, usually within 24 to 48 hours.' },
  { h: 'Plan & schedule', p: 'We lock the scope, the materials and a start date that works around you.' },
  { h: 'We pour it right', p: 'Proper base, proper drainage, proper finish. The crew that bids it is the crew that builds it.' },
  { h: 'Final walkthrough', p: "We walk the finished job together. We're not done until you're happy with it." }
];

export const FAQ = [
  { q: 'Do you give free estimates?', a: 'Yes. We come out to the site, look at what the job actually needs, and get you a clear written estimate, usually within 24 to 48 hours.' },
  { q: 'What areas do you serve?', a: 'We work throughout the East Bay and North Bay, including Alameda, Berkeley, Walnut Creek, Benicia, Tiburon and the surrounding communities. Not sure if you’re in range? Just ask.' },
  { q: 'What size jobs do you take?', a: 'Everything from driveways and patios up to full foundations, retaining walls and site excavation. The bigger, more technical concrete work is where we do our best.' },
  { q: 'Who actually does the work?', a: 'Pili and his crew. This is a family-run operation, so the person who bids your job is the one running it on site.' },
  { q: 'How do I get started?', a: 'Call or text 510-240-2876, or fill out the quote form below with a few details. We’ll get right back to you.' }
];

// Project types in the quote form's dropdown (also used to categorize leads on the dashboard).
export const PROJECT_TYPES = [
  'Foundation / stem wall',
  'Retaining wall & drainage',
  'Excavation & grading',
  'Driveway / flatwork',
  'Patio / pavers',
  'Other / not sure'
];
