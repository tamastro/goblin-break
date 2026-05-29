import { useCallback, useEffect, useRef, useState } from "react";
import { BottomNav, type TabId } from "./components/BottomNav";
import { Header } from "./components/Header";
import { HistoryPanel } from "./components/HistoryPanel";
import { IntensityCard } from "./components/IntensityCard";
import { BreakFlow } from "./components/BreakFlow";
import { SettingsPanel } from "./components/SettingsPanel";
import { TimerSection } from "./components/TimerSection";
import { getWorkoutById, type Workout } from "./data/workouts";
import { useProgress } from "./hooks/useProgress";
import { useSW, type SWMessage } from "./hooks/useSW";
import { useTimer } from "./hooks/useTimer";
import { buildBreakSession } from "./lib/breakSession";
import { canNotify, getNotifPermission, requestNotifPermission } from "./lib/notify";
import { loadSettings, saveSettings, type Settings } from "./lib/storage";

export default function App() {
  const { totalBreaks, title, recordCompletion } = useProgress();
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [activeSession, setActiveSession] = useState<Workout[] | null>(null);
  const [notifOk, setNotifOk] = useState(canNotify());
  const [tab, setTab] = useState<TabId>("timer");

  const startBreakSession = useCallback(
    (leadWorkoutId?: string) => {
      const session = buildBreakSession(settings.intensityId, leadWorkoutId);
      if (session.length > 0) {
        setActiveSession(session);
      }
    },
    [settings.intensityId]
  );

  const startTimerRef = useRef<(intervalMs: number) => Promise<void>>(async () => {});
  const isRunningRef = useRef(false);

  const rescheduleTimer = useCallback(async () => {
    if (!isRunningRef.current) return;
    await startTimerRef.current(settings.intervalMin * 60 * 1000);
  }, [settings.intervalMin]);

  const handleSWMessage = useCallback(
    (msg: SWMessage) => {
      if (msg.type === "BREAK") {
        startBreakSession(msg.workoutId);
      }
      if (msg.type === "BREAK_DONE") {
        const workout = getWorkoutById(msg.workoutId);
        if (workout) recordCompletion(workout);
        setActiveSession(null);
        void rescheduleTimer();
      }
    },
    [startBreakSession, recordCompletion, settings.intensityId, rescheduleTimer]
  );

  const { state, isLocalTimer, startTimer, stopTimer, snooze, ping } =
    useSW(handleSWMessage);
  const idleSec = settings.intervalMin * 60;
  const { timeLeftSec, isRunning } = useTimer(state, ping, idleSec);
  const prevTimeLeftRef = useRef(timeLeftSec);

  useEffect(() => {
    startTimerRef.current = startTimer;
    isRunningRef.current = isRunning;
  }, [startTimer, isRunning]);

  // Fire breaks once when local timer crosses to zero (not while stuck at 0 after dismiss)
  useEffect(() => {
    const prev = prevTimeLeftRef.current;
    prevTimeLeftRef.current = timeLeftSec;

    if (!isRunning || !isLocalTimer || activeSession) return;
    if (prev > 0 && timeLeftSec === 0) {
      startBreakSession();
    }
  }, [isRunning, isLocalTimer, timeLeftSec, activeSession, startBreakSession]);

  const handleSaveSettings = (next: Settings) => {
    setSettings(next);
    saveSettings(next);
    if (activeSession && next.intensityId !== settings.intensityId) {
      setActiveSession(buildBreakSession(next.intensityId));
    }
    if (isRunning) {
      startTimer(next.intervalMin * 60 * 1000);
    }
  };

  const handleRequestNotif = async () => {
    const r = await requestNotifPermission();
    setNotifOk(r === "granted");
  };

  const handleToggleTimer = async () => {
    if (isRunning) {
      await stopTimer();
      return;
    }
    const intervalMs = settings.intervalMin * 60 * 1000;
    void startTimer(intervalMs);
    if (!notifOk) {
      void requestNotifPermission().then((r) => setNotifOk(r === "granted"));
    }
  };

  const handleQuestDone = (workout: Workout) => {
    recordCompletion(workout);
  };

  const handleExitBreak = () => {
    setActiveSession(null);
    void rescheduleTimer();
  };

  const handleSnooze = async () => {
    await snooze();
    setActiveSession(null);
  };

  const mainClass =
    tab === "settings"
      ? "w-full max-w-3xl px-margin-mobile sm:px-6 md:px-10 lg:px-margin-desktop pt-md md:pt-lg pb-xl flex-1 flex flex-col gap-xl mx-auto"
      : "w-full max-w-6xl px-margin-mobile sm:px-6 md:px-10 lg:px-margin-desktop pt-lg md:pt-8 pb-xl flex-1 flex flex-col gap-lg items-center relative";

  if (activeSession) {
    return (
      <BreakFlow
        workouts={activeSession}
        intensityId={settings.intensityId}
        onQuestDone={handleQuestDone}
        onExit={handleExitBreak}
        onSnooze={handleSnooze}
        onDismiss={handleExitBreak}
      />
    );
  }

  return (
    <div className="page-full flex flex-col items-center selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden pb-28 md:pb-8 md:pt-16">
      <Header onNotifClick={handleRequestNotif} notifOk={notifOk} />

      <main className={mainClass}>
        {tab === "timer" && (
          <>
            <div className="w-full flex flex-col items-center gap-lg lg:flex-row lg:items-start lg:justify-center lg:gap-xl lg:max-w-4xl">
              <TimerSection
                timeLeftSec={timeLeftSec}
                isRunning={isRunning}
                onToggle={handleToggleTimer}
              />

              <IntensityCard intensityId={settings.intensityId} />
            </div>

            {getNotifPermission() === "denied" && (
              <p className="font-body-md text-error text-center max-w-md w-full">
                Notifications blocked. Enable in browser settings.
              </p>
            )}
          </>
        )}

        {tab === "history" && <HistoryPanel title={title} totalBreaks={totalBreaks} />}

        {tab === "settings" && (
          <SettingsPanel settings={settings} onSave={handleSaveSettings} />
        )}
      </main>

      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
