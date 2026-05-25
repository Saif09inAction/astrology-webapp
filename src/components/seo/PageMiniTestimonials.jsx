import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  { name: 'Priya S.', city: 'Mumbai', text: 'My partner came back within 3 weeks. The remedies truly work — highly recommended.', service: 'Ex Love Back' },
  { name: 'Rahul V.', city: 'Delhi', text: 'Got my ex back after months of silence. Genuine and confidential consultation.', service: 'Love Problem' },
  { name: 'Anjali M.', city: 'Pune', text: 'Marriage was saved from divorce. Peace restored within 3 weeks of following guidance.', service: 'Marriage' },
]

export default function PageMiniTestimonials() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ background: 'rgba(3,7,18,0.5)' }}>
      <div className="site-container relative z-10">
        <p className="font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-3 text-center">ॐ · Client Stories</p>
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-white text-center mb-10">Trusted by Thousands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#fbbf24" color="#fbbf24" />)}
              </div>
              <p className="font-poppins text-[13px] text-white/55 leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <p className="font-poppins text-[12px] text-white/70 font-medium">{r.name}</p>
                <span className="font-poppins text-[10px] text-gold-400/60 uppercase tracking-wider">{r.service}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
