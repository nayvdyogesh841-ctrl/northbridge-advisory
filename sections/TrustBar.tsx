import { Container } from "@/components/Container";
import { Check } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { trustSignals } from "@/lib/content";

/**
 * Slim reassurance strip directly below the hero. Reuses existing borders and
 * type — no new visual language — to reinforce credibility above the fold.
 */
export function TrustBar() {
  return (
    <section aria-label="Trust signals" className="border-y border-line">
      <Container>
        <Reveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 sm:justify-between">
            {trustSignals.map((signal) => (
              <li
                key={signal}
                className="inline-flex items-center gap-2 text-sm text-ink-muted"
              >
                <Check className="h-4 w-4 shrink-0 text-ink" />
                {signal}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
