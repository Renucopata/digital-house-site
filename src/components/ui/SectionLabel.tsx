import { cn } from "@/lib/cn";

/** Small uppercase section label with a dot, as in the artifact ("● Un poco de nosotros"). */
export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-label text-xs font-bold tracking-[0.18em] text-hot uppercase", className)}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
