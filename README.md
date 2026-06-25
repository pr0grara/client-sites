# client-sites

Production websites for AraBuilds clients. One folder per client, each its own
self-contained **Cloudflare Pages project** deploying to the client's own domain —
same infra as the arabuilds lead-gen sites (Pages + Functions, D1, Resend; no build step).

```
client-sites/
├─ _shared/            canonical code shared across clients (render lib) + this pattern
│  ├─ _lib.js          generic head/nav/footer render helpers (brand-agnostic)
│  └─ README.md
├─ auguste/            → auguste-realtor.com   (Emeryville condo specialist)
│  ├─ functions/       index.js, condos/[city].js, home-value.js, api/lead.js, _lib.js, _data.js
│  ├─ assets/          site.css + heros/
│  ├─ wrangler.toml    Pages project: auguste-realtor
│  ├─ schema.sql       D1 leads table
│  └─ README.md        ← per-client build/deploy/phases
└─ <next-client>/      cp -r auguste <next-client>, then edit _data.js / brand
```

## How a client folder works
- **`functions/_data.js`** — all client-specific content + brand config (the only file
  you rewrite per client).
- **`functions/_lib.js`** — generic render lib, vendored from `_shared/` so the project
  deploys standalone. Refresh with `npm run sync`.
- **`functions/index.js`, `condos/[city].js`, …** — pages. City pages are **data-driven**:
  add a city to `_data.js` → a new SEO page exists at `/condos/<slug>`. No build step.
- Each client is a **separate Cloudflare Pages project + domain + D1 + secrets.** Deploys
  are independent — editing one client never touches another or arabuilds.

## Starting a new client
```bash
cp -r auguste newclient && cd newclient
# edit functions/_data.js (brand, content), wrangler.toml (name/domain), assets/
npm run sync                 # pull latest _shared/_lib.js
```

## Deploy (per client)
```bash
cd auguste
nvm use 22
npm run deploy               # wrangler pages deploy → prod
```
Functions can't run under the local python dev server (no workerd on this Mac) — verify
on the Cloudflare deploy preview. See each client's `README.md` for the full checklist.

> This repo holds client revenue/strategy and brand assets — keep it **private**.
