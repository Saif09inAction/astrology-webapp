import { useEffect } from 'react'
import { SITE_URL } from '../../constants'

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Updates document head per route — invisible, no UI impact */
export default function SeoHead({ title, description, path = '/', noindex = false }) {
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`

  useEffect(() => {
    document.title = title
    setMeta('title', title)
    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setCanonical(canonical)
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow')
  }, [title, description, canonical, noindex])

  return null
}
