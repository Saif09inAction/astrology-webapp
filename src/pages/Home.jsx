import { Suspense, lazy } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingButtons from '../components/ui/FloatingButtons'
import MantraBanner from '../components/ui/MantraBanner'
import LeadModal from '../components/ui/LeadModal'
import { AppProvider } from '../context/AppContext'

// Hero loads eagerly — it's the LCP element
import Hero from '../components/sections/Hero'
import StructuredData from '../components/seo/StructuredData'
import { HomeSeoHead } from './CityLanding'

// Everything below the fold loads lazily — reduces initial JS parse by ~40%
const GuaranteeBanner = lazy(() => import('../components/sections/GuaranteeBanner'))
const About           = lazy(() => import('../components/sections/About'))
const Services        = lazy(() => import('../components/sections/Services'))
const WhyChooseUs     = lazy(() => import('../components/sections/WhyChooseUs'))
const Testimonials    = lazy(() => import('../components/sections/Testimonials'))
const FAQ             = lazy(() => import('../components/sections/FAQ'))
const Contact         = lazy(() => import('../components/sections/Contact'))

// Minimal skeleton shown while lazy sections load
function SectionSkeleton() {
  return (
    <div
      style={{
        height: '60px',
        background: 'rgba(255,255,255,0.01)',
      }}
      aria-hidden="true"
    />
  )
}

export default function Home() {
  return (
    <AppProvider>
    <HomeSeoHead />
    <StructuredData />
    <div className="relative">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <LeadModal />
      <main id="main-content" role="main">
        <Hero />
        <MantraBanner />
        <Suspense fallback={<SectionSkeleton />}>
          <GuaranteeBanner />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <WhyChooseUs />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
    </AppProvider>
  )
}
