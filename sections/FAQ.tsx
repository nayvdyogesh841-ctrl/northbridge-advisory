import { Eyebrow } from "@/components/Eyebrow";
import { FAQItem } from "@/components/FAQItem";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { faqs } from "@/lib/content";

export function FAQ() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Questions, answered
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
              Still unsure about something? Book a consultation and we&apos;ll walk you
              through it, no obligation.
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:pt-2">
          <div>
            {faqs.map((item, index) => (
              <FAQItem key={item.question} item={item} index={index} />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
