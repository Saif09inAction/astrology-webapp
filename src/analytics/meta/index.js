import { META_EVENTS } from './events'
import {
  initMetaPixel,
  isMetaPixelEnabled,
  trackPixelCustom,
  trackPixelPageView,
  trackPixelStandard,
  userDataFromLead,
} from './pixel'
import { sendConversionApiEvent } from './capi'

export { META_EVENTS, initMetaPixel, isMetaPixelEnabled, userDataFromLead }

function createEventId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
}

async function trackDual({
  eventName,
  customData = {},
  userData = {},
  isCustomEvent = false,
  pixelTrack,
}) {
  if (!isMetaPixelEnabled()) return null

  const eventId = createEventId()

  pixelTrack(eventName, customData, eventId, userData)

  sendConversionApiEvent({
    eventName,
    eventId,
    customData,
    userData,
    isCustomEvent,
  })

  return eventId
}

/** PageView — standard */
export function trackPageView() {
  if (!isMetaPixelEnabled()) return
  const eventId = createEventId()
  trackPixelPageView(eventId)
  sendConversionApiEvent({
    eventName: META_EVENTS.PAGE_VIEW,
    eventId,
    customData: {},
    userData: {},
    isCustomEvent: false,
  })
}

/** WhatsApp CTA clicked (opens modal or direct wa.me link) */
export function trackWhatsAppClick({ source = 'unknown', service } = {}) {
  const customData = {
    content_name: service || 'General Consultation',
    content_category: 'WhatsApp',
    source,
  }

  return trackDual({
    eventName: META_EVENTS.WHATSAPP_CLICK,
    customData,
    isCustomEvent: true,
    pixelTrack: (name, data, id) => trackPixelCustom(name, data, id),
  })
}

/** Lead form submitted successfully */
export function trackLeadSubmit({ name, phone, email, service, source = 'unknown' } = {}) {
  const userData = userDataFromLead({ name, phone, email })
  const customData = {
    content_name: service || 'Consultation',
    content_category: 'Lead Form',
    source,
  }

  return trackDual({
    eventName: META_EVENTS.LEAD,
    customData,
    userData,
    isCustomEvent: false,
    pixelTrack: trackPixelStandard,
  })
}

/** Phone / call button clicked */
export function trackContactClick({ source = 'unknown', method = 'phone' } = {}) {
  const customData = {
    content_category: 'Contact',
    contact_method: method,
    source,
  }

  return trackDual({
    eventName: META_EVENTS.CONTACT,
    customData,
    isCustomEvent: false,
    pixelTrack: trackPixelStandard,
  })
}

/** onClick helper for WhatsApp anchors */
export function onWhatsAppClick(source, service) {
  return () => { trackWhatsAppClick({ source, service }) }
}

/** onClick helper for tel: links */
export function onContactClick(source) {
  return () => { trackContactClick({ source, method: 'phone' }) }
}
