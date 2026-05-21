import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Home, Info, Sparkles, Star, HelpCircle, Phone as PhoneIcon } from 'lucide-react'
import Button from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { useApp } from '../../context/AppContext'
import { onWhatsAppClick, onContactClick } from '../../analytics/meta'

const navLinks = [
  { label: 'Home',         href: '#hero',         icon: Home },
  { label: 'About',        href: '#about',        icon: Info },
  { label: 'Services',     href: '#services',     icon: Sparkles },
  { label: 'Testimonials', href: '#testimonials', icon: Star },
  { label: 'FAQ',          href: '#faq',          icon: HelpCircle },
  { label: 'Contact',      href: '#contact',      icon: PhoneIcon },
]

export default function Navbar() {
  const { settings, openModal } = useApp()
  const { panditName, phoneDisplay, phoneTel, whatsappBase } = settings
  const waConsult = `${whatsappBase}?text=${encodeURIComponent(`Hello ${panditName} Ji, I need your consultation.`)}`

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (href) => {
    setOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: (scrolled || open) ? 'rgba(3,7,18,0.97)' : 'transparent',
          backdropFilter: (scrolled || open) ? 'blur(20px)' : 'none',
          borderBottom: (scrolled || open) ? '1px solid rgba(255,255,255,0.06)' : 'none',
          boxShadow: (scrolled || open) ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div
          className="relative w-full flex items-center h-[64px] md:h-[90px]"
          style={{ paddingLeft: 'clamp(1rem,3vw,2rem)', paddingRight: 'clamp(1rem,3vw,2rem)' }}
        >
          {/* Logo */}
          <button onClick={() => scrollTo('#hero')} className="flex items-center gap-2 md:gap-3 group shrink-0 z-10">
            <div
              className="w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center border border-gold-400/30 transition-all duration-300 group-hover:border-gold-400/60"
              style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.12) 0%,rgba(245,158,11,0.04) 100%)', boxShadow: '0 0 20px rgba(245,158,11,0.1)' }}
            >
              <span className="font-cinzel text-gold-400 text-base md:text-xl font-bold">ॐ</span>
            </div>
            <div className="leading-none">
              <p className="font-cinzel text-[15px] md:text-[20px] font-bold text-white">{panditName}</p>
              <p className="font-poppins text-[10px] md:text-[13px] tracking-[0.22em] text-gold-400/60 uppercase mt-1">Vedic Astrology</p>
            </div>
          </button>

          {/* Desktop nav — centred */}
          <nav className="hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="font-poppins text-[14px] text-white/55 hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400/60 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 z-10">
            <Button as="a" variant="ghost" nav href={phoneTel} onClick={onContactClick('navbar_call_desktop')}>Call Now</Button>
            <Button as="a" variant="primary" nav href={waConsult} target="_blank" rel="noopener noreferrer" onClick={onWhatsAppClick('navbar_whatsapp_desktop')}>
              Free Consultation
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 z-10"
            style={{
              background: open ? 'rgba(245,158,11,0.18)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${open ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.1)'}`,
              color: open ? '#fbbf24' : 'rgba(255,255,255,0.8)',
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="lg:hidden fixed inset-0 z-40 flex flex-col"
          style={{
            top: 64,
            background: 'linear-gradient(180deg, rgba(3,7,18,0.99) 0%, rgba(8,12,30,0.99) 100%)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
          }}
        >
          {/* Top gold accent line */}
          <div style={{ height: 1.5, background: 'linear-gradient(90deg,transparent,rgba(245,158,11,0.7),transparent)' }} />

          {/* Ambient glow decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ width: 300, height: 200, background: 'radial-gradient(ellipse at 50% 0%, rgba(109,40,217,0.12) 0%, transparent 70%)', }} />

          <div className="flex flex-col flex-1 overflow-y-auto px-5 pt-6 pb-8 relative z-10">

            {/* OM header decoration */}
            <div className="flex items-center justify-center mb-6">
              <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.05)' }} />
              <span className="font-cinzel text-2xl mx-4" style={{ color: 'rgba(245,158,11,0.4)' }}>ॐ</span>
              <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.05)' }} />
            </div>

            {/* Nav links with stagger */}
            <nav className="flex flex-col gap-2 mb-8" aria-label="Mobile navigation">
              {navLinks.map(({ label, href, icon: Icon }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                  onClick={() => scrollTo(href)}
                  className="flex items-center gap-4 w-full text-left px-4 py-3.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                  onTouchStart={e => e.currentTarget.style.background = 'rgba(245,158,11,0.08)'}
                  onTouchEnd={e => setTimeout(() => { e.currentTarget.style.background = 'rgba(255,255,255,0.025)' }, 200)}
                >
                  {/* Icon box */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: i % 2 === 0 ? 'rgba(245,158,11,0.1)' : 'rgba(139,92,246,0.1)',
                      border: `1px solid ${i % 2 === 0 ? 'rgba(245,158,11,0.2)' : 'rgba(139,92,246,0.2)'}`,
                    }}
                  >
                    <Icon size={15} style={{ color: i % 2 === 0 ? '#fbbf24' : '#a78bfa' }} />
                  </div>
                  <span className="font-poppins text-[15px] font-medium text-white/80 flex-1">{label}</span>
                  {/* Arrow */}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-20">
                    <path d="M6 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              ))}
            </nav>

            {/* Divider */}
            <div className="mb-5" style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)' }} />

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.28 }}
              className="flex flex-col gap-3"
            >
              <a
                href={waConsult}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onWhatsAppClick('navbar_whatsapp_mobile')}
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-3 font-cinzel font-bold text-[15px] py-4 rounded-2xl transition-all active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(135deg,#fcd34d 0%,#f59e0b 100%)',
                  color: '#0a0f1e',
                  boxShadow: '0 8px 32px rgba(245,158,11,0.35), 0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                <WhatsAppIcon size={19} />
                Free WhatsApp Consultation
              </a>
              <a
                href={phoneTel}
                onClick={onContactClick('navbar_call_mobile')}
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-3 font-poppins font-medium text-[14px] py-3.5 rounded-2xl transition-all active:scale-[0.97]"
                style={{
                  background: 'rgba(245,158,11,0.05)',
                  border: '1px solid rgba(245,158,11,0.2)',
                  color: '#fbbf24',
                }}
              >
                <PhoneIcon size={17} />
                {phoneDisplay}
              </a>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.38 }}
              className="mt-6 flex items-center justify-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                style={{ boxShadow: '0 0 6px rgba(52,211,153,0.9)', animation: 'pulse 2s infinite' }} />
              <p className="font-poppins text-[11px] text-white/25 tracking-wide">
                Available 24×7 · Confidential · Pay After Results
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  )
}
