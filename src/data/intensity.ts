import type { Difficulty } from "./workouts";
import { WORKOUTS, type Workout } from "./workouts";

export type IntensityId = "cozy" | "standard" | "intense";

export interface IntensityPreset {
  id: IntensityId;
  name: string;
  description: string;
  durationLabel: string;
  icon: string;
  difficulties: Difficulty[];
}

export const INTENSITY_PRESETS: IntensityPreset[] = [
  {
    id: "cozy",
    name: "Cozy Goblin",
    description: "Min. movement",
    durationLabel: "2m",
    icon: "self_improvement",
    difficulties: [1],
  },
  {
    id: "standard",
    name: "Cave Explorer",
    description: "Standard mobility",
    durationLabel: "5m",
    icon: "hiking",
    difficulties: [1, 2],
  },
  {
    id: "intense",
    name: "Dungeon Survivor",
    description: "High intensity",
    durationLabel: "10m",
    icon: "local_fire_department",
    difficulties: [2, 3],
  },
];

export function filterWorkoutsByIntensity(intensityId: IntensityId): Workout[] {
  const preset = INTENSITY_PRESETS.find((p) => p.id === intensityId) ?? INTENSITY_PRESETS[1]!;
  return WORKOUTS.filter((w) => preset.difficulties.includes(w.difficulty));
}

export function randomWorkoutForIntensity(intensityId: IntensityId = "standard"): Workout {
  const pool = filterWorkoutsByIntensity(intensityId);
  const source = pool.length > 0 ? pool : WORKOUTS;
  return source[Math.floor(Math.random() * source.length)]!;
}
