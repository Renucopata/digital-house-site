import { cn } from "@/lib/cn";

/**
 * "digital HOUSE" lettering from the reference artifact: "digital" in Bodoni Moda (1.25em),
 * "HOUSE" in Montserrat Black, baseline-aligned. Sits next to the dH mark to form the full logo.
 */
export function Lockup({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-[0.28em] leading-none whitespace-nowrap", className)}>
      <span className="font-[family-name:var(--font-bodoni)] text-[1.25em] font-normal tracking-[-0.02em]">digital</span>
      <span className="font-[family-name:var(--font-montserrat)] font-black tracking-[-0.02em]">HOUSE</span>
    </span>
  );
}
