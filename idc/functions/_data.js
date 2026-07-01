// All IDC-specific content + brand config. This is the only file you rewrite to
// change copy. Layout/markup lives in index.js + careers/[role].js + _lib.js.
//
// SPEC NOTE (read before this ships to IDC):
//   • This is a recruiting-site spec for a warm pitch — it does NOT touch IDC's
//     live marketing site. It demonstrates the one thing their current site
//     doesn't do: turn a licensed engineer into an applicant.
//   • Facts below are VERIFIED from idcengineers.com (founding, leadership,
//     100+ bridges, DBE/SBE/UDBE/WBE certs, phone, address). Anything marked
//     `// ILLUSTRATIVE` is a placeholder IDC would swap for real data:
//       - the four ROLES (real openings + comp ranges come from IDC)
//       - salary ranges in each role (drive Google-for-Jobs eligibility)
//   • The $10B+ delivered figure comes from the client brief, not their site —
//     confirm before publishing.

const YEAR = new Date().getUTCFullYear();

export const BRAND = {
  name: 'Careers at IDC Consulting Engineers',
  legalName: 'IDC Consulting Engineers, Inc.',
  // The pitch in one line — aimed at the engineer, not the agency client.
  tagline: 'Design the bridges, interchanges, and rail that outlive everyone who built them. Join the firm behind 100+ California structures.',
  siteUrl: 'https://careers.idcengineers.com',
  // Brand mark: the real IDC logo (iDC monogram with the red dot on the "i" +
  // "Innovative Design Company"), white version — works on the dark nav/footer.
  brandHtml: '<img class="brand-logo" src="/assets/img/logo-white.webp" alt="IDC Consulting Engineers" width="1487" height="510">',

  phone: '(714) 520-9070',
  phoneHref: '+17145209070',
  email: 'careers@idcengineers.com',

  // Highlighted nav CTA → the careers page (the one thing the real site lacks: a
  // real hiring funnel — this is our elevation, so it gets the highlight).
  navStock: { label: 'Careers', href: '/careers' },
  // Bold variant nav (the single-page careers funnel at /?v=bold — anchor links).
  nav: [
    { label: 'The work', href: '/?v=bold#work' },
    { label: 'Why IDC', href: '/?v=bold#why' },
    { label: 'Growth', href: '/?v=bold#growth' },
    { label: 'Life here', href: '/?v=bold#life' },
    { label: 'Open roles', href: '/?v=bold#roles' }
  ],
  // Basic variant nav — real multi-page routes, mirroring idcengineers.com.
  navHome: [
    { label: 'Home', href: '/' },
    { label: 'Our Services', href: '/our-services' },
    { label: 'Our Projects', href: '/our-projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' }
  ],

  footerBlurb: 'A transportation engineering firm in Irvine, California. Since 1995, designing the structures that move the state — bridges, interchanges, rail, and transit.',
  footerCols: [
    { title: 'Careers', links: [
      { label: 'Open roles', href: '/careers#roles' },
      { label: 'Why IDC', href: '/careers#why' },
      { label: 'Apply', href: '/careers#apply' },
      { label: 'The one-page pitch', href: '/?v=bold' }
    ]},
    { title: 'Company', links: [
      { label: 'Our services', href: '/our-services' },
      { label: 'Our projects', href: '/our-projects' },
      { label: 'About IDC', href: '/about' },
      { label: 'Contact', href: '/contact' }
    ]},
    { title: 'Apply', links: [
      { label: 'careers@idcengineers.com', href: 'mailto:careers@idcengineers.com' },
      { label: 'Call (714) 520-9070', href: 'tel:+17145209070' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/idc-consulting-engineers' }
    ]}
  ],

  year: YEAR,
  // VERIFIED on IDC's own About page. WBE = woman-owned.
  certifications: ['DBE', 'SBE', 'UDBE', 'WBE'],
  // EEO line shown in the footer — standard, expected on any careers site.
  eeo: 'IDC Consulting Engineers is an Equal Opportunity Employer. All qualified applicants receive consideration without regard to race, color, religion, sex, national origin, disability, protected-veteran status, or any other protected characteristic.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '5 Corporate Park, Suite 200',
    addressLocality: 'Irvine',
    addressRegion: 'CA',
    postalCode: '92606',
    addressCountry: 'US'
  }
};

// ── BASIC VARIANT (/) — faithful clone of idcengineers.com's homepage ────────
// Copy below is taken verbatim from IDC's live site so the safe lead reads as
// "your brand, rebuilt." The bold variant (?v=bold) ignores all of this and uses
// the recruiting funnel data further down (STATS/PILLARS/GROWTH/LIFE/PROJECTS).

