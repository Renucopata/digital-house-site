import Image from "next/image";
import { useLocale } from "next-intl";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { clientRows, clientsLabel, tr } from "@/content/home";

/*
 * Client logos (artifact): two rows moving in opposite directions; their speed and direction
 * react to scrolling (two26 effect 22). The processed logos in /public/clients are ivory
 * lettering, so the band is dark. VIDA has no file → set as text.
 * The list is shown once for screen readers; the moving strips are hidden from them.
 */
export function Clients() {
  const locale = useLocale();
  return (
    <section aria-label={tr(clientsLabel, locale)} className="theme-dark overflow-hidden bg-surface py-10 text-fg">
      <ul className="sr-only">
        {clientRows.flat().map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="flex flex-col gap-8">
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
                  // shown 44px high → at most ~480px wide on 2x screens
                  sizes={`${Math.round((c.logo.width / c.logo.height) * 44)}px`}
                  className="mr-16 h-9 w-auto md:h-11"
                />
              ) : (
                <span key={c.name} className="mr-16 font-[family-name:var(--font-montserrat)] text-2xl font-black whitespace-nowrap md:text-3xl">
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
