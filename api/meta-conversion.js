import crypto from 'crypto'

const GRAPH_VERSION = 'v21.0'

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

/** Meta CAPI normalization */
function hashEmail(email) {
  if (!email) return undefined
  const normalized = String(email).trim().toLowerCase()
  return normalized ? sha256(normalized) : undefined
}

function hashPhone(phone) {
  if (!phone) return undefined
  const normalized = String(phone).replace(/\D/g, '')
  return normalized ? sha256(normalized) : undefined
}

function hashName(name) {
  if (!name) return undefined
  const normalized = String(name).trim().toLowerCase()
  return normalized ? sha256(normalized) : undefined
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
  if (Array.isArray(forwarded)) return forwarded[0]
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || undefined
}

function isAllowedOrigin(origin, host) {
  if (!origin) return true
  try {
    const url = new URL(origin)
    const allowed = [
      'lovebackastro.in',
      'www.lovebackastro.in',
      'localhost',
      '127.0.0.1',
    ]
    if (host && (url.host === host || url.hostname === host)) return true
    return allowed.some((h) => url.hostname === h || url.hostname.endsWith(`.${h}`))
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const pixelId = process.env.META_PIXEL_ID || process.env.VITE_META_PIXEL_ID
  const accessToken = process.env.META_CONVERSION_API_TOKEN

  if (!pixelId || !accessToken) {
    return res.status(503).json({ ok: false, error: 'Meta Conversion API not configured' })
  }

  const origin = req.headers.origin
  const host = req.headers.host
  if (!isAllowedOrigin(origin, host)) {
    return res.status(403).json({ ok: false, error: 'Origin not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const {
      event_name: eventName,
      event_id: eventId,
      event_source_url: eventSourceUrl,
      custom_data: customData = {},
      user_data: rawUser = {},
      is_custom_event: _isCustomEvent = false,
    } = body || {}

    if (!eventName || !eventId) {
      return res.status(400).json({ ok: false, error: 'event_name and event_id are required' })
    }

    const userData = {}

    const em = hashEmail(rawUser.em || rawUser.email)
    const ph = hashPhone(rawUser.ph || rawUser.phone)
    const fn = hashName(rawUser.fn || rawUser.firstName || rawUser.first_name)
    const ln = hashName(rawUser.ln || rawUser.lastName || rawUser.last_name)

    if (em) userData.em = [em]
    if (ph) userData.ph = [ph]
    if (fn) userData.fn = [fn]
    if (ln) userData.ln = [ln]

    if (rawUser.external_id) {
      userData.external_id = [sha256(String(rawUser.external_id).trim().toLowerCase())]
    }

    if (rawUser.client_user_agent) userData.client_user_agent = rawUser.client_user_agent
    if (rawUser.fbp) userData.fbp = rawUser.fbp
    if (rawUser.fbc) userData.fbc = rawUser.fbc

    const clientIp = getClientIp(req)
    if (clientIp) userData.client_ip_address = clientIp

    const eventPayload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      event_source_url: eventSourceUrl || `https://lovebackastro.in/`,
      user_data: userData,
      custom_data: customData,
    }

    const graphBody = {
      data: [eventPayload],
    }

    if (process.env.META_TEST_EVENT_CODE) {
      graphBody.test_event_code = process.env.META_TEST_EVENT_CODE
    }

    const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${accessToken}`

    const graphRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphBody),
    })

    const graphJson = await graphRes.json()

    if (!graphRes.ok) {
      console.error('[Meta CAPI]', graphJson)
      return res.status(502).json({ ok: false, error: 'Meta API error', details: graphJson })
    }

    return res.status(200).json({ ok: true, events_received: graphJson.events_received ?? 1 })
  } catch (err) {
    console.error('[Meta CAPI]', err)
    return res.status(500).json({ ok: false, error: 'Internal server error' })
  }
}
