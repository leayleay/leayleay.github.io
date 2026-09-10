import { useEffect, useRef } from 'react'
import { createWorkspace } from './createWorkspace'

export default function WorkspaceScene({ onLoad, onError }) {
  const canvasRef = useRef(null)
  const loadCallback = useRef(onLoad)
  const errorCallback = useRef(onError)

  useEffect(() => {
    let workspace
    try {
      workspace = createWorkspace(canvasRef.current)
      loadCallback.current(workspace)
    } catch {
      errorCallback.current?.()
    }
    return () => workspace?.dispose()
  }, [])

  return <canvas ref={canvasRef} className="workspace-canvas" role="img" aria-label="3D workspace with a laptop, notebook, and coffee." />
}
