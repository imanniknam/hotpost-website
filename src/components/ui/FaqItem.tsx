"use client";

import { useState } from "react";

import { useHydrated } from "@/lib/useHydrated";
import type { Faq } from "@/payload-types";

const faIndex = new Intl.NumberFormat("fa-IR", { minimumIntegerDigits: 2 });

/**
 * Animated accordion built on a real `<details>` element.
 *
 * Three things have to hold at once:
 *
 *   - No JS: `<details>` toggles natively and shows the full answer. Nothing
 *     here collapses it, because `data-collapsible` is absent before hydration.
 *   - Crawlers: the answer text is in the server HTML.
 *   - With JS: `<details>` is pinned open and the panel's height is driven by
 *     CSS grid-rows, which `<details>` cannot animate on its own.
 *
 * The open/closed size is deliberately CSS rather than a JS animation library.
 * A JS resting state needs a frame to apply, which flashed every answer at full
 * height on first paint — and left them all permanently open if that frame
 * never came. CSS is correct on the first paint and stays correct if the
 * transition is never allowed to run.
 */
export function FaqItem({ faq, index }: { faq: Faq; index: number }) {
  const hydrated = useHydrated();
  const [expanded, setExpanded] = useState(false);

  const toggle = (event: React.MouseEvent<HTMLElement>) => {
    // Take over only once hydrated; before that the native toggle is correct.
    event.preventDefault();
    setExpanded((v) => !v);
  };

  const panelId = `faq-panel-${faq.id}`;

  return (
    <details open={hydrated || undefined} className="border-b border-black/5 last:border-0">
      <summary
        onClick={hydrated ? toggle : undefined}
        aria-expanded={hydrated ? expanded : undefined}
        aria-controls={hydrated ? panelId : undefined}
        className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-bold transition-colors marker:content-none hover:text-brand-700"
      >
        <span className="flex items-center gap-3">
          <span
            className={`nums text-sm font-extrabold transition-colors duration-300 ${
              expanded ? "text-brand-600" : "text-brand-400"
            }`}
          >
            {faIndex.format(index + 1)}
          </span>
          {faq.question}
        </span>

        <span
          className={`grid size-7 shrink-0 place-items-center rounded-full shadow-sm ring-1 transition-all duration-300 ease-out ${
            expanded
              ? "bg-brand-gradient rotate-[135deg] ring-brand-400/60"
              : "bg-white ring-brand-200/60"
          }`}
        >
          <svg
            className={`size-4 transition-colors duration-300 ${
              expanded ? "text-white" : "text-brand-600"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </summary>

      <div
        id={panelId}
        className="faq-panel"
        // Present only after hydration — this attribute is what switches the
        // panel from "always open" (no-JS) to "collapsed unless expanded".
        data-collapsible={hydrated ? "" : undefined}
        data-expanded={expanded}
      >
        <div>
          <p className="pb-5 ps-9 text-sm leading-8 text-ink-500">{faq.answer}</p>
        </div>
      </div>
    </details>
  );
}
