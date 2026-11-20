"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services, tr, type ServiceIcon } from "@/content/home";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

/*
 * Services (artifact "Lo que hacemos (y hacemos bien)"): seven services staggered left/right like
 * two26, the icon sitting between the two words, description in a small tilted bubble.
 * Motion (two26 effect 9): a winding line runs through every icon and draws itself with the scroll
 * (scrub 1.2); each icon pops (back.out(3.5)) and its bubble pops with a tilt as the line reaches it.
 * The path is measured from the real icon positions, so it follows the layout at any width.
 * Reduced motion: no line, everything visible.
 */
const icons: Record<ServiceIcon, React.ReactNode> = {
  strategy: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
    </>
  ),
  intelligence: <path d="M3 21h18M6 17v-5M11 17V7M16 17v-8M21 17V4" />,
  identity: <path d="M12 2l2.6 6.2L21 9l-5 4.4L17.4 20 12 16.7 6.6 20 8 13.4 3 9l6.4-.8z" />,
  social: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M12 15.5s-3.5-2-3.5-4.3A1.8 1.8 0 0 1 12 10a1.8 1.8 0 0 1 3.5 1.2c0 2.3-3.5 4.3-3.5 4.3zM10.5 5h3" />
    </>
  ),
  systems: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M9 9l-2.5 2.5L9 14M15 9l2.5 2.5L15 14M8 21h8" />
    </>
  ),
  merch: <path d="M8 3l-5 3 2 5 3-1v11h8V10l3 1 2-5-5-3c-.5 2-2 3-4 3S8.5 5 8 3z" />,
  events: <path d="M3 8a2 2 0 0 0 0 4v5h18v-5a2 2 0 0 0 0-4V3H3zM12 6l1.2 2.4 2.6.4-1.9 1.8.5 2.6L12 12l-2.4 1.2.5-2.6-1.9-1.8 2.6-.4z" />,
};

export function Services() {
  const locale = useLocale();
  const list = useRef<HTMLUListElement>(null);
  const line = useRef<SVGPathElement>(null);
  const ghost = useRef<SVGPathElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const ul = list.current!;
      const icons = gsap.utils.toArray<HTMLElement>("[data-svc-icon]", ul);
      const bubbles = gsap.utils.toArray<HTMLElement>("[data-svc-desc]", ul);

      // smooth path through the icon centers, entering from the top right
      const build = () => {
        const box = ul.getBoundingClientRect();
        svg.current!.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
        const pts = icons.map((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
        });
        let d = `M ${box.width + 40} ${pts[0].y - 160}`;
        let prev = { x: box.width + 40, y: pts[0].y - 160 };
        for (const p of pts) {
          const dy = (p.y - prev.y) * 0.55;
          d += ` C ${prev.x} ${prev.y + dy}, ${p.x} ${p.y - dy}, ${p.x} ${p.y}`;
          prev = p;
        }
        d += ` C ${prev.x} ${prev.y + 120}, ${box.width * 0.5} ${box.height + 40}, ${box.width * 0.5} ${box.height + 80}`;
        line.current!.setAttribute("d", d);
        ghost.current!.setAttribute("d", d);
      };
      build();

      gsap.fromTo(line.current, { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", scrollTrigger: { trigger: ul, start: "top 70%", end: "bottom 70%", scrub: 1.2, invalidateOnRefresh: true } });
      ScrollTrigger.addEventListener("refreshInit", build);

      icons.forEach((icon, i) => {
        const trigger = { trigger: icon, start: "top 72%", toggleActions: "play none none reverse" };
        gsap.from(icon, { scale: 0, duration: 0.5, ease: "back.out(3.5)", scrollTrigger: trigger });
        gsap.from(bubbles[i], { scale: 0, rotation: 6, duration: 0.5, delay: 0.08, ease: "back.out(3.5)", scrollTrigger: trigger });
      });
      return () => ScrollTrigger.removeEventListener("refreshInit", build);
    },
    { scope: list, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section id="servicios" className="overflow-hidden py-[var(--section-space)]">
      <div className="mx-auto max-w-[90rem] px-[var(--gutter)]">
        <SectionLabel>{tr(services.label, locale)}</SectionLabel>
        <h2 data-reveal="lines" className="mt-3 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] text-burgundy-deep uppercase">
          {services.titleLines.map((line) => (
            <span key={line.es} className="block">
              {tr(line, locale)}
            </span>
          ))}
        </h2>
      </div>

      <ul ref={list} className="relative mx-auto mt-14 flex max-w-[90rem] flex-col gap-14 px-[var(--gutter)] md:gap-20">
        <svg ref={svg} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full overflow-visible" fill="none">
          <path ref={ghost} stroke="var(--hot)" strokeOpacity="0.15" strokeWidth="7" strokeLinecap="round" />
          <path ref={line} stroke="var(--hot)" strokeWidth="7" strokeLinecap="round" />
        </svg>
        {services.items.map((item) => (
          <li key={item.after.es} className="relative md:ml-[var(--x)] md:w-fit" style={{ "--x": item.x } as React.CSSProperties}>
            <h3 className="flex flex-wrap items-center gap-x-3 font-display text-[clamp(2.25rem,5.5vw,5rem)] leading-none text-hot uppercase">
              {item.before ? <span>{tr(item.before, locale)}</span> : null}
              <span aria-hidden="true" data-svc-icon className="grid size-[0.8em] place-items-center rounded-lg border-2 border-hot bg-ivory">
                <svg viewBox="0 0 24 24" className="size-[62%]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {icons[item.icon]}
                </svg>
              </span>
              <span>{tr(item.after, locale)}</span>
            </h3>
            <p data-svc-desc className="mt-3 max-w-xs -rotate-3 rounded-2xl border border-hot/50 bg-ivory px-4 py-2 text-sm text-burgundy-deep md:ml-[30%]">
              {tr(item.desc, locale)}
            </p>
          </li>
        ))}
      </ul>

      <p data-reveal="fade" className="mx-auto mt-16 max-w-[90rem] px-[var(--gutter)] text-xl text-burgundy-deep md:text-2xl">
        {tr(services.note.before, locale)}
        <strong className="text-hot">{tr(services.note.strong, locale)}</strong>
        {tr(services.note.after, locale)}
      </p>
    </section>
  );
}
