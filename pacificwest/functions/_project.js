// Client-facing project status, the deliverables we need from Pili, and the resources
// that actually help him move (C-8 study guides, GBP video shot-list, etc.).
// Shown on /dashboard (his private area) under the "Your project" and "Resources" tabs.
// Keep it plain, honest, and short — tell him where things stand and the few things
// that'd move it forward, without making any of it feel like homework.

// Shared Drive from discovery (where he drops photos / paperwork).
export const DRIVE_URL = 'https://drive.google.com/drive/folders/1Fxd_tG4uKKA2KuwIktSbHgFLEooeRH3X';

export const PROJECT_INTRO =
  "Pili here's where everything stands, plus the handful of things I'll need from you. " +
  "Nothing here is urgent. The Resources tab has everything you need for your license and Google. Send what's easy when it's easy, and I'll keep building around it.";

// state: 'done' | 'doing' | 'next' | 'later'
export const PROJECT_STATUS = [
  {
    state: 'doing',
    title: 'Building your website',
    detail: "Your site (services, your hillside project, how-it-works, FAQ and a free-estimate form) is taking shape on a private preview while I refine the copy and branding around what you sent over. Here's the plan, and it's a good one: we put it live months before your license, in a way that's fully legal. The public version shows off your work and answers the questions homeowners actually have, so Google starts finding and trusting you now. The one thing it won't do yet is pitch jobs for hire or take estimate requests, because that part the state holds for licensed contractors, and advertising work early can put the license itself at risk. The day your license lands we switch on the hire-me side and the estimate form. By then Google's known the site for months, so you launch with a real head start instead of from zero."
  },
  {
    state: 'done',
    title: 'Your lead inbox is ready',
    detail: "Every estimate request from the site lands right here under the Leads tab, and emails you too. Nothing slips through."
  },
  {
    state: 'doing',
    title: 'Getting you licensed (C-8)',
    detail: "The big one, and the thing that unlocks everything else. Your years on the job clear the experience requirement, so you're eligible to test. From there it's two real exams, and the Law & Business one especially takes genuine study time, think a few weeks of real hours, not a weekend. Here's the honest part: I'll build you a study guide and run everything around the exams, but the studying itself is yours. I can't sit the test for you. Put the hours in and you pass, and the rest of this unlocks behind it."
  },
  {
    state: 'next',
    title: 'Your Google Business Profile',
    detail: "Free, and exactly where Bay Area homeowners search. I build the whole profile; the one part that's yours is a short verification video from your phone (shot-list is in Resources). Best done once we've got your photos."
  },
  {
    state: 'next',
    title: 'Your first reviews',
    detail: "I'll give you a one-tap review link and a ready-to-send text. You send it to a few happy past customers, and coming from you it lands way better than from a stranger."
  },
  {
    state: 'later',
    title: 'Open for jobs',
    detail: "By now your site's already public and Google's been ranking it for months, it just isn't advertising work yet. The day your license lands we flip on the hire-me side and your estimate form, fire up your Google profile, and push local SEO hard so your own jobs start coming in. No cost to you until it's working."
  }
];

// The asks, grouped by how much they unblock. Each gets a localStorage "sent" toggle.
export const DELIVERABLE_GROUPS = [
  {
    tier: 'The two that unlock the most',
    note: "These are what make the site and your Google profile feel like yours.",
    items: [
      {
        id: 'photos',
        title: 'Your best 15–20 job photos',
        ask: "Before-and-afters especially: retaining walls, foundations, driveways, patios. Drop them in the shared folder.",
        why: "They fill your website gallery and your Google profile. Right now those spots use placeholders; your real work makes the whole thing land."
      },
      {
        id: 'business-name',
        title: 'A photo of your registration paperwork',
        ask: "I've got the basics you sent: Pacific West Concrete & Landscaping, sole proprietor. The only piece left is a quick photo of any registration doc (a DBA / fictitious-business-name filing), plus your final call: keep “& Landscaping” in the name, or lead with just Pacific West Concrete? You mentioned you're open either way.",
        why: "Your license, Google, website and reviews all need to point at one clean, matching name, and the paperwork makes Google verification go smoother."
      }
    ]
  },
  {
    tier: 'Quick calls, just need your answer',
    note: "No files for these, just a quick reply.",
    items: [
      {
        id: 'experience-signoff',
        title: 'Who can vouch for your experience',
        ask: "For the license you need someone who saw your work to certify ~4 years. It does NOT have to be your current GC. A foreman, a fellow journeyman, or another licensed contractor works.",
        why: "This was the thing you were worried about. It's not a dead end, we just pick whoever's easiest to ask."
      }
    ]
  },
  {
    tier: 'Whenever you get a chance',
    note: "Nice to have. None of these block anything.",
    items: [
      {
        id: 'logo',
        title: 'The original logo file (if you have it)',
        ask: "I pulled your leaf-and-P logo from your doc, and it's already on your site. If you've got the original file (a PNG or vector from whoever designed it), send it over so it stays crisp on signs, trucks and print too.",
        why: "The version from your doc looks great on screen. The source file just keeps it sharp everywhere else."
      },
      {
        id: 'review-customers',
        title: 'A few past customers to ask',
        ask: "Just confirm you've got a handful of happy customers you'd be comfortable texting for a quick review.",
        why: "Reviews are what a homeowner wants to see before handing you a $15k job. We make it one tap for them."
      }
    ]
  }
];

