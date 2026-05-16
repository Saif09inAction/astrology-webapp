import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Home, Info, Sparkles, Star, HelpCircle, Phone as PhoneIcon } from 'lucide-react'
import Button from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { PANDIT_NAME, PHONE_TEL, PHONE_DISPLAY, WHATSAPP_CONSULT } from '../../constants'

const navLinks = [
  { label: 'Home',         href: '#hero',         icon: Home },
  { label: 'About',        href: '#about',        icon: Info },
  { label: 'Services',     href: '#services',     icon: Sparkles },
  { label: 'Testimonials', href: '#testimonials', icon: Star },
  { label: 'FAQ',          href: '#faq',          icon: HelpCircle },
  { label: 'Contact',      href: '#contact',      icon: PhoneIcon },
]

export default function Navbar() {
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
              <p className="font-cinzel text-[15px] md:text-[20px] font-bold text-white">{PANDIT_NAME}</p>
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
            <Button as="a" variant="ghost" nav href={PHONE_TEL}>Call Now</Button>
            <Button as="a" variant="primary" nav href={WHATSAPP_CONSULT} target="_blank" rel="noopener noreferrer">
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
        <div
          className="lg:hidden fixed inset-0 z-40 flex flex-col"
          style={{
            top: 64,
            background: 'rgba(3,7,18,0.99)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Top gold accent line */}
          <div style={{ height: 2, background: 'linear-gradient(90deg,transparent,rgba(245,158,11,0.6),transparent)' }} />

          <div className="flex flex-col flex-1 overflow-y-auto px-5 pt-6 pb-8">

            {/* Nav links */}
            <nav className="flex flex-col gap-1 mb-8">
              {navLinks.map(({ label, href, icon: Icon }, i) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="flex items-center gap-4 w-full text-left px-4 py-4 rounded-2xl transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.07)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                >
                  {/* Icon box */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: i % 2 === 0 ? 'rgba(245,158,11,0.12)' : 'rgba(139,92,246,0.12)' }}
                  >
                    <Icon size={16} style={{ color: i % 2 === 0 ? '#fbbf24' : '#a78bfa' }} />
                  </div>
                  <span className="font-poppins text-[16px] font-medium text-white/80">{label}</span>
                  {/* Arrow */}
                  <svg className="ml-auto" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </nav>

            {/* Divider */}
            <div className="mb-6" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={WHATSAPP_CONSULT}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-3 font-cinzel font-bold text-[15px] py-4 rounded-2xl transition-all active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg,#fcd34d,#f59e0b)', color: '#0a0f1e', boxShadow: '0 8px 30px rgba(245,158,11,0.3)' }}
              >
                <WhatsAppIcon size={20} />
                Free WhatsApp Consultation
              </a>
              <a
                href={PHONE_TEL}
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-3 font-poppins font-medium text-[15px] py-4 rounded-2xl transition-all active:scale-[0.98]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24' }}
              >
                <PhoneIcon size={18} />
                {PHONE_DISPLAY}
              </a>
            </div>

            {/* Trust badge */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(52,211,153,0.8)', animation: 'pulse 2s infinite' }} />
              <p className="font-poppins text-[12px] text-white/30">Available 24×7 · Confidential · Pay After Results</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
