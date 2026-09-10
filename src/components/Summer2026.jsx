import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useScroll, useTransform } from 'motion/react'
import { Arrow, Spark } from './Shapes'
import Reveal from './Reveal'
import { handleProjectLinkClick } from '../projectNav'
import './Summer2026.css'

const files = import.meta.glob('../assets/summer-2026/*.{jpg,jpeg,png,webp,mp4,webm}', { eager: true, query: '?url', import: 'default' })
const MOMENTS = [
  { id: 'vignette', title: 'A summer in the Studio', subtitle: 'Vignette · UdeM', tag: 'SUMMER 2026 / SUPERVISED DEVELOPMENT PROJECT', note: 'one very full summer.', color: '#dee5f6', icon: 'window', photo: 'Screenshot of Université de Montréal’s DIRO post showing students presenting projects at the IFT3150 project fair', description: 'I spent the summer redesigning Vignette’s Studio, building recording components, and refining the little details of creating and playing a story.', credit: 'A+ · Supervised by Monsieur Louis-Édouard Lafontant', link: '?project=vignette#projects', linkText: 'Inside Vignette' },
  { id: 'hackathon', title: 'Bringing people together', subtitle: 'Hack the Mountain · PolyHX × UdeMHacks', tag: '2026 / CAMPUS COLLABORATION', note: 'better with a team.', color: '#e6ebd6', icon: 'people', photo: 'A speaker presenting CADUM’s Mobile Category at Hack the Mountain, with the audience in the foreground', description: 'As CADUM co-president, I helped bring a dedicated club challenge to Hack the Mountain, a hackathon run jointly by PolyHX and UdeMHacks, then supervised the category through the event.', credit: 'Student clubs. Shared ideas. Something to make together.', link: '#about', linkText: 'More about my campus work' },
  { id: 'judging', title: 'On the other side of the table', subtitle: 'Main hackathon projects + CADUM category', tag: '2026 / LISTENING TO THE BUILDERS', note: 'so many ways to solve it.', color: '#e8dff1', icon: 'spark', photo: 'Participants seated in a lecture room at Hack the Mountain, several raising their hands', description: 'At Hack the Mountain, I judged both the hackathon’s main projects and the CADUM mobile category. I heard teams explain their work and the decisions behind it, and reviewed projects across both parts of the competition.', credit: 'Judge · Main hackathon competition & CADUM mobile category', link: '#about', linkText: 'A little more about me' },
  { id: 'polyhx-team', title: 'The people behind the projects', subtitle: 'CADUM → PolyHX', tag: '2026 / A NEW CHAPTER WITH THE TEAM', note: 'it started with the people.', color: '#f1e5d6', icon: 'people', photo: 'The PolyHX team posing together in two rows in front of a wooden slat wall', description: 'Hack the Mountain was run jointly by PolyHX and UdeMHacks, with CADUM joining in through its own dedicated mobile category. After the hackathon, the three teams came together, and I was invited to join PolyHX as VP of Sponsorships (Commandites), a new chapter with another team to learn from and contribute to.', credit: 'CADUM co-president · Invited to join PolyHX as VP des commandites', link: '#about', linkText: 'More about my campus life' },
]

function getMedia(id) {
  const entry = Object.entries(files).find(([path]) => path.split('/').pop().split('.')[0] === id)
  return entry ? { src: entry[1], video: /\.(mp4|webm)$/.test(entry[0]) } : null
}

const LABELS = ['The Studio', 'Hackathon', 'Judging', 'The people']
const POSTERS = [
  { top: 'VIGNETTE / UNIVERSITÉ DE MONTRÉAL', lines: ['A story.', 'A studio.', 'A summer.'], foot: 'DESIGN · CODE · RECORD · REPEAT', stamp: 'A+', annotation: 'Summer project / 2026' },
  { top: 'POLYHX × UDEMHACKS', lines: ['Good ideas', 'need good', 'company.'], foot: 'HACK THE MOUNTAIN / 2026', stamp: '↗', annotation: 'Built around people' },
  { top: 'HACK THE MOUNTAIN / JUDGING', lines: ['Different', 'minds.', 'New angles.'], foot: 'LISTEN · ASK · UNDERSTAND', stamp: '✳', annotation: 'The other side of the table' },
  { top: 'CADUM → POLYHX', lines: ['A team.', 'A meeting.', 'A new start.'], foot: 'THE PEOPLE BEHIND THE PROJECTS', stamp: '↗', annotation: 'A new chapter / 2026' },
]

