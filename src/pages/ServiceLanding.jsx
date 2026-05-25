import { Navigate } from 'react-router-dom'
import SeoPageTemplate from '../components/seo/SeoPageTemplate'
import { getServicePage, SERVICE_PAGES } from '../seo/services'

export default function ServiceLanding({ slug }) {
  const page = getServicePage(slug)
  if (!page) return <Navigate to="/services" replace />

  const relatedLinks = page.relatedSlugs
    .map((s) => {
      const p = SERVICE_PAGES.find((x) => x.slug === s)
      return p ? { path: `/${p.slug}`, label: p.h1.split('–')[0].trim() } : null
    })
    .filter(Boolean)

  return (
    <SeoPageTemplate
      path={`/${page.slug}`}
      title={page.title}
      description={page.description}
      eyebrow={page.eyebrow}
      h1={page.h1}
      intro={page.intro}
      sections={page.sections}
      faqs={page.faqs}
      keywords={page.keywords}
      breadcrumbs={[{ label: 'Services', href: '/services' }, { label: page.h1.split('–')[0].trim() }]}
      relatedLinks={relatedLinks}
      schemaType="service"
      schemaData={page}
      waMessage={`I need help with ${page.h1.split('–')[0].trim().toLowerCase()}.`}
    />
  )
}
