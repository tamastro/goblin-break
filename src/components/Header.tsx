import { Icon } from "./Icon";

export function Header({ onNotifClick, notifOk }: { onNotifClick: () => void; notifOk: boolean }) {
  return (
    <header className="bg-background border-b border-outline-variant flex justify-between items-center w-full px-margin-mobile sm:px-6 md:px-10 lg:px-margin-desktop h-14 sm:h-16 pt-safe z-40 relative shrink-0">
      <button
        type="button"
        onClick={onNotifClick}
        className="flex items-center gap-xs text-primary-fixed hover:opacity-80 transition-opacity min-w-[44px] min-h-[44px] justify-center -ml-2"
        aria-label={notifOk ? "Notifications enabled" : "Enable notifications"}
      >
        <Icon name={notifOk ? "notifications_active" : "notifications_off"} filled className="text-2xl" />
      </button>
      <div className="font-headline-md text-headline-md sm:text-headline-lg tracking-tighter text-on-surface flex-1 text-center font-bold truncate px-2">
        Goblin Mode
      </div>
      <div className="w-[44px] shrink-0" aria-hidden />
    </header>
  );
}
