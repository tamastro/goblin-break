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
    <section className="flex flex-col items-center justify-center pt-xl pb-md w-full relative">
      <div className="relative flex flex-col items-center justify-center p-md rounded-full w-64 h-64 border-4 border-primary-container goblin-glow-intense bg-surface-container-lowest">
        <h1
          className="font-display-lg text-display-lg text-primary-fixed tracking-tighter tabular-nums transition-opacity duration-1000"
          style={{ opacity: isRunning ? 1 : 0.85 }}
        >
          {display}
        </h1>
        <p className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest mt-xs">
          {isRunning ? "Next Goblin Incident" : "Ready to Spawn"}
        </p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="mt-lg px-xl py-md bg-primary-container text-on-primary-fixed font-label-bold text-label-bold rounded-full uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-200 goblin-glow hard-depth border-2 border-transparent"
      >
        {isRunning ? "Pause" : "Start Raid"}
      </button>
    </section>
  );
}
