"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { useRef, useState } from "react";
import { tr, works } from "@/content/home";
import { Link } from "@/i18n/navigation";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/*
 * Text-only project list with a floating preview (user's brief; not on two26). Hovering a row shows
 * the project's image following the cursor (quickTo), tilting with the mouse speed; moving between
 * rows swaps the image. Touch / reduced motion: plain list, no preview.
 * Photos pending → the preview is a burgundy card with the client's name.
 */
export function WorkList() {
  const locale = useLocale();
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const el = preview.current!;
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 1 });
      const toX = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      const toY = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
      const toR = gsap.quickTo(el, "rotation", { duration: 0.6, ease: "power3.out" });
      let lastX = 0;
      let shown = false;
      const list = root.current!.querySelector("ul")!;
      // appears on the first movement over the list, right at the cursor (never from a corner)
      const move = contextSafe!((e: MouseEvent) => {
        if (!shown) {
          shown = true;
          gsap.set(el, { x: e.clientX, y: e.clientY, rotation: 0 });
          gsap.to(el, { scale: 1, duration: 0.4, ease: "back.out(1.8)", overwrite: "auto" });
          lastX = e.clientX;
        }
        toX(e.clientX);
        toY(e.clientY);
        toR(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      });
      const leave = contextSafe!(() => {
        shown = false;
        gsap.to(el, { scale: 0, duration: 0.3, ease: "power2.in", overwrite: "auto" });
        setActive(null);
      });
      list.addEventListener("mousemove", move);
      list.addEventListener("mouseleave", leave);
      return () => {
        list.removeEventListener("mousemove", move);
        list.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root },
  );

  const item = active !== null ? works.items[active] : null;

  return (
    <div ref={root} className="mx-auto max-w-[90rem] px-[var(--gutter)]">
      <ul className="border-t border-burgundy-deep/20">
        {works.items.map((w, i) => (
          <li key={w.slug} className="border-b border-burgundy-deep/20" onMouseEnter={() => setActive(i)}>
            <Link
              href={{ pathname: "/proyectos/[slug]", params: { slug: w.slug } }}
              className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 transition-colors hover:text-hot md:py-7"
            >
              <span className="font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-none text-burgundy-deep uppercase transition-transform duration-500 group-hover:translate-x-3 group-hover:text-hot">
                {w.client}
              </span>
              <span className="font-label text-xs font-bold tracking-[0.12em] text-accent-text uppercase">{tr(w.category, locale)}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* floating preview (desktop, fine pointer) */}
      <div ref={preview} aria-hidden="true" className="pointer-events-none invisible fixed top-0 left-0 z-[800] aspect-[4/5] w-[min(22vw,320px)] overflow-hidden rounded-[var(--radius-card)] bg-hot">
        {item?.image ? (
          <Image src={item.image} alt="" fill sizes="320px" className="object-cover" />
        ) : item ? (
          <span className="grid size-full place-items-center p-6 text-center font-display text-4xl text-ivory uppercase">{item.client}</span>
        ) : null}
      </div>
    </div>
  );
}
