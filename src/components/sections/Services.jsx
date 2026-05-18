import { motion } from 'framer-motion'
import { Heart, ArrowLeftRight, Briefcase, TrendingUp, Home, Shield } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import { WHATSAPP_CONSULT } from '../../constants'

const MarriageIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="8" cy="12" r="4" /><circle cx="16" cy="12" r="4" />
  </svg>
)
const KundliIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" /><line x1="12" y1="3" x2="12" y2="21" />
    <line x1="3" y1="12" x2="21" y2="12" /><circle cx="12" cy="12" r="3" />
  </svg>
)

const services = [
  {
    Icon: Heart,
    title: 'Love Problem Solution',
    desc: 'Reunite with lost love through ancient Vedic remedies. Guaranteed results within 24 hours.',
    accent: '#f472b6',
    tag: 'Most Popular',
    featured: true,
  },
  {
    Icon: ArrowLeftRight,
    title: 'Ex Love Back',
    desc: 'Restore broken bonds and reunite permanently. Powerful spiritual remedies with real results.',
    accent: '#fb923c',
    tag: 'High Demand',
    featured: true,
  },
  {
    Icon: MarriageIcon,
    title: 'Marriage Consultation',
    desc: 'Perfect timing, compatibility & removing all obstacles.',
    accent: '#fbbf24',
  },
  {
    Icon: Briefcase,
    title: 'Career Guidance',
    desc: 'Align your career with your cosmic destiny.',
    accent: '#60a5fa',
  },
  {
    Icon: KundliIcon,
    title: 'Kundli Matching',
    desc: 'Deep birth chart analysis for a harmonious marriage.',
    accent: '#a78bfa',
  },
  {
    Icon: TrendingUp,
    title: 'Business Problems',
    desc: 'Remove planetary blocks and attract lasting prosperity.',
    accent: '#34d399',
  },
  {
    Icon: Home,
    title: 'Family Disputes',
    desc: 'Restore peace and harmony within your family.',
    accent: '#f97316',
  },
  {
    Icon: Shield,
    title: 'Black Magic Protection',
    desc: 'Neutralise negative energies and evil eye permanently.',
    accent: '#94a3b8',
  },
]

/* ── Featured card (spans 2 cols on md+) ── */
function FeaturedCard({ service, delay }) {
  const { Icon, title, desc, accent, tag } = service
  return (
    <motion.a
      href={WHATSAPP_CONSULT}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${accent}30`,
        padding: 'clamp(20px,5vw,36px) clamp(18px,4vw,32px)',
        minHeight: 'clamp(160px,40vw,220px)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 40%, ${accent}15 0%, transparent 65%)` }}
      />
      {/* Top gradient bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}40, transparent)` }}
      />

      <div>
        {/* Tag + Icon row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${accent}15`, border: `1px solid ${accent}30`, color: accent }}
          >
            <Icon size={26} />
          </div>
          {tag && (
            <span
              className="font-poppins text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full font-semibold"
              style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}
            >
              {tag}
            </span>
          )}
        </div>

        <h3 className="font-cinzel text-[20px] font-bold text-white mb-3 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="font-poppins text-[13px] text-white/45 group-hover:text-white/65 leading-relaxed transition-colors">
          {desc}
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="flex items-center gap-2 mt-6">
        <span
          className="font-poppins text-[12px] font-semibold transition-colors"
          style={{ color: accent }}
        >
          Get Help Now
        </span>
        <svg
          className="transition-transform duration-300 group-hover:translate-x-1"
          width="14" height="14" viewBox="0 0 14 14" fill="none"
        >
          <path d="M2 7h10M8 4l3 3-3 3" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.a>
  )
}

/* ── Regular card ── */
function ServiceCard({ service, delay }) {
  const { Icon, title, desc, accent } = service
  return (
    <motion.a
      href={WHATSAPP_CONSULT}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '28px 24px',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}12 0%, transparent 65%)` }}
      />
      {/* Top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${accent}12`, border: `1px solid ${accent}25`, color: accent }}
      >
        <Icon size={20} />
      </div>

      <h3 className="font-cinzel text-[14px] font-bold text-white/80 group-hover:text-white mb-2 transition-colors">
        {title}
      </h3>
      <p className="font-poppins text-[12px] text-white/35 group-hover:text-white/55 leading-relaxed transition-colors flex-1">
        {desc}
      </p>

      <div className="flex items-center gap-1.5 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="font-poppins text-[11px] font-medium" style={{ color: accent }}>Consult now</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M7 3.5L9.5 6 7 8.5" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.a>
  )
}

export default function Services() {
  const featured = services.filter(s => s.featured)
  const regular  = services.filter(s => !s.featured)

  return (
    <section
      id="services"
      aria-label="Vedic Astrology Services by Dheeraj Shastri Ji"
      className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(3,7,18,1) 0%, rgba(10,15,35,1) 100%)' }}
    >
      <GlowOrb color="purple" size={600} top="40%" left="50%" opacity={0.05} />
      <GlowOrb color="gold"   size={400} top="10%" left="80%" opacity={0.04} />

      <div className="site-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-4">
            ॐ · सेवाएं · Specializations
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white leading-tight">
            How I Can <span className="text-gradient-gold">Help You</span>
          </h2>
          <p className="font-poppins text-white/35 text-sm mt-3">
            Every problem has a cosmic root. Results guaranteed within 24 hours.
          </p>
        </motion.div>

        {/* Featured cards — 1 col on mobile, 2 col on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px', marginBottom: '16px' }}>
          {featured.map((s, i) => (
            <FeaturedCard key={s.title} service={s} delay={i * 0.1} />
          ))}
        </div>

        {/* Regular cards — 1 col on mobile (horizontal), 3 col on md+ */}
        <div className="hidden md:grid md:grid-cols-3" style={{ gap: '24px' }}>
          {regular.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={0.2 + i * 0.07} />
          ))}
        </div>

        {/* Mobile-only: horizontal list cards */}
        <div className="md:hidden flex flex-col" style={{ gap: '10px' }}>
          {regular.map(({ Icon, title, desc, accent }, i) => (
            <motion.a
              key={title}
              href={WHATSAPP_CONSULT}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-4 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${accent}20`,
                padding: '16px 18px',
              }}
            >
              {/* Accent left bar */}
              <div style={{ width: 3, height: 40, borderRadius: 2, background: accent, flexShrink: 0 }} />
              {/* Icon */}
              <div
                className="rounded-xl flex items-center justify-center shrink-0"
                style={{ width: 44, height: 44, background: `${accent}15`, border: `1px solid ${accent}30`, color: accent }}
              >
                <Icon size={20} />
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-cinzel font-bold text-white text-[13px] leading-tight">{title}</p>
                <p className="font-poppins text-[11px] text-white/40 mt-0.5 leading-snug truncate">{desc}</p>
              </div>
              {/* Arrow */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-30">
                <path d="M6 4l4 4-4 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
