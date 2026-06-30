# Pacific West Concrete — Pili

East Bay concrete contractor site for Pili. Self-contained Cloudflare Pages project (Pages
+ Functions, D1, Resend; no build step), same pattern as `../auguste`.

```
pacificwest/
├─ functions/
│  ├─ _data.js        ← all brand + content (the only file you rewrite). Holds the LAUNCH GATES.
│  ├─ _lib.js         render lib (head/nav/footer/page + GeneralContractor JSON-LD). Self-contained:
│  │                  the realty sites vendor a different lib from ../_shared, which doesn't fit a trade.
│  ├─ _project.js     dashboard content: progress, deliverables, and resources (C-8, GBP, reviews)
│  ├─ index.js        GET /  — the public homepage
│  ├─ dashboard.js    GET/POST /dashboard — Pili's private area (Project · Resources · Leads)
│  └─ api/lead.js     POST /api/lead — store in D1 + email alert
├─ assets/
│  ├─ site.css        public-site styles (concrete: graphite + safety amber)
│  └─ work/           drop real job photos here, then reference them in _data.js → WORK
├─ wrangler.toml      Pages project: pacific-west-concrete
├─ schema.sql         D1 leads table
└─ package.json
```

## ⚠️ Launch gates — read before going public

Pili is **not licensed yet** (CSLB C-8 in progress) and not bonded/insured. Advertising
contracting work without a license is a CA violation, so the site is built **truthful and
private**: no licensed/insured/bonded claims, no fabricated stats or reviews, `noindex` on.

The day his **C-8 license issues**, in `functions/_data.js` → `BRAND`:
1. `licensed: true` + `cslb: '#######'` → turns on the trust badge + schema credential
2. `noindex: false` → lets Google index the site
3. append the license # to `compliance`
4. swap `phone` to the **Twilio tracking line** (lead attribution — see the Pili notes in arabuilds)
5. drop real photo URLs into `WORK` (and files into `assets/work/`) → replaces placeholder tiles

## Pages
- **`/`** — homepage: hero, services, why-us, featured project (Troy's hillside job), gallery,
  process, FAQ, free-estimate form.
- **`/dashboard`** — Pili's private area (password). Three tabs:
  - **Your project** — progress + the few things we need from him
  - **Resources** — C-8 study guides, application steps, the GBP verification-video shot-list, reviews
  - **Leads** — every estimate request (D1), filter + CSV
- **`/api/lead`** — form endpoint (D1 + Resend).

## Setup (once)
```bash
cd pacificwest
nvm use 22
npm install
npm run db:create                 # prints a database_id → paste into wrangler.toml
npm run db:init                   # creates the leads table (remote)
npx wrangler pages secret put RESEND_API_KEY     # lead emails
npx wrangler pages secret put DASH_PASS          # dashboard password (fallback is 'rebar')
```

## Deploy
```bash
nvm use 22
npm run deploy                    # wrangler pages deploy → prod
```
Functions can't run under a local dev server on this Mac (no workerd) — verify rendering by
calling the handlers in Node, or on the Cloudflare deploy preview.

## Notes
- His email (`Masaniai51@gmail.com`) is intentionally **off the public page** (spam). Leads
  come via the form (which emails `ALERT_TO`) and the phone.
- Discovery, licensing checklist, and GBP prep live in the **arabuilds** repo under
  `clients/pili/`. That's the internal source of truth; `_project.js` is the client-facing mirror.
