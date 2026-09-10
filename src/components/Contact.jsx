import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { Arrow, LinkedIn, Spark } from './Shapes'

const EMAIL = 'leahemidj2019@gmail.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/l%C3%A9a-hemidj'

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState('Copy email')
  const [noteStatus, setNoteStatus] = useState('')
  const resetTimer = useRef(null)
  const noteTimer = useRef(null)

  useEffect(() => () => { clearTimeout(resetTimer.current); clearTimeout(noteTimer.current) }, [])

  async function copyEmail() {
    clearTimeout(resetTimer.current)
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopyStatus('Copied!')
    } catch {
      setCopyStatus('Please select the email to copy')
    }
    resetTimer.current = setTimeout(() => setCopyStatus('Copy email'), 4000)
  }

  // mailto: only does something if the browser has a mail app configured to
  // handle it — with none set up, clicking it silently does nothing. Copy the
  // address too, so there's always a visible, useful result either way.
  async function handleSendNote() {
    clearTimeout(noteTimer.current)
    try {
      await navigator.clipboard.writeText(EMAIL)
      setNoteStatus(`Opening your email app. If nothing happens, copy this: ${EMAIL}`)
    } catch {
      setNoteStatus(`If nothing opened, email me at ${EMAIL}`)
    }
    noteTimer.current = setTimeout(() => setNoteStatus(''), 6000)
  }

  return <section id="contact" className="contact-section">
    <div className="container">
      <Reveal className="contact-content">
        <div className="contact-topline"><p className="eyebrow">03 / SAY HELLO</p><span className="contact-availability"><i />OPEN TO INTERNSHIPS</span></div>
        <h2>Let’s get<br /><span className="serif-accent">to know each other.</span><Spark /></h2>
        <div className="contact-bottom">
          <p>Have a question about a project, an opportunity to share,<br />or just want to say hello? I’d love to hear from you.</p>
          <div className="contact-cta">
            <div className="contact-cta-buttons">
              <a className="button button-paper" href={`mailto:${EMAIL}?subject=Hello%20L%C3%A9a`} onClick={handleSendNote}>Send me a note <Arrow /></a>
              <a className="button button-outline" href={LINKEDIN_URL} target="_blank" rel="noreferrer"><LinkedIn /> Connect on LinkedIn</a>
            </div>
            <span className="contact-cta-status" aria-live="polite">{noteStatus}</span>
          </div>
        </div>
        <div className="email-row">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <button type="button" className="copy-email" onClick={copyEmail} aria-live="polite">{copyStatus} <span aria-hidden="true">⧉</span></button>
        </div>
      </Reveal>
      <footer className="site-footer"><a href="#hero" className="footer-name">Léa Hemidj <span>✳</span></a><span>Made by me. Still a work in progress.</span><a href="#hero">Back to top <Arrow /></a><span className="copyright">© {new Date().getFullYear()}</span></footer>
    </div>
  </section>
}
