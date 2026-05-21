import { motion } from 'framer-motion'
import { Star, Shield, Heart, Eye, Clock3, Globe2 } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { useApp } from '../../context/AppContext'
import { onWhatsAppClick } from '../../analytics/meta'

const expertise = [
  { icon: Star,   label: 'Vedic Jyotish & Kundli Reading' },
  { icon: Heart,  label: 'Love, Marriage & Relationships' },
  { icon: Shield, label: 'Black Magic Protection' },
  { icon: Eye,    label: '100% Confidential Sessions' },
  { icon: Clock3, label: 'Available 7 Days a Week' },
  { icon: Globe2, label: '50+ Countries Served' },
]

const stats = [
  { value: '15+',   label: 'Years' },
  { value: '5K+',   label: 'Clients' },
  { value: '98%',   label: 'Success' },
]

export default function About() {
  const { settings } = useApp()
  const { panditName, whatsappBase } = settings
  const WHATSAPP_CONSULT = `${whatsappBase}?text=${encodeURIComponent(`Hello ${panditName} Ji, I need your consultation.`)}`
  return (
    <section id="about" aria-label="About Dheeraj Shastri Ji – Love back & relationship astrologer" className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(3,7,18,1) 0%, rgba(10,15,35,1) 100%)' }}
    >
      <GlowOrb color="gold"   size={500} top="40%" left="0%"   opacity={0.06} />
      <GlowOrb color="purple" size={400} top="20%" left="100%" opacity={0.07} />

      <div className="site-container relative z-10">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-4"
        >
          ॐ · परिचय · Who I Am
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-cinzel text-3xl md:text-4xl font-bold text-white"
          style={{ marginBottom: 'clamp(24px,5vw,56px)' }}
        >
          Ancient Wisdom,{' '}
          <span className="text-gradient-gold">Modern Clarity</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] items-stretch" style={{ gap: 'clamp(20px,4vw,40px)' }}>

          {/* ── LEFT: Image column ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Image frame */}
            <div
              className="relative rounded-3xl overflow-hidden h-full min-h-[320px] md:min-h-[480px]"
              style={{ border: '1px solid rgba(245,158,11,0.15)' }}
            >
              <img
                src="/pandit2.jpeg"
                alt={`${panditName} – Best love back astrologer & relationship problem specialist, 15+ years experience`}
                loading="lazy"
                decoding="async"
                width="420"
                height="560"
                className="w-full h-full object-cover object-center"
              style={{ minHeight: 'clamp(260px,60vw,480px)' }}
              />

              {/* Bottom gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.85) 0%, rgba(3,7,18,0.1) 45%, transparent 100%)' }}
              />

              {/* Name badge at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-cinzel text-lg font-bold text-white">{panditName}</p>
                <p className="font-poppins text-[11px] tracking-[0.2em] text-gold-400/70 uppercase mt-0.5">
                  Vedic Astrologer · 15+ Yrs Experience
                </p>
              </div>

              {/* Top-right experience badge */}
              <div
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(3,7,18,0.7)', border: '1px solid rgba(245,158,11,0.25)', backdropFilter: 'blur(8px)' }}
              >
                <p className="font-cinzel text-[11px] text-gold-400 tracking-wider">Est. 2009</p>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Content column ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-5 justify-center"
          >
            {/* Headline + description */}
            <div>
              <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-3 leading-snug">
                Guiding Souls Through <br />
                <span className="text-gradient-gold">Life's Greatest Challenges</span>
              </h3>
              <p className="font-poppins text-white/55 text-sm leading-relaxed max-w-md">
                Born into a lineage of Vedic scholars, {panditName} has spent 15+ years transforming lives
                across 50+ countries — through love, marriage, career, and spiritual guidance.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-3">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex-1 text-center py-4 rounded-2xl"
                  style={{
                    background: 'rgba(245,158,11,0.05)',
                    border: '1px solid rgba(245,158,11,0.15)',
                  }}
                >
                  <p className="font-cinzel text-2xl font-bold text-gradient-gold">{value}</p>
                  <p className="font-poppins text-[11px] text-white/45 mt-1 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>

            {/* Expertise pills */}
            <div className="grid grid-cols-2 gap-2">
              {expertise.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <Icon size={13} className="text-gold-400 shrink-0" />
                  <span className="font-poppins text-[12px] text-white/60">{label}</span>
                </motion.div>
              ))}
            </div>

            {/* Guarantee callout */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="relative rounded-2xl p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(245,158,11,0.07) 0%, rgba(139,92,246,0.05) 100%)',
                border: '1px solid rgba(245,158,11,0.22)',
              }}
            >
              <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-gold-400"
                style={{ boxShadow: '0 0 6px rgba(245,158,11,0.9)' }} />
              <p className="font-cinzel text-[9px] tracking-[0.3em] text-gold-400/50 uppercase mb-3">Our Guarantee</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { top: '24 Hrs', bottom: 'Results or refund' },
                  { top: 'Pay After', bottom: 'Work is done' },
                  { top: 'Lifetime', bottom: 'Problem fix' },
                ].map(({ top, bottom }) => (
                  <div key={top}>
                    <p className="font-cinzel text-sm font-bold text-gold-400">{top}</p>
                    <p className="font-poppins text-[10px] text-white/45 mt-0.5">{bottom}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <Button
              as="a"
              variant="primary"
              href={WHATSAPP_CONSULT}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick('about_section')}
              icon={<WhatsAppIcon size={16} />}
            >
              Book a Free Consultation
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
