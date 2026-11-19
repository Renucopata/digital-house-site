import { useTranslations } from "next-intl";

/** First focusable element on the page: jumps over the header to <main id="contenido">. */
export function SkipLink() {
  const t = useTranslations("a11y");
  return (
    <a
      href="#contenido"
      className={[
        "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1100]",
        "focus:rounded-full focus:bg-burgundy focus:px-5 focus:py-3 focus:text-sm focus:text-ivory",
      ].join(" ")}
    >
      {t("skipLink")}
    </a>
  );
}
