import { cn } from "@/lib/cn";

/**
 * Small uppercase section label with a dot, as in the artifact ("● Un poco de nosotros").
 * tone="dark" on velvet / paprika sections (cream text; the small-text paprika would not be readable).
 */
export function SectionLabel({ children, className, tone = "light" }: { children: React.ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-label text-xs font-bold tracking-[0.18em] uppercase",
        tone === "dark" ? "text-ivory" : "text-accent-text",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
