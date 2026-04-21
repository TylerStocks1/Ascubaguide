import type { Metadata } from "next";
import type { ReactNode, SVGProps } from "react";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { HeroScrollVideo } from "@/components/marketing/HeroScrollVideo";
import { HowItWorks } from "@/components/marketing/HowItWorks";

/**
 * Homepage — redesigned for "under the water" feel.
 *
 * Structure: hero video → trusted-by (cert bodies) → parallax dive
 * moments → data-moat (sites × species) → pricing → closing stats.
 *
 * Palette: layered ocean blues from deep-abyss (#031018) to caribbean
 * shallows (#7fdbff) with liquid-glass surfaces. The old globe section
 * and light-ray overlay are removed per Tyler's direction.
 */

export const metadata: Metadata = {
  title: {
    absolute: `${BUSINESS.name}. Dive Briefing App for Koh Tao Schools`,
  },
  description:
    "Replace whiteboards and flip charts with a visual briefing tool covering 28 Koh Tao dive sites and 91+ species. Built by a RAID instructor with 2,000+ dives. Free during early access.",
  alternates: { canonical: "/" },
};

/** Ocean palette. MID is the page bg; CYAN + LAGOON drive accents. */
const MID = "#04131c";
const CYAN = "#7fdbff";
const LAGOON = "#38bdf8";

