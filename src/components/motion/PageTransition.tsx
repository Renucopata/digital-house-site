"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

/*
 * Route transition (CLAUDE.md N4, our addition: two26 has none). Same spirit as the loader's exit:
 * clicking an internal link slides a burgundy curtain (curved edges) up from the bottom (.5 s);
 * the new page is pushed behind it, then the curtain keeps sliding up and off (.6 s), like scrolling.
 * Same-page / #anchor links, new tabs, modified clicks and downloads keep their normal behavior.
 * Reduced motion: plain navigation.
 */
export function PageTransition() {
  const curtain = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (prefersReducedMotion() || pending.current) return;

      // the Link's own navigation sees defaultPrevented and steps aside
      e.preventDefault();
      pending.current = true;
      const vh = window.innerHeight;
      gsap.fromTo(
        curtain.current,
        { y: vh, visibility: "visible" },
        { y: -0.2 * vh, duration: 0.5, ease: "power3.inOut", onComplete: () => router.push(url.pathname + url.search + url.hash) },
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    if (!window.location.hash) {
      getLenis()?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
    gsap.to(curtain.current, {
      y: -1.4 * window.innerHeight,
      duration: 0.6,
      delay: 0.05,
      ease: "power3.inOut",
      onComplete: () => gsap.set(curtain.current, { visibility: "hidden" }),
    });
  }, [pathname]);

  return (
    <div ref={curtain} aria-hidden="true" className="pointer-events-none invisible fixed inset-x-0 top-0 z-[1650] flex h-[140svh] flex-col text-hot">
      <svg className="h-[20svh] w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path d="M0 20 V12 Q50 -4 100 12 V20 Z" fill="currentColor" />
      </svg>
      <div className="flex-1 bg-current" />
      <svg className="h-[20svh] w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path d="M0 0 H100 V8 Q50 24 0 8 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
