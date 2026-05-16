import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, CreditCard, RefreshCw, Infinity } from 'lucide-react'

const items = [
  { icon: Clock,      headline: 'Results in 24 Hours',  sub: 'See real effects within one day',       accent: '#fbbf24' },
  { icon: CreditCard, headline: 'Pay After Work Done',  sub: 'Zero risk — pay only after results',    accent: '#a78bfa' },
  { icon: RefreshCw,  headline: '2× Money Back',        sub: 'No results in 24 hrs = double refund',  accent: '#34d399' },
  { icon: Infinity,   headline: 'Lifetime Fix',         sub: 'Permanent solution, not temporary relief', accent: '#f87171' },
]

const RADIUS = 195   // px from centre to card centre
const DURATION = '14s'

export default function GuaranteeBanner() {
  const [paused, setPaused] = useState(false)

  return (
    <section className="relative py-0 overflow-hidden">
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.4) 50%, transparent 100%)' }} />

      <div className="py-16 md:py-20" style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(3,7,18,0.98) 100%)' }}>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-cinzel text-[10px] tracking-[0.35em] text-gold-400/60 uppercase mb-14"
        >
          ✦ Our Commitment to You ✦
        </motion.p>

        {/* ── Desktop: circular orbit ── */}
        <div className="hidden lg:flex justify-center">
          <div
            className="relative select-none"
            style={{ width: RADIUS * 2 + 200, height: RADIUS * 2 + 200 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Orbit ring decoration */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: RADIUS * 2,
                height: RADIUS * 2,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                border: '1px dashed rgba(245,158,11,0.12)',
              }}
            />
            {/* Subtle glow ring */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: RADIUS * 2 + 60,
                height: RADIUS * 2 + 60,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                border: '1px solid rgba(245,158,11,0.05)',
              }}
            />

            {/* Centre emblem */}
            <div
              className="absolute pointer-events-none flex items-center justify-center"
              style={{ inset: 0 }}
            >
              <div
                className="w-28 h-28 rounded-full flex flex-col items-center justify-center gap-1"
                style={{
                  background: 'radial-gradient(circle, rgba(245,158,11,0.09) 0%, transparent 70%)',
                  border: '1px solid rgba(245,158,11,0.15)',
                  boxShadow: '0 0 50px rgba(245,158,11,0.07)',
                }}
              >
                <span className="font-cinzel text-gold-400/70 text-3xl leading-none">ॐ</span>
                <span className="font-poppins text-[9px] tracking-widest text-gold-400/30 uppercase">always</span>
              </div>
            </div>

            {/* Rotating ring — holds all 4 cards */}
            <div
              className="absolute inset-0"
              style={{
                animation: `orbit-cw ${DURATION} linear infinite`,
                animationPlayState: paused ? 'paused' : 'running',
              }}
            >
              {items.map(({ icon: Icon, headline, sub, accent }, i) => {
                const angle = i * 90
                const rad   = (angle * Math.PI) / 180
                const x     =  RADIUS * Math.sin(rad)
                const y     = -RADIUS * Math.cos(rad)

                return (
                  <div
                    key={headline}
                    className="absolute"
                    style={{
                      top:  `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: 'translate(-50%, -50%)',
                      width: 175,
                    }}
                  >
                    {/* Counter-rotate so card text always faces viewer */}
                    <div
                      style={{
                        animation: `orbit-ccw ${DURATION} linear infinite`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    >
                      <div
                        className="group relative text-center px-4 py-5 rounded-xl border border-white/6 transition-all duration-300 cursor-default"
                        style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(6px)' }}
                      >
                        {/* Hover glow */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, transparent 70%)` }}
                        />
                        {/* Icon */}
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 relative z-10"
                          style={{ background: `${accent}14`, border: `1px solid ${accent}28` }}
                        >
                          <Icon size={18} style={{ color: accent }} />
                        </div>
                        <h3 className="font-cinzel text-[13px] font-bold mb-1.5 relative z-10" style={{ color: accent }}>
                          {headline}
                        </h3>
                        <p className="font-poppins text-[11px] text-white/45 leading-relaxed relative z-10">{sub}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Hover hint */}
            {paused && (
              <p className="absolute bottom-0 left-1/2 -translate-x-1/2 font-poppins text-[10px] text-white/25 tracking-widest uppercase whitespace-nowrap">
                hover to pause · move away to resume
              </p>
            )}
          </div>
        </div>

        {/* ── Mobile: simple 2×2 grid ── */}
        <div className="lg:hidden site-container grid grid-cols-2 gap-4">
          {items.map(({ icon: Icon, headline, sub, accent }) => (
            <div
              key={headline}
              className="group relative text-center px-4 py-6 rounded-xl border border-white/6"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ background: `${accent}14`, border: `1px solid ${accent}22` }}
              >
                <Icon size={18} style={{ color: accent }} />
              </div>
              <h3 className="font-cinzel text-sm font-bold mb-1.5" style={{ color: accent }}>{headline}</h3>
              <p className="font-poppins text-[11px] text-white/45 leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 50%, transparent 100%)' }} />
    </section>
  )
}
