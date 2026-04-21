import type { Metadata } from "next";
import "./globals.css";
import { BUSINESS } from "@/lib/business";
import { FloatingNav } from "@/components/marketing/FloatingNav";
import { Footer } from "@/components/ui/footer-section";
import { WebApplicationSchema } from "@/components/schema/WebApplicationSchema";

/**
 * Sitewide fonts are loaded from Fontshare (via <link> in <head>).
 *
 *  - Clash Display (500/600/700) is bound to --font-display and is used
 *    on every marquee headline. Clean, geometric, bold without shouting.
 *    Replaces the previous Archivo 900 face.
 *
 *  - Satoshi (400/500/700) is bound to --font-heading / body. Chosen for
 *    readability + premium feel. Replaces DM Sans.
 *
 *  Both faces are pulled from api.fontshare.com — no self-hosting. The
 *  CSS variables below in globals.css wire them into Tailwind utilities.
 */

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: `${BUSINESS.name}. ${BUSINESS.tagline}`,
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
    title: `${BUSINESS.name}. ${BUSINESS.tagline}`,
    description: BUSINESS.description,
    url: BUSINESS.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name}. ${BUSINESS.tagline}`,
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
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800&f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body className="overflow-x-clip bg-background text-foreground antialiased">
        <WebApplicationSchema />
        <FloatingNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
