import type { Testimonial } from "@/types";
import { CompanyMark } from "./CompanyMark";

type TestimonialCardProps = {
  testimonial: Testimonial;
  /** Featured voice — larger scale in the asymmetric grid. */
  featured?: boolean;
};

export function TestimonialCard({ testimonial, featured }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <figure className="flex h-full flex-col rounded-card border border-line bg-surface p-7 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-ink/15 hover:shadow-lift sm:p-8">
      {/* Company first — the reader knows who is vouching before they read. */}
      <CompanyMark company={testimonial.company} />

      {/* The outcome carries the credibility; the quote supports it. */}
      <p
        className={
          featured
            ? "mt-6 font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl"
            : "mt-6 font-display text-xl font-semibold leading-snug tracking-tight text-ink"
        }
      >
        {testimonial.result}
      </p>

      <blockquote
        className={
          featured
            ? "mt-5 flex-1 text-lg leading-relaxed text-ink-muted"
            : "mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-muted"
        }
      >
        “{testimonial.quote}”
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
        <span
          aria-hidden
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-fg"
        >
          {initials}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-medium text-ink">{testimonial.name}</span>
          <span className="text-sm text-ink-muted">
            {testimonial.role}, {testimonial.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
