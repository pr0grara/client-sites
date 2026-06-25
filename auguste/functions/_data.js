// All Auguste-specific content + brand config. Fork this file for a new client.
// (Layout/markup lives in index.js + _lib.js; this is just the data.)

const YEAR = new Date().getUTCFullYear();

export const BRAND = {
  name: 'Auguste Realtor — Emeryville Condo Specialist',
  legalName: 'Auguste Vende',
  tagline: 'The Emeryville condo specialist. Over $35M sold, 7 years, 60+ homes closed — selling and buying East Bay condos, seamlessly.',
  siteUrl: 'https://www.auguste-realtor.com',
  brandHtml: 'Auguste <b>Realtor</b>',

  phone: '(510) 421-6994',
  phoneHref: '+15104216994',
  email: 'auguste@alleastbay.com',

  navCta: "What's my condo worth?",
  nav: [
    { label: 'Home Search', href: '/#search' },
    { label: 'Communities', href: '/#communities' },
    { label: 'Recently Sold', href: '/#sold' },
    { label: 'About', href: '/#about' },
    { label: 'Sellers', href: '/home-value' },
    { label: 'Contact', href: '/#contact' }
  ],

  footerBlurb: 'A Paris-born, jazz-musician-turned-broker bringing calm, candor, and sharp negotiation to every East Bay condo sale.',
  footerCols: [
    { title: 'Explore', links: [
      { label: 'Home Search', href: '/#search' },
      { label: 'Recently Sold', href: '/#sold' },
      { label: 'Communities', href: '/#communities' },
      { label: 'About Auguste', href: '/#about' }
    ]},
    { title: 'Communities', links: [
      { label: 'Emeryville Condos', href: '/condos/emeryville' },
      { label: 'Oakland Condos', href: '/condos/oakland' },
      { label: 'Berkeley Condos', href: '/condos/berkeley' },
      { label: 'Alameda Condos', href: '/condos/alameda' }
    ]},
    { title: 'Connect', links: [
      { label: 'Call (510) 421-6994', href: 'tel:+15104216994' },
      { label: 'Email Auguste', href: 'mailto:auguste@alleastbay.com' },
      { label: 'Contact', href: '/#contact' }
    ]}
  ],

  year: YEAR,
  // California advertising compliance: responsible broker must be identified.
  compliance: 'Auguste Vende, REALTOR®, DRE #02090399. Brokered by All East Bay Properties, DRE #01516255, 2324 Powell Street, Emeryville, CA 94608.',
  areaServed: ['Emeryville', 'Oakland', 'Berkeley', 'Alameda'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2324 Powell Street',
    addressLocality: 'Emeryville',
    addressRegion: 'CA',
    postalCode: '94608',
    addressCountry: 'US'
  }
};

export const STATS = [
  { n: '$35M+', k: 'In sales volume' },
  { n: '7 yrs', k: 'As a broker' },
  { n: '60+', k: 'Homes closed' },
  { n: '5.0★', k: 'Client rating' }
];

// His bio, split into paragraphs (verbatim from the copy he supplied).
export const BIO = [
  "With over 7 years of experience as a real estate broker and over $35M in sales volume, I bring a sense of calm and unwavering confidence to every real estate transaction and client interaction.",
  "I take immense pride in the fact that my clients continually return to me and enthusiastically refer their loved ones. Growing up in Paris and having a background as a jazz musician, I've honed my people skills, adopted a direct approach, and developed highly regarded negotiation expertise.",
  "I'm also an avid tennis player, rock climber, and trail runner. And when I'm not enjoying those activities, you'll likely find me immersed in a captivating Sci-Fi book."
];

