# _shared

Canonical code shared across every client site in this monorepo.

## `_lib.js`
The generic render library: `head()`, `nav()`, `footer()`, `page()`, plus `escapeHtml`,
`json`, `html`. It is **brand-agnostic** — every client passes its own `BRAND`/content
object (see a client's `functions/_data.js`).

Because each client deploys as a **standalone** Cloudflare Pages project, this file is
**vendored** (copied) into each `client/functions/_lib.js` rather than imported across
folders (Pages Functions only bundle files inside the project dir). Keep this copy the
source of truth and push updates out with, from a client folder:

```bash
npm run sync     # cp ../_shared/_lib.js functions/_lib.js
```

When you change `_lib.js` here, run `npm run sync` in every client folder and redeploy.
