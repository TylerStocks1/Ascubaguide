import type { Metadata } from "next";
import { BUSINESS, OWNER } from "@/lib/business";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import {
  OceanMain,
  PageEyebrow,
  DisplayHeading,
  AccentWord,
  SectionHeading,
  OceanBullet,
  OceanCta,
} from "@/components/marketing/OceanChrome";

export const metadata: Metadata = {
  title: `Dive School Briefing Tool. Free Pilot`,
  description:
    "Free during early access for RAID, PADI, and SSI dive schools on Koh Tao. Replace whiteboards with a visual briefing tool. Apply for the pilot.",
  alternates: { canonical: "/for-dive-schools" },
};

const FAQS: FaqItem[] = [
  {
    question: "Is A Scuba Guide really free for dive schools?",
    answer:
      "Yes. During the early-access pilot every Koh Tao dive school can use it for free with no per-instructor or per-student cost. We take post-pilot pricing decisions when we have real usage data; pilots will get grandfathered terms.",
  },
  {
    question: "Will it work for my RAID, PADI or SSI school?",
    answer:
      "Yes. Every dive site and species page is written cert-agnostic. There are no PADI-only fields, no RAID-only language. Instructors brief from the same shared site notes regardless of which standard they teach.",
  },
  {
    question: "Do my instructors need to install anything?",
    answer:
      "No. They open the URL on any phone, tablet or laptop, and add it to the home screen if they want a one-tap launcher. There are no accounts, no logins and no app store gatekeeping.",
  },
  {
    question: "What about offline on the boat?",
    answer:
      "The tool is a Progressive Web App. Once it has been opened on a device, the dive site notes and species data are cached locally and continue to work without signal. Exactly the conditions your day boats run in.",
  },
];

export default function ForDiveSchoolsPage() {
  return (
    <OceanMain>
      <BreadcrumbSchema
        crumbs={[{ name: "For dive schools", path: "/for-dive-schools" }]}
      />
      <FaqSchema faqs={FAQS} />

      <div className="mx-auto max-w-4xl px-6 pt-36 pb-32 md:pt-44">
        <PageEyebrow>For RAID · PADI · SSI schools</PageEyebrow>

        <DisplayHeading className="mt-8">
          Brief every student{" "}
          <AccentWord>with the same accuracy</AccentWord>{" "}
          your best instructors have.
        </DisplayHeading>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70">
          {BUSINESS.name} is a free dive briefing tool for RAID, PADI and
          SSI dive schools on Koh Tao. It gives every instructor on your
          roster the same canonical site notes and species list, so a
          new hire briefs Chumphon Pinnacle the same way your most senior
          instructor does. Built by {OWNER.firstName}, a working RAID
          instructor with {OWNER.diveCount.toLocaleString()}+ dives.
        </p>

        <section className="mt-20 space-y-6">
          <SectionHeading>The whiteboard problem.</SectionHeading>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Most Koh Tao dive schools brief students the same way they
            did in 1995: a whiteboard sketch of the dive site, a flip
            chart of fish, and a 15-minute talk that varies by whichever
            instructor is on shift. New instructors copy the briefing
            they happened to learn first. Students forget half of it
            before they kit up.
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {BUSINESS.name} replaces that with a visual, tappable briefing
            every instructor reads from. Every Koh Tao dive site, every
            species, cross-linked, accessible on any phone in the boat or
            the classroom.
          </p>
        </section>

        <section className="mt-20 space-y-6">
          <SectionHeading>What you get in the pilot.</SectionHeading>
          <ul className="space-y-3 text-base leading-relaxed text-white/70">
            <OceanBullet>Unlimited instructors. No per-seat pricing.</OceanBullet>
            <OceanBullet>Unlimited student access. They open it on their own phones.</OceanBullet>
            <OceanBullet>Every Koh Tao dive site, every species, cross-linked.</OceanBullet>
            <OceanBullet>Offline-capable on the day boat once loaded.</OceanBullet>
            <OceanBullet>
              Direct line to {OWNER.firstName} for site notes corrections
              and feature requests.
            </OceanBullet>
          </ul>
        </section>

        <section className="mt-20 space-y-6">
          <SectionHeading>Cert-agnostic by design.</SectionHeading>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {BUSINESS.name} does not lead with PADI, does not lead with
            RAID, does not lead with SSI. The briefing content is the same
            physical reality: depth, current, marine life, hazards,
            regardless of which agency&apos;s standards your shop teaches
            under. {OWNER.firstName} is a RAID instructor; the tool is
            everyone&apos;s.
          </p>
        </section>

        <section className="mt-20 space-y-8">
          <SectionHeading>Frequently asked questions.</SectionHeading>
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

        <section className="glass-strong mt-24 flex flex-col items-start gap-6 rounded-3xl p-10 md:p-14">
          <SectionHeading>Apply for the free pilot.</SectionHeading>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            One Koh Tao dive school per onboarding slot. We&apos;re
            prioritising shops that brief 10+ students per day.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <OceanCta href="/contact">Apply now</OceanCta>
            <OceanCta href="/app" variant="ghost">Try the app</OceanCta>
          </div>
        </section>
      </div>
    </OceanMain>
  );
}
