"use client";

import { cn } from "@/lib/utils";

/**
 * Underwater-style light rays.
 *
 * Pure CSS — no canvas, no WebGL, no shaders. Renders N blurred
 * linear-gradient slivers fanning out from an origin point near the
 * top of the container, each with a subtly different rotation, width,
 * and animation delay so they shimmer in staggered rhythm. Optimised
 * for absolute positioning inside a parent that has `position: relative`
 * and `overflow: hidden` (otherwise rays bleed out of the intended box).
 *
 * Tyler's ask: "some lightrays also to the page to make it feel like
 * the rays are coming from the sun while we are under the water. if
 * you cna make this visible from after the blue between the hero and
 * the page that would be solid."
 *
 * Usage: drop into the top of a section, right after the hero. The
 * component is absolutely positioned by default and fills its
 * relatively-positioned parent.
 */
interface LightRaysProps {
  className?: string;
  /** Number of ray slivers. 8–14 reads as "sun rays"; less feels
   *  sparse, more feels cluttered. */
  rayCount?: number;
  /** CSS color at the top of each ray. Ends at transparent. */
  color?: string;
  /** Overall group opacity. 0.35–0.6 is the underwater sweet spot. */
  opacity?: number;
  /** Blur radius in pixels. Higher = softer / more diffused. */
  blur?: number;
  /** Spread angle in degrees from straight-down. Rays fan out across
   *  this total angle, centred on vertical. */
  spreadAngle?: number;
}

export function LightRays({
  className,
  rayCount = 8,
  color = "rgba(140, 200, 230, 0.18)",
  opacity = 0.28,
  blur = 70,
  spreadAngle = 50,
}: LightRaysProps) {
  // Deterministic ray layout so server and client render identically
  // and React doesn't throw hydration warnings. Widths and delays are
  // derived from the index instead of Math.random.
  const rays = Array.from({ length: rayCount }, (_, i) => {
    const t = rayCount === 1 ? 0.5 : i / (rayCount - 1);
    const angle = -spreadAngle / 2 + t * spreadAngle;
    // Width varies in a wave: narrow at the edges, wider toward center
    const centerBias = 1 - Math.abs(t - 0.5) * 2; // 0→1→0
    const width = 60 + centerBias * 110;
    const delay = (i * 0.7) % 6;
    const duration = 7 + ((i * 1.3) % 4);
    return { angle, width, delay, duration };
  });

  // Ray gradient: fades IN from transparent at the top (so the start
  // of each ray feels diffused into the water, not a hard-edged burst),
  // reaches peak brightness in the upper-middle, then eases back out
  // to transparent at the bottom. Matches Tyler's feedback: "make the
  // start of the ray a bit more subtle, it comes in wayy too harshly".
  const softColor = color.replace(/[\d.]+\)$/, "0.18)");
  const rayGradient = `linear-gradient(to bottom, transparent 0%, ${softColor} 18%, ${color} 42%, ${softColor} 66%, transparent 95%)`;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      style={{ opacity }}
    >
      {/* Rays origin — a single point near top-center that the rays
          emanate from. 0px wide so rotations pivot cleanly. */}
      <div className="absolute left-1/2 top-0 h-0 w-0">
        {rays.map((ray, i) => (
          <div
            key={i}
            className="absolute left-0 top-0 origin-top animate-[light-ray-shimmer_linear_infinite]"
            style={{
              height: "200vh",
              width: `${ray.width}px`,
              transform: `translateX(-50%) rotate(${ray.angle}deg)`,
              background: rayGradient,
              filter: `blur(${blur}px)`,
              animationDuration: `${ray.duration}s`,
              animationDelay: `${ray.delay}s`,
              mixBlendMode: "screen",
            }}
          />
        ))}
      </div>
    </div>
  );
}
