import { motion, useReducedMotion } from 'motion/react'
import { Arrow, Spark } from './Shapes'
import Reveal from './Reveal'
import StudentPlayground from './StudentPlayground'
import CampusRoles from './CampusRoles'

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-topline">
          <span className="eyebrow">COMPUTER SCIENCE STUDENT</span>
          <a className="availability" href="#contact"><span />Looking for an internship <Arrow /></a>
        </div>
        <div className="hero-layout">
          <Reveal className="hero-copy">
            <p className="hero-hello">Hey, I’m <span>Léa Hemidj.</span> <span className="hello-wave" aria-hidden="true">✳</span></p>
            <h1 aria-label="Computer science student & self-care enthusiast.">
              {['Computer science', 'student & self-care', 'enthusiast.'].map((line, index) => <span className={`hero-line ${index > 0 ? 'hero-title-blue' : ''}`} key={line} aria-hidden="true"><motion.span initial={{ y: reduceMotion ? 0 : '110%', rotate: reduceMotion ? 0 : 3 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: .85, delay: .12 + index * .1, ease: [.22, 1, .36, 1] }}>{line}</motion.span></span>)}
            </h1>
            <CampusRoles />
            <p className="hero-description">I study computer science at Université de Montréal.<br className="desktop-break" /> Here you’ll find my latest projects, my campus involvement,<br className="desktop-break" /> and a few experiences that have shaped me.</p>
            <div className="hero-actions">
              <a href="#projects" className="button button-blue">Explore my work <Arrow direction="down" /></a>
              <a href="#contact" className="text-link">Get in touch <Arrow /></a>
            </div>
          </Reveal>
          <StudentPlayground />
        </div>
        <div className="hero-bottom">
          <span><span className="small-star">✳</span> A few projects. A little about me.</span>
          <a href="#projects">Take a look around <Arrow direction="down" /></a>
        </div>
      </div>
      <div className="discipline-strip" aria-label="Around this site">
        <div className="container"><span>Things I’ve made</span><Spark /><span>Lessons along the way</span><Spark /><span>Life on campus</span><Spark /><span>Ideas in progress</span><Spark /></div>
      </div>
    </section>
  )
}
