import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Star, ShieldCheck } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import { getTestimonials } from '../../firebase/firestore'

const STATIC_BASE = [
  { name: 'Priya Sharma',  location: 'Delhi',     service: 'Love Problem',    rating: 5, text: 'My partner came back within 3 weeks. I owe everything to Pandit Ji — his remedies truly work.', color: '#f472b6', avatar: 'PS' },
  { name: 'Rahul Verma',   location: 'Mumbai',    service: 'Career Guidance', rating: 5, text: 'Stuck for 7 years in the same job. After consulting, I got a promotion and a better offer within 2 months.', color: '#60a5fa', avatar: 'RV' },
  { name: 'Anita Patel',   location: 'Ahmedabad', service: 'Kundli Matching', rating: 5, text: 'Both families were against our marriage. Pandit Ji resolved every dosha and we had a beautiful wedding.', color: '#fbbf24', avatar: 'AP' },
  { name: 'Vikram Singh',  location: 'Delhi',     service: 'Ex Love Back',    rating: 5, text: 'My ex came back within a week. I am so grateful to Dheeraj Shastri Ji.', color: '#a78bfa', avatar: 'VS' },
  { name: 'Sunita Gupta',  location: 'Jaipur',    service: 'Business',        rating: 5, text: 'My business was at a loss for 2 years. After his remedies, everything turned around completely.', color: '#34d399', avatar: 'SG' },
]

/* Real WhatsApp screenshot proofs */
const SCREENSHOT_CARDS = [
  { src: '/review1.png', label: 'Marriage Success',  service: 'Vashikaran' },
  { src: '/review2.png', label: 'Ranji – Dubai',     service: 'Ex Love Back' },
  { src: '/review3.png', label: 'Relationship Help', service: 'Love Problem' },
]

const GAP = 20

function Card({ t }) {
  return (
    <div
      className="relative rounded-2xl p-5 flex flex-col shrink-0"
      style={{
        width: 'clamp(260px, 80vw, 340px)',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${t.color}28`,
      }}
    >
      <div className="absolute top-0 left-6 right-6 h-px rounded-full"
        style={{ background: `linear-gradient(90deg,transparent,${t.color}60,transparent)` }} />

      <div className="flex gap-1 mb-3">
        {Array.from({ length: t.rating || 5 }).map((_, i) => (
          <Star key={i} size={13} fill="#f59e0b" className="text-yellow-400" />
        ))}
      </div>

      <p className="font-poppins text-[13px] text-white/65 leading-relaxed italic flex-1 mb-4">
        "{t.text}"
      </p>

      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-cinzel text-[11px] font-bold text-white"
          style={{ background: `linear-gradient(135deg,${t.color}90,${t.color}30)`, border: `1px solid ${t.color}40` }}
        >
          {t.avatar || t.name?.[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-cinzel text-[13px] font-bold text-white truncate">{t.name}</p>
          <p className="font-poppins text-[10px] text-white/35">{t.location}</p>
        </div>
        <span
          className="font-poppins text-[9px] tracking-wider uppercase px-2 py-1 rounded-full shrink-0"
          style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}25` }}
        >
          {t.service}
        </span>
      </div>
    </div>
  )
}

function ScreenshotCard({ src, label, service }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden shrink-0"
      style={{
        width: 'clamp(200px, 55vw, 240px)',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(245,158,11,0.2)',
      }}
    >
      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(245,158,11,0.6),transparent)' }} />

      {/* Screenshot image */}
      <img
        src={src}
        alt={label}
        className="w-full object-cover object-top"
        style={{ maxHeight: 280, display: 'block' }}
        loading="lazy"
        draggable={false}
      />

      {/* Bottom verified badge */}
      <div className="flex items-center justify-between px-3 py-2.5"
        style={{ background: 'rgba(5,9,22,0.95)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={11} className="text-green-400 shrink-0" />
          <span className="font-poppins text-[10px] text-green-400 font-medium">Verified WhatsApp</span>
        </div>
        <span className="font-poppins text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded-full"
          style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}>
          {service}
        </span>
      </div>
    </div>
  )
}

