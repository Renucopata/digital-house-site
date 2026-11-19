import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { CtaButton } from "@/components/ui/CtaButton";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";
import { NavPill } from "./NavPill";

/*
 * Fixed header, two26 layout: nav pills left, logo centered, CTA right (no office hours, N6).
 * Below md: logo left, menu toggle right (full-screen menu).
 * P1 logo = the brand monogram image; P2 swaps in the animated dH SVG.
 */
export function Header() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");

  return (
    <header>
      <div
        id="site-header-bar"
        className="pointer-events-none fixed inset-x-0 top-0 z-[900] grid grid-cols-[1fr_auto_1fr] items-center px-[var(--gutter)] py-3 md:py-4"
      >
        <nav aria-label={tA11y("mainNav")} className="pointer-events-auto hidden items-center gap-2 md:flex">
          <NavPill href="/proyectos">{t("work")}</NavPill>
          <NavPill href="/nosotros">{t("about")}</NavPill>
        </nav>

        <Link
          href="/"
          aria-label={tA11y("homeLabel")}
          className="pointer-events-auto col-start-1 justify-self-start rounded-full md:col-start-2 md:justify-self-center"
        >
          <Logo variant="monogram" width={44} preload className="rounded-md" />
        </Link>

        <div className="pointer-events-auto col-start-3 flex items-center justify-end gap-2">
          <LanguageSwitch className="hidden md:inline-flex" />
          {/* below md the CTA lives in the mobile menu */}
          <span className="hidden md:inline-flex">
            <CtaButton size="sm">{t("cta")}</CtaButton>
          </span>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
