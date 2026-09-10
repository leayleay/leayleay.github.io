# Léa Hemidj — portfolio

A personal React + Vite portfolio for Léa Hemidj, a computer science student at Université de Montréal.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` creates the production site in `dist`; `npm run preview` serves it
locally. Run `npm run lint` to check the source.

## Interactive hero

`src/components/StudentPlayground.jsx` handles color palettes, motion controls,
and visibility. `WorkspaceCanvas.jsx` lazy-loads a custom Three.js scene built in
`createWorkspace.js`: a laptop, notebook, coffee, and floating code symbols.
All geometry and screen artwork are generated locally, with no remote scene assets.

The workspace loads immediately on desktop and mobile, with no flower or launch
button. It rotates automatically once every 75 seconds without cursor tracking.
Color swatches change the laptop and coffee mug accents; Pause/Resume controls
the rotation. Reduced-motion mode keeps it still. Rendering pauses offscreen and
in hidden tabs, and the loading state reserves space without a visible graphic.

## Project demos

Add `vignette-maker.mp4` or `vignette-maker.webm` to `src/assets/videos/` to replace
the Vignette Maker illustration with a video player. See that directory’s
`README.md` for caption support. Rebuild the production site after adding media.

Use `?project=vignette-maker#projects` to link directly to Vignette Maker’s tab.

## Summer 2026 memories

The chapter gallery directly after the hero lives in `src/components/Summer2026.jsx`.
Add your photos or videos to `src/assets/summer-2026/`; that folder’s README lists
the four filenames and supported formats. Open `#summer-2026` to jump to it.

## Rennaï experience

The photo card in About Me opens a three-item album in
`src/components/RennaiExperience.jsx`. Media and video poster frames live in
`src/assets/rennai/`. Videos keep their original speed and aspect ratio, load only
when selected, and stop when the album closes or another item is selected.
The album supports keyboard navigation and respects reduced-motion preferences.