export const HOME = {
  heroEyebrow: 'Transportation Engineering · Since 1995',
  // Their headline: "Designing the FUTURE Building TRUST" (keywords emphasized).
  // Trusted HTML — rendered unescaped in index.js.
  heroTitleHtml: 'Designing the <em>future</em>,<br>building <em>trust</em>.',
  heroLede: 'Founded in 1995, IDC is a nationally recognized transportation engineering firm specializing in structural and civil design, as well as project management and construction management services for complex multi-modal infrastructure projects, with a proven track record in delivering exceptional engineering solutions for highways, transit, bridges, and more.',

  teamTitle: 'A team built for complex work.',
  teamBody: 'At IDC, our strength lies in our talented and diverse team of professionals who bring a wealth of knowledge and creativity to every project. This rich mix of backgrounds and expertise allows us to tackle even the most complex challenges in engineering intricate structures and overseeing the full spectrum of transportation project management. Nationally recognized for our excellence, IDC has earned numerous awards for our comprehensive engineering design and project and construction management services.',

  projectsIntro: 'Our expertise encompasses the design, management, and execution of complex multi-modal facilities including highways, bridges, transit systems, and urban mass transit developments. Check out some of our featured projects and exciting developments.',

  contactTitle: "Let's work together.",
  contactBody: "Ready to learn more about IDC? Let's work together to transform your vision into reality."
};

// OUR MARKETS — five categories from their homepage. `icon` keys map to inline
// SVGs in index.js (marketIcon). `key` is the stable filter id shared with the
// projects directory: the markets cards link to /our-projects?market=<key>, and
// each project below is tagged with the market keys it belongs to.
export const MARKETS = [
  { key: 'highways', name: 'Highways & Roads', icon: 'road' },
  { key: 'bridges', name: 'Bridges', icon: 'bridge' },
  { key: 'rail', name: 'Rail Infrastructure', icon: 'rail' },
  { key: 'transit', name: 'Transit & Urban Mass Transit', icon: 'transit' },
  { key: 'ports', name: 'Ports & Waterway Structures', icon: 'port' }
];

// OUR SERVICES — three categories, descriptions verbatim from idcengineers.com.
export const SERVICES = [
  {
    title: 'Structural Engineering',
    body: 'Highway and railroad bridge engineering, including interchanges, viaducts, river crossings, and pedestrian bridges.'
  },
  {
    title: 'Civil Engineering',
    body: 'Civil engineering for local agencies and global engineering firms, spanning various project phases, including PA/ED, PS&E, and Construction.'
  },
  {
    title: 'PM/CM Services',
    body: 'Project/program and construction management services for local agencies, focusing on transportation projects across California, covering all phases, including PA/ED, PS&E, and Construction.'
  }
];

// OUR PROJECTS — the full project list from idcengineers.com/projects-main1, in
// their order, with verbatim names and their own one-line descriptions. Each `img`
// is the firm's own photo, pulled from their site into /assets/img. `markets` tags
// each project with the MARKETS key(s) it belongs to, driving the filterable
// directory (/our-projects) and the "Our markets" deep links. The homepage shows
// the first six as "featured"; the directory shows them all.
export const HOME_PROJECTS = [
  { slug: 'california-high-speed-rail-cp-2-3', name: 'California High-Speed Rail — Construction Packages 2-3', kind: 'Rail · PM/CM', markets: ['rail'], img: 'cahsr-train',
    desc: 'Independent verification, validation, and PM/CM services for CHSR CP 2-3.' },
  { slug: 'california-high-speed-rail-db-2-3', name: 'California High-Speed Rail, Design-Build Packages 2-3', kind: 'Rail · Structural', markets: ['rail'], img: 'cahsr-kings-tulare',
    desc: 'Cost-effective structural design support for CHSR DB 2-3.' },
  { slug: 'la-metro-link-union-station', name: 'LA Metro Link Union Station', kind: 'Transit', markets: ['transit'], img: 'linkus',
    desc: 'Structural design and coordination for the Los Angeles Union Station transformation.' },
  { slug: 'la-metro-sepulveda-transit-corridor', name: 'LA Metro Sepulveda Transit Corridor Project (STC)', kind: 'Transit', markets: ['transit'], img: 'stc-sepulveda',
    desc: 'Structural design and project coordination for the Sepulveda Transit Corridor.' },
  { slug: 'north-spring-street-viaduct', name: 'North Spring Street Viaduct Over Los Angeles River & Metrolink Tracks', kind: 'Bridge', markets: ['bridges'], img: 'nspring-viaduct',
    desc: 'Widening and seismic upgrade of the historic arch bridge over the Los Angeles River.' },
  { slug: 'higuera-bridge-ballona-creek', name: 'Higuera Bridge Over Ballona Creek Replacement', kind: 'Bridge', markets: ['bridges'], img: 'higuera-bridge',
    desc: 'Bridge replacement and multimodal upgrades for the Higuera Street Bridge.' },
  { slug: 'orange-street-bridge-plunge-creek', name: 'Orange Street Bridge Over Plunge Creek', kind: 'Bridge', markets: ['bridges'], img: 'orange-street',
    desc: 'Replacing a two-lane bridge with a new four-lane multimodal bridge in Highland, CA.' },
  { slug: 'glendale-hyperion-bridge-complex', name: 'Glendale Boulevard-Hyperion Avenue Complex of Bridges', kind: 'Bridge complex', markets: ['bridges'], img: 'glendale-hyperion',
    desc: 'Rehabilitation of the Glendale-Hyperion bridge complex over I-5, the LA River, and the river bikeway.' },
  { slug: 'pennsylvania-avenue-grade-separation', name: 'Pennsylvania Avenue Grade Separation', kind: 'Grade separation', markets: ['highways', 'rail'], img: 'penn-grade-sep',
    desc: 'Lowering Pennsylvania Avenue under the UPRR tracks for safer, smoother mobility.' },
  { slug: 'south-fontana-ada-ramps', name: 'South Fontana ADA Ramps Improvement Project', kind: 'Highways & Roads', markets: ['highways'], img: 'fontana-aerial',
    desc: 'ADA-compliant ramp and sidewalk improvements across South Fontana.' },
  { slug: 'la-cadena-drive-bridge', name: 'La Cadena Drive Bridge Replacement Over Santa Ana River', kind: 'Bridge', markets: ['bridges'], img: 'la-cadena',
    desc: 'Replacing the La Cadena Drive bridge over the Santa Ana River with a new six-lane crossing in Colton, CA.' },
  { slug: 'caltrans-district-7-pm', name: 'Caltrans District 7 Program / Project Management Services', kind: 'Program / PM', markets: ['highways'], img: 'caltrans-d7',
    desc: 'Program and project management services for Caltrans District 7 across Los Angeles and Ventura Counties.' },
  { slug: 'polb-pier-g-terminal', name: 'POLB Pier G Berths G230-G236 Terminal Development', kind: 'Ports & Waterways', markets: ['ports'], img: 'polb-pierg',
    desc: 'Redevelopment of Pier G, including wharves, terminal buildings, and environmental upgrades at the Port of Long Beach.' },
  { slug: 'durfee-avenue-grade-separation', name: 'Durfee Avenue Grade Separation Project', kind: 'Grade separation', markets: ['highways', 'rail'], img: 'durfee-grade-sep',
    desc: 'A grade-separated roadway underpass and new railroad bridge on Durfee Avenue in Pico Rivera, CA.' },
  { slug: 'rosecrans-avenue-bridge', name: 'Rosecrans Avenue Over Los Angeles River Bridge Rehabilitation', kind: 'Bridge', markets: ['bridges'], img: 'rosecrans-bridge',
    desc: 'Rehabilitation, widening, and seismic retrofit of the Rosecrans Avenue bridge in Paramount, CA.' },
  { slug: 'sf-oakland-bay-bridge', name: 'San Francisco Oakland Bay Bridge', kind: 'Bridge', markets: ['bridges'], img: 'sfoak-bridge',
    desc: 'Complete rebuild of the east span of the San Francisco Oakland Bay Bridge.' }
];

