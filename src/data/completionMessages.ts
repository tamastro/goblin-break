const COMPLETION_MESSAGES = [
  "Goblin Maintenance Complete",
  "Mobility Restoration Successful",
  "Chair Fusion Prevented",
  "Goblin Systems Stabilized",
  "Sitting Successfully Interrupted",
  "Desk Goblin Neutralized",
  "Body Systems Back Online",
] as const;

export function randomCompletionMessage(): string {
  const index = Math.floor(Math.random() * COMPLETION_MESSAGES.length);
  return COMPLETION_MESSAGES[index]!;
}
