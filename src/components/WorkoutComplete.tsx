import { useEffect, useRef } from "react";
import { CELEBRATION_GOBLIN_URL } from "../data/workoutImages";
import { Icon } from "./Icon";

export function WorkoutComplete({
  xpEarned,
  questsCompleted,
  onReturn,
}: {
  xpEarned: number;
  questsCompleted: number;
  onReturn: () => void;
}) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const blocks = main.querySelectorAll("[data-enter]");
    blocks.forEach((el, index) => {
      const node = el as HTMLElement;
      node.style.opacity = "0";
      node.style.transform = "translateY(20px)";
      node.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      setTimeout(() => {
        node.style.opacity = "1";
        node.style.transform = "translateY(0)";
      }, 150 + index * 150);
    });
  }, []);

  const questLabel =
    questsCompleted === 1
      ? "1 quest completed"
      : `${questsCompleted} quests completed`;

  return (
    <div className="fixed inset-0 z-[100] bg-background text-on-background font-body-lg min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 goblin-glow-bg pointer-events-none z-0" />

      <main
        ref={mainRef}
        className="flex-grow flex flex-col items-center justify-center px-margin-mobile relative z-10 w-full max-w-[1200px] mx-auto text-center h-screen"
      >
        <div data-enter className="relative w-64 h-64 md:w-80 md:h-80 mb-lg shrink-0 animate-[bounce_3s_infinite_ease-in-out]">
          <div className="absolute inset-0 bg-black rounded-full scale-105 border-4 border-black" />
          <img
            alt="Celebrating Goblin"
            className="relative z-10 w-full h-full object-cover rounded-full border-4 border-primary-container shadow-[0_0_30px_rgba(186,245,23,0.4)]"
            src={CELEBRATION_GOBLIN_URL}
          />
        </div>

        <div data-enter className="flex flex-col items-center gap-md mb-xl w-full max-w-md">
          <h1 className="font-display-lg text-display-lg text-primary text-center">
            Desk goblin temporarily defeated.
          </h1>
          <div className="bg-surface-container-high border border-outline-variant rounded-xl p-md w-full flex flex-col items-center shadow-[0_4px_10px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-container opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="flex items-center gap-base mb-xs text-on-surface relative z-10">
              <Icon name="exercise" filled className="text-primary-container text-2xl" />
              <span className="font-body-lg text-body-lg">{questLabel}</span>
            </div>
            <div className="flex items-center gap-base text-primary-container relative z-10">
              <Icon name="star" filled className="text-2xl" />
              <span className="font-headline-md text-headline-md">+{xpEarned} XP</span>
            </div>
          </div>
        </div>

        <div data-enter className="w-full max-w-md mt-auto mb-lg md:mb-xl">
          <button
            type="button"
            onClick={onReturn}
            className="w-full bg-primary-container text-on-primary-container font-label-bold text-label-bold uppercase py-md rounded-full shadow-[0_4px_0_#131313] border-4 border-black transition-transform goblin-btn-bounce btn-glow flex justify-center items-center gap-base relative overflow-hidden group hover:opacity-90"
          >
            <span className="relative z-10 flex items-center gap-base">
              <Icon name="swords" filled />
              <span>Return to Dungeon</span>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        </div>
      </main>
    </div>
  );
}
