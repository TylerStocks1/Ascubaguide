import Link from "next/link";
import { BUSINESS } from "@/lib/business";

/**
 * Plain semantic nav. No styling beyond default Tailwind. Phase 4 redesigns.
 */
export function Nav() {
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
