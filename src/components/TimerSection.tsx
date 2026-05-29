import { formatTime } from "../hooks/useTimer";

export function TimerSection({
  timeLeftSec,
  isRunning,
  onToggle,
}: {
  timeLeftSec: number;
  isRunning: boolean;
  onToggle: () => void;
}) {
  const display = formatTime(timeLeftSec);

  return (
    <section className="flex flex-col items-center justify-center pt-md sm:pt-xl pb-md w-full relative lg:flex-1 lg:pt-lg">
      <div className="relative flex flex-col items-center justify-center p-sm sm:p-md rounded-full w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 border-4 border-primary-container goblin-glow-intense bg-surface-container-lowest">
        <h1
          className="font-display-lg text-[2.5rem] sm:text-display-lg text-primary-fixed tracking-tighter tabular-nums transition-opacity duration-1000"
          style={{ opacity: isRunning ? 1 : 0.85 }}
        >
          {display}
        </h1>
        <p className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest mt-xs text-center px-2 text-[11px] sm:text-label-bold">
          {isRunning ? "Next Goblin Incident" : "Ready to Spawn"}
        </p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="mt-md sm:mt-lg px-lg sm:px-xl py-sm sm:py-md bg-primary-container text-on-primary-fixed font-label-bold text-label-bold rounded-full uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-200 goblin-glow hard-depth border-2 border-transparent min-h-[48px] w-full max-w-xs sm:max-w-none sm:w-auto"
      >
        {isRunning ? "Pause" : "Start Raid"}
      </button>
    </section>
  );
}
