# Goblin Mode Break

A playful sit-break PWA. Ultra-short movement quests, goblin humor, XP, and streaks.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Icons (you add these)

Place in `public/`:

- `icon-192.png`
- `icon-512.png`

The app and notifications reference these paths. Until they exist, icons will 404 but the app still runs.

Quick option: [favicon.io emoji favicons](https://favicon.io/emoji-favicons/goblin/) or run `bash generate-icons.sh` if you have ImageMagick.

## Styling

Placeholder UI lives in:

- `src/styles.css` — global + layout (replace with your theme)
- `src/App.tsx` — structure only; swap classes or add a UI library later

Brand tokens in the plan: neon goblin green (`#5cff3a`), dark UI (`#0a1208`).

## Architecture

| Piece | Role |
|-------|------|
| `src/App.tsx` | UI, quest modal, interval picker |
| `src/sw.ts` | Background timer, notifications, IndexedDB recovery |
| `src/hooks/useSW.ts` | App ↔ service worker messages |
| `src/hooks/useTimer.ts` | Countdown synced to SW `nextBreakAt` |
| `src/hooks/useProgress.ts` | XP, streaks, titles (`localStorage`) |
| `src/data/workouts.ts` | 18 goblin quests (single source of truth) |

## Install on phone

1. Deploy (`npx vercel` or similar)
2. Open URL in Chrome/Safari
3. Add to Home Screen
4. Allow notifications

## MVP scope

Included: timer, notifications, workouts, XP/streaks, goblin copy.

Not included yet: mascot evolution, mood tracking, sound, monetization.
