import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BUSINESS } from "@/lib/business";
import {
  getAllDiveSites,
  getDiveSiteBySlug,
  getFishForDiveSite,
} from "@/lib/dive-sites";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";

/**
 * Programmatic template — one URL per Koh Tao dive site (28 in v1).
 * Source: lib/data/diveSites.json (copied from the PWA).
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllDiveSites().map((s) => ({ slug: s.id }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const site = getDiveSiteBySlug(params.slug);
  if (!site) return {};
  return {
    title: `${site.name} Dive Site Guide — Depth & Fish | ${BUSINESS.name}`,
    description: `${site.name}: ${site.depth}, ${site.difficulty.toLowerCase()}. ${site.highlights.slice(0, 3).join(", ")}. Full species list and briefing.`,
    alternates: { canonical: `/dive-sites/${site.id}` },
  };
}

function placeJsonLd(site: ReturnType<typeof getDiveSiteBySlug>) {
  if (!site) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${BUSINESS.url}/dive-sites/${site.id}#place`,
    name: site.name,
    description: site.description,
    url: `${BUSINESS.url}/dive-sites/${site.id}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.lat,
      longitude: site.lng,
    },
    containedInPlace: {
      "@type": "Place",
      name: "Koh Tao, Thailand",
    },
    touristType: ["Scuba divers", "Dive instructors", "Snorkelers"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function DiveSitePage({ params }: { params: Params }) {
  const site = getDiveSiteBySlug(params.slug);
  if (!site) notFound();

  const fish = getFishForDiveSite(site.id);

  const faqs: FaqItem[] = [
    {
      question: `What is the depth of ${site.name}?`,
      answer: `${site.name} sits at ${site.depth} and is rated ${site.difficulty.toLowerCase()} for recreational divers.`,
    },
    {
      question: `What will I see at ${site.name}?`,
      answer:
        site.highlights.length > 0
          ? `Highlights include ${site.highlights.join(", ")}. ` +
            (fish.length > 0
              ? `Recorded species at this site include ${fish
                  .slice(0, 5)
                  .map((f) => f.name)
                  .join(", ")}.`
              : "")
          : site.description,
    },
    {
      question: `Is ${site.name} suitable for beginners?`,
      answer:
        site.difficulty === "Beginner"
          ? `Yes. ${site.name} is one of Koh Tao's beginner sites — shallow, gentle current, and dense reef life.`
          : site.difficulty === "Intermediate"
          ? `${site.name} is rated intermediate. It suits Open Water divers who are comfortable with depth and basic current.`
          : `${site.name} is an advanced site. It is best for Advanced Open Water divers and above with experience handling depth, current, or technical considerations.`,
    },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {placeJsonLd(site)}
      <BreadcrumbSchema
        crumbs={[
          { name: "Dive sites", path: "/dive-sites" },
          { name: site.name, path: `/dive-sites/${site.id}` },
        ]}
      />
      <FaqSchema faqs={faqs} />

      <p className="text-sm uppercase tracking-wide text-neutral-500">
        <Link href="/dive-sites">Koh Tao dive sites</Link> &middot; {site.difficulty} &middot; {site.depth}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        {site.name}: depth, marine life and what to expect
      </h1>
      <p className="mt-6 text-lg text-neutral-700">{site.description}</p>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Depth</p>
          <p className="mt-1 text-lg font-semibold">{site.depth}</p>
        </div>
        <div className="rounded-lg border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Difficulty</p>
          <p className="mt-1 text-lg font-semibold">{site.difficulty}</p>
        </div>
        <div className="rounded-lg border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Coordinates</p>
          <p className="mt-1 text-sm">
            {site.lat.toFixed(4)}, {site.lng.toFixed(4)}
          </p>
        </div>
      </section>

      {site.highlights.length > 0 && (
        <section className="mt-10 space-y-3">
          <h2 className="text-2xl font-semibold">Highlights</h2>
          <ul className="list-disc space-y-1 pl-6">
            {site.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-semibold">Fish you&apos;ll see at {site.name}</h2>
        {fish.length === 0 ? (
          <p className="text-neutral-600">
            We haven&apos;t mapped specific species to {site.name} yet. See the{" "}
            <Link href="/fish">full Koh Tao species list &rarr;</Link>
          </p>
        ) : (
          <>
            <p>
              {fish.length} species recorded at {site.name}. Each is a working
              entry in the briefing tool — tap through to read its behavior and
              the other Koh Tao sites where you can find it.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {fish.map((f) => (
                <li key={f.id}>
                  <Link href={`/fish/${f.id}`} className="block rounded border border-neutral-200 p-2 no-underline hover:bg-neutral-50">
                    <span aria-hidden className="mr-2">{f.emoji}</span>
                    <span className="font-medium text-neutral-900">{f.name}</span>
                    <span className="ml-2 text-xs italic text-neutral-500">{f.scientificName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
        <dl className="space-y-6">
          {faqs.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold">{f.question}</dt>
              <dd className="mt-1 text-neutral-700">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 rounded-lg border border-neutral-200 p-6">
        <h2 className="text-2xl font-semibold">Brief this dive in two minutes</h2>
        <p className="mt-2 text-neutral-700">
          Open the {BUSINESS.name} app to see {site.name} on the map with the full
          species list, depth profile and offline support.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/koh-tao"
            className="rounded-md border border-neutral-900 px-4 py-2 font-medium"
          >
            Open the app
          </Link>
          <Link
            href="/dive-sites"
            className="rounded-md border border-neutral-300 px-4 py-2 font-medium"
          >
            All dive sites
          </Link>
        </div>
      </section>
    </main>
  );
}
