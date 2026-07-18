import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  /** Removes the default vertical padding when composing custom spacing. */
  bare?: boolean;
};

export function Section({
  id,
  className,
  containerClassName,
  children,
  bare = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(!bare && "py-section", "scroll-mt-24", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
