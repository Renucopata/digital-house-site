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

      // the artifact's path (buildSvcLine): enter from the top right; between two icons the line
      // leaves sideways, swings out, curls once in a full loop, then comes into the next icon
      const build = () => {
        const box = ul.getBoundingClientRect();
        const W = box.width;
        const H = box.height;
        svg.current!.setAttribute("viewBox", `0 0 ${W} ${H}`);
        const pts = icons.map((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
        });
        if (!pts.length) return;
        const R = Math.max(26, Math.min(56, W * 0.035)); // loop radius
        const f = (n: number) => n.toFixed(1);
        let d = `M${f(W * 0.97)} ${f(-10)} C${f(W * 0.9)} ${f(pts[0].y * 0.5)} ${f(pts[0].x)} ${f(pts[0].y * 0.35)} ${f(pts[0].x)} ${f(pts[0].y)}`;
        for (let i = 0; i < pts.length - 1; i++) {
          const A = pts[i];
          const B = pts[i + 1];
          const g = B.y - A.y;
          const out = A.x > W / 2 ? -1 : 1;
          const mx = out > 0 ? Math.min(W - R * 2.5, Math.max(A.x, B.x) + W * 0.18) : Math.max(R * 2.5, Math.min(A.x, B.x) - W * 0.18);
          const my = A.y + g * 0.5;
          d += ` C${f(A.x)} ${f(A.y + g * 0.3)} ${f(mx - out * W * 0.06)} ${f(my - R - g * 0.12)} ${f(mx)} ${f(my - R)}`;
          // the curl: a full loop (two half arcs), then on
          const sweep = out > 0 ? 1 : 0;
          d += ` A${f(R)} ${f(R)} 0 1 ${sweep} ${f(mx)} ${f(my + R)} A${f(R)} ${f(R)} 0 1 ${sweep} ${f(mx)} ${f(my - R)}`;
          d += ` C${f(mx + out * R * 1.4)} ${f(my + g * 0.12)} ${f(B.x)} ${f(B.y - g * 0.32)} ${f(B.x)} ${f(B.y)}`;
        }
        const L = pts[pts.length - 1];
        d += ` C${f(L.x)} ${f(L.y + (H - L.y) * 0.5)} ${f(W * 0.15)} ${f(H * 0.98)} ${f(W * 0.04)} ${f(H + 10)}`;
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

      {/*
        Phones follow the artifact's mobile layout (user, 2026-11-21): 90px between services and room
        above/below the line, each service keeps 40 % of its desktop indent (still a zigzag), the title
        breaks after the icon ("BRAND ▢" / "STRATEGY"), bubbles at most ~30ch, no indent, alternating tilts.
        Desktop (md+) is unchanged.
      */}
      <ul
        ref={list}
        className="relative mx-auto mt-6 flex max-w-[90rem] flex-col gap-[90px] px-[var(--gutter)] pt-[60px] pb-[80px] md:mt-14 md:gap-20 md:pt-0 md:pb-0"
      >
        <svg ref={svg} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full overflow-visible" fill="none">
          <path ref={ghost} stroke="var(--hot)" strokeOpacity="0.16" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path ref={line} stroke="var(--hot)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {services.items.map((item, i) => (
          <li
            key={item.after.es}
            className="relative ml-[calc(var(--x)*0.4)] max-w-[calc(100%_-_var(--x)*0.4)] md:ml-[var(--x)] md:w-fit md:max-w-none"
            style={{ "--x": item.x } as React.CSSProperties}
          >
            <h3 className="flex flex-wrap items-center gap-x-3 font-display text-[clamp(2.75rem,5.5vw,5rem)] leading-[0.95] text-hot uppercase">
              {item.before ? <span>{tr(item.before, locale)}</span> : null}
              <span
                aria-hidden="true"
                data-svc-icon
                className={`grid size-[0.8em] place-items-center rounded-lg border-[3px] border-hot bg-salt text-burgundy-deep ${i % 2 ? "-rotate-6" : "rotate-[5deg]"}`}
              >
                <svg viewBox="0 0 24 24" className="size-[62%]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {icons[item.icon]}
                </svg>
              </span>
              {/* on phones the second word starts a new line, as in the artifact */}
              <span className={item.before ? "basis-full md:basis-auto" : undefined}>{tr(item.after, locale)}</span>
            </h3>
            <p
              data-svc-desc
              className={`mt-3.5 max-w-[30ch] rounded-2xl border-[1.5px] border-hot bg-salt px-4 py-2.5 text-[15px] leading-[1.4] text-burgundy-deep md:ml-[30%] md:max-w-xs md:text-sm ${i % 2 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"} md:-rotate-3`}
            >
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
