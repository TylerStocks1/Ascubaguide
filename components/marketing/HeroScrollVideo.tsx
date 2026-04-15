"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Scroll-triggered video hero.
 *
 * The video has three fixed chapters:
 *   0  →  4s   (auto-plays on page load)
 *   4  →  6s   (starts on first scroll)
 *   6  → 10s   (starts on second scroll)
 *
 * Any scroll gesture (wheel, touch) while the hero is in view advances the
 * current chapter — the scroll distance is ignored. Until chapter 3 finishes,
 * the window scroll position is locked at the top so the user can't scroll
 * past the hero before the video has played out. Once chapter 3 ends,
 * scrolling unlocks and the rest of the page becomes reachable.
 *
 * Visual treatment follows the reference "WATER SPACE" web concept — large
 * split headline (solid + outlined), floating header with backdrop-blur,
 * vertical text rail on the left edge.
 */

type Chapter = { start: number; end: number };

const CHAPTERS: Chapter[] = [
  { start: 0, end: 4 },
  { start: 4, end: 6 },
  { start: 6, end: 10 },
];

const SCROLL_THRESHOLD = 15;

export function HeroScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);
  const [allDone, setAllDone] = useState(false);
  // Guard so a fast trackpad burst advances only one chapter per gesture.
  const gestureLocked = useRef(false);

  const playChapter = useCallback((index: number) => {
    const v = videoRef.current;
    if (!v) return;
    const c = CHAPTERS[index];
    if (!c) return;
    v.currentTime = c.start;
    v.play().catch(() => {
      // Autoplay may be blocked; the chapter will resume once the user
      // interacts via wheel/touch anyway.
    });
  }, []);

  // Chapter 1 auto-plays on mount.
  useEffect(() => {
    playChapter(0);
  }, [playChapter]);

  // Pause at the end of whichever chapter is currently playing. When
  // chapter 3 finishes, release the scroll lock so the page below is
  // reachable.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      const c = CHAPTERS[chapter];
      if (!c) return;
      if (v.currentTime >= c.end) {
        v.pause();
        v.currentTime = c.end;
        if (chapter === CHAPTERS.length - 1) {
          setAllDone(true);
        }
      }
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [chapter]);

  // Wheel + touch listeners advance the chapter. While any chapter is still
  // pending we also preventDefault on wheel so the window doesn't scroll past
  // the hero before the video has played out.
  useEffect(() => {
    if (allDone) return; // Release scroll once the story has finished.

    const advance = (direction: 1 | -1) => {
      if (gestureLocked.current) return;
      gestureLocked.current = true;
      // Unlock after the video segment has had time to play. The longest
      // segment is 4 seconds, so 500ms is enough to prevent accidental
      // double-advances without feeling sluggish.
      window.setTimeout(() => {
        gestureLocked.current = false;
      }, 500);
      setChapter((current) => {
        const next = Math.min(
          CHAPTERS.length - 1,
          Math.max(0, current + direction)
        );
        if (next !== current) playChapter(next);
        return next;
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < SCROLL_THRESHOLD) return;
      e.preventDefault();
      advance(e.deltaY > 0 ? 1 : -1);
    };

    let touchStartY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY == null) return;
      const delta = touchStartY - (e.touches[0]?.clientY ?? touchStartY);
      if (Math.abs(delta) < 30) return;
      e.preventDefault();
      advance(delta > 0 ? 1 : -1);
      touchStartY = null;
    };

    // preventDefault requires non-passive listeners.
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    // Keep the page locked at y=0 while the story is running.
    window.scrollTo({ top: 0 });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [allDone, playChapter]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-neutral-950 text-white"
      aria-label="A Scuba Guide — Koh Tao"
    >
      {/* Background video — covers the full viewport, plays silently */}
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Readability overlay — subtle dark gradient so the headline reads
          against any frame of the video */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"
      />

      {/* Floating header with 80px backdrop blur */}
      <header className="absolute inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6 sm:pt-6">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.22em] text-white shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-[80px] sm:px-6"
        >
          <button
            type="button"
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 bg-white/5 backdrop-blur-[80px] transition hover:bg-white/10"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="flex flex-col gap-1">
              <span className="block h-[1.5px] w-4 bg-white" />
              <span className="block h-[1.5px] w-4 bg-white" />
              <span className="block h-[1.5px] w-4 bg-white" />
            </span>
          </button>

          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <Link href="/" className="no-underline hover:text-white/70">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dive-sites" className="no-underline hover:text-white/70">
                Dive sites
              </Link>
            </li>
            <li>
              <Link href="/fish" className="no-underline hover:text-white/70">
                Fish
              </Link>
            </li>
            <li>
              <Link href="/about" className="no-underline hover:text-white/70">
                About
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/for-dive-schools"
              className="hidden rounded-full border border-white/20 bg-white/5 px-4 py-2 no-underline backdrop-blur-[80px] transition hover:bg-white/10 md:inline-block"
            >
              For schools
            </Link>
            <Link
              href="/koh-tao"
              className="rounded-full border border-white/30 bg-white/15 px-4 py-2 no-underline backdrop-blur-[80px] transition hover:bg-white/25"
            >
              Open the app
            </Link>
          </div>
        </nav>
      </header>

      {/* Vertical text rail — left edge, echoes the reference */}
      <ul
        aria-hidden
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-10 text-[11px] uppercase tracking-[0.4em] text-white/80 sm:flex"
        style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
      >
        <li>Koh Tao</li>
        <li>Thailand</li>
        <li>2026</li>
      </ul>

      {/* Centered headline — big bold split treatment */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-white/70 sm:text-xs">
          For RAID · PADI · SSI dive schools
        </p>
        <h1
          className="mt-6 font-black uppercase leading-[0.85] tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
        >
          A Scuba
        </h1>
        <p
          className="font-black uppercase leading-[0.85] tracking-[0.02em]"
          style={{
            fontSize: "clamp(2.5rem, 9vw, 8rem)",
            WebkitTextStroke: "2px rgba(255,255,255,0.9)",
            color: "transparent",
          }}
        >
          Guide
        </p>

        <Link
          href="/koh-tao"
          className="group mt-10 flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-7 py-3 text-[11px] uppercase tracking-[0.35em] text-white no-underline backdrop-blur-[80px] transition hover:bg-white/15"
        >
          <span>Explore</span>
          <span
            aria-hidden
            className="grid h-6 w-6 place-items-center rounded-full border border-white/40 transition group-hover:translate-y-0.5"
          >
            ↓
          </span>
        </Link>
      </div>

      {/* Caption bottom-left — echoes the "@LNKM_PRSMMR web concept 2019" block */}
      <div className="absolute bottom-6 left-6 z-20 text-[10px] uppercase tracking-[0.3em] text-white/60 sm:text-xs">
        <p>@ascubaguide</p>
        <p className="mt-1">dive briefing tool</p>
        <p>2026</p>
      </div>

      {/* Chapter indicator bottom-right — 3 dots */}
      <div
        aria-hidden
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2"
      >
        {CHAPTERS.map((_, i) => (
          <span
            key={i}
            className={`h-1 w-6 rounded-full transition ${
              i <= chapter ? "bg-white" : "bg-white/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
