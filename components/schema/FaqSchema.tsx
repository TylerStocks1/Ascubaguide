export type FaqItem = { question: string; answer: string };

/**
 * FAQPage JSON-LD. Pass an array of {question, answer} props and the
 * component emits the structured data block. Use one per page that has an
 * FAQ section. Required for the FAQ rich result + AI Overview citations.
 */
export function FaqSchema({ faqs }: { faqs: FaqItem[] }) {
  if (faqs.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
