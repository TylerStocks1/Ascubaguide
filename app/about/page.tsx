import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";
import { PersonSchema } from "@/components/schema/PersonSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";

export const metadata: Metadata = {
  title: `About ${OWNER.name} — RAID Instructor & Founder | ${BUSINESS.name}`,
  description: `The RAID instructor behind ${BUSINESS.name}: ${OWNER.diveCount.toLocaleString()}+ dives on Koh Tao, building the briefing tool he wished he'd had as a new instructor.`,
  alternates: { canonical: "/about" },
};

const FAQS: FaqItem[] = [
  {
    question: `Who is ${OWNER.firstName}?`,
    answer: `${OWNER.name} is a RAID dive instructor based on Koh Tao, Thailand with ${OWNER.diveCount.toLocaleString()}+ logged dives. He built ${BUSINESS.name} as the briefing tool he wished he'd had as a new instructor.`,
  },
  {
    question: `What cert body does ${OWNER.firstName} teach under?`,
    answer:
      "RAID. But A Scuba Guide is deliberately cert-agnostic — every dive site and species page is written so that RAID, PADI, and SSI instructors can use it identically.",
  },
  {
    question: `Why did ${OWNER.firstName} build a briefing tool?`,
    answer:
      "Because Koh Tao instructors were still briefing students with whiteboards, hand-drawn site maps and printed fish charts in 2025. Every new instructor had to relearn the same site notes from scratch. A Scuba Guide is the canonical version every instructor can read from.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <PersonSchema />
      <BreadcrumbSchema crumbs={[{ name: "About", path: "/about" }]} />
      <FaqSchema faqs={FAQS} />

      <p className="text-sm uppercase tracking-wide text-neutral-500">About the founder</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        RAID Instructor. {OWNER.diveCount.toLocaleString()}+ dives. One obsession: better briefings.
      </h1>
      <p className="mt-6 text-lg text-neutral-700">
        {OWNER.name} is a RAID dive instructor based on Koh Tao, Thailand. He has
        logged {OWNER.diveCount.toLocaleString()}+ dives across an intensive
        career and built {BUSINESS.name} as a working tool — the visual briefing
        system he wished he&apos;d had on his first day teaching students.
      </p>

      {/*
        BLOCKERS open against this page (BLOCKERS.md):
          - George's headshot (replace placeholder block below)
          - RAID instructor certification number (PersonSchema omits credential until provided)
          - Years on Koh Tao specifically (kept vague below until confirmed)
          - Dive shop ownership claim (not mentioned until George confirms or denies)
          - Hydronauts dates and explicit permission to mention by name
          - Instagram handle verified
        Phase 4 design-assist replaces the headshot block with a real image.
      */}
      <div
        aria-hidden
        className="mt-8 flex h-64 items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 text-sm text-neutral-500"
      >
        Headshot of {OWNER.firstName} (pending — see BLOCKERS.md)
      </div>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">The dive count, the honest version</h2>
        <p>
          {OWNER.firstName} has logged more than {OWNER.diveCount.toLocaleString()}{" "}
          dives across a career compressed into a small number of intensely-active
          years. Most of that time has been spent on the boats around Koh Tao —
          briefing students, leading certification dives, running fun dives, and
          paying attention to the same reefs every day until the patterns
          revealed themselves.
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Why this tool exists</h2>
        <p>
          Every Koh Tao dive school briefs students before the dive. The format
          has barely changed in 30 years: a whiteboard sketch, a flip chart of
          fish, a 15-minute talk that varies by whichever instructor is on shift
          that day. New instructors copy the briefing they happen to learn first.
          Students forget half of it before they kit up.
        </p>
        <p>
          {OWNER.firstName} got tired of briefing Chumphon Pinnacle from a
          whiteboard for the hundredth time and started building the tool you
          see at <Link href="/koh-tao">/koh-tao</Link>. Every dive site, every
          species, every cross-link, in your pocket on the boat.
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Cert-agnostic by design</h2>
        <p>
          {OWNER.firstName} teaches under RAID, but he is intentional that the
          tool serves the whole island. Koh Tao runs roughly 50 dive shops across
          RAID, PADI and SSI. The physical reality of the dive sites is the same
          for all of them. The briefing tool should be too.
        </p>
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
        <h2 className="text-2xl font-semibold">Get in touch with {OWNER.firstName}</h2>
        <p className="mt-2 text-neutral-700">
          Site notes corrections, pilot applications, feature requests — they all
          go to the same inbox.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-md border border-neutral-900 px-4 py-2 font-medium"
          >
            Contact {OWNER.firstName}
          </Link>
          <Link
            href="/for-dive-schools"
            className="rounded-md border border-neutral-300 px-4 py-2 font-medium"
          >
            For dive schools &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
