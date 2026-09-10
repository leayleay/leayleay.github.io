import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const LINES = [
  { prompt: '> ', text: 'initializing portfolio...' },
  { prompt: '> ', text: 'loading creative assets...' },
  { prompt: '> ', text: 'welcome to velvet terminal.' },
]

const CHAR_SPEED = 18   // ms per character
const LINE_PAUSE = 120  // ms between lines

export default function LoadingScreen({ onDone }) {
  const [displayed, setDisplayed] = useState([])
  const [showCursor, setShowCursor] = useState(true)
  const [exiting, setExiting] = useState(false)
  const doneRef = useRef(onDone)
  useEffect(() => {
    doneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    const timeouts = []
    let delay = 220

    LINES.forEach((line, li) => {
      const full = line.prompt + line.text
      for (let ci = 1; ci <= full.length; ci++) {
        const t = delay + ci * CHAR_SPEED
        timeouts.push(setTimeout(() => {
          setDisplayed(prev => {
            const next = [...prev]
            next[li] = full.slice(0, ci)
            return next
          })
        }, t))
      }
      delay += full.length * CHAR_SPEED + LINE_PAUSE
    })

    // Trigger exit
    timeouts.push(setTimeout(() => {
      setShowCursor(false)
      setExiting(true)
      setTimeout(() => doneRef.current(), 900)
    }, delay + 260))

    return () => timeouts.forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="loading"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#0A0003',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', width: 500, height: 500,
            borderRadius: '50%', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(circle, rgba(162,0,42,0.18), transparent 65%)',
            filter: 'blur(40px)', pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', textAlign: 'left', width: 'min(440px, 90vw)' }}>
            {/* Logo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: 'var(--ff-head)',
                fontWeight: 900,
                fontSize: 22,
                letterSpacing: '0.1em',
                color: '#FFF4F7',
                marginBottom: 36,
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: '#E20039' }}>V</span>ELVET{' '}
              <span style={{ color: '#E20039' }}>T</span>ERMINAL
            </motion.p>

            {/* Terminal lines */}
            <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 14, lineHeight: 2.2 }}>
              {LINES.map((line, i) => (
                <div key={i} style={{ minHeight: '1.4em' }}>
                  {displayed[i] && (
                    <span>
                      <span style={{ color: '#E20039' }}>{displayed[i].slice(0, line.prompt.length)}</span>
                      <span style={{ color: '#CFA6B2' }}>{displayed[i].slice(line.prompt.length)}</span>
                      {i === Math.min(displayed.length - 1, LINES.length - 1) && showCursor && (
                        <span className="blink" />
                      )}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <motion.div
              style={{ marginTop: 48, height: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 1 }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: (LINES.reduce((a, l) => a + l.text.length + l.prompt.length, 0) * CHAR_SPEED + LINES.length * LINE_PAUSE) / 1000 + 0.6, ease: 'linear' }}
                style={{ height: '100%', background: 'linear-gradient(90deg, #590016, #F6003D)', borderRadius: 1 }}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
