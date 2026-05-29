import { useEffect, useState } from "react";
import type { IntensityId } from "../data/intensity";
import type { Workout } from "../data/workouts";
import { buildSessionSummary, type SessionSummary } from "../lib/sessionSummary";
import { QuestModal } from "./QuestModal";
import { WorkoutComplete } from "./WorkoutComplete";
import { WorkoutExecution } from "./WorkoutExecution";

type Phase = "alert" | "execution" | "complete";

const AUTO_SNOOZE_MS = 5 * 60 * 1000;

export function BreakFlow({
  workouts,
  intensityId,
  onQuestDone,
  onExit,
  onSnooze,
  onDismiss,
}: {
  workouts: Workout[];
  intensityId: IntensityId;
  onQuestDone: (workout: Workout) => void;
  onExit: () => void;
  onSnooze: () => void;
  onDismiss: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("alert");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionSummary, setSessionSummary] = useState<SessionSummary | null>(null);

  useEffect(() => {
    if (phase !== "alert") return;
    const timer = window.setTimeout(() => {
      onSnooze();
    }, AUTO_SNOOZE_MS);
    return () => window.clearTimeout(timer);
  }, [phase, onSnooze]);

  const handleExecutionDone = () => {
    const workout = workouts[currentIndex];
    if (!workout) return;

    onQuestDone(workout);

    if (currentIndex < workouts.length - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }

    setSessionSummary(buildSessionSummary(workouts, intensityId));
    setPhase("complete");
  };

  if (phase === "complete" && sessionSummary) {
    return (
      <WorkoutComplete summary={sessionSummary} onReturn={onExit} />
    );
  }

  if (phase === "execution") {
    const workout = workouts[currentIndex];
    if (!workout) return null;

    return (
      <WorkoutExecution
        key={workout.id}
        workout={workout}
        questIndex={currentIndex + 1}
        questTotal={workouts.length}
        onDone={handleExecutionDone}
        onClose={onDismiss}
      />
    );
  }

  return (
    <QuestModal
      workouts={workouts}
      onStart={() => {
        setCurrentIndex(0);
        setPhase("execution");
      }}
      onSnooze={onSnooze}
    />
  );
}
