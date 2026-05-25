import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Home, Info, Sparkles, BookOpen, Star, HelpCircle, Phone as PhoneIcon } from 'lucide-react'
import Button from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { useApp } from '../../context/AppContext'
import { onWhatsAppClick, onContactClick } from '../../analytics/meta'
import { MAIN_NAV } from '../../seo/navigation'

const ICONS = { Home, About: Info, Services: Sparkles, Blog: BookOpen, Testimonials: Star, FAQ: HelpCircle, Contact: PhoneIcon }

export default function Navbar() {
  const { settings } = useApp()
  const { panditName, phoneDisplay, phoneTel, whatsappBase } = settings
  const waConsult = `${whatsappBase}?text=${encodeURIComponent(`Hello ${panditName} Ji, I need your consultation.`)}`

  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const handleNav = (link) => {
    setOpen(false)
    if (link.hash) {
      const hashId = link.hash.slice(1)
      const target = document.getElementById(hashId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        navigate({ pathname: location.pathname, hash: hashId }, { replace: true })
      } else {
        navigate({ pathname: link.path || '/', hash: hashId })
      }
      return
    }
    navigate(link.path)
  }

  const isLinkActive = (link) => {
    if (link.hash) {
      return location.hash === link.hash
        || (link.label === 'Contact' && location.pathname === '/contact')
    }
    if (link.label === 'Home') return isHome && (!location.hash || location.hash === '#hero')
    return location.pathname === link.path
  }

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: (scrolled || open || !isHome) ? 'rgba(3,7,18,0.97)' : 'transparent',
          backdropFilter: (scrolled || open || !isHome) ? 'blur(20px)' : 'none',
          borderBottom: (scrolled || open || !isHome) ? '1px solid rgba(255,255,255,0.06)' : 'none',
          boxShadow: (scrolled || open || !isHome) ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div
          className="relative w-full flex items-center h-[64px] md:h-[90px]"
          style={{ paddingLeft: 'clamp(1rem,3vw,2rem)', paddingRight: 'clamp(1rem,3vw,2rem)' }}
        >
          <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0 z-10">
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
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
            {MAIN_NAV.map(link => {
              const active = isLinkActive(link)
              return (
                <button
                  key={link.label}
                  onClick={() => handleNav(link)}
                  title={link.title}
                  className="font-poppins text-[14px] transition-colors duration-300 relative group"
                  style={{ color: active ? '#fff' : 'rgba(255,255,255,0.55)' }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px bg-gold-400/60 transition-all duration-300"
                    style={{ width: active ? '100%' : '0%' }}
                    />
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400/60 group-hover:w-full transition-all duration-300" />
                </button>
              )
            })}
          </nav>

          <div className="flex-1" />

          <div className="hidden lg:flex items-center gap-3 z-10">
            <Button as="a" variant="ghost" nav href={phoneTel} onClick={onContactClick('navbar_call_desktop')}>Call Now</Button>
            <Button as="a" variant="primary" nav href={waConsult} target="_blank" rel="noopener noreferrer" onClick={onWhatsAppClick('navbar_whatsapp_desktop')}>
              Free Consultation
            </Button>
          </div>

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

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="lg:hidden fixed inset-0 z-40 flex flex-col"
          style={{ top: 64, background: 'linear-gradient(180deg, rgba(3,7,18,0.99) 0%, rgba(8,12,30,0.99) 100%)', backdropFilter: 'blur(28px)' }}
        >
          <div style={{ height: 1.5, background: 'linear-gradient(90deg,transparent,rgba(245,158,11,0.7),transparent)' }} />
          <div className="flex flex-col flex-1 overflow-y-auto px-5 pt-6 pb-8 relative z-10">
            <nav className="flex flex-col gap-2 mb-8" aria-label="Mobile navigation">
              {MAIN_NAV.map((link, i) => {
                const Icon = ICONS[link.label] || Home
                return (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    onClick={() => handleNav(link)}
                    title={link.title}
                    className="flex items-center gap-4 w-full text-left px-4 py-3.5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: i % 2 === 0 ? 'rgba(245,158,11,0.1)' : 'rgba(139,92,246,0.1)', border: `1px solid ${i % 2 === 0 ? 'rgba(245,158,11,0.2)' : 'rgba(139,92,246,0.2)'}` }}>
                      <Icon size={15} style={{ color: i % 2 === 0 ? '#fbbf24' : '#a78bfa' }} />
                    </div>
                    <span className="font-poppins text-[15px] font-medium text-white/80 flex-1">{link.label}</span>
                  </motion.button>
                )
              })}
            </nav>

            <div className="flex flex-col gap-3">
              <a href={waConsult} target="_blank" rel="noopener noreferrer"
                onClick={(e) => { onWhatsAppClick('navbar_whatsapp_mobile')(e); setOpen(false) }}
                className="w-full flex items-center justify-center gap-3 font-cinzel font-bold text-[15px] py-4 rounded-2xl"
                style={{ background: 'linear-gradient(135deg,#fcd34d 0%,#f59e0b 100%)', color: '#0a0f1e', boxShadow: '0 8px 32px rgba(245,158,11,0.35)' }}>
                <WhatsAppIcon size={19} /> Free WhatsApp Consultation
              </a>
              <a href={phoneTel}
                onClick={(e) => { onContactClick('navbar_call_mobile')(e); setOpen(false) }}
                className="w-full flex items-center justify-center gap-3 font-poppins font-medium text-[14px] py-3.5 rounded-2xl"
                style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', color: '#fbbf24' }}>
                <PhoneIcon size={17} /> {phoneDisplay}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
