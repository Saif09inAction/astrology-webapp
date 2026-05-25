import { lazy, Suspense } from 'react'
import SeoHead from '../components/seo/SeoHead'
import StructuredData from '../components/seo/StructuredData'
import Services from '../components/sections/Services'
import { PANDIT_NAME } from '../constants'

const WhyChooseUs = lazy(() => import('../components/sections/WhyChooseUs'))
const Testimonials = lazy(() => import('../components/sections/Testimonials'))
const Contact = lazy(() => import('../components/sections/Contact'))
const GuaranteeBanner = lazy(() => import('../components/sections/GuaranteeBanner'))
const MantraBanner = lazy(() => import('../components/ui/MantraBanner'))

const META = {
  title: `Astrology Services | Love, Marriage & Relationship – ${PANDIT_NAME}`,
  description: 'Complete astrology services — love problem solution, ex love back, vashikaran, marriage problems, breakup help & online consultation. Dheeraj Shastri Ji.',
}

function Fallback() {
  return <div style={{ height: 60, background: 'rgba(255,255,255,0.008)' }} aria-hidden="true" />
}

export default function ServicesOverviewPage() {
  return (
    <>
      <SeoHead title={META.title} description={META.description} path="/services" />
      <StructuredData pageType="services" pageData={{ path: '/services', ...META }} />
      <main id="main-content" role="main">
        <Services variant="page" />
        <Suspense fallback={<Fallback />}><MantraBanner /></Suspense>
        <Suspense fallback={<Fallback />}><GuaranteeBanner /></Suspense>
        <Suspense fallback={<Fallback />}><WhyChooseUs /></Suspense>
        <Suspense fallback={<Fallback />}><Testimonials /></Suspense>
        <Suspense fallback={<Fallback />}><Contact /></Suspense>
      </main>
    </>
  )
}
