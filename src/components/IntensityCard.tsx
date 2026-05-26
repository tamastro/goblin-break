import type { Workout } from "../data/workouts";
import { categoryIcon, formatDuration, intensityDescription } from "../lib/workoutDisplay";
import { Icon } from "./Icon";

export function IntensityCard({
  workout,
  progress,
  onStartQuest,
}: {
  workout: Workout;
  progress: number;
  onStartQuest?: () => void;
}) {
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100);

  return (
    <section className="w-full max-w-md bg-surface-container text-on-surface p-md rounded-xl border border-outline-variant relative overflow-hidden group">
      <div className="absolute inset-0 bg-primary-container/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="flex items-start justify-between relative z-10">
        <div className="flex flex-col gap-xs flex-1 min-w-0">
          <span className="font-label-bold text-label-bold text-primary-fixed uppercase tracking-widest">
            Current Intensity
          </span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-surface truncate">
            {workout.goblinName}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
            {intensityDescription(workout)}
          </p>
          <p className="font-label-bold text-label-bold text-on-surface-variant/80 text-xs mt-xs">
            {workout.realName}
          </p>
        </div>
        <div className="flex flex-col items-end gap-xs shrink-0 ml-sm">
          <Icon name={categoryIcon(workout.category)} filled className="text-primary-container text-4xl" />
          <span className="font-label-bold text-label-bold text-on-surface-variant bg-surface-container-highest px-sm py-xs rounded-full">
            {formatDuration(workout.durationSec)}
          </span>
        </div>
      </div>
      <div className="w-full h-3 bg-surface-container-highest rounded-full mt-md overflow-hidden relative border border-outline-variant">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-container to-tertiary-container rounded-full transition-all duration-1000 linear"
          style={{ width: `${pct}%` }}
        />
      </div>
      {onStartQuest && (
        <button
          type="button"
          onClick={onStartQuest}
          className="mt-md w-full py-sm font-label-bold text-label-bold uppercase tracking-widest text-on-primary-fixed bg-surface-container-highest border border-outline-variant rounded-lg hover:border-primary-container transition-colors relative z-10"
        >
          Preview quest
        </button>
      )}
    </section>
  );
}
