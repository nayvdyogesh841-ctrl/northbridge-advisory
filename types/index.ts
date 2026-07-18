import type { ReactNode } from "react";

export type NavLink = {
  label: string;
  href: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  points: string[];
  featured?: boolean;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Testimonial = {
  quote: string;
  /** Concrete outcome — the credibility anchor above the quote. */
  result: string;
  name: string;
  role: string;
  company: string;
};

export type Differentiator = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type IconProps = {
  className?: string;
};

export type WithChildren = {
  children: ReactNode;
};
