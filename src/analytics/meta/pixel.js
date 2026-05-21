import { META_EVENTS } from './events'

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim()
const DEBUG = import.meta.env.VITE_META_DEBUG === 'true'

let scriptLoaded = false
let initialized = false

function log(...args) {
  if (DEBUG) console.info('[Meta Pixel]', ...args)
}

/** Normalize phone for Meta advanced matching (digits + country code, no +) */
export function normalizePhone(phone) {
  if (!phone) return undefined
  const digits = String(phone).replace(/\D/g, '')
  return digits || undefined
}

/** Build advanced matching object for fbq init */
export function buildAdvancedMatching({ email, phone, firstName, lastName, externalId } = {}) {
  const data = {}
  if (email) data.em = String(email).trim().toLowerCase()
  const ph = normalizePhone(phone)
  if (ph) data.ph = ph
  if (firstName) data.fn = String(firstName).trim().toLowerCase()
  if (lastName) data.ln = String(lastName).trim().toLowerCase()
  if (externalId) data.external_id = String(externalId)
  return data
}

function splitName(fullName) {
  const parts = String(fullName || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return { firstName: undefined, lastName: undefined }
  return {
    firstName: parts[0],
    lastName: parts.length > 1 ? parts.slice(1).join(' ') : undefined,
  }
}

export function isMetaPixelEnabled() {
  return Boolean(PIXEL_ID)
}

/** Load fbevents.js once */
export function loadMetaPixelScript() {
  if (!PIXEL_ID || scriptLoaded || typeof window === 'undefined') return Promise.resolve(false)

  return new Promise((resolve) => {
    if (window.fbq) {
      scriptLoaded = true
      resolve(true)
      return
    }

    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = true
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = true
      t.src = v
      t.onload = () => resolve(true)
      t.onerror = () => resolve(false)
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    /* eslint-enable */

    scriptLoaded = true
  })
}

/** Initialize pixel (without PageView — tracked on route change) */
export async function initMetaPixel(userData = {}) {
  if (!PIXEL_ID || initialized || typeof window === 'undefined') return false

  await loadMetaPixelScript()
  if (!window.fbq) return false

  const matching = buildAdvancedMatching(userData)
  window.fbq('init', PIXEL_ID, matching)
  initialized = true
  log('initialized', PIXEL_ID, matching)
  return true
}

/** Refresh advanced matching before conversion events */
export function setMetaAdvancedMatching(userData = {}) {
  if (!PIXEL_ID || !window.fbq) return
  const matching = buildAdvancedMatching(userData)
  if (Object.keys(matching).length === 0) return
  window.fbq('init', PIXEL_ID, matching)
  log('advanced matching updated', matching)
}

export function trackPixelPageView(eventId) {
  if (!PIXEL_ID || !window.fbq) return
  window.fbq('track', META_EVENTS.PAGE_VIEW, {}, { eventID: eventId })
  log(META_EVENTS.PAGE_VIEW, eventId)
}

export function trackPixelStandard(eventName, customData, eventId, userData) {
  if (!PIXEL_ID || !window.fbq) return
  if (userData) setMetaAdvancedMatching(userData)
  window.fbq('track', eventName, customData || {}, { eventID: eventId })
  log(eventName, customData, eventId)
}

export function trackPixelCustom(eventName, customData, eventId, userData) {
  if (!PIXEL_ID || !window.fbq) return
  if (userData) setMetaAdvancedMatching(userData)
  window.fbq('trackCustom', eventName, customData || {}, { eventID: eventId })
  log('custom', eventName, customData, eventId)
}

export function userDataFromLead({ name, phone, email } = {}) {
  const { firstName, lastName } = splitName(name)
  return { email, phone, firstName, lastName }
}
