"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/*
 * One place that registers GSAP and its plugins (all free since GSAP 3.13).
 * Import gsap / plugins / useGSAP from here, never straight from "gsap", so registration always runs.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase);
}

/** Shared timings, from two26's own scripts (docs/NEW-DESIGN.md §1). */
export const motion = {
  heroTimeScale: 0.75,
  ease: {
    pop: "back.out(2.5)",
    line: "back.out(1.4)",
    out: "power2.out",
    inOut: "power2.inOut",
    reveal: "power3.out",
    spring: "elastic.out(1.1, 0.4)",
  },
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase };
