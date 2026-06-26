// Client-facing project status + the deliverables we need from Auguste.
// This is the friendly, in-his-voice mirror of TRACKER.md: section B → PROJECT_STATUS,
// section A → DELIVERABLE_GROUPS. TRACKER.md stays the internal source of truth — when
// something here changes, change it there too (and vice versa).
//
// Shown on /dashboard (his private area), under the "Your project" tab. Keep it plain,
// honest, and short: tell him where things stand and the few things that'd move it
// forward, without making any of it feel like homework.

// Where he drops files (the shared Drive from discovery).
export const DRIVE_URL = 'https://drive.google.com/drive/folders/1KiqIBYWCqdaCTRJ3__47OyYhuQ9KA5Ij';

export const PROJECT_INTRO =
  "Here's where your new site stands, and the handful of things from you that'd move it forward. " +
  "Nothing here is urgent or locked in. Send what's easy when it's easy, and I'll keep building around it.";

// What's built so far (the reassuring part), newest work last.
// state: 'done' | 'doing' | 'next' | 'later'
export const PROJECT_STATUS = [
  {
    state: 'done',
    title: 'The foundation is built',
    detail: "Homepage, the four city condo pages, the building directory, and your reviews are all up on a private preview. Your WIX site stays your real, live site until you decide to switch."
  },
  {
    state: 'done',
    title: 'Your lead inbox is ready',
    detail: "Every message from the site lands right here, under the Leads tab, and emails you too. Nothing slips through."
  },
  {
    state: 'doing',
    title: 'Making it feel like yours',
    detail: "Matching the look of your WIX landing and the timallenproperties.com feel you liked. The big piece here is your Emeryville video."
  },
  {
    state: 'next',
    title: 'Your recently-sold wall',
    detail: "As your sold photos come in, the showcase fills out with your real closings instead of placeholder cards."
  },
  {
    state: 'later',
    title: 'Live MLS search',
    detail: "The search band is a placeholder for now. We turn on real listings only when you're ready to switch over, so there's no cost until then."
  }
];

// The asks, grouped by how much they unblock. Each item gets a localStorage "sent"
// toggle on the page so he can keep track for himself.
export const DELIVERABLE_GROUPS = [
  {
    tier: 'The two that unlock the most',
    note: "These are what make the site feel like yours instead of a template.",
    items: [
      {
        id: 'video',
        title: 'The Emeryville video, original files',
        ask: "The high-quality original clip or clips, not the version embedded on WIX.",
        why: "It's the centerpiece you loved on your landing page. The copy on WIX is too low-res to reuse, so I need the source to do it justice."
      },
      {
        id: 'sold-photos',
        title: 'Photos from your sold listings',
        ask: "Five to start: 3609 Adeline, 1054 63rd St, 1505 32nd St, 2709 Channing Way, 1929 California St. Plus any others you've got.",
        why: "These build your recently-sold wall. Your own listing photos are the ones we can safely publish, so the more the better."
      }
    ]
  },
  {
    tier: 'Quick calls, just need your answer',
    note: "No files for these, just a yes/no or a number.",
    items: [
      {
        id: 'stats',
        title: 'Sign off on your headline numbers',
        ask: "The site shows $35M+ sold, 7 years, 60+ homes, and a 5.0 rating. Good to publish as-is?",
        why: "I want your numbers accurate and truly yours. If any should change, tell me and I'll update it everywhere at once."
      },
      {
        id: 'photo-rights',
        title: 'Ok to use 5 building photos already up',
        ask: "They came from your past All East Bay listings. Just confirm you're fine publishing them.",
        why: "Keeps us clean on photo rights, no surprises later."
      }
    ]
  },
  {
    tier: 'Whenever you get a chance',
    note: "Nice to have. None of these block anything.",
    items: [
      {
        id: 'building-exteriors',
        title: 'Quick phone shots of a few buildings',
        ask: "Eleven buildings in the directory still use generic cards. A short walk around the neighborhood covers most of them.",
        why: "Your real photos beat stock and make the directory feel genuinely local."
      },
      {
        id: 'hoa',
        title: 'A few HOA details',
        ask: "Dues or price ranges for a handful: Glashaus, Andante, Vue 46, Liquid Sugar, GreenCity, Key Route, Horton St, Elevation 22.",
        why: "Fills the last blanks on the building pages so buyers see real numbers."
      },
      {
        id: 'hero',
        title: 'A scenic or property shot for the top',
        ask: "Right now the top of the homepage uses your portrait. A nice property or East Bay scenic would give us options.",
        why: "Just gives the hero more range. Totally optional."
      }
    ]
  }
];
