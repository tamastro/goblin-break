import { useEffect, useState } from "react";
import { formatTime } from "./useTimer";

export function useWorkoutCountdown(durationSec: number, workoutId: string) {
  const [secondsLeft, setSecondsLeft] = useState(durationSec);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setSecondsLeft(durationSec);
    setFinished(false);
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setFinished(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [durationSec, workoutId]);

  return {
    secondsLeft,
    finished,
    display: formatTime(secondsLeft),
  };
}
