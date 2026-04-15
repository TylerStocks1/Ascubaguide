"use client";

import Link from "next/link";
import { BUSINESS } from "@/lib/business";

/**
 * Sitewide floating nav.
 *
 * One dark glass pill that sits fixed at the top of the viewport on
 * every page (homepage + interior). Replaces the old
 * components/marketing/Nav.tsx (light-theme interior nav) and the
 * internal HeroNav that used to live inside HeroScrollVideo.tsx.
 *
 * Link set per Tyler's feedback (2026-04-15 round 2):
 *   - Drop "Dive sites" and "Species" — that content belongs in the
 *     PWA itself, not on the marketing site.
 *   - Add "Try the app" → /app (placeholder until the Vite PWA is
 *     wired up at /koh-tao).
 *   - Keep "For schools" and "About" — the two content pages Tyler
 *     explicitly wants alive.
 *   - "Open the app" → "Download app" → /download. Also a placeholder
 *     since the app isn't in the app stores yet.
 *
 * Rendered from app/layout.tsx so every route picks it up for free.
 */
export function FloatingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-[11px] uppercase tracking-[0.1em] text-white shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-[80px]"
      >
        <Link
          href="/"
          className="whitespace-nowrap text-sm font-black tracking-tight no-underline"
        >
          {BUSINESS.name}
        </Link>

        <ul className="hidden items-center gap-6 sm:flex">
          <li>
            <Link
              href="/app"
              className="whitespace-nowrap no-underline transition hover:text-white/60"
            >
              Try the app
            </Link>
          </li>
          <li>
            <Link
              href="/for-dive-schools"
              className="whitespace-nowrap no-underline transition hover:text-white/60"
            >
              For schools
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="whitespace-nowrap no-underline transition hover:text-white/60"
            >
              About
            </Link>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Open menu"
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 bg-white/5 sm:hidden"
        >
          <span aria-hidden className="flex flex-col gap-1">
            <span className="block h-[1.5px] w-4 bg-white" />
            <span className="block h-[1.5px] w-4 bg-white" />
            <span className="block h-[1.5px] w-4 bg-white" />
          </span>
        </button>

        <Link
          href="/download"
          className="whitespace-nowrap rounded-full border border-white/30 bg-white/15 px-4 py-2 no-underline transition hover:bg-white/25"
        >
          Download app
        </Link>
      </nav>
    </header>
  );
}