// Per-page hero-lite copy for the multi-page clone. Each subpage gets a short
// banner over one of the firm's photos (mirrors idcengineers.com's section heads).
export const PAGES = {
  services: {
    eyebrow: 'What we do',
    title: 'Engineering the structures that move California.',
    lede: 'Structural and civil design plus full project and construction management — one firm across every phase, from PA/ED through construction.',
    img: 'i405-sp'
  },
  projects: {
    eyebrow: 'Our work',
    title: 'Our projects.',
    lede: 'Highways, bridges, transit, rail, and ports across California. Filter by market to see the multimodal infrastructure IDC has designed and delivered.',
    img: 'projects-hero'
  },
  about: {
    eyebrow: 'About IDC',
    title: 'A team built for complex work.',
    lede: 'Founded in 1995 in Irvine, California — a nationally recognized, woman-owned transportation engineering firm.',
    img: 'office-lobby'
  },
  contact: {
    eyebrow: 'Get in touch',
    title: "Let's work together.",
    lede: 'Tell us about your project or your interest in joining the team.',
    img: 'sfoak-bridge'
  },
  careers: {
    eyebrow: 'Careers · IDC Consulting Engineers',
    title: 'Design the structures that outlive everyone who built them.',
    lede: 'Since 1995, IDC has delivered 100+ California structures. We hire engineers to grow them toward their PE and SE — on landmark work, close to the people who set the standard.',
    img: 'cahsr-train'
  }
};

// Headline proof — the numbers an engineer weighs before they trust a firm with
// their next decade. Sourced from idcengineers.com (and the client brief for $10B+).
export const STATS = [
  { figure: '1995', label: 'Designing California structures since' },
  { figure: '100+', label: 'Bridge projects delivered' },
  { figure: '$10B+', label: 'Multimodal infrastructure built' },
  { figure: 'DBE · WBE', label: 'Certified' }
];

// The four reasons a licensed engineer chooses IDC over a giant. Each leads with
// the candidate's real question, not a slogan.
export const PILLARS = [
  {
    tag: 'The work',
    title: 'Your name on landmark structures.',
    body: 'Not a cog on a mega-firm bench. At IDC you carry real packages on California High-Speed Rail, the LA Metro Sepulveda corridor, and bridges that will stand for a century. The kind of portfolio that follows you for the rest of your career.'
  },
  {
    tag: 'The mentorship',
    title: 'Learn from the people who set the standard.',
    body: 'You’d work alongside a VP who runs bridge programs up to $1.3B and a CEO who spent decades inside Caltrans. Ninety-plus years of combined bridge-design experience, close enough to actually learn from — not three reporting layers away.'
  },
  {
    tag: 'The path',
    title: 'A real road to your PE and SE.',
    body: 'We hire engineers to grow them. Structured mentorship toward your PE and SE, exposure across PA/ED, PS&E, and construction so you see a project end to end, and the review hours that licensure actually requires.'
  },
  {
    tag: 'The footing',
    title: 'Thirty years of stability, not a startup gamble.',
    body: 'IDC has delivered since 1995 across booms and busts, with a backlog of agency work that doesn’t dry up. A small firm’s closeness with an established firm’s pipeline.'
  }
];

