"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Milliseconds for the full count. */
  duration?: number;
};

/**
 * Counts from 0 to `target` once the element scrolls into view.
 * - IntersectionObserver triggers a single run (no re-renders while off-screen).
 * - requestAnimationFrame drives the value (GPU-friendly, ~60fps, one rAF loop).
 * - Honors prefers-reduced-motion by snapping straight to the target.
 */
export function useCountUp(target: number, { duration = 1400 }: Options = {}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    let raf = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic — decelerates into the final number.
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          observer.disconnect();
        }
      },
      // Fire as soon as the element edges into view — reliable even when the
      // element is taller than a short viewport.
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return { ref, value };
}
