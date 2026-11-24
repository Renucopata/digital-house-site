import Image from "next/image";
import { useLocale } from "next-intl";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { clientRows, clientsLabel, tr } from "@/content/home";

/*
 * Client logos (artifact): two rows moving in opposite directions; their speed and direction
 * react to scrolling (two26 effect 22). The logos in /public/client-logos are complete and in their
 * original colors with no background, so the band is light (salt). Each logo has its own display
 * height (`h`) for an even visual weight. VIDA has no file → set as text.
 * The list is shown once for screen readers; the moving strips are hidden from them.
 */
export function Clients() {
  const locale = useLocale();
  return (
    <section aria-label={tr(clientsLabel, locale)} className="overflow-hidden border-y border-burgundy-deep/15 bg-salt py-12 text-burgundy-deep md:py-16">
      <ul className="sr-only">
        {clientRows.flat().map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="flex flex-col gap-10 md:gap-14">
        {clientRows.map((row, r) => (
          <VelocityMarquee key={r} reverse={r === 1} speed={45}>
            {row.map((c) =>
              c.logo ? (
                <Image
                  key={c.name}
                  src={c.logo.src}
                  alt=""
                  width={c.logo.width}
                  height={c.logo.height}
                  // each logo at its own height (75 % on phones); sizes = its widest display width
                  sizes={`${Math.round((c.logo.width / c.logo.height) * c.logo.h)}px`}
                  style={{ "--logo-h": `${c.logo.h}px` } as React.CSSProperties}
                  className="mr-14 h-[calc(var(--logo-h)*0.75)] w-auto self-center md:mr-20 md:h-[var(--logo-h)]"
                />
              ) : (
                <span key={c.name} className="mr-14 self-center md:mr-20 font-[family-name:var(--font-montserrat)] text-2xl font-black whitespace-nowrap md:text-3xl">
                  {c.name}
                </span>
              ),
            )}
          </VelocityMarquee>
        ))}
      </div>
    </section>
  );
}
