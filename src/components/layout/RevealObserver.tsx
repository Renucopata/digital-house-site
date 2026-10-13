"use client";

import { useEffect } from "react";

/**
 * Marks every [data-reveal] element with [data-revealed] the first time it enters the viewport.
 * The visual effect lives in globals.css (fade + 12px rise, reduced-motion safe). Renders nothing.
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reveal = (el: HTMLElement) => el.setAttribute("data-revealed", "");

    if (!("IntersectionObserver" in window)) {
      elements.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
