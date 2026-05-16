import { motion } from 'framer-motion'
import { Heart, ArrowLeftRight, Briefcase, TrendingUp, Home, Shield } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { WHATSAPP_CONSULT } from '../../constants'

const MarriageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="8" cy="12" r="4" /><circle cx="16" cy="12" r="4" />
  </svg>
)
const KundliIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" /><line x1="12" y1="3" x2="12" y2="21" />
    <line x1="3" y1="12" x2="21" y2="12" /><circle cx="12" cy="12" r="3" />
  </svg>
)

const services = [
  { Icon: Heart,       title: 'Love Problem Solution',  desc: 'Reunite with lost love through proven Vedic remedies.',        accent: '#f472b6', tag: 'Most Popular' },
  { Icon: ArrowLeftRight, title: 'Ex Love Back',        desc: 'Restore broken relationships and reunite permanently.',         accent: '#fb923c', tag: 'High Demand'   },
  { Icon: MarriageIcon,  title: 'Marriage Consultation', desc: 'Perfect timing, compatibility & removing all obstacles.',      accent: '#fbbf24'                       },
  { Icon: Briefcase,   title: 'Career Guidance',        desc: 'Align your career with your cosmic destiny.',                   accent: '#60a5fa'                       },
  { Icon: KundliIcon,  title: 'Kundli Matching',        desc: 'Deep birth chart analysis for a harmonious marriage.',         accent: '#a78bfa'                       },
  { Icon: TrendingUp,  title: 'Business Problems',      desc: 'Remove planetary blocks and attract lasting prosperity.',      accent: '#34d399'                       },
  { Icon: Home,        title: 'Family Disputes',        desc: 'Restore peace and harmony within your family.',                accent: '#f97316'                       },
  { Icon: Shield,      title: 'Black Magic Protection', desc: 'Neutralise negative energies and evil eye permanently.',       accent: '#94a3b8'                       },
]

export default function Services() {
  return (
    <section
      id="services"
      className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(3,7,18,1) 0%, rgba(10,15,35,1) 100%)' }}
    >
      <GlowOrb color="purple" size={700} top="50%" left="50%" opacity={0.04} />

      <div className="site-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-4">
            ✦ Specializations ✦
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white leading-tight text-center">
            How I Can <span className="text-gradient-gold">Help You</span>
          </h2>
          <p className="font-poppins text-white/35 text-sm text-center mt-3">
            Every problem has a cosmic root. Results guaranteed within 24 hours.
          </p>
        </motion.div>

        {/* Service list */}
        <div className="space-y-0 mt-20">
          {services.map(({ Icon, title, desc, accent, tag }, i) => (
            <motion.a
              key={title}
              href={WHATSAPP_CONSULT}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex items-center gap-4 md:gap-7 py-5 md:py-7 px-4 md:px-6 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              {/* Hover background */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(90deg, ${accent}08 0%, transparent 60%)` }}
              />

              {/* Number */}
              <span
                className="font-cinzel text-[22px] md:text-[36px] font-bold shrink-0 w-8 md:w-12 text-right leading-none transition-colors duration-300 hidden sm:block"
                style={{ color: 'rgba(255,255,255,0.06)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon box */}
              <div
                className="w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                style={{ background: `${accent}12`, border: `1px solid ${accent}25`, color: accent }}
              >
                <Icon />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1">
                  <h3 className="font-cinzel text-[13px] md:text-[16px] font-bold text-white/80 group-hover:text-white transition-colors duration-300">
                    {title}
                  </h3>
                  {tag && (
                    <span
                      className="font-poppins text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}
                    >
                      {tag}
                    </span>
                  )}
                </div>
                <p className="font-poppins text-[11px] md:text-[13px] text-white/35 group-hover:text-white/55 transition-colors duration-300 truncate">
                  {desc}
                </p>
              </div>

              {/* Arrow */}
              <div
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                style={{ background: `${accent}18`, color: accent }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M7.5 3.5L10.5 6.5l-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Left accent bar on hover */}
              <div
                className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: accent }}
              />
            </motion.a>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="font-poppins text-white/25 text-xs mb-5 tracking-wide">
            Not sure which service fits? First consultation is FREE.
          </p>
          <Button
            as="a"
            variant="primary"
            href={WHATSAPP_CONSULT}
            target="_blank"
            rel="noopener noreferrer"
            icon={<WhatsAppIcon size={17} />}
          >
            Get Free Consultation on WhatsApp
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
