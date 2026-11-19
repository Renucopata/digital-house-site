"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useContact } from "@/components/layout/ContactProvider";

type CtaButtonProps = {
  children: ReactNode;
  /** "dark" = charcoal pill on light surfaces; "light" = ivory pill on dark surfaces. */
  tone?: "dark" | "light";
  size?: "sm" | "md";
  className?: string;
  /** Runs before the overlay opens (e.g. the mobile menu closes itself). */
  onBeforeOpen?: () => void;
};

/**
 * Pill CTA with an arrow circle (two26 effect 13). Opens the contact overlay (CLAUDE.md N6).
 * P1: static hover; the fill burst, arrow loop and magnetic pull come in P4 (data-cta hooks them).
 */
export function CtaButton({ children, tone = "dark", size = "md", className, onBeforeOpen }: CtaButtonProps) {
  const { open } = useContact();
  return (
    <button
      type="button"
      data-cta
      onClick={() => {
        onBeforeOpen?.();
        open();
      }}
      aria-haspopup="dialog"
      className={cn(
        "group inline-flex items-center gap-3 rounded-full font-label font-bold whitespace-nowrap transition-colors",
        size === "sm" ? "py-1.5 pr-1.5 pl-4 text-sm" : "py-2 pr-2 pl-6 text-base",
        tone === "dark" ? "bg-charcoal text-ivory hover:bg-burgundy-deep" : "bg-ivory text-burgundy-deep hover:bg-beige",
        className,
      )}
    >
      <span data-cta-text>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "grid place-items-center rounded-full bg-burgundy text-ivory",
          size === "sm" ? "size-7" : "size-9",
        )}
      >
        <svg data-cta-arrow viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 12 12 4M6 4h6v6" />
        </svg>
      </span>
    </button>
  );
}
