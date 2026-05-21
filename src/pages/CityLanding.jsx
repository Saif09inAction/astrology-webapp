import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingButtons from '../components/ui/FloatingButtons'
import LeadModal from '../components/ui/LeadModal'
import Button from '../components/ui/Button'
import { WhatsAppIcon } from '../components/ui/Icons'
import SeoHead from '../components/seo/SeoHead'
import StructuredData from '../components/seo/StructuredData'
import { AppProvider, useApp } from '../context/AppContext'
import { onWhatsAppClick } from '../analytics/meta'
import { CITY_PAGES, getCityPage } from '../seo/cityPages'
import { SEO } from '../seo/config'

function CityContent({ page }) {
  const { settings, openModal } = useApp()
  const { panditName, whatsappBase } = settings
  const waConsult = `${whatsappBase}?text=${encodeURIComponent(`Hello ${panditName} Ji, I need love/relationship consultation in ${page.city}.`)}`

  return (
    <>
      <SeoHead title={page.title} description={page.description} path={`/${page.slug}`} />
      <StructuredData cityPage={page} />

      <Navbar />
      <LeadModal />

      <main id="main-content" role="main">
        <section
          className="relative section-padding overflow-hidden"
          style={{
            paddingTop: 'clamp(100px, 14vw, 140px)',
            background: 'linear-gradient(180deg, rgba(3,7,18,1) 0%, rgba(10,15,35,1) 100%)',
          }}
        >
          <div className="site-container relative z-10 max-w-3xl">
            <p className="font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-4">
              ॐ · {page.region} · Online Consultation
            </p>
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              {page.h1}
            </h1>
            <p className="font-poppins text-white/55 text-base leading-relaxed mb-8">
              {page.intro}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {page.keywords.map((kw) => (
                <span
                  key={kw}
                  className="font-poppins text-[11px] px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(245,158,11,0.06)',
                    border: '1px solid rgba(245,158,11,0.15)',
                    color: 'rgba(251,191,36,0.7)',
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                as="a"
                variant="primary"
                href={waConsult}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onWhatsAppClick(`city_${page.slug}`)}
                icon={<WhatsAppIcon size={16} />}
              >
                Free WhatsApp Consultation
              </Button>
              <Button variant="secondary" onClick={() => openModal('city_page')}>
                Book Free Call Back
              </Button>
            </div>

            <article className="font-poppins text-white/45 text-sm leading-relaxed space-y-4">
              <h2 className="font-cinzel text-xl text-white/80 font-semibold">
                Why consult {panditName} for love &amp; relationship problems?
              </h2>
              <p>
                With 15+ years of Vedic astrology experience and 5,000+ satisfied clients, {panditName} specialises in ex love back solutions, breakup recovery, vashikaran remedies, marriage problem astrology, and emotional healing — all through confidential online consultation.
              </p>
              <p>
                Whether you search for a love astrologer in {page.city}, need pyar wapas kaise laye guidance, or want an ex love back specialist you can trust — consultation is available 24/7 via WhatsApp with results-oriented remedies and pay-after-results assurance.
              </p>
              <h2 className="font-cinzel text-xl text-white/80 font-semibold pt-2">
                Services available in {page.city} &amp; online
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-white/40">
                <li>Ex love back &amp; lost love reunion</li>
                <li>Love problem solution &amp; breakup help</li>
                <li>Vashikaran &amp; spiritual relationship remedies</li>
                <li>Marriage problem &amp; love marriage specialist</li>
                <li>Kundli matching &amp; compatibility analysis</li>
                <li>Husband-wife dispute &amp; family conflict resolution</li>
              </ul>
            </article>

            <div className="mt-12 pt-8 border-t border-white/6">
              <p className="font-cinzel text-[11px] tracking-[0.2em] text-white/30 uppercase mb-4">
                Also serving
              </p>
              <nav aria-label="City service areas" className="flex flex-wrap gap-x-4 gap-y-2">
                <Link to="/" className="font-poppins text-[13px] text-gold-400/70 hover:text-gold-400 transition-colors">
                  Home
                </Link>
                {CITY_PAGES.filter((p) => p.slug !== page.slug).map((p) => (
                  <Link
                    key={p.slug}
                    to={`/${p.slug}`}
                    className="font-poppins text-[13px] text-white/35 hover:text-gold-400 transition-colors"
                  >
                    {p.city}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtons />
    </>
  )
}

export default function CityLanding({ slug }) {
  const page = getCityPage(slug)
  if (!page) return null

  return (
    <AppProvider>
      <CityContent page={page} />
    </AppProvider>
  )
}

export function CityLandingRoute({ slug }) {
  return <CityLanding slug={slug} />
}

/** Home page SEO head */
export function HomeSeoHead() {
  return <SeoHead title={SEO.title} description={SEO.description} path="/" />
}
