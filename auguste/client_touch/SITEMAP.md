**To:** Auguste
**Subject:** First look at the site, how it's laid out

Hey Auguste,

Here's the high level of what's built so far and where everything lives, so you can click around and know what you're looking at. Read the note at the bottom first, it sets expectations.

---

## The map

### Home — `/`
The main page, one long scroll. Top to bottom:
- **Hero video** (the Emeryville clip, full screen) with your name and headline
- **Stat strip**: $35M+ sold, 7 years, 60+ homes, 5.0★
- **3 quick-action cards**: search homes, what's my condo worth, listing alerts
- **About you**: your bio and photo
- **Recently Sold**: a wall of your real closings, grouped by building
- **Live Home Search**: placeholder for the MLS search widget (wired up later)
- **Communities**: cards into Emeryville / Oakland / Berkeley / Alameda
- **Reviews**: your client testimonials
- **Seller CTA + contact form**

### What's my condo worth — `/home-value`
A seller valuation request page. Real ask, not a robot estimate. Feeds the form straight to you.

### Condo directory hub — `/condos`
The building-by-building guide to Emeryville condo stock. The buildings you've actually sold in show first. This is the piece that ranks when an owner googles their building.

### City pages (4)
- `/condos/emeryville` (the specialty)
- `/condos/oakland`
- `/condos/berkeley`
- `/condos/alameda`

### Building pages (17, one each)
Every Emeryville condo building gets its own page with HOA, amenities, parking, price range, and your closings in it. `/building/<name>`, for example:
- `/building/watergate`
- `/building/pacific-park-plaza`
- `/building/bridgewater`
- `/building/terraces-emerystation`
- `/building/emeryville-warehouse-lofts`
- `/building/glashaus`
- ...and 11 more (Andante, Vue 46, Bay Street One, Oliver Lofts, Besler, Liquid Sugar, GreenCity, Adeline Place, Key Route, Horton Street, Elevation 22)

That's it. Home, valuation, the condo directory, 4 city pages, 17 building pages.

---

## Please read this part

This is a **first pass, built fast on purpose.** I kept the effort low so it's cheap to pivot if we want to change direction. A couple things that follow from that:

- **The copy is rough, and in places straight-up nonsensical.** That's by design. I didn't want to polish words on a layout we might throw out. Don't judge the writing yet, judge the structure and the feel. Real copy comes once we lock the direction.
- **The landing video is a placeholder.** It's the clip from your current site, standing in until you send the original file (highest quality you've got). Same spot, just swapped for the real thing later.

## What I need from you to push this forward

1. **HOA prices, your greenlight.** A lot of the building pages have HOA dues pulled from public records, and some are off or blank, mostly the buildings you haven't personally sold in. You know these better than any source. There's a short check-sheet (`BUILDING_VERIFICATION.md`) where you just skim and flag what's wrong.

2. **Photos of the other buildings.** This is the licensing one. I can only safely publish photos from your own seller-side listings. For the buildings you haven't shot, I'm filling in free-licensed images where I can, but your own phone photo of any Emeryville condo building beats a stock one every time. They're all within a few blocks, so a 15-minute walk on a clear day covers most of them. Straight-on exterior, daylight, done.

3. **The 5 sold properties still missing a photo** (single homes and small multifamily, no building shot to fall back on): 3609 Adeline (Emeryville), 1054 63rd St (Oakland), 1505 32nd St (Oakland), 2709 Channing Way (Berkeley), 1929 California St (Berkeley).

4. **Confirm the stats** are current and good to publish: $35M+, 7 years, 60+ homes, 5.0★.

5. **Rights confirm on the 5 condo photos already up.** They came from All East Bay Properties past listings, so they're yours. Just say you're good publishing them so it's on the record.

The video and those 5 missing photos are what I'd grab first. Everything else we layer in as you send it. Have a click around and tell me what you think 👍
