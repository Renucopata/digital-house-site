import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  as?: "p" | "span" | "div" | "h2";
  id?: string;
  /** Outlined, fully rounded "pill" box (hero "GROWTH STUDIO", D38). */
  pill?: boolean;
  className?: string;
};

/** Tiny uppercase label with very wide tracking (like "GROWTH STUDIO", "SÍGUENOS EN"). */
export function Eyebrow({ children, as: Tag = "p", id, pill = false, className }: EyebrowProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-label text-label font-medium uppercase tracking-label text-accent",
        pill
          ? // the trailing letter-spacing is taken out of the right padding so the text looks centered
            "inline-flex self-start rounded-full border-[1.5px] border-accent py-1.5 pr-[calc(1rem-0.35em)] pl-4 font-bold"
          : // optical compensation: trailing tracking would push centered text left
            "[margin-right:-0.35em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
