"use client";

import { useRef, useState } from "react";
import { DhLogo } from "@/components/brand/DhLogo";
import { Lockup } from "@/components/brand/Lockup";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { markLoaderDone } from "@/lib/loaderStore";

/*
 * Page loader (user adjustments, 2026-11-19).
 * 1. Beige screen; the dH writes itself in the center.
 * 2. The dH glides to the left while "digital HOUSE" wipes in beside it: the full logo, centered.
 * 3. When the logo is complete AND the page has loaded (6 s safety cap), the whole screen slides
 *    up in one smooth move, like scrolling, with a burgundy edge trailing it. No hold on the color:
 *    the page shows from below as the color slides away, and the hero starts right away.
 *
 * Plays once per full page load (it lives in the layout, so client-side navigation never replays it).
 * Scroll is locked while it is up; it covers the WhatsApp button too (user decision).
 * Reduced motion: hidden by CSS and marked done at once. No JS: hidden by a <noscript> style;
 * a CSS fail-safe hides it after 9 s anyway.
 */
const SLIDE = 1.0;

export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const logoWrap = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  /** Set by the effect: tells the loader the dH finished writing. */
  const logoFinished = useRef<() => void>(() => {});
  const [gone, setGone] = useState(false);

  useGSAP(
    (_context, contextSafe) => {
      const html = document.documentElement;
      if (prefersReducedMotion()) {
        markLoaderDone();
        setGone(true);
        return;
      }

      let logoDone = false;
      let pageLoaded = document.readyState === "complete";
      let exiting = false;
      const previousOverflow = html.style.overflow;
      html.style.overflow = "hidden";
      lockScroll();
      let unlocked = false;
      const unlock = () => {
        if (unlocked) return;
        unlocked = true;
        html.style.overflow = previousOverflow;
        unlockScroll();
      };

      // start with the dH alone in the center: shift the row so the mark's center is the screen's
      const r = row.current!.getBoundingClientRect();
      const m = mark.current!.getBoundingClientRect();
      gsap.set(row.current, { x: r.left + r.width / 2 - (m.left + m.width / 2) });
      gsap.set(word.current, { clipPath: "inset(0% 100% 0% 0%)", x: -16 });

      const tryExit = contextSafe!(() => {
        if (!logoDone || !pageLoaded || exiting) return;
        exiting = true;
        unlock();
        // the page (hero entrance) starts as the color begins to move
        markLoaderDone();
        gsap
          .timeline({ onComplete: () => setGone(true) })
          // slide the screen and its burgundy tail fully out of view
          .to(root.current, { yPercent: -135, duration: SLIDE, ease: "power3.inOut" })
          .to(logoWrap.current, { y: -60, opacity: 0, duration: SLIDE * 0.6, ease: "power2.in" }, 0);
      });

      // after the write-on: the mark glides left and the lettering wipes in beside it
      logoFinished.current = contextSafe!(() => {
        gsap
          .timeline({
            onComplete: () => {
              logoDone = true;
              tryExit();
            },
          })
          .to(row.current, { x: 0, duration: 0.9, ease: "power3.inOut" })
          .to(word.current, { clipPath: "inset(0% 0% 0% 0%)", x: 0, duration: 0.75, ease: "power3.out" }, "-=0.55")
          .to({}, { duration: 0.3 }); // a beat to read the full logo
      });

      const onLoad = () => {
        pageLoaded = true;
        tryExit();
      };
      if (!pageLoaded) window.addEventListener("load", onLoad, { once: true });

      // never keep visitors out: force the exit after 6 s
      const safety = gsap.delayedCall(6, () => {
        logoDone = true;
        pageLoaded = true;
        tryExit();
      });

      return () => {
        window.removeEventListener("load", onLoad);
        safety.kill();
        unlock();
      };
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div ref={root} className="dh-loader fixed inset-0 z-[1700] bg-beige" aria-hidden="true">
      {/* burgundy edge that trails the screen as it slides up (curved top, like a page turning) */}
      <svg className="absolute top-full left-0 h-[35vh] w-full" viewBox="0 0 100 35" preserveAspectRatio="none">
        <path d="M0 0 H100 V22 Q50 38 0 22 Z" fill="var(--hot)" />
      </svg>
      <div ref={logoWrap} className="absolute inset-0 grid place-items-center">
        {/* --mark sets the logo height; the lettering is sized from it (artifact ratio 30px mark : 20px text) */}
        <div ref={row} className="flex items-center gap-[0.3em] text-burgundy-deep [--mark:clamp(52px,14vw,150px)]" style={{ fontSize: "calc(var(--mark) * 0.66)" }}>
          <div ref={mark} className="shrink-0">
            <DhLogo mode="write" delay={0.25} penWidth={14} onComplete={() => logoFinished.current()} className="h-[var(--mark)] w-auto" />
          </div>
          {/* hidden in the markup too, so it never shows before the script runs */}
          <span ref={word} style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
            <Lockup />
          </span>
        </div>
      </div>
    </div>
  );
}
