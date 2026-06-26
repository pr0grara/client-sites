# auguste-realtor.com — Auguste Vende

The **Emeryville condo specialist.** Brand = "Auguste Realtor"
(his own brand; *All East Bay Properties* is only the responsible broker, named in the
compliance footer). Strategy + discovery live in
`arabuilds/clients/auguste/` and the proposal at `arabuilds.com/auguste`.

## Status — dev pitch, not a launch
His **WIX site stays the live/main site** until *he* decides to switch. This build lives in
**dev** (deploys to a `*.pages.dev` preview) as a pitch to make him *want* to switch, on his
timeline. So: **no domain cutover yet**, and **IDX is a mocked placeholder** (no paid vendor
until he's ready). The job right now is matching what he wants — keep his WIX landing's look,
especially the **Emeryville video clips** (his deliverable), with timallenproperties.com as the
north-star aesthetic. Requirements: [CLIENT_BRIEF.md](CLIENT_BRIEF.md).

## Stack
Plain HTML rendered by Cloudflare Pages Functions + `assets/site.css` (luxury navy/gold,
Cormorant Garamond display). D1 + Resend for leads. No build step. Same infra as the
arabuilds lead-gen sites.

## Routes
| Route | File | Notes |
|---|---|---|
| `/` | `functions/index.js` | Homepage — hero, stats, quick actions, about, recently-sold, IDX band, communities, reviews, contact |
| `/condos/<city>` | `functions/condos/[city].js` | **Data-driven** SEO pages (emeryville, oakland, berkeley, alameda) — add to `CITIES` in `_data.js` |
| `/home-value` | `functions/home-value.js` | Seller-valuation lead magnet |
| `/api/lead` | `functions/api/lead.js` | POST → D1 `leads` + Resend alert |
| `/dashboard` | `functions/dashboard.js` | **Auguste's private area** — password-gated (`DASH_PASS`). Two tabs: **Your project** (default: site status + what we need from him, content in `_project.js`) and **Leads** (`?view=leads`, reads the `leads` table) |

All content/brand is in **`functions/_data.js`** — edit there.

### Your project tab (`/dashboard`, default view)
His private status board: where the build stands and the short list of deliverables we
need from him (the video, sold photos, stat sign-off, etc.). Client-facing copy lives in
**`functions/_project.js`** — the in-his-voice mirror of `TRACKER.md` (status = section B,
asks = section A; update both when something changes). Each ask has a tap-to-mark-sent
circle (per-device `localStorage`). Read-only, no backend writes; the "questions?" footer
is the seed for turning this into a direct comms channel later.

### Leads tab (`/dashboard?view=leads`)
Where Auguste reads every lead the site captures (the Phase-3 "all leads in one place"
promise) — on-brand, mobile-first, no login popup. Password-gated like the arabuilds plan
page: a styled screen, a 30-day cookie, and a one-tap `/dashboard?pw=…` link he can text
himself. Stat cards (total / this week / seller+valuation), category filter chips
(Selling, Valuation, Buying, Rent/PM, General — derived from `intent`+`source`), search,
CSV export, expandable rows, and a tap-to-mark-handled dot (stored per-device in
`localStorage`). Read-only over D1 — no writes, so it can't corrupt lead data.
Set the password: `npx wrangler pages secret put DASH_PASS` (falls back to `emeryville`
until set — see `SECRETS.md`).

## Layout DNA (from his inspiration sites)
- **timallenproperties.com** → serif display headlines, overlaid stat callouts
  (`$35M+ / 7 yrs / 60+`), uppercase letter-spaced labels, fine dividers, "recently sold"
  showcase, testimonial section, numbered/community local-expertise, gold accent.
- **sashabayrealtor.com** → 3 quick-action cards (search / what's-my-value / alerts),
  IDX search band with Active/Pending/**Sold**, community cards, contact form, "Sold" nav.

## Phased build (tracks the proposal at `/auguste`)
- **Phase 1 — Foundation & niche** ✅ *(this scaffold)*
  Homepage, data-driven city pages, `RealEstateAgent` schema, lead capture, valuation page,
  compliance footer (DRE + Equal Housing). Lives on the `*.pages.dev` preview; **no domain
  cutover** while WIX stays live.
- **Phase 2 — Proof (current focus)** — match his WIX landing's look, wire in the **Emeryville
  video** (his deliverable) as the landing centerpiece, and replace `SOLD_PLACEHOLDERS` in
  `_data.js` with his ~60 closed sales (addresses + photos he provides). Reviews already wired
  from his real testimonials. This is the impress-him work.
- **Phase 3 — Live search & capture (deferred until he switches)** — IDX stays a **mocked
  placeholder** (`.idx-mock` on homepage `#search` + each city page) for now. When he's ready
  to go live, connect IDX (default **iHomeFinder**, what Sasha uses) and wire MLS-sold comps
  into the Recently Sold wall. ~$50–110/mo vendor fee, his cost. See `SECRETS.md` — his MLS
  *login* is not the feed; the vendor/RESO key is.
- **Phase 4 — Grow** — Emeryville building/neighborhood guides (more `/condos`-style data
  pages), small-multifamily/investor angle, reviews engine + ongoing SEO.

## Outstanding (to impress him in dev)
- [ ] **Emeryville video file** from Auguste → wire as the landing centerpiece (keep WIX look).
- [ ] His ~60 sold (addresses + photos) → `SOLD_PLACEHOLDERS`.
- [ ] Property/scenic photography for the hero (current hero uses his portrait;
      `assets/heros/hero.jpg` = standing, `auguste.jpg` = headshot).
- [ ] Confirm his stats are current/publishable ($35M+ / 7 yrs / 60+ / 5.0★).

_Deferred until he commits to switching:_ domain cutover, IDX vendor key, Resend sending-domain
verification (lead email currently `ALERT_TO=azbaghda@gmail.com` for QA).

## First deploy
```bash
cd auguste
nvm use 22
npm install                 # wrangler
npm run db:create           # creates D1 'auguste-leads' → paste id into wrangler.toml
npm run db:init             # apply schema.sql (remote)
cp .dev.vars.example .dev.vars   # add RESEND_API_KEY locally (do NOT commit)
npx wrangler pages secret put RESEND_API_KEY
npm run deploy              # → *.pages.dev preview (no domain cutover while WIX stays live)
```
Already set up (done 2026-06-23): D1 `auguste-leads` created + schema applied, Pages project
`auguste-realtor` created, deployed to https://auguste-realtor.pages.dev. `npm install` may
hang on the `workerd` postinstall on macOS < 13.5 — that's the local runtime only and doesn't
affect deploys; run wrangler under `nvm use 22`.
Functions don't run under the local python server — verify on the deploy preview.
Secrets & the MLS-credential policy: see [SECRETS.md](SECRETS.md).
