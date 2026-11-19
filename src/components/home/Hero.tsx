import { useLocale } from "next-intl";
import { Pill } from "@/components/ui/Pill";
import { hero, tr } from "@/content/home";
import { walkersSvg } from "./walkers.svg";

/*
 * Hero (artifact): centered giant headline "Crecer / se ve / muy bien" with three rotated black
 * pills around it, the statement, and the walkers illustration (DIGITAL / HOUSE signs).
 * The entrance (lines rise, pills drop in) arrives with the motion layer in P4, after the loader.
 */
const pillSpots = [
  { className: "top-[20%] left-[52%]", rotate: -6 },
  { className: "top-[47%] left-[-4%]", rotate: -8 },
  { className: "right-[-3%] bottom-[2%]", rotate: 5 },
];

export function Hero() {
  const locale = useLocale();
  return (
    <section id="inicio" className="overflow-hidden px-[var(--gutter)] pt-[clamp(110px,16vh,150px)] pb-5 text-center">
      <div className="relative mt-2.5 inline-block">
        {hero.pills.map((pill, i) => (
          <Pill key={pill.es} rotate={pillSpots[i].rotate} className={`absolute z-[2] text-[clamp(11px,1.3vw,15px)] ${pillSpots[i].className}`}>
            {tr(pill, locale)}
          </Pill>
        ))}
        <h1 className="font-display text-[clamp(72px,17vw,210px)] leading-[0.88] text-hot uppercase">
          {hero.titleLines.map((line) => (
            <span key={line.es} className="block">
              {tr(line, locale)}
            </span>
          ))}
        </h1>
      </div>
      <p className="mx-auto mt-6 max-w-[34ch] text-lg leading-snug text-burgundy-deep md:text-xl">
        {tr(hero.statement.before, locale)}
        <strong className="text-hot">{tr(hero.statement.strong, locale)}</strong>
        {tr(hero.statement.after, locale)}
      </p>
      <div
        role="img"
        aria-label={tr(hero.illustrationAlt, locale)}
        className="mx-auto mt-2.5 w-[min(820px,100%)] [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: walkersSvg }}
      />
    </section>
  );
}
