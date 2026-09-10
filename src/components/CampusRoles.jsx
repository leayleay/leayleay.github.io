import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Arrow } from './Shapes'
import { handleProjectLinkClick } from '../projectNav'
import './CampusRoles.css'

const ROLES = [
  {
    club: 'CADUM', role: 'Co-president', detail: 'Making things with student developers.', className: 'campus-cadum', mark: '</>',
    intro: 'At Université de Montréal’s mobile app development club, I help shape our projects and work with other students to bring them to life.',
    work: [
      { title: 'Supporting student developers', text: 'I co-lead the club’s direction and technical work, helping student developers take an idea through implementation and work together as a team.' },
      { title: 'Leading DejaBrew', text: 'I led our café-discovery app and wrote the majority of its codebase, working with a student team on maps, preferences, study sessions, and social features.', href: '?project=dejabrew#projects', link: 'Explore DejaBrew' },
      { title: 'Building the club’s website', text: 'I designed, built, and shipped CADUM’s website for recruitment, events, and sponsor outreach.', href: 'https://cadum.aediroum.ca', link: 'Visit the CADUM website', external: true },
      { title: 'Bringing CADUM to Hack the Mountain', text: 'I secured a dedicated CADUM mobile challenge at Hack the Mountain, a hackathon run jointly by PolyHX and UdeMHacks, and supervised the category. I also judged both the CADUM category and the hackathon’s main projects.', href: '#summer-2026', link: 'See the hackathon moments' },
    ],
    note: 'A place to learn by making things together.',
  },
  {
    club: 'PolyHX', role: 'VP of Sponsorships', detail: 'Connecting people, partners & ideas.', className: 'campus-polyhx', mark: '↗',
    intro: 'Hack the Mountain was run jointly by PolyHX and UdeMHacks, with CADUM joining in through its own mobile category, and that brought our three teams together. Afterward, I was invited to join PolyHX’s executive team as VP of Commandites (Sponsorships). I handle sponsor outreach and partner relationships for the hackathon community.',
    work: [
      { title: 'Connecting with sponsors', text: 'For the late-January 2027 edition, my work centers on contacting potential sponsors, following up on conversations, and developing relationships with partners.' },
      { title: 'Building Commandites 2027', text: 'I built a shared outreach tool around a pool of 712 companies and 14 email templates. It gives team members their own contact queue, tracks conversations, and sends emails from the club’s inbox.', href: '?project=commandites#projects', link: 'Inside Commandites 2027' },
      { title: 'Making outreach easier to coordinate', text: 'Company assignments, reminders, editable templates, and shared updates help the team keep track of who is contacting whom. The tool uses a browser interface, Google Apps Script, and shared storage in the club’s Drive.' },
    ],
    note: 'Helping the people behind the event stay connected.',
  },
]

export default function CampusRoles() {
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef(null)
  const [active, setActive] = useState(0)
  const role = ROLES[active]
  function openRole(index) {
    setActive(index)
    dialogRef.current.showModal()
  }
  function closeRole() { dialogRef.current.close() }
  return <div className="campus-roles" aria-label="My roles on campus">
    <div className="campus-caption"><span className="campus-caption-line" /><span>ALSO FIND ME ON CAMPUS</span></div>
    <div className="campus-passes">{ROLES.map((item, index) => <motion.button type="button" onClick={() => openRole(index)} aria-haspopup="dialog" aria-controls="campus-role-dialog" className={`campus-pass ${item.className}`} key={item.club} aria-label={`${item.role} at ${item.club}. See what I’ve done.`} initial={reduceMotion ? false : { opacity: 0, y: 12, rotate: index ? 3 : -3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: .55 + index * .12, duration: .5 }} whileHover={reduceMotion ? {} : { y: -4, rotate: index ? 1.5 : -1.5 }}>
      <span className="campus-pass-mark" aria-hidden="true">{item.mark}</span><span className="campus-pass-copy"><span className="campus-club">{item.club}</span><strong>{item.role}</strong><span className="campus-pass-detail">{item.detail}</span></span><span className="campus-pass-perforation" aria-hidden="true" /><span className="campus-pass-end" aria-hidden="true">TAKE A<br />LOOK ↗</span>
    </motion.button>)}</div>
    {createPortal(<dialog id="campus-role-dialog" className={`campus-dialog ${active ? 'campus-dialog-polyhx' : ''}`} ref={dialogRef} aria-labelledby="campus-dialog-title" aria-describedby="campus-dialog-intro" onClick={event => { if (event.target === event.currentTarget) closeRole() }}>
      <div className="campus-dialog-inner">
        <div className="campus-dialog-top"><span className="eyebrow">ON CAMPUS / THE THINGS I DO</span><button type="button" className="campus-dialog-close" onClick={closeRole} autoFocus aria-label="Close campus details">Close <span aria-hidden="true">×</span></button></div>
        <div className="campus-dialog-identity"><span className="campus-dialog-mark" aria-hidden="true">{role.mark}</span><div><h2 id="campus-dialog-title">{role.club}</h2><p>{role.role}</p></div></div>
        <p id="campus-dialog-intro" className="campus-dialog-intro">{role.intro}</p>
        <div className="campus-work-grid">{role.work.map((item, index) => <article className="campus-work-item" key={item.title}><span className="campus-work-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p>{item.href && <a className="campus-work-link" href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined} onClick={item.external ? undefined : event => handleProjectLinkClick(event, item.href, closeRole)}>{item.link}<Arrow /></a>}</article>)}</div>
        <div className="campus-dialog-bottom"><span className="handwritten">{role.note}</span><button type="button" onClick={() => { setActive(active ? 0 : 1); dialogRef.current.scrollTop = 0 }}>My work at {ROLES[active ? 0 : 1].club} <Arrow /></button></div>
      </div>
    </dialog>, document.body)}
  </div>
}
