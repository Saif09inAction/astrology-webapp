import { useMemo } from 'react'
import { buildSchemaGraph } from '../../seo/schema'

/** Injects JSON-LD structured data — invisible SEO, no UI impact */
export default function StructuredData() {
  const jsonLd = useMemo(() => buildSchemaGraph(), [])

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
