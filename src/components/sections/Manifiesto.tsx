import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HandUnderline, Sparkle } from "@/components/ui/HandDrawn";
import { manifiesto } from "@/content/home";
import { reveal } from "@/lib/reveal";

/** Soft fade on all four edges so the photo's kraft paper melts into the flat sand section. */
const edgeFade = {
  maskImage:
    "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
  maskComposite: "intersect",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
  WebkitMaskComposite: "source-in",
} as const;

/**
 * Manifesto band (no nav anchor) — the "Ctrl + N" post: headline as live text in the post's
 * typographic pattern, keycaps photo fading into the kraft section (paper color = --sand).
 * No grain overlay here: the photo carries its own paper texture.
 */
export function Manifiesto() {
  return (
    <Section theme="sand" aria-labelledby="manifiesto-title">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div {...reveal()} className="relative lg:col-span-6">
          <Sparkle className="absolute -top-12 right-4 size-12 sm:right-16 lg:-top-14 lg:right-0" strokeWidth={1.75} />
          <h2
            id="manifiesto-title"
            className="font-sans text-[clamp(2rem,1.5rem+1.8vw,2.5rem)] leading-[1.25] lg:leading-[1.15] font-normal tracking-[-0.015em] text-fg"
          >
            {manifiesto.strongLines.map((line) => (
              <span key={line}>
                <strong className="block font-semibold text-accent">{line}</strong>{" "}
              </span>
            ))}
            <span className="block">{manifiesto.regularBefore}</span>{" "}
            <span className="block leading-[1.5] lg:leading-[inherit] lg:whitespace-nowrap">
              <HandUnderline strokeWidth={2.25}>{manifiesto.underlined}</HandUnderline> {manifiesto.regularAfter}
            </span>
          </h2>
        </div>

        <figure {...reveal(1, 150)} className="lg:col-span-6">
          <Image
            src={manifiesto.image.src}
            width={manifiesto.image.width}
            height={manifiesto.image.height}
            alt={manifiesto.image.alt}
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="h-auto w-full"
            style={edgeFade}
          />
        </figure>
      </Container>
    </Section>
  );
}
