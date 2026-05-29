import { useEffect, useRef, useState } from "react";
import type { SWState } from "./useSW";

export function useTimer(
  swState: SWState,
  ping: () => void | Promise<void>,
  idleDisplaySec: number
) {
  const [timeLeftSec, setTimeLeftSec] = useState(idleDisplaySec);
  const swStateRef = useRef(swState);
  swStateRef.current = swState;

  useEffect(() => {
    void ping();
    const pingInterval = setInterval(() => void ping(), 30_000);
    return () => clearInterval(pingInterval);
  }, [ping]);

  useEffect(() => {
    const tick = () => {
      const { isRunning, nextBreakAt } = swStateRef.current;

      if (!isRunning || nextBreakAt == null) {
        setTimeLeftSec(idleDisplaySec);
        return;
      }

      const remaining = Math.max(0, Math.ceil((nextBreakAt - Date.now()) / 1000));
      setTimeLeftSec(remaining);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [swState.isRunning, swState.nextBreakAt, idleDisplaySec]);

  const totalSec = Math.ceil(swState.intervalMs / 1000);
  const progress =
    swState.isRunning && totalSec > 0 ? 1 - timeLeftSec / totalSec : 0;

  const displaySec = swState.isRunning ? timeLeftSec : idleDisplaySec;

  return {
    timeLeftSec: displaySec,
    progress,
    isRunning: swState.isRunning,
  };
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
