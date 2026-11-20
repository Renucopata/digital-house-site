"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { launch } from "@/content/launch";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/** Link to the same page in the other language (localized pathnames, CLAUDE.md N2). */
export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const params = useParams();
  const other = locale === "es" ? "en" : "es";
  // hidden until the English translations are approved (src/content/launch.ts)
  if (!launch.english) return null;

  return (
    <Link
      // pathname is the internal template (e.g. /proyectos/[slug]); the params fill it in
      href={{ pathname, params } as never}
      locale={other}
      lang={other}
      hrefLang={other}
      aria-label={t("switchTo")}
      className={cn("rounded-full px-2 py-1 font-label text-sm font-bold text-charcoal underline-offset-4 hover:underline", className)}
    >
      {t("switchToShort")}
    </Link>
  );
}
