import { getIntensityPreset, type IntensityId } from "../data/intensity";
import { Icon } from "./Icon";

export function IntensityCard({ intensityId }: { intensityId: IntensityId }) {
  const preset = getIntensityPreset(intensityId);

  return (
    <section className="w-full max-w-md lg:max-w-sm lg:flex-1 bg-surface-container text-on-surface p-md sm:p-lg rounded-xl border border-outline-variant">
      <div className="flex flex-col gap-sm sm:flex-row sm:items-start sm:gap-md">
        <div className="flex items-center gap-md min-w-0 flex-1">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center shrink-0">
            <Icon name={preset.icon} filled className="text-primary-container text-xl sm:text-2xl" />
          </div>
          <div className="flex flex-col gap-xs min-w-0 flex-1">
            <span className="font-label-bold text-label-bold text-primary-fixed uppercase tracking-widest text-[11px] sm:text-label-bold">
              Current Intensity
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface text-balance">
              {preset.name}
            </h2>
          </div>
        </div>
        <span className="font-label-bold text-label-bold text-on-surface-variant shrink-0 sm:pt-6 pl-14 sm:pl-0">
          {preset.durationLabel}
        </span>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant mt-sm text-pretty">
        {preset.description}
      </p>
    </section>
  );
}
