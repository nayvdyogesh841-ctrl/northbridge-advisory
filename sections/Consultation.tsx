import { BackgroundPaths } from "@/components/BackgroundPaths";
import { ConsultationForm } from "@/components/ConsultationForm";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Check } from "@/components/Icons";
import { site } from "@/lib/content";

const assurances = [
  "Free 30-minute discovery call",
  "Fixed-fee proposal within 2 business days",
  "A dedicated Chartered Accountant, not a call centre",
];

export function Consultation() {
  return (
    <Section id="consultation" className="relative overflow-hidden">
      <BackgroundPaths
        direction={-1}
        count={18}
        opacity={0.28}
        className="[mask-image:radial-gradient(65%_60%_at_50%_45%,#000,transparent_75%)]"
      />
      {/* A quiet echo of the hero's silk behind the glass form. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(46% 38% at 72% 60%, rgba(224,82,92,0.06), transparent 70%), radial-gradient(40% 34% at 22% 30%, rgba(99,91,255,0.05), transparent 72%)",
        }}
      />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>Book a consultation</Eyebrow>
          </Reveal>
          <Reveal>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Let&apos;s talk about your numbers
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
              Tell us where you are and what you need. We&apos;ll come back with a clear,
              honest view of how we can help — and what it costs.
            </p>
          </Reveal>
          <Reveal>
            <ul className="mt-8 flex flex-col gap-3">
              {assurances.map((point) => (
                <li key={point} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-[0.95rem]">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <div className="mt-8 flex flex-col gap-1 border-t border-line pt-6 text-sm text-ink-muted">
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-ink"
              >
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <ConsultationForm />
        </Reveal>
      </div>
    </Section>
  );
}
