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
          The preview is <AccentWord>live.</AccentWord>
        </DisplayHeading>

        <p className="max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
          Open the {BUSINESS.name} Koh Tao briefing tool in your browser.
          Every dive site, every species, cross-linked and offline-ready.
          Want a dedicated pilot for your school?{" "}
          <Link
            href="/contact"
            className="text-white underline underline-offset-4"
          >
            Apply here
          </Link>
          .
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="/app-preview"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#011826] no-underline transition-all duration-300 hover:-translate-y-[1px]"
            style={{
              background:
                "linear-gradient(135deg, #bde9ff 0%, #7fdbff 55%, #38bdf8 100%)",
              boxShadow:
                "0 18px 50px -12px rgba(127,219,255,0.55), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <span>Open the preview</span>
            <span aria-hidden>→</span>
          </a>
          <OceanCta href="/" variant="ghost">Back home</OceanCta>
        </div>
      </div>
    </OceanMain>
  );
}
