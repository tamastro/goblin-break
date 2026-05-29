import type { ExerciseCategory } from "./exerciseCategories";
import { getWorkoutsForCategory, type Workout } from "./workouts";

export type IntensityId = "cozy" | "cave" | "dungeon" | "raid";

/** @deprecated IDs saved before the category-slot system. */
export type LegacyIntensityId = "standard" | "intense";

export interface IntensityPreset {
  id: IntensityId;
  name: string;
  description: string;
  durationLabel: string;
  icon: string;
  workoutCount: number;
  targetDurationMinSec: number;
  targetDurationMaxSec: number;
  categorySlots: ExerciseCategory[];
}

export const INTENSITY_PRESETS: IntensityPreset[] = [
  {
    id: "cozy",
    name: "Cozy Goblin",
    description: "Bare minimum movement for exhausted desk goblins.",
    durationLabel: "30–45s",
    icon: "self_improvement",
    workoutCount: 2,
    targetDurationMinSec: 30,
    targetDurationMaxSec: 45,
    categorySlots: ["posture", "mobility"],
  },
  {
    id: "cave",
    name: "Cave Explorer",
    description: "Your goblin body has started making concerning noises.",
    durationLabel: "60–90s",
    icon: "hiking",
    workoutCount: 3,
    targetDurationMinSec: 60,
    targetDurationMaxSec: 90,
    categorySlots: ["posture", "mobility", "circulation"],
  },
  {
    id: "dungeon",
    name: "Dungeon Survivor",
    description: "This goblin has not moved voluntarily in several hours.",
    durationLabel: "2–3m",
    icon: "local_fire_department",
    workoutCount: 5,
    targetDurationMinSec: 120,
    targetDurationMaxSec: 180,
    categorySlots: ["posture", "shoulder_chest", "mobility", "leg", "circulation"],
  },
  {
    id: "raid",
    name: "Raid Boss Recovery",
    description: "Emergency restoration protocol for advanced goblin degeneration.",
    durationLabel: "4–5m",
    icon: "bolt",
    workoutCount: 7,
    targetDurationMinSec: 240,
    targetDurationMaxSec: 300,
    categorySlots: [
      "posture",
      "shoulder_chest",
      "spine",
      "hip",
      "leg",
      "cardio",
      "circulation",
    ],
  },
];

export function normalizeIntensityId(
  id: IntensityId | LegacyIntensityId | string | undefined
): IntensityId {
  if (id === "standard") return "cave";
  if (id === "intense") return "dungeon";
  if (id === "cozy" || id === "cave" || id === "dungeon" || id === "raid") return id;
  return "cave";
}

export function getIntensityPreset(intensityId: IntensityId): IntensityPreset {
  return (
    INTENSITY_PRESETS.find((p) => p.id === intensityId) ??
    INTENSITY_PRESETS.find((p) => p.id === "cave")!
  );
}

/** Spotlight / notification preview: random exercise from the first required category slot. */
export function randomWorkoutForIntensity(intensityId: IntensityId = "cave"): Workout {
  const preset = getIntensityPreset(intensityId);
  const firstSlot = preset.categorySlots[0] ?? "posture";
  const pool = getWorkoutsForCategory(firstSlot);
  if (pool.length > 0) {
    return pool[Math.floor(Math.random() * pool.length)]!;
  }
  return getWorkoutsForCategory("mobility")[0]!;
}
