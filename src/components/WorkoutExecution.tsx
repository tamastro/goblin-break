import type { Workout } from "../data/workouts";
import { getWorkoutIllustration } from "../data/workoutImages";
import { useWorkoutCountdown } from "../hooks/useWorkoutCountdown";
import { Icon } from "./Icon";

export function WorkoutExecution({
  workout,
  questIndex,
  questTotal,
  onDone,
  onClose,
}: {
  workout: Workout;
  questIndex: number;
  questTotal: number;
  onDone: () => void;
  onClose: () => void;
}) {
  const { display, finished } = useWorkoutCountdown(workout.durationSec, workout.id);
  const progressPct = Math.round(((questIndex - 1) / questTotal) * 100);

  return (
    <div className="fixed inset-0 z-[100] bg-background text-on-background font-body-md overflow-hidden antialiased">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(186,245,23,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(107,255,143,0.02)_0%,transparent_50%)]" />
      </div>

      <main className="w-full max-w-[480px] h-[100dvh] mx-auto flex flex-col relative px-margin-mobile py-base overflow-hidden">
        <header className="flex justify-between items-center w-full mb-base z-10 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container border border-surface-variant text-on-surface-variant hover:text-primary-fixed transition-colors"
            aria-label="Close workout"
          >
            <Icon name="close" />
          </button>
          <div className="flex flex-col items-center">
            <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest mb-xs">
              Quest {questIndex} / {questTotal}
            </span>
            <div className="h-2 w-24 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-container to-tertiary-container rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container border border-surface-variant text-on-surface-variant hover:text-primary-fixed transition-colors opacity-50 cursor-not-allowed"
            aria-label="Sound (coming soon)"
            disabled
          >
            <Icon name="volume_up" />
          </button>
        </header>

        <div className="flex justify-center mb-base relative z-10 shrink-0">
          <div className="w-24 h-24 rounded-full border-[6px] border-primary-container timer-circle flex items-center justify-center bg-surface-container-lowest relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-container opacity-5" />
            <span
              className={`font-headline-lg-mobile text-headline-lg-mobile tracking-tighter tabular-nums ${
                finished ? "text-error animate-pulse" : "text-primary-fixed"
              }`}
            >
              {display}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10 min-h-0">
          <div className="w-full max-w-[200px] aspect-square relative mb-base shrink min-h-0">
            <img
              alt={`${workout.goblinName} illustration`}
              className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-20 relative"
              src={getWorkoutIllustration(workout)}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary-container rounded-full blur-[80px] opacity-20 z-0" />
          </div>

          <div className="w-full bg-surface-container-lowest border border-surface-variant rounded-xl p-md flex flex-col items-center text-center shadow-lg relative overflow-y-auto shrink max-h-[40vh]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container to-tertiary-container" />
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-xs">
              {workout.goblinName}
            </h1>
            <h2 className="font-headline-md text-headline-md text-on-surface-variant mb-base opacity-80">
              {workout.realName}
            </h2>
            <div className="w-full h-px bg-surface-variant mb-base" />
            <p className="font-body-md text-body-md text-on-surface text-balance">{workout.voiceLine}</p>
          </div>
        </div>

        <div className="w-full mt-base pb-safe z-10 shrink-0">
          <button
            type="button"
            onClick={onDone}
            className="w-full h-14 bg-primary-container text-on-primary-fixed font-headline-md text-headline-md rounded-lg flex items-center justify-center bounce-press transition-transform shadow-[0_0_20px_rgba(186,245,23,0.15)] hover:shadow-[0_0_25px_rgba(186,245,23,0.3)] goblin-glow"
          >
            DONE
            <Icon name="check_circle" filled className="ml-2 text-2xl" />
          </button>
        </div>
      </main>
    </div>
  );
}
