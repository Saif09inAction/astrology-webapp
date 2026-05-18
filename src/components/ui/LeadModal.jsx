import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, User, ChevronDown, MessageSquare, Gift, Sparkles } from 'lucide-react'
import { submitLead } from '../../firebase/firestore'
import { useApp } from '../../context/AppContext'

const SERVICE_LIST = [
  'Love Problem Solution', 'Ex Love Back', 'Marriage Consultation',
  'Career Guidance', 'Kundli Matching', 'Business Problems',
  'Family Disputes', 'Black Magic Protection', 'Other',
]

const COUNTRY_CODES = [
  { code: '+91',  flag: '🇮🇳', label: 'India',       max: 10 },
  { code: '+1',   flag: '🇺🇸', label: 'USA',          max: 10 },
  { code: '+44',  flag: '🇬🇧', label: 'UK',           max: 10 },
  { code: '+971', flag: '🇦🇪', label: 'UAE',          max: 9  },
  { code: '+61',  flag: '🇦🇺', label: 'Australia',    max: 9  },
  { code: '+1',   flag: '🇨🇦', label: 'Canada',       max: 10 },
  { code: '+65',  flag: '🇸🇬', label: 'Singapore',    max: 8  },
  { code: '+60',  flag: '🇲🇾', label: 'Malaysia',     max: 9  },
  { code: '+92',  flag: '🇵🇰', label: 'Pakistan',     max: 10 },
  { code: '+880', flag: '🇧🇩', label: 'Bangladesh',   max: 10 },
  { code: '+94',  flag: '🇱🇰', label: 'Sri Lanka',    max: 9  },
  { code: '+49',  flag: '🇩🇪', label: 'Germany',      max: 11 },
  { code: '+33',  flag: '🇫🇷', label: 'France',       max: 9  },
  { code: '+81',  flag: '🇯🇵', label: 'Japan',        max: 10 },
  { code: '+86',  flag: '🇨🇳', label: 'China',        max: 11 },
  { code: '+7',   flag: '🇷🇺', label: 'Russia',       max: 10 },
  { code: '+55',  flag: '🇧🇷', label: 'Brazil',       max: 11 },
  { code: '+27',  flag: '🇿🇦', label: 'South Africa', max: 9  },
]

const fieldStyle = {
  base: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: 12,
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 13,
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  },
}

