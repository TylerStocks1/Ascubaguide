"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed looping video hero with a single bold "A Scuba Guide"
 * display headline overlay.
 *
 * Replaces the previous 121-frame scroll-scrubbed canvas animation —
 * per Tyler's direction the hero is now just the video playing at the
 * top with bold type on it. Native page scroll behaves normally; the
 * hero unsticks the moment the user scrolls.
 *
 * Reduced-motion: the video is replaced by the first-frame poster
 * (still shipped in /public/frames/hero/0001.webp) and does not auto-
 * play. Headline + subline stay put.
 */

const POSTER_SRC = "/frames/hero/0001.webp";
const VIDEO_SOURCES = ["/videos/hero.mp4", "/videos/hero2.mp4"] as const;

export function HeroScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // When one clip ends, swap to the other. This gives the hero a
  // cycling A → B → A → B sequence instead of a single loop, so the
  // footage stays fresh for anyone who lingers on the page.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    const onEnded = () => {
      setVideoIndex((i) => (i + 1) % VIDEO_SOURCES.length);
    };
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [reducedMotion, videoIndex]);

  // When videoIndex changes, React rerenders the <video> with a new
  // `src` and the element must be manually kicked into play() because
  // autoPlay only fires on the initial mount.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    video.load();
    void video.play().catch(() => {
      // Autoplay can still be blocked on some browsers; poster remains.
    });
  }, [videoIndex, reducedMotion]);

  return (
    <section
      aria-label="A Scuba Guide — Koh Tao"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#001626] text-white"
    >
      {/* Background video. playsInline + muted lets iOS autoplay. The
          `key` on the element forces React to recreate the video when
          we swap sources between hero.mp4 and hero2.mp4. */}
      {!reducedMotion ? (
        <video
          key={VIDEO_SOURCES[videoIndex]}
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SOURCES[videoIndex]}
          poster={POSTER_SRC}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={POSTER_SRC}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Ocean gradient wash — deepens the video into the page below and
          tilts the hue toward caribbean-blue. `mix-blend-multiply`
          keeps the underwater texture but drops everything onto a
          cohesive palette. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#001626]/55 via-[#002d4a]/30 to-[#001626]/85 mix-blend-multiply"
      />

      {/* Caustic shimmer — a cheap CSS-only "pool light" pattern
          layered with low opacity for subtle movement. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-screen">
        <div className="absolute -inset-20 animate-[causticDrift_14s_ease-in-out_infinite] bg-[radial-gradient(circle_at_20%_30%,rgba(120,210,255,0.35),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(80,180,240,0.3),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(180,240,255,0.25),transparent_45%)]" />
      </div>

      {/* Bottom fade → page bg. Long fade (400px) over the video + a
          bottom curtain of pure page-bg ensures the hero flows into the
          next section with no hard seam. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[400px] bg-gradient-to-b from-transparent via-[#04131c]/70 to-[#04131c]"
      />

      {/* SVG wave divider — sits on the seam and physically shapes the
          handover into the page below. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-16 w-full text-[#04131c]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40 Q 240 0 480 40 T 960 40 T 1440 40 L 1440 80 L 0 80 Z"
          fill="currentColor"
        />
      </svg>

      {/* Headline overlay */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 sm:px-10">
        <p className="mb-8 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.4em] text-white/75 sm:text-xs">
          <span aria-hidden className="block h-px w-10 bg-white/60" />
          Koh Tao · Thailand
        </p>
        <h1
          className="font-display text-white"
          style={{
            lineHeight: 0.82,
            letterSpacing: "-0.035em",
            fontWeight: 900,
            textShadow: "0 6px 40px rgba(0,20,40,0.35)",
          }}
        >
          <span
            className="block uppercase"
            style={{ fontSize: "clamp(3.25rem, 14vw, 13rem)" }}
          >
            A Scuba
          </span>
          <span
            className="block uppercase italic"
            style={{
              fontSize: "clamp(3.25rem, 14vw, 13rem)",
              letterSpacing: "-0.02em",
            }}
          >
            <span
              className="bg-gradient-to-r from-[#7fdbff] via-[#bde9ff] to-white bg-clip-text text-transparent"
            >
              Guide
            </span>
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          The dive-briefing tool built by a working instructor. Every Koh
          Tao site, every species, cross-linked and tappable on the boat.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white no-underline backdrop-blur-xl transition-all duration-300 hover:-translate-y-[1px] hover:bg-white/15 hover:shadow-[0_20px_50px_-20px_rgba(120,210,255,0.6)]"
          >
            <span className="relative z-10">Apply for the pilot</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </a>
          <a
            href="/app-preview"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 no-underline transition hover:border-white/30 hover:text-white"
          >
            Try the app →
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/55">
        <span>Dive in</span>
        <span aria-hidden className="block h-10 w-px animate-[scrollCue_2.4s_ease-in-out_infinite] bg-gradient-to-b from-white/80 to-transparent" />
      </div>
    </section>
  );
}
