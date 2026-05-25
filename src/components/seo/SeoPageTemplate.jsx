import { lazy, Suspense } from 'react'
import PremiumPageHero from '../../layout/PremiumPageHero'
import PremiumContentSections from '../../layout/PremiumContentSections'
import RelatedServicesNav from '../../layout/RelatedServicesNav'
import MantraBanner from '../ui/MantraBanner'
import SeoHead from './SeoHead'
import StructuredData from './StructuredData'
import { SEO_FAQS } from '../../seo/faqs'

const GuaranteeBanner = lazy(() => import('../sections/GuaranteeBanner'))
const WhyChooseUs     = lazy(() => import('../sections/WhyChooseUs'))
const Testimonials    = lazy(() => import('../sections/Testimonials'))
const FAQ             = lazy(() => import('../sections/FAQ'))
const Contact         = lazy(() => import('../sections/Contact'))

function SectionFallback() {
  return <div style={{ height: 80, background: 'rgba(255,255,255,0.008)' }} aria-hidden="true" />
}

/**
 * Premium SEO page shell — homepage sections & visual language
 */
export default function SeoPageTemplate({
  path,
  title,
  description,
  eyebrow,
  h1,
  intro,
  sections = [],
  faqs = [],
  keywords = [],
  breadcrumbs = [],
  relatedLinks = [],
  schemaType = 'service',
  schemaData = null,
  waMessage = 'I need your consultation.',
  children,
  showWhyChooseUs = true,
  compactHero = false,
}) {
  const faqItems = faqs.length > 0 ? [...faqs, ...SEO_FAQS.slice(0, 3)] : undefined

  return (
    <>
      <SeoHead title={title} description={description} path={path} />
      <StructuredData pageType={schemaType} pageData={schemaData || { path, title, description, h1, faqs, keywords }} />

      <main id="main-content" role="main">
        <PremiumPageHero
          breadcrumbs={breadcrumbs}
          eyebrow={eyebrow}
          h1={h1}
          intro={intro}
          keywords={keywords}
          waMessage={waMessage}
          analyticsTag={`seo_page_${path.replace(/\//g, '_')}`}
          compact={compactHero}
        />

        <MantraBanner />

        <Suspense fallback={<SectionFallback />}>
          <GuaranteeBanner />
        </Suspense>

        <PremiumContentSections sections={sections} />

        {children}

        {showWhyChooseUs && (
          <Suspense fallback={<SectionFallback />}>
            <WhyChooseUs />
          </Suspense>
        )}

        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <FAQ items={faqItems} id="page-faq" />
        </Suspense>

        {relatedLinks.length > 0 && (
          <RelatedServicesNav links={relatedLinks} />
        )}

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
    </>
  )
}
