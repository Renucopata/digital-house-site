import { useTranslations } from "next-intl";
import { DhLogo } from "@/components/brand/DhLogo";
import { Lockup } from "@/components/brand/Lockup";
import { CtaButton } from "@/components/ui/CtaButton";
import { aboutHref, workHref } from "@/content/launch";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";
import { NavPill } from "./NavPill";

/*
 * Header (user, 2026-11-19): logo at the top left, sections and CTA on the right, no office hours.
 * Not fixed: it sits over the top of the page and scrolls away with it.
 * Below md: logo left, menu toggle right (full-screen menu).
 * Logo = dH mark + "digital HOUSE" lettering; hovering the mark replays its write-on (N8).
 */
export function Header() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");

  return (
    <header className="absolute inset-x-0 top-0 z-[900]">
      <div id="site-header-bar" className="flex items-center justify-between gap-4 px-[var(--gutter)] py-3 md:py-4">
        {/* named by its visible text ("digital HOUSE") + a hidden ", inicio", so the name always matches what is seen */}
        <Link href="/" className="flex items-center gap-2 rounded-full text-burgundy-deep">
          <DhLogo mode="replay" penWidth={30} className="h-7 w-auto md:h-8" />
          <Lockup className="text-[1.05rem] md:text-[1.2rem]" />
          <span className="sr-only">, {tA11y("homeSuffix")}</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label={tA11y("mainNav")} className="hidden items-center gap-2 md:flex">
            <NavPill href={workHref}>{t("work")}</NavPill>
            <NavPill href={aboutHref}>{t("about")}</NavPill>
            <NavPill href={{ pathname: "/", hash: "servicios" }}>{t("services")}</NavPill>
          </nav>
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
