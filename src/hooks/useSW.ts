import { useCallback, useEffect, useRef, useState } from "react";

export interface SWState {
  nextBreakAt: number | null;
  intervalMs: number;
  isRunning: boolean;
}

export type SWMessage =
  | { type: "BREAK"; workoutId: string }
  | { type: "BREAK_DONE"; workoutId: string }
  | { type: "STATE"; nextBreakAt: number | null; intervalMs: number; isRunning: boolean };

interface LocalSchedule {
  nextBreakAt: number;
  intervalMs: number;
}

async function postToSW(msg: object): Promise<boolean> {
  if (!("serviceWorker" in navigator)) return false;

  try {
    const reg = await navigator.serviceWorker.ready;

    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(msg);
      return true;
    }

    if (reg.active) {
      reg.active.postMessage(msg);
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

export function useSW(onMessage: (msg: SWMessage) => void) {
  const [swReady, setSwReady] = useState(false);
  const [state, setState] = useState<SWState>({
    nextBreakAt: null,
    intervalMs: 30 * 60 * 1000,
    isRunning: false,
  });
  const [localSchedule, setLocalSchedule] = useState<LocalSchedule | null>(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const mergedState: SWState = localSchedule
    ? {
        nextBreakAt: localSchedule.nextBreakAt,
        intervalMs: localSchedule.intervalMs,
        isRunning: true,
      }
    : state;

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleMessage = (event: MessageEvent) => {
      const data = event.data as SWMessage | undefined;
      if (!data?.type) return;

      if (data.type === "STATE") {
        setState({
          nextBreakAt: data.nextBreakAt,
          intervalMs: data.intervalMs,
          isRunning: data.isRunning,
        });
        // Keep localSchedule as source of truth while running — do not clear on SW sync
      }

      onMessageRef.current(data);
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);

    const connect = async () => {
      const reg = await navigator.serviceWorker.ready;
      setSwReady(!!reg.active);
      await postToSW({ type: "PING" });

      if ("periodicSync" in reg) {
        try {
          const status = await navigator.permissions.query({
            name: "periodic-background-sync" as PermissionName,
          });
          if (status.state === "granted") {
            await (
              reg as ServiceWorkerRegistration & {
                periodicSync: {
                  register: (tag: string, opts: { minInterval: number }) => Promise<void>;
                };
              }
            ).periodicSync.register("goblin-break-check", {
              minInterval: 10 * 60 * 1000,
            });
          }
        } catch {
          // Periodic sync not supported
        }
      }
    };

    connect();
    navigator.serviceWorker.addEventListener("controllerchange", connect);

    return () => {
      navigator.serviceWorker.removeEventListener("message", handleMessage);
      navigator.serviceWorker.removeEventListener("controllerchange", connect);
    };
  }, []);

  const startTimer = useCallback(async (intervalMs: number) => {
    const nextBreakAt = Date.now() + intervalMs;

    // Always update UI immediately — do not wait for the service worker
    setLocalSchedule({ nextBreakAt, intervalMs });

    const ok = await postToSW({ type: "START_TIMER", payload: { intervalMs } });
    if (ok) {
      await postToSW({ type: "PING" });
    }
  }, []);

  const stopTimer = useCallback(async () => {
    setLocalSchedule(null);
    setState((prev) => ({
      ...prev,
      nextBreakAt: null,
      isRunning: false,
    }));
    await postToSW({ type: "STOP_TIMER" });
    await postToSW({ type: "PING" });
  }, []);

  const snooze = useCallback(async (intervalMs = 5 * 60 * 1000) => {
    const nextBreakAt = Date.now() + intervalMs;
    setLocalSchedule({ nextBreakAt, intervalMs });

    const ok = await postToSW({ type: "SNOOZE" });
    if (ok) {
      await postToSW({ type: "PING" });
    }
  }, []);

  const ping = useCallback(async () => {
    await postToSW({ type: "PING" });
  }, []);

  return {
    swReady,
    state: mergedState,
    isLocalTimer: localSchedule != null,
    startTimer,
    stopTimer,
    snooze,
    ping,
  };
}
