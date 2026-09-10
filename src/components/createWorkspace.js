import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

function canvasTexture(width, height, paint) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  paint(canvas.getContext('2d'))
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function createWorkspace(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.25

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-4.7, 4.7, 3.5, -3.5, 0.1, 100)
  camera.position.set(6, 5.8, 9)
  camera.lookAt(0, 0.8, 0)
  scene.add(new THREE.HemisphereLight('#fffaf0', '#b3b8d0', 2.8))
  const light = new THREE.DirectionalLight('#fff8ed', 4)
  light.position.set(-3, 7, 5)
  light.castShadow = true
  light.shadow.mapSize.set(1024, 1024)
  Object.assign(light.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5 })
  light.shadow.normalBias = 0.04
  light.shadow.bias = -0.0002
  scene.add(light)
  const fill = new THREE.DirectionalLight('#c7d4ff', 1.1)
  fill.position.set(4, 2, -3)
  scene.add(fill)

  const world = new THREE.Group()
  scene.add(world)
  const material = color => new THREE.MeshStandardMaterial({ color, roughness: 0.58, metalness: 0.06 })
  const ivory = material('#f5f3ee')
  const accent = material('#9fb5e4')
  const paper = material('#fffbed')
  const lavender = material('#b9a4dc')
  const green = material('#b9ce8c')
  const mesh = (geometry, surface, parent, position) => {
    const object = new THREE.Mesh(geometry, surface)
    object.castShadow = true
    object.receiveShadow = true
    if (position) object.position.set(...position)
    parent.add(object)
    return object
  }
  const box = (width, height, depth, surface, parent, position, radius = 0.06) =>
    mesh(new RoundedBoxGeometry(width, height, depth, 3, radius), surface, parent, position)

  const platform = mesh(new THREE.CylinderGeometry(3.25, 3.3, 0.12, 72), ivory, world, [0, -0.23, 0])
  platform.scale.z = 0.78
  const laptop = new THREE.Group()
  laptop.rotation.y = -0.13
  world.add(laptop)
  box(3.55, 0.14, 2.35, accent, laptop, [0, 0, 0])
  box(3.48, 0.065, 2.27, ivory, laptop, [0, 0.075, 0])
  box(2.93, 0.018, 1.05, material('#cdd4e0'), laptop, [0, 0.12, -0.38], 0.03)

  // Shared keyboard geometry keeps the tiny keys inexpensive to render.
  const keys = new THREE.InstancedMesh(new RoundedBoxGeometry(0.21, 0.037, 0.16, 2, 0.022), ivory, 44)
  const transform = new THREE.Object3D()
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 11; column++) {
      const index = row * 11 + column
      transform.position.set(-1.3 + column * 0.26, 0.151, -0.77 + row * 0.24)
      transform.updateMatrix()
      keys.setMatrixAt(index, transform.matrix)
      keys.setColorAt(index, new THREE.Color(column === 10 || (row === 0 && column === 0) ? '#a6b9e4' : '#f5f5f2'))
    }
  }
  keys.castShadow = true
  laptop.add(keys)
  box(1.03, 0.025, 0.15, ivory, laptop, [0, 0.14, 0.24], 0.02)
  box(0.86, 0.013, 0.46, material('#dce2ec'), laptop, [0, 0.116, 0.68], 0.04)

  const lid = new THREE.Group()
  lid.position.set(0, 0.12, -1.1)
  lid.rotation.x = -0.15
  laptop.add(lid)
  box(3.55, 2.35, 0.13, accent, lid, [0, 1.16, 0], 0.1)
  box(3.35, 2.15, 0.035, ivory, lid, [0, 1.17, 0.079], 0.07)
  const screenTexture = canvasTexture(1024, 640, ctx => {
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, 1024, 640)
    ctx.fillStyle = '#e8edf4'
    ctx.fillRect(0, 0, 1024, 66)
    ;['#b5c7ef', '#cec1e4', '#c4d7a2'].forEach((color, index) => {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(34 + index * 26, 33, 7, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.fillStyle = '#8896ac'
    ctx.font = '20px monospace'
    ctx.fillText('hello-world.js', 365, 41)
    ctx.font = '26px monospace'
    ctx.fillStyle = '#94a5b5'
    ctx.fillText('// one idea at a time', 65, 130)
    const lines = [
      ['const aLittleAboutMe = {', '#4d69bc'],
      ["  studying: 'computer science',", '#576474'],
      ["  currently: 'trying things',", '#6b8b6e'],
      ["  learning: 'as I go'", '#9a7caf'],
      ['};', '#4d69bc'],
    ]
    ctx.font = '29px monospace'
    lines.forEach(([text, color], index) => {
      ctx.fillStyle = color
      ctx.fillText(text, 65, 215 + index * 65)
    })
    ctx.fillStyle = '#e7eddc'
    ctx.fillRect(0, 574, 1024, 66)
    ctx.fillStyle = '#7e9461'
    ctx.font = '20px monospace'
    ctx.fillText('● a work in progress', 40, 616)
    ctx.fillStyle = '#254be9'
    ctx.fillRect(71, 530, 14, 28)
  })
  screenTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8)
  const screen = mesh(new THREE.PlaneGeometry(3.11, 1.91), new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false }), lid, [0, 1.18, 0.102])
  screen.castShadow = false
  mesh(new THREE.SphereGeometry(0.022, 12, 8), material('#8694a9'), lid, [0, 2.235, 0.102])

  const notebook = new THREE.Group()
  notebook.position.set(-2.27, 0.12, 0.5)
  notebook.rotation.y = -0.25
  notebook.rotation.z = -0.08
  world.add(notebook)
  box(0.96, 0.13, 1.46, lavender, notebook, [0, 0, 0])
  box(0.9, 0.075, 1.39, paper, notebook, [0.01, 0.035, 0])
  box(0.96, 0.027, 1.46, lavender, notebook, [0, 0.09, 0])
  const noteTexture = canvasTexture(256, 384, ctx => {
    ctx.fillStyle = '#d7c8ea'
    ctx.fillRect(0, 0, 256, 384)
    ctx.fillStyle = '#78608f'
    ctx.font = 'italic 42px Georgia'
    ctx.fillText('what if?', 40, 154)
    ctx.strokeStyle = '#b4a1ca'
    ctx.lineWidth = 2
    ;[216, 243, 270].forEach(y => {
      ctx.beginPath(); ctx.moveTo(42, y); ctx.lineTo(211, y); ctx.stroke()
    })
    ctx.font = '18px monospace'
    ctx.fillText('IDEAS / 001', 45, 339)
  })
  const noteCover = mesh(new THREE.PlaneGeometry(0.83, 1.32), new THREE.MeshBasicMaterial({ map: noteTexture }), notebook, [0.02, 0.108, 0])
  noteCover.rotation.x = -Math.PI / 2
  for (let i = 0; i < 6; i++) {
    const ring = mesh(new THREE.TorusGeometry(0.065, 0.013, 8, 16), ivory, notebook, [-0.43, 0.10, -0.52 + i * 0.2])
    ring.rotation.y = Math.PI / 2
  }

  const cup = new THREE.Group()
  cup.position.set(2.22, 0.2, 0.68)
  world.add(cup)
  mesh(new THREE.CylinderGeometry(0.29, 0.24, 0.56, 40), ivory, cup, [0, 0, 0])
  const coffee = mesh(new THREE.CircleGeometry(0.259, 40), material('#997b68'), cup, [0, 0.281, 0])
  coffee.rotation.x = -Math.PI / 2
  const rim = mesh(new THREE.TorusGeometry(0.27, 0.026, 10, 40), ivory, cup, [0, 0.28, 0])
  rim.rotation.x = Math.PI / 2
  const handle = mesh(new THREE.TorusGeometry(0.17, 0.043, 10, 32), accent, cup, [0.29, 0.03, 0])
  handle.rotation.y = Math.PI / 2
  mesh(new THREE.CylinderGeometry(0.44, 0.43, 0.034, 40), ivory, cup, [0, -0.295, 0])

  const code = new THREE.Group()
  code.position.set(2.15, 2.54, -0.22)
  code.rotation.y = 0.14
  code.rotation.z = -0.12
  world.add(code)
  const stroke = points => mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point))), 18, 0.05, 8, false), accent, code)
  stroke([[-0.22, 0.3, 0], [-0.55, 0, 0], [-0.22, -0.3, 0]])
  stroke([[0.22, 0.3, 0], [0.55, 0, 0], [0.22, -0.3, 0]])
  stroke([[0.13, 0.38, 0], [0, 0, 0], [-0.13, -0.38, 0]])
  const dot = mesh(new THREE.SphereGeometry(0.115, 24, 16), green, world, [-2.45, 1.65, -0.8])
  const smallDot = mesh(new THREE.SphereGeometry(0.075, 20, 12), lavender, world, [2.7, 1.45, 0.1])

  let frame = 0
  let running = false
  let disposed = false
  let time = 0
  let lastTime = 0
  const draw = () => { if (!disposed) renderer.render(scene, camera) }
  const animate = now => {
    if (!running || disposed) return
    time += Math.min((now - (lastTime || now)) / 1000, 0.035)
    lastTime = now
    // One gentle turn every 75 seconds, independent of pointer position.
    world.rotation.y = time * (Math.PI * 2 / 75)
    code.position.y = 2.54 + Math.sin(time * 1.15) * 0.085
    code.rotation.z = -0.12 + Math.sin(time * 0.7) * 0.07
    notebook.position.y = 0.12 + Math.sin(time * 0.9) * 0.035
    dot.position.y = 1.65 + Math.sin(time * 1.3) * 0.1
    smallDot.position.y = 1.45 + Math.cos(time) * 0.08
    draw()
    frame = requestAnimationFrame(animate)
  }
  const resize = () => {
    const { width, height } = canvas.parentElement.getBoundingClientRect()
    if (!width || !height) return
    const aspect = width / height
    const halfHeight = Math.max(2.6, 3.75 / aspect)
    camera.left = -halfHeight * aspect
    camera.right = halfHeight * aspect
    camera.top = halfHeight
    camera.bottom = -halfHeight
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    draw()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(canvas.parentElement)
  resize()

  return {
    setColor(color) { accent.color.set(color); draw() },
    requestRender: draw,
    play() {
      if (running || disposed) return
      running = true
      canvas.dataset.motion = 'playing'
      lastTime = 0
      frame = requestAnimationFrame(animate)
    },
    stop() {
      running = false
      canvas.dataset.motion = 'paused'
      cancelAnimationFrame(frame)
    },
    dispose() {
      disposed = true
      running = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      const geometries = new Set()
      const materials = new Set()
      scene.traverse(object => {
        if (object.geometry) geometries.add(object.geometry)
        if (object.material) materials.add(object.material)
      })
      geometries.forEach(geometry => geometry.dispose())
      materials.forEach(surface => surface.dispose())
      screenTexture.dispose()
      noteTexture.dispose()
      light.shadow.dispose()
      renderer.dispose()
    },
  }
}
