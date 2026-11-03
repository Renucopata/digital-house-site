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
 * Client brands passing right to left without stopping (D43), ivory on guinda oscuro, full width.
 * CSS only (globals.css "Logo marquee"): the list is rendered twice and the track slides −50 %,
 * so the loop has no seam. The second copy is hidden from screen readers. Reduced motion → the
 * brands sit still, wrapped and centered, shown once.
 */
export function LogoMarquee({ brands, label }: LogoMarqueeProps) {
  return (
    <div className="marquee-band theme-dark bg-burgundy-deep text-ivory">
      <div className="marquee">
        <div className="marquee-track">
          <ul aria-label={label} className="marquee-list">
            {brands.map((brand) => (
              <Brand key={brand.name} brand={brand} />
            ))}
          </ul>
          <ul aria-hidden="true" className="marquee-list">
            {brands.map((brand) => (
              <Brand key={brand.name} brand={brand} hidden />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
