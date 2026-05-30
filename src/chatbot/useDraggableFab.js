import { useState, useRef, useCallback, useEffect } from 'react'

const FAB = 54
const MARGIN = 16
const GAP = 12
const LABEL_STACK = 36 // label above icon + gap

export function getDefaultFabPosition() {
  const bottomStack = MARGIN + FAB + GAP + FAB + GAP // above call + wa
  return {
    x: window.innerWidth - MARGIN - FAB,
    y: window.innerHeight - bottomStack - FAB - LABEL_STACK,
  }
}

function clamp({ x, y }) {
  const maxX = window.innerWidth - FAB - 12
  const maxY = window.innerHeight - FAB - LABEL_STACK - 12
  return {
    x: Math.max(12, Math.min(x, maxX)),
    y: Math.max(12, Math.min(y, maxY)),
  }
}

/** Draggable FAB — resets to default above WhatsApp on every page load */
export default function useDraggableFab() {
  const [pos, setPos] = useState(() => clamp(getDefaultFabPosition()))

  const drag = useRef({ active: false, moved: false, sx: 0, sy: 0, ox: 0, oy: 0 })

  useEffect(() => {
    const onResize = () => setPos(p => clamp(p))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onPointerDown = useCallback((e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { active: true, moved: false, sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y }
  }, [pos])

  const onPointerMove = useCallback((e) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.sx
    const dy = e.clientY - drag.current.sy
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) drag.current.moved = true
    setPos(clamp({ x: drag.current.ox + dx, y: drag.current.oy + dy }))
  }, [])

  const onPointerUp = useCallback((e) => {
    if (!drag.current.active) return true
    const moved = drag.current.moved
    drag.current.active = false
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch {}
    return moved
  }, [])

  return { pos, onPointerDown, onPointerMove, onPointerUp, fabSize: FAB }
}
