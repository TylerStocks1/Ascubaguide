import { BUSINESS } from "@/lib/business";

export type Crumb = { name: string; path: string };

/**
 * BreadcrumbList JSON-LD. Pass an ordered array of crumbs starting from the
 * page closest to root. Do NOT include the root itself — schema.org wants
 * the home crumb included by name only when meaningful, and Google's
 * BreadcrumbList rich result starts at the first level beneath home.
 */
export function BreadcrumbSchema({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BUSINESS.url}${c.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
