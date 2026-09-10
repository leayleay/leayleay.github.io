export function Arrow({ direction = 'diagonal', className = '' }) {
  return <svg className={`arrow ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    {direction === 'down' ? <path d="M12 4v16m-7-7 7 7 7-7" /> : <path d="M5 19 19 5M5 5h14v14" />}
  </svg>
}

export function Spark({ className = '' }) {
  return <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
    <path d="m50 0 9 32 26-17-17 26 32 9-32 9 17 26-26-17-9 32-9-32-26 17 17-26L0 50l32-9-17-26 26 17Z" />
  </svg>
}

export function Play({ className = '' }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.4" />
    <path d="M10 8.3v7.4a.6.6 0 0 0 .93.5l6-3.7a.6.6 0 0 0 0-1l-6-3.7a.6.6 0 0 0-.93.5Z" fill="currentColor" />
  </svg>
}

export function LinkedIn({ className = '' }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.57h.05c.53-.98 1.83-2.02 3.77-2.02 4.03 0 4.78 2.55 4.78 5.87V21h-4v-5.4c0-1.29-.02-2.94-1.86-2.94-1.87 0-2.15 1.4-2.15 2.85V21h-4V9.5Z" />
  </svg>
}

export function Flower() {
  return <svg viewBox="0 0 320 320" fill="currentColor" aria-hidden="true">
    <g className="flower-petals">
      {Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx="160" cy="96" rx="43" ry="80" transform={`rotate(${i * 36} 160 160)`} />)}
    </g>
    <circle cx="160" cy="160" r="72" />
    <g className="flower-face" fill="none" stroke="var(--paper)" strokeWidth="7" strokeLinecap="round">
      <path d="M133 134v16m54-16v16" />
      <path d="M128 173q32 36 64 0" />
    </g>
  </svg>
}
