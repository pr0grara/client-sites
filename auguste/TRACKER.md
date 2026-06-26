# Auguste — Master Deliverables Tracker

> **Canonical, single source of truth.** Updated 2026-06-26.
> The deliverables were scattered across 6+ docs (plus a Google Doc) and drifting.
> This reconciles all of them against the actual repo state. When something changes,
> change it **here**; the other docs keep their own jobs (client emails, the proposal
> page) but defer to this for status.

## Sources folded in
| Source | What it is | Folded in |
|---|---|---|
| `/auguste` "start here" ([arabuilds/functions/auguste.js](../../arabuilds/functions/auguste.js)) | Client-facing checklist on the proposal page | ✅ |
| `client_touch/CLIENT_DELIVERABLES.md` | Client email draft (the outbound ask) | ✅ |
| `client_touch/SITEMAP.md` | Client email draft (site map + asks) | ✅ |
| `client_touch/BUILDING_VERIFICATION.md` | Client check-sheet (HOA blanks) | ✅ (summarized in A3) |
| `README.md` "Outstanding" | Internal build status | ✅ |
| [arabuilds/clients/auguste/](../../arabuilds/clients/auguste/) README + discovery-notes | Internal strategy/status | ✅ |
| `leadflow-plan.md` (this repo, planned) | Lead-source integration plan | ✅ (B + C) |
| **Google Doc in the shared Drive** | Ara's other checklist | ⏳ **PENDING — paste it and I'll fold it in** |

---

## A. From Auguste — assets + answers he owes us
What unblocks the build. Priorities first.

| # | Item | Status | Detail |
|---|---|---|---|
| A1 | **Emeryville video, original file(s)** | ❌ Not received | `assets/heros/emeryville.mp4` is the placeholder clip from WIX. He owes the high-quality originals. **His #1 priority.** |
| A2a | **5 one-off sold photos** | ❌ Not received | No building shot to fall back on: 3609 Adeline (Emeryville), 1054 63rd St (Oakland), 1505 32nd St (Oakland), 2709 Channing Way (Berkeley), 1929 California St (Berkeley). **Top priority with A1.** |
| A2b | **More sold-listing photos** | 🟡 Partial | 6 in (`assets/sold/`: watergate, pacific-park-plaza, 5855-horton, 6400-christie, 1500-park, 338-spear). Want 5–10+ more from his seller-side closings. |
| A2c | **Building exteriors for the directory** | 🟡 Partial | 6 of 17 buildings have a photo (5 from his listings + Glashaus = CC0). 11 still on placeholder cards. His phone shots beat stock; ~15-min walk covers most. |
| A2d | **Interior photos** | ❌ None | Gaps expected if we play licensing safe. |
| A2e | **Hero / scenic photography** | 🟡 Have stand-ins | `heros/auguste.jpg` (headshot) + `hero.jpg` (standing). Wants better scenic/property shots. |
| A2f | **Rights confirm — 5 published building photos** | ⏳ Pending | The 5 already up came from All East Bay past listings (his). Need his on-record "ok to publish." |
| A3 | **HOA verification** | ⏳ Pending | 8 priority blanks: Glashaus, Andante, Vue 46 (dues); Liquid Sugar (top of range + stories); GreenCity (top of range); Key Route (dues); Horton St (top + stories); Elevation 22 (dues + stories + price). Plus a skim of all 17. Sheet: `client_touch/BUILDING_VERIFICATION.md`. |
| A4 | **Confirm publishable stats** | ⚠️ **Conflict — needs his call** | Site shows **$35M+ · 7 yrs · 60+ homes · 5.0★**. Verifiable Paragon export ([LISTINGS.md](LISTINGS.md)) = **42 seller-side homes / $26.6M**. The gap is likely buyer-side + PM + aspirational. He needs to confirm what we can publish. |
| A5 | **WIX preferences** | ❓ Open | Which landing elements he most wants preserved vs. open to changing. |
| A6 | **Video specs** | ❓ Open | How many clips, what resolution, does he have originals or only the WIX-embedded versions. |
| A7 | **Leadflow discovery** | ❓ Open | LSA account owner (his vs. brokerage), sample LSA + Calendly lead emails, any CRM, ad/tracking number, backfill vs. fresh. Full list in `leadflow-plan.md`. |

> Already received (don't re-ask): **bio** (✅ `_data.js`), **reviews** (✅ 8 in `_data.js`), **sold-listing data** (✅ 42-home Paragon export → `LISTINGS.md` / `listings.json`), **Bridge MLS login** (✅ received, but it is **not** an IDX feed — see D2).

---

## B. What we owe — build status
| Phase / item | Status | Notes |
|---|---|---|
| **Phase 1 — Foundation & niche** | ✅ Done | Homepage, 4 city pages, 17 building pages, `RealEstateAgent` schema, lead capture, valuation page, compliance footer. On the `*.pages.dev` preview. |
| **Lead dashboard** (`/dashboard`) | ✅ Built | Password-gated, on-brand, reads `leads`. **To finish:** set `DASH_PASS` secret + verify on deploy preview. |
| **Leadflow hub** (ingest his existing leads) | 📋 Plan stage | Make the dashboard hold *every* source, not just site forms. Gated on A7. Plan: `leadflow-plan.md`. |
| **Phase 2 — Proof** | 🟡 In progress | Swap real video (A1), write real copy (current copy is rough on purpose), expand the Recently-Sold wall as photos land (A2). |
| **Phase 3 — Live search / IDX** | ⏸ Deferred | iHomeFinder ~**$160/mo + ~$200 setup** (base tier, his cost, repriced upward 2026-06-25). Connect only when he commits to switching. |
| **Phase 4 — Grow** | ⏳ Later | Berkeley/Oakland building pages, small-multifamily/investor angle, reviews engine, ongoing SEO. |
| **Domain cutover** | ⏸ Deferred | WIX stays live until *he* decides. |
| **Resend sending-domain verification** | ⏸ Deferred | Lead email currently to `azbaghda@gmail.com` for QA. |

---

## C. Open decisions
- **A4 stats** — what's publishable (the one that needs him directly).
- **A5 / A6** — WIX elements to keep; video specs.
- **A7 leadflow** — the discovery set in `leadflow-plan.md` (LSA ownership is the unblocker).
- **IDX vendor** — default iHomeFinder; confirm at signup, only when he switches.

---

## D. Drift reconciled (so it stops re-confusing us)
1. **"Sold list — done"** on `/auguste` means the *data* is captured (42-home export). It does **not** mean photos are in: only 6 sold photos exist, 5 one-offs are missing (A2a), and the showcase shows 11 grouped entries.
2. **"MLS login — done"** on `/auguste` means his Bridge login was received. It is **not** a usable listing feed — IDX needs a vendor/RESO key (see `SECRETS.md`), and IDX is still deferred (B, Phase 3).
3. **Stats:** marketing `$35M+ / 60+` vs. verifiable `42 / $26.6M` is unresolved until A4.
