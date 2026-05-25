/**
 * Generates public/sitemap.xml from all SEO routes at build time.
 */
import { writeFileSync } from 'fs'
import { getAllSitemapUrls } from '../src/seo/sitemapUrls.js'

const lastmod = new Date().toISOString().split('T')[0]

const urls = getAllSitemapUrls()
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync('public/sitemap.xml', xml, 'utf8')
console.log(`✓ sitemap.xml generated with ${getAllSitemapUrls().length} URLs`)
