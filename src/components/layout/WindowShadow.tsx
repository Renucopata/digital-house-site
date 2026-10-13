import { cn } from "@/lib/cn";

type WindowShadowProps = {
  className?: string;
  /** Which corner the light comes from. */
  side?: "left" | "right";
};

/**
 * Soft window + leaf shadow ("gobo") as seen on the walls of the brand photos. Decorative.
 * The blurred artwork is pre-rendered (tools/textures.mjs → public/textures/window-shadow.webp)
 * because a live CSS-blurred SVG was too slow to paint on phones (Phase 6). It is used as a
 * mask over the section's --texture-ink color, so it follows the theme and is not mistaken for
 * the page's main image (Largest Contentful Paint).
 */
export function WindowShadow({ className, side = "right" }: WindowShadowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[var(--texture-ink)] opacity-[0.07]",
        "[mask-image:url(/textures/window-shadow.webp)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:cover]",
        side === "left" && "-scale-x-100",
        className,
      )}
    />
  );
}