// Reviews (verbatim). `excerpt` is the trimmed version shown on cards.
export const REVIEWS = [
  { name: 'Rabea', excerpt: 'Auguste had me covered. He made the buying experience enjoyable and flawless. Knowledgeable, approachable, humble, and a white-glove service. I can’t stress enough how available, attentive and responsive he was.', full: 'Auguste had me covered. He made the buying experience enjoyable and flawless. He is knowledgable, approachable, humble and has provided a white glove service. I can’t stress enough how available, attentive and responsive he was. I will be retaining his services again.' },
  { name: 'David', excerpt: 'Superb service. Auguste made the sales experience very efficient, displaying at all times the highest level of professionalism and insight into the best approach to maximize value. Very strong marketing acumen.', full: 'The real estate services provided by Auguste Venda and his colleagues were superb. Wish to commend the planning, execution and follow through. Auguste made the sales experience very efficient displaying at all times the highest level of professionalism and insight into the best approach to maximize value. Very strong marketing acumen as well.' },
  { name: 'Mitch', excerpt: 'Whether you are selling or renting, I highly recommend Auguste. He gave excellent advice on prepping my Emeryville unit, managed all the work, and got it on the market quickly and looking great. I attribute the quick sale largely to his diligence and marketing acumen.', full: 'Whether you are selling or renting, I highly recommend Auguste. He is great to work with and has helped me navigate what could have been a couple of very tricky transactions with ease. When I decided to sell my condo in Emeryville, he provided excellent advice on prepping the unit along with accurate cost estimates. He managed all of the work and got the property on the market quickly and looking great at a reasonable cost. I attribute the quick sale largely to his diligence and marketing acumen. My past dealings with realtors have not always been positive, but I know that Auguste has my best interests at heart, and I will continue to work with him in the future.' },
  { name: 'Hoss', excerpt: 'Auguste provided great service and I was very happy with his performance. He helped me in every step even beyond his obligation to make the process very smooth. I strongly recommend him to my friends.', full: 'Auguste provided great service and I was very happy with his performance. He helped me in every step even beyond his obligation to make the process very smooth. I will be using his service and strongly recommend to my friends.' },
  { name: 'Maryl', excerpt: 'We sold a studio unit and Auguste handled almost every phase — renovations, marketing, and sale. He gave us solid, grounded advice, showed us comps to set the price, and the unit sold quickly. We highly recommend Auguste!', full: 'We just sold a studio unit, and Auguste handled almost every phase of the renovations, marketing, and sale. He was a great communicator and accessible — and just a really nice guy. He gave us solid, grounded advice on the condition of the studio and supervised the renovations himself. He showed us comps to help us set the price, and the unit sold quickly, to our pleasure and relief. We highly recommend Auguste!' },
  { name: 'Bernard', excerpt: 'Auguste helped me throughout buying my first home. His attention to detail was phenomenal and he always had my best interest in mind. I’d highly recommend Auguste to anybody looking to buy or sell their home.', full: 'Auguste helped me throughout the process of buying my first home. His attention to detail was phenomenal and he always had my best interest in mind. When something needed to get done or phone calls had to be made, I was always confident with Auguste representing me. I’d highly recommend Auguste to anybody looking to buy/sell their home.' },
  { name: 'Qing', excerpt: 'Auguste has helped me rent and manage my rental property at Watergate in Emeryville for many years. He is simply the best — a wonderful communicator, kind and super helpful. I’d highly recommend him.', full: 'Auguste has been helping me on renting and managing my rental property at watergate in Emeryville for many years. He is simply the best. Wonderful communicator, kind and super helpful. I needed advice recently on my rental, He provided me sound advice. I’d highly recommend him.' },
  { name: 'F. Cheng', excerpt: 'Auguste is efficient and effective. He helped me and my extended family sell and rent our properties. He is patient and methodical, and provided us excellent service.', full: 'Auguste is efficient and effective. He was helping me and my extended family to sell and to rent our properties. He is patient and methodical. He provided us excellent service.' }
];

