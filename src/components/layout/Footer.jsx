import { Phone, Clock, MapPin } from 'lucide-react'
import Button from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { PANDIT_NAME, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_CONSULT } from '../../constants'

const quickLinks = ['About', 'Services', 'Testimonials', 'FAQ', 'Contact']
const services = ['Love Problem Solution', 'Ex Love Back', 'Marriage Consultation', 'Kundli Matching', 'Career Guidance', 'Business Problems']

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase().replace(/ /g, '-'))
      || document.getElementById(id.toLowerCase())
      || [...document.querySelectorAll('section')].find(s => s.id.toLowerCase() === id.toLowerCase())
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/6" style={{ background: '#030712' }}>
      <div className="site-container pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-gold-400/25"
              style={{ background: 'rgba(245,158,11,0.08)' }}>
              <span className="font-cinzel text-gold-400 text-xs font-bold">ॐ</span>
            </div>
            <div>
              <p className="font-cinzel text-[13px] font-bold text-white">{PANDIT_NAME}</p>
              <p className="font-poppins text-[9px] tracking-[0.2em] text-gold-400/60 uppercase">Vedic Astrology</p>
            </div>
          </div>
          <p className="font-poppins text-xs text-white/35 leading-relaxed mb-5">
            Trusted Vedic astrologer with 15+ years of experience. Helping thousands find clarity, love, and purpose through ancient cosmic wisdom.
          </p>
          <p className="font-poppins text-[11px] text-gold-400/70 font-medium">
            Pay After Work Done · Results in 24 Hours
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-cinzel text-[11px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-5">Navigation</h4>
          <ul className="space-y-3">
            {quickLinks.map(l => (
              <li key={l}>
                <button
                  onClick={() => scrollTo(l)}
                  className="font-poppins text-[13px] text-white/40 hover:text-gold-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/15" />
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-cinzel text-[11px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-5">Services</h4>
          <ul className="space-y-3">
            {services.map(s => (
              <li key={s} className="font-poppins text-[13px] text-white/40 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-purple-400/30" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-cinzel text-[11px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-5">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Phone size={13} className="text-gold-400 mt-0.5 shrink-0" />
              <div>
                <a href={PHONE_TEL} className="font-poppins text-[13px] text-white/70 hover:text-white transition-colors">{PHONE_DISPLAY}</a>
                <p className="font-poppins text-[11px] text-white/30 mt-0.5">Call or WhatsApp</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={13} className="text-gold-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-poppins text-[13px] text-white/70">24 × 7 Available</p>
                <p className="font-poppins text-[11px] text-white/30 mt-0.5">Monday – Sunday</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={13} className="text-gold-400 mt-0.5 shrink-0" />
              <p className="font-poppins text-[13px] text-white/70">India · Online Worldwide</p>
            </li>
          </ul>

          <Button
            as="a"
            variant="primary"
            href={WHATSAPP_CONSULT}
            target="_blank"
            rel="noopener noreferrer"
            icon={<WhatsAppIcon size={15} />}
            className="mt-5 !text-[13px] !py-2.5 !px-5"
          >
            Free Consultation
          </Button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-4">
        <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-poppins text-[11px] text-white/20">© {new Date().getFullYear()} {PANDIT_NAME} · All rights reserved</p>
          <p className="font-poppins text-[11px] text-white/15">For guidance purposes only · Results may vary</p>
        </div>
      </div>
    </footer>
  )
}
