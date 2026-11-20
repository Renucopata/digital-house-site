"use client";

import { useRef, type ComponentProps } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type NavPillProps = Omit<ComponentProps<typeof Link>, "className"> & { className?: string };

/**
 * Small pill link of the header (two26 effect 14): on hover an outline draws itself around the pill
 * (.5 s power1.inOut) and undraws faster on leave (×1.4). The current page keeps a solid outline.
 */
export function NavPill({ href, className, children, ...rest }: NavPillProps) {
  const pathname = usePathname();
  // links to a section of a page (#hash) are never "the current page"
  const target = typeof href === "string" ? href : href.hash ? null : href.pathname;
  const current = target !== null && (pathname === target || (target !== "/" && pathname.startsWith(`${target}/`)));
  const root = useRef<HTMLAnchorElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = root.current!;
      const outline = el.querySelector("rect");
      if (!outline || prefersReducedMotion()) return;
      gsap.set(outline, { drawSVG: "0%", opacity: 1 });
      const tl = gsap.timeline({ paused: true }).to(outline, { drawSVG: "100%", duration: 0.5, ease: "power1.inOut" });
      const enter = contextSafe!(() => tl.timeScale(1).play());
      const leave = contextSafe!(() => tl.timeScale(1.4).reverse());
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: root },
  );

  return (
    <Link
      ref={root}
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "relative rounded-full border border-transparent bg-ivory px-4 py-1.5 font-label text-sm font-medium text-charcoal",
        "aria-[current=page]:border-charcoal motion-reduce:hover:border-charcoal",
        className,
      )}
      {...rest}
    >
      {children}
      <svg aria-hidden="true" className="pointer-events-none absolute -inset-px overflow-visible" width="100%" height="100%">
        {/* hidden until the script takes over (no outline without JS / with reduced motion) */}
        <rect x="0" y="0" width="100%" height="100%" rx="999" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0" />
      </svg>
    </Link>
  );
}
