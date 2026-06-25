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

  // Subtle nav callout to the condo housing-stock page (built separately).
  navStock: { label: 'Browse condos', href: '/condos' },
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
      { label: 'Condo Directory', href: '/condos' },
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

// ─── CONDO-BUILDING DIRECTORY ──────────────────────────────────────────────
// The "main condo stock" as a buyer's reference tool (and seller exposure: when an
// owner googles their building, this page ranks). This is PURE STRUCTURED DATA —
// every fact lives in a field, never baked into markup — so a future redesign
// re-skins the template at /building/[slug].js without touching the research here.
//
// `verified:false` until Auguste confirms a building's facts. The template softens
// HOA/amenity numbers as "approximate, confirming with Auguste" while false. Flip to
// true per building as he signs off. `augusteSold` = his own closings in the building
// (from LISTINGS.md), which doubles as social proof on each page.
//
// East Oakland is excluded by design. Berkeley/Oakland buildings get added here later
// with the same shape — no code changes, the directory just grows.
export const BUILDINGS = [
  {
    slug: 'watergate', name: 'Watergate', aka: ['The Watergate'], city: 'Emeryville',
    img: 'sold/watergate.jpg',
    neighborhood: 'Watergate Peninsula', type: 'garden',
    yearBuilt: 1972, stories: 4, units: 1249,
    hoa: { min: 454, max: 798 }, hoaIncludes: ['Water', 'Trash', 'Cable TV', 'Insurance', 'Security', 'Grounds'],
    parking: 'Assigned garage parking', pets: 'Allowed, with restrictions',
    amenities: ['Multiple pools', 'Spas', 'Fitness center', 'Tennis courts', 'Racquetball', '24-hour security', 'Gated entry', 'Clubhouse'],
    unitMix: 'Studios to 2BR', priceRange: '$300K–$650K',
    transit: 'On the Powell Street peninsula. Emery Go-Round shuttle to MacArthur BART, I-80 at the door.',
    blurb: 'A 26-acre gated waterfront community of roughly 1,249 garden-style condos finished in 1972. Many units look out on the bay and the Bay Bridge, and the grounds carry multiple pools, tennis, and round-the-clock security.',
    augusteSold: 21, featured: true, verified: false
  },
  {
    slug: 'pacific-park-plaza', name: 'Pacific Park Plaza', aka: ['The Towers', '6363 Christie'], city: 'Emeryville',
    img: 'sold/pacific-park-plaza.jpg',
    neighborhood: 'Christie / Powell District', type: 'high-rise',
    yearBuilt: 1984, stories: 30, units: 583,
    hoa: { min: 520, max: 775 }, hoaIncludes: ['Water', 'Sewer', 'Gas', 'Hot water', 'Trash', 'Insurance', 'Cable TV', 'Security'],
    parking: 'One deeded space in the gated garage', pets: 'Allowed, with restrictions',
    amenities: ['Pool', 'Spa', 'Sauna', 'Fitness center', 'Tennis courts', '24-hour security', 'Gated parking', 'Recreation room'],
    unitMix: '1BR to 4BR', priceRange: '$400K–$1.22M',
    transit: 'Walk to Bay Street and Powell Street retail. Emery Go-Round to MacArthur BART, immediate I-80 access.',
    blurb: 'At 30 stories and 318 feet, the tallest tower in Emeryville and the tallest in the East Bay outside downtown Oakland. Built in 1984 with about 583 units, known locally as The Towers, with sweeping bay, city, and hills views from the upper floors.',
    augusteSold: 8, featured: true, verified: false
  },
  {
    slug: 'bridgewater', name: 'Bridgewater', aka: ['6400 Christie'], city: 'Emeryville',
    img: 'sold/6400-christie-bridgewater.jpg',
    neighborhood: 'Christie / Powell District', type: 'mid-rise',
    yearBuilt: 1989, stories: 6, units: 425,
    hoa: { min: 412, max: 711 }, hoaIncludes: ['Water', 'Sewer', 'Trash', 'Grounds', 'Management'],
    parking: 'One space in the gated garage. EV charging and bike storage.', pets: 'Pet friendly, with an on-site dog park',
    amenities: ['Heated pool', 'Two spas', 'Dry sauna', 'Fitness center', 'Yoga studio', 'Clubhouse', 'Barbecue area', 'Dog park', 'EV chargers'],
    unitMix: 'Studios to 2BR', priceRange: '$270K–$530K',
    transit: 'Next to Pacific Park Plaza, near Bay Street and Powell Street retail. Emery Go-Round to MacArthur BART.',
    blurb: 'A six-story, roughly 425-unit community finished in 1989 with one of the deepest amenity sets in the city: heated pool, sauna, yoga studio, clubhouse, and a dedicated dog park. Pet friendly, with EV charging in the gated garage.',
    augusteSold: 2, featured: true, verified: false
  },
  {
    slug: 'terraces-emerystation', name: 'The Terraces at EmeryStation', aka: ['The Terraces', '5855 Horton'], city: 'Emeryville',
    img: 'sold/5855-horton-terraces.webp',
    neighborhood: 'EmeryStation / Horton', type: 'mid-rise',
    yearBuilt: 2003, stories: 8, units: 101,
    hoa: { min: 613, max: 780 }, hoaIncludes: ['Water', 'Sewer', 'Hot water', 'Trash', 'Grounds', 'Reserves'],
    parking: 'Assigned space in the secured garage, plus guest parking', pets: 'Pet friendly',
    amenities: ['Fitness center', 'Sauna', 'Screening theater', 'Conference room', 'Business center', 'Clubhouse', 'Secured lobby'],
    unitMix: 'Studios to 2BR, including two-level lofts', priceRange: '$540K–$835K',
    transit: 'Steps from the Amtrak Emeryville station. Emery Go-Round to Ashby and MacArthur BART, near the Hollis tech corridor.',
    blurb: 'An eight-story, 101-unit building from 2003 in the EmeryStation district, a short walk from the Amtrak station and Bay Street. Single-level flats and two-level lofts, with a fitness center, sauna, and a private screening theater.',
    augusteSold: 3, featured: true, verified: false
  },
  {
    slug: 'emeryville-warehouse-lofts', name: 'Emeryville Warehouse Lofts', aka: ['1500 Park Avenue Lofts'], city: 'Emeryville',
    img: 'sold/1500-park.jpg',
    neighborhood: 'Park Avenue District', type: 'loft',
    yearBuilt: 1925, stories: 5, units: 141,
    hoa: { min: 416, max: 679 }, hoaIncludes: ['Water', 'Trash', 'Grounds'],
    parking: 'Deeded space in the five-story garage', pets: 'Allowed, with restrictions',
    amenities: ['Roof deck', 'Water-wall courtyard', 'Gated security', 'Storage available'],
    unitMix: 'Studios, 1BR lofts, townhouse lofts, penthouses', priceRange: '$390K–$850K',
    transit: 'Park Avenue District. Emery Go-Round to MacArthur BART, quick Bay Bridge access.',
    blurb: 'A 1925 concrete fruit-drying warehouse converted by David Baker Architects in 1999 into 141 live/work lofts. Soaring ceilings, oversized windows, exposed concrete, and ground-floor lofts with roll-up glass garage doors. The flagship warehouse conversion in the Park Avenue District.',
    augusteSold: 2, featured: true, verified: false
  },
  {
    slug: 'glashaus', name: 'Glashaus', aka: ['Glashaus Lofts'], city: 'Emeryville',
    img: 'buildings/glashaus.jpg', // CC0 photo, Mike Linksvayer — see assets/buildings/README.md
    neighborhood: 'Hollis / Park Avenue District', type: 'loft',
    yearBuilt: 2008, stories: 4, units: 145,
    hoa: null, hoaIncludes: ['Water', 'Sewer', 'Trash', 'Grounds', 'Insurance', 'Management'],
    parking: 'Townhomes have attached two-car garages. Podium flats have garage and guest parking.', pets: 'Allowed, with restrictions',
    amenities: ['Clubhouse', 'Landscaped courtyards', 'Elevator', 'Guest parking'],
    unitMix: 'Studios to 2BR flats, plus tri-level townhomes', priceRange: '$385K–$990K',
    transit: 'Hollis Street arts corridor. Emery Go-Round to BART, walk to the Public Market and Berkeley Bowl West.',
    blurb: 'A 145-unit modern loft and townhome community by Kava Massih Architects, finished around 2008 at Hollis and 65th. Floor-to-ceiling windows and an industrial-modern look, with three-story townhomes wrapped around landscaped courtyards.',
    augusteSold: 0, featured: false, verified: false
  },
  {
    slug: 'andante', name: 'Andante', aka: ['1121 40th Street'], city: 'Emeryville',
    neighborhood: '40th & San Pablo', type: 'mid-rise',
    yearBuilt: 2005, stories: 5, units: 125,
    hoa: null, hoaIncludes: ['Water', 'Trash', 'Grounds', 'Management'],
    parking: 'Assigned space in the gated garage', pets: 'Pet friendly, subject to HOA approval',
    amenities: ['Pool', 'Spa', 'Fitness center', 'Community room', 'Landscaped courtyard', 'Ground-floor retail'],
    unitMix: '1BR and 2BR', priceRange: '$250K–$540K',
    transit: 'Corner of 40th and San Pablo. Under half a mile to MacArthur BART, Emery Go-Round at the door.',
    blurb: 'A 2005 mid-rise of about 125 units over ground-floor retail at 40th and San Pablo, across five buildings around a landscaped courtyard. One of the more attainable newer buildings, with a pool, spa, and gym, and strong transit access.',
    augusteSold: 0, featured: false, verified: false
  },
  {
    slug: 'vue-46', name: 'Vue 46', aka: ['Vue46', '1001 46th Street'], city: 'Emeryville',
    neighborhood: 'Central Emeryville', type: 'mid-rise',
    yearBuilt: 2008, stories: 3, units: 79,
    hoa: null, hoaIncludes: ['Water', 'Sewer', 'Gas', 'Trash', 'Grounds', 'Insurance', 'Management'],
    parking: 'Secured garage parking with on-site storage', pets: 'Negotiable',
    amenities: ['Fitness center', 'Media room', 'Meeting room', 'Central courtyard', 'Storage'],
    unitMix: '1BR to 3BR flats, lofts, and townhomes', priceRange: '$495K–$1M',
    transit: "Near Trader Joe's and IKEA. Emery Go-Round to BART, quick Bay Bridge access.",
    blurb: 'A 2008 mid-rise of 79 units near 46th Street, blending flats, soft lofts, and townhomes with vaulted ceilings and bay windows. A full amenity set including a fitness center and media room.',
    augusteSold: 0, featured: false, verified: false
  },
  {
    slug: 'bay-street-one', name: 'Bay Street One', aka: ['Homes above the shops'], city: 'Emeryville',
    neighborhood: 'Bay Street', type: 'townhome',
    yearBuilt: 2006, stories: 3, units: 95,
    hoa: { min: 391, max: 550 }, hoaIncludes: ['Water', 'Sewer', 'Trash', 'Grounds', 'Management', 'Security'],
    parking: 'Secured garage, roughly two tandem spaces per home', pets: 'Allowed, with restrictions',
    amenities: ['Secured entry', 'Elevators', 'Private balconies', 'Bay views'],
    unitMix: '1BR and 2BR townhome-style condos', priceRange: '$635K–$780K',
    transit: 'Atop the Bay Street shops. Walk Score near 90, Emery Go-Round to BART.',
    blurb: '95 townhome-style condos built in 2006 above the Bay Street retail district, the homes above the shops. Live/work-flavored units with secured garage parking and some bay and Golden Gate views, steps from dining and a movie theater.',
    augusteSold: 0, featured: false, verified: false
  },
  {
    slug: 'oliver-lofts', name: 'Oliver Lofts', aka: ['1200 65th Street', 'Oliver Rubber Lofts'], city: 'Emeryville',
    neighborhood: 'Park Avenue District', type: 'loft',
    yearBuilt: 2002, stories: 2, units: 50,
    hoa: { min: 771, max: 1000 }, hoaIncludes: ['Water', 'Sewer', 'Trash', 'Grounds', 'Insurance', 'Security'],
    parking: 'Secured gated garage', pets: 'Allowed, with restrictions',
    amenities: ['Roof deck', 'Central courtyard', 'Original freight elevator', 'Community room', 'Gated security'],
    unitMix: '1BR and 2BR live/work lofts', priceRange: '$485K–$800K',
    transit: 'Park Avenue District. Ashby BART about five minutes away, Emery Go-Round to MacArthur.',
    blurb: "Built in 2002 from the former 80,000-square-foot Oliver Rubber factory, a two-story, 50-unit conversion around a dramatic courtyard with a spiral stair and the building's original freight elevator. Soaring ceilings and a shared roof deck.",
    augusteSold: 0, featured: false, verified: false
  },
  {
    slug: 'besler-building-lofts', name: 'Besler Building Lofts', aka: ['The Besler Building', '4053 Harlan'], city: 'Emeryville',
    neighborhood: 'Park Avenue District', type: 'loft',
    yearBuilt: 1917, stories: 3, units: 51,
    hoa: { min: 269, max: 715 }, hoaIncludes: ['Water', 'Sewer', 'Trash', 'Insurance', 'Grounds', 'Management', 'Parking'],
    parking: 'One dedicated off-street space per unit', pets: 'Generally pet friendly',
    amenities: ['Vintage freight elevator', 'Secured entry', 'Steel-frame windows', 'Air conditioning', 'Fiber internet'],
    unitMix: '1BR and 2BR live/work lofts', priceRange: '$499K–$725K',
    transit: 'Park Avenue District, about ten minutes to MacArthur BART. Emery Go-Round nearby.',
    blurb: 'A 1917 industrial loft conversion of 51 live/work units in the Park Avenue District, once an early steam-engine plant. Cathedral ceilings, floor-to-ceiling Bauhaus-style steel windows, exposed brick and beams, and a vintage freight elevator. Walkable to Pixar and Bay Street.',
    augusteSold: 0, featured: false, verified: false
  },
  {
    slug: 'liquid-sugar-lofts', name: 'Liquid Sugar Lofts', aka: ['Liquid Sugar'], city: 'Emeryville',
    neighborhood: 'Doyle / Greenway', type: 'loft',
    yearBuilt: 2003, stories: null, units: 55,
    hoa: { min: 360, max: null }, hoaIncludes: ['Trash', 'Grounds', 'Management', 'Reserves'],
    parking: 'Two-car attached or tandem garage. EV charging available.', pets: 'Allowed, with restrictions',
    amenities: ['Gated entry', 'Shared courtyard', 'Private balconies', 'EV charging'],
    unitMix: 'Townhome-style live/work units and 1BR to 2BR lofts', priceRange: '$390K–$960K',
    transit: 'Near the Emeryville Greenway. Emery Go-Round a block away, walk to the Public Market and Berkeley Bowl West.',
    blurb: 'A 2003 development of about 55 units across six buildings on a former sugar-processing site, by Kava Massih Architects. Tall ceilings, big windows, and townhome-style live/work units with small street-facing workspaces, opening onto the Greenway.',
    augusteSold: 0, featured: false, verified: false
  },
  {
    slug: 'greencity-lofts', name: 'GreenCity Lofts', aka: ['1007 41st Street'], city: 'Emeryville',
    neighborhood: 'Longfellow edge', type: 'loft',
    yearBuilt: 2005, stories: 5, units: 62,
    hoa: { min: 941, max: null }, hoaIncludes: ['Water', 'Sewer', 'Trash', 'Hot water', 'Grounds', 'Insurance', 'Management', 'Security'],
    parking: 'One deeded space, secured, with EV charging and guest parking', pets: 'Up to two pets, restrictions apply',
    amenities: ['Central courtyard', 'Elevator', 'Bike storage', 'Package lockers', 'EV charging'],
    unitMix: 'Studios to 3BR', priceRange: '$440K–$765K',
    transit: "About fifteen minutes' walk to MacArthur BART, several AC Transit lines nearby.",
    blurb: 'A pioneering green loft building from 2005 by Swatt + Partners, built on LEED principles at the Emeryville-Oakland line. Radiant floor heating, Energy Star appliances, and no-VOC finishes, in loft-style flats with strong natural light.',
    augusteSold: 0, featured: false, verified: false
  },
  {
    slug: 'adeline-place', name: 'Adeline Place', aka: ['3801 San Pablo'], city: 'Emeryville',
    neighborhood: 'San Pablo corridor', type: 'mid-rise',
    yearBuilt: 2009, stories: 4, units: 36,
    hoa: { min: 406, max: 406 }, hoaIncludes: ['Water', 'Trash', 'Grounds'],
    parking: 'One garage space per unit', pets: 'Allowed, with restrictions',
    amenities: ['Gated security', 'Spa', 'Exercise room'],
    unitMix: '1BR and 2BR', priceRange: '$380K–$515K',
    transit: 'San Pablo Avenue corridor, near the 40th Street shops and MacArthur BART.',
    blurb: 'A distinctive curved red mid-rise of 36 units from 2009 at San Pablo and Adeline, on the Emeryville-Oakland border. High ceilings, modern finishes, a gym, and a spa, at a relatively attainable price point.',
    augusteSold: 0, featured: false, verified: false
  },
  {
    slug: 'key-route-lofts', name: 'Key Route Lofts', aka: ['3960 Adeline Street'], city: 'Emeryville',
    neighborhood: 'Triangle / Adeline', type: 'loft',
    yearBuilt: 2003, stories: 3, units: 22,
    hoa: null, hoaIncludes: ['Grounds', 'Management'],
    parking: 'Deeded one-car garage per unit', pets: 'Allowed, with restrictions',
    amenities: ['Gated entry', 'Vaulted ceilings', 'Gas fireplaces'],
    unitMix: '1BR and 2BR lofts', priceRange: '$459K–$649K',
    transit: 'Adeline Street corridor. AC Transit and Emery Go-Round nearby, easy freeway access.',
    blurb: 'An intimate 22-unit loft building from 2003 with eighteen-foot vaulted ceilings, walls of windows, gas fireplaces, and open plans. Named for the historic Key System rail line at the edge of the Triangle neighborhood.',
    augusteSold: 0, featured: false, verified: false
  },
  {
    slug: 'horton-street-lofts', name: 'Horton Street Lofts', aka: ['4300 Horton Street'], city: 'Emeryville',
    neighborhood: 'Horton / Doyle', type: 'loft',
    yearBuilt: 1917, stories: null, units: 15,
    hoa: { min: 500, max: null }, hoaIncludes: ['Water', 'Trash'],
    parking: 'Deeded garage parking', pets: 'Allowed, with restrictions',
    amenities: ['Secured entry', 'Skylights', 'Exposed timber'],
    unitMix: '1BR and 2BR live/work lofts', priceRange: '$850K–$950K',
    transit: 'On the Horton Street bike boulevard. Emery Go-Round to BART, about fifteen minutes to MacArthur.',
    blurb: "Said to be Emeryville's first commercially zoned live/work conversion, reworked in 1993 from a 1917 brick-and-timber warehouse. Just 15 units with roughly nineteen-foot ceilings, warehouse windows, and exposed timber. Among the most authentic industrial loft character in the city.",
    augusteSold: 0, featured: false, verified: false
  },
  {
    slug: 'elevation-22', name: 'Elevation 22', aka: ['1300 Powell Street'], city: 'Emeryville',
    neighborhood: 'Powell District', type: 'townhome',
    yearBuilt: 2004, stories: null, units: 71,
    hoa: null, hoaIncludes: ['Grounds', 'Management'],
    parking: 'Attached garage parking', pets: 'Allowed, with restrictions',
    amenities: ['Private entries', 'Roof terraces on some homes'],
    unitMix: 'Loft-style flats and townhomes', priceRange: null,
    transit: 'Off Powell Street near Bay Street retail. Emery Go-Round to BART, quick I-80 access.',
    blurb: 'A development of about 71 homes near Powell Street, mixing 15 loft-style condos with 56 townhomes, finished around 2004. Townhome living close to Bay Street and the freeway.',
    augusteSold: 0, featured: false, verified: false
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
