import { normalizeIntensityId, type IntensityId } from "../data/intensity";
import type { Workout } from "../data/workouts";
import { titleForXp } from "../data/titles";
import { updateStreak } from "./streak";

export interface Progress {
  xp: number;
  streakDays: number;
  lastBreakISO: string | null;
  totalBreaks: number;
  titleId: string;
}

export interface Settings {
  intervalMin: number;
  notificationsEnabled: boolean;
  intensityId: IntensityId;
}

const PROGRESS_KEY = "gmb:progress";
const SETTINGS_KEY = "gmb:settings";

const DEFAULT_PROGRESS: Progress = {
  xp: 0,
  streakDays: 0,
  lastBreakISO: null,
  totalBreaks: 0,
  titleId: "cave-goblin",
};

const DEFAULT_SETTINGS: Settings = {
  intervalMin: 45,
  notificationsEnabled: true,
  intensityId: "cave",
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) } as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadProgress(): Progress {
  return read(PROGRESS_KEY, DEFAULT_PROGRESS);
}

export function saveProgress(progress: Progress): void {
  write(PROGRESS_KEY, progress);
}

export function loadSettings(): Settings {
  const settings = read(SETTINGS_KEY, DEFAULT_SETTINGS);
  return {
    ...settings,
    intensityId: normalizeIntensityId(settings.intensityId),
  };
}

export function saveSettings(settings: Settings): void {
  write(SETTINGS_KEY, settings);
}

export function applyBreakCompletion(
  progress: Progress,
  workout: Workout,
  now = new Date()
): Progress {
  const { streakDays } = updateStreak(
    progress.streakDays,
    progress.lastBreakISO,
    now
  );
  const xp = progress.xp + workout.xp;
  const title = titleForXp(xp);
  return {
    xp,
    streakDays,
    lastBreakISO: now.toISOString(),
    totalBreaks: progress.totalBreaks + 1,
    titleId: title.id,
  };
}
