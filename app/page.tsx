import type { Metadata } from "next";
import type { ReactNode, SVGProps } from "react";
import Link from "next/link";
import { BUSINESS, OWNER } from "@/lib/business";
import { DIVE_SITE_COUNT } from "@/lib/dive-sites";
import { FISH_COUNT } from "@/lib/fish";
import { HeroScrollVideo } from "@/components/marketing/HeroScrollVideo";
import { Component as InteractiveGlobe } from "@/components/ui/interactive-globe";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { LightRays } from "@/components/ui/light-rays";

/**
 * Homepage — dark editorial theme on top of the scroll-scrub hero.
 *
 * Structure roughly matches the dark SaaS reference Tyler shared
 * (Cyclops influencer-AI landing page): hero → trusted-by → feature
 * cards → data-moat stats card → pricing card → bottom stats → footer.
 * Adapted for the A Scuba Guide content set with our underwater dark
 * theme + Archivo 900 display face.
 *
 * The <main> is scoped `bg-neutral-950 text-white` so the dark theme
 * lives only on the homepage. Interior pages still render light on
 * their own body bg — the shared Footer in app/layout.tsx sits on
 * whatever the body colour is, which means it'll be on bg-white
 * beneath the dark homepage until we dark-theme the interior pages.
 * Flagged as a known gap.
 */

export const metadata: Metadata = {
  title: {
    absolute: `${BUSINESS.name} — Dive Briefing App for Koh Tao Schools`,
  },
  description:
    "Replace whiteboards and flip charts with a visual briefing tool covering 28 Koh Tao dive sites and 91+ species. Built by a RAID instructor with 2,000+ dives. Free during early access.",
  alternates: { canonical: "/" },
};

/** Ocean-blue accent — Tyler's "blue and white for the ocean" pivot.
 *  Deep cerulean at #0077b6, distinct from the banned PWA palette
 *  (#0ea5e9 cyan and #f97316 coral) and the warm sunset-red the page
 *  was using in the previous iteration. Sparingly used for primary
 *  CTAs, feature-icon tint, and one or two accent glyphs — overusing
 *  it kills the effect. */
const ACCENT = "#0077b6";

export default function HomePage() {
  return (
    <main className="bg-neutral-950 text-white">
      <HeroScrollVideo />
      <TrustedBySection />
      <GlobeSection />
      <ZoomParallaxSection />
      <UsefulStatisticSection />
      <PricingSection />
      <BottomStatsSection />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared primitives                                                  */
/* ------------------------------------------------------------------ */

/** Small top-of-section label. Editorial moment: small uppercase tag,
 *  thin hairline rule, works on dark only. */
function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-white/50">
      <span aria-hidden className="block h-px w-10 bg-white/30" />
      <span className="font-medium">{children}</span>
    </div>
  );
}

function PrimaryCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white no-underline transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_40px_rgba(196,77,55,0.35)]"
      style={{ backgroundColor: ACCENT }}
    >
      <span>{children}</span>
      <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

