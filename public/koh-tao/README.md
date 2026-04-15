# `/koh-tao` — Koh Tao PWA mount point

This directory is the deploy target for the **Koh Tao Fish Map PWA** built in
`G:\Websites\Fish app` (React 19 + Vite 8 + Leaflet + Tailwind 4 + Framer
Motion + vanilla service worker).

The marketing site (Next.js, this repo) does **not** import the PWA's source
code. The PWA is built separately and its `dist/` output is copied here as
static assets, then served at `https://ascubaguide.com/koh-tao` by Cloudflare
Pages alongside the marketing site.

## Why path-based, same origin

Locked architectural decision (see `client-brief.md`):

> **PWA hosts at `ascubaguide.com/koh-tao` path-based, same origin as the
> marketing site.** No subdomain. No separate Cloudflare Pages project.

This keeps the PWA cookie-free, schema-discoverable from the marketing site,
and avoids CORS or CSP friction.

## Deploy pipeline

1. In `G:\Websites\Fish app`, set Vite `base` to `/koh-tao/`:
   ```js
   // vite.config.js
   export default defineConfig({
     base: "/koh-tao/",
     // ...
   });
   ```
2. In the same project, scope the service worker registration to `/koh-tao/`
   so it doesn't clobber the marketing site's root scope:
   ```js
   navigator.serviceWorker.register("/koh-tao/sw.js", { scope: "/koh-tao/" });
   ```
3. Build: `npm run build` (writes to `G:\Websites\Fish app\dist\`).
4. Copy the `dist/` contents into this directory:
   ```bash
   rm -rf G:/Websites/3DGeorgeWebsite/public/koh-tao/*
   cp -R G:/Websites/Fish\ app/dist/* G:/Websites/3DGeorgeWebsite/public/koh-tao/
   ```
5. Commit and push the marketing site. Cloudflare Pages serves the new PWA
   bundle at `/koh-tao` automatically — no extra config.

## What you'll see right now

This directory currently contains a **placeholder** `index.html` only. The real
PWA bundle has not been built and copied yet — that step happens once the
domain is registered and the existing PWA app is rebranded from "Koh Tao Fish
Map" to "A Scuba Guide" (still pending — see `BLOCKERS.md` and the README in
`G:\Websites\Fish app`).

## Next.js routing note

The marketing site uses a rewrite in `next.config.mjs` so that visiting
`/koh-tao` (no trailing slash) loads `/koh-tao/index.html` in both `next dev`
and the Cloudflare Pages production deploy. This means **do not create an
`app/koh-tao/page.tsx`** — it would shadow the static PWA bundle.

## What to NOT touch

- **Do not edit files inside this directory by hand.** They are generated
  artifacts from the Vite build.
- **Do not delete `index.html` until the real PWA bundle is copied in** —
  Cloudflare Pages will 404 the route otherwise.
- **Do not import from this directory in Next.js code.** The marketing site
  and the PWA share data files (`lib/data/`) but no JavaScript or CSS.
