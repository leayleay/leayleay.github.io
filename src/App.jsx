import { motion, MotionConfig, useScroll, useSpring } from 'motion/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Summer2026 from './components/Summer2026'
import About from './components/About'
import Projects from './components/Projects'
import DocumentProjects from './components/DocumentProjects'
import Contact from './components/Contact'
import './App.css'
import './Compact.css'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 })
  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Summer2026 />
        <Projects />
        <DocumentProjects />
        <About />
        <Contact />
      </main>
    </MotionConfig>
  )
}
