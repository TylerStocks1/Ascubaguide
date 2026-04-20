import type { Metadata } from "next";
import { BUSINESS, OWNER } from "@/lib/business";
import { PersonSchema } from "@/components/schema/PersonSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import {
  OceanMain,
  PageEyebrow,
  DisplayHeading,
  AccentWord,
  SectionHeading,
  OceanCta,
} from "@/components/marketing/OceanChrome";

export const metadata: Metadata = {
  title: `${OWNER.name}. RAID Instructor & Founder`,
  description: `The RAID instructor behind ${BUSINESS.name}: ${OWNER.diveCount.toLocaleString()}+ dives on Koh Tao, building the briefing tool he wished he'd had as a new instructor.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <OceanMain>
      <PersonSchema />
      <BreadcrumbSchema crumbs={[{ name: "About", path: "/about" }]} />

      <div className="mx-auto max-w-4xl px-6 pt-36 pb-32 md:pt-44">
        <PageEyebrow>About the founder</PageEyebrow>

        <DisplayHeading className="mt-8">
          RAID Instructor.{" "}
          <AccentWord>
            {OWNER.diveCount.toLocaleString()}+ dives.
          </AccentWord>
          <br />
          One obsession: better briefings.
        </DisplayHeading>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70">
          {OWNER.name} is a RAID dive instructor based on {OWNER.location}. He
          has logged {OWNER.diveCount.toLocaleString()}+ dives across an
          intensive career and built {BUSINESS.name} as a working tool.
          The visual briefing system he wished he&apos;d had on his first
          day teaching students.
        </p>

        <div
          aria-hidden
          className="glass mt-12 flex h-80 items-center justify-center rounded-3xl text-sm uppercase tracking-[0.2em] text-white/40"
        >
          Headshot of {OWNER.firstName}. Pending (BLOCKERS.md)
        </div>

        <section className="mt-20 space-y-6">
          <SectionHeading>The dive count, honest version.</SectionHeading>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {OWNER.firstName} has logged more than{" "}
            {OWNER.diveCount.toLocaleString()} dives across a career
            compressed into a small number of intensely-active years. Most
            of that time has been spent on the boats around Koh Tao:
            briefing students, leading certification dives, running fun
            dives, and paying attention to the same reefs every day until
            the patterns revealed themselves.
          </p>
        </section>

        <section className="mt-20 space-y-6">
          <SectionHeading>Why this tool exists.</SectionHeading>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Every Koh Tao dive school briefs students before the dive. The
            format has barely changed in 30 years: a whiteboard sketch, a
            flip chart of fish, a 15-minute talk that varies by whichever
            instructor is on shift that day. New instructors copy the
            briefing they happen to learn first. Students forget half of
            it before they kit up.
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {OWNER.firstName} got tired of briefing Chumphon Pinnacle from
            a whiteboard for the hundredth time and started building{" "}
            {BUSINESS.name}. Every dive site, every species, every
            cross-link, in your pocket on the boat.
          </p>
        </section>

        <section className="mt-20 space-y-6">
          <SectionHeading>Cert-agnostic by design.</SectionHeading>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {OWNER.firstName} teaches under RAID, but he is intentional
            that the tool serves the whole island. Koh Tao runs roughly
            50 dive shops across RAID, PADI and SSI. The physical reality
            of the dive sites is the same for all of them. The briefing
            tool should be too.
          </p>
        </section>

        <section className="glass-strong mt-24 flex flex-col items-start gap-6 rounded-3xl p-10 md:p-14">
          <SectionHeading>Talk to {OWNER.firstName}.</SectionHeading>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            Pilot applications, demo requests, site notes corrections.
            They all go to the same inbox.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <OceanCta href="/contact">Contact {OWNER.firstName}</OceanCta>
            <OceanCta href="/for-dive-schools" variant="ghost">
              For dive schools
            </OceanCta>
          </div>
        </section>
      </div>
    </OceanMain>
  );
}
