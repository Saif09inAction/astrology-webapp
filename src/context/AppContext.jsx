import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getSettings } from '../firebase/firestore'
import { PHONE_RAW, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_BASE, PANDIT_NAME } from '../constants'
import { trackWhatsAppClick } from '../analytics/meta'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // ── Modal state ──────────────────────────────────
  const [modalOpen,        setModalOpen]        = useState(false)
  const [preselectedService, setPreselectedService] = useState('')

  // ── Site settings (fetched from Firestore, fallback to constants) ──
  const [settings, setSettings] = useState({
    phoneRaw:     PHONE_RAW,
    phoneDisplay: PHONE_DISPLAY,
    phoneTel:     PHONE_TEL,
    whatsappBase: WHATSAPP_BASE,
    panditName:   PANDIT_NAME,
    hours:        '8 AM – 9 PM IST, 7 Days',
    ctaText:      'Free WhatsApp Consultation',
  })
  const [settingsLoaded, setSettingsLoaded] = useState(false)

  useEffect(() => {
    getSettings()
      .then(data => {
        if (data) {
          setSettings(prev => ({
            ...prev,
            phoneRaw:     data.phoneRaw     || prev.phoneRaw,
            phoneDisplay: data.phoneDisplay || prev.phoneDisplay,
            phoneTel:     data.phoneTel     || prev.phoneTel,
            whatsappBase: data.whatsappBase || prev.whatsappBase,
            panditName:   data.panditName   || prev.panditName,
            hours:        data.hours        || prev.hours,
            ctaText:      data.ctaText      || prev.ctaText,
          }))
        }
      })
      .catch(() => {})
      .finally(() => setSettingsLoaded(true))
  }, [])

  // ── Helpers ───────────────────────────────────────
  const openModal  = useCallback((service = '') => {
    trackWhatsAppClick({ source: 'consultation_modal', service: service || undefined })
    setPreselectedService(service)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setPreselectedService('')
  }, [])

  return (
    <AppContext.Provider value={{ modalOpen, preselectedService, openModal, closeModal, settings, settingsLoaded }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
