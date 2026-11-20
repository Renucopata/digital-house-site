"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

/*
 * Footer logo that stretches with the scroll (two26 effect 12): squashed (scaleY .15, anchored at the
 * bottom) when the footer appears, grows as you scroll down (faster scrolling stretches it a bit
 * more), and springs to its natural height with an elastic settle at the very bottom of the page.
 * Reduced motion: static.
 */
export function StretchLogo({ children, className, style, label }: { children: ReactNode; className?: string; style?: CSSProperties; label: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = root.current!;
      gsap.set(el, { scaleY: 0.15, transformOrigin: "50% 100%" });
      let settled = false;
      ScrollTrigger.create({
        trigger: el.closest("footer") ?? el,
        start: "top bottom",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (self.progress > 0.985) {
            if (!settled) {
              settled = true;
              gsap.killTweensOf(el);
              gsap.to(el, { scaleY: 1, duration: 1.4, ease: "elastic.out(1.2, 0.35)" });
            }
            return;
          }
          settled = false;
          const stretch = Math.min(Math.abs(self.getVelocity()) / 1500, 0.25);
          const target = 0.15 + self.progress * 0.85 * (self.direction === 1 ? 1 + stretch : 1);
          gsap.to(el, { scaleY: Math.min(target, 1.35), duration: 0.1, ease: "power1.out", overwrite: true });
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} role="img" aria-label={label} className={className} style={style}>
      {children}
    </div>
  );
}
