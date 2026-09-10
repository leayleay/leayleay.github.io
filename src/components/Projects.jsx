import Reveal from './Reveal'
import { Arrow, Spark } from './Shapes'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Tabs from './Tabs'
import VignetteMakerVisual from './VignetteMakerVisual'
import DejaBrewVisual from './DejaBrewMedia'
import CommanditesVisual from './CommanditesVisual'
import VignetteMedia from './VignetteMedia'

const PROJECTS = [
  {
    id: 'vignette', number: '01', title: 'Vignette', category: 'UNIVERSITÉ DE MONTRÉAL · SUMMER 2026', academic: true,
    description: 'A supervised development project at Université de Montréal, completed in summer 2026. Working with the team, I redesigned the creation Studio and improved the recording, editing, and playback experience.',
    role: 'My work: Studio redesign, audio and storyboard workflows, backend validation and tests, and the creation guide.',
    tags: ['Java 21', 'Spring / JPA', 'PostgreSQL', 'Flyway', 'Vue 3', 'Docker'],
    problem: 'Give oral-tradition languages a durable, structured home, one that survives beyond any single speaker or recording.',
    contribution: 'I led two passes of visual and functional redesign across the Studio, scenario creation, homepage, and personal space. I created EmergencyAudioRecorder.vue and StudioRecorderPanel.vue, then refined image deletion, background-audio selection, audio trimming, and fullscreen scenario playback.',
    techniques: [
      ['June–July · Redesigning the creation experience', 'My June 14 commit rebuilt the Studio and creation pages, introduced the two recorder components, and reworked palette tokens and storyboard styling. On July 2, I refined the Studio, homepage, personal space, and discussion interface, and implemented image deletion through the thumbnail controller, service, and file-storage layer.'],
      ['August · Media workflows & backend reliability', 'I added startup schema validation through AudioSchemaMaintenance, ThumbnailSchemaMaintenance, and ScenarioSchemaMaintenance, hardened AudioSecurity, and added or extended backend tests. Later changes included active background-audio selection through PATCH /api/scenarios/{id}/background-audio, audio trimming, and the fullscreen scenario reader, with associated tests.'],
      ['Documentation · Explaining the whole workflow', 'I wrote docs/volet-creation.md, a 2,264-line guide covering the Studio and Vignette Maker. The guide documents the creation workflow so the interface, media features, and illustration tools can be understood together.'],
      ['Team integration · Bringing shared work together', 'I integrated the Vignette Maker, Python Glottolog pipeline, and shared community updates into the repository with the team. Integration is part of my contribution; these features include collaborative work and are not presented as code I authored alone.'],
    ],
    connection: 'A summer spent improving an existing application with a team: designing the experience, following media changes through the backend, testing the details, and documenting what we built.',
  },
  {
    id: 'vignette-maker', number: '02', title: 'Vignette Maker', category: 'TEAM FEATURE · VIGNETTE · SUMMER 2026', academic: true,
    description: 'An in-app illustrator developed within the Vignette team project. Users compose characters, poses, outfits, and dialogue, then add the scene directly to a scenario.',
    role: 'My contribution: integrating the Maker with shared project updates and writing the Studio and Maker creation guide. The feature was developed collaboratively.',
    tags: ['Vue 3', 'JavaScript / SVG', 'Canvas API', 'Spring Boot', 'PostgreSQL'],
    problem: 'Let people illustrate scenarios without drawing skills, external design tools, or stock art. Start with 12 character archetypes, then customize their appearance, expressions, poses, bubbles, and background.',
    contributionTitle: 'How it’s built',
    contribution: 'Vue 3’s Composition API manages the scene as reactive state. A framework-free JavaScript engine composes SVG paths and shapes, using trigonometry to position limbs. The Canvas API rasterizes the SVG for thumbnails and higher-resolution PNG export.',
    workflow: '“Use This Image” exports a PNG Blob and passes it, together with the scene state, into the existing image-upload flow. The illustration becomes part of the scenario without leaving the app.',
    persistence: 'localStorage auto-saves work in progress and restores it on reopening. Named scenes are saved as editable JSON through a Spring Boot CRUD API, JPA, and PostgreSQL, with Flyway migrations and Spring Security access scoped to the authenticated user.',
    connection: 'Lightweight vector art makes combinations possible without a library of bitmap assets. Saving the scene state means characters, text, and poses can be revisited instead of starting over.',
  },
  {
    id: 'dejabrew', number: '03', title: 'DejaBrew', category: 'REACT NATIVE · COMING THIS WINTER',
    notice: { label: 'Coming this winter', text: 'A preview of the app ahead of its public release.' },
    description: 'The study spot you didn’t know you needed. A map-based app that helps Montréal students find cafés that actually fit how they work.',
    tags: ['React Native', 'Expo', 'TypeScript', 'REST API', 'OpenStreetMap'],
    problem: 'Montréal has no shortage of cafés, but no easy way to find one that matches your Wi-Fi, noise, outlet, or budget needs.',
    contribution: 'Led the project inside CADUM and wrote the majority of the codebase, guiding a student team from the initial concept toward its public release this winter. Built map-based discovery with React Native Maps, Expo Location, and OpenStreetMap/Overpass data, plus a preference questionnaire, study-session scheduling, friend invites, and reviews over a Bearer-token REST API with AsyncStorage persistence across iOS, Android, and web.',
    connection: 'Taking a club idea from a Discord message to something people will actually open every day.',
  },
  {
    id: 'commandites', number: '04', title: 'Commandites 2027', category: 'POLYHX · SPONSOR OUTREACH · JANUARY 2027',
    notice: { label: 'Private internal tool', text: 'I can’t share the live app because it contains sensitive sponsor contacts and outreach information. The preview is an illustration; the technical overview explains how it works.' },
    description: '712 companies, one team, and a clear next step. An outreach tool for PolyHX’s late-January 2027 event, bringing company assignments, shared email templates, sending, and follow-ups into one place.',
    tags: ['React', 'JavaScript', 'Google Apps Script', 'GitHub Pages', 'localStorage'],
    problem: 'Coordinate a team contacting 712 potential sponsors without losing track of who owns each conversation. Companies are grouped into tiers A, B, and C; each member gets a personal queue with the next action to take.',
    contributionTitle: 'The architecture',
    contribution: 'A static browser app hosted on GitHub Pages, paired with a Google Apps Script web app for email and shared storage. The React interface runs without a build step; separate JavaScript modules hold company data, email templates, and team configuration. Nocturne CSS variables keep colors, typography, and spacing consistent. There is no separately managed server or conventional database.',
    techniques: [
      ['Personal queues & email templates', 'Members see their assigned companies, notes, conversation status, and follow-up reminders. Fourteen editable templates cover company sectors and outreach stages. Variables such as {{compagnie}}, {{prenom}}, and {{participants}} are filled from the data, and the template is selected according to sector and status. A contact-finding panel provides prepared searches, candidate addresses to verify, and list pasting.'],
      ['Sending from the club’s inbox', 'The browser posts JSON to a Google Apps Script web app, which sends mail through GmailApp.sendEmail in the club’s account. The tool uses a 100-email daily limit. A shared key filters requests; the app does not store a Gmail password because the script runs within the club account.'],
      ['Shared data without a database server', 'Apps Script stores shared assignments in a JSON file in the club’s Google Drive. LockService serializes writes so simultaneous updates do not overwrite each other. Server-side merge rules give administrator assignments priority, let discovered addresses fill gaps, prevent statuses from moving backward, and leave personal notes untouched.'],
      ['Keeping the team in sync', 'Assignment changes wait 2.5 seconds before being written, combining rapid clicks into fewer requests. Shared state refreshes on startup, every 60 seconds, and when a member returns to the browser tab. Unicode name normalization helps match names consistently, including accented and unaccented variants.'],
      ['Local storage & fallback', 'localStorage preserves each member’s statuses, notes, and added companies between sessions. Data sources fall back from Apps Script to a read-only etats.json on GitHub, then to local data. A roughly 600 KB standalone HTML version inlines the app for offline work; sending email and synchronizing still require a connection.'],
      ['Access & configuration tradeoffs', 'Salted SHA-256 password hashes provide a lightweight access gate, not strong protection for a public client-side app. A pasted team code carries access settings, inbox configuration, and templates as Base64-encoded JSON. Base64 is encoding, not encryption, so this configuration stays out of the public repository.'],
    ],
    status: 'One team member’s synchronization issue is still being debugged.',
    connection: 'A practical campus project where the details matter: shared ownership, concurrent edits, unreliable connections, and a workflow the whole team can follow.',
  },
]

