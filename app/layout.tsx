import type { Metadata } from "next";
import "./globals.css";
import { BUSINESS } from "@/lib/business";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { WebApplicationSchema } from "@/components/schema/WebApplicationSchema";

/**
 * Root layout. Default system font stack — Phase 4 picks typography.
 *
 * metadataBase = the canonical origin from lib/business.ts. All page-level
 * metadata extends this; canonical and OG URLs resolve relative to it.
 *
 * The WebApplication JSON-LD lives here because it describes the whole site.
 * Person JSON-LD does NOT live here — it lives on /about where it is most
 * topically relevant (per CLAUDE.md schema rules).
 */
export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: BUSINESS.description,
  applicationName: BUSINESS.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    description: BUSINESS.description,
    url: BUSINESS.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    description: BUSINESS.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">
        <WebApplicationSchema />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
