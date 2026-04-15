import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";
import { DIVE_SITE_COUNT } from "@/lib/dive-sites";
import { FISH_COUNT } from "@/lib/fish";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: `Dive School Briefing Tool — Free Pilot | ${BUSINESS.name}`,
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
    <main className="mx-auto max-w-3xl px-4 py-12">
      <BreadcrumbSchema crumbs={[{ name: "For dive schools", path: "/for-dive-schools" }]} />
      <FaqSchema faqs={FAQS} />

      <p className="text-sm uppercase tracking-wide text-neutral-500">
        For RAID, PADI and SSI schools on Koh Tao
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Brief every student with the same accuracy your best instructors have
      </h1>
      <p className="mt-6 text-lg text-neutral-700">
        {BUSINESS.name} is a free dive briefing tool for RAID, PADI and SSI dive
        schools on Koh Tao. It gives every instructor on your roster the same
        canonical site notes and species list — so a new hire briefs Chumphon
        Pinnacle the same way your most senior instructor does. Built by{" "}
        {OWNER.firstName}, a working RAID instructor with{" "}
        {OWNER.diveCount.toLocaleString()}+ dives.
      </p>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">The whiteboard problem</h2>
        <p>
          Most Koh Tao dive schools brief students the same way they did in 1995:
          a whiteboard sketch of the dive site, a flip chart of fish, and a
          15-minute talk that varies by whichever instructor is on shift. New
          instructors copy the briefing they happened to learn first. Students
          forget half of it before they kit up.
        </p>
        <p>
          A Scuba Guide replaces that with a visual, tappable briefing every
          instructor reads from. {DIVE_SITE_COUNT} dive sites and {FISH_COUNT}+
          species, every record cross-linked, accessible on any phone in the boat
          or the classroom.
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">What you get in the pilot</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Unlimited instructors. No per-seat pricing.</li>
          <li>Unlimited student access. They open it on their own phones.</li>
          <li>Every Koh Tao dive site, every species, cross-linked.</li>
          <li>Offline-capable on the day boat once loaded.</li>
          <li>Direct line to {OWNER.firstName} for site notes corrections and feature requests.</li>
        </ul>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Cert-agnostic by design</h2>
        <p>
          A Scuba Guide does not lead with PADI, does not lead with RAID, does
          not lead with SSI. The briefing content is the same physical reality —
          depth, current, marine life, hazards — regardless of which agency&apos;s
          standards your shop teaches under. {OWNER.firstName} is a RAID
          instructor; the tool is everyone&apos;s.
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">How to start the pilot</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            <Link href="/contact">Apply via the contact form</Link> with your
            shop name and how many instructors you have.
          </li>
          <li>
            {OWNER.firstName} replies (usually within a day) with a 20-minute
            walkthrough call.
          </li>
          <li>
            You share the URL with your instructors. They open it. Done.
          </li>
        </ol>
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
        <h2 className="text-2xl font-semibold">Apply for the free pilot</h2>
        <p className="mt-2 text-neutral-700">
          One Koh Tao dive school per onboarding slot. We&apos;re prioritising
          shops that brief 10+ students per day.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-md border border-neutral-900 px-4 py-2 font-medium"
          >
            Apply now
          </Link>
          <Link
            href="/pricing"
            className="rounded-md border border-neutral-300 px-4 py-2 font-medium"
          >
            See pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
