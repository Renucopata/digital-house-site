import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export async function generateMetadata({ params }: PageProps<"/[locale]/proyectos">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("workTitle") };
}

/** /proyectos · /en/work (P1 placeholder; the page arrives in P5). */
export default function WorkPage({ params }: PageProps<"/[locale]/proyectos">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations();
  return <PagePlaceholder title={t("meta.workTitle")} note={t("placeholder.work")} />;
}
