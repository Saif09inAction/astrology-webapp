import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Phone, Clock, Lock } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import { WhatsAppIcon } from '../ui/Icons'
import { submitLead } from '../../firebase/firestore'
import { PANDIT_NAME, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_BASE, WHATSAPP_CONSULT } from '../../constants'

const problemTypes = [
  'Love Problem Solution', 'Ex Love Back', 'Marriage Consultation',
  'Career Guidance', 'Kundli Matching', 'Business Problems',
  'Family Disputes', 'Black Magic Protection', 'Other',
]

const promises = [
  { icon: CheckCircle, text: 'Pay only after you see results',   color: '#34d399' },
  { icon: Clock,       text: 'Response within 30 minutes',       color: '#fbbf24' },
  { icon: Lock,        text: 'Strictly confidential — always',   color: '#a78bfa' },
  { icon: CheckCircle, text: 'Personalized, not generic advice', color: '#60a5fa' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', problem: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.problem) { setError('Please fill in Name, Phone and Problem type.'); return }
    setError(''); setLoading(true)
    try { await submitLead(form) } catch {}
    setSuccess(true); setLoading(false)
    const msg = encodeURIComponent(`Hello ${PANDIT_NAME}, my name is ${form.name}. I need help with: ${form.problem}.${form.message ? ' ' + form.message : ''}`)
    setTimeout(() => window.open(`${WHATSAPP_BASE}?text=${msg}`, '_blank'), 900)
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '7px 10px',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'Poppins, sans-serif',
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  return (
    <section
      id="contact"
      aria-label="Contact Dheeraj Shastri Ji for Free Consultation"
      className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(10,15,35,1) 0%, rgba(3,7,18,1) 100%)' }}
    >
      <GlowOrb color="gold"   size={500} top="20%" left="10%" opacity={0.06} />
      <GlowOrb color="purple" size={400} top="75%" left="85%" opacity={0.06} />

      <div className="site-container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center" style={{ marginBottom: 'clamp(36px,6vw,72px)' }}
        >
          <p className="font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-4">
            ॐ · संपर्क · Begin Your Journey
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-3">
            Get Free <span className="text-gradient-gold">Consultation</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}>
            Available 24×7 · No fees until you see real results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            {/* WhatsApp card */}
            <a
              href={WHATSAPP_CONSULT}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, rgba(37,211,102,0.1) 0%, rgba(37,211,102,0.04) 100%)', border: '1px solid rgba(37,211,102,0.2)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.25)' }}>
                <WhatsAppIcon size={26} style={{ color: '#25d366' }} />
              </div>
              <div className="flex-1">
                <p className="font-cinzel text-base font-bold text-white mb-0.5">WhatsApp — Fastest Response</p>
                <p className="font-poppins text-sm text-white/45">{PHONE_DISPLAY}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/20 group-hover:text-white/50 transition-colors">
                <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="absolute top-0 left-0 right-0 h-px rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(37,211,102,0.5), transparent)' }} />
            </a>

            {/* Call card */}
            <a
              href={PHONE_TEL}
              className="group relative flex items-center gap-5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <Phone size={22} className="text-gold-400" />
              </div>
              <div className="flex-1">
                <p className="font-cinzel text-base font-bold text-white mb-0.5">Call Directly</p>
                <p className="font-poppins text-sm text-white/45">{PHONE_DISPLAY} · 24×7</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/20 group-hover:text-white/50 transition-colors">
                <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Promise card */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.12)' }}
            >
              <p className="font-cinzel text-[10px] text-gold-400/60 uppercase tracking-[0.3em]">Our Promise</p>
              {promises.map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
                    <Icon size={14} style={{ color }} />
                  </div>
                  <span className="font-poppins text-[13px] text-white/65">{text}</span>
                </div>
              ))}
            </div>

            {/* Available badge */}
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-green-400/12"
              style={{ background: 'rgba(52,211,153,0.04)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
              <p className="font-poppins text-sm text-white/50">
                <span className="text-green-400 font-medium">Available 24×7</span> · Monday to Sunday · India & International
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-24 px-8 rounded-3xl min-h-[500px]"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(245,158,11,0.15)' }}
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)' }}>
                    <CheckCircle size={34} className="text-gold-400" />
                  </motion.div>
                  <h3 className="font-cinzel text-2xl font-bold text-white mb-3">Inquiry Sent!</h3>
                  <p className="font-poppins text-sm text-white/50 leading-relaxed mb-8 max-w-xs">
                    WhatsApp is opening to connect you directly with {PANDIT_NAME}.
                  </p>
                  <button
                    onClick={() => { setSuccess(false); setForm({ name: '', phone: '', problem: '', message: '' }) }}
                    className="font-poppins text-xs text-gold-400 border border-gold-400/25 px-6 py-3 rounded-xl hover:bg-gold-400/8 transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-3xl flex flex-col gap-2.5"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', padding: '18px' }}
                >
                  <h3 className="font-cinzel text-xl font-bold text-white mb-2">Send Your Inquiry</h3>

                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-[11px] text-white/40 uppercase tracking-widest">
                      Full Name <span className="text-gold-400">*</span>
                    </label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Your name" required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-[11px] text-white/40 uppercase tracking-widest">
                      WhatsApp / Phone <span className="text-gold-400">*</span>
                    </label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX" required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  {/* Problem */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-[11px] text-white/40 uppercase tracking-widest">
                      Problem Type <span className="text-gold-400">*</span>
                    </label>
                    <select name="problem" value={form.problem} onChange={handleChange} required
                      style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: form.problem ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                      <option value="" className="bg-[#0a0f1e]">Select your concern…</option>
                      {problemTypes.map(p => <option key={p} value={p} className="bg-[#0a0f1e] text-white">{p}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-[11px] text-white/40 uppercase tracking-widest">
                      Brief Description <span className="text-white/20">(optional)</span>
                    </label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      placeholder="Describe your situation briefly…" rows={3}
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  {error && (
                    <p className="font-poppins text-xs text-red-400/80 bg-red-400/6 border border-red-400/15 rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 font-cinzel font-bold text-[14px] rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{ padding: '14px 24px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#000', boxShadow: '0 8px 30px rgba(245,158,11,0.3)' }}
                  >
                    {loading ? 'Sending…' : (
                      <>
                        <Send size={16} />
                        Send & Open WhatsApp
                      </>
                    )}
                  </button>

                  <p className="font-poppins text-[11px] text-white/20 text-center">
                    All information is kept strictly confidential. 100% private.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
