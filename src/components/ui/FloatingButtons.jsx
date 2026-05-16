import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { WhatsAppIcon } from './Icons'
import { PHONE_TEL, WHATSAPP_CONSULT } from '../../constants'

const spring = { type: 'spring', stiffness: 220, damping: 18 }

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3">

      {/* WhatsApp FAB */}
      <motion.a
        href={WHATSAPP_CONSULT}
        target="_blank"
        rel="noopener noreferrer"
        title="Free WhatsApp Consultation"
        className="btn-fab btn-fab-whatsapp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...spring, delay: 1.6 }}
      >
        <WhatsAppIcon size={26} />
      </motion.a>

      {/* Call FAB */}
      <motion.a
        href={PHONE_TEL}
        title="Call Now"
        className="btn-fab btn-fab-call"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...spring, delay: 1.85 }}
      >
        <Phone size={22} color="white" />
      </motion.a>
    </div>
  )
}
