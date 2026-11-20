import Image from "next/image";
import { useLocale } from "next-intl";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { tr } from "@/content/home";
import { aboutPage } from "@/content/pages";

/*
 * Behind-the-scenes moodboard (two26 effect 22): two photo strips moving in opposite directions,
 * reacting to scroll speed and direction. Hidden until the photos exist
 * (aboutPage.behindPhotos; originals go in brand-assets/new-design/behind/).
 */
export function Moodboard() {
  const locale = useLocale();
  const photos = aboutPage.behindPhotos;
  if (!photos.length) return null;
  const half = Math.ceil(photos.length / 2);
  const rows = [photos.slice(0, half), photos.slice(half)];
  return (
    <section className="overflow-hidden py-[var(--section-space)]">
      <div className="flex flex-col gap-4">
        {rows.map((row, r) => (
          <VelocityMarquee key={r} reverse={r === 1} speed={40}>
            {row.map((p) => (
              <Image
                key={p.src}
                src={p.src}
                alt={tr(p.alt, locale)}
                width={p.width}
                height={p.height}
                sizes="(min-width: 768px) 25vw, 60vw"
                className="mr-4 h-[clamp(12rem,22vw,20rem)] w-auto rounded-2xl object-cover"
              />
            ))}
          </VelocityMarquee>
        ))}
      </div>
    </section>
  );
}
