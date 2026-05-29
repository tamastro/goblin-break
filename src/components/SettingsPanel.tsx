import { useEffect, useState } from "react";
import {
  INTENSITY_PRESETS,
  type IntensityId,
} from "../data/intensity";
import type { Settings } from "../lib/storage";
import { Icon } from "./Icon";

const MIN_INTERVAL = 1;
const MAX_INTERVAL = 180;

function IntensityOption({
  preset,
  selected,
  onSelect,
}: {
  preset: (typeof INTENSITY_PRESETS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={
        selected
          ? "bg-[#121212] border-2 border-primary-container rounded-xl p-sm sm:p-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-sm text-left transition-all goblin-glow relative overflow-hidden w-full"
          : "bg-[#121212] border border-[#262626] rounded-xl p-sm sm:p-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-sm text-left hover:opacity-80 transition-opacity w-full"
      }
    >
      {selected && (
        <div className="absolute inset-0 bg-primary-container opacity-5 pointer-events-none" />
      )}
      <div className="flex items-center gap-sm sm:gap-md relative z-10 min-w-0 flex-1">
        <div
          className={
            selected
              ? "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_0_15px_rgba(186,245,23,0.4)] shrink-0"
              : "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0"
          }
        >
          <Icon name={preset.icon} filled className="text-xl sm:text-2xl" />
        </div>
        <div className="text-left min-w-0 flex-1">
          <h3
            className={
              selected
                ? "font-headline-md text-headline-md text-primary-fixed text-balance"
                : "font-headline-md text-headline-md text-on-surface text-balance"
            }
          >
            {preset.name}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant text-pretty">{preset.description}</p>
        </div>
      </div>
      <span
        className={
          selected
            ? "font-label-bold text-label-bold text-primary-fixed relative z-10 shrink-0 pl-12 sm:pl-0"
            : "font-label-bold text-label-bold text-on-surface-variant shrink-0 pl-12 sm:pl-0"
        }
      >
        {preset.durationLabel}
      </span>
    </button>
  );
}

export function SettingsPanel({
  settings,
  onSave,
}: {
  settings: Settings;
  onSave: (next: Settings) => void;
}) {
  const [draftInterval, setDraftInterval] = useState(settings.intervalMin);
  const [draftIntensity, setDraftIntensity] = useState<IntensityId>(settings.intensityId);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    setDraftInterval(settings.intervalMin);
    setDraftIntensity(settings.intensityId);
  }, [settings.intervalMin, settings.intensityId]);

  const decrease = () => {
    setDraftInterval((v) => Math.max(MIN_INTERVAL, v - 1));
  };

  const increase = () => {
    setDraftInterval((v) => Math.min(MAX_INTERVAL, v + 1));
  };

  const handleSave = () => {
    onSave({
      ...settings,
      intervalMin: draftInterval,
      intensityId: draftIntensity,
    });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  };

  const dirty =
    draftInterval !== settings.intervalMin || draftIntensity !== settings.intensityId;

  return (
    <div className="w-full max-w-3xl flex flex-col gap-xl">
      <section className="flex flex-col gap-md">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
          Interval Settings
        </h2>
        <div className="bg-surface-container-high rounded-xl p-md border border-outline-variant">
          <p className="font-body-md text-body-md text-on-surface-variant mb-md">
            How often do you want a nudge to go goblin mode?
          </p>
          <div className="flex items-center justify-between bg-surface rounded-xl p-sm border border-outline-variant shadow-inner">
            <button
              type="button"
              onClick={decrease}
              disabled={draftInterval <= MIN_INTERVAL}
              className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary-fixed hover:bg-surface-container-highest transition-colors active:scale-95 disabled:opacity-40"
              aria-label="Decrease interval"
            >
              <Icon name="remove" />
            </button>
            <div
              key={draftInterval}
              className="font-display-lg text-display-lg text-primary-fixed transition-transform duration-200"
            >
              {draftInterval}m
            </div>
            <button
              type="button"
              onClick={increase}
              disabled={draftInterval >= MAX_INTERVAL}
              className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary-fixed hover:bg-surface-container-highest transition-colors active:scale-95 goblin-glow disabled:opacity-40"
              aria-label="Increase interval"
            >
              <Icon name="add" />
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-md">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
          Workout Intensity
        </h2>
        <div className="grid grid-cols-1 gap-sm">
          {INTENSITY_PRESETS.map((preset) => (
            <IntensityOption
              key={preset.id}
              preset={preset}
              selected={draftIntensity === preset.id}
              onSelect={() => setDraftIntensity(preset.id)}
            />
          ))}
        </div>
      </section>

      <div className="mt-lg flex flex-col-reverse sm:flex-row sm:justify-end items-stretch sm:items-center gap-md">
        {savedFlash && (
          <span className="font-label-bold text-label-bold text-primary-fixed uppercase tracking-widest text-center sm:text-right">
            Saved
          </span>
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty && !savedFlash}
          className="bg-primary-container text-on-primary-fixed font-label-bold text-label-bold rounded-full px-xl py-sm hover:opacity-80 transition-opacity active:scale-95 duration-150 shadow-[0_0_15px_rgba(186,245,23,0.4)] disabled:opacity-50 w-full sm:w-auto min-h-[48px]"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
