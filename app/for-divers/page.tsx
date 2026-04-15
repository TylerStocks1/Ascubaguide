import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";
import { DIVE_SITE_COUNT } from "@/lib/dive-sites";
import { FISH_COUNT } from "@/lib/fish";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";

export const metadata: Metadata = {
  title: `Koh Tao Dive Guide App — 24 Sites, 100+ Fish | ${BUSINESS.name}`,
  description:
    "Free dive companion for Koh Tao. Browse 24 dive sites and 100+ fish species on any phone. No app store needed — install in one tap.",
  alternates: { canonical: "/for-divers" },
};

const FAQS: FaqItem[] = [
  {
    question: "Is it really free?",
    answer:
      "Yes — completely free for divers. There are no in-app purchases, ads, accounts, or upsells. The app is funded via the dive-school product, not via you.",
  },
  {
    question: "How do I install it on my phone?",
    answer:
      "Open ascubaguide.com/koh-tao in Safari (iPhone) or Chrome (Android), then choose 'Add to Home Screen' from the share menu. It now behaves like a normal app — full screen, offline, no browser bar. Step-by-step instructions are on the install page.",
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
    <main className="mx-auto max-w-3xl px-4 py-12">
      <BreadcrumbSchema crumbs={[{ name: "For divers", path: "/for-divers" }]} />
      <FaqSchema faqs={FAQS} />

      <p className="text-sm uppercase tracking-wide text-neutral-500">
        For divers booking a Koh Tao trip
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Know every dive site on Koh Tao before you hit the water
      </h1>
      <p className="mt-6 text-lg text-neutral-700">
        {BUSINESS.name} is a free dive companion for Koh Tao. Browse{" "}
        {DIVE_SITE_COUNT} dive sites and {FISH_COUNT}+ fish species on any phone,
        cross-linked so you can jump from a site to its species and back. No app
        store, no account, no fee. Built by {OWNER.firstName}, a working RAID
        instructor on Koh Tao.
      </p>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Why divers actually use it</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Plan your trip.</strong> See depths, difficulties and the
            highlights of every Koh Tao site before you book.
          </li>
          <li>
            <strong>Brief yourself.</strong> Tap any site to read what to expect
            — currents, swim-throughs, the species you might see.
          </li>
          <li>
            <strong>ID what you saw.</strong> Tap any species after the dive to
            confirm what you spotted and read its behaviour notes.
          </li>
          <li>
            <strong>Works offline.</strong> Add to your home screen once and the
            data lives on your phone for the whole trip.
          </li>
        </ul>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">It is not an app store app</h2>
        <p>
          {BUSINESS.name} is a Progressive Web App. You open a URL in your
          phone&apos;s browser, hit &ldquo;Add to Home Screen&rdquo;, and from
          that point on it launches like a native app — full screen, with its
          own icon, working offline. There is no App Store review, no Play Store
          download, no permissions request, no tracking SDK. It is just a
          well-built website that happens to behave like an app.
        </p>
        <p>
          <Link href="/install">See the 30-second install guide &rarr;</Link>
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Browse before you install</h2>
        <p>
          Every dive site and every species is on the public site already. You
          can read everything from your laptop on the way to the airport.
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
        <h2 className="text-2xl font-semibold">Open the app</h2>
        <p className="mt-2 text-neutral-700">
          One tap. No account. Works on every phone.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/koh-tao"
            className="rounded-md border border-neutral-900 px-4 py-2 font-medium"
          >
            Open the Koh Tao app
          </Link>
          <Link
            href="/install"
            className="rounded-md border border-neutral-300 px-4 py-2 font-medium"
          >
            Install instructions
          </Link>
        </div>
      </section>
    </main>
  );
}
