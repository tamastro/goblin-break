import { useEffect, useState } from "react";
import { Icon } from "./Icon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem("gmb:install-dismissed") === "1"
  );
  const [installed, setInstalled] = useState(isStandalone);

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || dismissed || !deferred) return null;

  const handleInstall = async () => {
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") {
      setDeferred(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("gmb:install-dismissed", "1");
    setDismissed(true);
    setDeferred(null);
  };

  return (
    <div className="w-full max-w-md bg-surface-container-high border border-primary-container/40 rounded-xl p-md flex flex-col gap-sm">
      <div className="flex items-start gap-sm">
        <Icon name="download" filled className="text-primary-container text-2xl shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="font-label-bold text-label-bold text-on-surface">Install Goblin Mode Break</p>
          <p className="font-body-md text-body-md text-on-surface-variant text-pretty mt-xs">
            Add to your home screen for break reminders and a full-screen app experience.
          </p>
        </div>
      </div>
      <div className="flex gap-sm">
        <button
          type="button"
          onClick={handleInstall}
          className="flex-1 min-h-[44px] bg-primary-container text-on-primary-container font-label-bold text-label-bold rounded-full px-md py-sm"
        >
          Install
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="min-h-[44px] px-md py-sm font-label-bold text-label-bold text-on-surface-variant rounded-full border border-outline-variant"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
