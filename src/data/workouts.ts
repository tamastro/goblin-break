import type { ExerciseCategory } from "./exerciseCategories";

/** UI / asset grouping (legacy display bucket). */
export type WorkoutCategory = "neck" | "arms" | "core" | "legs" | "cozy";
export type Difficulty = 1 | 2 | 3;

export interface Workout {
  id: string;
  goblinName: string;
  realName: string;
  /** Display bucket for icons and images. */
  category: WorkoutCategory;
  /** Generator category slots this exercise can fill. */
  slots: ExerciseCategory[];
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
  slots: ExerciseCategory[],
  durationSec: number,
  difficulty: Difficulty,
  voiceLine: string
): Workout {
  const xp = difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20;
  return { id, goblinName, realName, category, slots, durationSec, difficulty, xp, voiceLine };
}

export const WORKOUTS: Workout[] = [
  // POSTURE
  w(
    "neck-of-damned",
    "Neck of the Damned",
    "Neck Extension",
    "neck",
    ["posture"],
    20,
    1,
    "Extend the damned neck. The chair cannot claim it forever."
  ),
  w(
    "cursed-owl",
    "Cursed Owl Rotation",
    "Neck Rolls",
    "neck",
    ["posture"],
    30,
    1,
    "Rotate thy cursed neck. The dungeon demands it."
  ),
  w(
    "gremlin-scanner",
    "Gremlin Scanner",
    "Neck Side Stretch",
    "neck",
    ["posture"],
    20,
    1,
    "Scan the perimeter. Stretch each side like a suspicious gremlin."
  ),
  w(
    "dungeon-lookout",
    "Dungeon Lookout",
    "Chin Tucks",
    "neck",
    ["posture"],
    20,
    1,
    "Tuck the chin. Spot mimics before they spot you."
  ),
  w(
    "anti-hunch",
    "Anti-Hunch Ritual",
    "Shoulder Blade Squeeze",
    "neck",
    ["posture"],
    30,
    1,
    "Squeeze the blades. Banish the hunch demon."
  ),
  w(
    "goblin-armor",
    "Goblin Armor Reset",
    "Shoulder Rolls",
    "neck",
    ["posture", "shoulder_chest"],
    30,
    1,
    "Reset the shoulder plates. Clank responsibly."
  ),
  w(
    "scroll-reader",
    "Scroll Reader Posture",
    "Upper Back Stretch",
    "neck",
    ["posture"],
    25,
    1,
    "Read the scroll upright. Thy spine thanks thee."
  ),

  // SHOULDER / CHEST
  w(
    "cave-entrance",
    "Cave Entrance Opener",
    "Chest Stretch",
    "neck",
    ["shoulder_chest"],
    35,
    2,
    "Open the chest vault. Loot your posture back."
  ),
  w(
    "mana-channeling",
    "Mana Channeling",
    "Doorway Stretch",
    "arms",
    ["shoulder_chest"],
    35,
    2,
    "Channel mana through the doorway. Shoulders shall comply."
  ),

  // MOBILITY
  w(
    "dungeon-twist",
    "Dungeon Twist",
    "Torso Twist",
    "core",
    ["mobility"],
    35,
    2,
    "Twist like you dodged a mimic. Feel the core loot drop."
  ),
  w(
    "chair-escape",
    "Chair Escape Protocol",
    "Standing Reach",
    "core",
    ["mobility"],
    25,
    1,
    "Execute chair escape protocol. Reach for freedom."
  ),
  w(
    "loot-crate-fold",
    "Loot Crate Fold",
    "Forward Fold",
    "core",
    ["mobility"],
    30,
    1,
    "Fold over the loot crate. Hamstrings optional but encouraged."
  ),
  w(
    "mimic-dodge",
    "Mimic Dodge",
    "Side Bend",
    "core",
    ["mobility"],
    25,
    1,
    "Dodge the mimic. Bend sideways with goblin grace."
  ),
  w(
    "ancient-spine-ritual",
    "Ancient Spine Ritual",
    "Spinal Wave",
    "core",
    ["mobility", "spine"],
    35,
    2,
    "Perform the ancient spine ritual. Wave by wave."
  ),

  // SPINE
  w(
    "spine-awakening",
    "Spine Awakening",
    "Thoracic Stretch",
    "neck",
    ["spine"],
    40,
    2,
    "Awaken the ancient spine. It has been sleeping for 73 years."
  ),
  w(
    "sewer-cat",
    "Sewer Cat Stretch",
    "Cat-Cow",
    "core",
    ["spine"],
    40,
    2,
    "Channel your inner sewer cat. Arch. Collapse. Repeat."
  ),

  // HIP
  w(
    "goblin-wiggle",
    "Goblin Wiggle",
    "Hip Circles",
    "core",
    ["hip", "mobility"],
    30,
    1,
    "Wiggle the goblin hips. Maximum chaos, minimum effort."
  ),
  w(
    "slime-evasion",
    "Slime Evasion",
    "Hip Flexor Stretch",
    "core",
    ["hip"],
    35,
    2,
    "Evade the slime. Stretch the hip flexors or perish."
  ),

  // LEG
  w(
    "xp-squats",
    "XP Squats",
    "Squats",
    "legs",
    ["leg"],
    45,
    2,
    "Farm XP with thy legs. Ten reps. No AFK."
  ),
  w(
    "loot-lunges",
    "Loot Lunges",
    "Lunges",
    "legs",
    ["leg"],
    40,
    2,
    "Lunge for loot. Each rep is a small victory tax."
  ),
  w(
    "tiny-leg-day",
    "Tiny Leg Day",
    "Calf Raises",
    "legs",
    ["leg"],
    35,
    2,
    "It is tiny leg day. Rise on thy goblin toes."
  ),

  // CIRCULATION
  w(
    "gold-farmer",
    "Gold Farmer Steps",
    "March in Place",
    "legs",
    ["circulation"],
    30,
    1,
    "March for gold. Blood flow is the real currency."
  ),
  w(
    "rat-chase",
    "Rat Chase Run",
    "High Knees",
    "legs",
    ["circulation"],
    30,
    2,
    "Chase the rat. Lift those knees like rent is due."
  ),

  // CARDIO
  w(
    "dungeon-sprint",
    "Dungeon Sprint",
    "Jog in Place",
    "legs",
    ["cardio"],
    45,
    3,
    "Sprint the dungeon halls. Cardio is the final boss."
  ),
  w(
    "escape-raid",
    "Escape the Raid",
    "Jumping Jacks",
    "legs",
    ["cardio"],
    45,
    3,
    "Escape the raid. Jack thy body until the party survives."
  ),
  w(
    "trap-dodge-hops",
    "Trap Dodge Hops",
    "Skater Hops",
    "legs",
    ["cardio"],
    40,
    3,
    "Hop like traps line the floor. Dodge. Repeat."
  ),
];

export function getWorkoutById(id: string): Workout | undefined {
  return WORKOUTS.find((x) => x.id === id);
}

export function getWorkoutsForCategory(category: ExerciseCategory): Workout[] {
  return WORKOUTS.filter((workout) => workout.slots.includes(category));
}

/** @deprecated Use randomWorkoutForIntensity from ./intensity */
export function randomWorkout(): Workout {
  return WORKOUTS[Math.floor(Math.random() * WORKOUTS.length)]!;
}
