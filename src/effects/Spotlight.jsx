import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function Spotlight({ color = 'rgba(124,58,237,0.12)', size = 700 }) {
  const mx = useMotionValue(-9999)
  const my = useMotionValue(-9999)
  const x = useSpring(mx, { stiffness: 60, damping: 18 })
  const y = useSpring(my, { stiffness: 60, damping: 18 })

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 1,
        x, y,
        translateX: '-50%', translateY: '-50%',
        width: size, height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}, transparent 65%)`,
      }}
    />
  )
}
