import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";
import { getAllDiveSites } from "@/lib/dive-sites";
import { getAllFish } from "@/lib/fish";

/**
 * Sitemap. Lists every routable URL on the marketing site, including the
 * programmatic dive-site and fish-species pages. Does NOT list the static PWA
 * mount at /koh-tao — that has its own internal routing and is noindex.
 *
 * Note: `priority` and `changeFrequency` are deliberately omitted. Google
 * (John Mueller, repeatedly) and Bing both ignore these fields. Only `loc`
 * and `lastModified` matter. Per seo-geo-implementation skill.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const fixed: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/for-dive-schools`, lastModified: now },
    { url: `${SITE_URL}/for-divers`, lastModified: now },
    { url: `${SITE_URL}/dive-sites`, lastModified: now },
    { url: `${SITE_URL}/fish`, lastModified: now },
    { url: `${SITE_URL}/about`, lastModified: now },
    { url: `${SITE_URL}/pricing`, lastModified: now },
    { url: `${SITE_URL}/contact`, lastModified: now },
    { url: `${SITE_URL}/blog`, lastModified: now },
    { url: `${SITE_URL}/install`, lastModified: now },
  ];

  const diveSitePages: MetadataRoute.Sitemap = getAllDiveSites().map((s) => ({
    url: `${SITE_URL}/dive-sites/${s.id}`,
    lastModified: now,
  }));

  const fishPages: MetadataRoute.Sitemap = getAllFish().map((f) => ({
    url: `${SITE_URL}/fish/${f.id}`,
    lastModified: now,
  }));

  return [...fixed, ...diveSitePages, ...fishPages];
}
