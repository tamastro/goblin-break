export interface GoblinTitle {
  id: string;
  name: string;
  minXp: number;
}

export const TITLES: GoblinTitle[] = [
  { id: "cave-goblin", name: "Cave Goblin", minXp: 0 },
  { id: "loot-hoarder", name: "Loot Hoarder", minXp: 100 },
  { id: "posture-wizard", name: "Posture Wizard", minXp: 300 },
  { id: "dungeon-survivor", name: "Dungeon Survivor", minXp: 700 },
  { id: "chair-escape-artist", name: "Chair Escape Artist", minXp: 1500 },
];

export function titleForXp(xp: number): GoblinTitle {
  let current = TITLES[0]!;
  for (const t of TITLES) {
    if (xp >= t.minXp) current = t;
  }
  return current;
}
