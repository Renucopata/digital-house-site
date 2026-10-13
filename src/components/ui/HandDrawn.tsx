import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Hand-drawn burgundy marker accents (CLAUDE.md §4.4), drawn as SVG after the
 * "Ctrl + N" post: double underline swoosh, looping arrow, 4-point sparkle.
 * Decorative only (aria-hidden). Color follows the section accent (currentColor).
 * Strokes use non-scaling-stroke so the pen width stays the same at any size.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const;

type HandUnderlineProps = {
  children: ReactNode;
  className?: string;
  /** Pen width in CSS px. */
  strokeWidth?: number;
};

/** Wraps a key phrase and draws a double marker swoosh under it. */
export function HandUnderline({ children, className, strokeWidth = 2.25 }: HandUnderlineProps) {
  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      {children}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -left-[2%] top-[92%] h-[0.38em] w-[104%] text-accent"
      >
        <path {...stroke} strokeWidth={strokeWidth} d="M3 9.5C38 7.2 92 5.4 148 5c18-.1 34 .3 49 1.2" />
        <path {...stroke} strokeWidth={strokeWidth} d="M9 20c32-3.4 74-5.8 118-6.6" />
      </svg>
    </span>
  );
}

type DecorProps = {
  className?: string;
  strokeWidth?: number;
};

/** Looping arrow pointing right (flip with `-scale-x-100` in className). */
export function HandArrow({ className, strokeWidth = 2 }: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 140 100"
      className={cn("h-auto w-28 text-accent", className)}
    >
      <path {...stroke} strokeWidth={strokeWidth} d="M30 8C12 18 4 38 8 58c5 22 26 32 52 33 22 1 48-2 70-6" />
      <path {...stroke} strokeWidth={strokeWidth} d="M117 75l14 10-15 8" />
      <path {...stroke} strokeWidth={strokeWidth} d="M38 6l7-2M24 22l-1 6" />
    </svg>
  );
}

/** 4-point outline sparkle ✦. */
export function Sparkle({ className, strokeWidth = 2 }: DecorProps) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 100 100" className={cn("size-10 text-accent", className)}>
      <path
        {...stroke}
        strokeWidth={strokeWidth}
        d="M50 4c3 28 15 41 45 46-30 4-42 17-45 46-4-29-16-42-46-46 30-5 42-18 46-46Z"
      />
    </svg>
  );
}
