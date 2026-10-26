import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { reveal } from "@/lib/reveal";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** id on the heading element, for aria-labelledby on the section. */
  titleId?: string;
  lead?: ReactNode;
  /** h2 for sections (default); h1 only for the hero. */
  level?: "h1" | "h2" | "h3";
  /** serif = Bodoni Moda editorial headline; sans = Poppins headline pattern (Ctrl+N post). */
  font?: "serif" | "sans";
  size?: "display" | "h1" | "h2" | "h3";
  align?: "left" | "center";
  /** Scroll-reveal (default true). */
  animate?: boolean;
  className?: string;
};

const sizeClass = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
} as const;

/**
 * Eyebrow + headline + optional lead paragraph.
 * Use <strong> inside `title` for the bold-burgundy lines and <HandUnderline> for the key phrase.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleId,
  lead,
  level: Tag = "h2",
  font = "serif",
  size = "h2",
  align = "left",
  animate = true,
  className,
}: SectionHeadingProps) {
  return (
    <header
      {...(animate ? reveal() : {})}
      className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag
        id={titleId}
        className={cn(
          sizeClass[size],
          "text-balance text-fg",
          font === "serif"
            ? "font-display font-bold tracking-[-0.025em] [&_strong]:text-accent"
            : "font-display font-medium tracking-[-0.02em] [&_strong]:font-extrabold [&_strong]:text-accent",
        )}
      >
        {title}
      </Tag>
      {lead ? (
        <p className={cn("max-w-[38rem] text-lead text-fg-soft text-pretty", align === "center" && "mx-auto")}>{lead}</p>
      ) : null}
    </header>
  );
}
