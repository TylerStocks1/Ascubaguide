import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { getAllDiveSites, DIVE_SITE_COUNT } from "@/lib/dive-sites";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";

export const metadata: Metadata = {
  title: `Koh Tao Dive Sites — Interactive Map of All ${DIVE_SITE_COUNT} | ${BUSINESS.name}`,
  description: `Explore all ${DIVE_SITE_COUNT} dive sites around Koh Tao with depth, difficulty, hand-drawn maps and the fish you'll see. Tap any site to brief it.`,
  alternates: { canonical: "/dive-sites" },
};

const FAQS: FaqItem[] = [
  {
    question: "How many dive sites are there on Koh Tao?",
    answer: `Koh Tao has roughly 25 named dive sites in regular rotation. A Scuba Guide indexes ${DIVE_SITE_COUNT} of them — every site you would actually be taken to from a Mae Haad, Sairee or Chalok dive shop.`,
  },
  {
    question: "Which Koh Tao dive site is best for beginners?",
    answer:
      "Japanese Gardens, Twins, and White Rock are the standard beginner sites. They sit between 5 and 18 metres, have light current, and offer dense reef life. Each has a full briefing on its dive site page.",
  },
  {
    question: "Where can you see whale sharks on Koh Tao?",
    answer:
      "Chumphon Pinnacle and Sail Rock are the famous whale shark sites. The season is roughly March to June, but sightings happen year-round at both pinnacles. Each site page has the depth profile and what to expect.",
  },
  {
    question: "Are the depth and difficulty ratings standardised?",
    answer:
      "Yes — they match what RAID, PADI and SSI dive schools on Koh Tao use in their own briefings. Beginner sites stay shallow with no current; advanced sites are deeper, with current, drift, or technical considerations.",
  },
];

export default function DiveSitesIndexPage() {
  const sites = getAllDiveSites();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <BreadcrumbSchema crumbs={[{ name: "Dive sites", path: "/dive-sites" }]} />
      <FaqSchema faqs={FAQS} />

      <p className="text-sm uppercase tracking-wide text-neutral-500">Koh Tao, Thailand</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Every dive site on Koh Tao, mapped and briefed
      </h1>
      <p className="mt-6 text-lg text-neutral-700">
        All {DIVE_SITE_COUNT} dive sites Koh Tao&apos;s RAID, PADI and SSI schools
        actually take students to — with depth, difficulty, what to expect, and a
        cross-linked species list for each one. Tap any site to brief it.
      </p>

      <section className="mt-10">
        <h2 className="sr-only">All dive sites</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {sites.map((site) => (
            <li
              key={site.id}
              className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50"
            >
              <Link href={`/dive-sites/${site.id}`} className="block no-underline">
                <p className="text-lg font-semibold text-neutral-900">{site.name}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">
                  {site.depth} &middot; {site.difficulty}
                </p>
                <p className="mt-2 line-clamp-3 text-sm text-neutral-700">
                  {site.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
        <dl className="space-y-6">
          {FAQS.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold">{f.question}</dt>
              <dd className="mt-1 text-neutral-700">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 rounded-lg border border-neutral-200 p-6">
        <h2 className="text-2xl font-semibold">Open the briefing app</h2>
        <p className="mt-2 text-neutral-700">
          See the same data on a map, with offline support and a tappable view
          built for the day boat.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/koh-tao"
            className="rounded-md border border-neutral-900 px-4 py-2 font-medium"
          >
            Open the app
          </Link>
          <Link
            href="/fish"
            className="rounded-md border border-neutral-300 px-4 py-2 font-medium"
          >
            Browse fish species &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
