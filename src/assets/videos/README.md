# Project demo videos

Drop a demo into this directory using the project's name. Available slots:

- `vignette.mp4` / `.webm` — the Studio walkthrough (current recording edited to 1.5× speed)
- `vignette-maker.mp4` / `.webm` — the Vignette Maker scene editor
- `dejabrew.mp4` / `.webm` — the DejaBrew app walkthrough

Recommended encoding: H.264 video / AAC audio for `.mp4` (this is what browsers
support most consistently — re-encode iPhone screen recordings, which are often
HEVC, before dropping them in here).

Each project automatically replaces its illustration with a video player once
its file is present. No code changes are needed. MP4 takes priority if both
formats exist for the same project. The video uses native playback controls,
plays inline on mobile, and does not autoplay. The production build bundles
the file with a versioned URL.

For English captions, add a matching `.vtt` file in WebVTT format alongside the
video (e.g. `dejabrew.vtt`). The illustration remains visible until a video is
supplied, and returns if playback fails.

Run `npm run build` again after adding or replacing a video for a production build.
