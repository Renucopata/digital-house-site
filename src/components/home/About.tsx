import { useLocale } from "next-intl";
import { Pill } from "@/components/ui/Pill";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { about, tr } from "@/content/home";

/*
 * "Un poco de nosotros" (artifact): big statement with highlighted phrases and four keyword pills.
 * P4 adds two26's pinned read-along: the letters light up while scrolling and the pills pop in.
 */
const keywordSpots = [
  { className: "top-[9%] left-[24%]", rotate: -6 },
  { className: "top-[36%] left-[-3%]", rotate: 5 },
  { className: "top-[60%] right-[-2%]", rotate: -4 },
  { className: "top-[97%] left-[56%]", rotate: 6 },
];

export function About() {
  const locale = useLocale();
  return (
    <section id="nosotros" className="px-[var(--gutter)] py-[var(--section-space)] text-center">
      <SectionLabel>{tr(about.label, locale)}</SectionLabel>
      <div className="relative mx-auto mt-6 max-w-5xl">
        <p className="font-display text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[1.02] text-burgundy-deep uppercase">
          {about.parts.map((part) =>
            part.em ? (
              <em key={part.text.es} className="text-hot not-italic">
                {tr(part.text, locale)}
              </em>
            ) : (
              <span key={part.text.es}>{tr(part.text, locale)}</span>
            ),
          )}
        </p>
        {about.keywords.map((kw, i) => (
          <Pill key={kw.es} rotate={keywordSpots[i].rotate} className={`absolute hidden sm:inline-block ${keywordSpots[i].className}`}>
            {tr(kw, locale)}
          </Pill>
        ))}
      </div>
      {/* on phones the pills sit under the text instead of over it */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:hidden">
        {about.keywords.map((kw, i) => (
          <Pill key={kw.es} rotate={keywordSpots[i].rotate}>
            {tr(kw, locale)}
          </Pill>
        ))}
      </div>
    </section>
  );
}
