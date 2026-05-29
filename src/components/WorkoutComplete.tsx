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
    <div className="fixed inset-0 z-[100] bg-background text-on-background min-h-screen flex flex-col overflow-hidden">
      <main
        ref={mainRef}
        className="flex-1 flex flex-col items-center justify-center px-margin-mobile py-lg w-full max-w-md mx-auto"
      >
        <div data-enter className="w-full text-center mb-lg">
          <Icon name="check_circle" filled className="text-primary-container text-5xl mb-md" />
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary-fixed text-balance">
            {summary.completionMessage}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-sm text-balance">
            You interrupted prolonged sitting and restored important body functions.
          </p>
        </div>

        <div
          data-enter
          className="w-full bg-surface-container-high border border-outline-variant rounded-xl p-md text-left"
        >
          <h2 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest mb-sm">
            Session Summary
          </h2>
          <ul className="flex flex-col gap-xs">
            {lines.map((line) => (
              <li
                key={line}
                className="flex items-start gap-sm font-body-md text-body-md text-on-surface"
              >
                <Icon
                  name="check"
                  className="text-primary-container text-xl shrink-0 mt-0.5"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-enter className="w-full mt-xl">
          <button
            type="button"
            onClick={onReturn}
            className="w-full bg-primary-container text-on-primary-container font-label-bold text-label-bold uppercase py-md rounded-full border-2 border-outline-variant hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-sm"
          >
            <Icon name="home" />
            <span>Return to Dungeon</span>
          </button>
        </div>
      </main>
    </div>
  );
}
