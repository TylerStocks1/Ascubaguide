import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";
import {
  OceanMain,
  PageEyebrow,
  DisplayHeading,
  AccentWord,
  OceanCta,
} from "@/components/marketing/OceanChrome";

export const metadata: Metadata = {
  title: `Download the app`,
  description: `${BUSINESS.name} is coming to iOS, Android and the web.`,
  alternates: { canonical: "/download" },
  robots: { index: false, follow: false },
};

export default function DownloadPlaceholderPage() {
  return (
    <OceanMain>
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-6 pt-32 text-center">
        <PageEyebrow>Download</PageEyebrow>

        <DisplayHeading className="max-w-2xl">
          Coming to the <AccentWord>app stores.</AccentWord>
        </DisplayHeading>

        <p className="max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
          {BUSINESS.name} is still being built by Blizz on Koh Tao. The
          iOS and Android releases will live here when they launch. In
          the meantime, apply for the pilot and we&apos;ll get your shop
          onto the early preview.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <OceanCta href="/contact">Apply for the pilot</OceanCta>
          <OceanCta href="/" variant="ghost">Back home</OceanCta>
        </div>
      </div>
    </OceanMain>
  );
}
