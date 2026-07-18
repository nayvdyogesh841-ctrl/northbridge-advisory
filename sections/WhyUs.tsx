"use client";

import { motion } from "framer-motion";
import { BackgroundPathsLayer } from "@/components/FloatingPaths";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { WordReveal } from "@/components/WordReveal";
import { Section } from "@/components/Section";
import { StatItem } from "@/components/StatItem";
import { differentiators, stats } from "@/lib/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function WhyUs() {
  return (
    <Section id="why-us" className="relative overflow-hidden">
      {/* Canonical 21st.dev "Background Paths" as a decorative section backdrop —
          full-bleed, ~10% opacity, faded top & bottom so it dissolves into the
          neighbouring sections. Behind all content, non-interactive. */}
      <BackgroundPathsLayer className="-z-10 opacity-[0.28] [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_78%,transparent)]" />
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Why choose us</Eyebrow>
        </Reveal>
        <WordReveal
          as="h2"
          className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          segments={[{ text: "The rigour of a big firm, the attention of a partner" }]}
        />
      </div>

      <motion.div
        className="mt-14 grid gap-x-10 gap-y-10 sm:mt-16 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {differentiators.map((d) => (
          <motion.div key={d.title} variants={fadeUp} className="border-t border-line pt-6">
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
              {d.title}
            </h3>
            <p className="mt-3 max-w-md leading-relaxed text-ink-muted">
              {d.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <Reveal className="mt-16 sm:mt-20">
        <div className="grid grid-cols-2 gap-8 rounded-card border border-line bg-surface px-8 py-10 sm:grid-cols-4 sm:px-10">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
