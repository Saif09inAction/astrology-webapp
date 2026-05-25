import { SERVICE_PAGES } from './services.js'
import { LOCATION_PAGES } from './locationPages.js'
import { BLOG_POSTS } from './blogPosts.js'

const SITE = 'https://lovebackastro.in'

/** All indexable URLs for sitemap generation */
export function getAllSitemapUrls() {
  const staticPages = [
    { loc: `${SITE}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${SITE}/about`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/contact`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/services`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE}/blog`, priority: '0.85', changefreq: 'weekly' },
  ]

  const services = SERVICE_PAGES.map((p) => ({
    loc: `${SITE}/${p.slug}`,
    priority: '0.9',
    changefreq: 'monthly',
  }))

  const locations = LOCATION_PAGES.map((p) => ({
    loc: `${SITE}/${p.slug}`,
    priority: '0.85',
    changefreq: 'monthly',
  }))

  const blog = BLOG_POSTS.map((p) => ({
    loc: `${SITE}/blog/${p.slug}`,
    priority: '0.75',
    changefreq: 'monthly',
  }))

  return [...staticPages, ...services, ...locations, ...blog]
}

export { SITE }
