"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  /** Render as a different element while preserving motion. */
  as?: "div" | "li" | "span";
};

/**
 * Scroll-into-view reveal wrapper. Defaults to the shared fadeUp variant and
 * fires once. Honors prefers-reduced-motion via globals.css transition reset.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
