import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { WHATSAPP_FREE } from '../../constants'

const faqs = [
  {
    q: 'Is my consultation completely private?',
    a: 'Absolutely. Every consultation is held in strict confidence. Your personal details and discussions are never shared with anyone.',
  },
  {
    q: 'How does an online consultation work?',
    a: 'Reach out via WhatsApp or the contact form. Share your name, date of birth, birth time, and place. Pandit Ji will analyze your chart and connect with you via call or WhatsApp.',
  },
  {
    q: 'How long before I see results?',
    a: 'Most clients notice positive shifts within 1–4 weeks of consistently following the prescribed remedies. Pandit Ji will give you a realistic timeline during consultation.',
  },
  {
    q: 'Do I need my exact birth time?',
    a: 'Exact birth time gives the most accurate reading. However, Pandit Ji can still provide valuable guidance with an approximate time using advanced Vedic techniques.',
  },
  {
    q: 'Is there a guarantee for solutions?',
    a: 'Yes — results within 24 hours or double your money back. Pandit Ji has a 98% satisfaction rate built over 15+ years and personally follows up to ensure results.',
  },
  {
    q: 'Can I consult for a family member?',
    a: 'Yes. Provide their birth details and describe the situation. Pandit Ji will analyze and suggest appropriate remedies on their behalf.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section
      id="faq"
      className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(3,7,18,1) 0%, rgba(10,15,35,1) 100%)' }}
    >
      <GlowOrb color="gold"   size={400} top="40%" left="95%" opacity={0.06} />
      <GlowOrb color="purple" size={350} top="70%" left="5%"  opacity={0.06} />

      <div className="site-container relative z-10">

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-20 items-start">

          {/* Left — sticky header */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28 text-center lg:text-left"
          >
            <p className="font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-4">
              ✦ Common Questions ✦
            </p>
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              Everything You <br />
              <span className="text-gradient-gold">Need to Know</span>
            </h2>
            <p className="font-poppins text-white/45 text-base leading-relaxed mb-10">
              Transparent answers to help you feel completely comfortable before reaching out.
            </p>

            {/* Mini trust card */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}
            >
              <p className="font-cinzel text-gold-400 text-sm font-bold mb-1">Still have questions?</p>
              <p className="font-poppins text-white/40 text-xs mb-4 leading-relaxed">
                Chat with Pandit Ji directly — first consultation is free.
              </p>
              <Button
                as="a"
                variant="primary"
                href={WHATSAPP_FREE}
                target="_blank"
                rel="noopener noreferrer"
                icon={<WhatsAppIcon size={15} />}
              >
                Ask on WhatsApp — Free
              </Button>
            </div>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: open === i ? 'rgba(245,158,11,0.04)' : 'rgba(255,255,255,0.025)',
                  border: `1px solid ${open === i ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 text-left" style={{ padding: '15px 25px' }}
                >
                  <span
                    className="font-poppins text-[16px] font-medium transition-colors duration-300"
                    style={{ color: open === i ? '#fbbf24' : 'rgba(255,255,255,0.8)' }}
                  >
                    {item.q}
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: open === i ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
                      color: open === i ? '#fbbf24' : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {open === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 20px 15px' }}>
                        <div className="h-px mb-5" style={{ background: 'rgba(245,158,11,0.12)' }} />
                        <p className="font-poppins text-[14px] text-white/55 leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
