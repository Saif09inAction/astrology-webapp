import { lazy, Suspense } from 'react'
import PremiumPageHero from '../layout/PremiumPageHero'
import MantraBanner from '../components/ui/MantraBanner'
import SeoHead from '../components/seo/SeoHead'
import StructuredData from '../components/seo/StructuredData'
import { PANDIT_NAME } from '../constants'

const About = lazy(() => import('../components/sections/About'))
const WhyChooseUs = lazy(() => import('../components/sections/WhyChooseUs'))
const Testimonials = lazy(() => import('../components/sections/Testimonials'))
const Contact = lazy(() => import('../components/sections/Contact'))
const GuaranteeBanner = lazy(() => import('../components/sections/GuaranteeBanner'))

const META = {
  title: `About ${PANDIT_NAME} | Love Back Astrologer & Vashikaran Specialist India`,
  description: `About Dheeraj Shastri Ji — 15+ years Vedic astrology experience, 5000+ clients. Love back, ex love, vashikaran & marriage problem expert. Online consultation India.`,
}

export default function AboutPage() {
  return (
    <>
      <SeoHead title={META.title} description={META.description} path="/about" />
      <StructuredData pageType="about" pageData={{ path: '/about', ...META }} />
      <main id="main-content" role="main">
        <PremiumPageHero
          breadcrumbs={[{ label: 'About' }]}
          eyebrow="ॐ · परिचय · Who I Am"
          h1="Ancient Wisdom – Modern Clarity"
          intro="Born into a lineage of Vedic scholars, Dheeraj Shastri Ji has spent 15+ years transforming lives across 50+ countries through love, marriage, career, and spiritual guidance."
          waMessage="I want to know more about you and book a consultation."
          analyticsTag="about_hero"
          imageSrc="/pandit2.jpeg"
        />
        <MantraBanner />
        <Suspense fallback={null}><GuaranteeBanner /></Suspense>
        <Suspense fallback={null}><About /></Suspense>
        <Suspense fallback={null}><WhyChooseUs /></Suspense>
        <Suspense fallback={null}><Testimonials /></Suspense>
        <Suspense fallback={null}><Contact /></Suspense>
      </main>
    </>
  )
}
