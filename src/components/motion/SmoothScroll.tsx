"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

/*
 * Smooth scroll (two26 effect 17): Lenis on the window, two26's settings (duration 1.7 on desktop,
 * 1.1 on touch, native touch scrolling), driven by gsap.ticker and synced with ScrollTrigger.
 * After every route change the page starts at the top (or at its #anchor) and triggers re-measure.
 * Reduced motion: no Lenis, normal scrolling.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const lenis = new Lenis({ duration: touch ? 1.1 : 1.7, syncTouch: false, anchors: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    // new page: top (or its anchor), then let every trigger measure the new layout
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(decodeURIComponent(id)) : null;
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (target) target.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
