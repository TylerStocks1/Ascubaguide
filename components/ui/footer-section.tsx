"use client";

import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  LinkedinIcon,
  WavesIcon,
} from "lucide-react";

/**
 * 21st.dev footer-section, integrated with A Scuba Guide content.
 *
 * Design (layout + animations + radii + gradient) is kept exactly as
 * supplied — Tyler's instruction: "dont change any of the design either
 * i like them how they appear". Only the data is replaced:
 *   - Brand icon: FrameIcon → WavesIcon (oceanic, matches the product)
 *   - Copyright line: "Asme" → "A Scuba Guide"
 *   - Section labels + links populated with A Scuba Guide routes
 *   - Social links: all four icons preserved for visual balance; each
 *     points to `#` with a TODO comment pending BLOCKERS.md resolution
 *     (George's Instagram handle still unverified, no Facebook / YT /
 *     LinkedIn presence yet).
 */

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Product",
    links: [
      { title: "For dive schools", href: "/for-dive-schools" },
      { title: "For divers", href: "/for-divers" },
      { title: "Try the app", href: "/app" },
      { title: "Download app", href: "/download" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About George", href: "/about" },
      { title: "Contact", href: "/contact" },
      // TODO: privacy policy boilerplate pending — BLOCKERS.md
      { title: "Privacy", href: "#" },
      { title: "Terms", href: "#" },
    ],
  },
  {
    label: "Social",
    links: [
      // TODO: George's Instagram handle still unverified — BLOCKERS.md.
      // Keeping the four-icon visual structure (don't change the design)
      // with placeholder hrefs until the real handles land.
      { title: "Instagram", href: "#", icon: InstagramIcon },
      { title: "Facebook", href: "#", icon: FacebookIcon },
      { title: "Youtube", href: "#", icon: YoutubeIcon },
      { title: "LinkedIn", href: "#", icon: LinkedinIcon },
    ],
  },
];

export function Footer() {
  return (
    <footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <WavesIcon className="size-8" />
          <p className="text-muted-foreground mt-8 text-sm md:mt-0">
            © {new Date().getFullYear()} A Scuba Guide. Built by George
            Blizzard on Koh Tao.
          </p>
          {/*
            Agency attribution required on every Stocks Local client site.
            rel="nofollow" is mandatory for commercial attribution links
            per Google's link scheme guidance. Do not remove without
            reading seo-geo-implementation skill.
          */}
          <p className="text-muted-foreground text-xs">
            Website by{" "}
            <a
              href="https://stockslocal.co.uk"
              rel="nofollow noopener"
              target="_blank"
              className="hover:text-foreground underline underline-offset-2 transition"
            >
              Stocks Local
            </a>
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs">{section.label}</h3>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="hover:text-foreground inline-flex items-center transition-all duration-300"
                      >
                        {link.icon && <link.icon className="me-1 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
