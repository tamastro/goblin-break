import { useCallback, useState } from "react";
import type { Workout } from "../data/workouts";
import { titleForXp, type GoblinTitle } from "../data/titles";
import {
  applyBreakCompletion,
  loadProgress,
  saveProgress,
  type Progress,
} from "../lib/storage";

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());

  const title: GoblinTitle = titleForXp(progress.xp);

  const recordCompletion = useCallback((workout: Workout) => {
    setProgress((prev) => {
      const next = applyBreakCompletion(prev, workout);
      saveProgress(next);
      return next;
    });
  }, []);

  return {
    xp: progress.xp,
    streakDays: progress.streakDays,
    totalBreaks: progress.totalBreaks,
    title,
    recordCompletion,
  };
}
