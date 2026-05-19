import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Star, ShieldCheck } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import { getTestimonials } from '../../firebase/firestore'

/* ─── Static fallback text reviews ─── */
const STATIC_BASE = [
  { name: 'Priya Sharma',  location: 'Delhi',     service: 'Love Problem',    rating: 5, text: 'My partner came back within 3 weeks. I owe everything to Pandit Ji — his remedies truly work.', color: '#f472b6', avatar: 'PS' },
  { name: 'Rahul Verma',   location: 'Mumbai',    service: 'Career Guidance', rating: 5, text: 'Stuck for 7 years in the same job. After consulting, I got a promotion and a better offer within 2 months.', color: '#60a5fa', avatar: 'RV' },
  { name: 'Anita Patel',   location: 'Ahmedabad', service: 'Kundli Matching', rating: 5, text: 'Both families were against our marriage. Pandit Ji resolved every dosha and we had a beautiful wedding.', color: '#fbbf24', avatar: 'AP' },
  { name: 'Vikram Singh',  location: 'Delhi',     service: 'Ex Love Back',    rating: 5, text: 'My ex came back within a week. I am so grateful to Dheeraj Shastri Ji.', color: '#a78bfa', avatar: 'VS' },
  { name: 'Sunita Gupta',  location: 'Jaipur',    service: 'Business',        rating: 5, text: 'My business was at a loss for 2 years. After his remedies, everything turned around completely.', color: '#34d399', avatar: 'SG' },
]

/* ─── Real WhatsApp screenshot proofs ─── */
const SCREENSHOTS = [
  { src: '/review1.png', service: 'Vashikaran'  },
  { src: '/review2.png', service: 'Ex Love Back' },
  { src: '/review3.png', service: 'Love Problem' },
]

const CARD_W  = 240
const CARD_H  = 340
const GAP_PX  = 28
const STEP    = CARD_W + GAP_PX
const REPEATS = 8   // enough copies to fill any screen seamlessly
const SPEED   = 0.55

