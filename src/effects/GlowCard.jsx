import { useRef, useState } from 'react'
import { motion } from 'motion/react'

export default function GlowCard({ children, accent = 'rgba(124,58,237,0.2)', style, className, ...rest }) {
  const ref = useRef(null)
  const [mouse, setMouse] = useState({ x: -999, y: -999 })
  const [hovering, setHovering] = useState(false)

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setMouse({ x: -999, y: -999 }) }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        border: hovering ? '1px solid rgba(167,139,250,0.3)' : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        transition: 'border-color 0.3s',
        ...style,
      }}
      className={className}
      {...rest}
    >
      {/* spotlight overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          borderRadius: 'inherit', pointerEvents: 'none',
          background: `radial-gradient(320px circle at ${mouse.x}px ${mouse.y}px, ${accent}, transparent 70%)`,
          opacity: hovering ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  )
}
