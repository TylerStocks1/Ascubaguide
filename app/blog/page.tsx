import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  // Using `absolute` because the default "%s | A Scuba Guide" template
  // would produce "... Blog ... | A Scuba Guide" — redundant since the
  // title already contains the brand name.
  title: { absolute: `${BUSINESS.name} Blog — Briefing Tips & Koh Tao Marine Life` },
  description: `Field-tested briefing techniques, dive-site write-ups, and Koh Tao species deep-dives from ${OWNER.name} and ${BUSINESS.name}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <BreadcrumbSchema crumbs={[{ name: "Blog", path: "/blog" }]} />

      <p className="text-sm uppercase tracking-wide text-neutral-500">Field notes</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Briefings, marine life and Koh Tao field notes
      </h1>
      <p className="mt-6 text-lg text-neutral-700">
        Field-tested briefing techniques, dive-site write-ups and Koh Tao species
        deep-dives from {OWNER.name}. The blog is intentionally empty until
        there&apos;s something worth saying — every post will come from real
        instructor experience, not generated filler.
      </p>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Coming soon</h2>
        <p>The first posts will be:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            How to brief Chumphon Pinnacle so your students actually retain the
            depth profile.
          </li>
          <li>
            Why titan triggerfish charge — the cone, the nest, and how to read
            the warning signs.
          </li>
          <li>
            Whale shark season on Koh Tao: what the data actually says vs the
            shop window posters.
          </li>
        </ul>
        <p>
          Want one of these prioritised? <Link href="/contact">Tell {OWNER.firstName} which.</Link>
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Until then</h2>
        <p>
          The dive site and species pages are the meat of the site, and they are
          ready right now.
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <Link href="/dive-sites">All Koh Tao dive sites</Link>
          </li>
          <li>
            <Link href="/fish">All Koh Tao species</Link>
          </li>
          <li>
            <Link href="/about">About {OWNER.firstName}</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
