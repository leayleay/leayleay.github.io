import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Reveal from './Reveal'
import Tabs from './Tabs'
import './DocumentProjects.css'

const PROJECTS = [
  {
    id: 'qa', label: 'Document Q&A', number: '01', title: 'Ask a question. Find the source.',
    description: 'Bilingual document Q&A that makes dense French documents easier to navigate. Questions lead to answers grounded in the source material, with citations back to the exact article.',
    input: 'French documents + a question', output: 'An answer with article citations',
    tags: ['FastAPI', 'SQLite', 'Retrieval-augmented generation', 'French / English'],
    details: [
      ['The problem', 'Procedures, manuals, and legal texts contain useful answers, but finding the right passage can mean searching through pages of formal French. This project brings the relevant evidence into the answer itself.'],
      ['How it works', 'Retrieval finds passages relevant to the question. Those passages provide context for generating an answer, while article references let the reader go back to the original text and check it. This approach is called retrieval-augmented generation, or RAG.'],
      ['What makes it interesting', 'The challenge goes beyond producing fluent text: the system needs to find the right passage in French and preserve its meaning when answering in either language. Source citations make the answer easier to inspect.'],
    ],
  },
  {
    id: 'eval', label: 'Q&A evaluation', number: '02', title: 'Does it find the right answer?',
    description: 'An evaluation harness for the document Q&A system: 50 questions with known answers, repeatable retrieval scoring, and a before-and-after comparison of system changes.',
    input: '50 questions + reference answers', output: 'Retrieval scores + comparisons',
    tags: ['FastAPI', 'SQLite', 'Python', 'Retrieval evaluation'],
    details: [
      ['The problem', 'A convincing answer is not enough to tell whether a document search system works. A fixed set of questions gives changes something consistent to be measured against.'],
      ['How it works', 'The harness runs the question set through retrieval and scores whether it finds the expected source material. Comparing runs on the same questions helps show whether a change improves the results or introduces regressions.'],
      ['Reading the results', 'The before-and-after table compares retrieval accuracy across runs. This measures the evidence the system retrieves; it does not, by itself, prove that every generated answer is correct.'],
    ],
  },
  {
    id: 'pdf', label: 'PDF extraction', number: '03', title: 'From messy pages to usable rows.',
    description: 'A PDF-to-database extractor that turns unstructured documents into validated records. Confidence scores and a human review queue make uncertain extractions visible.',
    input: 'Messy PDF documents', output: 'Validated rows + review items',
    tags: ['FastAPI', 'SQLite', 'PDF processing', 'Data validation'],
    details: [
      ['The problem', 'Information in a PDF is not always ready for a database. Inconsistent layouts and ambiguous fields make copying data by hand slow and automatic extraction difficult to trust.'],
      ['How it works', 'The extraction flow turns document content into structured fields, validates the resulting rows, and attaches a confidence score. Records needing attention enter a review queue so a person can check the source and correct the data.'],
      ['Why include review?', 'A confidence score is a signal for inspection, not a guarantee of accuracy. Keeping human review in the workflow makes questionable records easier to resolve before relying on them.'],
    ],
  },
  {
    id: 'classifier', label: 'Text classification', number: '04', title: 'Teaching a model to sort text.',
    description: 'A small text-classification project with models trained in scikit-learn and PyTorch. The task is to turn a message into a useful category, as in email triage or ticket routing.',
    input: 'Labeled text examples', output: 'A trained category predictor',
    tags: ['FastAPI', 'SQLite', 'scikit-learn', 'PyTorch'],
    details: [
      ['The problem', 'Sorting incoming messages is repetitive, but the language varies even when the intent is similar. Classification learns from labeled examples to assign categories to new text.'],
      ['Two implementations', 'The scikit-learn version provides a first model for the task. Implementing the same task in PyTorch makes the training process more explicit and provides a second approach to compare.'],
      ['What it explores', 'This project looks inside model development: preparing examples, representing text, training a classifier, and examining its mistakes. It goes beyond sending a prompt to an existing model API.'],
    ],
  },
]

export default function DocumentProjects() {
  const [active, setActive] = useState(PROJECTS[0].id)
  const reduceMotion = useReducedMotion()
  const project = PROJECTS.find(item => item.id === active)
  return <section id="document-projects" className="document-projects">
    <div className="container">
      <Reveal>
        <div className="document-heading"><div><p className="eyebrow section-label">DOCUMENTS & DATA</p><h2>Some more <span className="serif-accent">projects.</span></h2></div><p>Four projects, from finding the right passage to training a small model.<br />Built on FastAPI + SQLite.</p></div>
        <Tabs id="documents" label="Explore document and data projects" tabs={PROJECTS} active={active} onChange={setActive} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.article key={active} role="tabpanel" id={`documents-panel-${active}`} aria-labelledby={`documents-tab-${active}`} tabIndex={0} className="document-panel" initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }} transition={{ duration: .2 }}>
            <div className="document-overview"><span className="eyebrow document-number">PROJECT / {project.number}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
            <div className="document-flow" aria-label="Project input and output"><div><span className="eyebrow">START WITH</span><strong>{project.input}</strong></div><span className="document-flow-arrow" aria-hidden="true">↓</span><div><span className="eyebrow">GET BACK</span><strong>{project.output}</strong></div></div>
            <details className="document-details"><summary>A closer look <span aria-hidden="true">+</span></summary><div className="document-explanation">{project.details.map(([title, description]) => <div key={title}><h4>{title}</h4><p>{description}</p></div>)}</div></details>
          </motion.article>
        </AnimatePresence>
      </Reveal>
    </div>
  </section>
}
