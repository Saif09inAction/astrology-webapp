import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

export default function PageMiniFAQ({ faqs, title = 'Common Questions' }) {
  const [open, setOpen] = useState(0)
  if (!faqs?.length) return null

  return (
    <section className="relative section-padding overflow-hidden" aria-label="FAQ">
      <div className="site-container relative z-10 max-w-3xl mx-auto">
        <p className="font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-3 text-center">ॐ · FAQ</p>
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-white text-center mb-10">{title}</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{
                background: open === i ? 'rgba(245,158,11,0.04)' : 'rgba(255,255,255,0.025)',
                border: `1px solid ${open === i ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left p-5"
              >
                <span className="font-poppins text-[15px] font-medium" style={{ color: open === i ? '#fbbf24' : 'rgba(255,255,255,0.8)' }}>
                  {item.q}
                </span>
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: open === i ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)', color: open === i ? '#fbbf24' : 'rgba(255,255,255,0.35)' }}>
                  {open === i ? <Minus size={13} /> : <Plus size={13} />}
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                    <div className="px-5 pb-5">
                      <div className="h-px mb-4" style={{ background: 'rgba(245,158,11,0.12)' }} />
                      <p className="font-poppins text-[14px] text-white/55 leading-relaxed">{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
