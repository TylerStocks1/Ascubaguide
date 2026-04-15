# Deploying A Scuba Guide to Cloudflare Pages

Reference for Tyler. You should only need this the first time you link the
repo to a Cloudflare Pages project. After that, every push to `main`
triggers an automatic build.

## What's already in the repo

- **`wrangler.toml`** — Wrangler CLI config. Names the project
  `ascubaguide`, sets `compatibility_date`, enables `nodejs_compat`,
  points `pages_build_output_dir` at `.vercel/output/static` (which is
  where `@cloudflare/next-on-pages` writes its bundle).
- **`public/_routes.json`** — tells Pages to serve static assets
  (`/images`, `/videos`, `/frames`, the `/koh-tao` PWA mount, etc.)
  direct from the edge without invoking the Functions runtime. Cheap
  + fast.
- **`@cloudflare/next-on-pages`** (devDependency) — Cloudflare's
  official adapter. Converts Next.js 14 App Router output into
  Workers-compatible functions. Pinned to `^1.13.10` because `1.13.16+`
  bumped its peer range to Next.js 14.3+ and we're on stable 14.2.x.
- **`wrangler`** (devDependency) — CLI for local preview + manual deploys.
- **`npm run pages:build`** — runs `@cloudflare/next-on-pages`, writes
  to `.vercel/output/static`.
- **`npm run pages:preview`** — builds + serves the production bundle
  locally via Wrangler.
- **`npm run pages:deploy`** — builds + pushes to Cloudflare directly
  via Wrangler CLI (requires `wrangler login` first).

## Recommended: connect via Git (hands-off)

This is the setup Stocks Local should use for client sites. Every push
to `main` builds + deploys automatically.

1. **Log in to Cloudflare Dashboard** → Workers & Pages → Create
   application → Pages → Connect to Git.
2. **Select the GitHub repo**
   `https://github.com/TylerStocks1/Ascubaguide`.
3. **Set the production branch**: `main`.
4. **Build settings**:
   - Framework preset: **Next.js**
   - Build command: `npm run pages:build`
   - Build output directory: `.vercel/output/static`
   - Root directory: `/` (leave default)
5. **Environment variables** (Production + Preview):
   - `NODE_VERSION` = `20` (or `22`, whichever is latest LTS supported
     by Pages — check `wrangler --version`'s Node compat for reference)
6. **Compatibility flags** (Settings → Functions → Compatibility
   flags): add `nodejs_compat`. This mirrors `wrangler.toml` and is
   required for `@cloudflare/next-on-pages` to run.
7. **Save and deploy.** First build takes 3–5 minutes.

Cloudflare will give you a preview URL like
`https://ascubaguide.pages.dev`. Verify:
- Hero loads + the canvas frame sequence scrubs correctly
- Interior pages (`/dive-sites`, `/fish`, `/about`, `/pricing`, etc.)
  render
- `/koh-tao` route falls through to `public/koh-tao/index.html`
  (currently the PWA placeholder — will be the real Vite app once
  George's bundle is copied in)

## Custom domain

Once `ascubaguide.com` is registered:

1. Cloudflare Dashboard → Pages project → Custom domains → Set up a
   custom domain → enter `ascubaguide.com` and `www.ascubaguide.com`.
2. Cloudflare will either auto-update DNS (if the domain is already
   on Cloudflare) or give you the records to add elsewhere.
3. Once DNS propagates and the cert provisions (a few minutes),
   `https://ascubaguide.com` should serve the same build.
4. Update `lib/business.ts` `BUSINESS.url` if the canonical origin
   changes (it's already `https://ascubaguide.com` so this should be
   a no-op).

## Manual deploy (Wrangler CLI)

For one-off deploys without going through GitHub:

```bash
npx wrangler login            # one-time, opens browser for OAuth
npm run pages:deploy          # builds + pushes
```

Wrangler will ask which Pages project to deploy to (select
`ascubaguide`).

## Local production preview

Test the actual Cloudflare Pages bundle locally before pushing:

```bash
npm run pages:preview
```

Serves on `http://localhost:8788` via Wrangler. This runs the same
bundle Cloudflare will serve in production, including the Functions
runtime — useful for catching adapter bugs that `npm run dev` misses.

## What Cloudflare Pages does NOT handle

- **Domain registration.** Buy `ascubaguide.com` separately (registrar
  of choice, e.g. Cloudflare Registrar or Namecheap).
- **Email hosting.** If you want `hello@ascubaguide.com` to work,
  you'll need a separate email service (Cloudflare Email Routing is
  free and forwards to a Gmail inbox).
- **Analytics.** Cloudflare Web Analytics is free + cookieless; enable
  it in the Pages project dashboard under Analytics.
- **Form submissions.** If `/contact` ever needs a real form (not
  just a `mailto:`), add a Cloudflare Worker or a hosted form endpoint
  (Formspree, Basin, etc.) — Pages itself doesn't handle form POSTs.

## BLOCKERS before going live

See [BLOCKERS.md](BLOCKERS.md). Even once the Pages project is linked
and the build is green, `ascubaguide.com` should not publicly launch
until the hard-blocker items (real domain registered, George's RAID
certification number, headshot, dive-shop-ownership confirmation,
Hydronauts permission, privacy policy boilerplate) are resolved.
