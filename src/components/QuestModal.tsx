import type { Workout } from "../data/workouts";
import { getWorkoutPreviewImage } from "../data/workoutImages";
import { formatDuration } from "../lib/workoutDisplay";
import { Icon } from "./Icon";

export function QuestModal({
  workouts,
  onStart,
  onSnooze,
}: {
  workouts: Workout[];
  onStart: () => void;
  onSnooze: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-background text-on-surface flex flex-col h-[100dvh] max-h-[100dvh] overflow-hidden"
      role="dialog"
      aria-labelledby="break-alert-title"
      aria-modal="true"
    >
      <header className="shrink-0 w-full flex items-center justify-center px-margin-mobile h-16 border-b border-outline-variant/50 bg-background">
        <div className="flex items-center gap-2">
          <Icon name="token" filled className="text-primary-fixed text-2xl" />
          <h1
            id="break-alert-title"
            className="font-headline-md text-headline-md text-primary-fixed text-center"
          >
            Goblin Maintenance Required
          </h1>
        </div>
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto w-full px-margin-mobile py-md flex flex-col items-center gap-md">
        <div className="text-center shrink-0">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-base">
            Chair fusion approaching critical levels.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {workouts.length === 1
              ? "1 quest awaits."
              : `${workouts.length} quests await.`}
          </p>
        </div>

        <ul className="w-full max-w-md flex flex-col gap-sm shrink-0">
          {workouts.map((workout, index) => (
            <li
              key={workout.id}
              className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-sm flex items-center gap-md"
            >
              <span className="font-label-bold text-label-bold text-primary-fixed w-6 shrink-0 text-center">
                {index + 1}
              </span>
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 border-primary-container goblin-glow">
                <img
                  alt={`${workout.goblinName} preview`}
                  className="w-full h-full object-cover"
                  src={getWorkoutPreviewImage(workout)}
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h3 className="font-headline-md text-headline-md text-on-surface truncate">
                  {workout.goblinName}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                  {workout.realName} · {formatDuration(workout.durationSec)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="shrink-0 w-full px-margin-mobile pt-sm pb-[max(1.25rem,env(safe-area-inset-bottom))] bg-background border-t border-outline-variant flex flex-col gap-sm">
        <button
          type="button"
          onClick={onStart}
          className="w-full min-h-[52px] bg-primary-container text-on-primary-container font-label-bold text-label-bold py-md px-lg rounded-full goblin-glow hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Restore Goblin Mobility
        </button>
        <button
          type="button"
          onClick={onSnooze}
          className="w-full min-h-[44px] bg-surface-container-high border border-outline-variant text-on-surface font-label-bold text-label-bold py-sm px-lg rounded-full hover:border-primary-container active:scale-[0.98] transition-all"
        >
          Ignore Problems Briefly (snooze 5m)
        </button>
      </footer>
    </div>
  );
}
