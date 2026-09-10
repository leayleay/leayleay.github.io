import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Arrow } from './Shapes'
import dayOne from '../assets/rennai/day-one.jpg'
import momentOne from '../assets/rennai/moment-one.mp4'
import momentTwo from '../assets/rennai/moment-two.mp4'
import momentOnePoster from '../assets/rennai/moment-one-poster.jpg'
import momentTwoPoster from '../assets/rennai/moment-two-poster.jpg'
import './RennaiExperience.css'

const MEMORIES = [
  { id: 'day-one', title: 'Day one', type: 'PHOTO', src: dayOne, poster: dayOne, caption: 'My first-day keepsake: a Rennaï tote, water bottle, and science team badge.' },
  { id: 'moment-one', title: 'Getting started', type: 'VIDEO', src: momentOne, poster: momentOnePoster, caption: 'A glimpse of my onboarding at Rennaï.' },
  { id: 'moment-two', title: 'Hands-on', type: 'VIDEO', src: momentTwo, poster: momentTwoPoster, caption: 'A hands-on moment from my time on the science team.' },
]

export default function RennaiExperience() {
  const dialogRef = useRef(null)
  const videoRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState(0)
  const memory = MEMORIES[active]

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [isOpen])

  function openAlbum() {
    setActive(0)
    setIsOpen(true)
    dialogRef.current.showModal()
  }

  function selectMemory(index) {
    videoRef.current?.pause()
    setActive(index)
  }

  function closeAlbum() {
    videoRef.current?.pause()
    dialogRef.current.close()
  }

  function handleTabKey(event, index) {
    let next
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % MEMORIES.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + MEMORIES.length - 1) % MEMORIES.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = MEMORIES.length - 1
    else return
    event.preventDefault()
    selectMemory(next)
    event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next].focus()
  }

  return <>
    <button type="button" className="rennai-card" onClick={openAlbum} aria-haspopup="dialog" aria-controls="rennai-album">
      <span className="rennai-snapshot" aria-hidden="true"><img src={dayOne} alt="" loading="lazy" /><span className="handwritten">day one ♡</span></span>
      <span className="rennai-card-copy">
        <span className="eyebrow">BEYOND CAMPUS</span>
        <strong className="rennai-wordmark">Rennaï</strong>
        <span className="rennai-card-description">I worked as a self-care specialist on the science team.</span>
        <span className="rennai-card-link">A few moments <Arrow /><span>1 photo · 2 clips</span></span>
      </span>
    </button>

    {createPortal(<dialog id="rennai-album" className="rennai-dialog" ref={dialogRef} aria-labelledby="rennai-album-title" aria-describedby="rennai-album-intro" onClose={() => { videoRef.current?.pause(); setIsOpen(false) }} onClick={event => { if (event.target === event.currentTarget) closeAlbum() }}>
      <div className="rennai-album-header"><span className="eyebrow">FROM MY CAMERA ROLL</span><button type="button" className="rennai-close" onClick={closeAlbum} autoFocus aria-label="Close Rennaï album">Close <span aria-hidden="true">×</span></button></div>
      {isOpen && <div className="rennai-album-layout">
        <div className="rennai-media-panel" role="tabpanel" tabIndex={0} id={`rennai-panel-${memory.id}`} aria-labelledby={`rennai-tab-${memory.id}`}>
          <figure className="rennai-frame" key={memory.id}>
            {memory.type === 'VIDEO'
              ? <video ref={videoRef} className="rennai-media" src={memory.src} poster={memory.poster} controls playsInline preload="metadata" aria-label={`Rennaï: ${memory.title}`} />
              : <img className="rennai-media" src={memory.src} alt="My Rennaï tote and water bottle with my first-day science team badge." />}
            <figcaption><span>{String(active + 1).padStart(2, '0')} / 03</span>{memory.title}</figcaption>
          </figure>
        </div>
        <div className="rennai-album-copy">
          <span className="eyebrow">WORK EXPERIENCE</span>
          <h2 id="rennai-album-title" className="rennai-wordmark">Rennaï</h2>
          <p id="rennai-album-intro">Self-care specialist<br /><span>Science team</span></p>
          <p className="rennai-album-description">A few moments from my time at Rennaï, a little outside the classroom.</p>
          <div className="rennai-memory-tabs" role="tablist" aria-label="Rennaï memories">
            {MEMORIES.map((item, index) => <button key={item.id} type="button" role="tab" id={`rennai-tab-${item.id}`} aria-controls={`rennai-panel-${item.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => selectMemory(index)} onKeyDown={event => handleTabKey(event, index)}>
              <span className="rennai-tab-image"><img src={item.poster} alt="" loading="lazy" />{item.type === 'VIDEO' && <span className="rennai-play-mark" aria-hidden="true">▶</span>}</span>
              <span><small>{item.type} / 0{index + 1}</small><strong>{item.title}</strong></span>
              <span className="rennai-tab-indicator" aria-hidden="true">↗</span>
            </button>)}
          </div>
          <p className="rennai-memory-caption">{memory.caption}</p>
        </div>
      </div>}
    </dialog>, document.body)}
  </>
}
