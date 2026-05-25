import { motion } from 'framer-motion'
import { Clock, ShieldCheck, Infinity } from 'lucide-react'
import StarField from '../components/ui/StarField'
import Button from '../components/ui/Button'
import { WhatsAppIcon } from '../components/ui/Icons'
import PageBreadcrumbs from '../components/seo/PageBreadcrumbs'
import { useApp } from '../context/AppContext'
import { onWhatsAppClick } from '../analytics/meta'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const guarantees = [
  { icon: Clock, label: 'Results in 24 Hours' },
  { icon: ShieldCheck, label: 'Pay After Work Done' },
  { icon: Infinity, label: 'Lifetime Fix' },
]

/** Split "Title – Gold Part – Sub" from h1 strings */
export function parsePageHeading(h1) {
  const parts = h1.split('–').map((s) => s.trim()).filter(Boolean)
  if (parts.length >= 2) {
    return { line1: parts[0], gold: parts[1], line3: parts[2] || null }
  }
  return { line1: h1, gold: null, line3: null }
}

/**
 * Inner-page hero — same cinematic language as homepage Hero
 */
export default function PremiumPageHero({
  breadcrumbs = [],
  eyebrow = 'ॐ · Vedic Astrology & Spiritual Healing',
  h1,
  intro,
  keywords = [],
  waMessage = 'I need your consultation.',
  analyticsTag = 'page_hero',
  imageSrc = '/pandit1.jpeg',
  compact = false,
}) {
  const { settings, openModal } = useApp()
  const { panditName, whatsappBase } = settings
  const wa = `${whatsappBase}?text=${encodeURIComponent(`Hello ${panditName} Ji, ${waMessage}`)}`
  const { line1, gold, line3 } = parsePageHeading(h1)

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: compact ? 'auto' : 'min(92vh, 900px)',
        display: 'flex',
        alignItems: 'center',
        background: '#030712',
      }}
    >
      <StarField />

      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 1 }}>
        <div style={{
          position: 'absolute', top: '25%', left: '-5%', width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', top: '8%', right: '0%', width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(245,158,11,0.09) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
        }} />
      </div>

      <div
        className="site-container relative w-full"
        style={{ zIndex: 10, paddingTop: 'clamp(88px,12vw,130px)', paddingBottom: 'clamp(48px,8vw,80px)' }}
      >
        {breadcrumbs.length > 0 && (
          <motion.div {...fadeUp(0)} style={{ marginBottom: 20 }}>
            <PageBreadcrumbs items={breadcrumbs} />
          </motion.div>
        )}

        <div className="hero-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr', gap: '48px 56px', alignItems: 'center',
        }}>
          <div className="hero-left" style={{ display: 'flex', flexDirection: 'column' }}>
            <motion.div {...fadeUp(0.05)} style={{ marginBottom: 20 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 16px', borderRadius: 999,
                border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.06)',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#fbbf24',
                  boxShadow: '0 0 6px rgba(251,191,36,0.8)', animation: 'pulse 2s ease-in-out infinite',
                }} />
                <span className="font-poppins text-[11px] text-gold-400 tracking-[0.16em] uppercase">{eyebrow}</span>
              </div>
            </motion.div>

            <motion.h1 {...fadeUp(0.12)} className="hero-h1" style={{
              fontFamily: "'Cinzel',serif", fontWeight: 800, lineHeight: 1.12, color: '#fff', marginBottom: 18,
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            }}>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.92)' }}>{line1}</span>
              {gold && (
                <span className="text-gradient-gold" style={{ display: 'block' }}>{gold}</span>
              )}
              {line3 && (
                <span style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '0.78em', fontWeight: 700 }}>{line3}</span>
              )}
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="font-poppins leading-relaxed" style={{
              fontSize: 'clamp(14px,1.5vw,16px)', color: 'rgba(255,255,255,0.5)', marginBottom: 24, maxWidth: 520,
            }}>
              {intro}
            </motion.p>

            {keywords.length > 0 && (
              <motion.div {...fadeUp(0.26)} className="flex flex-wrap gap-2" style={{ marginBottom: 28 }}>
                {keywords.slice(0, 5).map((kw) => (
                  <span key={kw} className="font-poppins text-[11px] px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)' }}>
                    {kw}
                  </span>
                ))}
              </motion.div>
            )}

            <motion.div {...fadeUp(0.32)} style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 32 }}>
              {guarantees.map(({ icon: Icon, label }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: 9, padding: '9px 13px', borderRadius: 9,
                  border: '1px solid rgba(245,158,11,0.13)', background: 'rgba(245,158,11,0.04)',
                }}>
                  <Icon size={13} style={{ color: '#fbbf24', flexShrink: 0 }} />
                  <span className="font-poppins text-[11px]" style={{ color: 'rgba(255,255,255,0.65)' }}>{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.38)} className="flex flex-col sm:flex-row gap-4">
              <Button as="a" variant="primary" href={wa} target="_blank" rel="noopener noreferrer"
                onClick={onWhatsAppClick(analyticsTag)} icon={<WhatsAppIcon size={16} />}>
                Free WhatsApp Consultation
              </Button>
              <Button variant="secondary" onClick={() => openModal(analyticsTag)}>Book Free Call Back</Button>
            </motion.div>
          </div>

          {/* Image column — desktop */}
          <motion.div
            {...fadeUp(0.15)}
            className="hidden lg:block hero-right relative"
            style={{ justifySelf: 'end', width: '100%', maxWidth: 420 }}
          >
            <div style={{
              position: 'absolute', inset: '-12% -8%',
              background: 'radial-gradient(ellipse at 60% 40%, rgba(109,40,217,0.22) 0%, rgba(245,158,11,0.07) 50%, transparent 75%)',
              borderRadius: '3rem', filter: 'blur(32px)', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'relative', aspectRatio: '3/4.3', borderRadius: '2rem', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 0 0 1px rgba(245,158,11,0.06), 0 40px 80px rgba(0,0,0,0.5)',
            }}>
              <img src={imageSrc} alt={panditName} width="420" height="560" loading="eager"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.85) 0%, transparent 50%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-cinzel text-lg font-bold text-white">{panditName}</p>
                <p className="font-poppins text-[11px] tracking-[0.2em] text-gold-400/70 uppercase mt-0.5">Vedic Astrologer · 15+ Yrs</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
