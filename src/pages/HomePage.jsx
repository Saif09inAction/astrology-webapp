import { lazy, Suspense } from 'react'
import SeoHead from '../components/seo/SeoHead'
import StructuredData from '../components/seo/StructuredData'
import { SEO } from '../seo/config'
import Hero from '../components/sections/Hero'
import MantraBanner from '../components/ui/MantraBanner'

const GuaranteeBanner = lazy(() => import('../components/sections/GuaranteeBanner'))
const About           = lazy(() => import('../components/sections/About'))
const Services        = lazy(() => import('../components/sections/Services'))
const WhyChooseUs     = lazy(() => import('../components/sections/WhyChooseUs'))
const Testimonials    = lazy(() => import('../components/sections/Testimonials'))
const FAQ             = lazy(() => import('../components/sections/FAQ'))
const Contact         = lazy(() => import('../components/sections/Contact'))

function Skeleton() {
  return <div style={{ height: 60, background: 'rgba(255,255,255,0.01)' }} aria-hidden="true" />
}

export default function HomePage() {
  return (
    <>
      <SeoHead title={SEO.title} description={SEO.description} path="/" />
      <StructuredData pageType="home" />
      <main id="main-content" role="main">
        <Hero />
        <MantraBanner />
        <Suspense fallback={<Skeleton />}><GuaranteeBanner /></Suspense>
        <Suspense fallback={<Skeleton />}><About /></Suspense>
        <Suspense fallback={<Skeleton />}><Services /></Suspense>
        <Suspense fallback={<Skeleton />}><WhyChooseUs /></Suspense>
        <Suspense fallback={<Skeleton />}><Testimonials /></Suspense>
        <Suspense fallback={<Skeleton />}><FAQ /></Suspense>
        <Suspense fallback={<Skeleton />}><Contact /></Suspense>
      </main>
    </>
  )
}
