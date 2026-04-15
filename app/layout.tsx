import type { Metadata } from "next";
import { Archivo, DM_Sans } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/business";
import { Nav } from "@/components/marketing/Nav";
import { FooterSwitcher } from "@/components/marketing/FooterSwitcher";
import { WebApplicationSchema } from "@/components/schema/WebApplicationSchema";

/**
 * Sitewide fonts.
 *
 *  - Archivo (weights 400/900) is bound to --font-display and is used
 *    **only** on the hero's "A SCUBA / GUIDE" split headline — Tyler's
 *    instruction: keep that face reserved for the hero moment so it
 *    stays distinctive.
 *
 *  - DM Sans (weights 400/500/700) is bound to --font-heading and is
 *    used for every interior section headline below the hero. Chosen
 *    for "clean bold typography" per Tyler's feedback after rejecting
 *    Syne for having too much character. DM Sans is intentionally
 *    neutral — functional, heavy at 700, reads confidently without
 *    shouting. Pairs cleanly with Archivo's display moment.
 *
 *  - Body text inherits the default system sans stack via globals.css.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "900"],
  display: "swap",
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-heading",
});

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
    <html
      lang="en"
      className={`${archivo.variable} ${dmSans.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <WebApplicationSchema />
        <Nav />
        {children}
        <FooterSwitcher />
      </body>
    </html>
  );
}
