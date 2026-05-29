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
      className="page-full fixed inset-0 z-[100] bg-background text-on-surface flex flex-col overflow-hidden"
      role="dialog"
      aria-labelledby="break-alert-title"
      aria-modal="true"
    >
      <header className="shrink-0 w-full flex items-center justify-center px-margin-mobile sm:px-6 md:px-10 pt-safe h-14 sm:h-16 border-b border-outline-variant/50 bg-background">
        <div className="flex items-center gap-2 min-w-0 max-w-full">
          <Icon name="token" filled className="text-primary-fixed text-xl sm:text-2xl shrink-0" />
          <h1
            id="break-alert-title"
            className="font-headline-md text-headline-md text-primary-fixed text-center truncate"
          >
            Goblin Maintenance Required
          </h1>
        </div>
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto w-full px-margin-mobile sm:px-6 md:px-10 py-md flex flex-col items-center gap-md">
        <div className="text-center shrink-0 w-full max-w-lg">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-base text-balance">
            Chair fusion approaching critical levels.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {workouts.length === 1
              ? "1 quest awaits."
              : `${workouts.length} quests await.`}
          </p>
        </div>

        <ul className="w-full max-w-md md:max-w-lg flex flex-col gap-sm shrink-0">
          {workouts.map((workout, index) => (
            <li
              key={workout.id}
              className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-sm sm:p-md flex items-center gap-sm sm:gap-md"
            >
              <span className="font-label-bold text-label-bold text-primary-fixed w-5 sm:w-6 shrink-0 text-center text-sm sm:text-base">
                {index + 1}
              </span>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 border-primary-container goblin-glow">
                <img
                  alt={`${workout.goblinName} preview`}
                  className="w-full h-full object-cover"
                  src={getWorkoutPreviewImage(workout)}
                />
              </div>
              <div className="flex flex-col justify-center min-w-0 flex-1">
                <h3 className="font-headline-md text-base sm:text-headline-md text-on-surface truncate">
                  {workout.goblinName}
                </h3>
                <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant mt-xs truncate">
                  {workout.realName} · {formatDuration(workout.durationSec)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="shrink-0 w-full px-margin-mobile sm:px-6 md:px-10 pt-sm pb-[max(1.25rem,env(safe-area-inset-bottom))] bg-background border-t border-outline-variant flex flex-col gap-sm max-w-lg md:max-w-xl mx-auto">
        <button
          type="button"
          onClick={onStart}
          className="w-full min-h-[48px] sm:min-h-[52px] bg-primary-container text-on-primary-container font-label-bold text-label-bold py-md px-lg rounded-full goblin-glow hover:opacity-90 active:scale-[0.98] transition-all text-sm sm:text-base"
        >
          Restore Goblin Mobility
        </button>
        <button
          type="button"
          onClick={onSnooze}
          className="w-full min-h-[44px] bg-surface-container-high border border-outline-variant text-on-surface font-label-bold text-label-bold py-sm px-lg rounded-full hover:border-primary-container active:scale-[0.98] transition-all text-sm sm:text-base"
        >
          Ignore Problems Briefly (snooze 5m)
        </button>
      </footer>
    </div>
  );
}
