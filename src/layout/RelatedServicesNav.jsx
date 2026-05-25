import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GlowOrb from '../components/ui/GlowOrb'

export default function RelatedServicesNav({ links = [], title = 'Related Guidance' }) {
  if (!links.length) return null

  return (
    <section className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(10,15,35,1) 0%, rgba(3,7,18,1) 100%)' }}>
      <GlowOrb color="purple" size={350} top="50%" left="50%" opacity={0.04} />
      <div className="site-container relative z-10">
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-4">
          ॐ · Explore More
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center font-cinzel text-2xl md:text-3xl font-bold text-white mb-10">
          {title}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link, i) => (
            <motion.div key={link.path} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={link.path}
                className="group block rounded-2xl p-5 h-full transition-all duration-300 hover:scale-[1.02]"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="font-cinzel text-[15px] font-bold text-white/85 group-hover:text-gold-400 transition-colors leading-snug">
                  {link.label}
                </p>
                <div className="h-px w-8 mt-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(245,158,11,0.4)' }} />
                <span className="font-poppins text-[11px] text-white/30 group-hover:text-gold-400/70 transition-colors">
                  Learn more →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
