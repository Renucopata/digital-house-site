"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { process, tr } from "@/content/home";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/*
 * "Cómo trabajamos" (artifact): four numbered steps on a route that ends in the goal (Meta ★).
 * Motion: the route fills with the scroll and each step number pops as it is reached.
 * Reduced motion: static.
 */
export function Process() {
  const locale = useLocale();
  const route = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const ol = route.current!;
      gsap.fromTo("[data-route-fill]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ol, start: "top 75%", end: "bottom 55%", scrub: 0.8 } });
      gsap.utils.toArray<HTMLElement>("[data-step-n]", ol).forEach((n) => {
        gsap.from(n, { scale: 0.4, opacity: 0, duration: 0.55, ease: "back.out(2.5)", scrollTrigger: { trigger: n, start: "top 80%", toggleActions: "play none none reverse" } });
      });
    },
    { scope: route },
  );

  return (
    <section className="theme-dark bg-surface py-[var(--section-space)] text-fg">
      <div className="mx-auto max-w-[90rem] px-[var(--gutter)]">
        <SectionLabel tone="dark">{tr(process.label, locale)}</SectionLabel>
        <h2 data-reveal="lines" className="mt-3 max-w-[16ch] font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] uppercase">{tr(process.title, locale)}</h2>
        <p data-reveal="fade" className="mt-6 max-w-2xl text-lg">{tr(process.intro, locale)}</p>

        <ol ref={route} className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* the route */}
          <span aria-hidden="true" className="absolute top-8 right-0 left-0 hidden h-1 rounded-full bg-ivory/20 md:block">
            <span data-route-fill className="block h-full origin-left rounded-full bg-hot" />
          </span>
          {process.steps.map((step, i) => (
            <li key={step.title.es} className="relative">
              <span data-step-n className="relative block w-fit bg-surface pr-2 font-display text-6xl leading-none text-ivory">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-3xl uppercase">{tr(step.title, locale)}</h3>
              <p className="mt-2 opacity-85">{tr(step.desc, locale)}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-right">
          <span className="inline-block rounded-full bg-ivory px-4 py-1.5 font-label text-sm font-bold tracking-[0.12em] text-burgundy-deep uppercase">
            {tr(process.goal, locale)} ★
          </span>
        </p>
      </div>
    </section>
  );
}
