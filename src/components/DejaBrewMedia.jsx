import { useRef, useState } from 'react'
import './DejaBrewMedia.css'

const media = import.meta.glob('../assets/videos/dejabrew.{mp4,webm,vtt}', { eager: true, query: '?url', import: 'default' })
const videoSrc = media['../assets/videos/dejabrew.mp4'] || media['../assets/videos/dejabrew.webm']
const captionsSrc = media['../assets/videos/dejabrew.vtt']
const POSTER = '/dejabrew-preview.png'

function DejaBrewMedia({ src }) {
  const videoRef = useRef(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const hasVideo = Boolean(src) && !videoFailed
  async function togglePlayback() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      try { await video.play() } catch { setPlaying(false) }
    } else video.pause()
  }
  return <div className="project-visual brew-demo">
    <div className="brew-table-grid" aria-hidden="true" />
    <div className="brew-scene-copy"><span className="brew-wordmark">déjà brew<span>✳</span></span><h4>Your next<br /><em>study spot.</em></h4><p>A café, a coffee,<br />a little room to focus.</p><span className="brew-release">COMING THIS WINTER</span>
      <div className="brew-coffee" aria-hidden="true"><div className="brew-saucer"><div className="brew-cup"><span>♡</span></div></div><span className="handwritten">a little study fuel.</span></div>
      {hasVideo && <button type="button" className="brew-watch" onClick={togglePlayback} aria-label={playing ? 'Pause DejaBrew walkthrough' : 'Play DejaBrew walkthrough'}><span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>{playing ? 'Pause the tour' : 'Take a quick tour'}</button>}
    </div>
    <div className="brew-phone-wrap"><div className="brew-phone"><span className="brew-side-button" aria-hidden="true" /><div className="brew-phone-screen">{hasVideo ? <video ref={videoRef} className="brew-phone-video" controls playsInline preload="metadata" poster={POSTER} aria-label="DejaBrew mobile app walkthrough" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setVideoFailed(true)}>
      <source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} onError={() => setVideoFailed(true)} />
      {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />}
    </video> : <img src={POSTER} alt="DejaBrew app preview" />}</div></div><span className="brew-phone-caption">{videoFailed ? 'Preview image · video unavailable' : 'A peek inside the app ↗'}</span></div>
  </div>
}

export default function DejaBrewVisual() {
  return <DejaBrewMedia key={videoSrc || 'preview'} src={videoSrc} />
}
