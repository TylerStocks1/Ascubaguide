# BLOCKERS — must resolve before push

> **Hard rule:** `site-structure` (Phase 3) refuses to push to main while any line below is unresolved. Building locally is fine — pushing live is not. When a blocker is resolved, **delete the line** (do not check it off). An empty list = clear to push.

## Domain & access

- [ ] **Register `ascubaguide.com`** — required before DNS, hosting setup, public email, sitemap canonical, schema. Tyler to purchase via registrar of choice and add Cloudflare nameservers.
- [ ] **Set up public email at `@ascubaguide.com`** — depends on the domain being live. Address goes in footer, schema `Person.contactPoint`, contact form recipient. Tyler picks: `george@`, `hello@`, `pilot@`, etc.
- [ ] **Cloudflare Pages project created** under Stocks Local's Cloudflare account, linked to whatever Git remote Phase 3 picks. Tyler to confirm the GitHub/GitLab repo location before scaffolding.

## George's identity & E-E-A-T (Tyler must ask George)

- [ ] **RAID instructor certification number** — needed for `Person.hasCredential` JSON-LD. Without it the schema is a vague claim.
- [ ] **Confirm OR remove the dive shop ownership claim** — Phase 1 captured "possibly former dive shop owner." Likely a confusion with the Hydronauts employment. Tyler to ask George explicitly: did you ever own a dive shop, or only work at one? If unconfirmed, this claim is removed from the About page.
- [ ] **Years on Koh Tao specifically** — Tyler reported "2,000 dives in ~4 years." Need to know whether all 4 years were on Koh Tao or split with Australia/elsewhere. Affects bio phrasing.
- [ ] **Confirm Hydronauts employment dates and whether it can be cited in the bio** — George worked at [Hydronauts Diving Resort](https://hydronautsdiving.com/) (verified RAID-only Koh Tao school). Need a date range and George's permission to mention them by name.
- [ ] **Verify Instagram ownership** — [@blizzintheblue](https://www.instagram.com/blizzintheblue/) is gated behind login. Tyler must confirm with George that this is his real account before it goes into schema `sameAs` or About-page links. A wrong handle in `sameAs` is a discoverability bug.

## Photo + content assets (Tyler to collect from George)

- [ ] **George's headshot or dive-gear photo** — for About page hero. Site refuses to ship the About page without it. Place at `client-assets/photos/george/`.
- [ ] **George's own underwater dive site photos** — Tyler confirmed George has these. They replace or supplement the 9 hand-drawn site maps in the existing app. Critical authenticity asset. Place at `client-assets/photos/dive-sites/`. Filename convention: `[site-slug]-[short-descriptor].jpg`.

## Pricing & pilots (Tyler / George decision)

- [ ] **Post-pilot pricing tiers** — v1 ships as "Free during early access," but `/pricing` needs at least placeholder tiers ("from $X/month per shop") for the eventual GA launch. Until decided, the page shows only the free-pilot CTA.
- [ ] **List of pilot dive schools** — any schools currently using or piloting the app? Names + permission to cite. Required for the homepage trust row to ship with real names. If empty at launch, the trust row is hidden, not faked.

## Phase 3 architecture sequencing decision

- [ ] **Decide how to host the existing PWA at `/koh-tao`** — the existing app at `G:\Websites\Fish app` (React 19 + Vite + Leaflet + Tailwind 4) needs to live at `ascubaguide.com/koh-tao`. Two paths:
  - **(a) Port it into Next.js App Router** as `app/koh-tao/...` route group. Highest effort, best SEO, single-codebase. Map library and Tailwind config need migration.
  - **(b) Build it separately** and serve the `dist/` output as static assets at `/koh-tao` via a Cloudflare Pages function or `_routes.json` rule. Lower effort, two codebases to maintain.
  - **`site-structure` must pick one before scaffolding.** Don't half-build.

## Legal (light, non-commercial v1)

- [ ] **Privacy policy boilerplate** — must exist by launch. Short, covers contact form data + Cloudflare Web Analytics only. No cookies, no third-party tracking. Stocks Local can draft from a template; no lawyer needed for v1.

## Soft (non-blocking — site can ship without, but flag for follow-up)

- [ ] **FAQ source content** — 6 real questions George gets asked by school managers. v1 can synthesise FAQs from the market brief; better content lands later.
- [ ] **Hydronauts launch endorsement** — Tyler asked George whether Hydronauts will give a quote + logo for the trust row. Soft ask — site ships without if no answer by launch.
- [ ] **George's LinkedIn URL** — for `sameAs` if he has one. Optional.
- [ ] **B2B one-pager PDF** — Tyler hasn't decided whether `/for-dive-schools` needs a downloadable PDF. Soft. Add later if pilot shops ask for one.
- [ ] **v2 language list** — likely Russian, German, French based on the multilingual Koh Tao dive school landscape. Out of scope for v1; capture as Phase 5+ scope.
