
const ITEMS = [
  { date: 'SUMMER 2026', title: 'Vignette · Supervised development project', type: 'UNIVERSITÉ DE MONTRÉAL · A+', description: 'Completed under the supervision of Monsieur Louis-Édouard Lafontant. Redesigned the Studio and creation experience, built recording components, refined media workflows, strengthened backend validation and tests, and wrote the Studio and Vignette Maker creation guide. Integrated shared features in collaboration with the team.' },
  { date: '2025 - 2026', title: 'Co-President · CADUM', type: 'LEADERSHIP', description: 'Co-lead the mobile app development club’s direction and technical work, mentoring student developers from idea to shipped application. Secured a dedicated CADUM mobile challenge at Hack the Mountain 2026, a hackathon run jointly by PolyHx and UdeMHacks, then supervised that category end to end and judged both the hackathon’s main projects and the CADUM mobile category.' },
  { date: '2026', title: 'VP Sponsorships · PolyHx', type: 'LEADERSHIP', description: 'Invited onto the executive team as VP of Commandites after Hack the Mountain, run jointly by PolyHx and UdeMHacks with CADUM’s own mobile category, brought the three teams together; own sponsor outreach and partner relationships for Polytechnique Montréal’s hackathon organization club.' },
  { date: 'WORK EXPERIENCE', title: 'Self-care specialist · Rennaï', type: 'SCIENCE TEAM', description: 'Worked at Rennaï as a self-care specialist on the science team. A few photos and videos from that experience are in the About me tab.' },
  { date: '2024 - PRESENT', title: 'B.Sc. Computer Science · UdeM', type: 'EDUCATION', description: 'Third-year student at Université de Montréal, current GPA 3.2, building a foundation across algorithms, databases, operating systems, and software engineering.' },
]

const MOMENTS = [
  { id: 'hackmountain', wash: 'lime', media: 'photo', tag: 'HACK THE MOUNTAIN · POLYHX × UDEMHACKS', title: 'A CADUM category, front and center' },
  { id: 'judging', wash: 'blue', media: 'photo', tag: 'JUDGING · HACK THE MOUNTAIN', title: 'On the other side of the table' },
  { id: 'udemhacks', wash: 'lilac', media: 'photo', tag: 'UDEMHACKS 2026', title: 'Organizing, ground up' },
  { id: 'vignettemaker', wash: 'sand', media: 'video', tag: 'VIGNETTE · TEAM OF 3', title: 'Rebuilding the studio' },
]


export default function Experience() {
  return <div className="compact-experience" id="experience">
    {ITEMS.map(item => <details className="journey-item" key={item.title}><summary><span className="journey-dot" aria-hidden="true" /><span><span className="eyebrow">{item.date} / {item.type}</span><strong>{item.title}</strong></span><span className="details-symbol" aria-hidden="true" /></summary><div className="journey-detail"><p>{item.description}</p>{item.title.includes('CADUM') && <p>I also designed, built, and shipped <a href="https://cadum.aediroum.ca" target="_blank" rel="noreferrer">cadum.aediroum.ca ↗</a>, the club’s home for recruitment, events, and sponsor outreach.</p>}</div></details>)}
    <details className="journey-moments"><summary>2026, in a few moments <span aria-hidden="true">+</span></summary><div className="compact-moments">{MOMENTS.map(moment => <div key={moment.id} className={`compact-moment wash-${moment.wash}`}><span className="eyebrow">{moment.tag}</span><strong>{moment.title}</strong></div>)}</div></details>
  </div>
}
