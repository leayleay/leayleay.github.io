export default function Aurora({ intensity = 1 }) {
  return (
    <div className="aurora-wrap" aria-hidden="true">
      <div className="aurora-blob b1" style={{ opacity: 0.45 * intensity }} />
      <div className="aurora-blob b2" style={{ opacity: 0.35 * intensity }} />
      <div className="aurora-blob b3" style={{ opacity: 0.3 * intensity }} />
      <div className="aurora-blob b4" style={{ opacity: 0.25 * intensity }} />
    </div>
  )
}
