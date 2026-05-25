import { Navigate } from 'react-router-dom'
import SeoPageTemplate from '../components/seo/SeoPageTemplate'
import { getLocationPage, LOCATION_PAGES } from '../seo/locationPages'

const LOCATION_FAQS = [
  { q: 'Is online consultation available in my city?', a: 'Yes. All consultations are online via WhatsApp — no need to visit in person. Serving your city and all of India 24/7.' },
  { q: 'Can I consult in Hindi or Marathi?', a: 'Yes. Consultation available in English, Hindi, Marathi, and Hinglish.' },
]

export default function LocationLanding({ slug }) {
  const page = getLocationPage(slug)
  if (!page) return <Navigate to="/" replace />

  const relatedLinks = LOCATION_PAGES
    .filter((p) => p.slug !== page.slug)
    .slice(0, 6)
    .map((p) => ({ path: `/${p.slug}`, label: `${p.focus} – ${p.city}` }))

  const sections = [
    {
      h2: `Why choose ${page.focus} consultation in ${page.city}?`,
      body: `Clients in ${page.city} and ${page.region} trust Dheeraj Shastri Ji for accurate Vedic astrology, ethical remedies, and confidential online guidance — without travel or waiting.`,
    },
    {
      h2: 'Services available online',
      body: 'Ex love back, love problem solution, vashikaran, marriage problems, breakup help, kundli matching, husband-wife disputes, and emotional healing — all via WhatsApp consultation with pay-after-results assurance.',
    },
  ]

  return (
    <SeoPageTemplate
      path={`/${page.slug}`}
      title={page.title}
      description={page.description}
      eyebrow={`ॐ · ${page.city} · ${page.region}`}
      h1={page.h1}
      intro={page.intro}
      sections={sections}
      faqs={LOCATION_FAQS}
      keywords={page.keywords}
      breadcrumbs={[{ label: page.city }]}
      relatedLinks={relatedLinks}
      schemaType="location"
      schemaData={page}
      waMessage={`I need consultation in ${page.city}.`}
    />
  )
}
