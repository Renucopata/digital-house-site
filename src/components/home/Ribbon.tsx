import { useLocale } from "next-intl";
import { ribbon, tr } from "@/content/home";

/*
 * Tilted ribbon marquee under the hero (artifact text). The text loops with a CSS animation;
 * P4 turns it into two26's curved ribbon that draws itself in on scroll. Reduced motion: static.
 */
export function Ribbon() {
  const locale = useLocale();
  const text = ribbon.map((item) => `${tr(item, locale)} • `).join("");
  return (
    // the wrapper clips the tilted band so it never widens the page
    <div aria-hidden="true" className="relative z-[1] overflow-hidden py-6">
      <div className="-mx-4 -rotate-2 overflow-hidden bg-hot py-3 text-ivory">
        <div className="dh-marquee flex w-max">
          {[0, 1].map((n) => (
            <span key={n} className="pr-[0.5em] font-display text-[clamp(28px,4.4vw,58px)] leading-none whitespace-nowrap uppercase">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
