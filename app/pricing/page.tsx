import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";

export const metadata: Metadata = {
  // Brand suffix applied by the layout's title template.
  title: `Pricing — Free Early Access for Dive Schools`,
  description: `${BUSINESS.name} is free for Koh Tao dive schools during the early-access pilot. Every instructor, every student, every site included. Apply now.`,
  alternates: { canonical: "/pricing" },
};

const FAQS: FaqItem[] = [
  {
    question: "How much does A Scuba Guide cost?",
    answer:
      "Free during the early-access pilot for every Koh Tao dive school. There is no credit card, no per-instructor fee, and no per-student fee. Pilots will get grandfathered terms when general-availability pricing is introduced.",
  },
  {
    question: "When will paid tiers launch?",
    answer:
      "We're not announcing a date. We launch paid tiers when we have enough pilot usage data to know what shops actually pay for. Until then, the only commitment is the free pilot.",
  },
  {
    question: "What about for divers?",
    answer:
      "Free, forever. There are no in-app purchases or ads. The diver app is funded by the dive-school product, not by you.",
  },
  {
    question: "What does the pilot include?",
    answer:
      "Every dive site, every species, unlimited instructors, unlimited student access, offline support on the boat, and a direct line to George for site-notes corrections and feature requests.",
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <BreadcrumbSchema crumbs={[{ name: "Pricing", path: "/pricing" }]} />
      <FaqSchema faqs={FAQS} />

      <p className="text-sm uppercase tracking-wide text-neutral-500">Pricing</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Free during early access — for every Koh Tao dive school
      </h1>
      <p className="mt-6 text-lg text-neutral-700">
        {BUSINESS.name} is free during the early-access pilot for every dive
        school on Koh Tao. No credit card. No per-instructor fee. No per-student
        fee. The only thing we ask for is your honest feedback.
      </p>

      <section className="mt-12">
        <div className="rounded-lg border-2 border-neutral-900 p-8">
          <p className="text-sm uppercase tracking-wide text-neutral-500">
            Early-access pilot
          </p>
          <p className="mt-2 text-4xl font-bold">Free</p>
          <p className="mt-2 text-neutral-600">
            For Koh Tao RAID, PADI and SSI dive schools.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>&#10003; Every Koh Tao dive site</li>
            <li>&#10003; Every recorded fish species, cross-linked</li>
            <li>&#10003; Unlimited instructors</li>
            <li>&#10003; Unlimited student access via the public app</li>
            <li>&#10003; Works offline on the boat</li>
            <li>&#10003; Direct line to {OWNER.firstName} for site notes corrections</li>
            <li>&#10003; Pilot terms grandfathered when GA pricing launches</li>
          </ul>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 font-medium text-white no-underline"
          >
            Apply for the pilot
          </Link>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Why no paid tiers yet?</h2>
        <p>
          Building pricing pages full of made-up tiers before knowing what
          customers actually pay for is the fastest way to ship the wrong
          product. {BUSINESS.name} ships paid tiers when pilot usage tells us
          what to charge for. Until then, the only honest answer is &ldquo;free
          for the pilot.&rdquo;
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
        <h2 className="text-2xl font-semibold">Ready to start?</h2>
        <p className="mt-2 text-neutral-700">
          Apply for the pilot. {OWNER.firstName} replies personally, usually
          within a day.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-md border border-neutral-900 px-4 py-2 font-medium"
          >
            Apply now
          </Link>
          <Link
            href="/for-dive-schools"
            className="rounded-md border border-neutral-300 px-4 py-2 font-medium"
          >
            See the school pitch &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
