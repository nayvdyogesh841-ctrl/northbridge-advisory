import { clients } from "@/lib/content";

/**
 * Continuous marquee of client names. Duplicated track for a seamless loop;
 * pauses on hover and freezes entirely under prefers-reduced-motion.
 */
export function LogoStrip() {
  const track = [...clients, ...clients];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee items-center gap-x-14 hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap font-display text-xl font-medium text-ink-muted/80 sm:text-2xl"
            aria-hidden={i >= clients.length}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
