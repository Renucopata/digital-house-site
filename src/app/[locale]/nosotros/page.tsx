import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export async function generateMetadata({ params }: PageProps<"/[locale]/nosotros">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("aboutTitle") };
}

/** /nosotros · /en/about (P1 placeholder; the page arrives in P5). */
export default function AboutPage({ params }: PageProps<"/[locale]/nosotros">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations();
  return <PagePlaceholder title={t("meta.aboutTitle")} note={t("placeholder.about")} />;
}
