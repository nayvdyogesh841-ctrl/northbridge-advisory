"use client";

import type { PointerEvent } from "react";
import type { Service } from "@/types";
import { cn } from "@/utils/cn";
import { Check, serviceIcons } from "./Icons";
import { LiquidLight } from "./LiquidLight";
import { Reveal } from "./Reveal";

type ServiceCardProps = {
  service: Service;
};

// Feeds the .glow-card cursor light (non-featured cards) — two vars, no re-render.
function trackPointer(e: PointerEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = serviceIcons[service.id];
  const featured = service.featured;

  return (
    <Reveal
      className={cn(
        "group flex h-full flex-col rounded-card border border-line bg-surface p-7 transition-all duration-300 ease-premium will-change-transform hover:-translate-y-1 hover:border-ink/25 hover:shadow-lift sm:p-8",
        // Bento anchor: the featured practice holds a 2×2 field and the liquid light.
        featured ? "liquid lg:col-span-2 lg:row-span-2 lg:p-10" : "glow-card"
      )}
    >
      {featured ? (
        <LiquidLight variant="card" />
      ) : (
        <div onPointerMove={trackPointer} className="absolute inset-0 rounded-card" />
      )}

      <div className={cn("flex h-full flex-col", featured && "liquid-content")}>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-bg text-ink transition-colors duration-300 ease-premium group-hover:border-ink group-hover:bg-ink group-hover:text-bg">
          {Icon ? <Icon className="h-6 w-6" /> : null}
        </span>
        <h3
          className={cn(
            "mt-6 font-display font-semibold tracking-tight text-ink",
            featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          )}
        >
          {service.title}
        </h3>
        <p
          className={cn(
            "mt-3 leading-relaxed text-ink-muted",
            featured ? "max-w-md text-base" : "text-[0.95rem]"
          )}
        >
          {service.description}
        </p>

        <ul
          className={cn(
            "mt-6 flex flex-col gap-3 border-t border-line pt-6",
            featured && "lg:mt-auto"
          )}
        >
          {service.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
