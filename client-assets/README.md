# client-assets/

Drop site of all real client-supplied content for **A Scuba Guide**. This folder is the **only** place the marketing site loads brand assets from. If something isn't here, the site renders a placeholder — never an invented value.

## Folder layout (create as needed)

```
client-assets/
├── README.md            ← this file
├── colors.md            ← brand color tokens (Phase 4 fills)
├── logo/                ← SVG (preferred) + PNG fallback, transparent bg
├── photos/
│   ├── george/          ← headshot, dive-gear photos for About page
│   ├── dive-sites/      ← George's own underwater photos of Koh Tao sites
│   └── fish/            ← (likely empty in v1 — George doesn't have these)
├── fonts/               ← only if Tyler picks self-hosted fonts in Phase 4
└── docs/                ← e.g. one-pager PDF for B2B (if Tyler creates one)
```

## Hard rules

1. **Never invent.** No stock photos masquerading as George's work. No AI-generated dive-site images. If a slot is empty, the site uses a dark gradient placeholder, not a guess.
2. **Filename is the alt text source.** Name files like `chumphon-pinnacle-pinnacle-cluster-2024.jpg` — `site-structure` reads filenames into alt text fallbacks.
3. **Photos must be JPG or AVIF**, ≤ 500 KB each. Resize before dropping.
4. **Logo must be SVG** for the live site. PNG only as a fallback for share images.

## Current status (Phase 2 intake)

- `colors.md` — placeholder, awaiting Phase 4
- `logo/` — empty, Phase 4 will create
- `photos/george/` — empty, **BLOCKER**: Tyler to collect headshot from George
- `photos/dive-sites/` — empty, **BLOCKER**: Tyler confirmed George has these — needs to send
- `photos/fish/` — likely permanently empty for v1
- `fonts/` — empty until Phase 4 decision
- `docs/` — empty unless George wants a B2B one-pager
