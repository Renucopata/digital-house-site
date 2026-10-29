"use client";

import { useState, type ReactNode } from "react";
import type { WorkArea } from "@/content/home";
import { cn } from "@/lib/cn";

type AreasShelfProps = {
  areas: readonly WorkArea[];
  linkLabel: string;
};

const toneClass: Record<WorkArea["tone"], string> = {
  "burgundy-deep": "bg-burgundy-deep text-ivory",
  burgundy: "bg-burgundy text-ivory",
  beige: "bg-beige text-burgundy-deep",
  yellow: "bg-yellow text-burgundy-deep",
  sky: "bg-sky text-burgundy-deep",
};

// Line icons from the prototype (36×36 grid, drawn with currentColor).
const icons: Record<WorkArea["icon"], ReactNode> = {
  lens: (
    <>
      <circle cx="15" cy="15" r="9" />
      <path d="M22 22L32 32" />
    </>
  ),
  sparkle: <path d="M18 3L21.5 14.5L33 18L21.5 21.5L18 33L14.5 21.5L3 18L14.5 14.5Z" />,
  cursor: <path d="M8 5V29L14 23L19 33L23 31L18 22L26 22Z" />,
  bars: <path d="M5 32H33M9 32V19M17 32V9M25 32V23M32 32V5" />,
  burst: (
    <>
      <circle cx="18" cy="18" r="5" />
      <path d="M18 3V9M18 27V33M3 18H9M27 18H33M7.5 7.5L11.5 11.5M24.5 24.5L28.5 28.5M28.5 7.5L24.5 11.5M11.5 24.5L7.5 28.5" />
    </>
  ),
  box: <path d="M5 11L18 5L31 11V26L18 32L5 26ZM5 11L18 17L31 11M18 17V32" />,
};

/**
 * The six work areas as books on a shelf (web brief Servicios, D42): one panel open, the others
 * closed with their name on the spine. Hovering a panel (wide screens with a pointer) or
 * clicking/tapping it (any screen, also Enter/Space) opens it and the others make room
 * (globals.css "Work-area shelf"). Below lg the panels stack and open downwards.
 * Closed panels are `inert`, so their link is out of the tab order.
 */
export function AreasShelf({ areas, linkLabel }: AreasShelfProps) {
  const [open, setOpen] = useState(0);

  const hoverOpen = (index: number) => {
    if (window.matchMedia("(hover: hover) and (min-width: 64rem)").matches) setOpen(index);
  };

  return (
    <ul className="shelf">
      {areas.map((area, index) => {
        const isOpen = index === open;
        const id = `area-${index + 1}`;
        return (
          <li
            key={area.name}
            data-open={isOpen ? "" : undefined}
            onMouseEnter={() => hoverOpen(index)}
            className={cn("shelf-panel", toneClass[area.tone])}
          >
            <h3 className="shelf-head">
              <button
                type="button"
                id={`${id}-tab`}
                aria-expanded={isOpen}
                aria-controls={`${id}-body`}
                onClick={() => setOpen(index)}
                className="shelf-tab focus-visible:outline-current focus-visible:-outline-offset-8"
              >
                <svg
                  viewBox="0 0 36 36"
                  aria-hidden="true"
                  focusable="false"
                  className="shelf-icon"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[area.icon]}
                </svg>
                <span className="shelf-name font-display font-extrabold tracking-[-0.01em]">{area.name}</span>
                <span className="sr-only">: {area.area}</span>
              </button>
            </h3>

            <div className="shelf-body-wrap">
              <div
                id={`${id}-body`}
                role="region"
                aria-labelledby={`${id}-tab`}
                inert={!isOpen}
                className="shelf-body"
              >
                <span className="inline-block rounded-full border-[1.5px] border-current px-3.5 py-1.5 font-label text-[0.75rem] font-bold tracking-[0.16em] uppercase">
                  {area.area}
                </span>
                <p className="mt-4 mb-3.5 font-display text-[clamp(1.25rem,1rem+1vw,1.625rem)] leading-tight font-bold tracking-[-0.01em] text-balance">
                  {area.text}
                </p>
                <ul className="mb-5 list-disc pl-5 leading-[1.7]">
                  {area.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className="inline-block border-b-[2.5px] border-current pb-0.5 font-label font-extrabold focus-visible:outline-current"
                >
                  {linkLabel} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