const EARLIER_PROJECTS = [
  {
    id: 'frigo', number: '05', title: 'Frigo App', category: 'FULL-STACK · EVERYDAY SUSTAINABILITY',
    description: 'An ingredient and recipe manager for a more thoughtful kitchen: a little less food waste, a lot less “what’s for dinner?”',
    tags: ['PHP', 'MySQL', 'JavaScript'],
    problem: 'Make it easier to keep track of ingredients and plan meals around what is already in the fridge.',
    contribution: 'Full-stack development of an ingredient and recipe manager, bringing the interface and database together.',
    connection: 'An exploration of how software can help people make better use of everyday resources.',
  },
  {
    id: 'profiles', number: '06', title: 'Profiles API', category: 'FULL-STACK · CONNECTED SYSTEMS',
    description: 'A profile management application connecting a React frontend with a REST API, from the interface all the way to the database.',
    tags: ['React', 'Node.js', 'MongoDB'],
    problem: 'Connect user profiles and authentication flows through a clear, structured application.',
    contribution: 'API and frontend development using the MERN stack, with authentication flows and profile management.',
    connection: 'Building a foundation in the way interfaces, APIs, and data work together.',
  },
]

function VignetteVisual() {
  return <div className="project-visual vignette-visual">
    <span className="visual-caption">EVERY WORD, KEPT.</span>
    <div className="vignette-card" aria-hidden="true">
      <div className="preview-topbar"><strong>vignette<span>✳</span></strong><span>Archive <span className="preview-avatar">L</span></span></div>
      <div className="vignette-body">
        <span>PRESERVING VOICES</span>
        <h4>Every word matters.</h4>
        <p>Recordings, transcripts, and translations, together.</p>
        <div className="language-list">
          <div><span className="language-dot" style={{ background: '#c98a4f' }} /><strong>Anishinaabemowin</strong><small>12 recordings</small></div>
          <div><span className="language-dot" style={{ background: '#a9744a' }} /><strong>Wolastoqey</strong><small>New this week</small></div>
          <div><span className="language-dot" style={{ background: '#8a5c33' }} /><strong>Kanien’kéha</strong><small>In review</small></div>
        </div>
        <div className="vignette-footer"><span>Language lives in the telling.</span><span>Explore archive ↗</span></div>
      </div>
    </div>
    <span className="preview-label">INTERFACE ILLUSTRATION</span>
  </div>
}

