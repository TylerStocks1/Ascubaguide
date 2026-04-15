import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: `Try the app`,
  description: `Try the ${BUSINESS.name} dive briefing tool — demo coming soon.`,
  alternates: { canonical: "/app" },
  // Keep search engines away until the demo is live and the PWA is
  // actually mounted at /app (or proxied from /koh-tao).
  robots: { index: false, follow: false },
};

export default function AppPlaceholderPage() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-6 pt-32 text-center">
        <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/50">
          <span aria-hidden className="block h-px w-10 bg-white/30" />
          <span>Try the app</span>
        </div>

        <h1
          className="max-w-2xl text-white"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            fontWeight: 700,
          }}
        >
          The demo is <span style={{ color: "#0077b6" }}>almost ready.</span>
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
          We&apos;re polishing the {BUSINESS.name} Koh Tao briefing tool
          before wiring up a public demo. Want early access?{" "}
          <Link
            href="/contact"
            className="text-white underline underline-offset-4"
          >
            Apply for the pilot
          </Link>{" "}
          and George will drop you a link directly.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#0077b6] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white no-underline transition hover:-translate-y-[1px] hover:shadow-[0_10px_40px_rgba(0,119,182,0.35)]"
          >
            Apply for the pilot →
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white no-underline transition hover:bg-white/[0.08]"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
