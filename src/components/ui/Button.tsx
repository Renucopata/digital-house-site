import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "filled" | "outline";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & {
  href: string;
  /** Opens in a new tab with rel="noopener noreferrer" (WhatsApp, Instagram…). */
  external?: boolean;
  "aria-label"?: string;
};

type ButtonProps = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full border text-center font-sans font-medium leading-tight " +
  "transition-[background-color,color,border-color,transform] duration-300 ease-soft " +
  "active:translate-y-px motion-reduce:transform-none";

const variants: Record<Variant, string> = {
  // Theme-aware: on dark sections --accent is ivory and --on-accent is burgundy.
  filled: "border-accent bg-accent text-on-accent hover:bg-transparent hover:text-accent",
  outline: "border-line text-accent hover:border-accent hover:bg-accent hover:text-on-accent",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-6 text-sm",
  lg: "min-h-13 px-8 text-base",
};

/** Pill button (CLAUDE.md §4.4). Renders an <a> when `href` is given, otherwise a <button>. */
export function Button(props: LinkProps | ButtonProps) {
  const { variant = "filled", size = "md", icon, className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {icon ? <span className="size-[1.15em] shrink-0 [&>svg]:size-full">{icon}</span> : null}
      <span>{children}</span>
    </>
  );

  if (props.href !== undefined) {
    return (
      <a
        href={props.href}
        className={classes}
        aria-label={props["aria-label"]}
        {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={classes}>
      {content}
    </button>
  );
}
