import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export default function Tabs({ id, label, tabs, active, onChange }) {
  const listRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const list = listRef.current
    const selected = list?.querySelector('[aria-selected="true"]')
    if (!selected) return
    const listBounds = list.getBoundingClientRect()
    const tabBounds = selected.getBoundingClientRect()
    const offset = tabBounds.left < listBounds.left + 5
      ? tabBounds.left - listBounds.left - 5
      : Math.max(0, tabBounds.right - listBounds.right + 5)
    if (offset) list.scrollBy({ left: offset, behavior: reduceMotion ? 'instant' : 'smooth' })
  }, [active, reduceMotion])

  function handleKeyDown(event, index) {
    let next
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    else return
    event.preventDefault()
    onChange(tabs[next].id)
    event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next].focus()
  }

  return <div className="tabs" ref={listRef} role="tablist" aria-label={label}>
    {tabs.map((tab, index) => <button type="button" key={tab.id} id={`${id}-tab-${tab.id}`} role="tab" aria-selected={active === tab.id} aria-controls={`${id}-panel-${tab.id}`} tabIndex={active === tab.id ? 0 : -1} onClick={() => onChange(tab.id)} onKeyDown={event => handleKeyDown(event, index)}>
      {active === tab.id && <motion.span className="tab-highlight" layoutId={`${id}-highlight`} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
      <span className="tab-label">{tab.number && <small>{tab.number}</small>}{tab.label}</span>
    </button>)}
  </div>
}
