"use client";

import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/BackgroundPaths";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { processSteps } from "@/lib/content";
import { fadeUp, growX, staggerContainer, viewportOnce } from "@/lib/motion";

export function Process() {
  return (
    <Section id="process" className="relative overflow-hidden">
      <BackgroundPaths
        direction={-1}
        count={20}
        opacity={0.4}
        className="[mask-image:radial-gradient(70%_75%_at_15%_85%,#000,transparent_72%)]"
      />
      <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>How we work</Eyebrow>
          </Reveal>
          <Reveal>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              A simple, transparent way to work together
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
              No lengthy onboarding, no confusing paperwork. Three steps from first
              call to a finance partner who knows your business.
            </p>
          </Reveal>
        </div>

        <motion.ol
          className="flex flex-col"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {processSteps.map((step, i) => (
            <motion.li
              key={step.step}
              variants={fadeUp}
              className="relative flex gap-6 py-8 first:pt-0"
            >
              {/* Divider draws in from the left as the step arrives. */}
              {i > 0 && (
                <motion.span
                  aria-hidden
                  variants={growX}
                  className="absolute inset-x-0 top-0 h-px origin-left bg-line"
                />
              )}
              <span className="font-display text-2xl font-medium tabular-nums text-ink-muted">
                {step.step}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-md leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Section>
  );
}
