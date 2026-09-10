import { Component, lazy, Suspense } from 'react'

const WorkspaceScene = lazy(() => import('./WorkspaceScene.jsx'))

class SceneBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onError?.()
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default function WorkspaceCanvas({ fallback, onLoad, onError }) {
  return <SceneBoundary fallback={fallback} onError={onError}>
    <Suspense fallback={fallback}>
      <WorkspaceScene onLoad={onLoad} onError={onError} />
    </Suspense>
  </SceneBoundary>
}
