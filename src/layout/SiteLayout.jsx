import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingButtons from '../components/ui/FloatingButtons'
import LeadModal from '../components/ui/LeadModal'
import SpiritGuideWidget from '../components/chatbot/SpiritGuideWidget'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const scrollToHash = () => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      scrollToHash()
      const retry = setTimeout(scrollToHash, 300)
      return () => clearTimeout(retry)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

/** Shared shell — premium layout + smooth page transitions */
export default function SiteLayout() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollToTop />
      <div className="relative" style={{ background: '#030712' }}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <LeadModal />
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <Footer />
        <FloatingButtons />
        <SpiritGuideWidget />
      </div>
    </>
  )
}
