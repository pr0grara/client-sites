# Secrets & credentials — auguste-realtor.com

**Nothing in this file should ever contain a real secret.** Secrets live only in
Cloudflare (`wrangler pages secret put`) and in a local, git-ignored `.dev.vars`.

## How secrets are set
```bash
nvm use 22
npx wrangler pages secret put RESEND_API_KEY   # lead-alert emails
npx wrangler pages secret put DASH_PASS        # password for /dashboard
```
Local dev reads `.dev.vars` (copy from `.dev.vars.example`, never committed).

## Lead dashboard password (`DASH_PASS`)
`/dashboard` (Auguste's private lead list) is gated by `DASH_PASS`. If the secret is
unset it falls back to **`emeryville`** so the page works on first deploy — set a real
password before sending Auguste the link, and rotate if it's ever shared insecurely.
The dashboard is read-only over D1 (no writes), and pages carry `noindex,nofollow`.

## ⚠️ Auguste's Bridge MLS credentials
Auguste shared his Bridge MLS login over chat. Treat it as sensitive:

1. **It does not belong in this repo or in `.dev.vars`.** A member login is for
   the MLS system itself, not the website.
2. **A member login ≠ an IDX/data feed.** You cannot pull listings or photos onto
   the site by logging in. Listing data comes from one of:
   - an **IDX vendor** (e.g. iHomeFinder — what sashabayrealtor.com uses) that holds
     a data license with Bridge MLS and gives you an embeddable widget / API key, or
   - a **RESO Web API** key that Bridge MLS issues directly under a separate data-
     license agreement. *That* key is what goes in `IDX_API_KEY`.
3. **Photos:** the compliant IDX feed displays listing photos inside its widget.
   You may not scrape/re-host MLS photos. For the curated "Recently Sold" wall, use
   originals from Auguste (his own listings) — not other agents' listing photos.
4. **Hygiene:** since the password was sent over chat/email, have Auguste rotate it
   once IDX is set up. Store the working copy in a password manager, not here.

## Inventory (where the real values live — names only, no values)
| Secret | Where | Purpose |
|---|---|---|
| `RESEND_API_KEY` | CF Pages secret + `.dev.vars` | Lead-alert email |
| `DASH_PASS` | CF Pages secret + `.dev.vars` | Password for `/dashboard` (defaults to `emeryville`) |
| Bridge MLS login | Auguste's password manager | MLS system access (his) |
| IDX vendor / RESO key | CF Pages secret (Phase 3) | Live listing feed |
