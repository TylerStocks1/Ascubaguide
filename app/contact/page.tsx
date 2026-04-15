import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";

export const metadata: Metadata = {
  title: `Contact — Request a Demo or Pilot`,
  description: `Book a 20-min demo with ${OWNER.firstName}, request a free pilot for your dive school, or just say hi. Real responses from a real RAID instructor, usually within 24 hours.`,
  alternates: { canonical: "/contact" },
};

const ACCENT = "#0077b6";

const FAQS: FaqItem[] = [
  {
    question: `How fast does ${OWNER.firstName} reply?`,
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
    <main className="relative min-h-screen bg-neutral-950 text-white">
      <BreadcrumbSchema crumbs={[{ name: "Contact", path: "/contact" }]} />
      <FaqSchema faqs={FAQS} />

      <div className="mx-auto max-w-4xl px-6 pt-36 pb-32 md:pt-44">
        <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/50">
          <span aria-hidden className="block h-px w-10 bg-white/30" />
          <span>Get in touch</span>
        </div>

        <h1
          className="mt-8 text-white"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            fontWeight: 700,
          }}
        >
          Talk to <span style={{ color: ACCENT }}>{OWNER.firstName}.</span>
        </h1>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70">
          Book a 20-minute demo, apply for a free pilot at your dive school,
          request a fix to a dive site briefing, or just say hi. Every email
          goes directly to {OWNER.firstName} — a working RAID instructor with{" "}
          {OWNER.diveCount.toLocaleString()}+ logged dives.
        </p>

        <section className="mt-16 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-10 md:p-14">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">
            Email
          </p>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-white no-underline"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {BUSINESS.email}
          </a>
          <p className="text-sm text-white/50">
            Replies usually within 24 hours. A web form is coming once the
            domain is live.
          </p>
        </section>

        <section className="mt-20 space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            What to send.
          </h2>
          <ul className="space-y-4 text-base leading-relaxed text-white/70 md:text-lg">
            <li className="flex gap-3">
              <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span>
                <strong className="text-white">Pilot applications:</strong>{" "}
                Your dive school name, location, cert body (RAID/PADI/SSI/
                other), how many instructors and roughly how many students
                per day.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span>
                <strong className="text-white">Demos:</strong> Your time
                zone and a couple of slots that work for you.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span>
                <strong className="text-white">Site notes corrections:</strong>{" "}
                Which dive site, what is wrong, and (if possible) a source
                we can cite.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span>
                <strong className="text-white">Press / partnerships:</strong>{" "}
                Yes, please. Be specific.
              </span>
            </li>
          </ul>
        </section>

        <section className="mt-20 space-y-8">
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Frequently asked questions.
          </h2>
          <dl className="space-y-8">
            {FAQS.map((f) => (
              <div key={f.question} className="border-t border-white/10 pt-6">
                <dt className="text-lg font-semibold text-white">
                  {f.question}
                </dt>
                <dd className="mt-3 text-base leading-relaxed text-white/65">
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-24 flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-10 md:p-14">
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Quick links.
          </h2>
          <ul className="space-y-3 text-base leading-relaxed text-white/70">
            <li>
              <Link href="/for-dive-schools" className="no-underline hover:text-white">
                For dive schools — the full B2B pitch
              </Link>
            </li>
            <li>
              <Link href="/for-divers" className="no-underline hover:text-white">
                For divers
              </Link>
            </li>
            <li>
              <Link href="/about" className="no-underline hover:text-white">
                About {OWNER.firstName}
              </Link>
            </li>
            <li>
              <Link href="/app" className="no-underline hover:text-white">
                Try the app
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
