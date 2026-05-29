import type { Workout, WorkoutCategory } from "./workouts";

export const CELEBRATION_GOBLIN_URL =
  "https://lh3.googleusercontent.com/aida/ADBb0uh-9T6uDbTblNXpoowJ19OcX8_ft0k07XvYrbtrX8MkTN3Uqb6BM6UfnsM7EeZct_VrWH7fRB0LEC74nHfj3C-nEoxGqg-ttESNxgiW82IcWg6A6-Tmpq4RHvxhb8UVkWKT2qSvWjaEUq_0g36xI_1ErxryYjAsQroBIH0aF3vgLNXNZ5qiXKtbfbSjFw9685kgFx7hD9DaFFwMEeFbal1hUk9J_ZpCRSWkjtkuLJCbMoVprgcwBEKCfJI";

const DEFAULT_PREVIEW =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCpF8v1RsbgCYpB80Cj4GuW7lVwhqsYeP9miBZP1eDb7NMqvNcDymc1EvZOSvDCjLXX-yaW2zzw8AqSjB-ZHIWCKKeRM8qY1oUDZphkbcTwVLIYZveK6aVhP75TgB_HL6hhuHh5jXbXK0PoKmKw6fkrNS8xKkxMTaE2XU771ahLihPIHN0tZaoiSRYWCUx7Xb-Ih-z8pw-BeRVns_PsEVIWu10k1zxPbxF-eb3h_usQRN_sd7wHbLBU54Ro6j0zzkgI6v3MMzfoN1I";

const XP_SQUATS_PREVIEW =
  "https://lh3.googleusercontent.com/aida/ADBb0uif1qTXOgiJAk6wOFm1mC2_GNXrzYXL8FvPOEBVKCLc5UbqycTkF8hBp6uKFR5m2KVEY2IaiZhubSgqxVGILs5XbSkiUE32DlYeAClrTvkCAzI6DI1Ip_yLeIOMj0g5V3zGc4i8jmec2Ae7_q2pFUVEdW3eBZwfVB9ZG7hqDIvS7Gr4iB84UH9wLJ0zHZTJOJESplow2-uvft9zAzkXD6YsQzlOf-Qpp4F6XRMT9wqT8eUlP4pN2ujh6Tk";

const LOOT_LUNGES_ILLUSTRATION =
  "https://lh3.googleusercontent.com/aida/ADBb0ugGvI2ijdH9FOk8YkJKctdcK0R9YpGvKq4u04IvI0iPJAEC4diAz4EQcLYGxQR4dZNfPupYZwc3X2JLoBVT2tkRrXsebrRV5KsSaB8fgnLhQwrGtehPsybcf-wXmHA_IjSpmwR9klvWKqiw7qq3Nai_1rUzvwjL5tSgnBG_197BozI0jtQOZv7uARiTEvW7jWTbCu60C746k0Kdc1KXy9Cqpw1wmEmF6xu3UnErxqgyFebeDQXBui7lVQ";

const BY_ID: Partial<Record<string, string>> = {
  "xp-squats": XP_SQUATS_PREVIEW,
  "loot-lunges": LOOT_LUNGES_ILLUSTRATION,
};

const ILLUSTRATION_BY_ID: Partial<Record<string, string>> = {
  "gold-farmer": LOOT_LUNGES_ILLUSTRATION,
};

const BY_CATEGORY: Record<WorkoutCategory, string> = {
  neck: DEFAULT_PREVIEW,
  arms: DEFAULT_PREVIEW,
  core: DEFAULT_PREVIEW,
  legs: XP_SQUATS_PREVIEW,
  cozy: DEFAULT_PREVIEW,
};

export function getWorkoutPreviewImage(workout: Workout): string {
  return BY_ID[workout.id] ?? BY_CATEGORY[workout.category] ?? DEFAULT_PREVIEW;
}

export function getWorkoutIllustration(workout: Workout): string {
  return (
    ILLUSTRATION_BY_ID[workout.id] ??
    BY_ID[workout.id] ??
    BY_CATEGORY[workout.category] ??
    DEFAULT_PREVIEW
  );
}
