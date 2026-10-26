import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type SelectionBoxProps = {
  /** The key word(s) shown as "selected" text. */
  text: string;
  /** Text right after the selection, outside the yellow band (e.g. the final period). */
  after?: string;
  /** Type the word letter by letter, the selection growing with it (D32). */
  typing?: boolean;
  /** Repeat the typing forever (D34). */
  repeat?: boolean;
  /** ms before the first letter appears on page load. */
  delay?: number;
  /** ms per letter. */
  step?: number;
  /** ms the finished word stays selected (cursor blinking) before it is typed again. */
  hold?: number;
  className?: string;
};

/** ms the word stays empty before each new typing pass (so a restart reads as a restart). */
const EMPTY = 220;
const BLINK = 500;

/**
 * Keyframes for one typing cycle. Letter k (and finally the text after the selection) appears at
 * EMPTY + k × step; letter k shows the bottom-right handle (the cursor) until letter k+1 appears;
 * the last letter keeps it and blinks while the finished word is held.
 */
function cycleCss(name: string, count: number, step: number, hold: number) {
  const typed = EMPTY + count * step;
  const total = typed + hold;
  const pct = (ms: number) => `${((ms / total) * 100).toFixed(3)}%`;
  const at = (k: number) => EMPTY + k * step;
  const jump = "animation-timing-function:steps(1,end)";
  let css = "";
  for (let k = 0; k <= count; k++) {
    // k === count → the text after the selection (the period)
    css += `@keyframes ${name}-in-${k}{0%{opacity:0;${jump}}${pct(at(k))}{opacity:1}100%{opacity:1}}`;
  }
  for (let k = 0; k < count - 1; k++) {
    css += `@keyframes ${name}-cur-${k}{0%{opacity:0;${jump}}${pct(at(k))}{opacity:1;${jump}}${pct(at(k + 1))}{opacity:0}100%{opacity:0}}`;
  }
  let blink = "";
  for (let t = at(count - 1) + BLINK, on = false; t < total - 1; t += BLINK, on = !on) {
    blink += `${pct(t)}{opacity:${on ? 1 : 0};${jump}}`;
  }
  css += `@keyframes ${name}-cur-${count - 1}{0%{opacity:0;${jump}}${pct(at(count - 1))}{opacity:1;${jump}}${blink}100%{opacity:1}}`;
  return { css, total };
}

/**
 * The brief's "caja de selección": a key word on a yellow band with a line + round handle at
 * opposite corners (top-left and bottom-right), like text selected in a design editor.
 * CSS only (globals.css, "Selection box"): each letter carries its own slice of the band, so the
 * selection widens as the letters appear; the bottom-right handle moves with the last letter and
 * acts as the typing cursor. Reduced motion → shown fully selected, no typing.
 * Screen readers get the plain text once (the letter spans are aria-hidden).
 */
export function SelectionBox({
  text,
  after,
  typing = false,
  repeat = false,
  delay = 500,
  step = 85,
  hold = 1000,
  className,
}: SelectionBoxProps) {
  const letters = Array.from(text);
  const name = `sel-${letters.length}-${step}-${hold}`;
  const cycle = typing ? cycleCss(name, letters.length, step, hold) : null;
  const vars = cycle
    ? ({
        "--sel-cycle": `${cycle.total}ms`,
        "--sel-start": `${delay - EMPTY}ms`,
        "--sel-runs": repeat ? "infinite" : "1",
      } as CSSProperties)
    : undefined;

  return (
    <span className={cn("whitespace-nowrap", className)}>
      {cycle ? <style dangerouslySetInnerHTML={{ __html: cycle.css }} /> : null}
      <span className="sr-only">
        {text}
        {after}
      </span>
      <span aria-hidden="true" className="sel" data-typing={typing ? "" : undefined} style={vars}>
        {letters.map((letter, i) => (
          <span
            key={i}
            className="sel-letter"
            data-first={i === 0 ? "" : undefined}
            data-last={i === letters.length - 1 ? "" : undefined}
            style={typing ? ({ "--sel-in": `${name}-in-${i}`, "--sel-cur": `${name}-cur-${i}` } as CSSProperties) : undefined}
          >
            {letter}
          </span>
        ))}
        {after ? (
          <span
            className="sel-after"
            style={typing ? ({ "--sel-in": `${name}-in-${letters.length}` } as CSSProperties) : undefined}
          >
            {after}
          </span>
        ) : null}
      </span>
    </span>
  );
}
