import { cn } from "@/lib/cn";

type WindowShadowProps = {
  className?: string;
  /** Which corner the light comes from. */
  side?: "left" | "right";
};

/**
 * Soft window + leaf shadow ("gobo") as seen on the walls of the brand photos.
 * Pure SVG (no image request), heavily blurred and very low opacity. Decorative.
 */
export function WindowShadow({ className, side = "right" }: WindowShadowProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-[var(--texture-ink)] opacity-[0.07] blur-[12px]",
        side === "left" && "-scale-x-100",
        className,
      )}
    >
      <g fill="currentColor">
        {/* window frame: two mullions + a transom, cast diagonally */}
        <g transform="rotate(-32 900 200)">
          <rect x="640" y="-300" width="46" height="1400" />
          <rect x="980" y="-300" width="46" height="1400" />
          <rect x="560" y="330" width="560" height="38" />
        </g>
        {/* leafy branch */}
        <g transform="translate(150 120) rotate(18)">
          <path d="M0 0C120 90 230 170 380 300" fill="none" stroke="currentColor" strokeWidth="7" />
          <ellipse cx="60" cy="30" rx="48" ry="17" transform="rotate(-20 60 30)" />
          <ellipse cx="95" cy="88" rx="52" ry="18" transform="rotate(62 95 88)" />
          <ellipse cx="160" cy="98" rx="55" ry="19" transform="rotate(-10 160 98)" />
          <ellipse cx="190" cy="165" rx="56" ry="19" transform="rotate(70 190 165)" />
          <ellipse cx="262" cy="170" rx="58" ry="20" transform="rotate(-4 262 170)" />
          <ellipse cx="280" cy="242" rx="54" ry="18" transform="rotate(66 280 242)" />
          <ellipse cx="350" cy="250" rx="50" ry="17" transform="rotate(8 350 250)" />
        </g>
      </g>
    </svg>
  );
}
