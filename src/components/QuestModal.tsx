import type { Workout } from "../data/workouts";
import { getWorkoutPreviewImage } from "../data/workoutImages";
import { formatDuration } from "../lib/workoutDisplay";
import { Icon } from "./Icon";
import { BreakTimerRing } from "./BreakTimerRing";

export function QuestModal({
  workout,
  onStart,
  onSnooze,
}: {
  workout: Workout;
  onStart: () => void;
  onSnooze: () => void;
}) {

  return (
    <div
      className="fixed inset-0 z-[100] bg-background text-on-background min-h-screen flex flex-col items-center justify-between font-body-md antialiased pb-lg"
      role="dialog"
      aria-labelledby="break-alert-title"
      aria-modal="true"
    >
      <header className="w-full bg-background flex items-center justify-center px-margin-mobile h-16 z-50 shrink-0">
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

      <main className="flex-grow w-full px-margin-mobile flex flex-col items-center justify-center gap-lg mt-md">
        <div className="text-center">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background mb-base">
            Chair fusion approaching critical levels.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Time to move.</p>
        </div>

        <BreakTimerRing secondsLeft={workout.durationSec} totalSeconds={workout.durationSec} />

        <div className="w-full max-w-md bg-[#121212] border border-[#262626] rounded-xl p-sm flex items-center gap-md">
          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 border-primary-fixed goblin-glow">
            <img
              alt={`${workout.goblinName} preview`}
              className="w-full h-full object-cover"
              src={getWorkoutPreviewImage(workout)}
            />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <h3 className="font-headline-md text-headline-md text-on-background truncate">
              {workout.goblinName}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
              {workout.realName} · {formatDuration(workout.durationSec)}
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full px-margin-mobile flex flex-col gap-sm mt-lg shrink-0 pb-safe">
        <button
          type="button"
          onClick={onStart}
          className="w-full bg-primary-fixed text-black font-label-bold text-label-bold py-md rounded-full goblin-glow hover:opacity-90 active:scale-95 transition-all duration-200"
        >
          Restore Goblin Mobility
        </button>
        <button
          type="button"
          onClick={onSnooze}
          className="w-full bg-transparent text-primary-fixed font-label-bold text-label-bold py-sm rounded-full active:scale-95 transition-all duration-200 opacity-70 hover:opacity-100"
        >
          Ignore Problems Briefly
        </button>
      </footer>
    </div>
  );
}
