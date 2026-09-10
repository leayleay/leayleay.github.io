import { Spark } from './Shapes'

const GROUPS = [
  { number: '01', symbol: '</>', title: 'Languages', description: 'The building blocks, across paradigms and platforms.', skills: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'C', 'PHP', 'Haskell', 'HTML / CSS'] },
  { number: '02', symbol: '{ }', title: 'Frameworks', description: 'From a first idea to an interface you can use.', skills: ['React', 'React Native / Expo', 'Vue 3', 'Spring & JPA', 'Thymeleaf', 'Vite'] },
  { number: '03', symbol: '◫', title: 'Data & APIs', description: 'The logic and data that bring it all together.', skills: ['PostgreSQL', 'H2', 'Flyway migrations', 'REST', 'JSON', 'Fetch / AJAX'] },
  { number: '04', symbol: '↗', title: 'Tooling', description: 'For building, shipping, and working together.', skills: ['Git & GitHub', 'GitHub Actions (CI/CD)', 'Docker', 'Maven', 'ESLint', 'Valgrind', 'Agile / Scrum'] },
]


export default function Skills() {
  return <div className="compact-skills" id="skills">
    {GROUPS.map(group => <div className="compact-skill-group" key={group.number}><h3><span>{group.symbol}</span>{group.title}</h3><div className="tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}
    <div className="compact-learning"><Spark /><p><strong>Always learning</strong> These are tools I’ve used in projects and coursework. The list keeps growing.</p></div>
  </div>
}
