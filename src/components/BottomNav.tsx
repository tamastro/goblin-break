import { Icon } from "./Icon";

export type TabId = "timer" | "history" | "settings";

export function BottomNav({ active, onChange }: { active: TabId; onChange: (tab: TabId) => void }) {
  const items: { id: TabId; icon: string; label: string }[] = [
    { id: "timer", icon: "timer", label: "Timer" },
    { id: "history", icon: "history", label: "History" },
    { id: "settings", icon: "settings", label: "Settings" },
  ];

  return (
    <>
      <nav className="bg-surface-container text-primary-container fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-md sm:px-lg py-sm pb-safe md:hidden border-t border-outline-variant shadow-[0_-4px_20px_rgba(186,245,23,0.1)] rounded-t-xl">
        {items.map(({ id, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-label={id}
            aria-current={active === id ? "page" : undefined}
            className={
              active === id
                ? "flex items-center justify-center bg-primary-container text-on-primary-container rounded-full w-12 h-12 shadow-[0_0_15px_rgba(186,245,23,0.4)] scale-110"
                : "flex items-center justify-center text-on-surface-variant w-12 h-12 hover:text-primary-fixed-dim transition-colors"
            }
          >
            <Icon name={icon} filled={active === id} className="text-2xl" />
          </button>
        ))}
      </nav>

      <nav className="hidden md:flex fixed top-4 right-4 lg:right-margin-desktop gap-sm lg:gap-md z-50 bg-surface-container border border-outline-variant px-sm lg:px-md py-sm rounded-full shadow-lg pt-safe">
        {items.map(({ id, icon, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={
              active === id
                ? "flex items-center gap-xs font-label-bold text-label-bold text-primary-container bg-primary-container/10 px-sm py-xs rounded-full"
                : "flex items-center gap-xs font-label-bold text-label-bold text-on-surface-variant hover:text-primary-fixed-dim transition-colors px-sm py-xs"
            }
          >
            <Icon name={icon} filled={active === id} className="text-xl" />
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}
