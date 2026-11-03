import Image from "next/image";
import type { CSSProperties } from "react";
import type { ClientBrand } from "@/content/home";

type LogoMarqueeProps = {
  brands: readonly ClientBrand[];
  label: string;
};

const LOGO_H = 160; // intrinsic height of public/clients/*.png

function Brand({ brand, hidden }: { brand: ClientBrand; hidden?: boolean }) {
  const style = { "--logo-h": `${brand.size ?? 2.5}rem` } as CSSProperties;
  return (
    <li className="marquee-item" style={style}>
      {brand.logo ? (
        <Image
          src={brand.logo.src}
          width={brand.logo.width}
          height={LOGO_H}
          alt={hidden ? "" : brand.name}
          // off-screen logos slide in while clipped; lazy loading would show them blank (~250 KB total)
          loading="eager"
          className="marquee-logo"
        />
      ) : (
        <span className="font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-none font-extrabold tracking-[-0.02em] whitespace-nowrap">
          {brand.name}
        </span>
      )}
    </li>
  );
}

/**
 * One row: its brands rendered four times; the track slides −50 % (two copies), so the loop has
 * no seam and a half-length row still covers very wide screens. Only the first copy is read by
 * screen readers.
 */
function MarqueeRow({ brands, reverse }: { brands: readonly ClientBrand[]; reverse?: boolean }) {
  return (
    <div className={reverse ? "marquee marquee-reverse" : "marquee"}>
      <div className="marquee-track">
        {[0, 1, 2, 3].map((copy) => (
          <ul key={copy} aria-hidden={copy > 0 || undefined} className="marquee-list">
            {brands.map((brand) => (
              <Brand key={brand.name} brand={brand} hidden={copy > 0} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/**
 * Client brands passing without stopping (D43), ivory on guinda oscuro, full width, in two rows:
 * the first half of the brands moves right to left, the second half left to right.
 * CSS only (globals.css "Logo marquee"). Reduced motion → the brands sit still, wrapped and
 * centered, shown once.
 */
export function LogoMarquee({ brands, label }: LogoMarqueeProps) {
  const half = Math.ceil(brands.length / 2);
  return (
    <div role="group" aria-label={label} className="marquee-band theme-dark bg-burgundy-deep text-ivory">
      <MarqueeRow brands={brands.slice(0, half)} />
      <MarqueeRow brands={brands.slice(half)} reverse />
    </div>
  );
}
