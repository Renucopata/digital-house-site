import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { tr, works } from "@/content/home";
import { launch } from "@/content/launch";
import { caseOrder, cases, caseStudy } from "@/content/pages";
import { workImages } from "@/content/work-images";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

/*
 * Case study, laid out like the reference artifact's project pages: sticky bar (back pill + count),
 * category label, giant project name, meta row (Cliente · Rubro · Qué hicimos), intro, then the
 * project's photos in their numbered order in a 2-column grid where some images span the full width
 * (the artifact's pattern), and a "next project" band. Texts from the artifact (cases in pages.ts).
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => caseOrder.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/proyectos/[slug]">): Promise<Metadata> {
  const { slug, locale } = await params;
  const data = cases[slug];
  const item = works.items.find((w) => w.slug === slug);
  return pageMetadata({
    href: { pathname: "/proyectos/[slug]", params: { slug } },
    locale,
    title: item?.client,
    description: data ? tr(data.intro, locale) : "",
    index: launch.workPage,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/[locale]/proyectos/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const index = caseOrder.indexOf(slug);
  const item = works.items.find((w) => w.slug === slug);
  const data = cases[slug];
  if (index < 0 || !item || !data) notFound();
  const next = works.items.find((w) => w.slug === caseOrder[(index + 1) % caseOrder.length])!;
  const photos = workImages[slug] ?? [];
  const t = await getTranslations("work");
  const count = `${String(index + 1).padStart(2, "0")} / ${String(caseOrder.length).padStart(2, "0")}`;
  const metaLabel = "mb-1.5 block font-label text-xs font-bold tracking-[0.12em] text-accent-text uppercase";

  return (
    <article>
      {/* sticky bar */}
      {/* starts below the header (which sits over the top of the page), then sticks to the top */}
      <div className="sticky top-0 z-[5] mt-16 flex items-center justify-between bg-surface/90 px-[var(--gutter)] py-4 backdrop-blur-md md:mt-[4.5rem]">
        <Link href="/proyectos" className="rounded-full bg-charcoal px-4 py-2.5 font-label text-sm font-bold text-white transition-colors hover:bg-hot">
          ← {t("back")}
        </Link>
        <span className="font-[family-name:var(--font-bodoni)] text-[15px] opacity-70">{count}</span>
      </div>

      <header data-hero className="mx-auto max-w-[90rem] px-[var(--gutter)] pt-[clamp(30px,6vw,80px)] pb-[clamp(30px,5vw,60px)]">
        <span data-reveal="fade" className="block font-label text-xs font-bold tracking-[0.14em] text-accent-text uppercase">
          {tr(data.field, locale)}
        </span>
        <h1 data-reveal="lines" className="mt-3.5 mb-[clamp(24px,4vw,44px)] font-display text-[clamp(56px,12vw,180px)] leading-[0.88] text-hot uppercase">
          {item.client}
        </h1>
        <dl data-reveal="fade" className="grid gap-5 border-t-[1.5px] border-burgundy-deep/20 pt-4.5 sm:grid-cols-3">
          <div>
            <dt className={metaLabel}>{tr(caseStudy.labels.client, locale)}</dt>
            <dd className="font-medium">{data.client}</dd>
          </div>
          <div>
            <dt className={metaLabel}>{tr(caseStudy.labels.field, locale)}</dt>
            <dd className="font-medium">{tr(data.field, locale)}</dd>
          </div>
          <div>
            <dt className={metaLabel}>{tr(caseStudy.labels.did, locale)}</dt>
            <dd className="font-medium">{data.services.map((x) => tr(x, locale)).join(" · ")}</dd>
          </div>
        </dl>
        <p data-reveal="fade" className="mt-[clamp(30px,5vw,56px)] max-w-[34ch] text-[clamp(20px,2.2vw,30px)] leading-[1.3] font-medium text-pretty">
          {tr(data.intro, locale)}
        </p>
      </header>

      {/* photos, numbered order, artifact's full / half pattern */}
      {photos.length ? (
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-[clamp(10px,1.4vw,18px)] px-[var(--gutter)] pb-[clamp(40px,6vw,80px)] sm:grid-cols-2">
          {photos.map((p, i) => (
            <figure key={p.src} data-reveal="fade" className={cn("m-0 overflow-hidden rounded-[18px] bg-beige", data.wide[i] !== false && "sm:col-span-2")}>
              <Image
                src={p.src}
                alt={`${item.client}: ${locale === "en" ? "project piece" : "pieza del proyecto"} ${i + 1}`}
                width={p.width}
                height={p.height}
                sizes={data.wide[i] !== false ? "(min-width: 1440px) 1400px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                className="block h-auto w-full"
              />
            </figure>
          ))}
        </div>
      ) : launch.placeholders ? (
        <p className="mx-auto max-w-[90rem] px-[var(--gutter)] pb-16 text-fg-soft">{tr(caseStudy.mediaPending, locale)}</p>
      ) : null}

      {/* next project band */}
      <Link
        href={{ pathname: "/proyectos/[slug]", params: { slug: next.slug } }}
        className="group flex flex-col gap-1.5 rounded-t-[clamp(30px,6vw,80px)] bg-hot py-[clamp(40px,7vw,90px)] text-center text-ivory"
      >
        <span className="font-label text-[13px] tracking-[0.14em] uppercase opacity-85">{t("next")}</span>
        <strong className="font-display text-[clamp(40px,8vw,110px)] leading-[0.95] font-normal uppercase transition-transform duration-300 group-hover:translate-x-2.5">
          {next.client} →
        </strong>
      </Link>
    </article>
  );
}
