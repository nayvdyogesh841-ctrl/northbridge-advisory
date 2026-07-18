import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { Check } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { advisor } from "@/lib/content";
import { clipReveal } from "@/lib/motion";

/**
 * Editorial black-and-white portrait section. Humanizes a trust-based service.
 * Portrait sits below the hero and is lazy-loaded so it never regresses LCP.
 */
export function Advisor() {
  return (
    <section aria-label="Meet your advisor" className="py-section">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal className="order-1" variants={clipReveal}>
            <figure className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-card border border-line/70 lg:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={advisor.image}
                alt={`${advisor.name}, ${advisor.credential} at Northbridge Advisory`}
                width={1100}
                height={1375}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale [aspect-ratio:4/5]"
              />
              {/* Editorial caption — a soft scrim, not a floating card. */}
              <figcaption
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-5 pb-4 pt-16"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(20,20,20,0.55), rgba(20,20,20,0.12) 45%, transparent)",
                }}
              >
                <span className="text-sm font-medium text-ink">{advisor.name}</span>
                <span className="text-xs text-ink opacity-80">{advisor.credential}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="order-2">
            <Reveal>
              <Eyebrow>{advisor.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {advisor.heading}
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
                {advisor.body}
              </p>
            </Reveal>
            <Reveal>
              <ul className="mt-8 flex flex-col gap-3">
                {advisor.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-ink">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-[0.95rem]">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
