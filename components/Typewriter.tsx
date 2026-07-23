"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

const DEFAULT_PHRASES = [
  "Founders",
  "Startups",
  "Growing Businesses",
  "SMEs",
  "Scaling Companies",
  "Global Businesses",
];

type TypewriterProps = {
  phrases?: string[];
  className?: string;
};

/**
 * Premium rotating typewriter for the hero headline's final phrase.
 *
 * Performance:
 * - starts only after the browser is idle (requestIdleCallback, ~≤600ms) so it
 *   never competes with first paint or the Spline load;
 * - drives updates with requestAnimationFrame and writes to the DOM via a ref
 *   (textContent) — zero React re-renders per character, so no dropped frames;
 * - a single scheduled mutation per keystroke (rAF only advances a clock).
 *
 * No layout shift: every phrase is rendered invisibly, stacked in one grid cell,
 * so the box always reserves the widest/tallest phrase.
 *
 * SSR renders the first phrase, so hydration matches; under prefers-reduced-
 * motion it simply stays on that static phrase.
 */
export function Typewriter({ phrases = DEFAULT_PHRASES, className }: TypewriterProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = textRef.current;
    if (!el) return;

    let phrase = 0;
    let chars = phrases[0].length; // start fully typed on the first phrase
    let deleting = true; // ...dwell, then delete
    let nextAt = 0;
    let raf = 0;
    let stopped = false;

    const step = (now: number) => {
      const word = phrases[phrase];
      if (!deleting) {
        chars += 1;
        el.textContent = word.slice(0, chars);
        if (chars >= word.length) {
          deleting = true;
          nextAt = now + 2000; // dwell ~2s at the full phrase
        } else {
          nextAt = now + 68 + Math.random() * 46; // human typing cadence
        }
      } else {
        chars -= 1;
        el.textContent = word.slice(0, chars);
        if (chars <= 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          nextAt = now + 420; // brief beat before the next phrase
        } else {
          nextAt = now + 34 + Math.random() * 26; // faster delete
        }
      }
    };

    const loop = (now: number) => {
      if (stopped) return;
      if (now >= nextAt) step(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      nextAt = performance.now() + 2000; // initial dwell on the first phrase
      raf = requestAnimationFrame(loop);
    };

    // Defer the whole thing until the browser is idle (300–600ms after load).
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    if (w.requestIdleCallback) {
      w.requestIdleCallback(() => !stopped && start(), { timeout: 600 });
    } else {
      startTimer = setTimeout(() => !stopped && start(), 400);
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      if (startTimer) clearTimeout(startTimer);
    };
  }, [phrases]);

  return (
    <span className={cn("inline-grid text-left align-bottom", className)}>
      {/* Accessible + SEO reading: one representative phrase. */}
      <span className="sr-only">{phrases[0]}</span>
      {/* Reservers — stacked in one cell so the box never resizes. */}
      {phrases.map((p) => (
        <span key={p} aria-hidden className="invisible [grid-area:1/1]">
          {p}
        </span>
      ))}
      {/* Visible typed text (mutated via ref) + blinking caret. */}
      <span aria-hidden className="[grid-area:1/1]">
        <span ref={textRef}>{phrases[0]}</span>
        <span className="tw-caret" />
      </span>
    </span>
  );
}
