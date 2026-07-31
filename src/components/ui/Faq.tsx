import type { Faq } from "@/payload-types";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;

  return (
    <div className="mx-auto max-w-3xl divide-y divide-black/5 rounded-3xl border border-black/5 bg-surface-muted px-6">
      {faqs.map((faq) => (
        <details key={faq.id} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold marker:content-none">
            {faq.question}
            <svg
              className="size-5 shrink-0 text-brand-500 transition group-open:rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <p className="mt-3 text-sm leading-8 text-ink-500">{faq.answer}</p>
        </details>
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
