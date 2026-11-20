"use client";

import { useRef, type ReactNode } from "react";
import { useContact } from "@/components/layout/ContactProvider";
import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type CtaButtonProps = {
  children: ReactNode;
  /** "dark" = charcoal pill on light surfaces; "light" = ivory pill on dark surfaces. */
  tone?: "dark" | "light";
  size?: "sm" | "md";
  className?: string;
  /** Runs before the overlay opens (e.g. the mobile menu closes itself). */
  onBeforeOpen?: () => void;
};

/**
 * Pill CTA with an arrow circle (two26 effect 13). Opens the contact overlay (CLAUDE.md N6).
 * Hover (mouse only): a burgundy burst grows from the arrow circle and fills the pill (×10, .55 s),
 * the arrow kicks in a loop (−25° → 0 with back.out(2.5)), and the button follows the cursor
 * (magnetic, .3 s) with its content trailing; leaving springs back (elastic.out(1.1, .4), .8 s).
 */
export function CtaButton({ children, tone = "dark", size = "md", className, onBeforeOpen }: CtaButtonProps) {
  const { open } = useContact();
  const btn = useRef<HTMLButtonElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = btn.current!;
      if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const fill = el.querySelector("[data-cta-fill]");
      const arrow = el.querySelector("[data-cta-arrow]");
      const inner = el.querySelectorAll("[data-cta-inner]");
      let loop: gsap.core.Timeline | null = null;

      const enter = contextSafe!(() => {
        gsap.to(fill, { scale: 10, duration: 0.55, ease: "power2.out" });
        loop?.kill();
        loop = gsap
          .timeline({ repeat: -1, repeatDelay: 0.2 })
          .to(arrow, { rotation: -25, duration: 0.22, ease: "power2.out" })
          .to(arrow, { rotation: 0, duration: 0.4, ease: "back.out(2.5)" });
      });
      const move = contextSafe!((e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = gsap.getProperty(el, "x") as number;
        const y = gsap.getProperty(el, "y") as number;
        // distance from the button's resting center
        const dx = e.clientX - (r.left - x + r.width / 2);
        const dy = e.clientY - (r.top - y + r.height / 2);
        gsap.to(el, { x: dx * 0.3, y: dy * 0.4, duration: 0.3, ease: "power2.out" });
        gsap.to(inner, { x: dx * 0.12, y: dy * 0.15, duration: 0.3, ease: "power2.out" });
      });
      const leave = contextSafe!(() => {
        loop?.kill();
        gsap.to(arrow, { rotation: 0, duration: 0.35, ease: "power2.out" });
        gsap.to([el, ...inner], { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1.1, 0.4)" });
        gsap.to(fill, { scale: 1, duration: 0.45, ease: "power2.out" });
      });

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: btn },
  );

  return (
    <button
      ref={btn}
      type="button"
      data-cta
      onClick={() => {
        onBeforeOpen?.();
        open();
      }}
      aria-haspopup="dialog"
      className={cn(
        "relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full font-label font-bold whitespace-nowrap",
        size === "sm" ? "py-1.5 pr-1.5 pl-4 text-sm" : "py-2 pr-2 pl-6 text-base",
        tone === "dark" ? "bg-charcoal text-ivory" : "bg-ivory text-burgundy-deep hover:text-ivory",
        className,
      )}
    >
      <span data-cta-inner data-cta-text className="relative z-[1] transition-colors duration-300">
        {children}
      </span>
      <span aria-hidden="true" className={cn("relative grid place-items-center", size === "sm" ? "size-7" : "size-9")}>
        {/* the burst: starts as the arrow circle, scales up to fill the whole pill on hover */}
        <span data-cta-fill className="absolute inset-0 -z-[1] rounded-full bg-burgundy" />
        <span data-cta-inner className="relative z-[1] text-ivory">
          <svg data-cta-arrow viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 12 12 4M6 4h6v6" />
          </svg>
        </span>
      </span>
    </button>
  );
}
