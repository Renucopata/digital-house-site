import Image from "next/image";
import { useLocale } from "next-intl";
import { clientRows, clientsLabel, tr } from "@/content/home";
import { cn } from "@/lib/cn";

/*
 * Client logos (artifact): two rows moving in opposite directions. The processed logos in
 * /public/clients are ivory lettering, so the band is dark. VIDA has no file → set as text.
 * The list is shown once for screen readers; the moving copies are hidden from them.
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
          <div key={r} className={cn("dh-marquee flex w-max items-center", r === 1 && "dh-marquee-reverse")}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-16 pr-16">
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
                      className="h-9 w-auto md:h-11"
                    />
                  ) : (
                    <span key={c.name} className="font-[family-name:var(--font-montserrat)] text-2xl font-black whitespace-nowrap md:text-3xl">
                      {c.name}
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
