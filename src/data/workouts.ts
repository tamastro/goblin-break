export type WorkoutCategory = "neck" | "arms" | "core" | "legs" | "cozy";
export type Difficulty = 1 | 2 | 3;

export interface Workout {
  id: string;
  goblinName: string;
  realName: string;
  category: WorkoutCategory;
  durationSec: number;
  difficulty: Difficulty;
  xp: number;
  voiceLine: string;
}

function w(
  id: string,
  goblinName: string,
  realName: string,
  category: WorkoutCategory,
  durationSec: number,
  difficulty: Difficulty,
  voiceLine: string
): Workout {
  const xp = difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20;
  return { id, goblinName, realName, category, durationSec, difficulty, xp, voiceLine };
}

export const WORKOUTS: Workout[] = [
  // Neck / Posture (5)
  w("cursed-owl", "Cursed Owl Rotation", "Neck Rolls", "neck", 30, 1, "Rotate thy cursed neck. The dungeon demands it."),
  w("anti-hunch", "Anti-Hunch Ritual", "Shoulder Blade Squeeze", "neck", 30, 1, "Squeeze the blades. Banish the hunch demon."),
  w("cave-entrance", "Cave Entrance Opener", "Chest Stretch", "neck", 45, 2, "Open the chest vault. Loot your posture back."),
  w("goblin-armor", "Goblin Armor Reset", "Shoulder Rolls", "neck", 30, 1, "Reset the shoulder plates. Clank responsibly."),
  w("spine-awakening", "Spine Awakening", "Thoracic Stretch", "neck", 40, 2, "Awaken the ancient spine. It has been sleeping for 73 years."),

  // Arms / Wrists (3)
  w("loot-grabbers", "Loot Grabbers", "Wrist Stretch", "arms", 25, 1, "Stretch the loot grabbers. They have been grinding."),
  w("potion-stirrer", "Potion Stirrer", "Wrist Circles", "arms", 30, 1, "Stir the mana. Circles only. No spills."),
  w("keyboard-exorcism", "Keyboard Exorcism", "Finger Stretch", "arms", 20, 1, "Exorcise the keyboard curse. Wiggle thy digits."),

  // Core / Hips (4)
  w("dungeon-twist", "Dungeon Twist", "Torso Twist", "core", 35, 2, "Twist like you dodged a mimic. Feel the core loot drop."),
  w("goblin-wiggle", "Goblin Wiggle", "Hip Circles", "core", 30, 1, "Wiggle the goblin hips. Maximum chaos, minimum effort."),
  w("sewer-cat", "Sewer Cat Stretch", "Cat-Cow", "core", 40, 2, "Channel your inner sewer cat. Arch. Collapse. Repeat."),
  w("troll-bridge", "Troll Bridge", "Glute Bridge", "core", 45, 2, "Hold the troll bridge. Do not let the trolls cross."),

  // Legs (3)
  w("xp-squats", "XP Squats", "Squats", "legs", 45, 2, "Farm XP with thy legs. Ten reps. No AFK."),
  w("gold-farmer", "Gold Farmer Steps", "March in Place", "legs", 30, 1, "March for gold. Blood flow is the real currency."),
  w("tiny-leg-day", "Tiny Leg Day", "Calf Raises", "legs", 45, 2, "It is tiny leg day. Rise on thy goblin toes."),

  // Cozy (3)
  w("campfire-breathing", "Campfire Breathing", "Deep Breathing", "cozy", 30, 1, "Breathe by the campfire. The raid can wait."),
  w("mana-recharge", "Mana Recharge", "Eye Relaxation", "cozy", 20, 1, "Recharge mana through thy eye orbs. Look far. Blink."),
  w("afk-ritual", "AFK Ritual", "Full Body Stretch", "cozy", 40, 1, "Perform the sacred AFK ritual. Stretch everything."),
];

export function getWorkoutById(id: string): Workout | undefined {
  return WORKOUTS.find((x) => x.id === id);
}

/** @deprecated Use randomWorkoutForIntensity from ./intensity */
export function randomWorkout(): Workout {
  return WORKOUTS[Math.floor(Math.random() * WORKOUTS.length)]!;
}
