"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/utils/cn";

type CountUpStatProps = {
  /** Full display value, e.g. "₹400Cr+", "18+", "600+", "100%". */
  value: string;
  className?: string;
};

// Splits "₹400Cr+" -> { prefix: "₹", number: 400, suffix: "Cr+" }.
function parse(value: string) {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    number: Number(digits.replace(/,/g, "")),
    suffix,
    grouped: digits.includes(","),
  };
}

export function CountUpStat({ value, className }: CountUpStatProps) {
  const parsed = parse(value);
  // Non-numeric values (or parse failure) render statically.
  const { ref, value: current } = useCountUp(parsed?.number ?? 0);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  const display = parsed.grouped ? current.toLocaleString("en-IN") : current;

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {/* Full value for assistive tech; animated value hidden from it. */}
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {parsed.prefix}
        {display}
        {parsed.suffix}
      </span>
    </span>
  );
}
