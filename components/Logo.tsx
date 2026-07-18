import { cn } from "@/utils/cn";
import { site } from "@/lib/content";

type LogoProps = {
  className?: string;
};

/** Wordmark with a small geometric bridge-arch mark — quiet, premium, monochrome. */
export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="text-ink"
      >
        <path
          d="M3 20V9l9-6 9 6v11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M8 20v-5a4 4 0 0 1 8 0v5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-ink">
        {site.shortName}
      </span>
    </span>
  );
}
