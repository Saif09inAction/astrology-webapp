import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'

const base = [
  {
    name: 'Priya Sharma',  location: 'Delhi',     service: 'Love Problem',    rating: 5,
    text: 'My partner came back within 3 weeks. I owe everything to Pandit Ji — his remedies truly work.',
    color: '#f472b6', avatar: 'PS',
  },
  {
    name: 'Rahul Verma',   location: 'Mumbai',    service: 'Career Guidance', rating: 5,
    text: 'Stuck for 7 years in the same job. After consulting, I got a promotion and a better offer within 2 months.',
    color: '#60a5fa', avatar: 'RV',
  },
  {
    name: 'Anita Patel',   location: 'Ahmedabad', service: 'Kundli Matching', rating: 5,
    text: 'Both families were against our marriage. Pandit Ji resolved every dosha and we had a beautiful wedding.',
    color: '#fbbf24', avatar: 'AP',
  },
]

// Two rows — row2 starts offset so they look different
const row1 = [...base, ...base, ...base, ...base]
const row2 = [...base.slice(1), ...base.slice(0,1), ...base.slice(1), ...base.slice(0,1), ...base.slice(1), ...base.slice(0,1), ...base.slice(1), ...base.slice(0,1)]

const CARD_W = 340
const GAP    = 24    // px — gap between cards
const SHIFT  = base.length * (CARD_W + GAP)  // move by exactly one base set

function Card({ t }) {
  return (
    <div
      className="testimonial-card relative rounded-2xl p-5 flex flex-col shrink-0"
      style={{ width: CARD_W, background: 'rgba(255,255,255,0.03)', border: `1px solid ${t.color}28` }}
    >
      <div className="absolute top-0 left-6 right-6 h-px rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${t.color}60, transparent)` }} />

      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={13} fill="#f59e0b" className="text-gold-400" />
        ))}
      </div>

      <p className="font-poppins text-[13px] text-white/65 leading-relaxed italic flex-1 mb-5">
        "{t.text}"
      </p>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-cinzel text-[11px] font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${t.color}90, ${t.color}30)`, border: `1px solid ${t.color}40` }}
        >
          {t.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-cinzel text-[13px] font-bold text-white">{t.name}</p>
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

export default function Testimonials() {
  const [paused, setPaused] = useState(false)

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(10,15,35,1) 0%, rgba(3,7,18,1) 100%)',
        paddingTop: 'clamp(4rem,10vw,8rem)',
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
          className="text-center site-container" style={{ marginBottom: '40px' }}
        >
          <p className="font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-4">
            ॐ · अनुभव · Client Stories
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-3">
            Lives <span className="text-gradient-gold">Transformed</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
            Real people. Real results. Verified across 50+ countries.
          </p>
        </motion.div>

        {/* Marquee — two rows */}
        <div
          className="overflow-hidden"
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Row 1 — scrolls left */}
          <div
            className="flex"
            style={{
              gap: GAP,
              animation: 'marquee-left 20s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {row1.map((t, i) => <Card key={i} t={t} />)}
          </div>

          {/* Row 2 — scrolls right */}
          <div
            className="flex"
            style={{
              gap: GAP,
              animation: 'marquee-right 20s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {row2.map((t, i) => <Card key={i} t={t} />)}
          </div>
        </div>

        {/* Left + right edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: 'linear-gradient(90deg, rgba(10,15,35,1) 0%, transparent 100%)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: 'linear-gradient(-90deg, rgba(10,15,35,1) 0%, transparent 100%)' }} />

        <p className="text-center font-poppins text-[10px] text-white/20 tracking-widest uppercase mt-8">
          Hover to pause
        </p>
      </div>
      <style>{`
        @media (max-width: 639px) {
          .testimonial-card { width: min(80vw, 280px) !important; padding: 18px 16px !important; }
        }
      `}</style>
    </section>
  )
}
