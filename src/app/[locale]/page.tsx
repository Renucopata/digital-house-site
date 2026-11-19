import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { site } from "@/content/site";

/** Home (P1 placeholder; the two26-style sections arrive in P3). */
export default function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("placeholder");
  return <PagePlaceholder title={site.tagline} note={t("home")} />;
}
