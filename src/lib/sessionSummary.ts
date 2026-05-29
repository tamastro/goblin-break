import type { ExerciseCategory } from "../data/exerciseCategories";
import { getIntensityPreset, type IntensityId } from "../data/intensity";
import { randomCompletionMessage } from "../data/completionMessages";
import type { Workout } from "../data/workouts";

const CATEGORY_ORDER: ExerciseCategory[] = [
  "posture",
  "shoulder_chest",
  "mobility",
  "spine",
  "hip",
  "leg",
  "cardio",
  "circulation",
];

const RESTORATION_LABELS: Record<ExerciseCategory, string> = {
  posture: "Posture restored",
  shoulder_chest: "Upper body restored",
  mobility: "Mobility restored",
  spine: "Spine restored",
  hip: "Hip mobility restored",
  leg: "Lower body restored",
  cardio: "Cardiovascular system activated",
  circulation: "Circulation restored",
};

export interface SessionSummary {
  completionMessage: string;
  exerciseCount: number;
  movementDurationSec: number;
  restoredSystems: string[];
}

export function formatMovementDuration(totalSec: number): string {
  if (totalSec < 60) return `${totalSec}s movement`;
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  if (seconds === 0) return `${minutes}m movement`;
  return `${minutes}m ${seconds}s movement`;
}

function exerciseCountLabel(count: number): string {
  return count === 1 ? "1 exercise completed" : `${count} exercises completed`;
}

function categoriesForSession(
  workouts: Workout[],
  intensityId: IntensityId
): ExerciseCategory[] {
  const preset = getIntensityPreset(intensityId);
  const fromFormula = preset.categorySlots.slice(0, workouts.length);
  if (fromFormula.length === workouts.length) {
    return fromFormula;
  }

  const seen = new Set<ExerciseCategory>();
  const derived: ExerciseCategory[] = [];
  for (const workout of workouts) {
    for (const slot of workout.slots) {
      if (!seen.has(slot)) {
        seen.add(slot);
        derived.push(slot);
      }
    }
  }
  return CATEGORY_ORDER.filter((slot) => seen.has(slot));
}

export function buildSessionSummary(
  workouts: Workout[],
  intensityId: IntensityId
): SessionSummary {
  const categories = categoriesForSession(workouts, intensityId);
  const restoredSystems = CATEGORY_ORDER.filter((slot) => categories.includes(slot)).map(
    (slot) => RESTORATION_LABELS[slot]
  );

  const movementDurationSec = workouts.reduce((sum, w) => sum + w.durationSec, 0);

  return {
    completionMessage: randomCompletionMessage(),
    exerciseCount: workouts.length,
    movementDurationSec,
    restoredSystems,
  };
}

export function sessionSummaryLines(summary: SessionSummary): string[] {
  return [
    exerciseCountLabel(summary.exerciseCount),
    formatMovementDuration(summary.movementDurationSec),
    ...summary.restoredSystems,
  ];
}
