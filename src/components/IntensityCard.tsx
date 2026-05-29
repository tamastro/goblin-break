import { getIntensityPreset, type IntensityId } from "../data/intensity";
import { Icon } from "./Icon";

export function IntensityCard({ intensityId }: { intensityId: IntensityId }) {
  const preset = getIntensityPreset(intensityId);

  return (
    <section className="w-full max-w-md bg-surface-container text-on-surface p-md rounded-xl border border-outline-variant">
      <div className="flex items-center gap-md">
        <div className="w-12 h-12 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center shrink-0">
          <Icon name={preset.icon} filled className="text-primary-container text-2xl" />
        </div>
        <div className="flex flex-col gap-xs min-w-0 flex-1">
          <span className="font-label-bold text-label-bold text-primary-fixed uppercase tracking-widest">
            Current Intensity
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {preset.name}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {preset.description}
          </p>
        </div>
        <span className="font-label-bold text-label-bold text-on-surface-variant shrink-0">
          {preset.durationLabel}
        </span>
      </div>
    </section>
  );
}
