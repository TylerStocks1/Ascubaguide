# Client Brief — A Scuba Guide

> **Phase 2 deliverable.** This is the canonical record of every fact Tyler confirmed during intake. `site-structure` (Phase 3) reads this to populate schema, content, and metadata. Where this file conflicts with `market-brief.md` or `keyword-map.md`, **this file wins**.

## Brand identity

| Field | Value | Source |
|---|---|---|
| **Master brand** | A Scuba Guide | Tyler intake Round 2 |
| **Domain** | `ascubaguide.com` (to be registered) | Tyler intake Round 1 |
| **First product / first city** | Koh Tao, Thailand | Phase 1 + intake |
| **Tagline (working)** | "The dive briefing tool built by an instructor with 2,000+ dives" | Phase 1 positioning |
| **Brand architecture** | Umbrella brand designed for multi-location expansion. Koh Tao is product 1; future cities (Phuket, Similan, Maldives, etc.) bolt on without re-branding. | Tyler intake Round 2 |
| **Logo** | Does not yet exist. Phase 4 design responsibility. | Routing plan + Phase 4 deferral |
| **Colors / typography** | Fresh identity, not inherited from the existing PWA. Decided in Phase 4 by Tyler. | Routing plan + Tyler intake |

## Owner / Person schema

| Field | Value | Status |
|---|---|---|
| **Legal name** | George Blizzard | Confirmed |
| **Legal entity** | Private individual (no registered company) | Confirmed |
| **Schema strategy** | `Person` only. **No `Organization` schema.** No company number on footer. | Confirmed |
| **Primary credential** | RAID Dive Instructor | Confirmed |
| **RAID certification number** | Unknown | **BLOCKER** — needed for `Person.hasCredential` |
| **Dive count** | 2,000+ logged dives | Tyler-reported |
| **Dive count timeframe** | "Over the last 4 years or something" — intense, recent career | Tyler-reported, approximate |
| **Location** | Koh Tao, Thailand | Confirmed |
| **Years on Koh Tao specifically** | Unknown — Tyler reported 4 years of intense diving but not whether all on Koh Tao | **BLOCKER** — needed for bio accuracy |
| **Previous employer** | Hydronauts Diving Resort, Koh Tao ([hydronautsdiving.com](https://hydronautsdiving.com/)) | Tyler-reported, school verified as real RAID-only Koh Tao operator. Employment dates unknown. |
| **Dive shop ownership claim** | Phase 1 noted "possibly former dive shop owner." Likely a confusion with the Hydronauts employment. | **BLOCKER** — Tyler to confirm or remove with George before About page ships |
| **Instagram** | [@blizzintheblue](https://www.instagram.com/blizzintheblue/) | Tyler-reported. Profile is gated; could not auto-verify ownership. **Must confirm with George before adding to schema `sameAs`.** |

## Audience priority (confirmed)

1. **Primary — B2B dive schools on Koh Tao.** ~50 shops across **RAID, PADI, and SSI** cert bodies. Decision-maker: owner/manager. Currently brief students with whiteboards, flip charts, and printed PADI cue cards.
2. **Secondary — B2C divers** booking a Koh Tao trip. Free PWA install. Acts as Trojan horse generating school-side demand.

**Cert framing (locked):** copy is **cert-agnostic**. Always say "RAID, PADI, SSI" or generic "dive school." Never lead with "PADI briefing tool." George's RAID background lives only on the About page.

## Monetization (confirmed)

- **v1 / pilot:** **Free** for all Koh Tao dive schools during early access.
- **General availability:** Pricing tiers TBD. **BLOCKER** — needed before `/pricing` page can show numbers.
- `/pricing` page ships with "Free during early access" and an "Apply for the pilot" CTA. No tiers, no checkout, no Stripe in v1.
- **No payment processor required for v1.**

## Hosting topology (confirmed)

- **Marketing site:** `ascubaguide.com/` (Cloudflare Pages, Stocks Local's account)
- **PWA:** `ascubaguide.com/koh-tao` (path-based, **same origin** as marketing site)
- **Implication for Phase 3:** the existing PWA (`G:\Websites\Fish app` — React 19 + Vite + Leaflet + Tailwind 4) must either be (a) ported into the Next.js App Router project as a sub-route, or (b) built separately and the `dist/` folder served as static assets at `/koh-tao`. **This is the biggest Phase 3 architecture decision and is logged as a BLOCKER for `site-structure` to resolve before scaffolding.**

## Analytics (confirmed)

- **Cloudflare Web Analytics** — free, cookieless, no GDPR consent banner needed.
- **No Google Analytics** in v1.
- Implication: no cookie consent banner required, no `/cookies` page needed beyond a brief privacy mention.

## Content + asset inventory

| Asset | Status | Notes |
|---|---|---|
| **Dive site descriptions × 24** | Available | In `G:\Websites\Fish app\src\data\diveSites.json`. Reuse verbatim or rewrite for SEO. |
| **Fish species data × 100+** | Available | In `G:\Websites\Fish app\src\data\fishSpecies.json` + `fishIndex.json`. Includes scientific name, conservation status, fish-per-site mapping. |
| **George's own dive site photos** | **Tyler confirmed George has these** | **BLOCKER** — Tyler to collect and drop in `client-assets/photos/dive-sites/`. Replaces or supplements the 9 hand-drawn site maps in the existing app. |
| **Fish photos** | Unknown | Likely none from George. Existing app has zero fish photos (uses emoji). v1 can ship without; flag as content debt. |
| **George's headshot / dive-gear photo** | Not yet provided | **BLOCKER** — needed for About page hero. Critical for E-E-A-T. |
| **Pilot school list / testimonials** | None | **BLOCKER (soft)** — Tyler asked George whether Hydronauts will give a launch quote + logo. Until then, no "trusted by" row on the homepage. |
| **About page bio copy** | Tyler will draft from this brief | Pending the BLOCKER items above (cert number, years on Koh Tao, dive shop ownership confirmation). |
| **FAQ source** | None | **BLOCKER (soft)** — Tyler/George to provide the 6 questions George actually gets asked by school managers. v1 can ship with FAQs synthesised from the market brief. |

## Social presence (`sameAs` schema array)

| Platform | URL | Status |
|---|---|---|
| Instagram | https://www.instagram.com/blizzintheblue/ | **Pending verification** — confirm with George before adding to schema |
| Facebook | None | n/a |
| LinkedIn | Unknown | **BLOCKER (soft)** — ask George if he wants one linked |
| YouTube / TikTok | Unknown | n/a unless George says otherwise |
| Hydronauts (former employer) | https://hydronautsdiving.com/ | Not a `sameAs` candidate (not George's profile). Could appear in About page bio as "previously instructed at Hydronauts Diving Resort." |

## Legal / compliance

- **Privacy policy** — boilerplate to be drafted in Phase 3 (or Phase 5). Keep it short: contact form data + Cloudflare Analytics only. No cookies, no third-party tracking, no advertising.
- **Terms of service** — not required for v1 (no payments, no accounts, no commerce). Can ship without. Add when general availability launches.
- **Cookies / consent** — none required (Cloudflare Web Analytics is cookieless).
- **GDPR / Thai PDPA** — soft compliance via the boilerplate privacy. Real review only when paid tier launches.

## NAP / LocalBusiness

**N/A.** A Scuba Guide is a software product, not a local business. **No `LocalBusiness` schema anywhere.** No physical address on the site beyond "Based in Koh Tao, Thailand" as flavor copy. No phone number. No `openingHours`. No Google Business Profile. No `place_id`.

This is hard-locked in `keyword-map.md` schema plan and must not be added by any later skill.

## Content tone — guardrails for Phase 3 copywriting

- Voice: instructor talking to instructors. Direct, technical, no hype.
- **Banned words:** "revolutionary," "game-changing," "AI-powered," "next-generation," "ecosystem," "platform" (use "tool" instead).
- **Banned framing:** "the Uber/Airbnb/Netflix of dive briefings."
- **Required framing:** "built by an instructor," "for RAID, PADI, SSI dive schools," "replaces the whiteboard."
- **Cert agnostic:** never lead with PADI exclusively. Always list all three or use the generic.
- **Tone of the About page:** first-person George if Tyler can get a draft from him; otherwise third-person and straightforward.

## Phase 3 / `site-structure` directives (must respect)

1. **Brand string** is `A Scuba Guide` everywhere — H1s, meta titles, schema `Organization.name` (wait — no Organization, use `WebApplication.name`), footer.
2. **Domain** is `ascubaguide.com`. Build sitemap, robots, llms.txt for this canonical.
3. **PWA path** is `/koh-tao`. Either port the Vite/React 19 app into Next.js App Router as a route group (`app/koh-tao/...`), or set up a Cloudflare Pages function to serve the existing `dist/` build at that path. **Decide before scaffolding** — don't half-build.
4. **No `LocalBusiness` schema.** Use `WebApplication` + `Person` (George) only.
5. **No payment processor, no auth, no accounts.** v1 is a marketing site + free PWA.
6. **Cloudflare Web Analytics only** — no GA4, no GTM, no Hotjar.
7. **Cert-agnostic copy.** Search the codebase for "PADI" and ensure every instance is bracketed by "RAID, PADI, SSI" or rewritten generic.
8. **Multi-location architecture from day one.** Page structure should anticipate `/koh-tao/...`, `/phuket/...`, `/similan/...` even though only `/koh-tao` ships in v1. Don't hardcode "koh tao" into shared components.
9. **Hard rule:** do not push to main while `BLOCKERS.md` has open items. This is enforced by `site-structure` itself.

## Open intake items

See `BLOCKERS.md` for the full punch list. Soft (non-blocking) items are flagged inline in this brief with `BLOCKER (soft)`.
