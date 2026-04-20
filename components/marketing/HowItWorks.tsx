"use client";

import { useScroll, useTransform, motion, type MotionValue } from "motion/react";
import { useRef } from "react";

/**
 * Interactive scroll explainer. Sticky viewport on the right with a
 * mock phone screen; the text panels on the left step through the
 * four things the app actually does, and the active step highlights
 * as the user scrolls.
 *
 * Feels like a vertical scroll story: one screen tall, pins in place
 * while the viewer reads through the steps. No clicking, no sliders,
 * scroll is the only interaction.
 */

const STEPS = [
  {
    eyebrow: "Step 1",
    title: "Pick your dive site.",
    body: "Tap one of 28 Koh Tao sites. See the map, depth profile, currents, entry point, and the conditions to watch for before you drop.",
    screenLabel: "28 SITES",
    sub: "Chumphon Pinnacle · Southwest Pinnacle · Sail Rock · Shark Island…",
  },
  {
    eyebrow: "Step 2",
    title: "See every fish that lives there.",
    body: "Each site is cross-linked to the species you'll actually encounter. Tap one to read size, behaviour, and the best depth to spot it at.",
    screenLabel: "+ 91 species",
    sub: "Whale shark · Titan triggerfish · Parrotfish · Chevron barracuda…",
  },
  {
    eyebrow: "Step 3",
    title: "Brief the dive in two minutes.",
    body: "Instructors tap through the same canonical site notes every shift. No whiteboard, no flip chart, no 15-minute monologue students forget.",
    screenLabel: "2 min briefing",
    sub: "One tool. Every instructor. Same brief, every single time.",
  },
  {
    eyebrow: "Step 4",
    title: "Works on the boat. Offline.",
    body: "Load it once on the pier, then lose signal on the 40-minute ride out. The site notes and species data stay in your pocket.",
    screenLabel: "Offline ready",
    sub: "No app store. No login. Installs to the home screen in one tap.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      aria-label="How it works"
      className="relative"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
          {/* Left: step copy */}
          <div className="relative flex h-full flex-col justify-center">
            <div className="mb-10">
              <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/55">
                <span
                  aria-hidden
                  className="block h-px w-10"
                  style={{ backgroundColor: "#7fdbff", opacity: 0.6 }}
                />
                <span className="font-medium">How it works</span>
              </div>
              <h2
                className="mt-5 font-display text-white"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                }}
              >
                Scroll to see the app walk itself through a dive.
              </h2>
            </div>

            <div className="relative min-h-[260px]">
              {STEPS.map((s, i) => (
                <Step
                  key={i}
                  index={i}
                  total={STEPS.length}
                  data={s}
                  progress={scrollYProgress}
                />
              ))}
            </div>

            {/* Progress pips */}
            <div className="mt-10 flex items-center gap-2">
              {STEPS.map((_, i) => (
                <ProgressPip
                  key={i}
                  index={i}
                  total={STEPS.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>

          {/* Right: phone mock */}
          <div className="relative flex h-full items-center justify-center">
            <PhoneFrame>
              {STEPS.map((s, i) => (
                <PhoneScreen
                  key={i}
                  index={i}
                  total={STEPS.length}
                  data={s}
                  progress={scrollYProgress}
                />
              ))}
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  total,
  data,
  progress,
}: {
  index: number;
  total: number;
  data: (typeof STEPS)[number];
  progress: MotionValue<number>;
}) {
  const band = 1 / total;
  const start = index * band;
  const end = start + band;
  const opacity = useTransform(
    progress,
    [start, start + band * 0.2, end - band * 0.2, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, (start + end) / 2, end], [24, 0, -24]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col gap-4"
    >
      <p className="text-[11px] uppercase tracking-[0.35em] text-[#7fdbff]/80">
        {data.eyebrow}
      </p>
      <h3
        className="font-display text-white"
        style={{
          fontSize: "clamp(1.9rem, 4vw, 3rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontWeight: 800,
        }}
      >
        {data.title}
      </h3>
      <p className="max-w-md text-base leading-relaxed text-white/70">
        {data.body}
      </p>
    </motion.div>
  );
}

function ProgressPip({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const band = 1 / total;
  const start = index * band;
  const end = start + band;
  const activeOpacity = useTransform(
    progress,
    [start, start + band * 0.2, end - band * 0.2, end],
    [0.25, 1, 1, 0.25]
  );
  const activeWidth = useTransform(
    progress,
    [start, start + band * 0.2, end - band * 0.2, end],
    [16, 40, 40, 16]
  );

  return (
    <motion.span
      aria-hidden
      className="block h-[3px] rounded-full bg-[#7fdbff]"
      style={{ opacity: activeOpacity, width: activeWidth }}
    />
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full max-w-[320px]"
      style={{ aspectRatio: "9 / 19" }}
    >
      {/* Soft glow behind the phone */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 rounded-[48px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(127,219,255,0.35) 0%, transparent 65%)",
        }}
      />
      <div
        className="relative h-full w-full overflow-hidden rounded-[40px] border border-white/15"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,50,80,0.6) 0%, rgba(3,16,24,0.95) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.2), 0 40px 80px -30px rgba(0,80,140,0.5)",
        }}
      >
        {/* Top notch */}
        <div
          aria-hidden
          className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/60"
        />
        {children}
      </div>
    </div>
  );
}

function PhoneScreen({
  index,
  total,
  data,
  progress,
}: {
  index: number;
  total: number;
  data: (typeof STEPS)[number];
  progress: MotionValue<number>;
}) {
  const band = 1 / total;
  const start = index * band;
  const end = start + band;
  const opacity = useTransform(
    progress,
    [start, start + band * 0.15, end - band * 0.15, end],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    progress,
    [start, (start + end) / 2, end],
    [0.96, 1, 0.96]
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
    >
      {/* Fake app chrome at top */}
      <div className="absolute inset-x-6 top-14 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
          A Scuba Guide
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          {data.eyebrow}
        </span>
      </div>

      {/* Big display label */}
      <span
        className="font-display text-white"
        style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          fontWeight: 800,
          textShadow: "0 4px 30px rgba(127,219,255,0.35)",
        }}
      >
        {data.screenLabel}
      </span>

      <p className="max-w-[85%] text-xs leading-relaxed text-white/65">
        {data.sub}
      </p>

      {/* Bottom home indicator */}
      <div
        aria-hidden
        className="absolute bottom-3 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-white/30"
      />
    </motion.div>
  );
}
