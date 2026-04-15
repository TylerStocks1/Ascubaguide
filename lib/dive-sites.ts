/**
 * Dive site data accessors.
 *
 * Source: lib/data/diveSites.json — copied verbatim from G:\Websites\Fish app
 * (the existing PWA). Do NOT edit the JSON inside this project. Re-copy from
 * the PWA when George updates it.
 */

import diveSitesData from "./data/diveSites.json";
import { getFishBySite } from "./fish";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type DiveSite = {
  /** URL slug — used as `/dive-sites/[slug]` */
  id: string;
  name: string;
  lat: number;
  lng: number;
  /** Depth range as a display string, e.g. "12–40m" */
  depth: string;
  difficulty: Difficulty;
  description: string;
  highlights: string[];
  /** Optional path under /public — may be null */
  siteImage: string | null;
};

const sites = diveSitesData as DiveSite[];

export function getAllDiveSites(): DiveSite[] {
  return sites;
}

export function getDiveSiteBySlug(slug: string): DiveSite | undefined {
  return sites.find((s) => s.id === slug);
}

export function getDiveSiteSlugs(): string[] {
  return sites.map((s) => s.id);
}

/**
 * For cross-linking. Given a dive site slug, return the fish species recorded
 * at that site. Used by `/dive-sites/[slug]` to render "Fish you'll see here."
 */
export function getFishForDiveSite(slug: string) {
  return getFishBySite(slug);
}

/** Display-only: count for the index page hero */
export const DIVE_SITE_COUNT = sites.length;