export default function HomePage() {
  return (
    <main className="relative overflow-x-clip text-white" style={{ backgroundColor: MID }}>
      {/* Ambient ocean glow — slow radial gradients behind everything */}
      <AmbientOcean />

      <HeroScrollVideo />
      <TrustedBySection />
      <HowItWorks />
      <DiveBannerSection />
      <ClosingSection />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Ambient ocean — animated radial gradients in the page background   */
/* ------------------------------------------------------------------ */

function AmbientOcean() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
      <div
        className="absolute -left-1/4 top-[30vh] h-[140vh] w-[140vh] rounded-full opacity-[0.22] blur-[120px] animate-[floatY_16s_ease-in-out_infinite]"
        style={{ background: `radial-gradient(circle, ${LAGOON} 0%, transparent 60%)` }}
      />
      <div
        className="absolute -right-1/4 top-[120vh] h-[120vh] w-[120vh] rounded-full opacity-[0.18] blur-[140px] animate-[floatY_22s_ease-in-out_infinite_reverse]"
        style={{ background: `radial-gradient(circle, ${CYAN} 0%, transparent 60%)` }}
      />
      <div
        className="absolute inset-x-0 top-[240vh] h-[100vh] opacity-[0.12] blur-[100px]"
        style={{ background: `radial-gradient(ellipse at center, ${LAGOON} 0%, transparent 70%)` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared primitives                                                  */
/* ------------------------------------------------------------------ */

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-white/55">
      <span aria-hidden className="block h-px w-10" style={{ backgroundColor: CYAN, opacity: 0.6 }} />
      <span className="font-medium">{children}</span>
    </div>
  );
}

function LiquidCta({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  if (variant === "ghost") {
    return (
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 no-underline transition hover:border-white/30 hover:text-white"
      >
        <span>{children}</span>
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#011826] no-underline transition-all duration-300 hover:-translate-y-[1px]"
      style={{
        background: `linear-gradient(135deg, #bde9ff 0%, ${CYAN} 55%, ${LAGOON} 100%)`,
        boxShadow: "0 18px 50px -12px rgba(127,219,255,0.55), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRightIcon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Trusted by — cert-body wordmarks                                    */
/* ------------------------------------------------------------------ */

function TrustedBySection() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06]">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-2">
            <SectionEyebrow>Cert agnostic</SectionEyebrow>
            <h2
              className="mt-5 font-display text-white"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
                fontWeight: 600,
              }}
            >
              Works with every school on the island.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Same reef, same fish, same briefings. Your standards stay
              yours.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
              {["RAID", "PADI", "SSI"].map((c) => (
                <div
                  key={c}
                  className="group relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 120%, ${CYAN}33, transparent 60%)`,
                    }}
                  />
                  <span
                    className="relative font-display uppercase text-white/85"
                    style={{
                      fontSize: "clamp(1.25rem, 3vw, 2rem)",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {c}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-right text-[11px] uppercase tracking-[0.3em] text-white/40">
              + every instructor on Koh Tao
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Dive banner — full-width card with copy + image slot               */
/*                                                                     */
/*  Replaces the depth-descent parallax. A single big liquid-glass card */
/*  that spans the content max-width, with the dive-moment copy on the  */
/*  left and an image slot on the right for Blizz to drop a real photo. */
/* ------------------------------------------------------------------ */

function DiveBannerSection() {
  return (
    <section
      className="relative my-24 w-full overflow-hidden md:my-32"
      style={{ minHeight: "70vh", backgroundColor: MID }}
    >
      {/* Reef photo as its own layer instead of a CSS background-image,
          so we can push it slightly past the section bounds. The old
          setup left a 1-pixel seam at the top and bottom where the
          gradient fade didn't fully cover the image; bleeding the
          <img> ±40px past the section and sitting the fades on top
          kills that seam. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/reef-banner.webp"
        alt=""
        aria-hidden
        className="absolute inset-x-0 -top-10 -bottom-10 h-[calc(100%+80px)] w-full object-cover"
      />

      {/* Readability wash — darken from the left so the copy reads. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(3,16,24,0.92) 0%, rgba(3,16,24,0.55) 45%, rgba(3,16,24,0.1) 75%, rgba(3,16,24,0) 100%)",
        }}
      />
      {/* Full-bleed top + bottom fades into page bg. Overshoot the
          section edges and use a solid MID endpoint so no pixel row
          of raw image peeks through. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1 h-40"
        style={{ background: `linear-gradient(to bottom, ${MID} 0%, ${MID} 8%, transparent 100%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-1 h-44"
        style={{ background: `linear-gradient(to top, ${MID} 0%, ${MID} 8%, transparent 100%)` }}
      />

      <div className="relative mx-auto grid min-h-[70vh] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-28 md:grid-cols-5 md:px-12 md:py-36 lg:px-16">
        <div className="flex flex-col justify-center gap-6 md:col-span-3">
          <SectionEyebrow>Every dive, every briefing</SectionEyebrow>
          <h2
            className="font-display text-white"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              fontWeight: 800,
              textShadow: "0 4px 30px rgba(0,20,40,0.5)",
            }}
          >
            Brief the dive, not the{" "}
            <span
              className="italic"
              style={{
                background: `linear-gradient(135deg, ${CYAN} 0%, #ffffff 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              whiteboard.
            </span>
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-white/85 md:text-lg">
            Tap through 28 Koh Tao dive sites and 91+ species. Read
            currents, hazards, depth profiles and the fish your students
            will actually meet, all before you kit up. Built from 2,000+
            dives on these reefs.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <LiquidCta href="/contact">Apply for the pilot</LiquidCta>
            <LiquidCta href="/app" variant="ghost">Try the app</LiquidCta>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing stats + CTA                                                */
/* ------------------------------------------------------------------ */

function ClosingSection() {
  return (
    <section className="relative border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionEyebrow>The shift</SectionEyebrow>
        <h2
          className="mt-6 max-w-3xl font-display text-white"
          style={{
            fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.03em",
            fontWeight: 700,
          }}
        >
          Faster briefings. Cleaner handovers. No whiteboard in sight.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <BeforeAfterCard
            kind="before"
            label="Before"
            value="15 min"
            caption="Whiteboards, flip charts, printed species sheets. A new briefing every shift."
          />
          <BeforeAfterCard
            kind="after"
            label="With A Scuba Guide"
            value="2 min"
            caption="Tap through site notes and species. Same tool, same data, every instructor."
          />
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pb-36 text-center">
        <h2
          className="max-w-3xl font-display text-white"
          style={{
            fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
            lineHeight: 0.94,
            letterSpacing: "-0.03em",
            fontWeight: 700,
          }}
        >
          Brief your next dive with{" "}
          <span
            className="italic"
            style={{
              background: `linear-gradient(135deg, ${CYAN} 0%, #ffffff 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {BUSINESS.name}
          </span>
          .
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <LiquidCta href="/contact">Apply for the pilot</LiquidCta>
          <LiquidCta href="/download" variant="ghost">Download app</LiquidCta>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterCard({
  kind,
  label,
  value,
  caption,
}: {
  kind: "before" | "after";
  label: string;
  value: string;
  caption: string;
}) {
  const accent = kind === "after" ? CYAN : "rgba(255,255,255,0.3)";
  return (
    <article
      className={`relative overflow-hidden rounded-3xl border p-8 md:p-10 ${
        kind === "after" ? "glass-strong" : "glass"
      }`}
      style={{
        borderColor: kind === "after" ? "rgba(127,219,255,0.35)" : "rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.3em] text-white/55">
          {label}
        </span>
        <span
          aria-hidden
          className="h-1 w-12 rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>
      <p
        className="mt-8 font-display text-white"
        style={{
          fontSize: "clamp(3rem, 8vw, 5.5rem)",
          fontWeight: 700,
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
        }}
      >
        {value}
      </p>
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
        {caption}
      </p>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    />
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </IconBase>
  );
}

