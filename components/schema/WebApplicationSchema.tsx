import { BUSINESS, OWNER } from "@/lib/business";

/**
 * Root-level JSON-LD graph for A Scuba Guide.
 *
 * Hard rule (CLAUDE.md): WebApplication + Person ONLY. No LocalBusiness,
 * no Organization. George is a private individual, the product is software.
 *
 * This component emits an @graph containing:
 *  - WebApplication (the product — A Scuba Guide)
 *  - WebSite        (the domain / brand entity with publisher relationship)
 *
 * Person JSON-LD is emitted separately on /about where it is topically
 * relevant. The WebApplication references George via `creator` so the full
 * relationship chain is still reachable from the root graph.
 *
 * The @graph shape follows the seo-geo-implementation skill's Step 3.1
 * recommendation, adapted for a SaaS brand instead of a local business.
 */
export function WebApplicationSchema() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${BUSINESS.url}#webapp`,
        name: BUSINESS.name,
        url: BUSINESS.url,
        description: BUSINESS.description,
        applicationCategory: "EducationalApplication",
        applicationSubCategory: "Dive briefing tool",
        operatingSystem: "Web, iOS (PWA), Android (PWA)",
        browserRequirements: "Requires JavaScript and a modern browser",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          description: "Free during early access for Koh Tao dive schools",
        },
        audience: {
          "@type": "Audience",
          audienceType:
            "RAID, PADI, and SSI dive schools, dive instructors, and certified divers",
        },
        creator: {
          "@type": "Person",
          "@id": `${BUSINESS.url}/about#george`,
          name: OWNER.name,
          jobTitle: OWNER.jobTitle,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BUSINESS.url}#website`,
        url: BUSINESS.url,
        name: BUSINESS.name,
        description: BUSINESS.description,
        inLanguage: "en",
        publisher: { "@id": `${BUSINESS.url}/about#george` },
        about: { "@id": `${BUSINESS.url}#webapp` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
