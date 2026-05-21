import { useMemo } from 'react'
import { buildSchemaGraph, buildCitySchemaGraph } from '../../seo/schema'

/** Injects JSON-LD structured data — invisible SEO, no UI impact */
export default function StructuredData({ cityPage = null }) {
  const jsonLd = useMemo(
    () => (cityPage ? buildCitySchemaGraph(cityPage) : buildSchemaGraph()),
    [cityPage],
  )

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
