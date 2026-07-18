import { cn } from "@/utils/cn";

type CompanyMarkProps = {
  company: string;
  className?: string;
};

/**
 * Minimal monochrome marks for client companies. Simple geometry in the same
 * 1.5px-stroke family as the service icons, so logos read as part of the system
 * rather than pasted-in brand art. Paired with the wordmark for legibility.
 */
const marks: Record<string, JSX.Element> = {
  "Cedar Health": (
    <>
      <path d="M12 3v18" />
      <path d="M12 8 7 5M12 8l5-3M12 14l-5-3M12 14l5-3" />
    </>
  ),
  "Volt Mobility": (
    <>
      <path d="M13 3 5 14h6l-1 7 9-12h-6l1-6Z" />
    </>
  ),
  "Aster Textiles": (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21M5.6 5.6l3.2 3.2M15.2 15.2l3.2 3.2M18.4 5.6l-3.2 3.2M8.8 15.2l-3.2 3.2" />
    </>
  ),
};

export function CompanyMark({ company, className }: CompanyMarkProps) {
  const mark = marks[company];
  if (!mark) return null;

  return (
    <span className={cn("inline-flex items-center gap-2 text-ink-muted", className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="h-[18px] w-[18px]"
      >
        {mark}
      </svg>
      <span className="font-display text-sm font-semibold tracking-tight">
        {company}
      </span>
    </span>
  );
}
