import { motion } from 'framer-motion'
import GlowOrb from '../components/ui/GlowOrb'

/**
 * Premium content blocks — About-section layout language
 */
export default function PremiumContentSections({ sections = [] }) {
  if (!sections.length) return null

  return (
    <section className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(3,7,18,1) 0%, rgba(10,15,35,1) 100%)' }}>
      <GlowOrb color="gold" size={500} top="30%" left="0%" opacity={0.06} />
      <GlowOrb color="purple" size={400} top="60%" left="100%" opacity={0.06} />

      <div className="site-container relative z-10">
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-4">
          ॐ · Guidance · Understanding
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center font-cinzel text-3xl md:text-4xl font-bold text-white"
          style={{ marginBottom: 'clamp(32px,6vw,64px)' }}>
          Deep <span className="text-gradient-gold">Spiritual Insight</span>
        </motion.h2>

        <div className="flex flex-col" style={{ gap: 'clamp(48px,8vw,80px)' }}>
          {sections.map((sec, i) => {
            const isEven = i % 2 === 0
            const parts = sec.h2.split(' ')
            const mid = Math.ceil(parts.length / 2)
            const h2a = parts.slice(0, mid).join(' ')
            const h2b = parts.slice(mid).join(' ')

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 lg:grid-cols-2 items-center"
                style={{ gap: 'clamp(24px,5vw,48px)' }}
              >
                {/* Visual column */}
                <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="relative rounded-3xl overflow-hidden min-h-[240px] lg:min-h-[320px]"
                    style={{
                      border: '1px solid rgba(245,158,11,0.15)',
                      background: 'linear-gradient(155deg, rgba(109,40,217,0.15) 0%, rgba(5,10,24,0.95) 50%, rgba(245,158,11,0.06) 100%)',
                    }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      <span className="font-cinzel text-5xl text-gold-400/30 mb-4">ॐ</span>
                      <p className="font-cinzel text-sm text-gold-400/60 tracking-[0.25em] uppercase">{sec.h2}</p>
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)' }} />
                  </div>
                </div>

                {/* Text column */}
                <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                  <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                    {h2a}{' '}
                    {h2b && <span className="text-gradient-gold">{h2b}</span>}
                  </h3>
                  <p className="font-poppins text-white/55 text-sm leading-relaxed">{sec.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
