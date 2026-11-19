/** Temporary page body for P1 (replaced by the real sections in P3 and P5). */
export function PagePlaceholder({ title, note }: { title: string; note: string }) {
  return (
    <section className="flex min-h-svh flex-col justify-center px-[var(--gutter)] pt-24 pb-16">
      <h1 className="max-w-[14ch] font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] text-burgundy uppercase">{title}</h1>
      <p className="mt-6 font-label text-sm text-fg-soft">{note}</p>
    </section>
  );
}
