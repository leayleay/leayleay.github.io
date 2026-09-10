import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Reveal from './Reveal'
import { Spark } from './Shapes'
import Tabs from './Tabs'
import Skills from './Skills'
import Experience from './Experience'
import RennaiExperience from './RennaiExperience'

const SECTIONS = [{ id: 'human', label: 'About me' }, { id: 'toolkit', label: 'My toolkit' }, { id: 'journey', label: 'Along the way' }]

export default function About() {
  const [active, setActive] = useState('human')
  const reduceMotion = useReducedMotion()

  return <section id="about" className="about-section section-space">
    <div className="container about-compact-layout">
      <Reveal className="about-art">
        <div className="about-index eyebrow">A FEW THINGS ABOUT ME</div>
        <div className="about-note"><span className="note-tape" aria-hidden="true" /><span className="handwritten">These days</span><p>Computer science.<br />Projects & clubs.<br /><span>Life in Montréal.</span></p><Spark /><span className="note-signature handwritten">Léa</span></div>
        <div className="about-sticker">Studying at<br /><strong>UdeM</strong></div>
      </Reveal>
      <Reveal className="profile-content">
        <p className="eyebrow section-label">02 / A LITTLE ABOUT ME</p>
        <h2>The <span className="serif-accent">short version.</span></h2>
        <Tabs id="profile" label="Get to know Léa" tabs={SECTIONS} active={active} onChange={setActive} />
        <div className="profile-panel-wrap">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} role="tabpanel" tabIndex={0} id={`profile-panel-${active}`} aria-labelledby={`profile-tab-${active}`} className="profile-panel" initial={{ opacity: 0, x: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduceMotion ? 0 : -12 }} transition={{ duration: .2 }}>
              {active === 'human' && <div className="about-copy">
                <p className="about-lead">I’m a third-year computer science student at Université de Montréal, co-president of CADUM, and VP of Sponsorships at PolyHX.</p>
                <p>My projects have taken me from Java backends to mobile apps and creative tools. At CADUM, our mobile app development club, I work with other students to bring ideas to life. At PolyHX, I help connect our hackathon community with sponsors and partners.</p>
                <p>I’m still discovering where I want to go in computer science. For now, I’m enjoying trying things, asking questions, and learning from the people I work with.</p>
                <RennaiExperience />
                <div className="about-values"><span><i>01</i> Curiosity</span><span><i>02</i> Initiative</span><span><i>03</i> Collaboration</span></div>
              </div>}
              {active === 'toolkit' && <Skills />}
              {active === 'journey' && <Experience />}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </div>
  </section>
}