/* ─── Infinite marquee row using RAF — supports touch drag ─── */
function MarqueeRow({ items, reverse = false, speed = 0.45 }) {
  const wrapRef  = useRef(null)
  const trackRef = useRef(null)
  const posRef   = useRef(null)
  const rafRef   = useRef(null)
  const pauseRef = useRef(false)
  const touchRef = useRef({ active: false, lastX: 0 })

  /* Duplicate items enough times to fill any viewport with overflow */
  const repeated = [...items, ...items, ...items, ...items, ...items, ...items]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    /* Wait one frame so the track has measured width */
    const init = () => {
      const unitW = track.scrollWidth / 6 // one copy width (6 duplicates)
      if (posRef.current === null) {
        posRef.current = reverse ? -unitW : 0
      }

      const tick = () => {
        if (!pauseRef.current) {
          if (reverse) {
            posRef.current += speed
            if (posRef.current >= 0) posRef.current -= unitW
          } else {
            posRef.current -= speed
            if (posRef.current <= -unitW) posRef.current += unitW
          }
          track.style.transform = `translateX(${posRef.current}px)`
        }
        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const frame = requestAnimationFrame(init)
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(rafRef.current)
    }
  }, [cards.length, reverse, speed])

  /* Desktop hover */
  const onMouseEnter = () => { pauseRef.current = true }
  const onMouseLeave = () => { pauseRef.current = false }

  /* Mobile touch — pause + drag */
  const onTouchStart = useCallback((e) => {
    pauseRef.current = true
    touchRef.current = { active: true, lastX: e.touches[0].clientX }
  }, [])

  const onTouchMove = useCallback((e) => {
    if (!touchRef.current.active) return
    e.preventDefault()
    const dx = e.touches[0].clientX - touchRef.current.lastX
    touchRef.current.lastX = e.touches[0].clientX
    posRef.current = (posRef.current || 0) + dx
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${posRef.current}px)`
    }
  }, [])

  const onTouchEnd = useCallback(() => {
    touchRef.current.active = false
    pauseRef.current = false
  }, [])

  return (
    <div
      ref={wrapRef}
      className="overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{ gap: GAP, willChange: 'transform' }}
      >
        {repeated.map((item, i) =>
          item.type === 'screenshot'
            ? <ScreenshotCard key={i} {...item.data} />
            : <Card key={i} t={item.data} />
        )}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [textCards, setTextCards] = useState(STATIC_BASE)

  useEffect(() => {
    getTestimonials()
      .then(data => { if (data.length >= 1) setTextCards(data) })
      .catch(() => {})
  }, [])

  /* Build mixed items: interleave screenshot cards between text cards */
  const row1Items = [
    ...textCards.slice(0, 2).map(t => ({ type: 'text', data: t })),
    { type: 'screenshot', data: SCREENSHOT_CARDS[0] },
    ...textCards.slice(2).map(t => ({ type: 'text', data: t })),
    { type: 'screenshot', data: SCREENSHOT_CARDS[1] },
  ]
  const row2Items = [
    { type: 'screenshot', data: SCREENSHOT_CARDS[2] },
    ...textCards.map(t => ({ type: 'text', data: t })),
  ]

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg,rgba(10,15,35,1) 0%,rgba(3,7,18,1) 100%)',
        paddingTop:    'clamp(4rem,10vw,8rem)',
        paddingBottom: 'clamp(4rem,10vw,8rem)',
      }}
    >
      <GlowOrb color="purple" size={600} top="50%" left="50%" opacity={0.05} />

      <div className="relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center site-container"
          style={{ marginBottom: '40px' }}
        >
          <p className="font-cinzel text-[10px] tracking-[0.35em] text-yellow-400/50 uppercase mb-4">
            ॐ · अनुभव · Client Stories
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-3">
            Lives <span className="text-gradient-gold">Transformed</span>
          </h2>
          <p className="font-poppins text-sm text-center" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Real people. Real results. Verified across 50+ countries.
          </p>
        </motion.div>

        {/* Two marquee rows */}
        <div className="flex flex-col" style={{ gap: 20 }}>
          <MarqueeRow items={row1Items} reverse={false} speed={0.45} />
          <MarqueeRow items={row2Items} reverse={true}  speed={0.45} />
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
