import { useState } from 'react'
import { Arrow } from './Shapes'

const LINKS = [['Summer 2026', '#summer-2026'], ['My work', '#projects'], ['A little about me', '#about']]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Main navigation">
        <a href="#hero" className="wordmark" aria-label="Léa Hemidj, home" onClick={() => setMenuOpen(false)}>léa<span>✳</span></a>
        <span className="nav-caption">My little corner<br />of the internet.</span>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`} id="navigation-links">
          {LINKS.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <Arrow /></a>
        </div>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="navigation-links" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'Close −' : 'Menu +'}
        </button>
      </nav>
    </header>
  )
}
