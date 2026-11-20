import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type PillProps = HTMLAttributes<HTMLSpanElement> & { rotate?: number; "data-reveal"?: string };

/** Small rotated "sticker" pill (two26 / artifact): charcoal by default, ivory text. */
export function Pill({ children, rotate = 0, className, style, ...rest }: PillProps) {
  return (
    <span
      data-pill
      className={cn("inline-block rounded-full bg-charcoal px-3.5 py-1.5 font-label text-[0.8125rem] font-medium whitespace-nowrap text-ivory", className)}
      style={{ rotate: `${rotate}deg`, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
}