/* ══════════════════════════════════════════
   3-D COVERFLOW CAROUSEL (screenshot cards)
══════════════════════════════════════════ */
function CoverflowCarousel() {
  const containerRef = useRef(null)
  const trackRef     = useRef(null)
  const posRef       = useRef(0)
  const rafRef       = useRef(null)
  const pauseRef     = useRef(false)
  const touchRef     = useRef({ active: false, lastX: 0 })

  /* Duplicate cards for seamless loop */
  const cards  = Array.from({ length: REPEATS }, () => SCREENSHOTS).flat()
  const UNIT_W = SCREENSHOTS.length * STEP   // one full cycle width

  useEffect(() => {
    const container = containerRef.current
    const track     = trackRef.current
    if (!container || !track) return

    const tick = () => {
      if (!pauseRef.current) {
        posRef.current -= SPEED
        if (posRef.current <= -UNIT_W) posRef.current += UNIT_W
      }

      track.style.transform = `translateX(${posRef.current}px)`

      /* ── Apply 3-D perspective per card ── */
      const W       = container.offsetWidth
      const centerX = W / 2

      Array.from(track.children).forEach((el, i) => {
        const cardCX = i * STEP + CARD_W / 2 + posRef.current
        const dist   = (cardCX - centerX) / (STEP * 1.4)   // normalised
        const abs    = Math.abs(dist)

        const rotY   = dist * -45                           // ±45 deg
        const scale  = Math.max(0.6, 1 - abs * 0.32)
        const tz     = -abs * 140                           // push back in Z
        const op     = Math.max(0, 1 - abs * 0.55)

        el.style.transform = `rotateY(${rotY}deg) scale(${scale}) translateZ(${tz}px)`
        el.style.opacity   = op < 0.08 ? 0 : op
        el.style.zIndex    = String(Math.round(Math.max(0, 12 - abs * 9)))
        /* Glow / shadow on front card */
        el.style.boxShadow = abs < 0.35
          ? '0 24px 60px rgba(0,0,0,0.7), 0 0 36px rgba(245,158,11,0.22)'
          : '0 10px 30px rgba(0,0,0,0.5)'
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const onMouseEnter = () => { pauseRef.current = true  }
  const onMouseLeave = () => { pauseRef.current = false }

  const onTouchStart = useCallback((e) => {
    pauseRef.current = true
    touchRef.current = { active: true, lastX: e.touches[0].clientX }
  }, [])

  const onTouchMove = useCallback((e) => {
    if (!touchRef.current.active) return
    e.preventDefault()
    const dx = e.touches[0].clientX - touchRef.current.lastX
    touchRef.current.lastX = e.touches[0].clientX
    posRef.current += dx
  }, [])

  const onTouchEnd = useCallback(() => {
    touchRef.current.active = false
    pauseRef.current = false
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      style={{ perspective: '900px', perspectiveOrigin: '50% 45%', padding: '40px 0 48px' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="WhatsApp proof screenshots"
    >
      <div
        ref={trackRef}
        className="flex items-center"
        style={{ gap: GAP_PX, willChange: 'transform', transformStyle: 'preserve-3d' }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="shrink-0 rounded-2xl overflow-hidden relative"
            style={{
              width: CARD_W, height: CARD_H,
              background: '#0d1628',
              border: '1px solid rgba(245,158,11,0.22)',
              willChange: 'transform, opacity',
              transition: 'box-shadow 0.2s',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px z-10"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(245,158,11,0.6),transparent)' }} />
            <img
              src={card.src}
              alt="Client WhatsApp proof"
              className="w-full block object-cover object-top"
              style={{ height: CARD_H - 34 }}
              draggable={false}
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2"
              style={{ background: 'rgba(3,7,18,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-1">
                <ShieldCheck size={10} className="text-green-400" />
                <span className="font-poppins text-[9px] text-green-400 font-medium">Verified</span>
              </div>
              <span className="font-poppins text-[8px] tracking-wider uppercase px-1.5 py-0.5 rounded-full"
                style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}>
                {card.service}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════
   TEXT REVIEW CARD
══════════════════════ */
function Card({ t }) {
  return (
    <div className="relative rounded-2xl p-5 flex flex-col shrink-0"
      style={{ width: 'clamp(260px,80vw,340px)', background: 'rgba(255,255,255,0.03)', border: `1px solid ${t.color}28` }}>
      <div className="absolute top-0 left-6 right-6 h-px rounded-full"
        style={{ background: `linear-gradient(90deg,transparent,${t.color}60,transparent)` }} />
      <div className="flex gap-1 mb-3">
        {Array.from({ length: t.rating || 5 }).map((_, i) => (
          <Star key={i} size={13} fill="#f59e0b" className="text-yellow-400" />
        ))}
      </div>
      <p className="font-poppins text-[13px] text-white/65 leading-relaxed italic flex-1 mb-4">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-cinzel text-[11px] font-bold text-white"
          style={{ background: `linear-gradient(135deg,${t.color}90,${t.color}30)`, border: `1px solid ${t.color}40` }}>
          {t.avatar || t.name?.[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-cinzel text-[13px] font-bold text-white truncate">{t.name}</p>
          <p className="font-poppins text-[10px] text-white/35">{t.location}</p>
        </div>
        <span className="font-poppins text-[9px] tracking-wider uppercase px-2 py-1 rounded-full shrink-0"
          style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}25` }}>
          {t.service}
        </span>
      </div>
    </div>
  )
}

/* ══════════════════════
   TEXT MARQUEE ROW
══════════════════════ */
function MarqueeRow({ items, reverse = false, speed = 0.45 }) {
  const trackRef = useRef(null)
  const posRef   = useRef(null)
  const rafRef   = useRef(null)
  const pauseRef = useRef(false)
  const touchRef = useRef({ active: false, lastX: 0 })

  const repeated = [...items, ...items, ...items, ...items, ...items, ...items]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const init = () => {
      const unitW = track.scrollWidth / 6
      if (posRef.current === null) posRef.current = reverse ? -unitW : 0
      const tick = () => {
        if (!pauseRef.current) {
          if (reverse) { posRef.current += speed; if (posRef.current >= 0) posRef.current -= unitW }
          else         { posRef.current -= speed; if (posRef.current <= -unitW) posRef.current += unitW }
          track.style.transform = `translateX(${posRef.current}px)`
        }
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    const frame = requestAnimationFrame(init)
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(rafRef.current) }
  }, [items.length, reverse, speed])

  const onMouseEnter = () => { pauseRef.current = true  }
  const onMouseLeave = () => { pauseRef.current = false }
  const onTouchStart = useCallback((e) => { pauseRef.current = true; touchRef.current = { active: true, lastX: e.touches[0].clientX } }, [])
  const onTouchMove  = useCallback((e) => {
    if (!touchRef.current.active) return
    e.preventDefault()
    const dx = e.touches[0].clientX - touchRef.current.lastX
    touchRef.current.lastX = e.touches[0].clientX
    posRef.current = (posRef.current || 0) + dx
    if (trackRef.current) trackRef.current.style.transform = `translateX(${posRef.current}px)`
  }, [])
  const onTouchEnd = useCallback(() => { touchRef.current.active = false; pauseRef.current = false }, [])

  return (
    <div className="overflow-hidden" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={{ touchAction: 'pan-y' }}>
      <div ref={trackRef} className="flex" style={{ gap: 20, willChange: 'transform' }}>
        {repeated.map((t, i) => <Card key={i} t={t} />)}
      </div>
    </div>
  )
}

/* ══════════════════════
   MAIN SECTION
══════════════════════ */
export default function Testimonials() {
  const [textCards, setTextCards] = useState(STATIC_BASE)

  useEffect(() => {
    getTestimonials()
      .then(data => { if (data.length >= 1) setTextCards(data) })
      .catch(() => {})
  }, [])

  return (
    <section id="testimonials" aria-label="Client testimonials" className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,rgba(10,15,35,1) 0%,rgba(3,7,18,1) 100%)', paddingTop: 'clamp(4rem,10vw,8rem)', paddingBottom: 'clamp(4rem,10vw,8rem)' }}>

      <GlowOrb color="purple" size={600} top="50%" left="50%" opacity={0.05} />

      <div className="relative z-10">

        {/* ── Title ── */}
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center site-container" style={{ marginBottom: '48px' }}>
          <p className="font-cinzel text-[10px] tracking-[0.35em] text-yellow-400/50 uppercase mb-4">
            ॐ · अनुभव · Client Stories
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-3">
            Lives <span className="text-gradient-gold">Transformed</span>
          </h2>
          <p className="font-poppins text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Real people. Real results. Verified across 50+ countries.
          </p>
        </motion.div>

        {/* ── 3D Coverflow of WhatsApp screenshots ── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <p className="text-center font-poppins text-[10px] text-white/25 mb-2 tracking-widest uppercase">
            <ShieldCheck size={10} className="inline mr-1.5 text-green-400 relative -top-px" />
            Actual client messages · numbers hidden for privacy · Hover to pause
          </p>
          <CoverflowCarousel />
        </motion.div>

        {/* ── Text review marquee ── */}
        <div className="flex flex-col" style={{ gap: 20 }}>
          <MarqueeRow items={textCards} reverse={false} speed={0.45} />
          <MarqueeRow items={textCards} reverse={true}  speed={0.45} />
        </div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: 'linear-gradient(90deg,rgba(10,15,35,1) 0%,transparent 100%)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: 'linear-gradient(-90deg,rgba(10,15,35,1) 0%,transparent 100%)' }} />

        <p className="text-center font-poppins text-[10px] text-white/20 tracking-widest uppercase mt-8">
          Hover to pause · Touch &amp; drag to scroll
        </p>
      </div>
    </section>
  )
}
