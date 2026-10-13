import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
};

/** Tiny uppercase label with very wide tracking (like "GROWTH STUDIO", "SÍGUENOS EN"). */
export function Eyebrow({ children, as: Tag = "p", className }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "font-sans text-label font-normal uppercase tracking-label text-accent",
        // optical compensation: trailing tracking would push centered text left
        "[margin-right:-0.35em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
