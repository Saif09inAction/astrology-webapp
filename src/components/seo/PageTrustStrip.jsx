import { motion } from 'framer-motion'
import { Clock, CreditCard, RefreshCw, Shield } from 'lucide-react'

const TRUST = [
  { icon: Clock, label: 'Results in 24 Hours', color: '#fbbf24' },
  { icon: CreditCard, label: 'Pay After Results', color: '#a78bfa' },
  { icon: RefreshCw, label: '2× Money Back', color: '#34d399' },
  { icon: Shield, label: '100% Confidential', color: '#f472b6' },
]

export default function PageTrustStrip() {
  return (
    <section className="py-10 border-y border-white/5" style={{ background: 'rgba(15,23,42,0.6)' }}>
      <div className="site-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST.map(({ icon: Icon, label, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <p className="font-cinzel text-[12px] text-white/70 font-semibold">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
