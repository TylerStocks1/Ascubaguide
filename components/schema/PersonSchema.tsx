import { BUSINESS, OWNER } from "@/lib/business";

/**
 * Person JSON-LD for George Blizzard.
 *
 * Open BLOCKERS that affect this schema (BLOCKERS.md):
 *  - RAID certification number (identifier inside hasCredential)
 *  - Verified Instagram URL (sameAs)
 *  - Verified Hydronauts dates (worksFor)
 *
 * Where a field is unconfirmed, the schema OMITS it rather than inventing a
 * value. The `Person` schema is rendered on the About page, where it is most
 * topically relevant — not in the root layout (per CLAUDE.md the root carries
 * WebApplication only).
 */
export function PersonSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BUSINESS.url}#george`,
    name: OWNER.name,
    givenName: OWNER.firstName,
    jobTitle: OWNER.jobTitle,
    description: `${OWNER.jobTitle} based in ${OWNER.location} with ${OWNER.diveCount.toLocaleString()}+ logged dives. Creator of ${BUSINESS.name}.`,
    url: `${BUSINESS.url}/about`,
    homeLocation: {
      "@type": "Place",
      name: OWNER.location,
    },
    knowsAbout: [
      "Scuba diving",
      "Dive instruction",
      "Marine biology",
      "Koh Tao dive sites",
      "Reef fish identification",
    ],
  };

  // Only emit hasCredential if we have the RAID instructor number.
  // A credential without an identifier is a vague claim — we'd rather
  // omit the field than ship one Google can't verify.
  if (OWNER.credential.identifier) {
    data.hasCredential = {
      "@type": "EducationalOccupationalCredential",
      name: OWNER.credential.name,
      credentialCategory: OWNER.credential.credentialCategory,
      identifier: OWNER.credential.identifier,
      recognizedBy: {
        "@type": "Organization",
        name: "RAID International",
        url: "https://www.diveraid.com/",
      },
    };
  }

  // Only emit worksFor / previously-worked-for if George has confirmed
  // we can mention Hydronauts by name.
  if (OWNER.previousEmployer.dates) {
    data.worksFor = {
      "@type": "Organization",
      name: OWNER.previousEmployer.name,
      url: OWNER.previousEmployer.url,
    };
  }

  if (OWNER.sameAs.length > 0) {
    data.sameAs = OWNER.sameAs;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
