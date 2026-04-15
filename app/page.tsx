import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";
import { DIVE_SITE_COUNT } from "@/lib/dive-sites";
import { FISH_COUNT } from "@/lib/fish";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";
import { HeroScrollVideo } from "@/components/marketing/HeroScrollVideo";

export const metadata: Metadata = {
  // Use `absolute` to bypass the layout's "%s | A Scuba Guide" template —
  // the home page owns its full title and positions the brand last itself.
  title: {
    absolute: `${BUSINESS.name} — Dive Briefing App for Koh Tao Schools`,
  },
  description:
    "Replace whiteboards and flip charts with a visual briefing tool covering 24 Koh Tao dive sites and 100+ species. See it in action.",
  alternates: { canonical: "/" },
};

const FAQS: FaqItem[] = [
  {
    question: "What is A Scuba Guide?",
    answer:
      "A Scuba Guide is a free dive briefing tool for RAID, PADI, and SSI dive schools. It replaces whiteboards, flip charts and printed cue cards with a tappable map of every dive site and the marine life your students will see. Built by a working RAID instructor with 2,000+ logged dives.",
  },
  {
    question: "Which cert bodies does it support?",
    answer:
      "All of them. The tool is cert-agnostic — every dive site and species page works the same whether you teach RAID, PADI, SSI, or any other recreational standard. There is no PADI-only or RAID-only mode.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Free during early access for every dive school on Koh Tao. No credit card, no per-student fees, no hidden tier. Apply for the pilot from the pricing page and we'll get you set up.",
  },
  {
    question: "Do students need to download an app?",
    answer:
      "No. A Scuba Guide is a Progressive Web App — it loads in any phone browser and can be added to the home screen with one tap. There is no App Store or Play Store install. It works offline once loaded, so it runs on the boat with no signal.",
  },
  {
    question: "Where is it available?",
    answer:
      "Koh Tao, Thailand is the first city. The product is built so that future locations like Phuket and the Similan Islands can be added without re-branding. If you run a school in another location and want it next, get in touch.",
  },
];

export default function HomePage() {
  return (
    <main>
      <FaqSchema faqs={FAQS} />

      {/* Full-viewport scroll-triggered video hero. Phase 4 design spike.
          Owns its own floating nav; the shared Nav component from layout.tsx
          suppresses itself on the homepage so there's no double-nav stack. */}
      <HeroScrollVideo />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <section aria-labelledby="hero-subhead" className="space-y-6">
          <h2
            id="hero-subhead"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            The dive briefing tool built by an instructor with{" "}
            {OWNER.diveCount.toLocaleString()}+ dives
          </h2>
          <p className="text-lg text-neutral-700">
            {BUSINESS.name} replaces the whiteboard, the flip chart and the
            printed species sheet with one tappable map of every Koh Tao dive
            site and every fish your students will meet underwater. Free
            during early access for every Koh Tao dive school.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/for-dive-schools"
              className="rounded-md border border-neutral-900 px-4 py-2 font-medium"
            >
              For dive schools &rarr;
            </Link>
            <Link
              href="/koh-tao"
              className="rounded-md border border-neutral-300 px-4 py-2 font-medium"
            >
              Open the app
            </Link>
          </div>
        </section>

        <section aria-labelledby="what" className="mt-16 space-y-4">
        <h2 id="what" className="text-2xl font-semibold">
          What it actually does
        </h2>
        <p>
          A working instructor opens the tool on a boat or in a classroom, taps a
          dive site, and walks students through depth, difficulty, the dive
          profile, and the exact species they should expect. Every dive site is
          linked to its species. Every species links back to the dive sites where
          you can find it. Briefings stop being a whiteboard sketch and start
          being a visual story.
        </p>
        <p>
          {DIVE_SITE_COUNT} dive sites. {FISH_COUNT}+ species. Every record
          cross-linked. No login. No ads. No upsell.
        </p>
      </section>

      <section aria-labelledby="who" className="mt-16 space-y-4">
        <h2 id="who" className="text-2xl font-semibold">
          Built by an instructor, not a startup
        </h2>
        <p>
          {OWNER.firstName} is a RAID instructor based on Koh Tao with{" "}
          {OWNER.diveCount.toLocaleString()}+ logged dives. He built {BUSINESS.name}{" "}
          because he was sick of briefing students with the same hand-drawn
          whiteboard maps every morning. The tool is the tool he wishes he had as
          a new instructor — and the one he uses on his own students today.{" "}
          <Link href="/about">More about {OWNER.firstName} &rarr;</Link>
        </p>
      </section>

      <section aria-labelledby="schools" className="mt-16 space-y-4">
        <h2 id="schools" className="text-2xl font-semibold">
          Why dive schools use it
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Every instructor briefs from the same canonical site notes. New hires
            stop ad-libbing.
          </li>
          <li>
            Students see what they are about to dive — depth, profile, species —
            before they kit up. Better-prepped divers, fewer in-water surprises.
          </li>
          <li>
            Works on any phone. No App Store. No accounts. No setup beyond
            opening a URL.
          </li>
          <li>
            Cert-agnostic content. Every page works the same for RAID, PADI and
            SSI students.
          </li>
        </ul>
        <p>
          <Link href="/for-dive-schools">See the full school pitch &rarr;</Link>
        </p>
      </section>

      <section aria-labelledby="divers" className="mt-16 space-y-4">
        <h2 id="divers" className="text-2xl font-semibold">
          Why divers install it
        </h2>
        <p>
          If you&apos;re booking a trip to Koh Tao, you can read every dive site and
          every species you might encounter before you arrive. Tap a site, see
          the highlights, study the species list. Then add the app to your home
          screen for offline use on the boat.
        </p>
        <p>
          <Link href="/for-divers">For divers &rarr;</Link> &middot;{" "}
          <Link href="/install">Install instructions</Link>
        </p>
      </section>

      <section aria-labelledby="explore" className="mt-16 space-y-4">
        <h2 id="explore" className="text-2xl font-semibold">
          Explore the data
        </h2>
        <p>
          Every Koh Tao dive site and every recorded species is on the public
          site already &mdash; no install needed.
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <Link href="/dive-sites">All {DIVE_SITE_COUNT} Koh Tao dive sites &rarr;</Link>
          </li>
          <li>
            <Link href="/fish">All {FISH_COUNT}+ Koh Tao species &rarr;</Link>
          </li>
        </ul>
      </section>

      <section aria-labelledby="faq" className="mt-16 space-y-4">
        <h2 id="faq" className="text-2xl font-semibold">
          Frequently asked questions
        </h2>
        <dl className="space-y-6">
          {FAQS.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold">{f.question}</dt>
              <dd className="mt-1 text-neutral-700">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 rounded-lg border border-neutral-200 p-6">
        <h2 className="text-2xl font-semibold">Run a Koh Tao dive school?</h2>
        <p className="mt-2 text-neutral-700">
          Apply for the free early-access pilot. {OWNER.firstName} replies
          personally, usually within a day.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-md border border-neutral-900 px-4 py-2 font-medium"
          >
            Apply for the pilot
          </Link>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="rounded-md border border-neutral-300 px-4 py-2 font-medium"
          >
            Email {OWNER.firstName}
          </a>
        </div>
      </section>
      </div>
    </main>
  );
}
