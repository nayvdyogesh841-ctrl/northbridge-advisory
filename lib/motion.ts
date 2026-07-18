import type { Variants } from "framer-motion";

// Premium easing — matches the reference's slow, confident reveals.
export const easePremium = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easePremium },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easePremium },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// Shared viewport config so every reveal fires once, slightly before fully in view.
export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;

// --- Varied reveal vocabulary (one motion idea per section) ---

// Gate only — each word carries its own delay (see wordChild + WordReveal).
export const wordContainer: Variants = {
  hidden: {},
  visible: {},
};

// Each word carries its own delay via `custom`, so a highlighted run can lag
// slightly behind the rest of the line for a beat of emphasis.
export const wordChild: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easePremium },
  }),
};

// A hairline that grows from its start — used for dividers and rules.
export const growX: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: easePremium },
  },
};

// A vertical line that draws downward — used for the process timeline.
export const drawY: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.1, ease: easePremium },
  },
};

// A gentle settle-in — used for testimonial quote cards.
export const scaleIn: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easePremium },
  },
};

// An image that lifts in behind a clip — used for the advisor portrait.
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(12% 0% 0% 0%)", opacity: 0, scale: 1.04 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: easePremium },
  },
};
