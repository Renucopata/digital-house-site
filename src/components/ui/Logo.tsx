import Image from "next/image";
import { cn } from "@/lib/cn";

/*
 * Logos extracted from the provided brand images (D8, D20) — never re-typeset.
 * Each file has its background baked in, so use it only on the matching surface:
 *   wordmark-burgundy / monogram        → cream (light) surfaces
 *   wordmark-cream / monogram-cream     → burgundy-deep (dark) surfaces
 * Source files are 2x; `width` is the CSS display width.
 */
const logos = {
  "wordmark-burgundy": { src: "/brand/logo-wordmark-burgundy.png", w: 636, h: 209, bg: "bg-cream" },
  "wordmark-cream": { src: "/brand/logo-wordmark-cream.png", w: 636, h: 209, bg: "bg-burgundy-deep" },
  monogram: { src: "/brand/logo-monogram.png", w: 594, h: 553, bg: "bg-cream" },
  "monogram-cream": { src: "/brand/logo-monogram-cream.png", w: 594, h: 553, bg: "bg-burgundy-deep" },
} as const;

export type LogoVariant = keyof typeof logos;

type LogoProps = {
  variant: LogoVariant;
  /** Display width in CSS px (max ≈ half the source width for 2x sharpness: 318 / 297). */
  width: number;
  preload?: boolean;
  /** Slow "breathing" loop (user request, Phase 2). Pauses on hover; off with reduced motion. */
  animated?: boolean;
  className?: string;
};

export function Logo({ variant, width, preload, animated, className }: LogoProps) {
  const logo = logos[variant];
  const height = Math.round((width * logo.h) / logo.w);
  return (
    <Image
      src={logo.src}
      alt="DigitalHouse Growth Studio"
      width={width}
      height={height}
      sizes={`${width}px`}
      preload={preload}
      className={cn(
        logo.bg,
        animated && "origin-center animate-breathe hover:[animation-play-state:paused] motion-reduce:animate-none",
        className,
      )}
    />
  );
}