function EarlierVisual({ project }) {
  return <div className={`project-visual earlier-visual earlier-${project.id}`}>
    <span className="visual-caption">{project.id === 'frigo' ? 'SMALL HABITS. REAL IMPACT.' : 'EVERY CONNECTION COUNTS.'}</span>
    {project.id === 'frigo' ? <div className="frigo-poster" aria-hidden="true"><span>frigo ✳</span><strong>Waste less.<br /><em>Make more.</em></strong><div className="poster-ingredients"><i /><i /><i /></div><span>A LITTLE MORE THOUGHTFUL, BY DESIGN.</span></div> : <div className="system-poster" aria-hidden="true"><span className="system-node">UI</span><i>↔</i><span className="system-node">API</span><i>↔</i><span className="system-node">DATA</span><code>const possibilities = 'endless';</code><Spark /></div>}
    <span className="preview-label">PROJECT ILLUSTRATION</span>
  </div>
}

function ProjectNotes({ project }) {
  const [open, setOpen] = useState(false)
  return <div className={`project-details ${open ? 'notes-open' : ''}`}>
    <button type="button" className="project-notes-toggle" aria-expanded={open} aria-controls={`notes-${project.id}`} onClick={() => setOpen(!open)}>Inside the project <span className="details-symbol" aria-hidden="true" /></button>
    <AnimatePresence initial={false}>
      {open && <motion.div id={`notes-${project.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} style={{ overflow: 'hidden' }}>
        <div className="project-detail-content">
          <div><h4>The problem</h4><p>{project.problem}</p></div>
          <div><h4>{project.contributionTitle || 'My contribution'}</h4><p>{project.contribution}</p></div>
          {project.workflow && <div><h4>From scene to scenario</h4><p>{project.workflow}</p></div>}
          {project.persistence && <div><h4>Saved to keep creating</h4><p>{project.persistence}</p></div>}
          {project.techniques?.map(([title, description]) => <details className="project-techniques" key={title}><summary>{title}<span aria-hidden="true">+</span></summary><p>{description}</p></details>)}
          {project.status && <div><h4>Still being worked on</h4><p>{project.status}</p></div>}
          <div><h4>Why it matters to me</h4><p>{project.connection}</p></div>
          <a className="text-link" href={`mailto:leahemidj2019@gmail.com?subject=${encodeURIComponent('Let’s talk about ' + project.title)}`}>Ask me about this project <Arrow /></a>
        </div>
      </motion.div>}
    </AnimatePresence>
  </div>
}

const ALL_PROJECTS = [...PROJECTS, ...EARLIER_PROJECTS]

export default function Projects() {
  const [active, setActive] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('project')
    return ALL_PROJECTS.some(project => project.id === requested) ? requested : ALL_PROJECTS[0].id
  })
  const reduceMotion = useReducedMotion()
  const index = ALL_PROJECTS.findIndex(project => project.id === active)
  const project = ALL_PROJECTS[index]

  useEffect(() => {
    function handleOpenProject(event) {
      if (ALL_PROJECTS.some(item => item.id === event.detail)) setActive(event.detail)
    }
    window.addEventListener('site:open-project', handleOpenProject)
    return () => window.removeEventListener('site:open-project', handleOpenProject)
  }, [])

  return <section id="projects" className="projects-section section-space">
    <div className="container">
      <Reveal className="section-heading compact-heading">
        <div><h2>LATEST PROJECTS<Spark /></h2></div>
        <p>A few projects. A lot of learning.</p>
      </Reveal>
      <Reveal className="project-showcase">
        <div className="showcase-toolbar">
          <Tabs id="work" label="Choose a project" tabs={ALL_PROJECTS.map(item => ({ id: item.id, label: item.title, number: item.number }))} active={active} onChange={setActive} />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.article key={project.id} id={`work-panel-${project.id}`} role="tabpanel" aria-labelledby={`work-tab-${project.id}`} tabIndex={0} className="showcase-panel" initial={{ opacity: 0, y: reduceMotion ? 0 : 15, filter: reduceMotion ? 'none' : 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: reduceMotion ? 0 : -10, filter: reduceMotion ? 'none' : 'blur(4px)' }} transition={{ duration: 0.23 }}>
            <div className="showcase-art">
              {project.id === 'vignette' ? <VignetteMedia fallback={<VignetteVisual />} /> : project.id === 'vignette-maker' ? <VignetteMakerVisual /> : project.id === 'dejabrew' ? <DejaBrewVisual /> : project.id === 'commandites' ? <CommanditesVisual /> : <EarlierVisual project={project} />}
            </div>
            <div className="showcase-copy">
              <div className="project-meta"><span>{project.category}</span><span>/{project.number}</span></div>
              <h3>{project.title}</h3>
              {project.academic && <div className="project-academic"><span className="project-grade" aria-label="Final grade A plus">A+</span><div><strong>Projet de développement supervisé</strong><span>Université de Montréal · Été 2026</span><span>Supervisé par Monsieur Louis-Édouard Lafontant</span></div></div>}
              <p className="project-description">{project.description}</p>
              {project.role && <p className="project-role">{project.role}</p>}
              {project.notice && <div className={`project-notice notice-${project.id}`}><strong>{project.notice.label}</strong><p>{project.notice.text}</p></div>}
              <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <ProjectNotes project={project} />
            </div>
          </motion.article>
        </AnimatePresence>
        <div className="showcase-footer"><span className="eyebrow"><b>{project.number}</b> / {String(ALL_PROJECTS.length).padStart(2, '0')} <span className="showcase-footer-note"> · BUILT, TESTED, LEARNED.</span></span><div className="project-navigation"><button type="button" onClick={() => setActive(ALL_PROJECTS[(index - 1 + ALL_PROJECTS.length) % ALL_PROJECTS.length].id)} aria-label="Previous project">←</button><button type="button" onClick={() => setActive(ALL_PROJECTS[(index + 1) % ALL_PROJECTS.length].id)} aria-label="Next project">→</button></div></div>
      </Reveal>
    </div>
  </section>
}
