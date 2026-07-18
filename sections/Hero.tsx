"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { ClarityStream } from "@/components/ClarityStream";
import { Container } from "@/components/Container";
import { CountUpStat } from "@/components/CountUpStat";
import { ArrowRight } from "@/components/Icons";
import { Magnetic } from "@/components/Magnetic";
import { WordReveal } from "@/components/WordReveal";
import { heroServiceTags, heroStats, site } from "@/lib/content";
import { easePremium } from "@/lib/motion";

// Choreographed entrance — each element arrives on its own beat.
const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const pill = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const pillGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 1.4 } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle cursor-follow depth. Sets normalised -1..1 vars the background layers
  // read as translate. rAF-throttled; disabled for touch and reduced-motion.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
        el.style.setProperty("--px", px.toFixed(3));
        el.style.setProperty("--py", py.toFixed(3));
      });
    };
    const reset = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-grain relative flex min-h-[100svh] flex-col overflow-hidden pt-32 sm:pt-36"
    >
      {/* Graphite atmosphere — ceiling light, ember/violet blooms, structure. */}
      <div aria-hidden className="hero-stage" />
      <div aria-hidden className="hero-grid" />
      <div aria-hidden className="hero-arch" />
      <div aria-hidden className="hero-drift" />
      <div aria-hidden className="hero-glow" />

      {/* The Clarity Stream — full-bleed through the lower half of the stage,
          drifting a breath with the cursor for depth. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[62%]"
        style={{
          transform:
            "translate3d(calc(var(--px, 0) * 10px), calc(var(--py, 0) * 6px), 0)",
        }}
      >
        <ClarityStream />
      </div>

      {/* Edge vignette sits above the silk so the frame still settles. */}
      <div aria-hidden className="hero-vignette z-[1]" />

      <Container className="relative z-[2] flex flex-1 flex-col">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            variants={rise}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.34, ease: easePremium }}
          >
            <span className="glass-pill glass inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-sm text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(224,82,92)]" />
              ICAI-registered Chartered Accountants
            </span>
          </motion.div>

          {/* The line lands first; the highlighted run follows a beat later. */}
          <WordReveal
            as="h1"
            trigger="mount"
            delay={0.5}
            className="display-balance mt-7 font-display text-5xl font-semibold leading-[1.03] tracking-tight text-ink sm:text-6xl lg:text-7xl"
            segments={[
              { text: "Chartered Accountants for India’s" },
              {
                text: "founders & growing businesses",
                className: "italic text-ink-muted",
                emphasisDelay: 0.16,
              },
            ]}
          />

          <motion.p
            variants={rise}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 1.24, ease: easePremium }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted"
          >
            From income tax and GST to statutory audits, ROC filings, and virtual
            CFO support — {site.name} keeps your compliance clean and your numbers
            decision-ready. Fixed fees, no missed deadlines, one dedicated CA.
          </motion.p>

          {/* Service tags — each pill arrives on its own beat. */}
          <motion.ul
            variants={pillGroup}
            initial="hidden"
            animate="visible"
            className="mt-7 flex flex-wrap items-center justify-center gap-2"
          >
            {heroServiceTags.map((tag) => (
              <motion.li
                key={tag}
                variants={pill}
                transition={{ duration: 0.5, ease: easePremium }}
                className="glass-pill glass rounded-pill px-3.5 py-1.5 text-xs font-medium text-ink-muted sm:text-sm"
              >
                {tag}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 1.68, ease: easePremium }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Magnetic>
              <Button as="a" href="#consultation" size="lg" className="w-full sm:w-auto">
                Book a free consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5" />
              </Button>
            </Magnetic>
            <Magnetic strength={7}>
              <Button
                as="a"
                href="#services"
                variant="secondary"
                size="lg"
                className="glass w-full border-transparent bg-transparent sm:w-auto"
              >
                Explore our services
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Proof, floating on the silk — glass chips riding the stream. */}
        <motion.div
          variants={rise}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9, delay: 1.86, ease: easePremium }}
          className="mb-10 mt-auto pt-16 sm:mb-12"
        >
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className="glass-dark flex flex-col items-center rounded-2xl px-3 py-4 text-center sm:py-5"
                style={{
                  transform: `translate3d(calc(var(--px, 0) * ${-4 - i * 2}px), calc(var(--py, 0) * -3px), 0)`,
                }}
              >
                <CountUpStat
                  value={stat.value}
                  className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
                />
                <span className="mt-1.5 text-xs text-ink-muted sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
