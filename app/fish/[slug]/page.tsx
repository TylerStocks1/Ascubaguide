import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BUSINESS } from "@/lib/business";
import { getAllFish, getFishBySlug } from "@/lib/fish";
import { getDiveSiteBySlug } from "@/lib/dive-sites";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";

/**
 * Programmatic template — one URL per fish species (~91 in v1).
 * Source: lib/data/fishSpecies.json (rich) + lib/data/fishIndex.json (light).
 *
 * Fields are optional because the two source files have different schemas.
 * Render NULL gracefully — never invent values.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllFish().map((f) => ({ slug: f.id }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const fish = getFishBySlug(params.slug);
  if (!fish) return {};
  // Title pattern fits the longest species name ("Blue-spotted Ribbontail
  // Ray, Koh Tao" = 52 chars with brand) under the 60-char ceiling.
  // Primary keyword "[species] koh tao" is preserved.
  // Brand suffix applied by the layout's "%s | A Scuba Guide" template.
  return {
    title: `${fish.name}, Koh Tao`,
    description: `${fish.name} (${fish.scientificName}) on Koh Tao: depth range, behavior, ${
      fish.sites?.length ? "where to find it" : "habitat and diet"
    }. Built into the ${BUSINESS.name} briefing tool.`,
    alternates: { canonical: `/fish/${fish.id}` },
  };
}

function articleJsonLd(fish: ReturnType<typeof getFishBySlug>) {
  if (!fish) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BUSINESS.url}/fish/${fish.id}#article`,
    headline: `${fish.name} (${fish.scientificName}) — Koh Tao field guide`,
    name: fish.name,
    alternativeHeadline: fish.scientificName,
    about: {
      "@type": "Thing",
      name: fish.name,
      alternateName: fish.scientificName,
    },
    url: `${BUSINESS.url}/fish/${fish.id}`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${BUSINESS.url}#website`,
      name: BUSINESS.name,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function FishPage({ params }: { params: Params }) {
  const fish = getFishBySlug(params.slug);
  if (!fish) notFound();

  const recordedSites =
    fish.sites
      ?.map((slug) => getDiveSiteBySlug(slug))
      .filter((s): s is NonNullable<typeof s> => Boolean(s)) ?? [];

  const faqs: FaqItem[] = [
    {
      question: `Where can I see ${fish.name} on Koh Tao?`,
      answer:
        recordedSites.length > 0
          ? `${fish.name} has been recorded at ${recordedSites
              .map((s) => s.name)
              .join(", ")}. Each linked dive site page has the depth, difficulty and full briefing.`
          : `${fish.name} is part of the Koh Tao reef community. We haven't yet mapped this species to specific dive sites — get in touch if you'd like to contribute a sighting.`,
    },
    {
      question: `What depth does ${fish.name} live at?`,
      answer: `${fish.name} is found at ${fish.depthRange}. Plan your dive profile accordingly.`,
    },
    {
      question: `What does ${fish.name} eat?`,
      answer: `${fish.diet}.`,
    },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {articleJsonLd(fish)}
      <BreadcrumbSchema
        crumbs={[
          { name: "Fish", path: "/fish" },
          { name: fish.name, path: `/fish/${fish.id}` },
        ]}
      />
      <FaqSchema faqs={faqs} />

      <p className="text-sm uppercase tracking-wide text-neutral-500">
        <Link href="/fish">Koh Tao marine life</Link> &middot; {fish.niche} &middot; {fish.depthRange}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        <span aria-hidden className="mr-3">{fish.emoji}</span>
        {fish.name} &mdash; where, when and how to spot one on Koh Tao
      </h1>
      <p className="mt-2 text-lg italic text-neutral-500">{fish.scientificName}</p>
      <p className="mt-6 text-lg text-neutral-700">
        {fish.name} ({fish.scientificName}) is a {fish.niche} species you can
        encounter on Koh Tao at {fish.depthRange}. {fish.funFact}
      </p>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {fish.habitat && (
          <div className="rounded-lg border border-neutral-200 p-4">
            <p className="text-xs uppercase tracking-wide text-neutral-500">Habitat</p>
            <p className="mt-1">{fish.habitat}</p>
          </div>
        )}
        <div className="rounded-lg border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Depth</p>
          <p className="mt-1">{fish.depthRange}</p>
        </div>
        <div className="rounded-lg border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Diet</p>
          <p className="mt-1">{fish.diet}</p>
        </div>
        <div className="rounded-lg border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Conservation status</p>
          <p className="mt-1">{fish.conservationStatus}</p>
        </div>
        {fish.maxLength && (
          <div className="rounded-lg border border-neutral-200 p-4">
            <p className="text-xs uppercase tracking-wide text-neutral-500">Max length</p>
            <p className="mt-1">{fish.maxLength}</p>
          </div>
        )}
        {fish.lifespan && (
          <div className="rounded-lg border border-neutral-200 p-4">
            <p className="text-xs uppercase tracking-wide text-neutral-500">Lifespan</p>
            <p className="mt-1">{fish.lifespan}</p>
          </div>
        )}
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-semibold">Behavior</h2>
        <p>{fish.behavior}</p>
      </section>

      {fish.reproduction && (
        <section className="mt-10 space-y-3">
          <h2 className="text-2xl font-semibold">Reproduction</h2>
          <p>{fish.reproduction}</p>
        </section>
      )}

      {fish.predators && (
        <section className="mt-10 space-y-3">
          <h2 className="text-2xl font-semibold">Natural predators</h2>
          <p>{fish.predators}</p>
        </section>
      )}

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-semibold">Where to find {fish.name} on Koh Tao</h2>
        {recordedSites.length === 0 ? (
          <p className="text-neutral-600">
            We haven&apos;t mapped {fish.name} to specific dive sites yet.{" "}
            <Link href="/dive-sites">Browse all Koh Tao dive sites &rarr;</Link>
          </p>
        ) : (
          <>
            <p>
              {fish.name} has been recorded at {recordedSites.length} Koh Tao
              dive sites. Each links to its full briefing.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {recordedSites.map((s) => (
                <li key={s.id}>
                  <Link href={`/dive-sites/${s.id}`} className="block rounded border border-neutral-200 p-2 no-underline hover:bg-neutral-50">
                    <span className="font-medium text-neutral-900">{s.name}</span>
                    <span className="ml-2 text-xs uppercase tracking-wide text-neutral-500">
                      {s.depth} &middot; {s.difficulty}
                    </span>
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
        <h2 className="text-2xl font-semibold">Use this in a real briefing</h2>
        <p className="mt-2 text-neutral-700">
          Every species lives inside the {BUSINESS.name} briefing tool. Open it
          on your phone for offline access on the boat.
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
            All species
          </Link>
        </div>
      </section>
    </main>
  );
}
