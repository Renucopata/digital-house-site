"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { contact } from "@/content/contact";
import { useModal } from "@/lib/useModal";
import { useContact } from "./ContactProvider";

/*
 * Contact overlay (two26 effect 16), opened by every "Hablemos" CTA.
 * P1: structure and behavior only (focus trap, Esc, inert page, focus returns to the CTA).
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
            ✕ {t("close")}
          </button>
        </div>

        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-2">
          <div>
            <h2 id="contact-title" className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] uppercase">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] text-fg-soft">{t("subline")}</p>
          </div>

          <div className="flex flex-col gap-8">
            <p className="max-w-md text-lead">{t("intro")}</p>
            <dl className="flex flex-col gap-6">
              <div>
                <dt className="font-label text-label tracking-[0.2em] uppercase">{t("whatsappLabel")}</dt>
                <dd>
                  <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-2xl underline-offset-4 hover:underline">
                    <WhatsAppIcon className="size-6" />
                    {contact.phoneDisplay}
                    <span className="sr-only"> {tA11y("opensNewTab")}</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-label text-label tracking-[0.2em] uppercase">{t("emailLabel")}</dt>
                <dd>
                  <a href={contact.mailto} className="text-2xl underline-offset-4 hover:underline">
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="text-sm text-fg-soft">{t("illustrationPending")}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-label text-sm"
          >
            <InstagramIcon className="size-4" />
            {t("instagramLabel")} {contact.instagramLabel}
            <span className="sr-only"> {tA11y("opensNewTab")}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