// Marquee projects, framed as "what you’d actually touch" — verified from IDC’s
// project list. This is the recruiting hook their marketing site never frames
// for a candidate.
export const PROJECTS = [
  {
    name: 'California High-Speed Rail',
    kind: 'Rail · Multiple packages',
    blurb: 'The largest infrastructure program in the country. IDC engineers carry structural design packages on the spine of the state’s rail future.'
  },
  {
    name: 'LA Metro Sepulveda Transit Corridor',
    kind: 'Transit · Los Angeles',
    blurb: 'One of LA Metro’s most ambitious transit projects. The kind of work that defines a region for fifty years.'
  },
  {
    name: 'North Spring Street Viaduct',
    kind: 'Bridge · Los Angeles',
    blurb: 'A historic viaduct replacement over the LA River — seismic, structural, and architectural demands in one package.'
  },
  {
    name: 'LA Metro Link Union Station',
    kind: 'Transit · Los Angeles',
    blurb: 'Reworking the busiest rail hub in the West. Complex, constrained, and high-stakes structural engineering.'
  },
  {
    name: 'Glendale Blvd–Hyperion Ave Bridges',
    kind: 'Bridge complex · Los Angeles',
    blurb: 'A historic bridge complex modernized for today’s loads and seismic code while keeping its character.'
  },
  {
    name: 'Pennsylvania Avenue Grade Separation',
    kind: 'Grade separation · Rail',
    blurb: 'Untangling road from rail — the grade-separation work that quietly makes whole corridors safer and faster.'
  }
];

// How growth actually works here — the "will I get licensed and stuck, or
// licensed and promoted?" answer.
export const GROWTH = [
  { step: 'Design engineer', detail: 'You own calcs and plan sheets on real packages from week one, under engineers who review every line and explain the why.' },
  { step: 'Toward your PE', detail: 'Mentored qualifying experience across PA/ED, PS&E, and construction, plus the review hours licensure requires — tracked, not left to chance.' },
  { step: 'Project engineer', detail: 'Lead a package. Own the agency relationship. Sign your sheets. The step most engineers wait years at a big firm to reach.' },
  { step: 'Toward your SE & beyond', detail: 'Structural license, technical leadership, and a seat managing programs — the path our own VP and CEO walked.' }
];

// Day-to-day / location reality — the quieter factors that still decide an offer.
export const LIFE = [
  { title: 'Orange County base', body: 'Headquartered at 5 Corporate Park in Irvine — a real commute and a real life, not downtown gridlock. Hybrid flexibility for a job that needs focus time.' },
  { title: 'Close-knit by design', body: 'Small enough that the CEO knows your name and your work. Your ideas reach the people who decide, the same week you have them.' },
  { title: 'Work that matters', body: 'Every project is something your family will drive across. Public infrastructure is the rare engineering job you can point at.' },
  { title: 'Built to keep you', body: 'Competitive pay, full benefits, and a licensure investment that says the obvious part out loud: we hire engineers to keep them, not churn them.' }
];