function SecondaryCta({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white no-underline transition-colors duration-200 hover:bg-white/[0.08]"
    >
      <span>{children}</span>
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Trusted by                                                         */
/*                                                                     */
/*  Editorial "built for" row — matches the "Trusted By" band in the   */
/*  reference, but we don't have real dive-school logos yet (blocked   */
/*  on Hydronauts endorsement confirmation + pilot schools list in    */
/*  BLOCKERS.md), so we fall back to the three cert-body wordmarks.   */
/* ------------------------------------------------------------------ */

function TrustedBySection() {
  return (
    <section className="relative border-b border-white/5">
      {/* Underwater light rays — rendered as an absolutely-positioned
          overlay inside this first content section. They span 2
          viewports downward so the shimmer is visible from the moment
          the hero gradient hands off into the page all the way through
          the Globe section. The mix-blend-mode: screen inside the
          component itself softens the rays against the dark bg. */}
      <LightRays
        className="h-[200vh]"
        rayCount={13}
        color="rgba(120, 190, 230, 0.32)"
        opacity={0.55}
        blur={55}
        spreadAngle={60}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-20 text-center sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
          Built for dive schools teaching
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
          <span className="text-3xl font-black tracking-tight text-white/85 sm:text-4xl">
            RAID
          </span>
          <span aria-hidden className="h-6 w-px bg-white/10 sm:h-8" />
          <span className="text-3xl font-black tracking-tight text-white/85 sm:text-4xl">
            PADI
          </span>
          <span aria-hidden className="h-6 w-px bg-white/10 sm:h-8" />
          <span className="text-3xl font-black tracking-tight text-white/85 sm:text-4xl">
            SSI
          </span>
          <span aria-hidden className="hidden h-6 w-px bg-white/10 sm:block sm:h-8" />
          <span className="text-sm uppercase tracking-[0.2em] text-white/40">
            &amp; every instructor on Koh Tao
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Globe — replaces the old "What we offer" feature-card grid         */
/*                                                                     */
/*  Layout is lifted from the 21st.dev interactive-globe demo but with */
/*  the "All systems operational" pill removed (Tyler's ask) and the   */
/*  copy rewritten so the section reads as 'a global dive briefing     */
/*  tool' rather than a generic global-edge-network brag.              */
/* ------------------------------------------------------------------ */

function GlobeSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02]">
        {/* Ambient accent glow — ties the card to the warm homepage accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-1/4 top-0 h-96 w-96 rounded-full opacity-[0.08] blur-3xl"
          style={{ backgroundColor: ACCENT }}
        />

        <div className="flex min-h-[500px] flex-col md:flex-row">
          {/* Left: copy */}
          <div className="relative z-10 flex flex-1 flex-col justify-center p-10 md:p-14">
            <SectionEyebrow>Global dive briefing</SectionEyebrow>
            <h2
              className="mt-6 max-w-md text-white"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                fontWeight: 900,
              }}
            >
              Built for divers.
              <br />
              <span style={{ color: ACCENT }}>Wherever they dive.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
              A Scuba Guide is built for the instructors of Koh Tao today —
              and shaped to expand to every coast the sun reaches. Drag the
              globe to explore.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <div>
                <p className="text-2xl font-black text-white">
                  {DIVE_SITE_COUNT}
                </p>
                <p className="text-xs uppercase tracking-wider text-white/40">
                  Dive sites
                </p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-black text-white">{FISH_COUNT}+</p>
                <p className="text-xs uppercase tracking-wider text-white/40">
                  Species
                </p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-black text-white">
                  {OWNER.diveCount.toLocaleString()}+
                </p>
                <p className="text-xs uppercase tracking-wider text-white/40">
                  Dives logged
                </p>
              </div>
            </div>
          </div>

          {/* Right: globe */}
          <div className="flex min-h-[400px] flex-1 items-center justify-center p-4 md:p-0">
            <InteractiveGlobe size={460} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Zoom Parallax — real images dropped into /public/images/           */
/*                                                                     */
/*  The component renders 7 tiled images at different zoom levels.     */
/*  INDEX 0 is the centre tile that fills the screen at max scroll,    */
/*  so that slot gets the hero image. Tyler asked for fish3.jpg to     */
/*  be the zoom target — positioning it at index 0 satisfies that.    */
/*  Remaining slots cycle through the other two real photos.           */
/* ------------------------------------------------------------------ */

const ZOOM_PARALLAX_IMAGES = [
  // Index 0 — centre / zoom-into target
  { src: "/images/fish3.jpg", alt: "Reef fish close-up" },
  { src: "/images/image1.png", alt: "Koh Tao dive scene" },
  { src: "/images/image2.png", alt: "Koh Tao underwater moment" },
  { src: "/images/image1.png", alt: "Koh Tao dive scene" },
  { src: "/images/image2.png", alt: "Koh Tao underwater moment" },
  { src: "/images/image1.png", alt: "Koh Tao dive scene" },
  { src: "/images/image2.png", alt: "Koh Tao underwater moment" },
];

function ZoomParallaxSection() {
  return (
    <section aria-label="Dive moments" className="relative">
      <div className="relative mx-auto mb-12 max-w-6xl px-6 text-center">
        <SectionEyebrow>Field moments</SectionEyebrow>
        <h2
          className="mt-6 mx-auto max-w-3xl text-white"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            fontWeight: 900,
          }}
        >
          Scroll to dive.
        </h2>
      </div>
      <ZoomParallax images={ZOOM_PARALLAX_IMAGES} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Useful statistic — big data-moat card                              */
/*                                                                     */
/*  Matches the "View Useful Statistic" card in the reference but      */
/*  instead of a fake dashboard preview we show the actual SEO moat:   */
/*  28 × 91+ as giant sculptural typography with the cross-linking     */
/*  spelled out beneath.                                               */
/* ------------------------------------------------------------------ */

function UsefulStatisticSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-10 md:p-16">
        {/* Subtle radial glow top-right — ties the card to the warm
            accent used elsewhere without flooding it */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full opacity-[0.12]"
          style={{
            background: `radial-gradient(circle, ${ACCENT} 0%, transparent 60%)`,
          }}
        />

        <div className="relative flex flex-col gap-12 md:flex-row md:items-center md:gap-20">
          {/* Left: copy */}
          <div className="flex-1 flex flex-col items-start gap-6">
            <SectionEyebrow>The data moat</SectionEyebrow>
            <h2
              className="max-w-lg text-white"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.02em",
                fontWeight: 900,
              }}
            >
              Every site cross-linked to every species.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/55 md:text-base">
              Tap a dive site, see its fish. Tap a fish, see where it lives.
              The only Koh Tao briefing tool with a bi-directional data model.
            </p>
            <div className="pt-2">
              <SecondaryCta href="/app">Explore the data</SecondaryCta>
            </div>
          </div>

          {/* Right: the sculptural number */}
          <div className="flex flex-1 items-baseline justify-center gap-5">
            <div className="flex flex-col items-end">
              <span
                className="text-white"
                style={{
                  fontSize: "clamp(4.5rem, 11vw, 9rem)",
                  fontWeight: 900,
                  lineHeight: 0.85,
                  letterSpacing: "-0.03em",
                }}
              >
                {DIVE_SITE_COUNT}
              </span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
                Dive sites
              </span>
            </div>
            <span
              aria-hidden
              className="self-center text-4xl font-light text-white/30 md:text-6xl"
              style={{ transform: "translateY(-0.3em)" }}
            >
              ×
            </span>
            <div className="flex flex-col items-start">
              <span
                className="flex items-baseline"
                style={{
                  fontSize: "clamp(4.5rem, 11vw, 9rem)",
                  fontWeight: 900,
                  lineHeight: 0.85,
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="text-white">{FISH_COUNT}</span>
                <span style={{ color: ACCENT }}>+</span>
              </span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
                Species
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing — free during early access                                 */
/*                                                                     */
/*  The reference has two pricing cards side-by-side. We only have     */
/*  one tier until post-pilot pricing is decided (see BLOCKERS.md),    */
/*  so we show the free card prominently and a "Custom / Post-launch"  */
/*  placeholder card next to it so the section still reads as "two    */
/*  options".                                                          */
/* ------------------------------------------------------------------ */

function PricingSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="mb-16 flex flex-col items-center gap-6 text-center md:mb-20">
        <SectionEyebrow>Friendly pricing</SectionEyebrow>
        <h2
          className="max-w-2xl text-white"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            fontWeight: 900,
          }}
        >
          Free for every Koh Tao dive school.
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-white/55">
          No credit card, no per-seat fee, no hidden tier. Pilots will be
          grandfathered on terms when general availability pricing launches.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <PricingCard
          label="Early access"
          price="$0"
          cadence="Free during pilot"
          description="Everything A Scuba Guide does, free for Koh Tao RAID, PADI and SSI dive schools during the early-access pilot."
          features={[
            "Every Koh Tao dive site",
            "Every recorded species, cross-linked",
            "Unlimited instructors",
            "Unlimited students",
            "Works offline on the boat",
            `Direct line to ${OWNER.firstName}`,
          ]}
          ctaHref="/contact"
          ctaLabel="Apply for the pilot"
          emphasised
        />
        <PricingCard
          label="Post-pilot"
          price="TBD"
          cadence="After general availability"
          description="Pricing tiers are being shaped by real pilot usage. Apply for the pilot to get grandfathered pricing when GA launches."
          features={[
            "Pilot terms grandfathered",
            "Priority site-note updates",
            "Multi-shop dashboard",
            "Custom content requests",
            "Early access to new cities",
            "Same tool, same data",
          ]}
          ctaHref="/about"
          ctaLabel="Learn more"
        />
      </div>
    </section>
  );
}

