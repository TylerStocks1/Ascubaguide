import { BUSINESS, OWNER } from "@/lib/business";

/**
 * WebApplication JSON-LD for A Scuba Guide.
 *
 * Hard rule (CLAUDE.md): WebApplication + Person ONLY. No LocalBusiness,
 * no Organization. George is a private individual.
 *
 * Renders into the document head from app/layout.tsx.
 */
export function WebApplicationSchema() {
  const data = {
    "@context": "https://schema.org",
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
      "@id": `${BUSINESS.url}#george`,
      name: OWNER.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
