import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: `Koh Tao Dive Guide App — Sites & Species`,
  description:
    "Free dive companion for Koh Tao. Browse every dive site and species on any phone. No app store needed — install in one tap.",
  alternates: { canonical: "/for-divers" },
};

const ACCENT = "#0077b6";

const FAQS: FaqItem[] = [
  {
    question: "Is it really free?",
    answer:
      "Yes — completely free for divers. There are no in-app purchases, ads, accounts, or upsells. The app is funded via the dive-school product, not via you.",
  },
  {
    question: "Will it work on the boat without signal?",
    answer:
      "Yes. Once the app has loaded once, the dive site notes and species data are cached locally. You can scroll through every site and every fish on the day boat with no connection.",
  },
  {
    question: "Do I need to be a certified diver?",
    answer:
      "No. Snorkellers, Discover Scuba students, and qualified divers all use it. Each dive site lists its difficulty and depth so you can see what is in your reach.",
  },
];

export default function ForDiversPage() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-white">
      <BreadcrumbSchema crumbs={[{ name: "For divers", path: "/for-divers" }]} />
      <FaqSchema faqs={FAQS} />

      <div className="mx-auto max-w-4xl px-6 pt-36 pb-32 md:pt-44">
        <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/50">
          <span aria-hidden className="block h-px w-10 bg-white/30" />
          <span>For divers booking a Koh Tao trip</span>
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
          Know every dive site on Koh Tao{" "}
          <span style={{ color: ACCENT }}>before you hit the water.</span>
        </h1>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70">
          {BUSINESS.name} is a free dive companion for Koh Tao. Every dive
          site and every fish, on any phone, cross-linked so you can jump
          from a site to its species and back. No app store, no account, no
          fee. Built by {OWNER.firstName}, a working RAID instructor on Koh
          Tao.
        </p>

        <section className="mt-20 space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Why divers actually use it.
          </h2>
          <ul className="space-y-4 text-base leading-relaxed text-white/70 md:text-lg">
            <li className="flex gap-3">
              <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span>
                <strong className="text-white">Plan your trip.</strong> See
                depths, difficulties and highlights of every Koh Tao site
                before you book.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span>
                <strong className="text-white">Brief yourself.</strong> Tap
                any site to read what to expect — currents, swim-throughs,
                the species you might see.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span>
                <strong className="text-white">ID what you saw.</strong> Tap
                any species after the dive to confirm what you spotted and
                read its behaviour notes.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span>
                <strong className="text-white">Works offline.</strong> Load
                once and the data lives on your phone for the whole trip.
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
            Try the app.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            The demo is coming soon. In the meantime, apply for the pilot
            and {OWNER.firstName} will drop you a link directly.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white no-underline transition hover:-translate-y-[1px] hover:shadow-[0_10px_40px_rgba(0,119,182,0.35)]"
              style={{ backgroundColor: ACCENT }}
            >
              Try the app →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white no-underline transition hover:bg-white/[0.08]"
            >
              Contact {OWNER.firstName} →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
