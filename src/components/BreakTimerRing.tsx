import { formatTime } from "../hooks/useTimer";

const SIZE = 192;
const STROKE = 12;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

export function BreakTimerRing({
  secondsLeft,
  totalSeconds,
}: {
  secondsLeft: number;
  totalSeconds: number;
}) {
  const progress = totalSeconds > 0 ? secondsLeft / totalSeconds : 0;
  const offset = C * (1 - progress);

  return (
    <div className="relative w-48 h-48 rounded-full border-[12px] border-surface-container-high flex items-center justify-center animate-pulse-glow">
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          className="text-surface-container-high"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          className="text-primary-fixed"
          strokeDasharray={C}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <div className="absolute inset-[14px] rounded-full bg-background" />
      <span className="relative z-10 font-display-lg text-display-lg text-primary-fixed tabular-nums">
        {formatTime(secondsLeft)}
      </span>
    </div>
  );
}
