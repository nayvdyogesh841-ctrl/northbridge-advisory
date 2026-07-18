"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { viewportOnce, wordChild, wordContainer } from "@/lib/motion";

type Segment = {
  text: string;
  className?: string;
  /** Extra lag (seconds) for a highlighted run — a beat of emphasis. */
  emphasisDelay?: number;
};

type WordRevealProps = {
  /** Styled runs of the phrase; each keeps its own styling and timing. */
  segments: Segment[];
  className?: string;
  /** "mount" for above-the-fold (hero), "inView" for scroll-triggered headings. */
  trigger?: "mount" | "inView";
  delay?: number;
  /** Seconds between each word. */
  stagger?: number;
  as?: "h1" | "h2" | "span";
};

/**
 * Reveals a phrase word-by-word (staggered rise + fade). Every word computes its
 * own delay, which lets a highlighted segment arrive a beat later than the rest.
 * The full text stays in the DOM via aria-label for assistive tech and SEO, and
 * no clip mask is used so descenders/italics are never cut.
 */
export function WordReveal({
  segments,
  className,
  trigger = "inView",
  delay = 0,
  stagger = 0.055,
  as = "span",
}: WordRevealProps) {
  const MotionTag = motion[as];
  const label = segments.map((s) => s.text).join(" ");
  const activation =
    trigger === "mount"
      ? ({ animate: "visible" } as const)
      : ({ whileInView: "visible", viewport: viewportOnce } as const);

  // Flatten to words up-front so delays run continuously across segments.
  let index = 0;
  const words = segments.flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({
        word,
        className: segment.className,
        delay: delay + index++ * stagger + (segment.emphasisDelay ?? 0),
      }))
  );

  return (
    <MotionTag
      className={className}
      aria-label={label}
      variants={wordContainer}
      initial="hidden"
      {...activation}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span
            aria-hidden
            variants={wordChild}
            custom={w.delay}
            className={cn("inline-block", w.className)}
          >
            {w.word}
          </motion.span>{" "}
        </Fragment>
      ))}
    </MotionTag>
  );
}