function MomentMedia({ moment, index, preview = false }) {
  const media = getMedia(moment.id)
  const [failed, setFailed] = useState(false)
  const poster = POSTERS[index]
  if (media && !failed) return media.video
    ? <video src={media.src} controls={!preview} muted={preview} playsInline preload="metadata" aria-label={moment.photo} onError={() => setFailed(true)} />
    : <img src={media.src} alt={moment.photo} style={!preview || ['polyhx-team', 'vignette'].includes(moment.id) ? { objectFit: 'contain', background: moment.id === 'vignette' ? '#fff' : '#171715' } : undefined} loading="lazy" onError={() => setFailed(true)} />
  return <div className={`summer-poster poster-${moment.id}`}>
    <span className="poster-kicker">{poster.top}</span>
    <span className="poster-orbit" aria-hidden="true" />
    <strong className="poster-type">{poster.lines.map(line => <span key={line}>{line}</span>)}</strong>
    <div className="poster-stamp"><strong>{poster.stamp}</strong><span>{poster.annotation}</span></div>
    <span className="poster-bottom">{poster.foot}</span>
    <div className="poster-bars" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <i key={i} style={{ height: `${12 + ((i * 17 + 9) % 43)}px` }} />)}</div>
  </div>
}

export default function Summer2026() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const dragStart = useRef(null)
  const dialogRef = useRef(null)
  const sceneRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start end', 'end start'] })
  const driftA = useTransform(scrollYProgress, [0, 1], [65, -65])
  const driftB = useTransform(scrollYProgress, [0, 1], [-35, 45])
  const yearDrift = useTransform(scrollYProgress, [0, 1], [35, -35])
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0), y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 180, damping: 25 })
  const rotateY = useSpring(y, { stiffness: 180, damping: 25 })
  const moment = MOMENTS[active]
  function select(index) {
    const next = (index + MOMENTS.length) % MOMENTS.length
    setDirection(next > active ? 1 : -1)
    setActive(next)
  }
  function tilt(event) {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set(-((event.clientY - bounds.top) / bounds.height - .5) * 7)
    y.set(((event.clientX - bounds.left) / bounds.width - .5) * 9)
  }
  return <section id="summer-2026" className="summer-section" aria-labelledby="summer-title">
    <div className="container"><Reveal>
      <div className="summer-heading"><div><p className="eyebrow">MONTRÉAL / A CHAPTER WORTH KEEPING</p><h2 id="summer-title">One summer.<br /><span className="serif-accent">So much to take with me.</span></h2></div><p>Projects, people & a few firsts.<br /><span className="handwritten">Pick a moment. Step inside. ↙</span></p></div>
      <div className="summer-universe" ref={sceneRef}>
        <motion.span className="summer-big-year" style={{ y: reduceMotion ? 0 : yearDrift }} aria-hidden="true">2026</motion.span>
        <span className="summer-orbital-line" aria-hidden="true" /><span className="summer-orbital-line orbit-second" aria-hidden="true" />
        <span className="summer-universe-label">THE SUMMER ARCHIVE<br /><b>04 MOMENTS / OPEN TO EXPLORE</b></span>
        <span className="summer-universe-flower" aria-hidden="true"><Spark /></span>
        <div className="summer-collage">{MOMENTS.map((item, index) => <motion.button type="button" className={`summer-memory-card memory-card-${index}`} key={item.id} style={{ y: reduceMotion ? 0 : index % 2 ? driftB : driftA }} whileHover={reduceMotion ? {} : { scale: 1.07, rotate: 0, zIndex: 10 }} whileTap={reduceMotion ? {} : { scale: .98 }} transition={{ type: 'spring', stiffness: 230, damping: 20 }} onClick={() => { select(index); dialogRef.current.showModal() }} aria-label={`Open ${item.title}`}>
          <div className="collage-card-art"><MomentMedia moment={item} index={index} preview /></div><span className="collage-card-title"><span>{LABELS[index]}</span><span>0{index + 1} ↗</span></span>
        </motion.button>)}</div>
        <span className="summer-postmark">UdeM<br /><strong>A+</strong><span>VIGNETTE / ÉTÉ 2026</span></span>
        <span className="summer-collage-note handwritten">a little out of the ordinary.</span>
        <div className="summer-universe-footer"><span>MADE THINGS. MET PEOPLE. LEARNED A LOT.</span><span>SCROLL TO WANDER · CLICK TO READ ↗</span></div>
      </div>
      <dialog className="summer-story-dialog" ref={dialogRef} onClose={() => dialogRef.current.querySelectorAll('video').forEach(video => video.pause())} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close() }} aria-label="Summer 2026 story">
      <div className="summer-dialog-inner"><div className="summer-dialog-top"><span className="eyebrow">SUMMER 2026 / THE STORY BEHIND THE MOMENT</span><button type="button" className="summer-close-story" onClick={() => dialogRef.current.close()} autoFocus>Back to the summer <span aria-hidden="true">×</span></button></div>
      <div className="summer-chapters" role="tablist" aria-label="Summer 2026 chapters">{MOMENTS.map((item, index) => <button type="button" role="tab" id={`summer-tab-${item.id}`} aria-controls={`summer-panel-${item.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} key={item.id} onClick={() => select(index)} onKeyDown={event => { const next = event.key === 'ArrowRight' ? (index + 1) % 4 : event.key === 'ArrowLeft' ? (index + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null; if (next !== null) { event.preventDefault(); select(next); event.currentTarget.parentElement.children[next].focus() } }}>
        {active === index && <motion.span className="chapter-selection" layoutId="summer-chapter" transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }} />}
        <span className="chapter-index">0{index + 1}</span><span className="chapter-name">{LABELS[index]}</span><span className="chapter-arrow" aria-hidden="true">↗</span>
      </button>)}</div>
      <div className="summer-feature" style={{ '--memory-color': moment.color }}>
        <div className="summer-gallery" onPointerMove={tilt} onPointerLeave={() => { x.set(0); y.set(0) }}>
          <motion.div className="summer-paper paper-back" animate={{ rotate: active % 2 ? -5 : 5 }} transition={{ type: 'spring', stiffness: 100, damping: 20 }} aria-hidden="true" />
          <motion.div className="summer-paper paper-middle" animate={{ rotate: active % 2 ? 3 : -3 }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} aria-hidden="true" />
          <motion.div className="summer-image-frame" style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY }} onPointerDown={event => { dragStart.current = event.target.closest('video') ? null : { x: event.clientX, y: event.clientY } }} onPointerUp={event => { const start = dragStart.current; dragStart.current = null; if (start && Math.abs(event.clientX - start.x) > 60 && Math.abs(event.clientX - start.x) > Math.abs(event.clientY - start.y)) select(active + (event.clientX < start.x ? 1 : -1)) }} onPointerCancel={() => { dragStart.current = null }}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout"><motion.div className="summer-image-slide" key={moment.id} custom={direction} variants={{ enter: d => ({ opacity: 0, x: reduceMotion ? 0 : d * 75, scale: reduceMotion ? 1 : .94, rotate: reduceMotion ? 0 : d * 3 }), center: { opacity: 1, x: 0, scale: 1, rotate: 0 }, exit: d => ({ opacity: 0, x: reduceMotion ? 0 : -d * 65, scale: reduceMotion ? 1 : .97, rotate: reduceMotion ? 0 : -d * 3 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: reduceMotion ? 0 : .4, ease: [.22, 1, .36, 1] }}><MomentMedia moment={moment} index={active} /></motion.div></AnimatePresence>
          </motion.div>
          <div className="summer-photo-footer"><span className="handwritten">{moment.note}</span><span>{getMedia(moment.id) ? 'FROM THE CAMERA ROLL' : 'CHAPTER ART / PHOTO SLOT READY'}</span></div>
        </div>
        <AnimatePresence initial={false} mode="wait"><motion.article key={moment.id} className="summer-caption" role="tabpanel" tabIndex={0} id={`summer-panel-${moment.id}`} aria-labelledby={`summer-tab-${moment.id}`} initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }} transition={{ duration: reduceMotion ? 0 : .18 }}>
          <span className="summer-caption-number" aria-hidden="true">0{active + 1}<span>/ 04</span></span><p className="eyebrow">{moment.tag}</p><h3>{moment.title}</h3><p className="summer-description">{moment.description}</p><p className="summer-credit">{moment.credit}</p><a className="button button-blue" href={moment.link} onClick={event => handleProjectLinkClick(event, moment.link, () => dialogRef.current.close())}>{moment.linkText}<Arrow /></a>
        </motion.article></AnimatePresence>
      </div>
      <div className="summer-navigation"><span>Four moments. A lot to take with me.</span><div><button type="button" aria-label="Previous chapter" onClick={() => select(active - 1)}>←</button><span aria-live="polite">0{active + 1} / 04</span><button type="button" aria-label="Next chapter" onClick={() => select(active + 1)}>→</button></div></div>
      </div></dialog>
    </Reveal></div>
  </section>
}
