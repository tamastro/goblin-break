import type { Settings } from "./storage";

export async function syncSettingsToSW(settings: Settings): Promise<void> {
  if (!("serviceWorker" in navigator)) return;

  try {
    const reg = await navigator.serviceWorker.ready;
    const target = reg.active ?? navigator.serviceWorker.controller;
    target?.postMessage({ type: "SYNC_SETTINGS", payload: settings });
  } catch {
    // SW not available yet
  }
}
