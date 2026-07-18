import { Container } from "@/components/Container";
import { LogoStrip } from "@/components/LogoStrip";
import { Reveal } from "@/components/Reveal";

export function TrustedBy() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="mb-10 text-center text-eyebrow font-medium uppercase text-ink-muted">
            Trusted by ambitious businesses across India
          </p>
        </Reveal>
      </Container>
      <LogoStrip />
    </section>
  );
}
