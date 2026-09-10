import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function Cursor() {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const coreX = useSpring(mx, { stiffness: 1100, damping: 42 })
  const coreY = useSpring(my, { stiffness: 1100, damping: 42 })
  const frameX = useSpring(mx, { stiffness: 190, damping: 24 })
  const frameY = useSpring(my, { stiffness: 190, damping: 24 })
  const auraX = useSpring(mx, { stiffness: 52, damping: 18 })
  const auraY = useSpring(my, { stiffness: 52, damping: 18 })

  const [label, setLabel] = useState('')
  const [clicking, setClicking] = useState(false)
  const [visible, setVisible] = useState(false)
  const active = Boolean(label)

  useEffect(() => {
    const move = (event) => {
      mx.set(event.clientX)
      my.set(event.clientY)
      setVisible(true)
    }
    const over = (event) => {
      const target = event.target.closest('[data-cursor-label],a,button,[role="button"]')
      setLabel(target?.dataset.cursorLabel || (target ? 'ENTER' : ''))
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mousedown', down)
    document.addEventListener('mouseup', up)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mousedown', down)
      document.removeEventListener('mouseup', up)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [mx, my])

  return (
    <div className={`signature-cursor${visible ? ' is-visible' : ''}${active ? ' is-active' : ''}${clicking ? ' is-clicking' : ''}`}>
      <motion.div className="cursor-aura" style={{ x: auraX, y: auraY }} />

      <motion.div
        className="cursor-frame"
        style={{ x: frameX, y: frameY }}
        animate={{ width: active ? 72 : 34, height: active ? 72 : 34 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <i className="cursor-corner corner-tl" />
        <i className="cursor-corner corner-tr" />
        <i className="cursor-corner corner-br" />
        <i className="cursor-corner corner-bl" />
        <span className="cursor-orbit orbit-alpha"><b /></span>
        <span className="cursor-orbit orbit-beta"><b /></span>
        <motion.strong
          className="cursor-label"
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : -4 }}
        >
          {label}
        </motion.strong>
      </motion.div>

      <motion.div className="cursor-core" style={{ x: coreX, y: coreY }}>
        <span />
      </motion.div>
    </div>
  )
}
