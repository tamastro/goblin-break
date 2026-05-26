export const REMINDER_LINES = [
  "Goblin posture detected.",
  "Your spine is becoming legendary loot.",
  "Rare mobility event spawned.",
  "You have been sitting for 73 years.",
  "Desk goblin mode: CRITICAL.",
  "A wild stretch opportunity appeared.",
  "Your chair is absorbing your life force.",
  "The dungeon master demands movement.",
  "AFK too long. Goblin curse intensifying.",
  "Loot drop: one (1) micro workout.",
];

export function randomReminder(): string {
  return REMINDER_LINES[Math.floor(Math.random() * REMINDER_LINES.length)]!;
}