export default function LeadModal() {
  const { modalOpen, preselectedService, closeModal, settings } = useApp()

  const [form,        setForm]        = useState({ name: '', phone: '', service: '', message: '' })
  const [countryCode, setCountryCode] = useState('+91')
  const [loading,     setLoading]     = useState(false)
  const [success,     setSuccess]     = useState(false)
  const [error,       setError]       = useState('')

  const maxDigits = COUNTRY_CODES.find(c => c.code === countryCode)?.max ?? 15

  useEffect(() => {
    if (modalOpen) {
      setForm(p => ({ ...p, service: preselectedService || '', phone: '', name: '', message: '' }))
      setSuccess(false)
      setError('')
    }
  }, [modalOpen, preselectedService])

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') closeModal() }
    if (modalOpen) window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [modalOpen, closeModal])

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handlePhoneChange = e => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, maxDigits)
    setForm(p => ({ ...p, phone: digits }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name.trim())          { setError('Please enter your full name.');    return }
    if (form.phone.length < 6)      { setError('Please enter a valid phone number.'); return }
    if (!form.service)              { setError('Please select a service.');         return }
    setError('')
    setLoading(true)
    const fullPhone = `${countryCode}${form.phone}`
    const msg = encodeURIComponent(
      `Hello ${settings.panditName}, I need consultation regarding ${form.service}.${form.message ? ' ' + form.message : ''}`
    )
    try {
      await submitLead({
        name: form.name.trim(), phone: fullPhone,
        service: form.service, message: form.message.trim(), source: 'website-modal',
      })
      setSuccess(true)
      setLoading(false)
      setTimeout(() => {
        window.open(`${settings.whatsappBase}?text=${msg}`, '_blank')
        closeModal()
      }, 1200)
    } catch (err) {
      console.error('Firestore error:', err)
      setLoading(false)
      // Still open WhatsApp even if Firestore fails, but show a note
      setError('Could not save to database (check Firestore rules), but opening WhatsApp now…')
      setTimeout(() => {
        window.open(`${settings.whatsappBase}?text=${msg}`, '_blank')
        closeModal()
      }, 2000)
    }
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeModal}
            className="fixed inset-0 z-[200]"
            style={{ background: 'rgba(2,5,15,0.88)', backdropFilter: 'blur(14px)' }}
          />

          {/* Centered container */}
          <div
            className="fixed inset-0 z-[201] flex items-center justify-center overflow-y-auto"
            style={{ padding: '28px 20px' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 0.92,  y: 16 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              className="relative my-auto"
              style={{
                width: '100%',
                maxWidth: 380,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 0 0 1px rgba(245,158,11,0.1), 0 28px 70px rgba(0,0,0,0.75), 0 0 50px rgba(109,40,217,0.1)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Rainbow top line */}
              <div style={{ height: 3, background: 'linear-gradient(90deg, #7c3aed, #f59e0b, #ec4899)' }} />

              {/* Body */}
              <div className="relative" style={{ background: 'linear-gradient(160deg, #0c1228 0%, #050912 100%)' }}>

                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ width: 260, height: 130, background: 'radial-gradient(ellipse at 50% 0%, rgba(109,40,217,0.16) 0%, transparent 70%)' }} />

                {/* ✕ Close — fixed z-index so it's always clickable */}
                <button
                  onClick={closeModal}
                  className="absolute right-3 top-3 z-50 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  type="button"
                >
                  <X size={14} />
                </button>

                {/* Header */}
                <div className="relative z-10 pt-5 pb-3 px-5 text-center">
                  {/* Om */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{
                      background: 'radial-gradient(circle, rgba(245,158,11,0.16) 0%, rgba(245,158,11,0.03) 70%)',
                      border: '1px solid rgba(245,158,11,0.32)',
                    }}>
                    <span className="font-cinzel text-lg" style={{ color: '#fbbf24' }}>ॐ</span>
                  </div>

                  {/* FREE highlight banner */}
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0,   scale: 1    }}
                    transition={{ delay: 0.12, type: 'spring', stiffness: 320 }}
                    className="relative mx-auto mb-3 rounded-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(52,211,153,0.18) 0%, rgba(16,185,129,0.1) 100%)',
                      border: '1px solid rgba(52,211,153,0.4)',
                      boxShadow: '0 0 20px rgba(52,211,153,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
                      padding: '10px 18px',
                    }}
                  >
                    {/* shimmer sweep */}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)',
                        animation: 'shimmer 3s linear infinite',
                      }} />
                    <div className="relative flex flex-col items-center gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <span style={{ fontSize: 14 }}>🎉</span>
                        <span className="font-cinzel text-[11px] font-bold tracking-wide" style={{ color: '#34d399' }}>
                          CONGRATULATIONS!
                        </span>
                        <span style={{ fontSize: 14 }}>🎉</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Gift size={11} style={{ color: '#6ee7b7' }} />
                        <span className="font-poppins text-[12px] font-semibold" style={{ color: '#6ee7b7', letterSpacing: '0.02em' }}>
                          Your <span style={{
                            color: '#fff',
                            background: 'linear-gradient(135deg,#34d399,#059669)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 800,
                          }}>FIRST</span> Consultation is <span style={{
                            color: '#fbbf24',
                            fontWeight: 800,
                          }}>FREE</span> ✨
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <h2 className="font-cinzel text-[16px] font-bold text-white leading-snug mb-1">
                    {preselectedService || 'Book Free Consultation'}
                  </h2>
                  <p className="font-poppins text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Fill the form · Get instant WhatsApp reply
                  </p>
                </div>

                {/* Thin divider */}
                <div className="mx-5 mb-4" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

                {/* Form */}
                <div className="px-4 pb-5">
                  <AnimatePresence mode="wait">

                    {success ? (
                      <motion.div key="success"
                        initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center py-5 gap-3"
                      >
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                          className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.35)', boxShadow: '0 0 24px rgba(52,211,153,0.18)' }}
                        >
                          <CheckCircle size={28} style={{ color: '#34d399' }} />
                        </motion.div>
                        <div>
                          <p className="font-cinzel text-base font-bold text-white mb-0.5">Inquiry Received! 🙏</p>
                          <p className="font-poppins text-xs" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                            Opening WhatsApp to connect with {settings.panditName}…
                          </p>
                        </div>
                        <div className="flex gap-1.5">
                          {[0, 0.18, 0.36].map(d => (
                            <motion.div key={d} className="w-2 h-2 rounded-full" style={{ background: '#fbbf24' }}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity, delay: d }} />
                          ))}
                        </div>
                      </motion.div>

                    ) : (
                      <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-2.5">

                        {/* Name */}
                        <div className="relative">
                          <User size={12} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: 'rgba(255,255,255,0.2)' }} />
                          <input
                            name="name" value={form.name} onChange={handleChange}
                            placeholder="Your Full Name *" autoComplete="name"
                            style={{ ...fieldStyle.base, padding: '10px 12px 10px 30px' }}
                            onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.45)'}
                            onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                          />
                        </div>

                        {/* Phone row: country code + number */}
                        <div className="flex gap-2">
                          {/* Country code selector */}
                          <div className="relative shrink-0">
                            <select
                              value={countryCode}
                              onChange={e => { setCountryCode(e.target.value); setForm(p => ({ ...p, phone: '' })) }}
                              style={{
                                ...fieldStyle.base,
                                width: 'auto',
                                padding: '10px 28px 10px 10px',
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                cursor: 'pointer',
                                minWidth: 80,
                              }}
                              onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.45)'}
                              onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                            >
                              {COUNTRY_CODES.map(c => (
                                <option key={c.label} value={c.code} style={{ background: '#0c1228' }}>
                                  {c.flag} {c.code}
                                </option>
                              ))}
                            </select>
                            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                              style={{ color: 'rgba(255,255,255,0.25)' }} />
                          </div>

                          {/* Phone number */}
                          <div className="relative flex-1">
                            <input
                              name="phone" type="tel" value={form.phone}
                              onChange={handlePhoneChange}
                              placeholder={`${maxDigits}-digit number *`}
                              maxLength={maxDigits}
                              inputMode="numeric"
                              style={{ ...fieldStyle.base, padding: '10px 36px 10px 12px' }}
                              onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.45)'}
                              onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                            />
                            {/* digit counter */}
                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-poppins"
                              style={{ fontSize: 9, color: form.phone.length === maxDigits ? '#34d399' : 'rgba(255,255,255,0.2)' }}>
                              {form.phone.length}/{maxDigits}
                            </span>
                          </div>
                        </div>

                        {/* Service */}
                        <div className="relative">
                          <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: 'rgba(255,255,255,0.2)' }} />
                          <select
                            name="service" value={form.service} onChange={handleChange}
                            style={{
                              ...fieldStyle.base,
                              padding: '10px 30px 10px 12px',
                              appearance: 'none',
                              WebkitAppearance: 'none',
                              cursor: 'pointer',
                              color: form.service ? '#fff' : 'rgba(255,255,255,0.3)',
                              background: '#0c1228',
                            }}
                            onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.45)'}
                            onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                          >
                            <option value="" style={{ background: '#0c1228', color: 'rgba(255,255,255,0.3)' }}>
                              Select Your Problem *
                            </option>
                            {SERVICE_LIST.map(s => (
                              <option key={s} value={s} style={{ background: '#0c1228', color: '#fff' }}>{s}</option>
                            ))}
                          </select>
                        </div>

                        {/* Message */}
                        <div className="relative">
                          <MessageSquare size={12} className="absolute left-3 top-[11px] pointer-events-none"
                            style={{ color: 'rgba(255,255,255,0.2)' }} />
                          <textarea
                            name="message" value={form.message} onChange={handleChange}
                            placeholder="Briefly describe your situation (optional)"
                            rows={2}
                            style={{ ...fieldStyle.base, padding: '10px 12px 10px 30px', resize: 'none' }}
                            onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.45)'}
                            onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.09)'}
                          />
                        </div>

                        {/* Error */}
                        {error && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                            className="font-poppins text-xs rounded-xl px-3 py-2"
                            style={{ color: '#f87171', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)' }}>
                            {error}
                          </motion.p>
                        )}

                        {/* Submit */}
                        <button
                          type="submit" disabled={loading}
                          className="w-full flex items-center justify-center gap-2 font-cinzel font-bold rounded-xl transition-all disabled:opacity-60"
                          style={{
                            background: 'linear-gradient(135deg, #fde68a 0%, #f59e0b 55%, #d97706 100%)',
                            color: '#030712',
                            fontSize: 13,
                            padding: '12px 16px',
                            boxShadow: '0 6px 22px rgba(245,158,11,0.4)',
                          }}
                          onMouseEnter={e => !loading && (e.currentTarget.style.transform = 'scale(1.015)')}
                          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                          {loading
                            ? <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(3,7,18,0.15)', borderTopColor: '#030712' }} />
                            : <><Sparkles size={13} /> Get Free Consultation Now</>
                          }
                        </button>

                        {/* Trust strip */}
                        <div className="flex items-center justify-center gap-2.5 pt-0.5">
                          {['🔒 Confidential', '✅ Pay After Results', '⚡ Instant Reply'].map(t => (
                            <span key={t} className="font-poppins" style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{t}</span>
                          ))}
                        </div>

                      </motion.form>
                    )}

                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
