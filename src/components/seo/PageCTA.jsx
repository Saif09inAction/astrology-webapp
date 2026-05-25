import Button from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { useApp } from '../../context/AppContext'
import { onWhatsAppClick } from '../../analytics/meta'

export default function PageCTA({ headline = 'Ready for Your Free Consultation?', subline = 'Confidential · 24/7 · Pay After Results' }) {
  const { settings, openModal } = useApp()
  const { panditName, whatsappBase } = settings
  const wa = `${whatsappBase}?text=${encodeURIComponent(`Hello ${panditName} Ji, I need your consultation.`)}`

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
      <div className="site-container relative z-10 text-center max-w-2xl mx-auto">
        <p className="font-cinzel text-[10px] tracking-[0.35em] text-gold-400/50 uppercase mb-4">ॐ · Begin Your Journey</p>
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-4">{headline}</h2>
        <p className="font-poppins text-white/40 text-sm mb-8">{subline}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button as="a" variant="primary" href={wa} target="_blank" rel="noopener noreferrer"
            onClick={onWhatsAppClick('page_cta')} icon={<WhatsAppIcon size={16} />}>
            Free WhatsApp Consultation
          </Button>
          <Button variant="secondary" onClick={() => openModal('page_cta')}>Book Call Back</Button>
        </div>
      </div>
    </section>
  )
}
