"use client";

import { useEffect, useRef, useState } from "react";

// Spline community scene "Clarity Stream" (CC0), served by Spline's viewer.
const SCENE_URL =
  "https://app.spline.design/file/c4a94242-659c-4944-85c6-dbb34a469ed3?view=preview";

/**
 * The hero's living centrepiece — the Clarity Stream silk.
 *
 * Loading / performance:
 *  - a wave-shaped CSS poster is server-rendered instantly, so the hero is
 *    never blank and FCP is never blocked;
 *  - the heavy viewer iframe is mounted lazily: only once the hero is on screen
 *    AND the browser is idle (requestIdleCallback), so it never competes with
 *    first paint or font loading;
 *  - when the hero scrolls off-screen the iframe is hidden, which lets the
 *    browser throttle its rendering (pauses the scene, frees the GPU on scroll);
 *  - under prefers-reduced-motion only the static poster is used.
 *
 * Mobile: the object is scaled down ~35% and centred (vs. desktop) so the
 * headline stays the visual priority with breathing room around the scene.
 * Desktop composition (sm+) is untouched.
 *
 * Note: this is Spline's viewer iframe, not the @splinetool runtime — camera,
 * FOV, device-pixel-ratio and scene quality can't be tuned from here, only the
 * container. A self-hosted `.splinecode` export would unlock those.
 */
export function ClarityStream() {
  const hostRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mount, setMount] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Lazy mount once the browser is idle — the hero is on screen at load, so
    // this defers the heavy iframe past first paint / fonts without gating on an
    // observer that could stall.
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    const go = () => setMount(true);
    let fallback: ReturnType<typeof setTimeout> | undefined;
    if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 700 });
    else fallback = setTimeout(go, 250);

    // Pause/resume rendering by toggling the iframe's visibility off/on screen,
    // which lets the browser throttle the scene (frees the GPU while scrolling).
    const io = new IntersectionObserver(
      ([entry]) => {
        const ifr = iframeRef.current;
        if (ifr) ifr.style.visibility = entry.isIntersecting ? "visible" : "hidden";
      },
      { rootMargin: "10% 0px" }
    );
    io.observe(host);
    return () => {
      io.disconnect();
      if (fallback) clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        // The silk dissolves into the stage above — no visible embed seam.
        maskImage:
          "linear-gradient(to bottom, transparent 0%, #000 24%, #000 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 24%, #000 88%, transparent 100%)",
      }}
    >
      {/* Poster — a soft wave-shaped glow, painted instantly (SSR) as the
          placeholder the scene cross-fades over. */}
      <div
        className="absolute inset-x-[-10%] top-[46%] h-24 -translate-y-1/2 sm:h-28"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(224,82,92,0.35) 22%, rgba(242,240,235,0.65) 50%, rgba(99,91,255,0.32) 78%, transparent)",
          filter: "blur(14px)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute inset-x-0 top-[52%] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(242,240,235,0.55) 40%, rgba(242,240,235,0.7) 50%, rgba(242,240,235,0.5) 60%, transparent)",
          boxShadow: "0 0 24px 6px rgba(242,240,235,0.08)",
        }}
      />

      {/* Live scene — lazily mounted; scaled down + centred on mobile, natural on
          ≥sm (desktop untouched). Cross-fades in on load. */}
      {mount && (
        <iframe
          ref={iframeRef}
          src={SCENE_URL}
          title=""
          tabIndex={-1}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[105%] w-[112%] origin-center -translate-x-1/2 -translate-y-1/2 scale-[1.45] border-0 transition-opacity duration-700 ease-premium sm:h-[120%] sm:w-[108%] sm:scale-100"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}
