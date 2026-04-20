"use client";

import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

/**
 * Zoom parallax — original 21st.dev layout, extended to accept either a
 * raster image OR a "glass" typographic tile for each slot.
 *
 * Glass tiles render a frosted-ocean card with a fish emoji + display
 * name + scientific name — they let us ship the section without faking
 * stock photography for species we don't have real shots of yet
 * (CLAUDE.md: "Never invent. No stock photos masquerading as George's
 * work.").
 */

export type ParallaxTile =
  | { kind: "image"; src: string; alt?: string }
  | { kind: "glass"; name: string; scientific: string; emoji: string };

interface ZoomParallaxProps {
  /** Up to 7 tiles — any mix of images and typographic glass cards */
  tiles: ParallaxTile[];
}

export function ZoomParallax({ tiles }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  /** Deep-ocean wash layer scales gently from 1 → 1.8 so the viewport
   *  always has a coherent underwater backdrop while individual tiles
   *  zoom past. Prevents the "empty void" mid-animation frame. */
  const washScale = useTransform(scrollYProgress, [0, 1], [1, 1.8]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[250vh]">
      <div
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(56,189,248,0.08) 0%, rgba(3,16,24,0.0) 60%), linear-gradient(180deg, #04131c 0%, #031018 100%)",
        }}
      >
        {/* Full-bleed underwater wash — fills the entire viewport at all
            scroll positions. Gently scales up with the parallax so it
            feels connected to the zoom motion without ever clipping. */}
        <motion.div
          aria-hidden
          style={{ scale: washScale }}
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute inset-[-10%]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(56,189,248,0.22) 0%, rgba(4,19,28,0) 55%), radial-gradient(circle at 15% 75%, rgba(127,219,255,0.18), transparent 45%), radial-gradient(circle at 85% 25%, rgba(56,189,248,0.15), transparent 50%)",
            }}
          />
        </motion.div>
        {tiles.map((tile, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]" : ""} ${index === 2 ? "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]" : ""} ${index === 3 ? "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]" : ""} ${index === 4 ? "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]" : ""} ${index === 5 ? "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]" : ""} ${index === 6 ? "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]" : ""} `}
            >
              <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-xl shadow-[0_20px_60px_-20px_rgba(0,40,80,0.6)]">
                {tile.kind === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tile.src}
                    alt={tile.alt ?? `Parallax tile ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <GlassTile
                    emoji={tile.emoji}
                    name={tile.name}
                    scientific={tile.scientific}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function GlassTile({
  emoji,
  name,
  scientific,
}: {
  emoji: string;
  name: string;
  scientific: string;
}) {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(56,189,248,0.25) 0%, rgba(4,19,28,0.9) 60%, rgba(2,10,18,1) 100%)",
        border: "1px solid rgba(150,210,255,0.25)",
        backdropFilter: "blur(16px) saturate(150%)",
        WebkitBackdropFilter: "blur(16px) saturate(150%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.18), 0 30px 60px -20px rgba(0,80,140,0.5)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-[120%] w-[120%] opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(127,219,255,0.5) 0%, transparent 55%)",
        }}
      />
      <span
        aria-hidden
        className="relative z-10 text-5xl sm:text-6xl md:text-7xl"
        style={{ filter: "drop-shadow(0 6px 20px rgba(127,219,255,0.35))" }}
      >
        {emoji}
      </span>
      <p
        className="relative z-10 mt-3 px-3 font-display font-black uppercase leading-[0.9] text-white"
        style={{
          fontSize: "clamp(0.9rem, 1.9vw, 1.6rem)",
          letterSpacing: "-0.015em",
        }}
      >
        {name}
      </p>
      <p
        className="relative z-10 mt-1 px-3 italic text-white/60"
        style={{ fontSize: "clamp(0.55rem, 1vw, 0.85rem)" }}
      >
        {scientific}
      </p>
    </div>
  );
}
