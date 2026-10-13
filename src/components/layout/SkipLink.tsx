import { navCopy } from "@/content/navigation";

/** First focusable element on the page: jumps over the header to <main id="contenido">. */
export function SkipLink() {
  return (
    <a
      href="#contenido"
      className={[
        "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1100]",
        "focus:rounded-full focus:bg-burgundy focus:px-5 focus:py-3 focus:text-sm focus:text-cream",
      ].join(" ")}
    >
      {navCopy.skipLink}
    </a>
  );
}
