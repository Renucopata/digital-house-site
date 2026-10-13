import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  /** narrow = reading width for text-heavy blocks. */
  width?: "default" | "narrow";
  className?: string;
};

/** Centered content column with responsive side gutters. */
export function Container({ children, width = "default", className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--gutter)]",
        width === "default" ? "max-w-[calc(var(--container-max)+2*var(--gutter))]" : "max-w-[calc(44rem+2*var(--gutter))]",
        className,
      )}
    >
      {children}
    </div>
  );
}
