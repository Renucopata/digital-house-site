import Image from "next/image";
import { useLocale } from "next-intl";
import { Pill } from "@/components/ui/Pill";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { tr, works, type WorkItem } from "@/content/home";
import { launch, workHref } from "@/content/launch";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/*
 * Selected works (artifact "Marcas que confiaron"): 8 cards in the artifact's grid (one feature,
 * two wide, the rest regular), each with a playful pill and "client · category".
 * Photos are pending (the artifact's images are not in the repo) → visible placeholder.
 * Cards link to /proyectos until the case-study pages exist (P5).
 * P4 adds two26's clip reveal on scroll and the brush-stroke hover.
 */
const sizeClass: Record<WorkItem["size"], { item: string; media: string }> = {
  feature: { item: "md:col-span-6", media: "aspect-[16/8]" },
  wide: { item: "md:col-span-4", media: "aspect-[4/3] md:aspect-auto md:h-[clamp(20rem,30vw,28rem)]" },
  regular: { item: "md:col-span-2", media: "aspect-[4/5] md:aspect-auto md:h-[clamp(20rem,30vw,28rem)]" },
};

export function Works() {
  const locale = useLocale();
  return (
    <section id="trabajos" className="mx-auto max-w-[90rem] px-[var(--gutter)] py-[var(--section-space)]">
      <SectionLabel>{tr(works.label, locale)}</SectionLabel>
      <h2 data-reveal="lines" className="mt-3 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] text-hot uppercase">{tr(works.title, locale)}</h2>

      <ul className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-6">
        {works.items.map((item) => (
          <li key={item.slug} className={sizeClass[item.size].item}>
            <Link href={workHref} className="group block">
              <figure data-reveal="card" className={cn("relative overflow-hidden rounded-[var(--radius-card)] bg-beige", sizeClass[item.size].media)}>
                {item.image ? (
                  <Image src={item.image} alt={tr(item.imageAlt, locale)} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105 group-hover:-rotate-[0.6deg]" />
                ) : (
                  launch.placeholders && <span className="absolute inset-0 grid place-items-center p-4 text-center text-sm text-fg-soft">{tr(works.imagePending, locale)}</span>
                )}
                <Pill rotate={-4} className="absolute top-4 left-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {tr(item.pill, locale)}
                </Pill>
              </figure>
              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none text-burgundy-deep uppercase">{item.client}</h3>
                  <span className="mt-1 block font-label text-xs font-bold tracking-[0.12em] text-accent-text uppercase">{tr(item.category, locale)}</span>
                </div>
                <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-hot text-ivory transition-transform group-hover:-rotate-45">
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-6">
        <p data-reveal="lines" className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-none text-burgundy-deep uppercase">{tr(works.more, locale)}</p>
        {launch.workPage ? (
          <Link href="/proyectos" className="rounded-full border-2 border-burgundy-deep px-5 py-2 font-label font-bold text-burgundy-deep transition-colors hover:bg-burgundy-deep hover:text-ivory">
          {tr(works.moreCta, locale)}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
