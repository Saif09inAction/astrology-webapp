import { lazy, Suspense } from 'react'
import PremiumPageHero from '../layout/PremiumPageHero'
import MantraBanner from '../components/ui/MantraBanner'
import SeoHead from '../components/seo/SeoHead'
import StructuredData from '../components/seo/StructuredData'
import { PANDIT_NAME, PHONE_DISPLAY } from '../constants'

const Contact = lazy(() => import('../components/sections/Contact'))
const FAQ = lazy(() => import('../components/sections/FAQ'))
const GuaranteeBanner = lazy(() => import('../components/sections/GuaranteeBanner'))

const META = {
  title: `Contact ${PANDIT_NAME} | Free Online Astrology Consultation 24/7`,
  description: `Contact Dheeraj Shastri Ji for free love & relationship astrology consultation. WhatsApp ${PHONE_DISPLAY} · 24/7 · Confidential · Results in 24 hours.`,
}

export default function ContactPage() {
  return (
    <>
      <SeoHead title={META.title} description={META.description} path="/contact" />
      <StructuredData pageType="contact" pageData={{ path: '/contact', ...META }} />
      <main id="main-content" role="main">
        <PremiumPageHero
          breadcrumbs={[{ label: 'Contact' }]}
          eyebrow="ॐ · संपर्क · Reach Out"
          h1="Get Free Consultation – Confidential & 24/7"
          intro="Reach out via WhatsApp or phone for a free, confidential astrology consultation. Available every day — English, Hindi, Marathi & Hinglish."
          waMessage="I want a free consultation."
          analyticsTag="contact_hero"
        />
        <MantraBanner />
        <Suspense fallback={null}><GuaranteeBanner /></Suspense>
        <Suspense fallback={null}><Contact /></Suspense>
        <Suspense fallback={null}><FAQ id="contact-faq" /></Suspense>
      </main>
    </>
  )
}
