/**
 * Fish species data accessors.
 *
 * Two source files, copied verbatim from G:\Websites\Fish app\src\data\:
 *
 *   - fishSpecies.json  (24 species, RICH schema, includes `sites[]` mapping)
 *   - fishIndex.json    (78 species, LIGHT schema, no site mapping)
 *
 * 11 IDs overlap between the two files. We deduplicate by `id`, preferring
 * the rich entry from fishSpecies.json so we keep the `sites[]` mapping for
 * cross-linking with dive sites.
 *
 * Do NOT edit the JSON inside this project. Re-copy from the PWA when George
 * updates them.
 */

import fishSpeciesData from "./data/fishSpecies.json";
import fishIndexData from "./data/fishIndex.json";

export type Niche = "reef" | "pelagic" | "bottom" | "schooling" | "invertebrate" | string;

/**
 * Unified fish type. Fields that only exist in one source file are optional —
 * pages must render `null`/`undefined` gracefully and never invent values.
 */
export type Fish = {
  /** URL slug — used as `/fish/[slug]` */
  id: string;
  name: string;
  scientificName: string;
  niche: Niche;
  emoji: string;
  depthRange: string;
  conservationStatus: string;
  diet: string;
  behavior: string;
  funFact: string;

  // Optional — fishSpecies.json (rich) only
  habitat?: string;
  /** Dive site slugs where this fish has been recorded */
  sites?: string[];

  // Optional — fishIndex.json (light) only
  maxLength?: string;
  reproduction?: string;
  lifespan?: string | null;
  predators?: string | null;
};

type RichFish = {
  id: string;
  name: string;
  scientificName: string;
  niche: string;
  emoji: string;
  habitat: string;
  diet: string;
  behavior: string;
  depthRange: string;
  conservationStatus: string;
  funFact: string;
  sites: string[];
};

type LightFish = {
  id: string;
  name: string;
  scientificName: string;
  niche: string;
  emoji: string;
  depthRange: string;
  maxLength: string;
  conservationStatus: string;
  diet: string;
  behavior: string;
  reproduction: string;
  lifespan: string | null;
  predators: string | null;
  funFact: string;
};

const richSource = fishSpeciesData as RichFish[];
const lightSource = fishIndexData as LightFish[];

function normalizeRich(f: RichFish): Fish {
  return {
    id: f.id,
    name: f.name,
    scientificName: f.scientificName,
    niche: f.niche,
    emoji: f.emoji,
    depthRange: f.depthRange,
    conservationStatus: f.conservationStatus,
    diet: f.diet,
    behavior: f.behavior,
    funFact: f.funFact,
    habitat: f.habitat,
    sites: f.sites,
  };
}

function normalizeLight(f: LightFish): Fish {
  return {
    id: f.id,
    name: f.name,
    scientificName: f.scientificName,
    niche: f.niche,
    emoji: f.emoji,
    depthRange: f.depthRange,
    conservationStatus: f.conservationStatus,
    diet: f.diet,
    behavior: f.behavior,
    funFact: f.funFact,
    maxLength: f.maxLength,
    reproduction: f.reproduction,
    lifespan: f.lifespan,
    predators: f.predators,
  };
}

/**
 * Build the unified, deduplicated fish list once at module load.
 * Rich entries (with `sites[]`) take precedence over light entries.
 */
const ALL_FISH: Fish[] = (() => {
  const map = new Map<string, Fish>();
  for (const f of lightSource) map.set(f.id, normalizeLight(f));
  for (const f of richSource) map.set(f.id, normalizeRich(f)); // overwrite light with rich
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
})();

export function getAllFish(): Fish[] {
  return ALL_FISH;
}

export function getFishBySlug(slug: string): Fish | undefined {
  return ALL_FISH.find((f) => f.id === slug);
}

export function getFishSlugs(): string[] {
  return ALL_FISH.map((f) => f.id);
}

/**
 * For cross-linking. Given a dive site slug, return the fish species recorded
 * at that site. Only rich entries have site mappings — light-source-only
 * species will not appear here, which is correct (we don't have data for them).
 */
export function getFishBySite(siteSlug: string): Fish[] {
  return ALL_FISH.filter((f) => f.sites?.includes(siteSlug)).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export const FISH_COUNT = ALL_FISH.length;
