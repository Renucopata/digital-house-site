import type { ReactNode } from "react";
import { Pill } from "@/components/ui/Pill";
import { SectionLabel } from "@/components/ui/SectionLabel";

/*
 * Hero of the inner pages (two26 /work and /about, effect 2): label, giant headline with rotated
 * sticker pills, intro paragraph on the right, optional illustration. It uses the same [data-hero]
 * timeline as the home (lines rise, pills drop in, the rest fades up), started by <Reveals>.
 */
const spots = [
  { className: "top-[4%] right-[8%]", rotate: 6 },
  { className: "bottom-[10%] left-[-2%]", rotate: -7 },
  { className: "bottom-[-6%] right-[22%]", rotate: 4 },
];

type Props = { label: string; titleLines: string[]; pills: string[]; intro: ReactNode; illustration?: ReactNode };

export function PageHero({ label, titleLines, pills, intro, illustration }: Props) {
  return (
    <section data-hero className="mx-auto max-w-[90rem] px-[var(--gutter)] pt-[clamp(110px,16vh,150px)] pb-[var(--section-space)]">
      <div data-reveal="fade">
        <SectionLabel>{label}</SectionLabel>
      </div>
      <div className="relative mt-4 inline-block max-w-full">
        {pills.map((pill, i) => (
          <Pill key={pill} data-reveal="pop" rotate={spots[i % spots.length].rotate} className={`absolute z-[2] text-[clamp(11px,1.3vw,15px)] ${spots[i % spots.length].className}`}>
            {pill}
          </Pill>
        ))}
        <h1 data-reveal="lines" className="font-display text-[clamp(64px,13vw,190px)] leading-[0.88] text-hot uppercase">
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
      </div>
      <div className="mt-10 grid items-end gap-10 md:grid-cols-[1fr_minmax(0,28rem)]">
        <div data-reveal="fade">{illustration}</div>
        <div data-reveal="fade" className="text-lg leading-snug text-burgundy-deep md:text-xl">
          {intro}
        </div>
      </div>
    </section>
  );
}
