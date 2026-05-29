import { useEffect, useRef } from "react";
import type { SessionSummary } from "../lib/sessionSummary";
import { sessionSummaryLines } from "../lib/sessionSummary";
import { Icon } from "./Icon";

export function WorkoutComplete({
  summary,
  onReturn,
}: {
  summary: SessionSummary;
  onReturn: () => void;
}) {
  const mainRef = useRef<HTMLElement>(null);
  const lines = sessionSummaryLines(summary);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const blocks = main.querySelectorAll("[data-enter]");
    blocks.forEach((el, index) => {
      const node = el as HTMLElement;
      node.style.opacity = "0";
      node.style.transform = "translateY(12px)";
      node.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
      setTimeout(() => {
        node.style.opacity = "1";
        node.style.transform = "translateY(0)";
      }, 100 + index * 80);
    });
  }, []);

  return (
    <div className="page-full fixed inset-0 z-[100] bg-background text-on-background flex flex-col overflow-y-auto overflow-x-hidden">
      <main
        ref={mainRef}
        className="flex-1 flex flex-col items-center justify-start sm:justify-center px-margin-mobile sm:px-6 md:px-10 py-lg pt-safe pb-safe w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto min-h-0"
      >
        <div data-enter className="w-full text-center mb-md sm:mb-lg">
          <Icon name="check_circle" filled className="text-primary-container text-4xl sm:text-5xl mb-md" />
          <h1 className="font-headline-lg-mobile text-xl sm:text-headline-lg-mobile text-primary-fixed text-balance">
            {summary.completionMessage}
          </h1>
          <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant mt-sm text-balance text-pretty">
            You interrupted prolonged sitting and restored important body functions.
          </p>
        </div>

        <div
          data-enter
          className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-sm sm:p-md text-left"
        >
          <h2 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest mb-sm text-[11px] sm:text-label-bold">
            Session Summary
          </h2>
          <ul className="flex flex-col gap-xs">
            {lines.map((line) => (
              <li
                key={line}
                className="flex items-start gap-sm font-body-md text-sm sm:text-body-md text-on-surface"
              >
                <Icon
                  name="check"
                  className="text-primary-container text-lg sm:text-xl shrink-0 mt-0.5"
                />
                <span className="text-pretty">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-enter className="w-full mt-lg sm:mt-xl">
          <button
            type="button"
            onClick={onReturn}
            className="w-full bg-primary-container text-on-primary-container font-label-bold text-label-bold uppercase py-md rounded-full border-2 border-outline-variant hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-sm min-h-[48px] text-sm sm:text-base"
          >
            <Icon name="home" />
            <span>Return to Dungeon</span>
          </button>
        </div>
      </main>
    </div>
  );
}
