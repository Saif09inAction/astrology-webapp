/** Detect visitors from Google/Meta paid ads (UTM or click IDs). */
export function isPaidTraffic() {
  if (typeof window === 'undefined') return false

  const params = new URLSearchParams(window.location.search)
  const source = (params.get('utm_source') || params.get('source') || '').toLowerCase()
  const medium = (params.get('utm_medium') || '').toLowerCase()

  if (params.get('gclid') || params.get('fbclid')) return true
  if (['google', 'facebook', 'fb', 'instagram', 'meta', 'ig'].includes(source)) return true
  if (['cpc', 'ppc', 'paid', 'paid_social', 'paidsocial'].includes(medium)) return true

  return false
}
