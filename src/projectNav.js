// Shared handler for links that point at a project inside the Projects showcase
// (e.g. href="?project=dejabrew#projects"). Intercepts the click to avoid a full
// page reload — updates the URL, tells Projects.jsx which tab to select via a
// custom event, and smooth-scrolls to the section instead.
export function handleProjectLinkClick(event, href, onHandled) {
  // Keep standard browser actions such as Command/Ctrl-click to open a new tab.
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

  const url = new URL(href, window.location.href)
  const samePage = url.origin === window.location.origin && url.pathname === window.location.pathname
  // Hash-only links inherit the current query string. A retained ?project=...
  // must not turn an About or summer-memory link into a project navigation.
  const projectId = samePage && url.hash === '#projects' ? url.searchParams.get('project') : null
  if (projectId) {
    event.preventDefault()
    onHandled?.()
    window.history.replaceState(null, '', url.search + url.hash)
    window.dispatchEvent(new CustomEvent('site:open-project', { detail: projectId }))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('projects')?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' })
    return
  }
  onHandled?.()
}
