import { useState } from 'react'

const media = import.meta.glob('../assets/videos/vignette.{mp4,webm}', { eager: true, query: '?url', import: 'default' })
const src = media['../assets/videos/vignette.mp4'] || media['../assets/videos/vignette.webm']

export default function VignetteMedia({ fallback }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return fallback
  return <div className="vignette-demo">
    <div className="project-visual vignette-demo-frame"><video className="vignette-video" controls playsInline preload="metadata" aria-label="Vignette Studio walkthrough, edited to 1.5 times speed" onError={() => setFailed(true)}><source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} onError={() => setFailed(true)} /></video></div>
    <span className="vignette-speed-note">STUDIO WALKTHROUGH · SPED UP TO 1.5×</span>
  </div>
}
