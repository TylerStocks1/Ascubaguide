import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";

/**
 * Sitemap — trimmed to the pages that actually exist after the
 * 2026-04-15 homepage refresh. Dropped entries: /pricing,
 * /dive-sites/*, /fish/*, /install, /blog. Tyler's rationale: the
 * dive-site and species data belongs in the PWA itself, not duplicated
 * as individual marketing pages; pricing and install guides were also
 * removed until the app is live.
 *
 * /app and /download are placeholder pages — kept out of the sitemap
 * and marked noindex in their own metadata so search engines don't
 * index placeholder content.
 *
 * Note: `priority` and `changeFrequency` are deliberately omitted —
 * both Google and Bing ignore them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/for-dive-schools`, lastModified: now },
    { url: `${SITE_URL}/for-divers`, lastModified: now },
    { url: `${SITE_URL}/about`, lastModified: now },
    { url: `${SITE_URL}/contact`, lastModified: now },
  ];
}
