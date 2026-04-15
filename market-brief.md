# Market Brief — A Scuba Guide (George Blizzard)

> **Phase 1 deliverable**, with Phase 2 intake corrections folded in (brand name, cert framing, domain). Read `client-brief.md` for the canonical Phase 2 record.

## Product summary

**A Scuba Guide** is the master brand. **Domain:** `ascubaguide.com` (to be registered). **First product / first city:** Koh Tao. The architecture is built so additional dive locations can be added without re-branding.

The Koh Tao product is a Progressive Web App (React 19 + Vite, source at `G:\Websites\Fish app`) that combines two things no competitor combines: an interactive map of **24 Koh Tao dive sites** (depth, difficulty, hand-drawn maps, descriptions) and a **library of 100+ Koh Tao fish species** (scientific name, habitat, behavior, conservation status, the dive sites where each species is found). It is a pre-dive briefing tool — used on land, before the boat — not an in-water reference. The PWA will be hosted at **`ascubaguide.com/koh-tao`** (path-based, same origin as the marketing site).

**Owner / creator:** George Blizzard. **RAID Instructor**, based on Koh Tao, Thailand. 2,000+ logged dives over ~4 years (intense, recent diving career). Previously worked at **Hydronauts Diving Resort** (Koh Tao, RAID-only school, [hydronautsdiving.com](https://hydronautsdiving.com/)) — verified as a real Koh Tao RAID school though the public site doesn't list staff. Instagram: [@blizzintheblue](https://www.instagram.com/blizzintheblue/) (gated, not auto-verified). Previous Phase 1 note about "possibly former dive shop owner" is **likely a confusion with the Hydronauts employment** — Tyler to confirm with George whether he ever owned vs worked at a shop.

## Service area

**Global / online only.** The product is geographically anchored to Koh Tao, Thailand, but the audience is international. Dive schools on Koh Tao serve a heavily multinational clientele (English, Russian, German, Chinese, Spanish, French). The marketing site is **English-only for v1**; multilingual is a Phase 5+ expansion (flagged in open questions).

This is **not** a LocalBusiness SEO play. Schema will be `SoftwareApplication` / `WebApplication` + `Person` (George) + `Organization`. Do not let any future skill bolt on `LocalBusiness` markup.

## Audience priority

1. **Primary — B2B dive schools on Koh Tao** (~50 shops across **RAID, PADI, and SSI** cert bodies). Decision-maker: owner/manager. They currently brief students with whiteboards, flip charts, printed cue cards, and instructor knowledge. They will pay a per-school license/subscription if the product saves prep time, looks more professional than a whiteboard, and impresses tourists. **Copy must be cert-agnostic** — never lead with "PADI briefing tool"; always list "RAID, PADI, SSI" or use generic "dive school." George's RAID background lives only on the About page.
2. **Secondary — B2C divers** booking a Koh Tao trip. They want to study sites and species before they arrive. Free PWA install. Acts as the Trojan horse: if divers arrive at a school and ask "do you use Fish Map?", that's distribution pressure on the schools.

## Competitors (top 7)

| # | Name | URL | Type | Strengths | Gaps George can exploit |
|---|---|---|---|---|---|
| 1 | **Koh Tao Sealife** | [kohtaosealife.com](https://www.kohtaosealife.com/) | **Direct competitor — fish ID app** (web + Google Play). Claims 100+ fish, 250 photos, 60+ videos. Modern design. | Free, modern, owns "koh tao fish ID" SERP, native Android distribution. | **Fish only — no dive sites.** No dive-site → fish association. No B2B / school-licensing angle. No instructor briefing framing. No visible founder/About/E-E-A-T. Google Play only (no iOS). |
| 2 | **PADI dive sites** | [padi.com/dive-sites/koh-tao](https://www.padi.com/dive-sites/koh-tao/) | Global authority page with interactive map + filters. Lists "26 dive sites." | PADI brand authority; interactive filterable map; integrated with PADI App + PADI Adventures. | Generic — no fish-per-site data, no marine-life depth, no instructor-briefing utility, no schema markup detected, no UGC, no instructor-contributed content. |
| 3 | **Koh Tao Complete Guide** | [kohtaocompleteguide.com/diving/koh-tao-dive-sites](https://www.kohtaocompleteguide.com/diving/koh-tao-dive-sites/) | Travel guide, "15 Best Dive Sites of Koh Tao 2026." 2,800–3,200 words, BreadcrumbList + Organization JSON-LD, multilingual (EN/Thai/FR/ES/DE/CN), domain since 2015. | High word count, table of contents, photo credits, multilingual. | No interactive map, no FAQ section, static images only, no fish-per-site data, no app angle. Travel-guide framing not instructor-tool framing. |
| 4 | **Sairee Cottage Diving** | [saireecottagediving.com](https://www.saireecottagediving.com/koh-tao-dive-sites-complete-guide-to-26-incredible-locations/) | Dive school with content marketing — "Complete Guide to 26 Incredible Locations." | Long-form site guides; instructor authority. | School marketing, not a tool. No fish data, no interactive UX. |
| 5 | **Crystal Dive** | [crystaldive.com](https://www.crystaldive.com/koh-tao-dive-site-guide-crystal-dive-koh-tao/) | Major Koh Tao school. Sells the **SSI Fish Identification Course** (1 day, 2 dives). | Authority + offers in-water fish ID course. | Course is the product, not a tool. No reusable digital briefing artifact. |
| 6 | **Big Blue Diving** | [bigbluediving.com](https://www.bigbluediving.com/koh-tao-marine-life/) | Major school with a Marine Life Archive. **Quoted in their own materials as briefing with "whiteboards, maps & fish charts."** | Marine life library; one of the largest schools on Koh Tao. | Manual analog briefing tools. **They are the textbook lead for the B2B sales angle: "you're using whiteboards in 2026 — let us replace them."** |
| 7 | **dorisgonediving.com — "Instructor's Guide"** | [dorisgonediving.com/best-dive-sites-on-koh-tao](https://dorisgonediving.com/best-dive-sites-on-koh-tao/) | Single-author blog post framed as "An Instructor's Guide (2026)." | Owns long-tail "instructor's guide koh tao" framing. | **Author "Doris" has minimal credentials in schema** — Gravatar + Instagram only, no certifications, no dive count. George with 2,000+ dives can authentically claim the same framing and out-rank on E-E-A-T. |

### Adjacent / not real competitors (do not target)

- **DiversDesk, Dive Admin, DiverDash** — dive school **operations** software (bookings, paperless waivers, course management). Zero overlap with briefing UX. Could become **partners** later (briefing module that integrates with their CRM).
- **PADI App / MySSI App** — global generic; they do logbooks and eLearning, not site-specific briefing.
- **PADI flip charts, cue cards, participant guides** — physical analog products. The category George is creating.
- **DAN "A Brief on Briefings" e-learning** — educational content, not a product. Useful as a citation source for blog content.

## SERP landscape — 5 core queries

Volume estimates marked `?` are unknown; do not invent numbers in keyword-map.md either.

| Query | Top 3 organic | AI Overview cited? | Local pack? | Notes |
|---|---|---|---|---|
| `koh tao dive sites` | kohtaocompleteguide.com, saireecottagediving.com, padi.com/dive-sites/koh-tao | Not detected in this research (re-check during build) | No (this is a global query, no local pack) | Head term. Hard to rank cold. **Target as `/dive-sites` index page but lead the win with long-tail per-site pages.** |
| `koh tao fish identification` | kohtaosealife.com (dominant), bigbluediving.com Marine Life Archive, kohtaocompleteguide.com fish ID page | Not detected | No | **Direct competitor SERP — kohtaosealife.com owns it.** Avoid head-to-head; pivot to "koh tao marine life guide" or "koh tao reef fish guide" with the dive-site-context differentiator. |
| `best dive sites koh tao` | kohtaocompleteguide.com, dorisgonediving.com, justynjen.com | Not detected | No | Commercial-intent variant of head term. Same playbook. |
| `dive briefing app` | **No clear ranker.** Generic dive software (PADI App, DiveSSI, Divesoft) ranks for "dive software" but not this exact phrase. | Empty / weak | No | **CATEGORY-CREATION OPPORTUNITY.** Low volume, near-zero competition. Own this term as `/` or `/for-dive-schools` H1. |
| `dive school briefing tool` | Generic ops software (DiversDesk, Dive Admin, DiverDash) ranks for "dive school software" but not "briefing tool." | Empty | No | Same as above — wedge into B2B SERP that operations vendors aren't defending. |

### GEO gaps (where AI Overviews are weak or absent)

1. **"How do dive instructors brief students before a dive?"** — answered today by Wikipedia, DAN articles, and a Dressel Divers blog. None of those sources are commercial — wide-open citation slot.
2. **"What fish will I see at [Chumphon Pinnacle / Sail Rock / Twins / Japanese Gardens]?"** — no source aggregates fish-per-dive-site. George's data model literally has this as a JSON field. **Programmatic SEO + GEO opportunity.**
3. **"What's the best app for Koh Tao diving?"** — answered today by listicles citing PADI App and MySSI generically; no site is positioned as "the Koh Tao-specific dive companion."
4. **"How to plan a dive at [site name]"** — no AI-cited authoritative source. Per-dive-site briefing pages can fill this.
5. **"Dive briefing checklist for instructors"** — DAN and PADI blog content only. No SaaS player. George can publish a definitive long-form piece and get cited.

## Positioning angle

**One paragraph, one idea:**

A Scuba Guide is **the dive briefing tool built by an instructor with 2,000+ dives** — the only product that combines every dive site on Koh Tao with the species you'll meet there, designed to replace the whiteboard and printed flip chart that RAID, PADI, and SSI schools still use in 2026. It is not generic dive software, not a global fish ID app, and not a travel blog — it is a purpose-built briefing surface for Koh Tao instructors and the divers they teach, with a brand architecture ready to expand to other dive destinations as George covers them. Schools get free access during the early-access pilot; divers install the PWA free and arrive at their lesson already familiar with the site and the species. The wedge is the **dive-site ↔ fish association** that no competitor has, and the **briefing-first UX** that no competitor frames itself around.

This positioning rules out: "we're the cheapest," "we're a fun ID game," "we replace your whole dive ops stack," "we're a travel guide." Stay narrow: **briefing tool, by an instructor, starting with Koh Tao**.

## Content gaps George can own

These are blog / content topics that no competitor covers well — pillar content for the `/blog` section, also drives GEO citations:

1. **"How to deliver a perfect dive briefing"** — extend the DAN article with specific Koh Tao examples per site.
2. **"What to look for at [dive site]: a fish-by-fish breakdown"** — 24 articles, one per site, evergreen, programmatic.
3. **"Koh Tao species spotlight: [fish name]"** — 100+ articles, low effort, supports `/fish/[slug]` pages.
4. **"Whiteboard vs digital briefings: what dive students actually retain"** — opinion piece with instructor experience, useful for B2B sales conversations.
5. **"PADI Discover Scuba briefing: the missing visual guide"** — directly answers a query PADI's own materials don't cover well, citation-bait for the SSI/PADI student audience.
6. **"Why Koh Tao has 100+ fish species in 24 sites: a marine biology primer"** — authority content, links to conservation status data already in the app.
7. **"Setting up Fish Map for your dive school"** — B2B onboarding doc that doubles as a sales-page proof point.

## Authority / E-E-A-T story for the About page

Confirmed for v1 (Tyler will refine in Phase 2 with George):
- **2,000+ logged dives** — credible expert, not a hobbyist
- **Long-term residence in Thailand and Australia** — Koh Tao isn't a vacation — it's lived experience
- **Built the app himself** — he is the data, the engineer, and the diver

Pending confirmation in Phase 2 intake:
- Whether George owned a dive shop in Thailand (TBC — flag in `BLOCKERS.md`)
- PADI / SSI / RAID instructor credentials (rating + certification numbers)
- Schools currently using the app (any pilots? testimonials?)
- Years on Koh Tao specifically vs Thailand broadly

The About page should not ship without at least the credential rating and one schools-using quote. Tyler — please collect these from George during intake.

## Open questions for `client-intake` to resolve

These are inherited from the routing plan plus what surfaced during research:

1. **Pricing tiers** — what does George want to charge per school per month? Need 1-3 tiers to put on `/pricing`.
2. **PWA install mechanics** — does the PWA URL trigger Add-to-Home-Screen on iOS Safari, or does it need a tutorial overlay? Determines whether `/install` page is needed.
3. **Domain** — is `kohtaofishmap.com` available? `fishmap.dive`? `divebrief.app`? Tyler to register before Phase 3.
4. **Dive shop ownership** — confirm or remove from the About page.
5. **Schools currently using it** — any pilots Tyler can cite as social proof?
6. **Instructor credentials** — exact ratings, certification numbers (for schema `Person.hasCredential`).
7. **Languages in v2** — confirm English-only for v1; capture which languages matter most for v2 (probably Russian, German, French based on the dive school multilingual sites).
8. **Hosting of the existing PWA** — where does it live now? Will the marketing site link out to a separate origin (`app.kohtaofishmap.com`) or host the PWA on the same domain (`kohtaofishmap.com/app`)? Affects sitemap and CSP.
9. **B2B sales artifacts** — does George want a downloadable PDF one-pager for school managers, or just a contact form?

## Sources

- [Koh Tao Sealife — direct competitor](https://www.kohtaosealife.com/)
- [Koh Tao Complete Guide — 15 Best Dive Sites 2026](https://www.kohtaocompleteguide.com/diving/koh-tao-dive-sites/)
- [PADI Dive Sites — Koh Tao](https://www.padi.com/dive-sites/koh-tao/)
- [Sairee Cottage Diving — 26 Locations Guide](https://www.saireecottagediving.com/koh-tao-dive-sites-complete-guide-to-26-incredible-locations/)
- [Crystal Dive — SSI Fish Identification Course](https://www.crystaldive.com/fish-identification/)
- [Big Blue Diving — Marine Life Archive](https://www.bigbluediving.com/koh-tao-marine-life/)
- [Doris Gone Diving — Instructor's Guide](https://dorisgonediving.com/best-dive-sites-on-koh-tao/)
- [DiversDesk — adjacent dive ops software](https://www.diversdesk.com/)
- [Dive Admin — adjacent dive ops software](https://diveadmin.com/en)
- [DiverDash — adjacent dive ops software](https://www.diverdash.com/)
- [DAN — A Brief on Briefings](https://dan.org/alert-diver/article/a-brief-on-briefings/)
- [Wikipedia — Dive briefing](https://en.wikipedia.org/wiki/Dive_briefing)
- [Dressel Divers — 10 Pro Tips for Dive Briefings](https://www.dresseldivers.com/blog/dive-briefing/)
- [PADI Discover Scuba Diving Flip Chart on Amazon](https://www.amazon.com/Padi-Discover-Scuba-Diving-Chart/dp/B002KT5I1U) — evidence of the analog incumbent
