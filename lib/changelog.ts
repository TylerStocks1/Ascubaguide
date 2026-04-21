/**
 * App + website changelog.
 *
 * Newest first. Each entry has a stable `slug` used for anchor links,
 * a human date, a short headline, and a list of changes grouped by
 * category. Keep the voice the same as the rest of the site: short
 * sentences, no em-dashes, dive-focused where applicable.
 */

export type ChangeCategory = "new" | "improved" | "fixed";

export type ChangelogEntry = {
  slug: string;
  date: string;
  version: string;
  headline: string;
  summary: string;
  changes: { category: ChangeCategory; text: string }[];
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    slug: "2026-04-20-preview-live",
    date: "2026-04-20",
    version: "v0.1.0",
    headline: "Preview is live.",
    summary:
      "First public preview of A Scuba Guide. The app is browsable, installable on iOS and Android via Add to Home Screen, and works offline after the first load.",
    changes: [
      {
        category: "new",
        text: "28 Koh Tao dive sites with depth, difficulty, entry points and highlights",
      },
      {
        category: "new",
        text: "91+ reef species, each cross-linked to the sites they live at",
      },
      {
        category: "new",
        text: "Offline support. Load once on wifi and the app keeps working on the boat",
      },
      {
        category: "new",
        text: "Installable PWA. Open in any browser then add to home screen",
      },
      {
        category: "new",
        text: "Dive-focused brand refresh across the whole marketing site",
      },
    ],
  },
];
