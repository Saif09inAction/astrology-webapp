import { motion } from 'framer-motion'
import { Shield, Clock, Heart, Star, Zap, Lock } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { useApp } from '../../context/AppContext'
import { onWhatsAppClick } from '../../analytics/meta'

const reasons = [
  { icon: Lock,   title: '100% Confidential',     desc: 'Your secrets stay between us — always.',              accent: '#a78bfa' },
  { icon: Heart,  title: 'Personalized Guidance',  desc: 'Tailored to your birth chart, not generic advice.',   accent: '#f472b6' },
  { icon: Zap,    title: 'Fast Response',           desc: 'Connect on WhatsApp within minutes.',                accent: '#fbbf24' },
  { icon: Star,   title: '15+ Years Experience',   desc: 'Thousands of cases. Unmatched spiritual depth.',      accent: '#facc15' },
  { icon: Shield, title: 'Proven Vedic Remedies',  desc: 'Ancient scripture-backed solutions. No superstition.',accent: '#60a5fa' },
  { icon: Clock,  title: 'Available 7 Days',       desc: 'Open every day, 8 AM – 9 PM IST.',                   accent: '#34d399' },
]

const stats = [
  { value: '5000+', label: 'Consultations' },
  { value: '4.9/5', label: 'Avg Rating'    },
  { value: '15+',   label: 'Years Active'  },
  { value: '50+',   label: 'Countries'     },
]

export default function WhyChooseUs() {
  const { settings } = useApp()
  const { panditName, whatsappBase } = settings
  const WHATSAPP_CONSULT = `${whatsappBase}?text=${encodeURIComponent(`Hello ${panditName} Ji, I need your consultation.`)}`
  return (
    <section
      id="why"
      className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(10,15,35,1) 0%, rgba(3,7,18,1) 100%)' }}
    >
      <GlowOrb color="gold"   size={500} top="60%" left="80%" opacity={0.06} />
      <GlowOrb color="purple" size={400} top="20%" left="10%" opacity={0.07} />

      <div className="site-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center" style={{ marginBottom: 'clamp(36px,6vw,60px)' }}
        >
          <p className="font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-4">
            ॐ · विश्वास · Why Trust Me
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-2">
            The Difference <span className="text-gradient-gold">You'll Feel</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', textAlign: 'center', marginTop: '10px', fontFamily: 'Poppins, sans-serif' }}>
            Not just a reading — a trusted spiritual companion for life.
          </p>
        </motion.div>

        {/* Reason cards — desktop 3-col grid, hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-3 gap-8" style={{ marginBottom: '56px' }}>
          {reasons.map(({ icon: Icon, title, desc, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group relative rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}10 0%, transparent 65%)` }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}>
                <Icon size={20} style={{ color: accent }} />
              </div>
              <h3 className="font-cinzel text-[16px] font-bold text-white mb-2 relative z-10">{title}</h3>
              <p className="font-poppins text-[13px] text-white/50 leading-relaxed relative z-10">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Reason cards — mobile-only horizontal premium list */}
        <div className="md:hidden flex flex-col" style={{ gap: '10px', marginBottom: '36px' }}>
          {reasons.map(({ icon: Icon, title, desc, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-4 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${accent}18`,
                padding: '14px 16px',
              }}
            >
              {/* Left accent bar */}
              <div style={{ width: 3, height: 36, borderRadius: 2, background: accent, flexShrink: 0 }} />
              {/* Icon */}
              <div className="rounded-xl flex items-center justify-center shrink-0"
                style={{ width: 42, height: 42, background: `${accent}14`, border: `1px solid ${accent}28` }}>
                <Icon size={19} style={{ color: accent }} />
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-cinzel text-[13px] font-bold text-white leading-tight">{title}</p>
                <p className="font-poppins text-[11px] text-white/45 mt-0.5 leading-snug">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote + stats + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.07) 0%, rgba(139,92,246,0.05) 100%)',
            border: '1px solid rgba(245,158,11,0.18)',
          }}
        >
          {/* Glow center */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 60%)' }} />

          <div className="relative z-10 px-8 py-10 md:py-12 flex flex-col items-center gap-8">

            {/* Quote */}
            <div className="text-center max-w-xl">
              <p className="font-cinzel text-xl md:text-2xl font-bold text-white leading-snug">
                "My goal is simple: help you{' '}
                <span className="text-gradient-gold">find peace and move forward</span>."
              </p>
              <p className="font-poppins text-white/35 text-xs mt-3 tracking-wider">
                — {panditName}, 15+ years of transforming lives
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)' }} />

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-cinzel text-2xl md:text-3xl font-bold text-gold-400">{value}</p>
                  <p className="font-poppins text-[10px] text-white/35 uppercase tracking-widest mt-1">{label}</p>
                </div>
              ))}
            </div>

            <Button
              as="a"
              variant="primary"
              href={WHATSAPP_CONSULT}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick('why_choose_us_section')}
              icon={<WhatsAppIcon size={17} />}
            >
              Start Free Consultation
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
