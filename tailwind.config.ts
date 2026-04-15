import type { Config } from "tailwindcss";

/**
 * Tailwind config.
 *
 * The color palette carries BOTH:
 *   1. The Stocks Local Phase 3 CSS-variable tokens (background /
 *      foreground) — these are the ones the marketing copy already uses.
 *   2. A full shadcn/ui semantic token set — border / card / muted /
 *      primary / etc. — wired to HSL CSS variables in globals.css. The
 *      21st.dev components living under /components/ui/ expect these
 *      tokens to resolve to real colours; without them `bg-card` and
 *      `border-border` render as transparent/default and the components
 *      look broken.
 *
 * borderRadius includes custom `4xl` and `6xl` entries because the
 * 21st.dev footer uses `rounded-t-4xl` / `md:rounded-t-6xl`, neither of
 * which Tailwind ships by default.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "6xl": "3rem",
      },
      // Two display faces, both loaded via next/font/google in app/layout.tsx:
      //   - font-display → Archivo (hero-only "A SCUBA / GUIDE" treatment)
      //   - font-heading → Syne (section headlines below the hero)
      fontFamily: {
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        heading: [
          "var(--font-heading)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
