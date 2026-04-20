import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import {
  OceanMain,
  PageEyebrow,
  DisplayHeading,
  AccentWord,
  OceanCta,
} from "@/components/marketing/OceanChrome";

export const metadata: Metadata = {
  title: `Try the app`,
  description: `Try the ${BUSINESS.name} dive briefing tool. Demo coming soon.`,
  alternates: { canonical: "/app" },
  robots: { index: false, follow: false },
};

export default function AppPlaceholderPage() {
  return (
    <OceanMain>
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-6 pt-32 text-center">
        <PageEyebrow>Try the app</PageEyebrow>

        <DisplayHeading className="max-w-2xl">
          The demo is <AccentWord>almost ready.</AccentWord>
        </DisplayHeading>

        <p className="max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
          We&apos;re polishing the {BUSINESS.name} Koh Tao briefing tool
          before wiring up a public demo. Want early access?{" "}
          <Link
            href="/contact"
            className="text-white underline underline-offset-4"
          >
            Apply for the pilot
          </Link>{" "}
          and Blizz will drop you a link directly.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <OceanCta href="/contact">Apply for the pilot</OceanCta>
          <OceanCta href="/" variant="ghost">Back home</OceanCta>
        </div>
      </div>
    </OceanMain>
  );
}