// Plain-language "why this license" so Pili understands the structural call, not just
// receives it. Sits above the steps in Resources. (C-8 fits his concrete work; C-12 is
// the future add for standalone earthwork.)
export const LICENSE_RATIONALE = {
  tier: 'Why C-8 (and what C-12 is for later)',
  paras: [
    "Quick on the why, since it's your license to carry. C-8 is the concrete classification, and concrete is the thread through everything you build: foundations, retaining walls, driveways, flatwork, patios. It's the one that matches your business head on.",
    "The excavation, grading and drainage that come with those jobs are covered too. The state counts that as part of the concrete work when it's needed to get the pour done, so a retaining wall with its drainage and the digging to set it is all fair game under C-8.",
    "The only thing C-8 leaves out is pure earthwork with no concrete, say grading a lot or trenching as its own job. If you ever want to bid that kind of work on its own, there's a second license for it, C-12 (Earthwork and Paving), that we can add down the road. It's an easy add once you're licensed and not worth the extra test right now, since it isn't your bread and butter. We start with the license that fits what you actually pour."
  ]
};

// The C-8 application, walked step by step. Shown as a numbered panel above the
// resource links (it's the "do this" path; the links below are reference material).
// Order and CSLB process verified June 2026: account → apply → CSLB accepts → schedule
// both exams with PSI → study → pass → bond/fee/Live Scan/workers' comp → license issues.
export const APPLICATION_STEPS = {
  tier: 'Your license, step by step',
  steps: [
    {
      title: 'Create your login and share it with me',
      detail: "Set up your account on CSLB's online portal. Couple of minutes, and it's what everything else runs on.",
      note: "Once it's made, share the login with me over the phone. We will work together to make sure your application goes through the first time.",
      href: 'https://cacslb.prod.simpligov.com/prod/auth/identity/user/register',
      cta: 'Create your account'
    },
    {
      title: 'Apply online (sole owner, C-8)',
      detail: "File the Original Application, choose the C-8 Concrete classification, and pay the $450 fee to start the clock. You'll also name someone who can vouch for your ~4 years (a foreman or another licensed contractor works). We fill this out together, line by line, so every field goes in right.",
      note: "The one thing that matters most on this whole list: get it right the first time. CSLB takes about four to six weeks just to read the application, and if anything's off or missing they mail it back and the clock starts over. A bounced application is where people quietly lose a month or two. That's the entire reason I want to do this part with you, line by line, so it goes in clean and we never have to touch it again.",
      href: 'https://www.cslb.ca.gov/contractors/applicants/Apply_for_a_Sole_Owner_License/default.aspx',
      cta: 'Start the application'
    },
    {
      title: 'Schedule your two exams',
      detail: "Assuming it went in clean, CSLB reviews everything in about four to six weeks, then mails you a notice to schedule. From there you book both tests (Law & Business, and the C-8 trade exam) with PSI, the testing company, at a center near you. We'll pick a date that leaves you plenty of study time. All in, plan on roughly four to seven months from filing to an active license, most of which is exam study and CSLB's own queue, not anything we're sitting on.",
      href: 'https://www.cslb.ca.gov/contractors/applicants/contractors_license/exam_application/Application_Accepted.aspx',
      cta: 'How scheduling works'
    },
    {
      title: 'Study (the part that takes real work)',
      detail: "Here's the honest version. The trade exam you'll handle, it's the concrete work you already do, but still run the outline and practice questions so nothing on test day surprises you. The Law & Business exam is the hard one, and experienced contractors fail it the first time all the time, not because they can't build, but because it's all contracts, employment law and the office side, none of it field work. Plan on a few weeks of real study for it. The way through is practice tests: take them until you're consistently around 75%, and that's our green light to lock the exam date. This is not one to wing."
    },
    {
      title: 'Pass, then make it official',
      detail: "Pass both exams and you're basically there (you get 18 months, and can retake after 21 days if a test doesn't go your way). Three quick things turn it into a real license: a $25,000 contractor bond (about $100 to $400 a year), the $200 license fee, and Live Scan fingerprinting. A C-8 also needs workers' comp even with a family crew, and I'll line that up with you too."
    }
  ]
};

