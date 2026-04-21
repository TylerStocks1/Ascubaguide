import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Shared chrome for interior pages — keeps the homepage's deep-ocean
 * palette + liquid-glass language consistent across /about, /contact,
 * /for-dive-schools, etc. without duplicating the ambient-gradient +
 * page-heading boilerplate on every page.
 */

const CYAN = "#7fdbff";
const LAGOON = "#38bdf8";

export function OceanMain({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#04131c] text-white">
      <AmbientOceanBg />
      <div className="relative z-10">{children}</div>
    </main>
  );
}

function AmbientOceanBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div
        className="absolute -left-1/4 top-[10vh] h-[120vh] w-[120vh] rounded-full opacity-[0.18] blur-[120px]"
        style={{ background: `radial-gradient(circle, ${LAGOON} 0%, transparent 60%)` }}
      />
      <div
        className="absolute -right-1/4 top-[90vh] h-[100vh] w-[100vh] rounded-full opacity-[0.14] blur-[140px]"
        style={{ background: `radial-gradient(circle, ${CYAN} 0%, transparent 60%)` }}
      />
    </div>
  );
}

export function PageEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-white/55">
      <span
        aria-hidden
        className="block h-px w-10"
        style={{ backgroundColor: CYAN, opacity: 0.6 }}
      />
      <span className="font-medium">{children}</span>
    </div>
  );
}

/** Display H1 — oceanic gradient italic accent span available via the
 *  `accent` prop. Size + weight matches the homepage hero's interior
 *  proportions. */
export function DisplayHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`font-display text-white ${className}`}
      style={{
        fontSize: "clamp(2.5rem, 7vw, 5.25rem)",
        lineHeight: 0.92,
        letterSpacing: "-0.03em",
        fontWeight: 900,
      }}
    >
      {children}
    </h1>
  );
}

export function AccentWord({ children }: { children: ReactNode }) {
  return (
    <span
      className="italic"
      style={{
        background: `linear-gradient(135deg, ${CYAN} 0%, #ffffff 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-white ${className}`}
      style={{
        fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
        lineHeight: 1.02,
        letterSpacing: "-0.025em",
        fontWeight: 900,
      }}
    >
      {children}
    </h2>
  );
}

export function OceanCta({
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
        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 no-underline transition hover:border-white/30 hover:text-white"
      >
        <span>{children}</span>
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#011826] no-underline transition-all duration-300 hover:-translate-y-[1px]"
      style={{
        background: `linear-gradient(135deg, #bde9ff 0%, ${CYAN} 55%, ${LAGOON} 100%)`,
        boxShadow:
          "0 18px 50px -12px rgba(127,219,255,0.55), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="relative z-10">→</span>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </Link>
  );
}

/** Bulleted list item with cyan dot */
export function OceanBullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden
        className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full"
        style={{ backgroundColor: CYAN, boxShadow: `0 0 12px ${CYAN}` }}
      />
      <span>{children}</span>
    </li>
  );
}

export const OCEAN_CYAN = CYAN;
export const OCEAN_LAGOON = LAGOON;
