"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Scroll-bound hero animation — sticky container + canvas frame sequence.
 *
 * Model (per Tyler's follow-up feedback 2026-04-15):
 *
 *   1. No scroll hijack. Native page scroll drives everything. The user
 *      can scroll up and down freely; animation progress follows the
 *      scroll position. If they scroll back up, the animation reverses.
 *      If they scroll past the animation range, the hero naturally
 *      unsticks and content below comes into view.
 *
 *   2. Frames render to a <canvas> via drawImage(), not to an <img>
 *      tag via src swapping. The old approach flickered black between
 *      frames because each src swap triggered a browser re-paint cycle,
 *      even on cached images. Canvas drawImage is synchronous: the
 *      pixels update instantly with zero gap. If a frame hasn't loaded
 *      yet, we simply skip the draw call, so the previous frame stays
 *      painted — no black flash.
 *
 *   3. Layout: the hero is `position: fixed` at z-0, so it stays pinned
 *      to the viewport regardless of scroll. Alongside the fixed hero
 *      is a plain spacer div (300vh tall) that takes up document space.
 *      The content sections below the spacer have `z-10 bg-neutral-950`
 *      and flow in normal document order — when the user scrolls past
 *      the spacer, the content rises UP OVER the fixed hero rather
 *      than the hero scrolling away. That's the "page goes on top of
 *      the animation" feel Tyler asked for.
 *
 *      Math: viewport = vp.
 *        - scrollY   0 → animation progress 0
 *        - scrollY 2vp → animation progress 1 (animation done)
 *        - scrollY 2vp → 3vp: animation held at last frame while the
 *          content section slides up from the bottom of the viewport
 *          to the top, covering the fixed hero
 *        - scrollY 3vp+: content fills the viewport; hero is fully
 *          covered but still technically there behind it
 *
 *   4. Text chapters have the same progress-range system as before —
 *      each chapter visible for part of the [0, 1] range with gaps
 *      between chapters so at most one is on screen at any time.
 *
 *   5. prefers-reduced-motion: the canvas is replaced by a static
 *      first-frame img, all chapters beyond the first are hidden, and
 *      scroll is never locked (it already isn't). The animation simply
 *      does not play; the initial frame and headline stay put.
 *
 * Frame source
 * ------------
 * 121 WebP frames at /public/frames/hero/0001.webp .. 0121.webp,
 * extracted from the 10.04s hero video at 12fps with ffmpeg. Total
 * payload ~5.8 MB. See the npm / build script (TODO) for the
 * extraction command, mirrored here for reference:
 *
 *   ffmpeg -y -i public/videos/hero.mp4 -vf "fps=12" \
 *     -c:v libwebp -quality 78 -compression_level 6 \
 *     public/frames/hero/%04d.webp
 */

const FRAME_COUNT = 121;

const frameUrl = (index: number) =>
  `/frames/hero/${String(index + 1).padStart(4, "0")}.webp`;

type Chapter = {
  eyebrow: string;
  lineOne: string;
  lineTwo: string;
  outlineSecondLine?: boolean;
  range: [number, number];
};

const CHAPTERS: Chapter[] = [
  {
    eyebrow: "For RAID · PADI · SSI dive schools",
    lineOne: "A Scuba",
    lineTwo: "Guide",
    outlineSecondLine: true,
    range: [0.0, 0.22],
  },
  {
    eyebrow: "Replace the whiteboard",
    lineOne: "One tool.",
    lineTwo: "Every briefing.",
    range: [0.28, 0.48],
  },
  {
    eyebrow: "Koh Tao — every site, every species",
    lineOne: "28 dive sites.",
    lineTwo: "91+ species.",
    range: [0.56, 0.75],
  },
  {
    eyebrow: "Built by an instructor",
    lineOne: "2,000+ dives.",
    lineTwo: "One obsession.",
    range: [0.83, 1.0],
  },
];

function deriveChapter(progress: number): number | null {
  for (let i = 0; i < CHAPTERS.length; i++) {
    const [start, end] = CHAPTERS[i].range;
    if (progress >= start && progress <= end) return i;
  }
  return null;
}

export function HeroScrollVideo() {
  const outerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** Pre-fetched image objects. index = frame - 1. */
  const imagesRef = useRef<HTMLImageElement[]>([]);
  /** Last frame index drawn to canvas; lets us skip redundant draws. */
  const lastDrawnFrameRef = useRef(-1);

  const [chapter, setChapter] = useState<number | null>(0);
  /** Reduced motion: skip the animation entirely and show static first
   *  frame + first chapter text. */
  const [reducedMotion, setReducedMotion] = useState(false);

  /* ------------------------------------------------------------------ */
  /*  Reduced-motion detection                                           */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Preload the frame sequence                                         */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (reducedMotion) return;
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [reducedMotion]);

  /* ------------------------------------------------------------------ */
  /*  Canvas sizing                                                      */
  /*                                                                     */
  /*  Canvas internal resolution is tied to devicePixelRatio so we get   */
  /*  crisp frames on retina. Recompute on resize.                       */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.max(1, Math.floor(rect.width * dpr));
      const targetH = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        // Force a redraw on the next rAF tick by invalidating the
        // last-drawn frame index.
        lastDrawnFrameRef.current = -1;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [reducedMotion]);

  /* ------------------------------------------------------------------ */
  /*  Scroll-driven rAF loop                                             */
  /*                                                                     */
  /*  Every rAF tick, reads scroll position, derives progress, redraws   */
  /*  the canvas if the frame index changed, and updates chapter state   */
  /*  if needed. rAF is cheaper than a scroll handler doing layout work  */
  /*  and gets us vsync-aligned frame updates.                           */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf = 0;
    let stopped = false;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /** Draw a frame to the canvas using cover-fit geometry, matching
     *  the behaviour of `object-fit: cover`. If the frame image isn't
     *  loaded yet, just bail out — the canvas keeps whatever it last
     *  painted, so there's no flash of black. */
    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = cw / ch;
      let dw: number;
      let dh: number;
      let dx: number;
      let dy: number;
      if (imgAspect > canvasAspect) {
        // Image is wider than canvas — match height, overflow width
        dh = ch;
        dw = dh * imgAspect;
        dx = (cw - dw) / 2;
        dy = 0;
      } else {
        // Image is taller than canvas — match width, overflow height
        dw = cw;
        dh = dw / imgAspect;
        dx = 0;
        dy = (ch - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
      lastDrawnFrameRef.current = index;
    };

    const tick = () => {
      if (stopped) return;

      // Progress is simply scrollY / (2 × viewport). Animation completes
      // at scrollY = 2vp, after which progress clamps at 1 and the
      // content section below the spacer slides up over the fixed hero
      // from scrollY = 2vp to 3vp.
      const vh = window.innerHeight;
      const animationRange = vh * 2;
      const progress = Math.max(
        0,
        Math.min(1, window.scrollY / animationRange)
      );

      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(progress * (FRAME_COUNT - 1)))
      );
      if (frameIndex !== lastDrawnFrameRef.current) {
        drawFrame(frameIndex);
      }

      const nextChapter = deriveChapter(progress);
      setChapter((current) =>
        current === nextChapter ? current : nextChapter
      );

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <>
      {/* Fixed hero — pinned to the viewport at z-0 for its entire life.
          Content sections in app/page.tsx live at z-10 with an opaque
          background and flow in normal document order; when the user
          scrolls past the spacer below, those sections rise UP OVER
          this fixed layer rather than the hero scrolling away. */}
      <section
        aria-label="A Scuba Guide — Koh Tao"
        className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-neutral-950 text-white"
      >
        {/* First frame as a plain <img> underneath the canvas — acts as
            a fallback while the canvas waits for its first draw, and as
            the sole visual for users with reduced motion. */}
        <img
          src={frameUrl(0)}
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Frame canvas — sits above the fallback img, redrawn by the
            rAF loop. Hidden under reduced-motion (static img shows). */}
        {!reducedMotion && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            aria-hidden
          />
        )}

        {/* Readability dim */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/65"
        />

        <HeroNav />

        {/* Text chapters — only one visible at a time via opacity. */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {CHAPTERS.map((c, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500 ease-out ${
                chapter === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/75 sm:text-xs">
                {c.eyebrow}
              </p>
              <h1
                className="mt-6 text-white"
                aria-label={`${c.lineOne} ${c.lineTwo}`}
              >
                <span
                  className="block font-black uppercase"
                  style={{
                    fontSize: "clamp(3rem, 11vw, 10rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {c.lineOne}
                </span>
                <span
                  className="block font-black uppercase"
                  style={{
                    fontSize: "clamp(2.25rem, 8vw, 7.5rem)",
                    lineHeight: 0.9,
                    letterSpacing: c.outlineSecondLine ? "0.02em" : "-0.015em",
                    ...(c.outlineSecondLine
                      ? {
                          WebkitTextStroke: "2px rgba(255,255,255,0.9)",
                          color: "transparent",
                        }
                      : {}),
                  }}
                >
                  {c.lineTwo}
                </span>
              </h1>
            </div>
          ))}
        </div>

        {/* Field-journal caption bottom-left */}
        <div className="absolute bottom-8 left-6 z-20 text-[10px] uppercase tracking-[0.3em] text-white/55 sm:text-xs">
          <p>Koh Tao · Thailand</p>
          <p className="mt-1">2026</p>
        </div>
      </section>

      {/* Spacer div — in-flow, invisible. Takes up 300vh of document
          height so the user has scroll range to drive the animation
          (scrollY 0 → 2vp = progress 0 → 1) and then slide the content
          section up over the hero (scrollY 2vp → 3vp). Under reduced-
          motion we collapse to 100vh so the user just sees one hero
          viewport before the content. */}
      <div
        aria-hidden
        ref={outerRef}
        style={{ height: reducedMotion ? "100vh" : "300vh" }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating nav — self-contained                                      */
/* ------------------------------------------------------------------ */

function HeroNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-[11px] uppercase tracking-[0.1em] text-white shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-[80px]"
      >
        <Link
          href="/"
          className="whitespace-nowrap text-sm font-black tracking-tight no-underline"
        >
          A Scuba Guide
        </Link>

        <ul className="hidden items-center gap-6 sm:flex">
          <li>
            <Link
              href="/dive-sites"
              className="whitespace-nowrap no-underline transition hover:text-white/60"
            >
              Dive sites
            </Link>
          </li>
          <li>
            <Link
              href="/fish"
              className="whitespace-nowrap no-underline transition hover:text-white/60"
            >
              Species
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="whitespace-nowrap no-underline transition hover:text-white/60"
            >
              About
            </Link>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Open menu"
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 bg-white/5 sm:hidden"
        >
          <span aria-hidden className="flex flex-col gap-1">
            <span className="block h-[1.5px] w-4 bg-white" />
            <span className="block h-[1.5px] w-4 bg-white" />
            <span className="block h-[1.5px] w-4 bg-white" />
          </span>
        </button>

        <Link
          href="/koh-tao"
          className="whitespace-nowrap rounded-full border border-white/30 bg-white/15 px-4 py-2 no-underline transition hover:bg-white/25"
        >
          Open the app
        </Link>
      </nav>
    </header>
  );
}
