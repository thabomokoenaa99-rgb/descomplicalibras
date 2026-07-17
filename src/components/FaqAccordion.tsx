"use client";

import { useState } from "react";
import { copy } from "@/lib/content";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3.5 px-2 sm:px-0">
      {copy.faq.items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;

        return (
          <div
            key={item.q}
            className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm"
          >
            <button
              id={buttonId}
              type="button"
              className="w-full p-5 sm:p-6 cursor-pointer flex justify-between items-center font-bold text-sm sm:text-base text-ink text-left gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/50 focus-visible:ring-inset"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>
                {i + 1}. {item.q}
              </span>
              <span
                className={`shrink-0 text-cta-darker transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                🔽
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 sm:px-6 pb-5 sm:pb-6 text-body text-xs sm:text-sm leading-relaxed text-balance"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