// Communities / niche (his priority order). Drives the homepage cards AND the
// data-driven city pages at /condos/<slug>.  East Oakland is intentionally excluded.
export const CITIES = [
  {
    slug: 'emeryville', name: 'Emeryville', kind: 'condos', primary: true,
    card: 'The specialty. Watergate, the Artist Co-Op lofts, Bridgewater, Pacific Park Plaza and the rest — Auguste sells more of them than anyone.',
    h1: 'Emeryville Condos for Sale',
    intro: 'Emeryville is condo country — high-rise bay views at Pacific Park Plaza and Watergate, live/work lofts, and walkable new-build flats steps from Bay Street. It is the market Auguste knows building-by-building, and the one he has sold in for seven years.',
    points: [
      'Buildings Auguste sells in constantly: Watergate, Pacific Park Plaza, Bridgewater, Artist Co-Op lofts, Glashaus, Andante.',
      'A seven-year track record selling Emeryville condos — he knows the HOAs, the comps, and what each building actually trades for.',
      'Sellers: a marketing and renovation playbook tuned to exactly these units. Buyers: first look and straight talk on which buildings hold value.'
    ]
  },
  {
    slug: 'oakland', name: 'Oakland', kind: 'condos',
    card: 'Condos and lofts in North Oakland, Uptown, and along the waterfront — the neighborhoods next door to Emeryville.',
    h1: 'Oakland Condos & Lofts for Sale',
    intro: 'Just over the Emeryville line, Oakland’s condo and loft market runs from Uptown high-rises to North Oakland and Jack London waterfront flats. Auguste works the pockets that border his home turf.',
    points: [
      'Focused on North Oakland, Uptown, Temescal, and the Jack London waterfront.',
      'The same building-level pricing discipline he brings to Emeryville.',
      'Buyers and sellers of condos, lofts, and live/work spaces.'
    ]
  },
  {
    slug: 'berkeley', name: 'Berkeley', kind: 'condos',
    card: 'Condos and townhomes from West Berkeley to downtown — walkable, transit-rich, and always in demand.',
    h1: 'Berkeley Condos & Townhomes for Sale',
    intro: 'Berkeley’s condo and townhome market rewards an agent who knows the micro-neighborhoods. Auguste helps buyers and sellers from West Berkeley to the downtown core.',
    points: [
      'Condos and townhomes near BART, the waterfront, and downtown.',
      'Pricing and prep advice grounded in real recent comps.',
      'A calm hand for first-time buyers and move-up sellers alike.'
    ]
  },
  {
    slug: 'alameda', name: 'Alameda', kind: 'condos',
    card: 'Island condos and waterfront flats — from Bayport to the South Shore and the growing Alameda Landing.',
    h1: 'Alameda Condos for Sale',
    intro: 'Alameda’s island setting and waterfront condos draw buyers who want space and calm near the water. Auguste covers the island’s condo communities end to end.',
    points: [
      'South Shore, Bayport, Marina Cove, and Alameda Landing condos.',
      'Honest read on HOA health, parking, and resale.',
      'Marketing built for the buyers who specifically want island living.'
    ]
  }
];

// Small-multifamily / investor angle (almost no agent owns this; ties to his PM work).
export const MULTIFAMILY = {
  title: 'Small Multifamily & Investors',
  blurb: 'Duplexes to mid-size apartment buildings across the East Bay — Auguste recently closed an 8-unit and a 12-unit, and works hand-in-hand with All East Bay Properties’ management side. A rare specialist for owners who want both a sale and a steady operator.'
};

// Recently-Sold showcase — his real closings, grouped by building (seller-side
// only; he was the listing agent on every one). Source data: /listings.json.
// Photos live in /assets/sold/. Entries without an `img` show a placeholder card
// until the photo lands (see /assets/sold/README.md). Live IDX-sold comps will
// load alongside these once IDX is connected.
export const SOLD = [
  { title: 'Watergate', sub: 'Emeryville · 21 homes sold', price: '$251K–$650K', img: 'watergate.jpg' },
  { title: 'Pacific Park Plaza', sub: 'Emeryville · 8 homes sold', price: '$420K–$1.22M', img: 'pacific-park-plaza.jpg' },
  { title: 'The Terraces at EmeryStation', sub: 'Emeryville · 3 homes sold', price: '$600K–$695K', img: '5855-horton-terraces.webp' },
  { title: 'Bridgewater', sub: 'Emeryville · 2 homes sold', price: '$270K–$530K', img: '6400-christie-bridgewater.jpg' },
  { title: 'Emeryville Warehouse Lofts', sub: 'Emeryville · 2 homes sold', price: '$390K–$635K', img: '1500-park.jpg' },
  { title: 'The Infinity', sub: 'San Francisco · 338 Spear', price: '$900K', img: '338-spear-infinity.jpg' },
  { title: '2709 Channing Way', sub: 'Berkeley · 12-unit building', price: '$2.65M', note: 'Photo from Auguste' },
  { title: '1929 California Street', sub: 'Berkeley · 8-unit building', price: '$2.08M', note: 'Photo from Auguste' },
  { title: '1505 32nd Street', sub: 'Oakland · Condo', price: '$807K', note: 'Photo from Auguste' },
  { title: '3609 Adeline Street', sub: 'Emeryville · Single-family', price: '$740K', note: 'Photo from Auguste' },
  { title: '1054 63rd Street', sub: 'Oakland · Single-family', price: '$725K', note: 'Photo from Auguste' }
];
