/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { randomWorkoutForIntensity, type IntensityId } from "./data/intensity";
import { getWorkoutById } from "./data/workouts";
import { randomReminder } from "./data/reminders";

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

const STORE = "goblin-break-state";
const DB_NAME = "goblin-break-db";
const NOTIF_TAG = "goblin-break";

let nextBreakAt: number | null = null;
let intervalMs = 30 * 60 * 1000;
let breakTimer: ReturnType<typeof setTimeout> | null = null;
let pendingWorkoutId: string | null = null;

function readIntensityId(): IntensityId {
  try {
    const raw = localStorage.getItem("gmb:settings");
    if (!raw) return "standard";
    const parsed = JSON.parse(raw) as { intensityId?: IntensityId };
    return parsed.intensityId ?? "standard";
  } catch {
    return "standard";
  }
}

function pickWorkout() {
  return randomWorkoutForIntensity(readIntensityId());
}

async function openDB(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

async function dbGet(key: string): Promise<unknown> {
  const db = await openDB();
  return new Promise((res) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(key);
    req.onsuccess = () => res(req.result ?? null);
    req.onerror = () => res(null);
  });
}

async function dbSet(key: string, value: unknown): Promise<void> {
  const db = await openDB();
  return new Promise((res) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(value, key);
    tx.oncomplete = () => res();
  });
}

async function dbDel(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((res) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(key);
    tx.oncomplete = () => res();
  });
}

async function broadcast(msg: object): Promise<void> {
  const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
  for (const client of clients) {
    client.postMessage(msg);
  }
}

function broadcastState(): void {
  void broadcast({
    type: "STATE",
    nextBreakAt,
    intervalMs,
    isRunning: nextBreakAt != null,
  });
}

async function showBreakNotification(workoutId: string): Promise<void> {
  const workout = getWorkoutById(workoutId) ?? pickWorkout();
  pendingWorkoutId = workout.id;
  const reminder = randomReminder();

  const options: NotificationOptions & {
    vibrate?: number[];
    actions?: { action: string; title: string }[];
  } = {
    body: `${workout.goblinName} — ${workout.realName} (${workout.durationSec}s)`,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: NOTIF_TAG,
    vibrate: [200, 100, 200],
    actions: [
      { action: "done", title: "Done" },
      { action: "snooze", title: "Snooze 5m" },
    ],
    data: { workoutId: workout.id },
  };
  await self.registration.showNotification(reminder, options);
}

async function fireBreak(): Promise<void> {
  const workout = pickWorkout();
  pendingWorkoutId = workout.id;
  await showBreakNotification(workout.id);
  await broadcast({ type: "BREAK", workoutId: workout.id });
  broadcastState();
}

function scheduleNext(ms: number): void {
  if (breakTimer) clearTimeout(breakTimer);
  nextBreakAt = Date.now() + ms;
  void dbSet("nextBreakAt", nextBreakAt);
  void dbSet("intervalMs", intervalMs);
  broadcastState();

  breakTimer = setTimeout(async () => {
    await fireBreak();
    scheduleNext(intervalMs);
  }, ms);
}

function cancelTimer(): void {
  if (breakTimer) clearTimeout(breakTimer);
  breakTimer = null;
  nextBreakAt = null;
  pendingWorkoutId = null;
  void dbDel("nextBreakAt");
  void dbDel("intervalMs");
  broadcastState();
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();

      const savedNext = (await dbGet("nextBreakAt")) as number | null;
      const savedInterval = (await dbGet("intervalMs")) as number | null;

      if (savedNext && savedInterval) {
        intervalMs = savedInterval;
        const remaining = savedNext - Date.now();
        if (remaining > 0) {
          scheduleNext(remaining);
        } else {
          await fireBreak();
          scheduleNext(savedInterval);
        }
      }
    })()
  );
});

self.addEventListener("message", (event) => {
  const { type, payload } = (event.data ?? {}) as {
    type?: string;
    payload?: { intervalMs?: number };
  };

  const replyState = () => {
    const msg = {
      type: "STATE",
      nextBreakAt,
      intervalMs,
      isRunning: nextBreakAt != null,
    };
    if (event.source && "postMessage" in event.source) {
      (event.source as Client).postMessage(msg);
    } else {
      void broadcast(msg);
    }
  };

  switch (type) {
    case "START_TIMER": {
      intervalMs = payload?.intervalMs ?? intervalMs;
      scheduleNext(intervalMs);
      replyState();
      break;
    }
    case "STOP_TIMER": {
      cancelTimer();
      replyState();
      break;
    }
    case "SNOOZE": {
      scheduleNext(5 * 60 * 1000);
      replyState();
      break;
    }
    case "PING": {
      replyState();
      break;
    }
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const action = event.action;
  const workoutId =
    (event.notification.data as { workoutId?: string } | undefined)?.workoutId ??
    pendingWorkoutId ??
    pickWorkout().id;

  if (action === "snooze") {
    scheduleNext(5 * 60 * 1000);
    return;
  }

  if (action === "done") {
    void broadcast({ type: "BREAK_DONE", workoutId });
  }

  event.waitUntil(
    (async () => {
      const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      if (clients.length > 0) {
        await clients[0]!.focus();
        await broadcast({ type: "BREAK", workoutId });
      } else {
        await self.clients.openWindow("/");
        await broadcast({ type: "BREAK", workoutId });
      }
    })()
  );
});

self.addEventListener("periodicsync", (event) => {
  const ev = event as ExtendableEvent & { tag: string };
  if (ev.tag !== "goblin-break-check") return;

  ev.waitUntil(
    (async () => {
      const savedNext = (await dbGet("nextBreakAt")) as number | null;
      if (savedNext && Date.now() >= savedNext) {
        await fireBreak();
        const saved = (await dbGet("intervalMs")) as number | null;
        if (saved) scheduleNext(saved);
      }
    })()
  );
});
