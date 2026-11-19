"use client";

import { useId, useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/*
 * "dH" mark that writes itself (CLAUDE.md N8). Shapes and pen route come from the user's reference
 * artifact: d = elliptical ring bowl (clipped behind the stem) + stem with a hooked top; H = 3 rects.
 * A thin pen line traces d → H while a 170-wide mask stroke follows 220 units behind it and reveals
 * the fill. Finished here (docs/NEW-DESIGN.md §2): GSAP + DrawSVG instead of hand-rolled rAF, lead-in
 * and exit tail shortened so the mark stays centered, and a final "settle": the fill turns from the
 * pen color to the logo color while the mark pops (back.out).
 *
 * Modes: "write" = full write-on (loader) · "replay" = static, redraws quickly on hover (header)
 * · "static" = finished mark (footer). Reduced motion → always static.
 * The fill uses currentColor, so the parent's text color sets the logo color.
 */

/** Pen route in the mark's own units: bowl → stem + hook → stem down → H left stem → bar → right stem. */
const PEN =
  "M300 880 C420 864 540 820 566 750 A183 199 0 1 1 566 462 C600 380 600 250 590 190 C580 150 545 128 500 128 L663 58 C640 75 616 95 616 150 L616 790 C616 840 745 850 745 790 L745 415 C745 470 745 560 745 603 L1025 603 L1025 415 C1025 470 1025 700 1025 795 C1025 845 1060 870 1110 860";

/** The pen draws a moving window this long (units) and the mask trails the pen head by this much. */
const PEN_WINDOW = 600;
const MASK_LAG = 220;

type Mode = "write" | "replay" | "static";

type DhLogoProps = {
  mode?: Mode;
  /** Accessible name; omit when a parent link already names it (the svg is then hidden). */
  title?: string;
  /** Write duration in seconds (write mode). */
  duration?: number;
  /** Pen thickness in mark units (thicker for small sizes). */
  penWidth?: number;
  /** Seconds before the write starts (write mode). */
  delay?: number;
  onComplete?: () => void;
  className?: string;
};

export function DhLogo({ mode = "static", title, duration = 2.1, penWidth = 12, delay = 0, onComplete, className }: DhLogoProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const root = useRef<SVGSVGElement>(null);
  const pen = useRef<SVGPathElement>(null);
  const reveal = useRef<SVGPathElement>(null);
  const fill = useRef<SVGGElement>(null);
  const pop = useRef<SVGGElement>(null);
  const replayTl = useRef<gsap.core.Timeline | null>(null);

  /** Builds the write-on timeline (paused). */
  const buildWrite = (seconds: number) => {
    const penEl = pen.current!;
    const revealEl = reveal.current!;
    const fillEl = fill.current!;
    const svg = root.current!;
    const L = penEl.getTotalLength();
    const style = getComputedStyle(svg);
    const finalColor = style.color;
    const penColor = style.getPropertyValue("--hot").trim() || finalColor;
    const head = { v: 0 };

    const tl = gsap.timeline({ paused: true });
    tl.set(penEl, { drawSVG: "0 0", opacity: 1 })
      .set(revealEl, { drawSVG: "0 0" })
      .set(fillEl, { fill: penColor })
      .to(head, {
        v: L + PEN_WINDOW,
        duration: seconds,
        ease: "sine.inOut",
        onUpdate: () => {
          const a = Math.max(0, head.v - PEN_WINDOW);
          const b = Math.min(L, head.v);
          gsap.set(penEl, { drawSVG: `${a} ${Math.max(a, b)}` });
          gsap.set(revealEl, { drawSVG: `0 ${gsap.utils.clamp(0, L, head.v - MASK_LAG)}` });
        },
      })
      // settle: pen color → logo color, small springy pop
      .to(fillEl, { fill: finalColor, duration: 0.5, ease: "power1.out" }, "-=0.25")
      .fromTo(pop.current, { scale: 0.94 }, { scale: 1, duration: 0.6, ease: "back.out(3)", svgOrigin: "500 500" }, "<")
      .set(penEl, { opacity: 0 })
      .set(fillEl, { clearProps: "fill" });
    return tl;
  };

  useGSAP(
    () => {
      if (mode === "static") return;
      if (prefersReducedMotion()) {
        // finished mark, no drawing
        gsap.set(reveal.current, { drawSVG: "100%" });
        gsap.set(pen.current, { opacity: 0 });
        onComplete?.();
        return;
      }
      if (mode === "write") {
        const tl = buildWrite(duration);
        tl.eventCallback("onComplete", () => onComplete?.());
        gsap.delayedCall(delay, () => tl.play());
      }
    },
    { scope: root, dependencies: [mode] },
  );

  const onEnter =
    mode === "replay"
      ? () => {
          if (prefersReducedMotion() || replayTl.current?.isActive()) return;
          replayTl.current?.kill();
          replayTl.current = buildWrite(0.8).play();
        }
      : undefined;

  // write mode starts hidden (no flash before hydration); the other modes start finished
  const hiddenAtStart = mode === "write";

  return (
    <svg
      ref={root}
      viewBox="130 185 740 640"
      overflow="visible"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      onPointerEnter={onEnter}
      className={cn("block", className)}
    >
      <defs>
        <clipPath id={`dh-clip-${uid}`}>
          <rect x="0" y="0" width="567" height="1000" />
        </clipPath>
        <mask id={`dh-mask-${uid}`} maskUnits="userSpaceOnUse" x="-600" y="-200" width="2400" height="1400">
          <path
            ref={reveal}
            d={PEN}
            fill="none"
            stroke="#fff"
            strokeWidth="170"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={hiddenAtStart ? { strokeDasharray: "0 100000" } : undefined}
          />
        </mask>
      </defs>
      <g ref={pop}>
        <g transform="translate(500 500) scale(0.78) translate(-654.5 -433.5)">
          <g ref={fill} mask={`url(#dh-mask-${uid})`} fill="currentColor">
            <path
              clipPath={`url(#dh-clip-${uid})`}
              fillRule="evenodd"
              d="M212 607.5a209 204.5 0 1 0 418 0a209 204.5 0 1 0 -418 0Z M293 606a157 194 0 1 0 314 0a157 194 0 1 0 -314 0Z"
            />
            <path d="M567 808 L567 168 C567 140 552 129 528 129 L488 132 Q480 131 485 126 L662 55 L665 55 L665 808 Z" />
            <rect x="680" y="403" width="130" height="405" />
            <rect x="953" y="403" width="144" height="405" />
            <rect x="808" y="556" width="147" height="95" />
          </g>
          <path
            ref={pen}
            d={PEN}
            fill="none"
            stroke="var(--hot)"
            strokeWidth={penWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
        </g>
      </g>
    </svg>
  );
}
