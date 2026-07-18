import { cn } from "@/utils/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span className={cn("eyebrow", className)}>
      <span aria-hidden className="h-1 w-1 rounded-full bg-ink-muted" />
      {children}
    </span>
  );
}
