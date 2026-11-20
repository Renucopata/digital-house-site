"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/*
 * Infinite strip whose speed and direction react to scrolling (two26 effects 5 and 22):
 * idle drift, flips direction when you scroll up, speeds up with scroll velocity (damped).
 * The children are rendered twice; the track wraps after one copy, so the loop is seamless.
 * Reduced motion: still.
 */
type Props = {
  children: ReactNode;
  /** Start moving left→right instead of right→left. */
  reverse?: boolean;
  /** Idle speed in px per second. */
  speed?: number;
  className?: string;
};

export function VelocityMarquee({ children, reverse = false, speed = 70, className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = track.current!;
      let copyWidth = el.scrollWidth / 2;
      const ro = new ResizeObserver(() => (copyWidth = el.scrollWidth / 2));
      ro.observe(el);

      const base = reverse ? 1 : -1;
      let scrollDir = 1; // 1 = scrolling down, -1 = up
      let dir = 1; // smoothed
      let boost = 0;
      let x = 0;

      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          scrollDir = self.direction;
          boost = Math.max(boost, Math.min(Math.abs(self.getVelocity()) / 220, 8));
        },
      });

      const tick = (_t: number, deltaMs: number) => {
        const dt = Math.min(deltaMs, 50) / 1000;
        dir += (scrollDir - dir) * 0.08;
        boost *= 0.92;
        x += base * dir * (speed + boost * 60) * dt;
        x = gsap.utils.wrap(-copyWidth, 0, x);
        gsap.set(el, { x });
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        ro.disconnect();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className={cn("overflow-hidden", className)}>
      <div ref={track} className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
