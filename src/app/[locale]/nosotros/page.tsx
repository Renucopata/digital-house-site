import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { launch } from "@/content/launch";

export async function generateMetadata({ params }: PageProps<"/[locale]/nosotros">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  // unfinished page: kept out of search engines until it launches (src/content/launch.ts)
  return { title: t("aboutTitle"), robots: launch.aboutPage ? undefined : { index: false, follow: false } };
}

/** /nosotros · /en/about (P1 placeholder; the page arrives in P5). */
export default function AboutPage({ params }: PageProps<"/[locale]/nosotros">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations();
  return <PagePlaceholder title={t("meta.aboutTitle")} note={t("placeholder.about")} />;
}
