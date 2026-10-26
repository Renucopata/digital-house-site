"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { TeamMember } from "@/content/home";

const toneClass = {
  yellow: "bg-yellow",
  sky: "bg-sky",
  beige: "bg-beige",
} as const;

type TeamCardProps = {
  member: TeamMember;
  /** Button label prefix, e.g. "Ver especialidad de" + name. */
  flipLabel: string;
  askLabel: string;
};

/**
 * Team flip card (web brief, Equipo). Front: ivory, big initials (or an approved photo), name, role
 * and phrase. Back: guinda principal, specialty and the "Pídele" list.
 * Flips on hover (devices with a pointer), on tap and with Enter/Space (the transparent button on
 * top toggles it). 3D turn of 0.6 s in globals.css ("Team flip cards"); reduced motion → instant swap.
 * Both faces stay in the DOM, so screen readers read the whole card.
 */
export function TeamCard({ member, flipLabel, askLabel }: TeamCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flip-card relative h-full w-full"
      data-flipped={flipped ? "" : undefined}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="flip-inner grid h-full">
        <div className="flip-face theme-light flex flex-col gap-5 rounded-card border-[1.5px] border-ivory bg-surface p-3 text-fg">
          <div
            className={cn(
              "relative grid aspect-[2/1] place-items-center sm:aspect-[4/3] overflow-hidden rounded-[calc(var(--radius-card)-0.5rem)]",
              toneClass[member.tone],
            )}
          >
            {member.photo ? (
              <Image src={member.photo} alt="" fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
            ) : (
              <span
                aria-hidden="true"
                className="font-display text-[clamp(3.5rem,2.5rem+3vw,5.5rem)] leading-none font-extrabold tracking-[-0.05em] text-burgundy-deep"
              >
                {member.initials}
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2 px-3 pb-4">
            <h3 className="font-display text-[1.375rem] leading-tight font-bold tracking-[-0.02em] text-accent">{member.name}</h3>
            <p className="font-label text-[0.6875rem] leading-snug font-bold tracking-[0.14em] text-fg-soft uppercase">
              {member.role}
            </p>
            <p className="mt-auto pt-2 font-display text-[1.0625rem] leading-snug font-semibold text-fg">{member.phrase}</p>
          </div>
        </div>

        <div className="flip-face flip-back flex flex-col gap-3 rounded-card border-[1.5px] border-ivory bg-burgundy p-7 text-ivory">
          <p aria-hidden="true" className="font-display text-[1.5rem] leading-tight font-extrabold tracking-[-0.02em] text-yellow">
            {member.name}
          </p>
          <p className="text-[1.0625rem] leading-snug">{member.specialty}</p>
          <p className="mt-3 font-label text-[0.6875rem] font-bold tracking-[0.18em] text-sky uppercase">{askLabel}</p>
          <ul className="flex flex-col gap-1.5 text-[0.9375rem] leading-snug">
            {member.ask.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden="true" className="text-yellow">
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        aria-pressed={flipped}
        aria-label={`${flipLabel} ${member.name}`}
        onClick={() => setFlipped((value) => !value)}
        className="absolute inset-0 z-10 cursor-pointer rounded-card"
      />
    </div>
  );
}
