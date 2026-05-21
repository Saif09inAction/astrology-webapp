import { isMetaPixelEnabled } from './pixel'

const DEBUG = import.meta.env.VITE_META_DEBUG === 'true'

function log(...args) {
  if (DEBUG) console.info('[Meta CAPI]', ...args)
}

function getCookie(name) {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : undefined
}

/** Read _fbp / _fbc for CAPI deduplication + attribution */
export function getMetaBrowserIds() {
  return {
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc'),
  }
}

/**
 * Send server-side event (Conversion API) with same event_id as browser pixel.
 * Fire-and-forget — never blocks UX.
 */
export async function sendConversionApiEvent({
  eventName,
  eventId,
  customData = {},
  userData = {},
  isCustomEvent = false,
}) {
  if (!isMetaPixelEnabled() || typeof window === 'undefined') return

  const { fbp, fbc } = getMetaBrowserIds()

  const payload = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    action_source: 'website',
    custom_data: customData,
    user_data: {
      email: userData.email,
      phone: userData.phone,
      firstName: userData.firstName,
      lastName: userData.lastName,
      external_id: userData.externalId,
      client_user_agent: navigator.userAgent,
      fbp,
      fbc,
    },
    is_custom_event: isCustomEvent,
  }

  try {
    const res = await fetch('/api/meta-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      log('CAPI error', res.status, err)
      return
    }

    log('CAPI sent', eventName, eventId)
  } catch (err) {
    log('CAPI network error', err)
  }
}
