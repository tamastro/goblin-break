/** Calendar day key in local timezone (YYYY-MM-DD). */
export function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function previousDayKey(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  const prev = new Date(y!, m! - 1, d!);
  prev.setDate(prev.getDate() - 1);
  return dayKey(prev);
}

export function updateStreak(
  streakDays: number,
  lastBreakISO: string | null,
  now: Date
): { streakDays: number; lastBreakISO: string } {
  const today = dayKey(now);

  if (!lastBreakISO) {
    return { streakDays: 1, lastBreakISO: now.toISOString() };
  }

  const lastDay = dayKey(new Date(lastBreakISO));

  if (lastDay === today) {
    return { streakDays, lastBreakISO: now.toISOString() };
  }

  if (previousDayKey(today) === lastDay) {
    return { streakDays: streakDays + 1, lastBreakISO: now.toISOString() };
  }

  return { streakDays: 1, lastBreakISO: now.toISOString() };
}
