"use client";

import { useLocale } from "next-intl";
import { useId, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faq, tr } from "@/content/home";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/*
 * FAQ (artifact "Antes de que preguntes"), two26 behavior: one question is always open (the first
 * at the start); opening another closes the current one. The answer is a bubble under the pill.
 * Motion (two26 effect 11): the open pill shrinks (CSS), the answer bubble grows from its corner
 * with a spring (.5 s back.out(1.6)) and its text rises in. Reduced motion: instant.
 */
export function Faq() {
  const locale = useLocale();
  const [open, setOpen] = useState(0);
  const uid = useId();
  const list = useRef<HTMLUListElement>(null);
  const first = useRef(true);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (prefersReducedMotion()) return;
      const bubble = list.current?.querySelector<HTMLElement>(`[data-faq-answer="${open}"]`);
      if (!bubble) return;
      gsap
        .timeline()
        .fromTo(bubble, { scale: 0, transformOrigin: "100% 0%" }, { scale: 1, duration: 0.5, ease: "back.out(1.6)" })
        .fromTo(bubble.firstElementChild, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.25");
    },
    { dependencies: [open], scope: list },
  );

  return (
    <section className="mx-auto grid max-w-[90rem] gap-10 px-[var(--gutter)] py-[var(--section-space)] lg:grid-cols-[1fr_1.4fr]">
      <div>
        <SectionLabel>{tr(faq.label, locale)}</SectionLabel>
        <h2 data-reveal="lines" className="mt-3 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] text-burgundy-deep uppercase">{tr(faq.title, locale)}</h2>
      </div>
      <ul ref={list} className="flex flex-col gap-3">
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
                <div data-faq-answer={i} className="max-w-md rounded-3xl border border-hot/40 bg-ivory px-5 py-4 text-burgundy-deep">
                  <p>{tr(item.a, locale)}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
