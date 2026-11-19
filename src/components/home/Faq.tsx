"use client";

import { useLocale } from "next-intl";
import { useId, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faq, tr } from "@/content/home";

/*
 * FAQ (artifact "Antes de que preguntes"), two26 behavior: one question is always open (the first
 * at the start); opening another closes the current one. The answer is a bubble under the pill.
 * P4 adds two26's animation (pill shrinks, bubble grows with a spring).
 */
export function Faq() {
  const locale = useLocale();
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <section className="mx-auto grid max-w-[90rem] gap-10 px-[var(--gutter)] py-[var(--section-space)] lg:grid-cols-[1fr_1.4fr]">
      <div>
        <SectionLabel>{tr(faq.label, locale)}</SectionLabel>
        <h2 className="mt-3 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] text-burgundy-deep uppercase">{tr(faq.title, locale)}</h2>
      </div>
      <ul className="flex flex-col gap-3">
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q.es} className="flex flex-col items-start">
              <h3 className="w-full">
                <button
                  type="button"
                  id={`${uid}-q${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-a${i}`}
                  onClick={() => setOpen(i)}
                  className={`w-full rounded-full px-5 py-3 text-left font-medium text-burgundy-deep transition-[width,background-color] lg:w-[var(--w)] ${isOpen ? "border border-hot bg-ivory [--w:60%]" : "bg-beige [--w:100%] hover:bg-beige/70"}`}
                >
                  {tr(item.q, locale)}
                </button>
              </h3>
              <div id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`} hidden={!isOpen} className="mt-3 self-end">
                <p className="max-w-md rounded-3xl border border-hot/40 bg-ivory px-5 py-4 text-burgundy-deep">{tr(item.a, locale)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
