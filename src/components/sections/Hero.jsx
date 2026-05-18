import { motion } from 'framer-motion'
import { Phone, Clock, Infinity, ShieldCheck } from 'lucide-react'
import StarField from '../ui/StarField'
import Button from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { PANDIT_NAME, PHONE_DISPLAY, PHONE_TEL } from '../../constants'
import { useApp } from '../../context/AppContext'

/* ─── Stagger helper ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const guarantees = [
  { icon: Clock,       label: 'Results in 24 Hours' },
  { icon: ShieldCheck, label: 'Pay After Work Done' },
  { icon: Infinity,    label: 'Lifetime Fix' },
]

const stats = [
  { value: '5000+', label: 'Clients Helped' },
  { value: '15+',   label: 'Years Active' },
  { value: '4.9★',  label: 'Avg. Rating' },
  { value: '50+',   label: 'Countries' },
]

export default function Hero() {
  const { openModal } = useApp()
  return (
    <section
      id="hero"
      aria-label="Dheeraj Shastri Ji – India's Most Trusted Vedic Astrologer"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#030712' }}
    >
      {/* ── Starfield canvas ── */}
      <StarField />

      {/* ── Ambient glow orbs ── */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 1 }}>
        {/* left-side purple wash */}
        <div style={{
          position: 'absolute', top: '30%', left: '-5%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
        }} />
        {/* right-side gold haze */}
        <div style={{
          position: 'absolute', top: '10%', right: '0%',
          width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(245,158,11,0.09) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
        }} />
        {/* bottom accent */}
        <div style={{
          position: 'absolute', bottom: '0%', left: '40%',
          width: 400, height: 300,
          background: 'radial-gradient(circle, rgba(109,40,217,0.07) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
        }} />
      </div>

      {/* ── Decorative orbit rings (centered on image column) ── */}
      <div className="pointer-events-none absolute hidden lg:block" style={{
        top: '39%', right: '9%',
        width: 525, height: 525,
        transform: 'translateY(-50%)',
        zIndex: 1,
      }}>
        <div className="animate-rotate-slow absolute inset-0 rounded-full" style={{
          border: '1px dashed rgba(245,158,11,0.1)',
        }} />
        <div className="absolute rounded-full" style={{
          inset: '10%',
          border: '1px solid rgba(139,92,246,0.08)',
          animation: 'rotate-slow 45s linear infinite reverse',
        }} />
        {/* dot markers on ring */}
        {[0, 90, 180, 270].map(deg => (
          <div key={deg} className="absolute" style={{
            width: 5, height: 5, borderRadius: '50%',
            background: 'rgba(245,158,11,0.35)',
            top: '50%', left: '50%',
            transformOrigin: '0 0',
            transform: `rotate(${deg}deg) translate(258px, -2.5px)`,
          }} />
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT — max-w-[1200px] centered
      ═══════════════════════════════════════════ */}
      <div
        className="site-container relative"
        style={{ zIndex: 10, paddingTop: 'clamp(72px,12vw,140px)', paddingBottom: 'clamp(40px,8vw,100px)' }}
      >

        {/*
          GRID:
          col-1 → text (1fr, min ~300px)
          col-2 → image (420px fixed on desktop)
          Mobile → single column, image below text
        */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px 56px',
          alignItems: 'center',
          overflow: 'visible',
        }} className="hero-grid">

          {/* ══════════════════════════════
              LEFT — Text & CTA
          ══════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column' }} className="hero-left">

            {/* Eyebrow badge */}
            <motion.div {...fadeUp(0)} style={{ display: 'flex', alignSelf: 'flex-start', marginBottom: 20 }} className="hero-left-center">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 16px', borderRadius: 999,
                border: '1px solid rgba(245,158,11,0.2)',
                background: 'rgba(245,158,11,0.06)',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#fbbf24', flexShrink: 0,
                  boxShadow: '0 0 6px rgba(251,191,36,0.8)',
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
                <span style={{
                  fontFamily: "'Poppins',sans-serif", fontSize: 11,
                  color: '#fbbf24', letterSpacing: '0.16em', textTransform: 'uppercase',
                }}>
                  ॐ · Vedic Astrology &amp; Spiritual Healing
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="hero-h1 hero-left-center"
              style={{
                fontFamily: "'Cinzel',serif",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: '-0.01em',
                color: '#fff',
                marginBottom: 18,
              }}
            >
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.92)' }}>India's Most</span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 45%, #fde68a 80%, #f59e0b 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 4s linear infinite',
              }}>
                Trusted Astrologer
              </span>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '0.78em', fontWeight: 700 }}>
                for Love &amp; Life
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              {...fadeUp(0.22)}
              className="hero-left-center hero-subhead"
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: 'clamp(14px,1.5vw,16px)',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: 28,
                maxWidth: 500,
              }}
            >
              {PANDIT_NAME} has transformed over 5,000 lives across 50+ countries —
              through ancient Vedic wisdom, precise birth chart readings, and real solutions
              for love, marriage, and career.{' '}
              <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
                No payment until you see results.
              </span>
            </motion.p>

            {/* Mobile-only trust line (replaces verbose subheading) */}
            <motion.p
              {...fadeUp(0.2)}
              className="hero-left-center"
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: 13,
                color: 'rgba(255,255,255,0.55)',
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              <span className="md:hidden block">
                5,000+ lives transformed · 50+ countries ·{' '}
                <span style={{ color: 'rgba(251,191,36,0.85)', fontWeight: 600 }}>Pay after results</span>
              </span>
            </motion.p>

            {/* Sanskrit shloka */}
            <motion.p
              {...fadeUp(0.28)}
              className="hero-left-center font-cinzel text-[11px] tracking-widest"
              style={{ color: 'rgba(255,107,0,0.55)', marginBottom: 20, marginTop: -10 }}
            >
              ✦ यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः ✦
            </motion.p>

            {/* Guarantee pills — 2×2 compact grid */}
            <motion.div {...fadeUp(0.34)} className="hero-left-center" style={{ marginBottom: 32 }}>
              <div               style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 9,
              }}>
                {guarantees.map(({ icon: Icon, label }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    padding: '9px 13px',
                    borderRadius: 9,
                    border: '1px solid rgba(245,158,11,0.13)',
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.05) 0%, rgba(245,158,11,0.02) 100%)',
                  }}>
                    <Icon size={13} style={{ color: '#fbbf24', flexShrink: 0 }} />
                    <span style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: 12, fontWeight: 500,
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1.3,
                    }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              {...fadeUp(0.46)}
              className="hero-left-center hero-cta-wrap"
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}
            >
              <Button
                as="button"
                variant="primary"
                onClick={() => openModal()}
                icon={<WhatsAppIcon size={18} />}
              >
                Free WhatsApp Consultation
              </Button>
              <Button
                as="a"
                variant="secondary"
                href={PHONE_TEL}
                icon={<Phone size={16} />}
              >
                {PHONE_DISPLAY}
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...fadeUp(0.58)}
              className="hero-left-center"
            >
              <div style={{
                display: 'flex', gap: 0,
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: 20,
                maxWidth: 460,
              }}
              className="hero-stats">
                {stats.map(({ value, label }, i) => (
                  <div key={label} style={{
                    flex: 1, textAlign: 'center',
                    borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    padding: '0 12px',
                  }}>
                    <p style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: 'clamp(15px,2vw,20px)',
                      fontWeight: 700,
                      color: '#fbbf24',
                      lineHeight: 1,
                      marginBottom: 5,
                    }}>{value}</p>
                    <p style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.32)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}>{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════
              RIGHT — Image & Visual
          ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className="hero-right"
          >
            <div className="animate-float" style={{ position: 'relative', width: '100%', maxWidth: 460, transform: 'translateY(-28px)' }}>

              {/* Glow halo */}
              <div style={{
                position: 'absolute',
                inset: '-12% -8%',
                background: 'radial-gradient(ellipse at 60% 40%, rgba(109,40,217,0.22) 0%, rgba(245,158,11,0.07) 50%, transparent 75%)',
                borderRadius: '3rem',
                filter: 'blur(32px)',
                pointerEvents: 'none',
                zIndex: 0,
              }} />

              {/* ── Image frame ── */}
              <div style={{
                position: 'relative', zIndex: 1,
                width: '100%',
                aspectRatio: '3 / 4.3',
                borderRadius: '2rem',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 0 0 1px rgba(245,158,11,0.06), 0 40px 80px rgba(0,0,0,0.5)',
                background: 'linear-gradient(155deg, rgba(109,40,217,0.15) 0%, rgba(5,10,24,0.9) 50%, rgba(245,158,11,0.06) 100%)',
              }}>
                {/* Actual image */}
                <img
                  src="/panditji.png"
                  alt={`${PANDIT_NAME} – India's Most Trusted Vedic Astrologer`}
                  width="460"
                  height="615"
                  fetchPriority="high"
                  decoding="sync"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                  onError={e => {
                    e.target.style.display = 'none'
                    document.getElementById('hero-img-fallback').style.display = 'flex'
                  }}
                />

                {/* Fallback */}
                <div id="hero-img-fallback" style={{
                  display: 'none',
                  position: 'absolute', inset: 0,
                  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
                }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    border: '1px solid rgba(245,158,11,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(245,158,11,0.05)',
                    fontSize: 32,
                  }}>🕉️</div>
                  <p style={{ fontFamily: "'Cinzel',serif", color: '#fbbf24', fontSize: 15, fontWeight: 700 }}>{PANDIT_NAME}</p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>Vedic Astrologer · 15+ Years</p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", color: 'rgba(255,255,255,0.15)', fontSize: 10, marginTop: 8, textAlign: 'center', lineHeight: 1.5, padding: '0 20px' }}>
                    Drop panditji.jpg into /public folder
                  </p>
                </div>

                {/* Name gradient overlay */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '52px 22px 20px',
                  background: 'linear-gradient(to top, rgba(3,7,18,0.96) 0%, rgba(3,7,18,0.4) 60%, transparent 100%)',
                }}>
                  <p style={{ fontFamily: "'Cinzel',serif", color: '#fff', fontSize: 14, fontWeight: 700 }}>{PANDIT_NAME}</p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", color: 'rgba(251,191,36,0.7)', fontSize: 11, marginTop: 4, letterSpacing: '0.04em' }}>
                    Vedic Astrologer · 15+ Years Experience
                  </p>
                </div>

                {/* Inner corner accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.5) 50%, transparent 100%)',
                }} />
              </div>

              {/* ── Floating chip: Available ── */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="hero-chip"
                style={{
                  position: 'absolute', top: '40%', left: -22, zIndex: 2,
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 14px', borderRadius: 12,
                  border: '1px solid rgba(52,211,153,0.25)',
                  background: 'rgba(3,10,26,0.92)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                }}
              >
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#34d399', flexShrink: 0,
                  boxShadow: '0 0 8px rgba(52,211,153,0.7)',
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
                <div>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600, color: '#fff', lineHeight: 1 }}>Available Now</p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Online · 24×7</p>
                </div>
              </motion.div>

              {/* ── Floating chip: Rating ── */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                className="hero-chip"
                style={{
                  position: 'absolute', top: -14, right: -12, zIndex: 2,
                  padding: '8px 14px', borderRadius: 12,
                  border: '1px solid rgba(245,158,11,0.25)',
                  background: 'rgba(3,10,26,0.9)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                <p style={{ fontFamily: "'Cinzel',serif", color: '#fbbf24', fontSize: 16, fontWeight: 700, lineHeight: 1 }}>4.9 ★</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", color: 'rgba(255,255,255,0.38)', fontSize: 10, marginTop: 3 }}>1,200+ Reviews</p>
              </motion.div>

              {/* ── Floating chip: Free consult ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="hero-chip"
                style={{
                  position: 'absolute', top: '42%', right: -20, zIndex: 2,
                  padding: '8px 13px', borderRadius: 12,
                  border: '1px solid rgba(139,92,246,0.25)',
                  background: 'rgba(3,10,26,0.9)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, color: '#a78bfa' }}>Free First</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>Consultation</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          zIndex: 10,
        }}
      >
        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(245,158,11,0.4), transparent)' }} />
      </motion.div>

      {/* ── Responsive grid styles ── */}
      <style>{`
        /* Fluid headline */
        .hero-h1 { font-size: clamp(2.1rem, 4.5vw, 3.6rem); }

        /* Desktop: 2-column grid — text LEFT, image RIGHT */
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 400px !important; }
          .hero-left  { align-items: flex-start !important; }
          .hero-left-center { align-self: auto !important; text-align: left !important; }
          .hero-right { justify-content: flex-end !important; }
        }

        /* Tablet */
        @media (min-width: 640px) and (max-width: 1023px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { order: -1; }
          .hero-right > div { max-width: 320px !important; }
          .hero-left  { align-items: center !important; text-align: center !important; }
          .hero-left-center { align-self: center !important; text-align: center !important; }
        }

          /* ══════════════════════════════════════════════════
           MOBILE — Cinematic premium spiritual experience
        ══════════════════════════════════════════════════ */
        @media (max-width: 639px) {

          /* Grid: single column, tighter gap */
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }

          /* Image comes FIRST — large and cinematic */
          .hero-right { order: -1; width: 100%; display: flex; justify-content: center; margin-bottom: 20px; }
          .hero-right > div {
            max-width: min(92vw, 380px) !important;
            width:     min(92vw, 380px) !important;
            transform: none !important;
          }
          /* Stronger mobile glow */
          .hero-right > div > div:first-child {
            filter: blur(20px) !important;
            background: radial-gradient(ellipse at 50% 40%, rgba(109,40,217,0.35) 0%, rgba(245,158,11,0.15) 50%, transparent 75%) !important;
          }

          /* Text block below image — centered */
          .hero-left { align-items: center !important; text-align: center !important; }
          .hero-left-center { align-self: center !important; text-align: center !important; }

          /* Hide floating chips — they overflow */
          .hero-chip { display: none !important; }

          /* Larger, more cinematic headline */
          .hero-h1 { font-size: clamp(2.2rem, 9.5vw, 3rem) !important; line-height: 1.1 !important; }

          /* Hide verbose subheading on mobile to reduce clutter */
          .hero-subhead { display: none !important; }

          /* Full-width stacked premium CTA buttons */
          .hero-cta-wrap {
            flex-direction: column !important;
            width: 100% !important;
            gap: 10px !important;
            margin-bottom: 24px !important;
          }
          .hero-cta-wrap > * {
            width: 100% !important;
            justify-content: center !important;
            font-size: 15px !important;
            padding: 17px 20px !important;
            border-radius: 16px !important;
          }

          /* Stats bar — compact 4-across */
          .hero-stats {
            max-width: 100% !important;
            border-top: 1px solid rgba(255,255,255,0.06) !important;
            padding-top: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
