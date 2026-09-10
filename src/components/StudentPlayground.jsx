import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import WorkspaceCanvas from './WorkspaceCanvas'
import { Spark } from './Shapes'
import './StudentPlayground.css'

const MOODS = [
  { id: 'blue', label: 'Daydream blue', color: '#b4c6ef' },
  { id: 'lilac', label: 'Creative lilac', color: '#d3bcec' },
  { id: 'sage', label: 'Fresh-start sage', color: '#bdcfa7' },
]

function ScenePlaceholder({ failed }) {
  return <div className="student-scene-placeholder" role="status">
    <span className={failed ? 'student-load-error' : 'student-loading-label'}>{failed ? 'The workspace couldn’t load.' : 'Loading the workspace…'}</span>
  </div>
}

export default function StudentPlayground() {
  const reduceMotion = useReducedMotion()
  const stageRef = useRef(null)
  const [app, setApp] = useState(null)
  const [failed, setFailed] = useState(false)
  const [paused, setPaused] = useState(false)
  const [mood, setMood] = useState('blue')
  const activeMood = MOODS.find(item => item.id === mood)
  const motionPaused = paused || Boolean(reduceMotion)

  useEffect(() => {
    if (app || failed) return
    const timeout = setTimeout(() => setFailed(true), 30000)
    return () => clearTimeout(timeout)
  }, [app, failed])

  function handleLoad(scene) {
    setApp(scene)
  }

  useEffect(() => {
    if (!app) return
    app.setColor(activeMood.color)
  }, [app, activeMood.color])

  useEffect(() => {
    if (!app) return
    let visible = true
    const updatePlayback = () => {
      if (!visible || document.hidden) {
        app.stop()
      } else if (motionPaused) {
        app.stop()
        app.requestRender()
      } else {
        app.play()
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      updatePlayback()
    }, { threshold: 0.05 })
    observer.observe(stageRef.current)
    document.addEventListener('visibilitychange', updatePlayback)
    updatePlayback()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updatePlayback)
    }
  }, [app, motionPaused, activeMood.color])

  const loaded = Boolean(app) && !failed
  const fallback = <ScenePlaceholder failed={failed} />

  return <div className={`student-playground student-mood-${mood} ${loaded ? 'scene-loaded' : ''}  ${motionPaused ? 'scene-paused' : ''}`}>
    <div className="student-scene-heading"><span className="eyebrow">A CORNER OF MY DESK</span><span><i />IDEAS IN PROGRESS</span></div>
    <div className="student-stage" ref={stageRef}>
      <div className="student-spotlight" aria-hidden="true" />
      <div className="student-orbit" aria-hidden="true" />
      <div className="student-canvas-wrap" aria-label="3D student workspace" role="group">
        {failed ? fallback : <WorkspaceCanvas fallback={fallback} onLoad={handleLoad} onError={() => setFailed(true)} />}
      </div>
      <div className="student-code-sticker" aria-hidden="true">&lt;/&gt;<span>ideas into code</span></div>
      <div className="student-note"><span className="eyebrow">NOTE TO SELF</span><strong>Try. Learn. Repeat.</strong><span className="student-note-caption">It starts with a little idea.</span></div>
      <div className="student-ready-sticker" aria-hidden="true"><Spark /><span>ready to<br /><em>learn.</em></span></div>
      <span className="student-handwritten handwritten">make yourself at home ↗</span>
    </div>
    <div className="student-scene-footer">
      <div className="student-moods" role="group" aria-label="Choose the scene color">
        <span>Set the mood</span>
        {MOODS.map(item => <button type="button" key={item.id} className={`student-swatch swatch-${item.id}`} aria-label={item.label} aria-pressed={mood === item.id} onClick={() => setMood(item.id)}><span /></button>)}
      </div>
      {loaded && !reduceMotion ? <button type="button" className="student-pause" aria-label={paused ? 'Resume 3D motion' : 'Pause 3D motion'} aria-pressed={paused} onClick={() => setPaused(!paused)}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>{paused ? 'Resume' : 'Pause'}</button> : <span className="student-scene-caption">{reduceMotion ? 'A quieter kind of curiosity.' : failed ? 'Still curious.' : 'Built to explore.'}</span>}
    </div>
    <p className="student-interaction-hint">{loaded ? motionPaused ? 'Taking a little breather.' : 'A little change of perspective.' : 'A little space to try things.'}</p>
  </div>
}
