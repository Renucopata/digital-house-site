import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { queHacemos } from "@/content/home";
import { reveal } from "@/lib/reveal";

/**
 * #que-hacemos — web brief "Qué hacemos" (D41): three big phrases, no paragraph, beige band, with
 * the dH camera photo beside them. One phrase at a time stands out (full color, slides right, a
 * bar grows on its left); the others fade back. At rest it is the first one; on devices with a
 * pointer, the one under the mouse (globals.css "Stand-out rows").
 * The reveal sits on the <li>, the stand-out styles on the inner <p>, so they never fight.
 */
export function QueHacemos() {
  return (
    <Section id="que-hacemos" theme="sand" grain aria-labelledby="que-hacemos-title">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <Eyebrow as="h2" id="que-hacemos-title">
            {queHacemos.eyebrow}
          </Eyebrow>
          <ol className="stand-group border-b-[1.5px] border-line">
            {queHacemos.rows.map((row, index) => (
              <li key={row.label} {...reveal(index)} className="border-t-[1.5px] border-line">
                <p data-default={index === 0 ? "" : undefined} className="stand-row flex flex-col gap-3 py-7">
                  <span className="font-label text-[0.75rem] font-bold tracking-[0.18em] text-accent uppercase">
                    {row.label}
                  </span>
                  <span className="font-display text-[clamp(1.875rem,1.2rem+2.9vw,3.75rem)] leading-[1.06] font-extrabold tracking-[-0.025em] text-balance text-fg">
                    {row.text}
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </div>

        <figure {...reveal(1)} className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-none">
          {/* offset hairline frame, same treatment as the hero image */}
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-card border border-line" />
          <Image
            src={queHacemos.image.src}
            width={queHacemos.image.width}
            height={queHacemos.image.height}
            alt={queHacemos.image.alt}
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 26rem, 22rem"
            className="relative h-auto w-full rounded-card"
          />
        </figure>
      </Container>
    </Section>
  );
}
