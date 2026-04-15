import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";
import { getAllDiveSites } from "@/lib/dive-sites";
import { getAllFish } from "@/lib/fish";

/**
 * Sitemap. Lists every routable URL on the marketing site, including the
 * programmatic dive-site and fish-species pages. Does NOT list the static PWA
 * mount at /koh-tao — that has its own internal routing and is noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const fixed: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/for-dive-schools`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/for-divers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/dive-sites`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/fish`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/install`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const diveSitePages: MetadataRoute.Sitemap = getAllDiveSites().map((s) => ({
    url: `${SITE_URL}/dive-sites/${s.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const fishPages: MetadataRoute.Sitemap = getAllFish().map((f) => ({
    url: `${SITE_URL}/fish/${f.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...fixed, ...diveSitePages, ...fishPages];
}
