"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { TestimonialCard } from "@/components/TestimonialCard";
import { WordReveal } from "@/components/WordReveal";
import { testimonials } from "@/lib/content";
import { scaleIn, staggerContainer, viewportOnce } from "@/lib/motion";

export function Testimonials() {
  return (
    <Section id="testimonials">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Client testimonials</Eyebrow>
        </Reveal>
        <WordReveal
          as="h2"
          className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          segments={[{ text: "Trusted by the people who run the numbers" }]}
        />
      </div>

      {/* Asymmetric proof: one featured voice holds the left field, two
          supporting voices stack beside it. */}
      <motion.div
        className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-[1.35fr_1fr] lg:grid-rows-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={testimonial.name}
            variants={scaleIn}
            className={i === 0 ? "lg:row-span-2" : undefined}
          >
            <TestimonialCard testimonial={testimonial} featured={i === 0} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
