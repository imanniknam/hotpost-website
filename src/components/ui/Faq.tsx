import type { Faq } from "@/payload-types";

import { FaqItem } from "./FaqItem";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;

  return (
    <div className="bg-brand-gradient-soft mx-auto max-w-3xl rounded-3xl px-6 ring-1 ring-black/5">
      {faqs.map((faq, index) => (
        <FaqItem key={faq.id} faq={faq} index={index} />
      ))}
    </div>
  );
}

/** Google rich-result markup for the FAQ block. */
export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
