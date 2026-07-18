import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { LiquidLight } from "./LiquidLight";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-all duration-300 ease-premium will-change-transform active:translate-y-0 active:scale-[0.98] active:duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  // `liquid` clips a flowing interior reflection into the primary CTA on hover.
  primary:
    "liquid bg-accent text-accent-fg shadow-card hover:-translate-y-0.5 hover:shadow-lift",
  secondary:
    "bg-surface text-ink border border-line hover:-translate-y-0.5 hover:border-ink/40 hover:bg-bg",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-7 text-[0.95rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  // Primary buttons carry the interior liquid light; content sits above it.
  const inner =
    variant === "primary" ? (
      <>
        <LiquidLight variant="button" />
        <span className="liquid-content inline-flex items-center justify-center gap-2">
          {children}
        </span>
      </>
    ) : (
      children
    );

  if (props.as === "a") {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props;
    return (
      <a className={classes} {...rest}>
        {inner}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props;
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
