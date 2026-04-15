import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/business";

/**
 * Default Open Graph image for the site. Plain typographic placeholder.
 * Phase 4 (design-assist) will replace this with the real branded image.
 */

export const runtime = "edge";
export const alt = `${BUSINESS.name} — ${BUSINESS.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.7, letterSpacing: 2, textTransform: "uppercase" }}>
          For RAID, PADI &amp; SSI dive schools
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            marginTop: 16,
            lineHeight: 1.05,
            letterSpacing: -1,
          }}
        >
          {BUSINESS.name}
        </div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.85, lineHeight: 1.3 }}>
          {BUSINESS.tagline}
        </div>
        <div style={{ fontSize: 22, marginTop: 48, opacity: 0.6 }}>ascubaguide.com</div>
      </div>
    ),
    size
  );
}
