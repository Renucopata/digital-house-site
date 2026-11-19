"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { contact } from "@/content/contact";
import { useModal } from "@/lib/useModal";
import { useContact } from "./ContactProvider";

/*
 * Contact overlay (two26 effect 16), opened by every "Hablemos" CTA. Copy from the artifact.
 * Structure and behavior: focus trap, Esc, backdrop click, inert page, focus returns to the CTA.
 * The stroke-flood entrance and the staggered content come in P4.
 */
export function ContactOverlay() {
  const { isOpen, close } = useContact();
  const t = useTranslations("contact");
  const tA11y = useTranslations("a11y");
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  useModal(panel, isOpen, close, closeBtn);

  if (!isOpen) return null;

  const lines = t.raw("headingLines") as string[];
  const channel = "inline-flex items-center gap-3 text-2xl underline-offset-4 hover:underline md:text-3xl";
  const label = "font-label text-label tracking-[0.2em] text-fg-soft uppercase";

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      className="theme-dark fixed inset-0 z-[1500] overflow-y-auto bg-surface text-fg"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="mx-auto flex min-h-full max-w-[90rem] flex-col px-[var(--gutter)] py-5" onClick={(e) => e.target === e.currentTarget && close()}>
        <div className="flex justify-end">
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            className="rounded-full bg-ivory px-4 py-2 font-label text-sm font-bold text-burgundy-deep"
          >
            {t("close")} ✕
          </button>
        </div>

        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 id="contact-title" className="font-display text-[clamp(3rem,8.5vw,8rem)] leading-[0.92] uppercase">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] text-fg-soft uppercase">{t("subline")}</p>
          </div>

          <ul className="flex flex-col gap-7">
            <li>
              <p className={label}>{t("whatsappLabel")}</p>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className={channel}>
                <WhatsAppIcon className="size-6" />
                {contact.phoneDisplay}
                <span className="sr-only"> {tA11y("opensNewTab")}</span>
              </a>
            </li>
            <li>
              <p className={label}>{t("emailLabel")}</p>
              <a href={contact.mailto} className={channel}>
                {contact.email}
              </a>
            </li>
            <li>
              <p className={label}>{t("instagramLabel")}</p>
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={channel}>
                <InstagramIcon className="size-6" />
                {contact.instagramLabel}
                <span className="sr-only"> {tA11y("opensNewTab")}</span>
              </a>
            </li>
            <li className="text-sm text-fg-soft">{t("illustrationPending")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
