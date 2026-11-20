"use client";

import type Lenis from "lenis";

/*
 * The one Lenis instance (created by <SmoothScroll>). Other code pauses / resumes it through these
 * helpers: the loader, the mobile menu and the contact overlay stop the page from scrolling.
 * Locks are counted, so two layers open at once never resume scrolling too early.
 */
let instance: Lenis | null = null;
let locks = 0;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
  if (lenis && locks > 0) lenis.stop();
}

export const getLenis = () => instance;

export function lockScroll() {
  locks += 1;
  instance?.stop();
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) instance?.start();
}
