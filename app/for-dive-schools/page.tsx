import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: `Dive School Briefing Tool — Free Pilot`,
  description:
    "Free during early access for RAID, PADI, and SSI dive schools on Koh Tao. Replace whiteboards with a visual briefing tool. Apply for the pilot.",
  alternates: { canonical: "/for-dive-schools" },
};

const ACCENT = "#0077b6";

const FAQS: FaqItem[] = [
  {
    question: "Is A Scuba Guide really free for dive schools?",
    answer:
      "Yes. During the early-access pilot every Koh Tao dive school can use it for free with no per-instructor or per-student cost. We take post-pilot pricing decisions when we have real usage data; pilots will get grandfathered terms.",
  },
  {
    question: "Will it work for my RAID, PADI or SSI school?",
    answer:
      "Yes. Every dive site and species page is written cert-agnostic — there are no PADI-only fields, no RAID-only language. Instructors brief from the same shared site notes regardless of which standard they teach.",
  },
  {
    question: "Do my instructors need to install anything?",
    answer:
      "No. They open the URL on any phone, tablet or laptop, and add it to the home screen if they want a one-tap launcher. There are no accounts, no logins and no app store gatekeeping.",
  },
  {
    question: "What about offline on the boat?",
    answer:
      "The tool is a Progressive Web App. Once it has been opened on a device, the dive site notes and species data are cached locally and continue to work without signal — exactly the conditions your day boats run in.",
  },
];

export default function ForDiveSchoolsPage() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-white">
      <BreadcrumbSchema
        crumbs={[{ name: "For dive schools", path: "/for-dive-schools" }]}
      />
      <FaqSchema faqs={FAQS} />

      <div className="mx-auto max-w-4xl px-6 pt-36 pb-32 md:pt-44">
        <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/50">
          <span aria-hidden className="block h-px w-10 bg-white/30" />
          <span>For RAID · PADI · SSI schools</span>
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
          Brief every student{" "}
          <span style={{ color: ACCENT }}>with the same accuracy</span>{" "}
          your best instructors have.
        </h1>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70">
          {BUSINESS.name} is a free dive briefing tool for RAID, PADI and SSI
          dive schools on Koh Tao. It gives every instructor on your roster
          the same canonical site notes and species list — so a new hire
          briefs Chumphon Pinnacle the same way your most senior instructor
          does. Built by {OWNER.firstName}, a working RAID instructor with{" "}
          {OWNER.diveCount.toLocaleString()}+ dives.
        </p>

        <section className="mt-20 space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            The whiteboard problem.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Most Koh Tao dive schools brief students the same way they did in
            1995: a whiteboard sketch of the dive site, a flip chart of fish,
            and a 15-minute talk that varies by whichever instructor is on
            shift. New instructors copy the briefing they happened to learn
            first. Students forget half of it before they kit up.
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {BUSINESS.name} replaces that with a visual, tappable briefing
            every instructor reads from — every Koh Tao dive site, every
            species, cross-linked, accessible on any phone in the boat or
            the classroom.
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
            What you get in the pilot.
          </h2>
          <ul className="space-y-3 text-base leading-relaxed text-white/70">
            <li className="flex gap-3">
              <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              Unlimited instructors. No per-seat pricing.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              Unlimited student access. They open it on their own phones.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              Every Koh Tao dive site, every species, cross-linked.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              Offline-capable on the day boat once loaded.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
              Direct line to {OWNER.firstName} for site notes corrections and
              feature requests.
            </li>
          </ul>
        </section>

        <section className="mt-20 space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Cert-agnostic by design.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {BUSINESS.name} does not lead with PADI, does not lead with RAID,
            does not lead with SSI. The briefing content is the same physical
            reality — depth, current, marine life, hazards — regardless of
            which agency&apos;s standards your shop teaches under.{" "}
            {OWNER.firstName} is a RAID instructor; the tool is everyone&apos;s.
          </p>
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
            Apply for the free pilot.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            One Koh Tao dive school per onboarding slot. We&apos;re
            prioritising shops that brief 10+ students per day.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white no-underline transition hover:-translate-y-[1px] hover:shadow-[0_10px_40px_rgba(0,119,182,0.35)]"
              style={{ backgroundColor: ACCENT }}
            >
              Apply now →
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white no-underline transition hover:bg-white/[0.08]"
            >
              Try the app →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
