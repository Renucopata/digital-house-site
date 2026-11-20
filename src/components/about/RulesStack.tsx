"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { team, tr } from "@/content/home";
import { aboutPage } from "@/content/pages";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";

/*
 * House rules (two26 "office rules", effect 23). Rules = the five team mottos from the artifact
 * (user decision), each explained by that person's bio. Sticky stacked cards: each one sticks a bit
 * lower than the previous (5em steps, 3em on phones), a progress bar fills as the card travels to its
 * place (scrub), the motto's letters rise in (back.out(1.7), stagger .025) and the text lines follow.
 * Reduced motion: plain stacked cards, everything visible.
 */
export function RulesStack() {
  const locale = useLocale();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-rule]", root.current).forEach((card, i) => {
        const bar = card.querySelector("[data-rule-bar]");
        gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: card, start: i === 0 ? "top center" : "top bottom", end: () => `top ${parseFloat(getComputedStyle(card).top) || 0}px`, scrub: true } });
        const title = card.querySelector<HTMLElement>("[data-rule-title]")!;
        // mask per line (a mask per letter would clip accents like É / Í)
        const split = SplitText.create(title, { type: "lines,words,chars", mask: "lines" });
        gsap
          // masks are removed when the motto has landed, so accents (É, Í) are never clipped
          .timeline({ scrollTrigger: { trigger: card, start: i === 0 ? "top 72%" : "top 75%", once: true }, onComplete: () => split.revert() })
          .from(split.chars, { yPercent: 115, duration: 0.7, stagger: 0.025, ease: "back.out(1.7)" })
          .from(card.querySelector("[data-rule-text]"), { y: 24, opacity: 0, duration: 0.65, ease: "back.out(1.4)" }, "-=0.4");
      });
    },
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section ref={root} className="mx-auto max-w-[90rem] px-[var(--gutter)] py-[var(--section-space)]">
      <SectionLabel>{tr(aboutPage.rulesLabel, locale)}</SectionLabel>
      <ol className="mt-8 pb-[20vh]">
        {team.members.map((m, i) => (
          <li
            key={m.name}
            data-rule
            className="sticky mb-6 rounded-[var(--radius-card)] border-t-2 border-hot bg-ivory pt-4 pb-10 [--step:3em] md:[--step:5em]"
            style={{ top: `calc(5em + ${i} * var(--step))`, zIndex: i + 1 }}
          >
            <div className="flex items-center gap-4">
              <span className="font-label text-xs font-bold tracking-[0.18em] text-burgundy-deep uppercase">
                {tr(aboutPage.rulesLabel, locale)} {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-0.5 flex-1 bg-hot/15">
                <span data-rule-bar className="block h-full origin-left bg-hot" />
              </span>
            </div>
            <div className="mt-5 grid gap-6 md:grid-cols-[1.4fr_1fr]">
              <h3 data-rule-title className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.92] text-hot uppercase">
                {tr(m.quote, locale)}
              </h3>
              <p data-rule-text className="text-burgundy-deep">
                {tr(m.bio, locale)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
