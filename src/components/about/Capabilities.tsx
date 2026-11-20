import { useLocale } from "next-intl";
import { Pill } from "@/components/ui/Pill";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { tr } from "@/content/home";
import { aboutPage, capabilities } from "@/content/pages";

/*
 * Capabilities cloud (two26 "we've got range"): the 7 services + every team specialty as tilted
 * pills that pop in on scroll (data-reveal="pop"). Its exact animation on two26 was not visible,
 * so it uses the site's standard pop.
 */
const tilts = [-4, 3, -2, 5, -6, 2, -3, 4];

export function Capabilities() {
  const locale = useLocale();
  return (
    <section className="mx-auto max-w-[90rem] px-[var(--gutter)] py-[var(--section-space)]">
      <SectionLabel>{tr(aboutPage.capabilitiesLabel, locale)}</SectionLabel>
      <h2 data-reveal="lines" className="mt-3 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] text-burgundy-deep uppercase">
        {aboutPage.capabilitiesTitle.map((l) => (
          <span key={l.es} className="block">
            {tr(l, locale)}
          </span>
        ))}
      </h2>
      <ul className="mt-10 flex flex-wrap gap-3">
        {capabilities.map((c, i) => (
          <li key={c.es} data-reveal="pop">
            <Pill rotate={tilts[i % tilts.length]} className={`px-5 py-2.5 text-base md:text-lg ${i < 7 ? "bg-hot" : ""}`}>
              {tr(c, locale)}
            </Pill>
          </li>
        ))}
      </ul>
    </section>
  );
}
