import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";
import { PersonSchema } from "@/components/schema/PersonSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: `${OWNER.name} — RAID Instructor & Founder`,
  description: `The RAID instructor behind ${BUSINESS.name}: ${OWNER.diveCount.toLocaleString()}+ dives on Koh Tao, building the briefing tool he wished he'd had as a new instructor.`,
  alternates: { canonical: "/about" },
};

const ACCENT = "#0077b6";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-white">
      <PersonSchema />
      <BreadcrumbSchema crumbs={[{ name: "About", path: "/about" }]} />

      <div className="mx-auto max-w-4xl px-6 pt-36 pb-32 md:pt-44">
        <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/50">
          <span aria-hidden className="block h-px w-10 bg-white/30" />
          <span>About the founder</span>
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
          RAID Instructor.{" "}
          <span style={{ color: ACCENT }}>
            {OWNER.diveCount.toLocaleString()}+ dives.
          </span>
          <br />
          One obsession: better briefings.
        </h1>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70">
          {OWNER.name} is a RAID dive instructor based on {OWNER.location}. He
          has logged {OWNER.diveCount.toLocaleString()}+ dives across an
          intensive career and built {BUSINESS.name} as a working tool — the
          visual briefing system he wished he&apos;d had on his first day
          teaching students.
        </p>

        {/*
          BLOCKERS open against this page (BLOCKERS.md):
            - George's headshot (replace placeholder block below)
            - RAID instructor certification number (PersonSchema omits
              credential until provided)
            - Years on Koh Tao specifically (kept vague below)
            - Dive shop ownership claim (not mentioned until confirmed)
            - Hydronauts dates + explicit permission to mention by name
            - Instagram handle verification
        */}
        <div
          aria-hidden
          className="mt-12 flex h-80 items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] text-sm uppercase tracking-[0.15em] text-white/40"
        >
          Headshot of {OWNER.firstName} — pending (BLOCKERS.md)
        </div>

        <section className="mt-20 space-y-6">
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            The dive count, honest version.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {OWNER.firstName} has logged more than{" "}
            {OWNER.diveCount.toLocaleString()} dives across a career compressed
            into a small number of intensely-active years. Most of that time
            has been spent on the boats around Koh Tao — briefing students,
            leading certification dives, running fun dives, and paying
            attention to the same reefs every day until the patterns revealed
            themselves.
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
            Why this tool exists.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Every Koh Tao dive school briefs students before the dive. The
            format has barely changed in 30 years: a whiteboard sketch, a
            flip chart of fish, a 15-minute talk that varies by whichever
            instructor is on shift that day. New instructors copy the
            briefing they happen to learn first. Students forget half of it
            before they kit up.
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {OWNER.firstName} got tired of briefing Chumphon Pinnacle from a
            whiteboard for the hundredth time and started building{" "}
            {BUSINESS.name}. Every dive site, every species, every cross-link,
            in your pocket on the boat.
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
            Cert-agnostic by design.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {OWNER.firstName} teaches under RAID, but he is intentional that
            the tool serves the whole island. Koh Tao runs roughly 50 dive
            shops across RAID, PADI and SSI. The physical reality of the dive
            sites is the same for all of them. The briefing tool should be too.
          </p>
        </section>

        <section className="mt-24 flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-10 md:p-14">
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Talk to {OWNER.firstName}.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            Pilot applications, demo requests, site notes corrections — they
            all go to the same inbox.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white no-underline transition hover:-translate-y-[1px] hover:shadow-[0_10px_40px_rgba(0,119,182,0.35)]"
              style={{ backgroundColor: ACCENT }}
            >
              Contact {OWNER.firstName} →
            </Link>
            <Link
              href="/for-dive-schools"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white no-underline transition hover:bg-white/[0.08]"
            >
              For dive schools →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
