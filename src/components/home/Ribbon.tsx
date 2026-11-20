import { useLocale } from "next-intl";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { ribbon, tr } from "@/content/home";

/*
 * Tilted ribbon under the hero (artifact text). The band draws in from the right when it comes
 * into view (two26 effect 3) and its text drifts, speeding up and flipping with the scroll.
 */
export function Ribbon() {
  const locale = useLocale();
  const text = ribbon.map((item) => `${tr(item, locale)} • `).join("");
  return (
    // the wrapper clips the tilted band so it never widens the page
    <div aria-hidden="true" className="relative z-[1] overflow-hidden py-6">
      <div data-reveal="ribbon" className="-mx-4 -rotate-2 bg-hot py-3 text-salt">
        <VelocityMarquee speed={60}>
          <span className="pr-[0.5em] font-display text-[clamp(28px,4.4vw,58px)] leading-none whitespace-nowrap uppercase">{text}</span>
        </VelocityMarquee>
      </div>
    </div>
  );
}
