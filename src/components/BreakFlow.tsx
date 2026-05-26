import { useState } from "react";
import type { Workout } from "../data/workouts";
import { QuestModal } from "./QuestModal";
import { WorkoutComplete } from "./WorkoutComplete";
import { WorkoutExecution } from "./WorkoutExecution";

type Phase = "alert" | "execution" | "complete";

const QUEST_TOTAL = 5;

export function BreakFlow({
  workout,
  questIndex,
  totalBreaks,
  onWorkoutFinished,
  onExit,
  onSnooze,
  onDismiss,
}: {
  workout: Workout;
  questIndex: number;
  totalBreaks: number;
  onWorkoutFinished: () => void;
  onExit: () => void;
  onSnooze: () => void;
  onDismiss: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("alert");
  const [questsCompleted, setQuestsCompleted] = useState(totalBreaks);

  const handleExecutionDone = () => {
    onWorkoutFinished();
    setQuestsCompleted(totalBreaks + 1);
    setPhase("complete");
  };

  if (phase === "complete") {
    return (
      <WorkoutComplete
        xpEarned={workout.xp}
        questsCompleted={questsCompleted}
        onReturn={onExit}
      />
    );
  }

  if (phase === "execution") {
    return (
      <WorkoutExecution
        workout={workout}
        questIndex={questIndex}
        questTotal={QUEST_TOTAL}
        onDone={handleExecutionDone}
        onClose={onDismiss}
      />
    );
  }

  return (
    <QuestModal
      workout={workout}
      onStart={() => setPhase("execution")}
      onSnooze={onSnooze}
    />
  );
}
