import type { Stat } from "@/types";
import { CountUpStat } from "./CountUpStat";

type StatItemProps = {
  stat: Stat;
};

export function StatItem({ stat }: StatItemProps) {
  return (
    <div className="flex flex-col">
      <CountUpStat
        value={stat.value}
        className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
      />
      <span className="mt-2 text-sm text-ink-muted">{stat.label}</span>
    </div>
  );
}
