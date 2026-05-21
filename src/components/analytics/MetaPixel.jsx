import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { initMetaPixel, isMetaPixelEnabled, trackPageView } from '../../analytics/meta'

/** Skip admin routes from marketing analytics */
function shouldTrackPath(pathname) {
  return !pathname.startsWith('/admin')
}

export default function MetaPixel() {
  const location = useLocation()
  const initialized = useRef(false)
  const lastPath = useRef('')

  useEffect(() => {
    if (!isMetaPixelEnabled()) return

    initMetaPixel().then((ok) => {
      if (ok) initialized.current = true
    })
  }, [])

  useEffect(() => {
    if (!isMetaPixelEnabled() || !shouldTrackPath(location.pathname)) return
    if (lastPath.current === location.pathname) return

    lastPath.current = location.pathname

    // Wait for pixel script on first load
    const fire = () => trackPageView()
    if (initialized.current || window.fbq) {
      fire()
    } else {
      const t = setTimeout(fire, 800)
      return () => clearTimeout(t)
    }
  }, [location.pathname])

  return null
}
