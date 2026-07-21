"use client";

import { useEffect, useState } from "react";
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
 * - No layout shift: every phrase is rendered invisibly, stacked in a single
 *   CSS-grid cell, so the box always reserves the widest/tallest phrase; the
 *   visible typed text overlays that reserved cell.
 * - Human-like cadence (jittered type/delete speeds), 2s dwell at each phrase.
 * - SSR renders the first phrase in full, so hydration matches and the caret
 *   simply begins from there — no flash.
 * - Timers only (no rAF, no per-frame work); one setState per keystroke.
 * - Under prefers-reduced-motion it stays on a single static phrase.
 */
export function Typewriter({ phrases = DEFAULT_PHRASES, className }: TypewriterProps) {
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phrase = 0;
    let chars = phrases[0].length; // start from the fully-typed first phrase
    let deleting = true; // ...then dwell and delete
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = phrases[phrase];

      if (!deleting) {
        chars += 1;
        setText(word.slice(0, chars));
        if (chars >= word.length) {
          deleting = true;
          timer = setTimeout(tick, 2000); // dwell ~2s at the full phrase
          return;
        }
        timer = setTimeout(tick, 68 + Math.random() * 46); // human typing
      } else {
        chars -= 1;
        setText(word.slice(0, chars));
        if (chars <= 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          timer = setTimeout(tick, 420); // brief beat before the next phrase
          return;
        }
        timer = setTimeout(tick, 34 + Math.random() * 26); // faster delete
      }
    };

    timer = setTimeout(tick, 2000); // initial dwell on the first phrase
    return () => clearTimeout(timer);
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
      {/* Visible typed text + blinking caret. */}
      <span aria-hidden className="[grid-area:1/1]">
        {text}
        <span className="tw-caret" />
      </span>
    </span>
  );
}
