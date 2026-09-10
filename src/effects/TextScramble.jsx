import { useState, useEffect } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!?'

function useScramble(text, { delay = 0, duration = 1400 } = {}) {
  const [output, setOutput] = useState(() => text.replace(/\S/g, () => CHARS[Math.floor(Math.random() * CHARS.length)]))
  const [active, setActive] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    let raf

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const locked = Math.floor(progress * text.length)

      let result = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') result += ' '
        else if (i < locked) result += text[i]
        else result += CHARS[Math.floor(Math.random() * CHARS.length)]
      }

      setOutput(result)
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setOutput(text)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, text, duration])

  return output
}

export default function ScrambleText({ text, delay = 0, duration = 1400, className, style }) {
  const output = useScramble(text, { delay, duration })
  return <span className={className} style={style}>{output}</span>
}
