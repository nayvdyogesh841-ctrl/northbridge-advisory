"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { WordReveal } from "@/components/WordReveal";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/content";
import { staggerContainer, viewportOnce } from "@/lib/motion";

export function Services() {
  return (
    <Section id="services">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Our services</Eyebrow>
        </Reveal>
        <WordReveal
          as="h2"
          className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          segments={[
            { text: "Everything a growing business needs from its accountants" },
          ]}
        />
        <Reveal>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Five focused practices, one dedicated advisor. Engage a single service or
            hand us the whole finance function.
          </p>
        </Reveal>
      </div>

      <motion.div
        className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </motion.div>
    </Section>
  );
}
