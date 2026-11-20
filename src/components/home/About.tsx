"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import { Pill } from "@/components/ui/Pill";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { about, tr } from "@/content/home";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";

/*
 * "Un poco de nosotros" (artifact) with two26's pinned read-along (effect 4): the section holds
 * while you scroll, the letters light up one after another (faded → full, a small pop and tilt that
 * settles), and the four keyword pills pop in at the artifact's points (18 / 42 / 64 / 84 %).
 * Pin length as two26: 2200 px desktop, 1550 tablet, 1150 phone. Reduced motion: static, all lit.
 */
const keywordSpots = [
  { className: "top-[9%] left-[24%]", rotate: -6, at: 0.18 },
  { className: "top-[36%] left-[-3%]", rotate: 5, at: 0.42 },
  { className: "top-[60%] right-[-2%]", rotate: -4, at: 0.64 },
  { className: "top-[97%] left-[56%]", rotate: 6, at: 0.84 },
];

export function About() {
  const locale = useLocale();
  const root = useRef<HTMLElement>(null);
  const text = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const w = window.innerWidth;
      const distance = w < 480 ? 1150 : w < 992 ? 1550 : 2200;
      const split = SplitText.create(text.current!, { type: "words,chars" });
      const pills = gsap.utils.toArray<HTMLElement>("[data-about-pill]", root.current);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: `+=${distance}`, pin: true, scrub: w < 992 ? 0.6 : 0.8 },
      });
      tl.fromTo(split.chars, { opacity: 0.18 }, { opacity: 1, ease: "none", stagger: 0.05, duration: 1 }, 0);
      tl.fromTo(
        split.chars,
        { scale: 1, rotation: 0 },
        {
          keyframes: [
            { scale: 1.12, rotation: () => gsap.utils.random(-4, 4), duration: 0.5 },
            { scale: 1, rotation: 0, duration: 0.5 },
          ],
          stagger: 0.05,
          duration: 1,
        },
        0,
      );
      const total = tl.duration();
      pills.forEach((pill) => {
        const at = Number(pill.dataset.at) * total;
        tl.fromTo(pill, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: total * 0.06, ease: "back.out(2)" }, at);
      });
    },
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="nosotros" className="flex min-h-svh flex-col items-center justify-center px-[var(--gutter)] py-[var(--section-space)] text-center">
      <SectionLabel>{tr(about.label, locale)}</SectionLabel>
      <div className="relative mx-auto mt-6 max-w-5xl">
        <p ref={text} className="font-display text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[1.02] text-burgundy-deep uppercase">
          {about.parts.map((part) =>
            part.em ? (
              <em key={part.text.es} className="text-hot not-italic">
                {tr(part.text, locale)}
              </em>
            ) : (
              <span key={part.text.es}>{tr(part.text, locale)}</span>
            ),
          )}
        </p>
        {about.keywords.map((kw, i) => (
          <Pill key={kw.es} data-about-pill data-at={keywordSpots[i].at} rotate={keywordSpots[i].rotate} className={`absolute hidden sm:inline-block ${keywordSpots[i].className}`}>
            {tr(kw, locale)}
          </Pill>
        ))}
      </div>
      {/* on phones the pills sit under the text instead of over it */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:hidden">
        {about.keywords.map((kw, i) => (
          <Pill key={kw.es} data-about-pill data-at={keywordSpots[i].at} rotate={keywordSpots[i].rotate}>
            {tr(kw, locale)}
          </Pill>
        ))}
      </div>
    </section>
  );
}
