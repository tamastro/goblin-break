import { Icon } from "./Icon";

export function Header({ onNotifClick, notifOk }: { onNotifClick: () => void; notifOk: boolean }) {
  return (
    <header className="bg-background border-b border-outline-variant flex justify-between items-center w-full px-margin-mobile h-16 z-40 relative shrink-0">
      <button
        type="button"
        onClick={onNotifClick}
        className="flex items-center gap-xs text-primary-fixed hover:opacity-80 transition-opacity"
        aria-label={notifOk ? "Notifications enabled" : "Enable notifications"}
      >
        <Icon name={notifOk ? "notifications_active" : "notifications_off"} filled className="text-2xl" />
      </button>
      <div className="font-headline-md text-headline-md tracking-tighter text-on-surface flex-1 text-center font-bold">
        Goblin Mode
      </div>
      <div className="w-6" aria-hidden />
    </header>
  );
}
