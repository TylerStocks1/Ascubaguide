"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS } from "@/lib/business";

/**
 * Shared marketing nav.
 *
 * On the homepage (`/`), this component renders NOTHING — the
 * HeroScrollVideo component provides its own floating overlay nav that sits
 * on top of the video background. Rendering this nav above it would stack
 * two navs at the top of the page.
 *
 * On every other page, this renders the plain semantic nav used across the
 * rest of the site. Phase 4 will style the interior-page nav separately
 * once the design direction is locked.
 */
export function Nav() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="border-b border-neutral-200">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 text-sm"
      >
        <Link href="/" className="font-semibold tracking-tight">
          {BUSINESS.name}
        </Link>
        <ul className="flex flex-wrap items-center gap-4">
          <li>
            <Link href="/for-dive-schools">For dive schools</Link>
          </li>
          <li>
            <Link href="/for-divers">For divers</Link>
          </li>
          <li>
            <Link href="/dive-sites">Dive sites</Link>
          </li>
          <li>
            <Link href="/fish">Fish</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/pricing">Pricing</Link>
          </li>
          <li>
            <Link
              href="/koh-tao"
              className="rounded-md border border-neutral-900 px-3 py-1 font-medium"
            >
              Open the app
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
