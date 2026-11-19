"use client";

import type { ComponentProps } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type NavPillProps = Omit<ComponentProps<typeof Link>, "className"> & { className?: string };

/**
 * Small pill link of the header (two26 effect 14). The current page is marked with aria-current.
 * P1: static; the outline that draws itself on hover comes in P4.
 */
export function NavPill({ href, className, children, ...rest }: NavPillProps) {
  const pathname = usePathname();
  // links to a section of a page (#hash) are never "the current page"
  const target = typeof href === "string" ? href : href.hash ? null : href.pathname;
  const current = target !== null && (pathname === target || (target !== "/" && pathname.startsWith(`${target}/`)));
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "rounded-full border border-transparent bg-ivory px-4 py-1.5 font-label text-sm font-medium text-charcoal",
        "transition-colors hover:border-charcoal aria-[current=page]:border-charcoal",
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
