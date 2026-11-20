"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { Pill } from "@/components/ui/Pill";
import { tr, works } from "@/content/home";
import { Link } from "@/i18n/navigation";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/*
 * /proyectos card stack (two26 effect 18). Cards are sticky, so each new row scrolls up over the
 * previous one; while that happens the covered card shrinks to .75 with an alternating tilt and a
 * thick burgundy paint stroke wipes over it (scrub .6). On desktop the project's name and category
 * pills follow the cursor while hovering a card (lerp, the second pill trails a bit more).
 * Reduced motion: a plain grid. Photos pending → neutral box with the client's name.
 */
export function WorkStack() {
  const locale = useLocale();
  const t = useTranslations("work");
  const root = useRef<HTMLUListElement>(null);
  const follower = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-stack-item]", root.current);
      const mm = gsap.matchMedia();

      mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (ctx) => {
        const cols = ctx.conditions!.desktop ? 3 : 1;
        items.forEach((item, i) => {
          const next = items[i + cols];
          if (!next) return;
          const tilt = (i % 2 === 0 ? -1 : 1) * gsap.utils.random(2.5, 4.5);
          const paint = item.querySelector("[data-paint]");
          gsap
            .timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top 12%", scrub: 0.6 } })
            .to(item.querySelector("[data-card]"), { scale: 0.75, rotation: tilt, ease: "power1.inOut" }, 0)
            .fromTo(paint, { drawSVG: "0%", strokeWidth: 0 }, { drawSVG: "100%", strokeWidth: 900, ease: "power2.inOut" }, 0.25);
        });
      });

      // cursor-following pills (fine pointers only)
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const box = follower.current!;
        const pills = Array.from(box.children) as HTMLElement[];
        const pos = { x: 0, y: 0 };
        const trail = pills.map(() => ({ x: 0, y: 0 }));
        const onMove = (e: MouseEvent) => {
          pos.x = e.clientX;
          pos.y = e.clientY;
        };
        const tick = () => {
          pills.forEach((p, i) => {
            const speed = Math.max(0.07, 0.16 - i * 0.04);
            trail[i].x += (pos.x - trail[i].x) * speed;
            trail[i].y += (pos.y - trail[i].y) * speed;
            gsap.set(p, { x: trail[i].x + 18, y: trail[i].y + 18 + i * 40 });
          });
        };
        gsap.ticker.add(tick);
        window.addEventListener("mousemove", onMove, { passive: true });
        const show = contextSafe!((client: string, category: string) => {
          pills[0].textContent = client;
          pills[1].textContent = category;
          trail.forEach((tr) => Object.assign(tr, pos));
          gsap.to(pills, { scale: 1, duration: 0.45, stagger: 0.05, ease: "back.out(2)", overwrite: true });
        });
        const hide = contextSafe!(() => gsap.to(pills, { scale: 0, duration: 0.25, stagger: 0.03, ease: "back.in(1.7)", overwrite: true }));
        gsap.set(pills, { scale: 0 });
        const cleanups = items.map((item) => {
          const enter = () => show(item.dataset.client ?? "", item.dataset.category ?? "");
          item.addEventListener("mouseenter", enter);
          item.addEventListener("mouseleave", hide);
          return () => {
            item.removeEventListener("mouseenter", enter);
            item.removeEventListener("mouseleave", hide);
          };
        });
        return () => {
          gsap.ticker.remove(tick);
          window.removeEventListener("mousemove", onMove);
          cleanups.forEach((fn) => fn());
          mm.revert();
        };
      }
      return () => mm.revert();
    },
    { scope: root, dependencies: [locale] },
  );

  return (
    <>
      <ul ref={root} className="mx-auto grid max-w-[90rem] grid-cols-1 gap-x-5 gap-y-16 px-[var(--gutter)] md:grid-cols-3">
        {works.items.map((item, i) => (
          <li
            key={item.slug}
            data-stack-item
            data-client={item.client}
            data-category={tr(item.category, locale)}
            className="sticky top-[12vh]"
            style={{ zIndex: i + 1 }}
          >
            <Link href={{ pathname: "/proyectos/[slug]", params: { slug: item.slug } }} className="group block" aria-label={`${t("viewProject")}: ${item.client}`}>
              <div data-card className="origin-top bg-ivory">
                <figure className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-beige">
                  {item.image ? (
                    <Image src={item.image} alt={tr(item.imageAlt, locale)} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105 group-hover:-rotate-[0.6deg]" />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center p-6 text-center font-display text-4xl text-burgundy-deep/30 uppercase">
                      {item.client}
                    </span>
                  )}
                  {/* paint stroke that wipes over the card when the next row covers it */}
                  <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 400 500" preserveAspectRatio="none" fill="none">
                    <path data-paint d="M-40 80 C 120 20, 300 160, 440 60 M-40 260 C 140 180, 280 340, 440 240 M-40 440 C 120 380, 300 520, 440 420" stroke="var(--hot)" strokeWidth="0" strokeLinecap="round" />
                  </svg>
                </figure>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none text-burgundy-deep uppercase">{item.client}</h2>
                    <span className="mt-1 block font-label text-xs font-bold tracking-[0.12em] text-accent-text uppercase">{tr(item.category, locale)}</span>
                  </div>
                  <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-hot text-ivory transition-transform group-hover:-rotate-45">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {/* pills that follow the cursor over a card (desktop) */}
      <div ref={follower} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[800] hidden md:block">
        <Pill className="absolute top-0 left-0 origin-top-left">.</Pill>
        <Pill className="absolute top-0 left-0 origin-top-left bg-hot">.</Pill>
      </div>
    </>
  );
}
