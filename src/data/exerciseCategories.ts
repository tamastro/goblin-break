/** Category slots used by the break-session generator (not UI body regions). */
export type ExerciseCategory =
  | "posture"
  | "shoulder_chest"
  | "mobility"
  | "hip"
  | "spine"
  | "leg"
  | "circulation"
  | "cardio";

export const EXERCISE_CATEGORY_LABELS: Record<ExerciseCategory, string> = {
  posture: "Posture",
  shoulder_chest: "Shoulder / Chest",
  mobility: "Mobility",
  hip: "Hip",
  spine: "Spine",
  leg: "Leg",
  circulation: "Circulation",
  cardio: "Cardio",
};
