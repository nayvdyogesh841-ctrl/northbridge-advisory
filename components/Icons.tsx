import type { IconProps } from "@/types";

// Minimal, consistent 1.5px stroke line icons — one visual family, premium and quiet.
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function ArrowRight({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}

export function Plus({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Menu({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

// Service icons
export function TaxIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M9 7h6M9 11h6M9 15h4" />
      <rect x="5" y="3" width="14" height="18" rx="2" />
    </svg>
  );
}

export function GstIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M6 3h12l2 4-8 14L4 7l2-4ZM4 7h16M10 3l-2 4 4 14 4-14-2-4" />
    </svg>
  );
}

export function AuditIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5M8 11l2 2 4-4" />
    </svg>
  );
}

export function CompanyIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M3 21h18M6 21V7l6-4 6 4v14M10 11h.01M14 11h.01M10 15h.01M14 15h.01" />
    </svg>
  );
}

export function AdvisoryIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M3 3v18h18M7 14l3-3 3 3 5-6" />
    </svg>
  );
}

export function Quote({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v1a2 2 0 0 1-2 2H4v2h1a4 4 0 0 0 4-4V7Zm11 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v1a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V7Z" />
    </svg>
  );
}

export const serviceIcons: Record<string, (p: IconProps) => JSX.Element> = {
  "tax-planning": TaxIcon,
  "gst-compliance": GstIcon,
  "audit-assurance": AuditIcon,
  "company-registration": CompanyIcon,
  "business-advisory": AdvisoryIcon,
};
