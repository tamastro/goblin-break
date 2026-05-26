import type { Workout, WorkoutCategory } from "../data/workouts";

const CATEGORY_ICONS: Record<WorkoutCategory, string> = {
  neck: "accessibility_new",
  arms: "back_hand",
  core: "landscape",
  legs: "directions_run",
  cozy: "spa",
};

export function categoryIcon(category: WorkoutCategory): string {
  return CATEGORY_ICONS[category];
}

export function formatDuration(sec: number): string {
  if (sec < 60) return `${sec}s`;
  const m = Math.round(sec / 60);
  return `${m}m`;
}

export function intensityDescription(workout: Workout): string {
  return workout.voiceLine;
}
