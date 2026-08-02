import { useEffect, useRef } from 'react'

const GRID_SPACING = 9
const DOT_SIZE = 1
const FIELD_RADIUS = 135
const FOLLOW_EASE = 0.22
const FADE_EASE = 0.14

export function CursorPixelGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const context = canvas.getContext('2d')
    if (!context) return

    let width = window.innerWidth
    let height = window.innerHeight
    let devicePixelRatio = 1
    let pointerX = -FIELD_RADIUS
    let pointerY = -FIELD_RADIUS
    let targetX = pointerX
    let targetY = pointerY
    let visibility = 0
    let pointerActive = false
    let frameId = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.ceil(width * devicePixelRatio)
      canvas.height = Math.ceil(height * devicePixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      scheduleRender()
    }

    const scheduleRender = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(render)
    }

    const render = () => {
      frameId = 0
      pointerX += (targetX - pointerX) * FOLLOW_EASE
      pointerY += (targetY - pointerY) * FOLLOW_EASE
      visibility += ((pointerActive ? 1 : 0) - visibility) * FADE_EASE

      context.clearRect(0, 0, width, height)

      if (visibility > 0.005) {
        context.fillStyle = '#0a0a0a'
        for (let y = 0; y <= height; y += GRID_SPACING) {
          for (let x = 0; x <= width; x += GRID_SPACING) {
            const distance = Math.hypot(x - pointerX, y - pointerY)
            if (distance >= FIELD_RADIUS) continue

            const falloff = 1 - distance / FIELD_RADIUS
            context.globalAlpha = falloff * falloff * visibility
            context.fillRect(x, y, DOT_SIZE, DOT_SIZE)
          }
        }
        context.globalAlpha = 1
      }

      if (pointerActive || visibility > 0.005 || Math.abs(targetX - pointerX) > 0.5 || Math.abs(targetY - pointerY) > 0.5) {
        scheduleRender()
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      if (!pointerActive) {
        pointerX = event.clientX
        pointerY = event.clientY
      }
      targetX = event.clientX
      targetY = event.clientY
      pointerActive = true
      scheduleRender()
    }

    const deactivate = () => {
      pointerActive = false
      scheduleRender()
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('blur', deactivate)
    document.addEventListener('mouseleave', deactivate)
    resize()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', deactivate)
      document.removeEventListener('mouseleave', deactivate)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-pixel-grid" aria-hidden="true" />
}
