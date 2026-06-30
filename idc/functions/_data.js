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
  // Wordmark: heavy tracked "IDC" + lighter "Engineers".
  brandHtml: '<span class="bw">IDC</span> <em>Engineers</em>',

  phone: '(714) 520-9070',
  phoneHref: '+17145209070',
  email: 'careers@idcengineers.com',

  // Highlighted nav CTA → the open-roles list.
  navStock: { label: 'Open roles', href: '/#roles' },
  nav: [
    { label: 'The work', href: '/#work' },
    { label: 'Why IDC', href: '/#why' },
    { label: 'Growth', href: '/#growth' },
    { label: 'Life here', href: '/#life' },
    { label: 'Open roles', href: '/#roles' }
  ],

  footerBlurb: 'A transportation engineering firm in Irvine, California. Since 1995, designing the structures that move the state — bridges, interchanges, rail, and transit.',
  footerCols: [
    { title: 'Careers', links: [
      { label: 'Open roles', href: '/#roles' },
      { label: 'The work', href: '/#work' },
      { label: 'Growth & licensure', href: '/#growth' },
      { label: 'Life at IDC', href: '/#life' }
    ]},
    { title: 'Company', links: [
      { label: 'idcengineers.com', href: 'https://www.idcengineers.com' },
      { label: 'Our projects', href: 'https://www.idcengineers.com/our-projects' },
      { label: 'Our services', href: 'https://www.idcengineers.com/our-services' }
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

// Headline proof — the numbers an engineer weighs before they trust a firm with
// their next decade. Sourced from idcengineers.com (and the client brief for $10B+).
export const STATS = [
  { figure: '1995', label: 'Designing California structures since' },
  { figure: '100+', label: 'Bridge projects delivered' },
  { figure: '$10B+', label: 'Multimodal infrastructure built' },
  { figure: 'DBE · WBE', label: 'Certified, woman-owned firm' }
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
