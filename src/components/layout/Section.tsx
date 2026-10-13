import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { WindowShadow } from "./WindowShadow";

export type SectionTheme = "light" | "sand" | "dark";

type SectionProps = {
  children: ReactNode;
  /** Anchor id for the single-page navigation (D3). */
  id?: string;
  theme?: SectionTheme;
  /** Subtle paper grain overlay. */
  grain?: boolean;
  /** Soft window/leaf shadow overlay (light / sand themes look best). */
  windowShadow?: boolean | "left" | "right";
  /** Remove the default vertical padding (e.g. for full-bleed media). */
  flush?: boolean;
  as?: "section" | "div" | "footer";
  className?: string;
  "aria-labelledby"?: string;
};

/**
 * Full-bleed band with one of the two brand moods (light cream / sand, dark burgundy).
 * Sets the semantic color variables used by every UI primitive inside it.
 */
export function Section({
  children,
  id,
  theme = "light",
  grain = false,
  windowShadow = false,
  flush = false,
  as: Tag = "section",
  className,
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        `theme-${theme}`,
        "relative isolate overflow-hidden bg-surface text-fg",
        !flush && "py-[var(--section-space)]",
        className,
      )}
      {...rest}
    >
      {windowShadow ? (
        <WindowShadow side={windowShadow === "left" ? "left" : "right"} className="-z-10" />
      ) : null}
      {grain ? (
        <div
          aria-hidden="true"
          className={cn(
            "texture-grain pointer-events-none absolute inset-0 -z-10",
            theme === "dark" ? "opacity-[0.18] mix-blend-multiply" : "opacity-[0.22] mix-blend-multiply",
          )}
        />
      ) : null}
      {children}
    </Tag>
  );
}
