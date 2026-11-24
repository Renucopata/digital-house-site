"use client";

import { usePathname } from "@/i18n/navigation";
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { onLoaderDone } from "@/lib/loaderStore";

/*
 * Page-wide reveal system (two26 effects 2, 3, 6, 8, 12). Mark elements in the markup, this
 * animates them; it re-runs after every route change and cleans up through useGSAP's context.
 *
 *   data-reveal="lines"   heading lines rise from a mask   (.85 s back.out(1.4), stagger .12)
 *   data-reveal="fade"    fade up                          (.8 s power3.out)
 *   data-reveal="pop"     sticker pill pops                (.55 s back.out(2.5), from scale .4)
 *   data-reveal="card"    project card opens from a small rounded window (1.25 s power3.out)
 *   data-reveal="ribbon"  band draws in from the right     (1.3 s power2.out)
 *   data-kinetic          letters pop with a random tilt on hover (fine pointers only)
 *
 * Inside [data-hero] the marks form one timeline (×0.75) that plays when the loader leaves.
 * Scroll reveals are created after the loader too (so nothing plays hidden under it) and play
 * once at 85 % of the viewport. Reduced motion: nothing runs, everything is simply visible.
 */
export function Reveals() {
  const pathname = usePathname();

  useGSAP(
    (_context, contextSafe) => {
      if (prefersReducedMotion()) return;
      const all = <T extends Element>(sel: string) => Array.from(document.querySelectorAll<T>(sel));

      /* ---------- hero: one timeline, built when the loader starts to leave ----------
         The hero stays fully painted underneath the loader until then (the loader covers it), so
         the browser records the big headline as painted early (good LCP). The from-states are only
         applied at the moment the loader starts sliding up, while the top of the page is still
         covered, so visitors see exactly the same entrance. */
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      const buildHero = () => {
        if (!hero) return;
        const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } }).timeScale(0.75);
        const heroSplits: SplitText[] = [];
        hero.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines", aria: "hidden" });
          heroSplits.push(split);
          heroTl.from(split.lines, { yPercent: 110, opacity: 0, duration: 0.85, stagger: 0.12, ease: "back.out(1.4)" }, 0);
        });
        // masks off once the lines have landed: tight leading would otherwise clip accents (É, Á)
        heroTl.eventCallback("onComplete", () => heroSplits.forEach((s) => s.revert()));
        // pills drop in from above (artifact) with two26's spring
        heroTl.from(hero.querySelectorAll('[data-reveal="pop"]'), { y: -120, scale: 0.4, opacity: 0, duration: 0.8, stagger: 0.12, ease: "back.out(2)" }, 0.45);
        heroTl.from(hero.querySelectorAll('[data-reveal="fade"]'), { y: 30, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" }, 0.6);
      };
      const outsideHero = (el: Element) => !hero || !hero.contains(el);
      const once = (trigger: Element, start = "top 85%") => ({ trigger, start, once: true });

      /* ---------- scroll reveals, created once the loader is gone ---------- */
      const startReveals = contextSafe!(() => {
        buildHero();

        all<HTMLElement>('[data-reveal="lines"]').filter(outsideHero).forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            // split pieces hidden from screen readers, which read a clean copy instead
            // (an aria-label is not allowed on every element, e.g. <p>)
            aria: "hidden",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 0.85,
                stagger: 0.12,
                ease: "back.out(1.4)",
                scrollTrigger: once(el),
                // masks off once landed, so accents above the tight line box are never clipped
                onComplete: () => self.revert(),
              }),
          });
        });

        all('[data-reveal="fade"]').filter(outsideHero).forEach((el) => {
          gsap.from(el, { y: 28, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: once(el, "top 88%") });
        });

        all('[data-reveal="pop"]').filter(outsideHero).forEach((el) => {
          gsap.from(el, { scale: 0.4, opacity: 0, duration: 0.55, ease: "back.out(2.5)", scrollTrigger: once(el, "top 90%") });
        });

        all('[data-reveal="ribbon"]').forEach((el) => {
          gsap.from(el, { clipPath: "inset(0% 0% 0% 100%)", duration: 1.3, ease: "power2.out", scrollTrigger: once(el, "top 90%") });
        });

        // project cards: clip window inset 42.5 % → 0, inner media scale 1.45 + tilt → 0 (two26)
        all<HTMLElement>('[data-reveal="card"]').forEach((el, i) => {
          const inner = el.firstElementChild;
          const tl = gsap.timeline({ scrollTrigger: once(el) });
          tl.from(el, { clipPath: "inset(42.5% 42.5% 42.5% 42.5% round 36px)", duration: 1.25, ease: "power3.out" });
          if (inner) {
            tl.from(
              inner,
              { scale: 1.45, rotationX: 25, rotationY: i % 2 ? -8 : 8, rotation: i % 2 ? 3 : -3, transformPerspective: 900, duration: 1.25, ease: "power3.out" },
              0,
            );
          }
        });

        ScrollTrigger.refresh();
      });
      const stopWaiting = onLoaderDone(startReveals);

      /* ---------- kinetic letters on hover (footer links, emails) ---------- */
      const cleanups: (() => void)[] = [stopWaiting];
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        all<HTMLElement>("[data-kinetic]").forEach((el) => {
          const split = SplitText.create(el, { type: "chars", aria: "hidden" });
          const enter = () =>
            split.chars.forEach((c, i) => {
              gsap
                .timeline({ delay: i * 0.018 })
                .to(c, { scale: 1.14, rotation: gsap.utils.random(-7, 7), duration: 0.38, ease: "back.out(1.8)" })
                .to(c, { scale: 1, rotation: 0, duration: 0.5, ease: "power2.out" });
            });
          el.addEventListener("mouseenter", enter);
          cleanups.push(() => el.removeEventListener("mouseenter", enter));
        });
      }

      return () => cleanups.forEach((fn) => fn());
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
