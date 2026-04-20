/**
 * Single source of truth for brand identity.
 *
 * Every component, page, schema, sitemap, and robots file imports from here.
 * If you find yourself typing "A Scuba Guide" or "ascubaguide.com" anywhere
 * else in the codebase — stop and use this constant instead.
 *
 * Schema rule (from CLAUDE.md): WebApplication + Person ONLY.
 * Do NOT add a `LocalBusiness`, `Organization`, NAP, phone, or `place_id`
 * field to this file. George is a private individual. The brand is software.
 */

export type Location = {
  /** URL slug — also used as the segment under each top-level page */
  slug: string;
  /** Display name for breadcrumbs, headings, meta titles */
  name: string;
  /** Full destination string used in copy, e.g. "Koh Tao, Thailand" */
  fullName: string;
  /** Whether the location ships in v1. Anticipates multi-location bolt-ons. */
  shipped: boolean;
};

export const LOCATIONS: Location[] = [
  { slug: "koh-tao", name: "Koh Tao", fullName: "Koh Tao, Thailand", shipped: true },
  // Future bolt-ons (NOT shipped — sitemap and nav skip these until shipped: true)
  { slug: "phuket", name: "Phuket", fullName: "Phuket, Thailand", shipped: false },
  { slug: "similan", name: "Similan Islands", fullName: "Similan Islands, Thailand", shipped: false },
];

export const SHIPPED_LOCATIONS = LOCATIONS.filter((l) => l.shipped);

export const BUSINESS = {
  /** Master brand string — used in H1s, meta titles, schema name, footer */
  name: "A Scuba Guide",
  /** Shorter tagline for OG, meta descriptions */
  tagline: "The dive briefing tool built by an instructor with 2,000+ dives",
  /** One-sentence description for schema and llms.txt */
  description:
    "A Scuba Guide is a dive briefing tool for RAID, PADI, and SSI dive schools. Built by a working instructor, it replaces whiteboards and printed cue cards with a tappable map of every dive site and every species your students will see.",

  /** Canonical domain. Not yet registered — see BLOCKERS.md. */
  domain: "ascubaguide.com",
  /** Full canonical origin — used by metadataBase, sitemap, robots, schema URLs */
  url: "https://ascubaguide.com",

  /** Public-facing email (TODO: real address once domain is live — BLOCKERS.md) */
  email: "hello@ascubaguide.com",

  /** Cert bodies the product is agnostic to. Always list all three or use generic copy. */
  certBodies: ["RAID", "PADI", "SSI"] as const,
} as const;

/**
 * Person schema subject — George Blizzard.
 *
 * BLOCKERS.md still has open items here:
 *  - RAID certification number unknown
 *  - Years on Koh Tao specifically unknown
 *  - Hydronauts dates unconfirmed
 *  - Instagram handle pending verification
 *
 * Where a field is unconfirmed, leave it null — components MUST handle null
 * gracefully and never invent a value.
 */
export const OWNER = {
  name: "Blizz",
  /** First-person handle used in headings: "Blizz" */
  firstName: "Blizz",
  /** Job title for schema and bio */
  jobTitle: "RAID Dive Instructor",
  /** Primary credential — appears on /about only */
  credential: {
    name: "RAID Open Water Scuba Instructor",
    credentialCategory: "professional certification",
    /** RAID instructor number — BLOCKER, leave null until George provides it */
    identifier: null as string | null,
  },
  /** Approximate dive count — Tyler-reported, ~4 years intense diving */
  diveCount: 2000,
  /** Where George is based right now */
  location: "Koh Tao, Thailand",
  /** Previous employer — appears in About bio if confirmed */
  previousEmployer: {
    name: "Hydronauts Diving Resort",
    url: "https://hydronautsdiving.com/",
    /** Confirmed BLOCKER — leave null until George okays mention */
    dates: null as string | null,
  },
  /**
   * Social profiles for `Person.sameAs`. Only verified handles go here.
   * Instagram is BLOCKED pending George's confirmation — leaving empty.
   */
  sameAs: [] as string[],
} as const;

/** Used in metadataBase, sitemap, canonical links */
export const SITE_URL = BUSINESS.url;
