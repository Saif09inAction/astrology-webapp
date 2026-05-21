import { Phone, Clock, MapPin } from 'lucide-react'
import Button from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { useApp } from '../../context/AppContext'
import { onWhatsAppClick, onContactClick } from '../../analytics/meta'

const quickLinks = [
  { label: 'About', id: 'about', title: 'About love back astrologer Dheeraj Shastri Ji' },
  { label: 'Services', id: 'services', title: 'Ex love back, vashikaran & relationship astrology services' },
  { label: 'Testimonials', id: 'testimonials', title: 'Love problem solution client reviews' },
  { label: 'FAQ', id: 'faq', title: 'FAQ – ex love back, breakup help & online consultation' },
  { label: 'Contact', id: 'contact', title: 'Contact online love astrologer – free consultation' },
]
const services = [
  { name: 'Love Problem Solution', title: 'Love problem solution astrologer – get ex back' },
  { name: 'Ex Love Back', title: 'Ex love back solution specialist' },
  { name: 'Marriage Consultation', title: 'Marriage problem solution astrologer' },
  { name: 'Kundli Matching', title: 'Love marriage kundli matching' },
  { name: 'Career Guidance', title: 'Career astrology consultation' },
  { name: 'Business Problems', title: 'Business problem solution astrologer' },
]

export default function Footer() {
  const { settings, openModal } = useApp()
  const { panditName, phoneDisplay, phoneTel, whatsappBase } = settings
  const waConsult = `${whatsappBase}?text=${encodeURIComponent(`Hello ${panditName} Ji, I need your consultation.`)}`

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
              <p className="font-cinzel text-[13px] font-bold text-white">{panditName}</p>
              <p className="font-poppins text-[9px] tracking-[0.2em] text-gold-400/60 uppercase">Vedic Astrology</p>
            </div>
          </div>
          <p className="font-poppins text-xs text-white/35 leading-relaxed mb-5">
            Trusted love back astrologer &amp; vashikaran specialist with 15+ years experience. Ex love back, breakup help, marriage problems &amp; online relationship guidance across Mumbai, Delhi, Pune, Bangalore &amp; India.
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
              <li key={l.label}>
                <button
                  onClick={() => scrollTo(l.id)}
                  title={l.title}
                  className="font-poppins text-[13px] text-white/40 hover:text-gold-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/15" />
                  {l.label}
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
              <li key={s.name}>
                <button
                  onClick={() => scrollTo('services')}
                  title={s.title}
                  className="font-poppins text-[13px] text-white/40 hover:text-gold-400 transition-colors flex items-center gap-2 text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-400/30" />
                  {s.name}
                </button>
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
                <a href={phoneTel} onClick={onContactClick('footer_phone')} className="font-poppins text-[13px] text-white/70 hover:text-white transition-colors">{phoneDisplay}</a>
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
              <p className="font-poppins text-[13px] text-white/70">India · Mumbai · Delhi · Pune · Bangalore</p>
              <p className="font-poppins text-[11px] text-white/30 mt-0.5">Online consultation worldwide</p>
            </li>
          </ul>

          <Button
            as="a"
            variant="primary"
            href={waConsult}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onWhatsAppClick('footer_whatsapp')}
            icon={<WhatsAppIcon size={15} />}
            className="mt-5 !text-[13px] !py-2.5 !px-5"
          >
            Free Consultation
          </Button>
        </div>
      </div>

      {/* Bottom bar */}
      {/* Sanskrit blessing strip */}
      <div className="py-3 text-center" style={{ background: 'rgba(255,107,0,0.04)', borderTop: '1px solid rgba(255,107,0,0.1)' }}>
        <p className="font-cinzel text-[12px] tracking-widest" style={{ color: 'rgba(255,107,0,0.55)' }}>
          ॐ सर्वे भवन्तु सुखिनः · सर्वे सन्तु निरामयाः
        </p>
        <p className="font-poppins text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
          May all beings be happy · May all beings be free from illness
        </p>
      </div>

      <div className="border-t border-white/5 py-4">
        <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-poppins text-[11px] text-white/20">© {new Date().getFullYear()} {panditName} · All rights reserved</p>
          <p className="font-poppins text-[11px] text-white/15">For guidance purposes only · Results may vary</p>
        </div>
      </div>
    </footer>
  )
}
