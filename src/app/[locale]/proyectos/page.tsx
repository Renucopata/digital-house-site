import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Closing } from "@/components/home/Closing";
import { PageHero } from "@/components/work/PageHero";
import { WorkList } from "@/components/work/WorkList";
import { WorkStack } from "@/components/work/WorkStack";
import { tr } from "@/content/home";
import { launch } from "@/content/launch";
import { workPage } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/proyectos">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const description = `${tr(workPage.title, locale)}. ${tr(workPage.intro.before, locale)}${tr(workPage.intro.strong, locale)}${tr(workPage.intro.after, locale)}`;
  // kept out of search engines until it launches (src/content/launch.ts)
  return pageMetadata({ href: "/proyectos", locale, title: t("workTitle"), description, index: launch.workPage });
}

/** /proyectos · /en/work (P5): hero → card stack → text list with preview → closing CTA. */
export default async function WorkPage({ params }: PageProps<"/[locale]/proyectos">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageHero
        label={tr(workPage.label, locale)}
        titleLines={[tr(workPage.title, locale)]}
        pills={workPage.pills.map((p) => tr(p, locale))}
        intro={
          <p>
            {tr(workPage.intro.before, locale)}
            <strong className="text-accent-text">{tr(workPage.intro.strong, locale)}</strong>
            {tr(workPage.intro.after, locale)}
          </p>
        }
      />
      <WorkStack />
      <section className="pt-[var(--section-space)]">
        <h2 data-reveal="lines" className="mx-auto mb-8 max-w-[90rem] px-[var(--gutter)] font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-burgundy-deep uppercase">
          {tr(workPage.listTitle, locale)}
        </h2>
        <WorkList />
      </section>
      <Closing />
    </>
  );
}
