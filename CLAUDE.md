# A Scuba Guide — Project Source of Truth

> Read this file first in any new conversation. Everything below is canonical and overrides assumptions from the standard Stocks Local skill templates.

## What this is

The marketing site for **A Scuba Guide** — a dive-briefing tool built by RAID instructor **George Blizzard**. First product / first city is **Koh Tao, Thailand**. Brand is built as an umbrella for multi-location expansion (Phuket, Similan, Maldives, etc. as bolt-ons).

- **Master brand:** A Scuba Guide
- **Domain:** `ascubaguide.com` (not yet registered — see `BLOCKERS.md`)
- **Owner / Person schema subject:** George Blizzard (private individual — no registered company)
- **Tagline (working):** "The dive briefing tool built by an instructor with 2,000+ dives"
- **Repo intent:** marketing site + path-based PWA mount at `/koh-tao`. Multi-location ready from day one.

## Phase model status

| Phase | Skill | Status |
|---|---|---|
| 1 | `market-research` | Done — see `market-brief.md` |
| 2 | `client-intake` | Done — see `client-brief.md`, `BLOCKERS.md` |
| 3 | `site-structure` | **In progress** — local build only |
| 4 | `design-assist` | Pending — Tyler picks colors, fonts, 3D technique |
| 5 | `client-handoff` | Pending |

**Push status:** LOCAL ONLY. `BLOCKERS.md` has 11 hard blockers open. `site-structure` will refuse to push to main.

## Hard architectural rules (non-negotiable)

1. **Brand string is `A Scuba Guide`** everywhere — H1s, meta titles, schema `WebApplication.name`, footer. Never "Koh Tao Fish Map" — that was the old internal name.
2. **Schema is `WebApplication` + `Person` ONLY.** No `LocalBusiness`. No `Organization`. No NAP, no phone, no `place_id`, no `openingHours`, no Google Business Profile. George is a private individual, not a registered company.
3. **No payment processor, no auth, no accounts in v1.** `/pricing` ships as "Free during early access" with an apply-for-pilot CTA. No Stripe.
4. **Cloudflare Web Analytics only** — no GA4, no GTM, no Hotjar. No cookie banner needed.
5. **Cert-agnostic copy** — never lead with "PADI." Always say "RAID, PADI, SSI" or generic "dive school." George's RAID badge lives only on `/about`.
6. **Multi-location architecture from day one.** Anticipate `/phuket/...`, `/similan/...` even though only `/koh-tao` ships. Don't hardcode "koh tao" into shared components or shared metadata.
7. **PWA hosts at `/koh-tao` path-based, same origin.** The existing Vite/React 19 PWA at `G:\Websites\Fish app` is built separately, and its `dist/` is copied into `public/koh-tao/`. The Next.js app does NOT import the PWA's source. See `public/koh-tao/README.md` for the deploy pipeline.
8. **No purple/blue gradients by default.** No Inter/Space Grotesk fonts. Fresh palette — **do NOT inherit** the existing PWA's `#082f49` ocean / `#f97316` coral. All visual decisions deferred to Phase 4.
9. **Banned words in copy:** "revolutionary," "game-changing," "AI-powered," "next-generation," "ecosystem," "platform" (use "tool" instead). No Uber/Airbnb/Netflix-of-X framing.
10. **Hard rule:** do not push to main while `BLOCKERS.md` has open items.

## Stack

- Next.js 14 App Router, TypeScript strict, Tailwind 3.4
- Framer Motion (`motion/react`) — installed but not yet used; 3D technique chosen in Phase 4
- Cloudflare Pages (Stocks Local's account)
- No backend, no database, no auth

## Sitemap (12 logical entries, ~143 generated pages)

From `keyword-map.md`:

| Slug | Type | Notes |
|---|---|---|
| `/` | Fixed | Home — primary B2B + B2C split |
| `/for-dive-schools` | Fixed | B2B sales page |
| `/for-divers` | Fixed | B2C diver discovery |
| `/dive-sites` | Fixed | Index of all dive sites |
| `/dive-sites/[slug]` | **Programmatic × 28** | One per Koh Tao dive site, sourced from `lib/data/diveSites.json` |
| `/fish` | Fixed | Index of all fish species |
| `/fish/[slug]` | **Programmatic × 91** | One per fish species, sourced from `lib/data/fishSpecies.json` + `lib/data/fishIndex.json` (deduped) |
| `/about` | Fixed | George's bio + RAID credentials |
| `/pricing` | Fixed | "Free during early access" |
| `/contact` | Fixed | Contact form (mailto for v1) |
| `/blog` | Fixed | Index — empty in v1 |
| `/install` | Fixed | PWA install instructions for `/koh-tao` |

The cross-linking between dive sites and fish species is the SEO moat — every dive site page lists the fish found there (linked), and every fish page lists the dive sites where it's found (linked).

## Data sources

- `lib/data/diveSites.json` — 28 entries. Schema: `id, name, lat, lng, depth, difficulty, description, highlights[], siteImage`.
- `lib/data/fishSpecies.json` — 24 entries with **site mappings**. Richer schema with `sites[]`, `habitat`, `funFact`.
- `lib/data/fishIndex.json` — 78 entries, no site mappings, different schema (`maxLength`, `reproduction`, `lifespan`, `predators`).
- 11 IDs overlap between the two fish files. `lib/fish.ts` deduplicates and unifies them into a single accessor.

These files were copied verbatim from `G:\Websites\Fish app\src\data\` and must NOT be edited inside this project. The PWA app remains the source of truth — when George updates dive sites or fish, the JSON files are re-copied.

## File conventions

- **Single source of truth for brand identity:** `lib/business.ts`. Components and schema files import from here. Never duplicate brand strings.
- **Schema components:** `components/schema/*.tsx` — small, prop-driven, emit JSON-LD via `<script type="application/ld+json">`.
- **No `LocalBusinessSchema.tsx`.** If you find yourself writing one, stop — re-read rule #2 above.

## Reference docs

- `market-brief.md` — Phase 1 positioning, competitors, GEO landscape
- `keyword-map.md` — Page → primary keyword mapping (Phase 1 deliverable)
- `client-brief.md` — Canonical Phase 2 record (supersedes Phase 1 wherever conflicts)
- `BLOCKERS.md` — Open items blocking the live push
- `client-assets/` — All real client-supplied content (drop site for photos, logo, fonts)
- `G:\Websites\Fish app\` — Existing PWA, read-only reference for product truth and data files
