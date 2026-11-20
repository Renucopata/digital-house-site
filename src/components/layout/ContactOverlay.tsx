"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { contact } from "@/content/contact";
import { launch } from "@/content/launch";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";
import { useModal } from "@/lib/useModal";
import { useContact } from "./ContactProvider";

/*
 * Contact overlay (two26 effect 16), opened by every "Hablemos" CTA. Copy from the artifact.
 * Open: a thick burgundy stroke draws across the screen and swells until it floods it (.9 s), then
 * the close pill pops, the headline letters pop with a small tilt, the subline and channels rise.
 * Close: content fades (.3 s), the stroke undraws (.45 s), then the overlay unmounts.
 * Focus trap, Esc, backdrop click, inert page, focus back to the CTA (useModal).
 * Reduced motion: appears and disappears at once.
 */
const FLOOD = 2200;

export function ContactOverlay() {
  const { isOpen, close } = useContact();
  const t = useTranslations("contact");
  const tA11y = useTranslations("a11y");
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const stroke = useRef<SVGPathElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  // stays mounted while the closing animation plays
  const [mounted, setMounted] = useState(false);
  if (isOpen && !mounted) setMounted(true);
  useModal(panel, isOpen, close, closeBtn);

  useGSAP(
    () => {
      if (!mounted) return;
      const reduce = prefersReducedMotion();
      if (isOpen) {
        if (reduce) {
          gsap.set(stroke.current, { drawSVG: "100%", strokeWidth: FLOOD });
          return;
        }
        const split = SplitText.create(heading.current!, { type: "words,chars" });
        gsap
          .timeline()
          .fromTo(stroke.current, { drawSVG: "0%", strokeWidth: 0 }, { drawSVG: "100%", strokeWidth: FLOOD, duration: 0.9, ease: "power2.inOut" })
          .from(closeBtn.current, { scale: 0.4, opacity: 0, duration: 0.6, ease: "back.out(2.5)" }, "-=0.35")
          .from(split.chars, { scale: 0.5, opacity: 0, rotation: () => gsap.utils.random(-6, 6), duration: 0.45, stagger: 0.015, ease: "back.out(2)" }, "<")
          .from("[data-overlay-rise]", { y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "back.out(1.5)" }, "-=0.3");
      } else {
        if (reduce) {
          setMounted(false);
          return;
        }
        gsap
          .timeline({ onComplete: () => setMounted(false) })
          .to(content.current, { opacity: 0, duration: 0.3, ease: "power2.in" })
          .to(stroke.current, { drawSVG: "0%", strokeWidth: 0, duration: 0.45, ease: "power2.in" });
      }
    },
    { scope: panel, dependencies: [isOpen, mounted] },
  );

  if (!mounted) return null;

  const lines = t.raw("headingLines") as string[];
  const channel = "inline-flex items-center gap-3 text-2xl underline-offset-4 hover:underline md:text-3xl";
  const label = "font-label text-label tracking-[0.2em] text-fg-soft uppercase";

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      data-lenis-prevent
      className="theme-dark fixed inset-0 z-[1500] overflow-y-auto text-fg"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      {/* the flood: one thick stroke that covers the screen */}
      <svg aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[1] size-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <path ref={stroke} d="M-200 980 C 300 150, 1100 1150, 1700 -120" stroke="var(--burgundy-deep)" strokeLinecap="round" strokeWidth={FLOOD} />
      </svg>
      <div ref={content} className="relative mx-auto flex min-h-full max-w-[90rem] flex-col px-[var(--gutter)] py-5" onClick={(e) => e.target === e.currentTarget && close()}>
        <div className="flex justify-end">
          <button ref={closeBtn} type="button" onClick={close} className="rounded-full bg-ivory px-4 py-2 font-label text-sm font-bold text-burgundy-deep">
            {t("close")} ✕
          </button>
        </div>

        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 ref={heading} id="contact-title" className="font-display text-[clamp(3rem,8.5vw,8rem)] leading-[0.92] uppercase">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p data-overlay-rise className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] text-fg-soft uppercase">
              {t("subline")}
            </p>
          </div>

          <ul className="flex flex-col gap-7">
            <li data-overlay-rise>
              <p className={label}>{t("whatsappLabel")}</p>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className={channel}>
                <WhatsAppIcon className="size-6" />
                {contact.phoneDisplay}
                <span className="sr-only"> {tA11y("opensNewTab")}</span>
              </a>
            </li>
            <li data-overlay-rise>
              <p className={label}>{t("emailLabel")}</p>
              <a href={contact.mailto} className={channel}>
                {contact.email}
              </a>
            </li>
            <li data-overlay-rise>
              <p className={label}>{t("instagramLabel")}</p>
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={channel}>
                <InstagramIcon className="size-6" />
                {contact.instagramLabel}
                <span className="sr-only"> {tA11y("opensNewTab")}</span>
              </a>
            </li>
            {launch.placeholders ? (
              <li data-overlay-rise className="text-sm text-fg-soft">
                {t("illustrationPending")}
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