// Resources tab — the genuinely useful stuff, grouped. Each item is a labelled link.
// (CSLB specifics verified in the discovery notes, June 2026.)
export const RESOURCE_GROUPS = [
  {
    tier: 'C-8 reference',
    items: [
      { title: 'What the C-8 license covers', desc: 'The official classification: forming, pouring and finishing concrete. This is the one we’re going for.', href: 'https://www.cslb.ca.gov/about_us/library/licensing_classifications/Licensing_Classifications_Detail.aspx?Class=C-8', cta: 'CSLB · C-8 classification' },
      { title: 'C-8 trade exam: official outline', desc: 'CSLB’s outline of the trade exam: the topics and how each is weighted. It tells you what to study, but it’s not a course and has no practice questions.', href: 'https://www.cslb.ca.gov/Resources/StudyGuides/C08StudyGuide.pdf', cta: 'CSLB · C-8 outline' },
      { title: 'Law & Business exam: official outline', desc: 'Same idea for the harder exam: the topics and their weighting. Treat it as your map, then drill practice tests on top of it.', href: 'https://www.cslb.ca.gov/Resources/StudyGuides/LawStudyGuide.pdf', cta: 'CSLB · Law & Business outline' }
    ]
  },
  {
    tier: 'Exam prep & practice tests',
    items: [
      { title: 'Your Law & Business study guide', desc: "Before building this, I went through every paid guide below to see if one was worth pointing you to. Here's the thing: everything the exam tests is public. The state licensing board publishes all of it in the [Law & Reference Book](https://www.cslb.ca.gov/Resources/GuidesAndPublications/2026/2026_CSLB_Law_Book.pdf), free. That book's just long and dense, so what the $300 to $1,000+ courses really sell is the work of reading it and boiling it down to what matters. That's what this is, built around your exam. The paid courses below are good if you want a more 'official' study guide. I am obviously not in the education business but I think mine is pretty good, plus it's free 99.", href: '/guide/law-business', cta: 'Open your study guide', feature: true },
      { title: 'Law & Business study book (free, official)', desc: "The California Contractors License Law & Reference Book, the actual material the Law & Business exam is built on, free straight from the state. This is your main study text for the hard exam. It's long, so lean on the outline above to hit the heavy topics first.", href: 'https://www.cslb.ca.gov/Resources/GuidesAndPublications/2026/2026_CSLB_Law_Book.pdf', cta: 'CSLB · Law & Reference Book' },
      { title: 'Law & Business practice exam', desc: "A question bank for the hard exam: timed 30-minute rounds, answers explained after. Low cost per attempt. Drill it until you're steady around 75%.", href: 'https://contractorpracticeexam.com/california-law-and-business-free-exam/', cta: 'L&B practice' },
      { title: 'C-8 trade exam prep (Digital Constructive, ~$300–$400)', desc: "Built specifically for the concrete exam. The page itself is a free, plain-English rundown of the experience rules, the five topic areas and how they're weighted, and what the day looks like, so it's worth a read either way. The real prep, their practice tests and study guide, is a paid plan (roughly $300–$400 depending on the package). Worth it if you want C-8 practice questions, since the free banks lean toward Law & Business.", href: 'https://digitalconstructive.com/concrete-license-c8-concrete-contractors/', cta: 'Digital Constructive · C-8' },
      { title: 'CSLS all-inclusive (~$1,195, pass-or-refund)', desc: "The full safety net: classes and practice for both exams, and a real money-back guarantee if you follow the plan and still don't pass. Priciest, but the surest thing if you'd rather not gamble a retake.", href: 'https://contractorslicensingschools.com/contractor-license-all-inclusive-program', cta: 'CSLS all-inclusive' }
    ]
  },
  {
    tier: 'Your Google Business Profile',
    note: "Free, and the single highest-payoff thing after the license. I build the whole profile, and the one part that has to be you is a short verification video.",
    items: [
      { title: 'The verification video shot-list', desc: 'One unedited 30+ second clip from your phone: a street sign or two, your truck, your tools and equipment, and a business doc (registration or an invoice). That’s it. Done right, it passes first try.', href: '#', cta: 'I’ll text you the exact shot-list' },
      { title: 'Where it lives', desc: 'Your profile gets created here. You don’t need to do anything on this yet, just know this is the spot.', href: 'https://business.google.com', cta: 'business.google.com' }
    ]
  },
  {
    tier: 'Reviews',
    note: "Once Google is live, this is the fastest way to build trust with homeowners.",
    items: [
      { title: 'Your one-tap review link', desc: 'I’ll set up a link that drops a customer straight onto your review page, plus a short message you can copy-paste and text. Ready as soon as the profile is live.', href: '#', cta: 'Coming once Google is live' }
    ]
  }
];
