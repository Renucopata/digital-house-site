"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { contact } from "@/content/contact";
import { team, tr } from "@/content/home";

/*
 * Team (artifact "Las personas detrás"): one card at a time with ← 1 / 5 →, each with a quote,
 * name, role, bio, three specialties and a WhatsApp link to talk to that person.
 * Avatars use initials until approved portraits exist (the artifact draws line-art stickers in JS;
 * to port later). P4 adds the deck shuffle.
 */
const wa = (text: string) => `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

export function Team() {
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const total = team.members.length;
  const m = team.members[index];
  const go = (d: number) => setIndex((i) => (i + d + total) % total);
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <section id="equipo" className="mx-auto max-w-[90rem] px-[var(--gutter)] py-[var(--section-space)]">
      <SectionLabel>{tr(team.label, locale)}</SectionLabel>
      <h2 className="mt-3 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] text-hot uppercase">{tr(team.title, locale)}</h2>
      <p className="mt-4 max-w-xl text-lg text-burgundy-deep">{tr(team.intro, locale)}</p>

      <article aria-roledescription="slide" aria-label={counter} className="theme-dark mt-10 grid gap-8 rounded-[var(--radius-card)] bg-surface p-6 text-fg md:grid-cols-[auto_1fr] md:p-10">
        <div className="flex flex-col items-center gap-3">
          <span aria-hidden="true" className="grid aspect-square w-[min(180px,40vw)] place-items-center rounded-full bg-ivory font-display text-6xl text-burgundy-deep">
            {initials(m.name)}
          </span>
          {m.badge ? <span className="rounded-full bg-hot px-3 py-1 font-label text-xs font-bold uppercase">{tr(m.badge, locale)}</span> : null}
          <span className="font-label text-sm text-fg-soft">{counter}</span>
        </div>
        <div>
          <p className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.05] uppercase">“{tr(m.quote, locale)}”</p>
          <h3 className="mt-6 text-2xl font-bold">{m.name}</h3>
          <p className="text-fg-soft">{tr(m.role, locale)}</p>
          <p className="mt-4 max-w-2xl">{tr(m.bio, locale)}</p>
          <p className="mt-6 font-label text-label tracking-[0.2em] text-fg-soft uppercase">{tr(team.skillsLabel, locale)}</p>
          <ol className="mt-2 flex flex-wrap gap-2">
            {m.skills.map((s, i) => (
              <li key={s.es} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                {String(i + 1).padStart(2, "0")} {tr(s, locale)}
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href={wa(`${tr(team.talkMessage, locale)} ${m.name}`)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-ivory px-5 py-2 font-label font-bold text-burgundy-deep">
              {tr(team.talkTo, locale)} {m.firstName} →
            </a>
            {m.portfolio ? (
              <a href={m.portfolio} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-5 py-2 font-label font-bold">
                {tr(team.portfolio, locale)}
              </a>
            ) : null}
          </div>
        </div>
      </article>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(-1)} aria-label={tr(team.prev, locale)} className="grid size-11 place-items-center rounded-full border-2 border-burgundy-deep text-burgundy-deep">
          ←
        </button>
        <span aria-live="polite" className="font-label text-sm text-burgundy-deep">
          {index + 1} / {total}
        </span>
        <button type="button" onClick={() => go(1)} aria-label={tr(team.next, locale)} className="grid size-11 place-items-center rounded-full border-2 border-burgundy-deep text-burgundy-deep">
          →
        </button>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-xl text-xl text-burgundy-deep">{tr(team.closing, locale)}</p>
        <a href={wa(tr(team.ctaMessage, locale))} target="_blank" rel="noopener noreferrer" className="rounded-full bg-hot px-6 py-3 font-label font-bold text-ivory">
          {tr(team.cta, locale)}
        </a>
      </div>
    </section>
  );
}
