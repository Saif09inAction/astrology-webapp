import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'
import { PANDIT_NAME, PHONE_TEL, WHATSAPP_CONSULT } from '../../constants'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/6 shadow-xl shadow-black/40'
          : 'bg-transparent'
      }`}
      style={scrolled ? { background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(20px)' } : {}}
    >
      {/* Navbar row: logo left | nav absolutely centred | CTAs right */}
      <div className="relative w-full flex items-center h-[120px] md:h-[90px]" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>

        {/* Logo — pinned to left */}
        <button onClick={() => scrollTo('#hero')} className="flex items-center gap-3 group shrink-0 z-10">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center border border-gold-400/30 transition-all duration-300 group-hover:border-gold-400/60"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.04) 100%)', boxShadow: '0 0 20px rgba(245,158,11,0.1)' }}
          >
            <span className="font-cinzel text-gold-400 text-xl font-bold">ॐ</span>
          </div>
          <div className="leading-none">
            <p className="font-cinzel text-[20px] font-bold text-white">{PANDIT_NAME}</p>
            <p className="font-poppins text-[13px] tracking-[0.22em] text-gold-400/60 uppercase mt-1.5">Vedic Astrology</p>
          </div>
        </button>

        {/* Desktop Nav — absolutely centred in the bar */}
        <nav className="hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
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

        {/* Spacer pushes CTAs to the right */}
        <div className="flex-1" />

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3 z-10">
          <Button as="a" variant="ghost" nav href={PHONE_TEL}>
            Call Now
          </Button>
          <Button
            as="a"
            variant="primary"
            nav
            href={WHATSAPP_CONSULT}
            target="_blank"
            rel="noopener noreferrer"
          >
            Free Consultation
          </Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white/70 hover:text-white p-1.5 transition-colors">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="lg:hidden border-t border-white/6 overflow-hidden"
            style={{ background: 'rgba(3,7,18,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="px-5 py-5 flex flex-col gap-3">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="font-poppins text-[15px] text-white/70 hover:text-white text-left py-1.5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex gap-2.5 mt-3 pt-3 border-t border-white/6">
                <Button as="a" variant="ghost" nav href={PHONE_TEL} className="flex-1 justify-center">
                  Call Now
                </Button>
                <Button as="a" variant="primary" nav href={WHATSAPP_CONSULT} target="_blank" rel="noopener noreferrer" className="flex-1 justify-center">
                  WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
