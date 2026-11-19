import { useLocale } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { process, tr } from "@/content/home";

/*
 * "Cómo trabajamos" (artifact): four numbered steps on a route that ends in the goal (Meta ★).
 * P4 adds the route filling with scroll.
 */
export function Process() {
  const locale = useLocale();
  return (
    <section className="theme-sand bg-surface py-[var(--section-space)]">
      <div className="mx-auto max-w-[90rem] px-[var(--gutter)]">
        <SectionLabel>{tr(process.label, locale)}</SectionLabel>
        <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] text-burgundy-deep uppercase">{tr(process.title, locale)}</h2>
        <p className="mt-6 max-w-2xl text-lg text-burgundy-deep">{tr(process.intro, locale)}</p>

        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* the route */}
          <span aria-hidden="true" className="absolute top-8 right-0 left-0 hidden h-1 rounded-full bg-hot/25 md:block" />
          {process.steps.map((step, i) => (
            <li key={step.title.es} className="relative">
              <span className="relative block font-display text-6xl leading-none text-hot">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-3xl text-burgundy-deep uppercase">{tr(step.title, locale)}</h3>
              <p className="mt-2 text-burgundy-deep">{tr(step.desc, locale)}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-right">
          <span className="inline-block rounded-full bg-hot px-4 py-1.5 font-label text-sm font-bold tracking-[0.12em] text-ivory uppercase">
            {tr(process.goal, locale)} ★
          </span>
        </p>
      </div>
    </section>
  );
}
