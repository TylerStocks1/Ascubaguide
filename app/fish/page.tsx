import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { getAllFish, FISH_COUNT } from "@/lib/fish";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";

export const metadata: Metadata = {
  // Brand suffix applied by the layout's title template.
  title: `Koh Tao Marine Life — ${FISH_COUNT}+ Species`,
  description: `Browse ${FISH_COUNT}+ fish, sharks and invertebrates of Koh Tao — filtered by dive site, depth and behavior. The only fish library tied to real dive briefings.`,
  alternates: { canonical: "/fish" },
};

const FAQS: FaqItem[] = [
  {
    question: "How many fish species live around Koh Tao?",
    answer: `Koh Tao reefs are home to several hundred fish species across reef, pelagic and bottom-dweller niches. A Scuba Guide currently indexes ${FISH_COUNT}+ — the species you actually see during a typical dive.`,
  },
  {
    question: "What is the most famous Koh Tao species?",
    answer:
      "The whale shark. Koh Tao sits on a seasonal whale shark migration corridor, with most sightings at Chumphon Pinnacle and Sail Rock between March and June. Other headliners include bull sharks, blacktip reef sharks, hawksbill turtles, and titan triggerfish.",
  },
  {
    question: "Are there dangerous fish on Koh Tao?",
    answer:
      "Titan triggerfish are the most reliable hazard — when nesting they will charge a diver who enters their cone-shaped territory. Lionfish, scorpionfish and stonefish also carry venomous spines but are not aggressive. Every species page lists known behavior and how to read it.",
  },
  {
    question: "How is this fish guide different from the others?",
    answer:
      "Every species is cross-linked to the dive sites where you can actually find it — and every dive site is cross-linked back to its species. Other Koh Tao fish identification guides treat species as a flat catalogue. We treat them as a briefing tool.",
  },
];

export default function FishIndexPage() {
  const fish = getAllFish();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <BreadcrumbSchema crumbs={[{ name: "Fish", path: "/fish" }]} />
      <FaqSchema faqs={FAQS} />

      <p className="text-sm uppercase tracking-wide text-neutral-500">Marine life of Koh Tao</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        The marine life of Koh Tao, organised by where you&apos;ll meet it
      </h1>
      <p className="mt-6 text-lg text-neutral-700">
        {FISH_COUNT}+ fish, sharks, rays and invertebrates you might encounter on a
        Koh Tao dive — every species cross-linked to the dive sites where it has
        been recorded. The only Koh Tao fish library built into a working
        instructor&apos;s briefing tool.
      </p>

      <section className="mt-10">
        <h2 className="sr-only">All species</h2>
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {fish.map((f) => (
            <li
              key={f.id}
              className="rounded-lg border border-neutral-200 p-3 hover:bg-neutral-50"
            >
              <Link href={`/fish/${f.id}`} className="block no-underline">
                <p className="text-base font-semibold text-neutral-900">
                  <span aria-hidden className="mr-2">{f.emoji}</span>
                  {f.name}
                </p>
                <p className="mt-0.5 text-xs italic text-neutral-500">{f.scientificName}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">
                  {f.niche} &middot; {f.depthRange}
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
        <h2 className="text-2xl font-semibold">Brief your dive</h2>
        <p className="mt-2 text-neutral-700">
          Pair this with the dive site index — every dive site lists the species
          you&apos;ll see there.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/dive-sites"
            className="rounded-md border border-neutral-900 px-4 py-2 font-medium"
          >
            All dive sites &rarr;
          </Link>
          <Link
            href="/koh-tao"
            className="rounded-md border border-neutral-300 px-4 py-2 font-medium"
          >
            Open the app
          </Link>
        </div>
      </section>
    </main>
  );
}
