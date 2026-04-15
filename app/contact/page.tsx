import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";

export const metadata: Metadata = {
  title: `Contact — Request a Demo or Pilot | ${BUSINESS.name}`,
  description: `Book a 20-min demo with ${OWNER.firstName}, request a free pilot for your dive school, or just say hi. Real responses from a real RAID instructor, usually within 24 hours.`,
  alternates: { canonical: "/contact" },
};

const FAQS: FaqItem[] = [
  {
    question: "How fast does George reply?",
    answer:
      "Usually within 24 hours. Sometimes within an hour. Sometimes longer if he's on a deep dive without signal — but every email gets a real human response.",
  },
  {
    question: "Can I request a feature?",
    answer:
      "Yes. The contact form goes directly to George. Many of the dive site notes and species details have been added because instructors at other shops asked.",
  },
  {
    question: "Do you take requests for other locations?",
    answer:
      "Yes — but only seriously. If you run a school in Phuket, the Similan Islands, the Maldives, or anywhere else and want A Scuba Guide for your dive sites, get in touch. We will be honest about whether and when we can build it.",
  },
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <BreadcrumbSchema crumbs={[{ name: "Contact", path: "/contact" }]} />
      <FaqSchema faqs={FAQS} />

      <p className="text-sm uppercase tracking-wide text-neutral-500">Get in touch</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Talk to {OWNER.firstName}</h1>
      <p className="mt-6 text-lg text-neutral-700">
        Book a 20-minute demo, apply for a free pilot at your dive school, request
        a fix to a dive site briefing, or just say hi. Every email goes directly
        to {OWNER.firstName} — a working RAID instructor with{" "}
        {OWNER.diveCount.toLocaleString()}+ logged dives.
      </p>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Email</h2>
        <p>
          The fastest channel.{" "}
          <a href={`mailto:${BUSINESS.email}`} className="font-semibold">
            {BUSINESS.email}
          </a>
          . Replies usually within 24 hours.
        </p>
        <p className="text-sm text-neutral-500">
          {/* TODO: replace with real form once domain + email are live (BLOCKERS.md) */}
          A web form is coming once the domain is live. Until then, plain old
          email is the best way to reach us.
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">What to send</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Pilot applications:</strong> Your dive school name, location,
            cert body (RAID/PADI/SSI/other), how many instructors and roughly how
            many students per day.
          </li>
          <li>
            <strong>Demos:</strong> Your time zone and a couple of slots that
            work for you.
          </li>
          <li>
            <strong>Site notes corrections:</strong> Which dive site, what is
            wrong, and (if possible) a source we can cite.
          </li>
          <li>
            <strong>Press / partnerships:</strong> Yes, please. Be specific.
          </li>
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
        <h2 className="text-2xl font-semibold">Quick links</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-neutral-700">
          <li>
            <Link href="/for-dive-schools">For dive schools</Link> &mdash; the
            full B2B pitch
          </li>
          <li>
            <Link href="/pricing">Pricing</Link> &mdash; (spoiler: free during
            early access)
          </li>
          <li>
            <Link href="/about">About {OWNER.firstName}</Link>
          </li>
          <li>
            <Link href="/koh-tao">Open the Koh Tao app</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