// ── OPEN ROLES ──────────────────────────────────────────────────────────────
// ILLUSTRATIVE. Realistic California transportation-engineering roles so the
// spec feels alive — IDC swaps these for real openings. Each becomes a page at
// /careers/<slug> with JobPosting schema (Google for Jobs). Add a role here and
// a new page exists. No build step.
//
// baseSalary ranges are placeholders; they drive Google-for-Jobs richness, so
// IDC should set real numbers (California requires a pay range in job posts).
export const ROLES = [
  {
    slug: 'bridge-structural-engineer-pe',
    title: 'Bridge / Structural Engineer (PE)',
    discipline: 'Structural',
    type: 'Full-time',
    level: 'Mid – Senior',
    location: 'Irvine, CA (Hybrid)',
    license: 'CA PE required; SE a plus',
    salaryMin: 110000,
    salaryMax: 155000,
    summary: 'Design and deliver bridge and structural packages on landmark California transportation projects — from preliminary type selection through PS&E and construction support.',
    youWillTouch: ['California High-Speed Rail', 'LA Metro corridors', 'Highway & rail bridges'],
    responsibilities: [
      'Lead structural design of bridges, interchanges, and grade separations across PA/ED, PS&E, and construction phases.',
      'Produce and check structural calculations, plan sheets, and quantity estimates to Caltrans and local-agency standards.',
      'Perform seismic analysis and retrofit design for new and existing structures.',
      'Coordinate with civil, geotechnical, and agency reviewers to resolve design conflicts.',
      'Mentor junior engineers and review their calculations and drawings.'
    ],
    requirements: [
      'Bachelor’s in Civil/Structural Engineering (Master’s preferred).',
      'Active California PE license.',
      '5+ years of bridge or transportation structural design.',
      'Working command of Caltrans Bridge Design Specifications and AASHTO LRFD.',
      'Proficiency with CSiBridge, CT-Bridge, or similar structural software.'
    ],
    niceToHave: [
      'California SE license.',
      'Experience on Caltrans oversight or high-speed-rail packages.',
      'Seismic retrofit experience.'
    ]
  },
  {
    slug: 'civil-design-engineer',
    title: 'Civil Design Engineer',
    discipline: 'Civil',
    type: 'Full-time',
    level: 'Entry – Mid',
    location: 'Irvine, CA (Hybrid)',
    license: 'EIT required; PE track supported',
    salaryMin: 85000,
    salaryMax: 120000,
    summary: 'Develop roadway, drainage, and grading design for transportation projects across every delivery phase, with a structured path toward your PE.',
    youWillTouch: ['Highway & roadway design', 'Drainage & grading', 'Local-agency projects'],
    responsibilities: [
      'Prepare roadway geometry, grading, drainage, and utility-relocation design.',
      'Develop PS&E packages and quantity estimates to Caltrans and local-agency standards.',
      'Support PA/ED studies and alternatives analysis.',
      'Produce plan, profile, and detail sheets in Civil 3D / MicroStation.',
      'Coordinate with structural and agency teams through review cycles.'
    ],
    requirements: [
      'Bachelor’s in Civil Engineering.',
      'California EIT (PE candidates strongly encouraged).',
      '1–5 years of transportation or land-development civil design.',
      'Proficiency with AutoCAD Civil 3D and/or MicroStation/OpenRoads.'
    ],
    niceToHave: [
      'Caltrans project experience.',
      'Hydraulics / drainage design background.',
      'Progress toward the California PE exam.'
    ]
  },
  {
    slug: 'construction-manager-resident-engineer',
    title: 'Construction Manager / Resident Engineer',
    discipline: 'PM/CM',
    type: 'Full-time',
    level: 'Senior',
    location: 'Southern California (Field + Irvine)',
    license: 'CA PE preferred',
    salaryMin: 120000,
    salaryMax: 170000,
    summary: 'Take IDC’s designs into the field — manage construction of transportation structures as Resident Engineer, owning quality, schedule, and the agency relationship on site.',
    youWillTouch: ['Bridge & highway construction', 'Caltrans CM oversight', 'Field engineering'],
    responsibilities: [
      'Serve as Resident Engineer or Construction Manager on transportation construction contracts.',
      'Review submittals, RFIs, and change orders; track schedule and budget.',
      'Oversee inspection, materials testing coordination, and quality assurance.',
      'Maintain the agency relationship and contract documentation per Caltrans CM standards.',
      'Resolve field design issues with the structural and civil design teams.'
    ],
    requirements: [
      'Bachelor’s in Civil Engineering or Construction Management.',
      '8+ years of transportation construction management.',
      'Familiarity with Caltrans Construction Manual and local-agency procedures.',
      'Strong documentation, scheduling, and stakeholder-communication skills.'
    ],
    niceToHave: [
      'California PE license.',
      'Resident Engineer experience on Caltrans-funded projects.',
      'Certified DBE/SBE program familiarity.'
    ]
  },
  {
    slug: 'structural-cad-designer',
    title: 'Structural CAD Designer / Drafter',
    discipline: 'Structural',
    type: 'Full-time',
    level: 'Entry – Mid',
    location: 'Irvine, CA (Hybrid)',
    license: 'Not required',
    salaryMin: 70000,
    salaryMax: 100000,
    summary: 'Turn engineering design into precise, agency-ready bridge plan sheets — the drafting backbone behind every IDC structure.',
    youWillTouch: ['Bridge plan production', 'Caltrans plan standards', 'Detailing'],
    responsibilities: [
      'Produce structural plan, elevation, and detail sheets for bridges and transportation structures.',
      'Work from engineer markups to Caltrans and local-agency CAD standards.',
      'Maintain drawing sets, references, and sheet indexes through review cycles.',
      'Coordinate detailing with the structural engineering team.'
    ],
    requirements: [
      'Associate’s/technical degree or equivalent CAD experience.',
      '2+ years of structural or civil drafting (bridge a plus).',
      'Strong MicroStation and/or AutoCAD skills.',
      'Eye for detail and plan-set consistency.'
    ],
    niceToHave: [
      'Caltrans plan-standard experience.',
      'OpenBridge / OpenRoads familiarity.',
      'BIM / 3D detailing exposure.'
    ]
  }
];
// PROJECT DETAILS — drawn directly from each project page on idcengineers.com/projects-main1.
// Keyed by the slug on each HOME_PROJECTS entry. owner/location/date/cost are the
// fact panel; overview + summary are the prose body. No em-dashes (client preference).
export const PROJECT_DETAILS = {
  "california-high-speed-rail-cp-2-3": {
    owner: "California High-Speed Rail Authority",
    location: "Fresno, Tulare, and Kings Counties, California",
    date: "2020 - Ongoing",
    cost: "TBD",
    overview: "The California High-Speed Rail project aims to connect the state's mega-regions, fostering economic development, creating jobs, preserving protected lands, and contributing to a cleaner environment. The Construction Package 2-3 (CP 2-3) is a critical segment of the high-speed rail program, encompassing a 65-mile stretch from East American Avenue in Fresno to one mile north of the Tulare-Kern County line. The CP 2-3 scope includes constructing approximately 36 grade separations, such as viaducts, underpasses, and overpasses.",
    summary: ["As the Independent Checking Engineer (ICE) sub-consultant to Arcadis, IDC ensures compliance with technical and contract requirements, including cost management, for CP 2-3. IDC conducts independent verification and validation (IV&V) of design and construction submittals, ensuring adherence to the Design-Build Contract requirements. IDC's team of professionals, familiar with construction work and scheduling, employs advanced tools and efficient processes to deliver high-quality, timely, and budget-conscious results."]
  },
  "california-high-speed-rail-db-2-3": {
    owner: "California High-Speed Rail Authority (CHSRA)",
    location: "Central Valley, California",
    date: "2015 - 2018",
    cost: "$1.9 billion",
    overview: "The Construction Package 2-3 (CP 2-3) is a significant continuation of the California High-Speed Rail system, extending over 60 miles from Fresno to just north of the Tulare-Kern County line. This segment includes approximately 36 grade separations, such as viaducts, underpasses, and overpasses, as part of the Fresno-to-Bakersfield project section.",
    summary: ["IDC, as a sub-consultant to Jacobs, supported structural design work for CP 2-3, including structure type selection, preliminary design, independent checks, and preparation of final PS&E for various structures. IDC's collaboration with Jacobs focused on creating cost-effective and easily constructible structure designs, contributing to efficient project delivery within the design-build framework."]
  },
  "la-metro-link-union-station": {
    owner: "Los Angeles County Metropolitan Transportation Authority (LA Metro)",
    location: "Los Angeles, California",
    date: "2018 - Ongoing",
    cost: "$1.9 billion",
    overview: "The Link Union Station (Link US) project aims to transform Los Angeles Union Station from a stub-end station into a run-through station by extending tracks over the US-101 freeway. This design-build project includes several major improvements, such as new run-through tracks, reconfiguration of station entry tracks and rail yard, construction of a passenger concourse with retail and amenities, a new loop track for operational flexibility, and accommodation for future transportation options, including California High-Speed Rail.",
    summary: ["The project involves collaboration among multiple agencies, including LA Metro, the Federal Railroad Administration (FRA), California High-Speed Rail Authority (CHSRA), Metrolink, Amtrak, and Caltrans, to ensure successful implementation."]
  },
  "la-metro-sepulveda-transit-corridor": {
    owner: "Los Angeles County Metropolitan Transportation Authority (Metro)",
    location: "Los Angeles, California",
    date: "May 2022 - Ongoing",
    cost: "TBD",
    overview: "The Sepulveda Transit Corridor Project aims to establish a fixed-guideway transit service connecting the San Fernando Valley and Los Angeles International Airport through Los Angeles' congested I-405 corridor. Serving over 400,000 daily travelers, the project seeks to address severe congestion and limited public transport options across the Santa Monica Mountains.",
    summary: ["As a sub-consultant to HDR, IDC supports the project with structural engineering and design services, including preparing the Basis of Design documents, design criteria, and standards. IDC provides structural conceptual designs and submits written monthly status reports, ensuring compliance with the PSA and maintaining clear communication about task progress and potential issues."]
  },
  "north-spring-street-viaduct": {
    owner: "City of Los Angeles",
    location: "Los Angeles, CA",
    date: "2010-2018",
    cost: "$50 million / $500,000",
    overview: "Structural bridge design; preliminary, PA/ED, and final PS&E; Bridge widening and rehabilitation; Caltrans project management and coordination; Caltrans Project Development Process; Design check; Permitting; Local agency coordination; Construction staging and support; Railroad coordination; Seismic analysis; HBP project",
    summary: ["As a sub-consultant to Psomas, IDC provided preliminary and final design services, and construction design support for the widening and seismic upgrade of the historical arch bridge over the Los Angeles River. The City of Los Angeles aimed to widen and rehabilitate the bridge to meet future traffic demand, improve pedestrian and cyclist safety, and maintain its historic integrity.", "IDC's responsibilities included developing a 3-D computer model of the original and proposed structures to study structural behavior, devising a precast pier system to accommodate limited construction windows, and ensuring historic preservation in the structural design. The project widened the viaduct by approximately 25 feet on the south side, reconfigured adjacent roadways, and corrected seismic vulnerabilities.", "IDC's innovative design solutions saved over $1 million and shortened the construction period, reducing commuter impact. The final design featured a modern-looking deck arch on the south side, preserving the historic appearance on the north side. IDC also worked with the State Historic Preservation Office to restore original architectural details and presented design plans to stakeholders, including at City Council meetings."]
  },
  "higuera-bridge-ballona-creek": {
    owner: "City of Culver City",
    location: "Culver City, California",
    date: "2013 - 2023",
    cost: "$9 million",
    overview: "The Higuera Street Bridge replacement project aimed to address seismic and geometric deficiencies, enhance safety, and improve connectivity for cyclists and pedestrians. Funded under the Federal Highway Bridge Program, the project involved replacing the obsolete 1938 bridge with a wider, safer, and modern single-span concrete box girder structure.",
    summary: ["IDC, as the Prime Consultant, led PS&E design, project management, and Caltrans coordination, ensuring compliance with funding and permitting requirements. Key features of the project included new traffic lanes, protected bike lanes, widened sidewalks, a shaded overlook, and a ramp connection to the Ballona Creek Bike Path. Despite challenges such as weather delays, the new bridge was successfully completed in May 2023."]
  },
  "orange-street-bridge-plunge-creek": {
    owner: "City of Highland",
    location: "Highland, CA",
    date: "2017 - Present",
    cost: "$600,000",
    overview: "The Orange Street Bridge over Plunge Creek project involves the PA/ED and PS&E phasing, with IDC as the Prime Consultant responsible for comprehensive project management. The project includes the replacement of the existing two-lane bridge with a new four-lane bridge incorporating multimodal facilities. This project is part of the Federal Highway Bridge Program, focusing on bridge design, transportation funding, and coordination with various agencies.",
    summary: ["IDC is delivering full PA/ED and PS&E services, managing the project's overall funding strategy, and overseeing the Local Assistance Programming processes. Key staff include Wendy Li, P.E., as Project Manager, and Xiaoyun Wu, Ph.D., P.E., as Engineer of Record (Structures). The project's scope extends to bike path design, local and resource agency coordination, construction phasing, and utility and stakeholder coordination. IDC's work constitutes an estimated 65% of the total design cost, aligning with the city's vision of creating a cohesive highway connector with multimodal capacity."]
  },
  "glendale-hyperion-bridge-complex": {
    owner: "City of Los Angeles",
    location: "Los Angeles, CA",
    date: "Ongoing",
    cost: "TBD",
    overview: "This federally funded project involves the rehabilitation and enhancement of the Glendale Boulevard-Hyperion Avenue Complex of Bridges, which spans over the Los Angeles River and the I-5 freeway. The scope of work includes PS&E design, retrofit, and widening of the 13-span bridge facility, incorporating multimodal infrastructure improvements such as the Los Angeles River Bike Path. The project also entails seismic strengthening, restoration of historical barriers, and enhancements for pedestrian and bicycle safety.",
    summary: ["As a subconsultant, IDC is responsible for the PS&E design, focusing on the structural aspects of the bridge complex. IDC's Principal Engineer, Xiaoyun Wu, Ph.D., P.E., serves as the Engineer of Record (Structures), leading a team that includes key staff members Gary Wei and David Wang, P.E., S.E. The project involves complex geometric patterns and roadway alignments, necessitating expert handling of Caltrans processes and approvals. In addition to seismic analysis, the project includes coordination with Caltrans, local agencies, resource agencies, and various stakeholders. The project's goal is to rehabilitate the Hyperion Avenue Bridges and Glendale Boulevard Bridges, improve safety features, and enhance access to the Los Angeles River Bike Path."]
  },
  "pennsylvania-avenue-grade-separation": {
    owner: "City of Beaumont",
    location: "Beaumont, CA",
    date: "2018 - Ongoing",
    cost: "$30 million",
    overview: "This project involves constructing a grade separation to lower Pennsylvania Avenue under the existing Union Pacific Railroad (UPRR) mainline tracks adjacent to I-10. The project aims to enhance safety and operational mobility in the area.",
    summary: ["As the Prime Consultant, IDC is responsible for delivering PA/ED and PS&E services for the grade separation project. Key staff include Wendy Li, P.E., serving as the Project Manager, and Xiaoyun Wu, Ph.D., P.E., as the Engineer of Record. The project includes geometric approval, project mapping, and the preparation of preliminary plans at various stages (35%, 65%, and 100%) leading to the final package submittals. The contract size for this project is $1.5 million."]
  },
  "south-fontana-ada-ramps": {
    owner: "County of San Bernardino",
    location: "South Fontana, San Bernardino County, California",
    date: "December 2020 - Present",
    cost: "$250,000",
    overview: "The South Fontana ADA Ramps Improvement Project focuses on upgrading and installing 149 ADA-compliant curb ramps, along with associated sidewalk and drainage improvements, to enhance accessibility in the South Fontana area. The project includes updating existing infrastructure such as curbs, gutters, and sidewalks while addressing nearby damaged areas for safety and compliance.",
    summary: ["As the prime consultant, IDC leverages extensive ADA and street improvement experience to ensure the project is designed and executed efficiently, meeting accessibility and compliance standards, including the following services: Civil final design plans, specifications, and cost estimates; installation and upgrade of ADA curb ramps; curb, gutter, and sidewalk improvements; scope and estimates for additional drainage and structural repairs; and minimization of construction change orders and RFIs through precise design."]
  },
  "la-cadena-drive-bridge": {
    owner: "City of Colton",
    location: "Colton, CA",
    date: "2012 - Ongoing",
    cost: "$34 million",
    overview: "The La Cadena Drive Bridge Replacement project involves replacing the existing four-lane bridge over the Santa Ana River with a new six-lane bridge. The project includes comprehensive project management, coordination with Caltrans, and compliance with the Federal Highway Bridge Program.",
    summary: ["IDC, serving as a sub-consultant to Jacobs, is responsible for PA/ED, PS&E, and final design. The project features include a hydraulic-friendly and cost-effective bridge design, the replacement of the current structure with a four-span bridge, and the implementation of two-phase construction to maintain traffic flow. Wendy Li, P.E., acts as the Project Manager, while Xiaoyun Wu, Ph.D., P.E., serves as the Engineer of Record. IDC's role also includes assisting the City of Colton with programming change requests, scope confirmation, and overall funding strategy, as well as coordinating with local agencies and stakeholders."]
  },
  "caltrans-district-7-pm": {
    owner: "Caltrans District 7",
    location: "Los Angeles & Ventura Counties, CA",
    date: "2015 - 2018",
    cost: "Up to $2.4 million",
    overview: "The Caltrans District 7 Program/Project Management Services project involves providing comprehensive program management, PA&ED, PS&E, ROW, and construction phase services. This includes preparing Project Initiation Documents and supporting SHOPP projects, along with Caltrans program and project management.",
    summary: ["IDC provided professional and technical services on an \"as-needed\" basis to support Caltrans District 7 in the development and construction of proposed transportation facilities. Responsibilities included staff augmentation, developing work plans, project management plans, communication plans, risk management plans, and coordinating various project management activities. IDC's involvement was crucial in managing and executing task orders for specific project scopes, ensuring the successful delivery of Caltrans projects."]
  },
  "polb-pier-g-terminal": {
    owner: "Port of Long Beach",
    location: "Long Beach, CA",
    date: "2011",
    cost: "$950 million",
    overview: "The Pier G Berths G230-G236 Terminal Redevelopment project involves comprehensive marine terminal development, including preliminary design for wharfs, buildings, vaults, and other structures. The project is part of a multi-phase redevelopment program aimed at enhancing the terminal's infrastructure and operational capacity.",
    summary: ["IDC is a key member of the Program Management team, providing master planning, architectural and engineering design, and environmental services for Phases II, III, and IV of the project. The redevelopment includes significant elements such as a 30-acre landfill with an 800-foot long concrete, pile-supported wharf, a 3-acre landfill with a 600-foot long wharf extension, a temporary berth, container yard, terminal gate facilities, and new buildings for gate operations and truck driver check-in. Additional upgrades include rail yard renovations, redevelopment of a 300-acre backland, terminal electrification, and shore side power infrastructure for ships. The project also involves environmental remediation and compliance with the Port of Long Beach Green Port Policy and San Pedro Bay Clean Air Action Plan."]
  },
  "durfee-avenue-grade-separation": {
    owner: "City of Pico Rivera",
    location: "Pico Rivera, CA",
    date: "Ongoing",
    cost: "$91 million",
    overview: "The Durfee Avenue Grade Separation Project involves constructing a grade-separated roadway underpass beneath the Union Pacific Railroad tracks. The project aims to enhance safety and improve traffic flow by eliminating at-grade crossings and includes the construction of retaining walls and a new railroad bridge.",
    summary: ["IDC, as the lead for Structural Engineering and Design, is responsible for the PS&E and construction staging, working closely with Caltrans and various agencies for project management and coordination. Key staff include Xiaoyun Wu, Ph.D., P.E., and David Wang, Ph.D., P.E. The design features CIDH secant pile wall abutments to facilitate early bridge construction, allowing the steel superstructure to be erected at ground level, thus prioritizing railroad operations and reducing construction time and costs. The project also includes a precast concrete fascia girder designed to blend with the local aesthetic traditions."]
  },
  "rosecrans-avenue-bridge": {
    owner: "City of Paramount",
    location: "Paramount, CA",
    date: "September 30, 2019 - Present",
    cost: "TBD",
    overview: "The Rosecrans Avenue Over Los Angeles River Bridge Rehabilitation Project involves the rehabilitation, widening, and seismic retrofitting of the existing bridge to enhance safety and multimodal mobility, including the addition of a Class III bike path. The bridge, originally built in 1951 and modified several times since, currently carries three lanes of traffic in each direction with narrow lanes and sidewalks but no shoulders.",
    summary: ["IDC, as the prime consultant, is responsible for the PAED, PS&E, and funding support for the project. The design aims to align with the city's General Plan, promoting a balanced approach to vehicular, pedestrian, and bicycle traffic. The project team includes Wendy Li as Project Manager, along with Moffatt & Nichol, Epic, EMI, and Psomas as subconsultants."]
  },
  "sf-oakland-bay-bridge": {
    owner: "Caltrans",
    location: "San Francisco, CA",
    date: "2010 - 2012",
    cost: "$6.2 billion",
    overview: "Preliminary design, low profile street deck, structural design services, preliminary and final design, seismic retrofit, construction staging, project management, Caltrans and FHWA coordination",
    summary: ["Following the 7.1 magnitude Loma Prieta earthquake on October 17, 1989, which destroyed the 250-ton upper deck section of the San Francisco Bay Bridge, seismic experts recommended a complete rebuild of the east span. IDC engineers played a critical role as sub-consultants in the PS&E phase, providing essential design skills and bridge expertise. Their contributions were vital, leading to their invitation to join the construction team to bring the project to fruition."]
  },
};