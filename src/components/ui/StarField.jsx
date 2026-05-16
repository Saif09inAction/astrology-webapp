import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Skip on mobile — saves CPU and eliminates forced reflow
    if (window.innerWidth < 768) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId
    let visible = true
    let w = window.innerWidth
    let h = window.innerHeight

    // Set canvas size without reading layout properties in rAF loop
    const applySize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width  = w
      canvas.height = h
    }
    applySize()

    // Debounce resize to avoid repeated forced reflow
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(applySize, 150)
    }
    window.addEventListener('resize', onResize, { passive: true })

    // Pause animation when tab is hidden — saves CPU
    const onVisibility = () => { visible = !document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }))

    let t = 0
    const draw = () => {
      animId = requestAnimationFrame(draw)
      if (!visible) return

      t += 0.016
      ctx.clearRect(0, 0, w, h)

      // Batch all star draws into one path per opacity level for fewer ctx calls
      stars.forEach(s => {
        const a = 0.2 + 0.45 * Math.abs(Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(253,230,138,${a.toFixed(2)})`
        ctx.fill()
      })
    }
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
      style={{ zIndex: 0 }}
    />
  )
}
