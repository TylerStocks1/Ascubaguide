# Keyword Map — A Scuba Guide

> One primary keyword per page. **Never target the same primary keyword on two pages.** Volume estimates marked `?` are unverified — do not invent numbers when filling in.
>
> **Brand:** A Scuba Guide. **Domain:** ascubaguide.com. **First city:** Koh Tao (PWA at `/koh-tao`). All page titles updated below to use "A Scuba Guide" instead of "A Scuba Guide," and copy is **cert-agnostic** (RAID + PADI + SSI), never PADI-only.

## Page set

12 page rows. Two of them (`/dive-sites/[slug]` and `/fish/[slug]`) are **programmatic templates** — one row in this map represents the template itself, with one example slug shown in parentheses. Phase 3 will generate one URL per dive site (24 total) and per fish species (100+ total) from the JSON in `G:\Websites\Fish app\src\data\`.

| # | Slug | Primary Keyword (vol/mo) | Secondary Keywords | Intent | H1 | Meta Title (≤60) | Meta Description (150–160, w/ CTA) |
|---|---|---|---|---|---|---|---|
| 1 | `/` | dive briefing app (?) | dive site briefing tool, koh tao dive companion | Commercial / Navigational | The dive briefing tool built by an instructor with 2,000+ dives | Dive Briefing App for Koh Tao Schools \| A Scuba Guide | Replace whiteboards and flip charts with a visual briefing tool covering 24 Koh Tao dive sites and 100+ species. See it in action. |
| 2 | `/for-dive-schools` | dive school briefing tool (?) | raid briefing app, padi briefing software, ssi dive briefing app | Commercial (B2B) | Brief every student with the same accuracy your instructors have | Dive School Briefing Tool — Free Pilot \| A Scuba Guide | Free during early access for RAID, PADI, and SSI dive schools on Koh Tao. Replace whiteboards with a visual briefing tool. Apply for the pilot. |
| 3 | `/for-divers` | koh tao dive guide app (?) | koh tao diving app, koh tao snorkel app, dive site planner koh tao | Informational → Install | Know every dive site on Koh Tao before you hit the water | Koh Tao Dive Guide App — 24 Sites, 100+ Fish \| A Scuba Guide | Free dive companion for Koh Tao. Browse 24 dive sites and 100+ fish species on any phone. No app store needed — install in one tap. |
| 4 | `/dive-sites` | koh tao dive sites (?) | dive sites koh tao map, scuba diving sites koh tao, koh tao dive locations | Informational | Every dive site on Koh Tao, mapped and briefed | Koh Tao Dive Sites — Interactive Map of All 24 \| A Scuba Guide | Explore all 24 dive sites around Koh Tao with depth, difficulty, hand-drawn maps and the fish you'll see. Tap any site to brief it. |
| 5 | `/dive-sites/[slug]` (e.g. `/dive-sites/chumphon-pinnacle`) | chumphon pinnacle dive site (?) | chumphon pinnacle depth, chumphon pinnacle marine life, chumphon pinnacle whale shark | Informational (long-tail × 24) | Chumphon Pinnacle: depth, marine life and what to expect | Chumphon Pinnacle Dive Site Guide — Depth & Fish \| A Scuba Guide | Chumphon Pinnacle: 14–36m, advanced. Whale sharks, barracuda, grouper. Hand-drawn site map and full species list. Brief your dive in 2 min. |
| 6 | `/fish` | koh tao marine life guide (?) | koh tao reef fish, koh tao tropical fish, fish species koh tao | Informational | The marine life of Koh Tao, organised by where you'll meet it | Koh Tao Marine Life Guide — 100+ Species by Site \| A Scuba Guide | Browse 100+ fish, sharks and invertebrates of Koh Tao — filtered by dive site, depth and behavior. The only fish library tied to real dive briefings. |
| 7 | `/fish/[slug]` (e.g. `/fish/whale-shark`) | whale shark koh tao (?) | whale shark sightings koh tao, where to see whale shark thailand, koh tao whale shark season | Informational (long-tail × 100+) | Whale shark — where, when and how to spot one on Koh Tao | Whale Shark in Koh Tao — Sites, Season & Behavior \| A Scuba Guide | Whale shark sightings on Koh Tao: which dive sites, what season, what behavior to expect. Built into the A Scuba Guide briefing tool. |
| 8 | `/about` | george blizzard raid instructor (?) | koh tao raid instructor, a scuba guide creator, dive instructor 2000 dives | Navigational / Authority | RAID Instructor. 2,000+ dives. One obsession: better briefings. | About George Blizzard — RAID Instructor & Founder \| A Scuba Guide | The RAID instructor behind A Scuba Guide: 2,000+ dives on Koh Tao, building the briefing tool he wished he'd had as a new instructor. |
| 9 | `/pricing` | dive school briefing app cost (?) | a scuba guide pricing, dive shop briefing software cost | Commercial (B2B) | Free during early access — for every Koh Tao dive school | Pricing — Free Early Access for Dive Schools \| A Scuba Guide | A Scuba Guide is free for Koh Tao dive schools during the early-access pilot. Every instructor, every student, every site included. Apply now. |
| 10 | `/contact` | contact a scuba guide (?) | a scuba guide demo, request dive briefing tool demo | Navigational / Lead | Talk to George | Contact — Request a Demo or Pilot \| A Scuba Guide | Book a 20-min demo with George, request a free pilot for your dive school, or just say hi. Real responses from a real RAID instructor, usually within 24 hours. |
| 11 | `/blog` | koh tao diving blog (?) | dive briefing tips, koh tao marine biology, raid padi ssi briefing guide | Informational (hub) | Briefings, marine life and Koh Tao field notes | A Scuba Guide Blog — Briefing Tips & Koh Tao Marine Life | Field-tested briefing techniques, dive-site write-ups, and Koh Tao species deep-dives from George Blizzard and A Scuba Guide. |
| 12 | `/install` | install pwa iphone (?) | add to home screen ios, install web app android, install a scuba guide | Informational / How-to | Add A Scuba Guide to your home screen | Install A Scuba Guide on iPhone or Android — No App Store | Step-by-step guide to install A Scuba Guide as an app on your phone in 30 seconds. Works on iOS Safari, Chrome and any modern browser. No store needed. |

## Cannibalization check

| Risk | Resolution |
|---|---|
| `/dive-sites` (head) vs `/dive-sites/[slug]` (long-tail) | Different keywords entirely. Index targets `koh tao dive sites`, each detail page targets `[site name] dive site`. No overlap. |
| `/for-dive-schools` vs `/pricing` (both B2B) | `/for-dive-schools` targets the **product** keyword (`dive school briefing tool`); `/pricing` targets the **commercial** keyword (`dive school briefing app pricing`). Different intent, different SERP. |
| `/fish` vs `/fish/[slug]` | Same as dive sites — `koh tao marine life guide` vs `[species] koh tao`. |
| `/` vs `/for-dive-schools` | Homepage targets the **category creation** keyword `dive briefing app`; the school landing targets the **B2B intent** keyword `dive school briefing tool`. Adjacent but distinct. |
| `/fish` vs Koh Tao Sealife on `koh tao fish identification` | **Deliberately ceded.** kohtaosealife.com owns it. We pivot to `koh tao marine life guide` to compete on the dive-site-context differentiator instead of head-to-head. |

## Programmatic SEO note (for Phase 3 `site-structure`)

Rows 5 and 7 in this map are **templates**, not single pages. When `site-structure` scaffolds the Next.js App Router:

- `/dive-sites/[slug]/page.tsx` reads from `G:\Websites\Fish app\src\data\diveSites.json` (24 entries). Each generated page must:
  - H1: `[Site Name]: depth, marine life and what to expect`
  - Meta title: `[Site Name] Dive Site Guide — Depth & Fish | A Scuba Guide`
  - Primary keyword baked: `[site name] dive site`
  - Schema: `Place` + `TouristAttraction` + sameAs to PADI's dive site URL if available
- `/fish/[slug]/page.tsx` reads from `G:\Websites\Fish app\src\data\fishSpecies.json` + `fishIndex.json` (100+ entries). Each generated page must:
  - H1: `[Common name] — where, when and how to spot one on Koh Tao`
  - Schema: nothing standard; use `Article` + custom JSON-LD with `taxonRank`, `scientificName` if available

Each programmatic page must surface the **link to its complementary set**: a dive site page links to "fish you'll see here," a fish page links to "dive sites where you'll find me." This is the SEO moat — internal linking density that no competitor has the data model to replicate.

## Schema plan (informational — `site-structure` will implement)

| Page | JSON-LD |
|---|---|
| `/` | `WebApplication` + `Organization` + `Person` (George) |
| `/about` | `Person` with `hasCredential`, `knowsAbout`, `sameAs` |
| `/dive-sites/[slug]` | `Place` + `TouristAttraction` + `BreadcrumbList` |
| `/fish/[slug]` | `Article` + custom species JSON-LD |
| `/blog/*` | `Article` + `Person` (author = George) |
| `/pricing` | `Offer` + `PriceSpecification` (only after Phase 2 confirms tiers) |
| `/contact` | `ContactPage` + `Organization.contactPoint` |

Do not add `LocalBusiness` anywhere. This is not a local business.

## Open keyword questions for Phase 2

1. **Confirm domain** — choose between `kohtaofishmap.com`, `fishmap.dive`, `divebrief.app`, etc. Affects brand keyword targeting.
2. **Verify volumes** — when Tyler has Ahrefs/SE Ranking access, fill in the `?` columns. Do not invent.
3. **Decide `/install` survives** — if PWA install works without instructions across iOS Safari + Chrome, drop the page.
4. **Languages** — if v2 adds Russian/German/French, every row above gets hreflang variants. Out of scope for v1.
