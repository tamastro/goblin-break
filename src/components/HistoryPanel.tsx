import { WORKOUTS } from "../data/workouts";
import { formatDuration } from "../lib/workoutDisplay";
import type { GoblinTitle } from "../data/titles";

export function HistoryPanel({ title, totalBreaks }: { title: GoblinTitle; totalBreaks: number }) {
  return (
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl flex flex-col gap-md">
      <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold">
        Quest log
      </h2>
      <p className="font-body-md text-on-surface-variant text-pretty">
        Title: <span className="text-primary-fixed font-bold">{title.name}</span> · {totalBreaks}{" "}
        quests completed
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-xs max-h-[50vh] md:max-h-[60vh] overflow-y-auto">
        {WORKOUTS.map((w) => (
          <li
            key={w.id}
            className="bg-surface-container border border-outline-variant rounded-lg px-md py-sm flex justify-between items-center gap-sm min-w-0"
          >
            <div className="min-w-0 flex-1">
              <p className="font-label-bold text-label-bold text-on-surface truncate">{w.goblinName}</p>
              <p className="text-xs text-on-surface-variant truncate">{w.realName}</p>
            </div>
            <span className="font-label-bold text-label-bold text-primary-fixed shrink-0">
              {formatDuration(w.durationSec)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
