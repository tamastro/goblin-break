import type { ExerciseCategory } from "../data/exerciseCategories";
import {
  getIntensityPreset,
  normalizeIntensityId,
  type IntensityId,
} from "../data/intensity";
import { getWorkoutById, getWorkoutsForCategory, type Workout } from "../data/workouts";

const MAX_GENERATION_ATTEMPTS = 64;

function pickRandom<T>(items: T[]): T | undefined {
  if (items.length === 0) return undefined;
  return items[Math.floor(Math.random() * items.length)];
}

function sessionDuration(workouts: Workout[]): number {
  return workouts.reduce((sum, w) => sum + w.durationSec, 0);
}

function fitsDuration(
  workouts: Workout[],
  minSec: number,
  maxSec: number
): boolean {
  const total = sessionDuration(workouts);
  return total >= minSec && total <= maxSec;
}

function pickForSlot(
  slot: ExerciseCategory,
  usedIds: Set<string>,
  preferredId?: string
): Workout | undefined {
  if (preferredId && !usedIds.has(preferredId)) {
    const preferred = getWorkoutById(preferredId);
    if (preferred?.slots.includes(slot)) {
      return preferred;
    }
  }

  const candidates = getWorkoutsForCategory(slot).filter((w) => !usedIds.has(w.id));
  return pickRandom(candidates);
}

function generateBySlots(
  categorySlots: ExerciseCategory[],
  minSec: number,
  maxSec: number,
  leadWorkoutId?: string
): Workout[] | null {
  const lead = leadWorkoutId ? getWorkoutById(leadWorkoutId) : undefined;
  const usedIds = new Set<string>();
  const session: Workout[] = [];

  for (let i = 0; i < categorySlots.length; i++) {
    const slot = categorySlots[i]!;
    const preferredId =
      lead && !usedIds.has(lead.id) && lead.slots.includes(slot) ? lead.id : undefined;

    const workout = pickForSlot(slot, usedIds, preferredId);
    if (!workout) return null;

    session.push(workout);
    usedIds.add(workout.id);
  }

  if (!fitsDuration(session, minSec, maxSec)) return null;
  return session;
}

/** Prefer combinations closest to the midpoint of the target duration band. */
function generateGreedy(
  categorySlots: ExerciseCategory[],
  minSec: number,
  maxSec: number,
  leadWorkoutId?: string
): Workout[] {
  const targetMid = (minSec + maxSec) / 2;
  const lead = leadWorkoutId ? getWorkoutById(leadWorkoutId) : undefined;

  let best: Workout[] = [];
  let bestScore = Number.POSITIVE_INFINITY;

  for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
    const usedIds = new Set<string>();
    const session: Workout[] = [];

    for (const slot of categorySlots) {
      const candidates = getWorkoutsForCategory(slot).filter((w) => !usedIds.has(w.id));
      if (candidates.length === 0) continue;

      const preferredId =
        lead && !usedIds.has(lead.id) && lead.slots.includes(slot) ? lead.id : undefined;

      const workout =
        (preferredId ? candidates.find((c) => c.id === preferredId) : undefined) ??
        pickRandom(candidates);

      if (!workout) continue;
      session.push(workout);
      usedIds.add(workout.id);
    }

    if (session.length !== categorySlots.length) continue;

    const total = sessionDuration(session);
    const inRange = total >= minSec && total <= maxSec;
    const score = inRange
      ? Math.abs(total - targetMid)
      : total < minSec
        ? minSec - total + 1000
        : total - maxSec + 1000;

    if (score < bestScore) {
      bestScore = score;
      best = session;
    }
  }

  return best;
}

/**
 * Category-driven break session generator.
 * One random exercise per required category slot; no full-pool randomness.
 */
export function buildBreakSession(
  intensityId: IntensityId | string,
  leadWorkoutId?: string
): Workout[] {
  const id = normalizeIntensityId(intensityId);
  const preset = getIntensityPreset(id);
  const { categorySlots, targetDurationMinSec, targetDurationMaxSec } = preset;

  if (categorySlots.length === 0) return [];

  for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
    const session = generateBySlots(
      categorySlots,
      targetDurationMinSec,
      targetDurationMaxSec,
      leadWorkoutId
    );
    if (session) return session;
  }

  const greedy = generateGreedy(
    categorySlots,
    targetDurationMinSec,
    targetDurationMaxSec,
    leadWorkoutId
  );

  if (greedy.length === categorySlots.length) {
    return greedy;
  }

  // Last resort: satisfy category coverage even if duration is slightly out of band.
  const usedIds = new Set<string>();
  const fallback: Workout[] = [];
  for (const slot of categorySlots) {
    const workout = pickForSlot(slot, usedIds, leadWorkoutId);
    if (!workout) return fallback;
    fallback.push(workout);
    usedIds.add(workout.id);
  }
  return fallback;
}

export { normalizeIntensityId };
