# Late Show Radio

A one-page nostalgia music site. Two playlists, a spinning-vinyl glass player,
and playback driven live by the YouTube IFrame API — no audio files hosted
here.

## Setup

```bash
npm install
```

Drop your two background images in:

```
public/bg/scene-wide.png   (landscape)
public/bg/scene-tall.png   (portrait, separately composed — not a crop)
```

```bash
npm run dev
```

## ⚠️ Before you ship: add real video IDs

I did **not** search YouTube or fill in any `videoId`. Every track in
`app/lib/tracks.ts` is a commercial Bollywood film song, and per your brief I
only wire up videos you've confirmed you have the right to use, or the
rights-holder's own upload with embedding enabled.

For each track in `app/lib/tracks.ts`:
1. Find the official upload (T-Series / Saregama / Zee Music / Sony Music
   India, etc. — not a fan re-upload).
2. Confirm embedding is allowed (drop it in an `<iframe>` locally; if
   YouTube blocks it, the player's `onError` handler will just skip it).
3. Paste the 11-character ID into `videoId`.
4. I left `artist`, `film`, and `year` blank rather than guess — fill those
   in too.

Adding a new song afterwards is a one-line addition to the `tracks` array of
whichever playlist it belongs in.

## How it's built

- **`app/page.tsx`** — server component: fixed hero background (`hero-bg`,
  swaps `scene-wide.png` → `scene-tall.png` on `orientation: portrait`),
  film-grain overlay, the clock/listener-count/social HUD row, and the
  player, all pinned with `env(safe-area-inset-*)`.
- **`app/components/player/PlayerShell.tsx`** — owns playback state and the
  *one* real `YT.Player` instance. The desktop pill and mobile card are two
  separate JSX blocks (`hidden sm:flex` / `sm:hidden`) as specced, but only
  one live YouTube host node exists — it's moved (not duplicated) into
  whichever slot is currently visible, so the player is never paused-but-
  hidden in a `display:none` container.
- **`app/lib/useYouTubePlayer.ts`** — loads the IFrame API once at module
  scope, exposes `play/pause/seek/load`, and reports playback state,
  current time, and duration via `requestAnimationFrame`.
- **`app/lib/tracks.ts`** — playlist data. See the copyright note above.

All sub-components (`Clock`, `Transport`, `SeekBar`, …) are declared at
module scope, per the brief's note on avoiding vinyl-animation resets from
per-render remounts.
