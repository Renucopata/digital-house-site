import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Capabilities } from "@/components/about/Capabilities";
import { Moodboard } from "@/components/about/Moodboard";
import { RulesStack } from "@/components/about/RulesStack";
import { StoryTeam } from "@/components/about/StoryTeam";
import { Closing } from "@/components/home/Closing";
import { walkersSvg } from "@/components/home/walkers.svg";
import { PageHero } from "@/components/work/PageHero";
import { hero, tr } from "@/content/home";
import { launch } from "@/content/launch";
import { aboutPage } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/nosotros">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  // kept out of search engines until it launches (src/content/launch.ts)
  return pageMetadata({ href: "/nosotros", locale, title: t("aboutTitle"), description: tr(aboutPage.intro, locale), index: launch.aboutPage });
}

/**
 * /nosotros · /en/about (P5): hero + illustration → story → team (cards + dialog) → behind the
 * scenes (hidden until photos exist) → house rules → capabilities → closing CTA.
 */
export default async function AboutPage({ params }: PageProps<"/[locale]/nosotros">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageHero
        label={tr(aboutPage.label, locale)}
        titleLines={[tr(aboutPage.title, locale)]}
        pills={aboutPage.pills.map((p) => tr(p, locale))}
        intro={<p>{tr(aboutPage.intro, locale)}</p>}
        illustration={
          <div
            role="img"
            aria-label={tr(hero.illustrationAlt, locale)}
            className="w-[min(560px,100%)] [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
            dangerouslySetInnerHTML={{ __html: walkersSvg }}
          />
        }
      />
      <StoryTeam />
      <Moodboard />
      <RulesStack />
      <Capabilities />
      <Closing />
    </>
  );
}
