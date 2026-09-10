import { useState } from 'react'

// Add the demo to src/assets/videos; Vite discovers and bundles it automatically.
const media = import.meta.glob('../assets/videos/vignette-maker.{mp4,webm,vtt}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const videoSrc = media['../assets/videos/vignette-maker.mp4'] || media['../assets/videos/vignette-maker.webm']
const captionsSrc = media['../assets/videos/vignette-maker.vtt']
const POSTER = '/vignette-maker-preview.svg'

function MakerMedia({ src }) {
  const [videoFailed, setVideoFailed] = useState(false)
  const hasVideo = Boolean(src) && !videoFailed

  return <div className={`project-visual maker-visual ${hasVideo ? 'has-video' : ''}`}>
    {hasVideo ? <video className="maker-video" controls playsInline preload="metadata" aria-label="Vignette Maker scene editor demo" onError={() => setVideoFailed(true)}>
      <source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} onError={() => setVideoFailed(true)} />
      {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />}
      Your browser does not support embedded video. <a href={src}>Download the demo</a>.
    </video> : <>
      <img className="maker-preview" src={POSTER} alt="Illustrated scene editor with two cartoon characters, a speech bubble, and character styling controls." width="720" height="450" />
      <span className="maker-demo-status">{videoFailed ? 'Demo temporarily unavailable' : 'Demo video coming soon'}<span aria-hidden="true">↗</span></span>
      <span className="preview-label">INTERFACE ILLUSTRATION</span>
    </>}
  </div>
}

export default function VignetteMakerVisual() {
  return <MakerMedia key={videoSrc || 'preview'} src={videoSrc} />
}
