import { useState, useEffect } from 'react'

export default function MorphingText({ texts, className, style }) {
  const [index, setIndex] = useState(0)
  const [morphing, setMorphing] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setMorphing(true)
      setTimeout(() => {
        setIndex(i => (i + 1) % texts.length)
        setMorphing(false)
      }, 380)
    }, 2600)
    return () => clearInterval(id)
  }, [texts.length])

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        filter: morphing ? 'blur(10px)' : 'blur(0px)',
        opacity: morphing ? 0 : 1,
        transition: 'filter 0.38s ease, opacity 0.38s ease',
        ...style,
      }}
    >
      {texts[index]}
    </span>
  )
}
