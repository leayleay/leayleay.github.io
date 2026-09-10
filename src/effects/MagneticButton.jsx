import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function MagneticButton({ children, strength = 0.32, style, onClick, href, className, type, cursorLabel = 'ENTER' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 26 })
  const sy = useSpring(y, { stiffness: 300, damping: 26 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ display: 'inline-block', x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {href ? (
        <a href={href} style={style} className={className} data-cursor-label={cursorLabel}>{children}</a>
      ) : (
        <button type={type || 'button'} onClick={onClick} style={style} className={className} data-cursor-label={cursorLabel}>{children}</button>
      )}
    </motion.div>
  )
}
