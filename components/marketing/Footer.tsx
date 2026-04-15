import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-neutral-200">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-semibold">{BUSINESS.name}</p>
            <p className="mt-2 text-neutral-600">{BUSINESS.tagline}</p>
          </div>
          <div>
            <p className="font-semibold">Product</p>
            <ul className="mt-2 space-y-1">
              <li><Link href="/for-dive-schools">For dive schools</Link></li>
              <li><Link href="/for-divers">For divers</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/install">Install the app</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Koh Tao</p>
            <ul className="mt-2 space-y-1">
              <li><Link href="/dive-sites">Dive sites</Link></li>
              <li><Link href="/fish">Fish species</Link></li>
              <li><Link href="/koh-tao">Open the app</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Company</p>
            <ul className="mt-2 space-y-1">
              <li><Link href="/about">About {OWNER.firstName}</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-500">
          <p>
            &copy; {year} {OWNER.name}. {BUSINESS.name} is a software tool, not a dive operator.
          </p>
          <p>
            Website by{" "}
            {/*
              rel="nofollow" is required by Google for commercial attribution
              links per seo-geo-implementation skill. Do not remove without
              reading that skill's "What NOT to Do" section.
            */}
            <a
              href="https://stockslocal.co.uk"
              className="underline"
              rel="nofollow noopener"
              target="_blank"
            >
              Stocks Local
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
