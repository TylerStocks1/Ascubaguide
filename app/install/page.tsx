import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSchema, type FaqItem } from "@/components/schema/FaqSchema";

export const metadata: Metadata = {
  title: `Install ${BUSINESS.name} on iPhone or Android — No App Store`,
  description: `Step-by-step guide to install ${BUSINESS.name} as an app on your phone in 30 seconds. Works on iOS Safari, Chrome and any modern browser. No store needed.`,
  alternates: { canonical: "/install" },
};

const FAQS: FaqItem[] = [
  {
    question: "Why is there no App Store version?",
    answer:
      "A Scuba Guide is built as a Progressive Web App. PWAs install directly from the browser, work offline, and don't go through App Store review. You skip the 200MB download, the permission requests, and the tracking SDKs.",
  },
  {
    question: "Will it work offline on the boat?",
    answer:
      "Yes. Once you've opened the app once, the dive site notes and species data are cached on your phone. You can browse every site and every species with no signal — exactly what the day boat needs.",
  },
  {
    question: "How do I update it?",
    answer:
      "Updates are pushed automatically the next time you open the app with internet. There is no Play Store / App Store update screen.",
  },
  {
    question: "How do I uninstall it?",
    answer:
      "Long-press the icon on your home screen and tap Remove (iOS) or Uninstall (Android). It vanishes like any other app.",
  },
];

export default function InstallPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <BreadcrumbSchema crumbs={[{ name: "Install", path: "/install" }]} />
      <FaqSchema faqs={FAQS} />

      <p className="text-sm uppercase tracking-wide text-neutral-500">Install guide</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Add {BUSINESS.name} to your home screen
      </h1>
      <p className="mt-6 text-lg text-neutral-700">
        {BUSINESS.name} installs directly from your phone&apos;s browser in about
        30 seconds. There is no App Store download, no account creation, and no
        tracking SDK. It runs offline once installed, so it works on the day
        boat with no signal.
      </p>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">iPhone (iOS Safari)</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            Open <Link href="/koh-tao">ascubaguide.com/koh-tao</Link> in Safari.
            (Safari only — not Chrome on iOS.)
          </li>
          <li>
            Tap the <strong>Share</strong> button at the bottom of the screen
            (the square with the up-arrow).
          </li>
          <li>
            Scroll down and tap <strong>Add to Home Screen</strong>.
          </li>
          <li>
            Confirm the name (&ldquo;{BUSINESS.name}&rdquo;) and tap{" "}
            <strong>Add</strong>.
          </li>
          <li>
            The icon now lives on your home screen and launches like any other
            app.
          </li>
        </ol>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Android (Chrome)</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            Open <Link href="/koh-tao">ascubaguide.com/koh-tao</Link> in Chrome.
          </li>
          <li>
            Tap the three-dot menu in the top-right corner.
          </li>
          <li>
            Tap <strong>Install app</strong> (or <strong>Add to Home screen</strong>{" "}
            on older Chrome versions).
          </li>
          <li>
            Confirm. The icon appears on your home screen.
          </li>
        </ol>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">Desktop (Chrome, Edge)</h2>
        <p>
          On a laptop or desktop, you&apos;ll see an install icon in the address
          bar (a small computer/download icon on the right side). Click it and
          confirm. The app opens in its own window.
        </p>
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
        <h2 className="text-2xl font-semibold">Or just open it in the browser</h2>
        <p className="mt-2 text-neutral-700">
          You don&apos;t have to install anything. The full app works straight
          from a browser tab.
        </p>
        <Link
          href="/koh-tao"
          className="mt-4 inline-block rounded-md border border-neutral-900 px-4 py-2 font-medium"
        >
          Open the Koh Tao app
        </Link>
      </section>
    </main>
  );
}
