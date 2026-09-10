# Summer 2026 camera roll

Add one image or video per memory here. Vite picks it up automatically; restart
`npm run dev` if a newly added file does not appear. Rebuild for production.

| Filename (choose one extension) | Frame |
| --- | --- |
| `vignette.jpg` | Vignette team / Studio |
| `hackathon.jpg` | Hack the Mountain / PolyHX × CADUM |
| `judging.jpg` | Judging / presentations |
| `polyhx-team.jpg` | Full PolyHX team photo / The people behind the projects |

Supported extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.mp4`, `.webm`.
Use only one file per name. Landscape photos work well; images fill the frame
with a centered crop. Videos use native controls and do not autoplay.

Update each memory's `photo` text in `src/components/Summer2026.jsx` to describe
your actual image for screen readers. Until media is added, custom chapter
posters fill each slot. They are labeled as chapter art rather than photos.

All four chapters appear as floating cards over the 2026 collage. Click a card
to open its story dialog; Escape or “Back to the summer” closes it. Focus returns
to the card. Closing pauses any playing video.

Inside the dialog, all four chapters are directly selectable. Arrow Left/Right and Home/End navigate
the chapter tabs; Previous/Next buttons and horizontal swipes also work. Page
scrolling stays native. Layered cards, directional image transitions, and gentle
desktop tilt honor reduced-motion preferences.
