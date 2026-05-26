export type NotifPermission = NotificationPermission | "unsupported";

export function getNotifPermission(): NotifPermission {
  if (typeof Notification === "undefined") return "unsupported";
  return Notification.permission;
}

export async function requestNotifPermission(): Promise<NotifPermission> {
  if (typeof Notification === "undefined") return "unsupported";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return Notification.requestPermission();
}

export function canNotify(): boolean {
  return getNotifPermission() === "granted";
}
