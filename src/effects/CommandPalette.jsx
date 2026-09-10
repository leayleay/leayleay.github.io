import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const ITEMS = [
  { id: 'about',      label: 'Go to About',       hint: 'My story',        icon: '◈', section: '#about' },
  { id: 'projects',   label: 'Go to Projects',     hint: 'What I built',   icon: '⬡', section: '#projects' },
  { id: 'skills',     label: 'Go to Skills',       hint: 'Tech stack',     icon: '◉', section: '#skills' },
  { id: 'experience', label: 'Go to Experience',   hint: 'My journey',     icon: '◌', section: '#experience' },
  { id: 'contact',    label: 'Contact Me',         hint: 'Send a signal',  icon: '✦', section: '#contact' },
]

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef(null)

  const filtered = query
    ? ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : ITEMS

  useEffect(() => {
    if (!open) return undefined
    const timeout = setTimeout(() => inputRef.current?.focus(), 50)
    return () => clearTimeout(timeout)
  }, [open])

  useEffect(() => {
    const handler = (e) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSel(s => Math.max(s - 1, 0)) }
      if (e.key === 'Enter') {
        const item = filtered[sel]
        if (!item) return
        if (item.section) document.querySelector(item.section)?.scrollIntoView({ behavior: 'smooth' })
        else if (item.href) window.open(item.href, '_blank')
        onClose()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, filtered, sel, onClose])

  const execute = (item) => {
    if (item.section) document.querySelector(item.section)?.scrollIntoView({ behavior: 'smooth' })
    else if (item.href) window.open(item.href, '_blank')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 8000,
            background: 'rgba(10,0,3,0.75)',
            backdropFilter: 'blur(22px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <motion.div
            initial={{ scale: 0.93, y: -18, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.93, y: -18, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 560,
              borderRadius: 16, overflow: 'hidden',
              background: 'rgba(50,0,12,0.96)',
              border: '1px solid rgba(246,0,61,0.22)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(246,0,61,0.08)',
            }}
          >
            {/* Input row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '18px 22px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ color: '#E20039', fontSize: 16, flexShrink: 0 }}>✦</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setSel(0) }}
                placeholder="Type a command..."
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: '#FFF4F7', fontSize: 15,
                  fontFamily: 'var(--ff-mono)',
                }}
              />
              <kbd style={{
                padding: '2px 7px', borderRadius: 5, fontSize: 11,
                background: 'rgba(255,255,255,0.07)', color: '#CFA6B2',
                fontFamily: 'var(--ff-mono)',
              }}>ESC</kbd>
            </div>

            {/* Results */}
            <div style={{ maxHeight: 340, overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <p style={{ padding: '24px 22px', color: '#CFA6B2', fontSize: 14, fontFamily: 'var(--ff-mono)' }}>
                  No results.
                </p>
              ) : filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  onClick={() => execute(item)}
                  onMouseEnter={() => setSel(i)}
                  whileHover={{ x: 2 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '13px 22px',
                    background: sel === i ? 'rgba(246,0,61,0.1)' : 'transparent',
                    borderLeft: sel === i ? '2px solid #E20039' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                  }}
                >
                  <span style={{ color: sel === i ? '#E20039' : '#590016', fontSize: 15, width: 22, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, color: sel === i ? '#FFF4F7' : '#CFA6B2', fontWeight: sel === i ? 500 : 400 }}>{item.label}</p>
                    <p style={{ fontSize: 11, color: '#590016', fontFamily: 'var(--ff-mono)', marginTop: 1 }}>{item.hint}</p>
                  </div>
                  {sel === i && <span style={{ fontSize: 11, color: '#590016', fontFamily: 'var(--ff-mono)' }}>↵</span>}
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              display: 'flex', gap: 20, padding: '10px 22px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}>
              {[['↑↓', 'navigate'], ['↵', 'select'], ['esc', 'close']].map(([k, v]) => (
                <span key={k} style={{ fontSize: 11, color: '#590016', fontFamily: 'var(--ff-mono)' }}>
                  <kbd style={{ marginRight: 4, color: '#CFA6B2' }}>{k}</kbd>{v}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
