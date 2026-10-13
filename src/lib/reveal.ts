import type { CSSProperties } from "react";

/**
 * Props for a scroll-reveal element (see RevealObserver + globals.css).
 * `index` staggers siblings by `step` ms (e.g. cards in a grid).
 */
export function reveal(index = 0, step = 90): { "data-reveal": ""; style?: CSSProperties } {
  return index > 0
    ? { "data-reveal": "", style: { "--reveal-delay": `${index * step}ms` } as CSSProperties }
    : { "data-reveal": "" };
}
