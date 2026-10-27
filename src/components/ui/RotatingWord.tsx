"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type RotatingWordProps = {
  words: readonly string[];
  /** Time each word stays, in ms (web brief: 2.3 s). */
  interval?: number;
  /** Fade/slide time, in ms (web brief: 0.35 s). Must match the CSS transition. */
  fade?: number;
  className?: string;
};

/**
 * One word at a time: the current word fades out sliding down, then the next one fades in
 * sliding up into its place (globals.css "Rotating word"). Purely visual (aria-hidden): the
 * parent gives screen readers the full sentence once. Reduced motion → the first word, static.
 */
export function RotatingWord({ words, interval = 2300, fade = 350, className }: RotatingWordProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let swap: number | undefined;
    const tick = window.setInterval(() => {
      setLeaving(true);
      swap = window.setTimeout(() => {
        setIndex((value) => (value + 1) % words.length);
        setLeaving(false);
      }, fade);
    }, interval);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(swap);
    };
  }, [words.length, interval, fade]);

  return (
    <span aria-hidden="true" className={cn("rot-word", className)} data-leaving={leaving ? "" : undefined}>
      {words[index]}
    </span>
  );
}
