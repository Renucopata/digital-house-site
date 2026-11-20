import { useTranslations } from "next-intl";
import { DhLogo } from "@/components/brand/DhLogo";
import { Lockup } from "@/components/brand/Lockup";
import { StretchLogo } from "@/components/motion/StretchLogo";
import { CtaButton } from "@/components/ui/CtaButton";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { aboutHref, workHref } from "@/content/launch";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";

/*
 * Footer (two26 effect 12) with the artifact's copy: big phrase, CTA, email, menu, socials,
 * looping-stroke texture and the full logo at the bottom.
 * Motion: phrase lines rise, link letters pop on hover (data-kinetic), the logo stretches with scroll.
 * Burgundy-deep until the color roles are defined (docs/NEW-DESIGN.md §4).
 */
export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const year = new Date().getFullYear();
  const link = "underline-offset-4 hover:underline";
  const label = "font-label text-label tracking-[0.2em] text-fg-soft uppercase";

  return (
    <footer id="site-footer" className="theme-dark relative overflow-hidden bg-surface text-fg">
      <FooterTexture />
      <div className="relative mx-auto max-w-[90rem] px-[var(--gutter)] pt-16 pb-8 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-6">
            <p data-reveal="lines" className="max-w-[14ch] font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] uppercase">{t("phrase")}</p>
            <CtaButton tone="light">{t("cta")}</CtaButton>
            <div>
              <p className={label}>{t("emailLabel")}</p>
              <a href={contact.mailto} className={`text-lg ${link}`}>
                <span data-kinetic>{contact.email}</span>
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-menu">
            <p id="footer-menu" className={label}>
              {t("menuTitle")}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-lg">
              <li>
                <Link href={workHref} className={link}>
                  <span data-kinetic>{tNav("work")}</span>
                </Link>
              </li>
              <li>
                <Link href={aboutHref} className={link}>
                  <span data-kinetic>{tNav("about")}</span>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: "/", hash: "servicios" }} className={link}>
                  <span data-kinetic>{tNav("services")}</span>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: "/", hash: "contacto" }} className={link}>
                  <span data-kinetic>{tNav("contact")}</span>
                </Link>
              </li>
              <li>
                <LanguageSwitch className="px-0 text-lg font-normal text-fg" />
              </li>
            </ul>
          </nav>

          <div>
            <p className={label}>{t("socialTitle")}</p>
            <ul className="mt-3 flex flex-col gap-2 text-lg">
              <li>
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  <span data-kinetic>Instagram</span> ↗<span className="sr-only"> {tA11y("opensNewTab")}</span>
                </a>
              </li>
              <li>
                <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  <span data-kinetic>WhatsApp</span> ↗<span className="sr-only"> {tA11y("opensNewTab")}</span>
                </a>
              </li>
              <li>
                <a href={contact.mailto} className={link}>
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* full logo (N8), stretching with the scroll (two26) */}
        <StretchLogo label={site.name} className="mt-16 flex items-center gap-[0.3em] text-ivory [--mark:clamp(56px,11vw,160px)]" style={{ fontSize: "calc(var(--mark) * 0.66)" }}>
          <DhLogo className="h-[var(--mark)] w-auto" />
          <Lockup />
        </StretchLogo>
        <p className="mt-6 text-xs text-fg-soft">
          {t("place")} © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}

/** Looping hand-drawn strokes across the footer, very low contrast (our own drawing). */
function FooterTexture() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full opacity-10" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
      <path
        d="M-60 180c160-90 260 120 140 170s-60-260 120-230 140 260 300 200 40-250 200-220 120 270 300 210 60-240 220-200 110 250 290 190M-40 620c180-120 300 110 170 180s-40-270 150-230 160 250 320 180 20-260 190-210 140 260 310 190 50-250 230-190"
        stroke="currentColor"
        strokeWidth="26"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
