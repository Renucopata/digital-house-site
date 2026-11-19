import { useTranslations } from "next-intl";
import { CtaButton } from "@/components/ui/CtaButton";
import { Logo } from "@/components/ui/Logo";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";

/*
 * Closing CTA + footer (two26 effect 12): big humorous closing line, CTA, email, menu, socials,
 * looping-stroke texture and the big logo at the bottom.
 * P1: static. P4 adds the line reveals, kinetic letters and the stretching logo.
 * The footer is burgundy-deep for now so the cream wordmark (baked background) matches it.
 */
export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const lines = t.raw("closingLines") as string[];
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="theme-dark relative overflow-hidden bg-surface text-fg">
      <FooterTexture />
      <div className="relative mx-auto max-w-[90rem] px-[var(--gutter)] pt-16 pb-8 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-6">
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.92] uppercase">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <CtaButton tone="light">{t("cta")}</CtaButton>
            <div>
              <p className="font-label text-label tracking-[0.2em] text-fg-soft uppercase">{t("emailLabel")}</p>
              <a href={contact.mailto} className="text-lg underline-offset-4 hover:underline">
                {contact.email}
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-menu">
            <p id="footer-menu" className="font-label text-label tracking-[0.2em] text-fg-soft uppercase">
              {t("menuTitle")}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-lg">
              <li>
                <Link href="/proyectos" className="underline-offset-4 hover:underline">
                  {tNav("work")}
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="underline-offset-4 hover:underline">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <LanguageSwitch className="px-0 text-lg font-normal text-fg" />
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-label text-label tracking-[0.2em] text-fg-soft uppercase">{t("socialTitle")}</p>
            <ul className="mt-3 flex flex-col gap-2 text-lg">
              <li>
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  Instagram ↗<span className="sr-only"> {tA11y("opensNewTab")}</span>
                </a>
              </li>
              <li>
                <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  WhatsApp ↗<span className="sr-only"> {tA11y("opensNewTab")}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-16 text-xs text-fg-soft">
          © {year} {site.name}. {t("rights")}
        </p>
        <div className="mt-4">
          <Logo variant="wordmark-cream" width={318} className="h-auto w-full max-w-[318px]" />
        </div>
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
