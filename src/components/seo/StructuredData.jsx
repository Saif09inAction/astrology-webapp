import { useMemo } from 'react'
import { getSchemaForPage } from '../../seo/schema'

/** Injects JSON-LD structured data per route */
export default function StructuredData({ pageType = 'home', pageData = null }) {
  const jsonLd = useMemo(
    () => getSchemaForPage(pageType, pageData),
    [pageType, pageData],
  )

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
