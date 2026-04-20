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
  title: `Koh Tao Dive Guide App. Sites & Species`,
  description:
    "Free dive companion for Koh Tao. Browse every dive site and species on any phone. No app store needed. Install in one tap.",
  alternates: { canonical: "/for-divers" },
};

const FAQS: FaqItem[] = [
  {
    question: "Is it really free?",
    answer:
      "Yes. Completely free for divers. There are no in-app purchases, ads, accounts, or upsells. The app is funded via the dive-school product, not via you.",
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
    <OceanMain>
      <BreadcrumbSchema crumbs={[{ name: "For divers", path: "/for-divers" }]} />
      <FaqSchema faqs={FAQS} />

      <div className="mx-auto max-w-4xl px-6 pt-36 pb-32 md:pt-44">
        <PageEyebrow>For divers booking a Koh Tao trip</PageEyebrow>

        <DisplayHeading className="mt-8">
          Know every dive site on Koh Tao{" "}
          <AccentWord>before you hit the water.</AccentWord>
        </DisplayHeading>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70">
          {BUSINESS.name} is a free dive companion for Koh Tao. Every dive
          site and every fish, on any phone, cross-linked so you can jump
          from a site to its species and back. No app store, no account,
          no fee. Built by {OWNER.firstName}, a working RAID instructor on
          Koh Tao.
        </p>

        <section className="mt-20 space-y-6">
          <SectionHeading>Why divers actually use it.</SectionHeading>
          <ul className="space-y-4 text-base leading-relaxed text-white/70 md:text-lg">
            <OceanBullet>
              <strong className="text-white">Plan your trip.</strong> See
              depths, difficulties and highlights of every Koh Tao site
              before you book.
            </OceanBullet>
            <OceanBullet>
              <strong className="text-white">Brief yourself.</strong> Tap
              any site to read what to expect: currents, swim-throughs,
              the species you might see.
            </OceanBullet>
            <OceanBullet>
              <strong className="text-white">ID what you saw.</strong> Tap
              any species after the dive to confirm what you spotted and
              read its behaviour notes.
            </OceanBullet>
            <OceanBullet>
              <strong className="text-white">Works offline.</strong> Load
              once and the data lives on your phone for the whole trip.
            </OceanBullet>
          </ul>
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
          <SectionHeading>Try the app.</SectionHeading>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            The demo is coming soon. In the meantime, apply for the pilot
            and {OWNER.firstName} will drop you a link directly.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <OceanCta href="/app">Try the app</OceanCta>
            <OceanCta href="/contact" variant="ghost">
              Contact {OWNER.firstName}
            </OceanCta>
          </div>
        </section>
      </div>
    </OceanMain>
  );
}
