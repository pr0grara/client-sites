# IDC Consulting Engineers — careers site (spec)

A recruiting-site **spec** for IDC Consulting Engineers (Irvine, CA), built to win
the work via a warm intro. It does the one job their live site
([idcengineers.com](https://www.idcengineers.com)) doesn't: turn a licensed
engineer into an applicant.

> **This does not touch IDC's live marketing site.** It's a standalone careers
> experience we show the contact. Same client-sites infra as auguste/pacificwest:
> Cloudflare Pages + Functions + D1 + Resend, no build step.

## Why this angle
Their public site sells IDC *to client agencies*. Their actual growth bottleneck
is **hiring licensed engineers**, and their current Careers page is a stub
("no roles listed — check our LinkedIn or email us"). This spec sells IDC *to the
engineer*: the marquee work (CHSRA, LA Metro), a real PE/SE licensure path,
mentorship under a VP who runs $1.3B programs and an ex-Caltrans CEO, and the
stability of a firm delivering since 1995.

## What's here
```
idc/
├─ functions/
│  ├─ _data.js          ← all IDC content + the open-roles data (the file you edit)
│  ├─ _lib.js           render lib (Organization + JobPosting JSON-LD, EEO footer)
│  ├─ index.js          /            careers landing  (?v=bold = second hero variant)
│  ├─ careers/[role].js /careers/<slug>  data-driven role pages + JobPosting schema
│  └─ api/apply.js      POST /api/apply  application capture → D1 + Resend
├─ assets/site.css      dark "infrastructure" theme, both hero variants
├─ schema.sql           D1 `applications` table
└─ wrangler.toml        Pages project: idc-careers
```

## The two hero variants (for the pitch)
- **`/`** — *match + elevate*. Keeps IDC's dark/white look, azure accent, restrained.
  Reads as "your brand, evolved." The safe lead.
- **`/?v=bold`** — *bolder*. Oversized type, amber accent, deeper blueprint hero.
  More ambitious. Same content below the fold, so the contact compares apples to apples.

## Data-driven roles (the engine)
Add a role object to `ROLES` in `functions/_data.js` → a page exists at
`/careers/<slug>` with `JobPosting` structured data (Google for Jobs eligible).
No build step. The landing's open-roles list and the apply dropdown update too.

## ⚠️ Before this ships to IDC — confirm / swap
- **Open roles are ILLUSTRATIVE.** The four in `_data.js` are realistic California
  transportation-engineering roles so the spec feels alive. IDC swaps them for real
  openings + real comp ranges (CA requires a pay range in postings; the ranges also
  drive Google-for-Jobs richness).
- **`$10B+ delivered`** comes from the client brief, not their site — confirm.
- **Certifications (DBE/SBE/UDBE/WBE)** are verified on IDC's own About page, but
  double-check the active certificates before publishing them in the footer.
- **LinkedIn URL** in `_data.js`/`_lib.js` is a best guess — verify the real handle.

## Deploy
```bash
cd idc
nvm use 22
npm install
npm run db:create      # → paste the printed database_id into wrangler.toml
npm run db:init        # create the applications table (remote)
npx wrangler pages secret put RESEND_API_KEY
npm run deploy
```
Functions can't run under a local dev server on this Mac (no workerd). Validate
rendering by calling the handlers in Node 22 (see `npm run` notes), or on the
Cloudflare deploy preview.

## Local render check (no wrangler)
The page handlers are pure `(context) → Response`. Import them in Node 22 and read
`.text()` to verify markup without deploying — that's how this spec was validated.
