"use client";

import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Link } from "@/i18n/navigation";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useModal } from "@/lib/useModal";
import { LanguageSwitch } from "./LanguageSwitch";

/*
 * Full-screen mobile menu (two26 effect 15), below md only.
 * Open/close, focus trap, Esc, inert page. Opening: the panel fades in and the link pills pop from
 * small and tilted (two26: .75 s back.out(2.2), random tilt ±10°). Reduced motion: instant.
 */
export function MobileMenu() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useModal(panel, open, close);

  useGSAP(
    () => {
      if (!open || prefersReducedMotion()) return;
      gsap
        .timeline()
        .from(panel.current, { opacity: 0, duration: 0.4, ease: "power2.out" })
        .from("[data-menu-item]", { scale: 0.4, opacity: 0, rotation: () => gsap.utils.random(-10, 10), duration: 0.75, stagger: 0.07, ease: "back.out(2.2)" }, 0.1);
    },
    { scope: panel, dependencies: [open] },
  );

  const pill = "rounded-full bg-ivory px-6 py-3 font-display text-3xl uppercase text-charcoal";

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="grid size-11 place-items-center rounded-md border border-charcoal bg-ivory text-charcoal"
      >
        <span className="sr-only">{t("menuOpen")}</span>
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 8h14M5 16h14" />
        </svg>
      </button>

      {open ? (
        <div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={tA11y("mainNav")}
          data-lenis-prevent
          className="fixed inset-0 z-[1400] flex flex-col bg-beige px-[var(--gutter)] py-3"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={close}
              className="grid size-11 place-items-center rounded-md border border-charcoal bg-ivory text-charcoal"
            >
              <span className="sr-only">{t("menuClose")}</span>
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label={tA11y("mainNav")} className="mt-8 flex flex-col items-end gap-3">
            <Link href="/proyectos" onClick={close} className={pill} data-menu-item>
              {t("work")}
            </Link>
            <Link href="/nosotros" onClick={close} className={pill} data-menu-item>
              {t("about")}
            </Link>
            <Link href={{ pathname: "/", hash: "servicios" }} onClick={close} className={pill} data-menu-item>
              {t("services")}
            </Link>
            <span data-menu-item>
              <CtaButton onBeforeOpen={close}>{t("cta")}</CtaButton>
            </span>
            <span data-menu-item>
              <LanguageSwitch className="mt-4" />
            </span>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