function PricingCard({
  label,
  price,
  cadence,
  description,
  features,
  ctaHref,
  ctaLabel,
  emphasised = false,
}: {
  label: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  ctaHref: string;
  ctaLabel: string;
  emphasised?: boolean;
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-[32px] border p-10 md:p-12 ${
        emphasised
          ? "border-white/20 bg-gradient-to-b from-white/[0.06] to-white/[0.02]"
          : "border-white/10 bg-white/[0.02]"
      }`}
    >
      {emphasised && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent 0%, ${ACCENT} 50%, transparent 100%)`,
          }}
        />
      )}

      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">
          {label}
        </p>
        {emphasised && (
          <span
            className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white"
            style={{ backgroundColor: `${ACCENT}33`, color: ACCENT }}
          >
            Pilot
          </span>
        )}
      </div>

      <div className="mt-8 flex items-baseline gap-3">
        <span
          className="text-white"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 6rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.025em",
          }}
        >
          {price}
        </span>
        <span className="text-sm text-white/40">{cadence}</span>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-white/55">{description}</p>

      <ul className="mt-10 space-y-4">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-white/75">
            <span
              aria-hidden
              className="mt-[2px] grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border border-white/20"
              style={{
                backgroundColor: emphasised ? `${ACCENT}22` : "transparent",
              }}
            >
              <CheckIcon
                className="h-3 w-3"
                style={{ color: emphasised ? ACCENT : "rgba(255,255,255,0.6)" }}
              />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-10">
        {emphasised ? (
          <PrimaryCta href={ctaHref}>{ctaLabel}</PrimaryCta>
        ) : (
          <SecondaryCta href={ctaHref}>{ctaLabel}</SecondaryCta>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Bottom stats — two big numbers (mirrors the reference's footer)    */
/* ------------------------------------------------------------------ */

function BottomStatsSection() {
  return (
    <section className="relative border-t border-white/5">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-28 md:grid-cols-2 md:gap-20 md:py-36">
        <BottomStat
          value="2 min"
          label="Briefings instead of fifteen"
          body={`A working instructor taps through the tool and runs a full dive briefing in under two minutes. Save 13 minutes of student attention every single morning.`}
        />
        <BottomStat
          value="0"
          label="Whiteboards required"
          body={`Retire the whiteboard, the flip chart, and the printed species sheet. One tool reads from the same canonical notes every instructor on your roster briefs from.`}
        />
      </div>

      {/* Final accent CTA bar */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 pb-32 text-center">
        <h2
          className="max-w-2xl text-white"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            fontWeight: 900,
          }}
        >
          Brief your next dive with {BUSINESS.name}.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <PrimaryCta href="/contact">Apply for the pilot</PrimaryCta>
          <SecondaryCta href="/download">Download app</SecondaryCta>
        </div>
      </div>
    </section>
  );
}

function BottomStat({
  value,
  label,
  body,
}: {
  value: string;
  label: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <span
        className="block text-white"
        style={{
          fontSize: "clamp(3.5rem, 9vw, 7rem)",
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
        }}
      >
        {value}
      </span>
      <p
        className="text-xl text-white"
        style={{ fontWeight: 900, lineHeight: 1.1 }}
      >
        {label}
      </p>
      <p className="max-w-md text-sm leading-relaxed text-white/55">{body}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
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

function CheckIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <IconBase className={className} style={style} strokeWidth={2.5}>
      <path d="M20 6 9 17l-5-5" />
    </IconBase>
  );
}
