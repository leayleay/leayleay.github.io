import { motion } from 'motion/react'

export default function SectionPortal({ from, to, index }) {
  return (
    <motion.div
      className="section-portal"
      initial={{ opacity: 0, scale: 0.82 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <motion.div
        className="portal-flare"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="portal-line" />
      <motion.div
        className="portal-core"
        initial={{ rotate: -90 }}
        whileInView={{ rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <i className="portal-ring ring-outer" />
        <i className="portal-ring ring-inner" />
        <i className="portal-pulse" />
        <b>{index}</b>
      </motion.div>
      <div className="portal-copy">
        <span>{from}</span>
        <i />
        <span>{to}</span>
      </div>
      <div className="portal-line" />
    </motion.div>
  )
}
