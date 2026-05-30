import { useState, useEffect, useCallback } from 'react'
import AdminLayout from './AdminLayout'
import OverviewSection      from './sections/OverviewSection'
import LeadsSection         from './sections/LeadsSection'
import ChatbotLeadsSection  from './sections/ChatbotLeadsSection'
import ServicesSection      from './sections/ServicesSection'
import TestimonialsSection  from './sections/TestimonialsSection'
import SettingsSection      from './sections/SettingsSection'
import { getLeads, getChatbotLeads } from '../../firebase/firestore'

const SECTION_META = {
  overview:       { title: 'Overview',           subtitle: 'Dashboard summary' },
  leads:          { title: 'Lead Management',    subtitle: 'View, search, and update leads' },
  'chatbot-leads':{ title: 'Chatbot Leads',      subtitle: 'JyotiMitra spiritual assistant leads' },
  services:       { title: 'Services',           subtitle: 'Manage your service offerings' },
  testimonials:   { title: 'Testimonials',       subtitle: 'Manage client reviews' },
  settings:       { title: 'Settings',           subtitle: 'Configure website details' },
}

export default function AdminDashboard() {
  const [section,       setSection]       = useState('overview')
  const [leads,         setLeads]         = useState([])
  const [chatbotLeads,  setChatbotLeads]  = useState([])
  const [loading,       setLoading]       = useState(true)
  const [refreshing,    setRefreshing]    = useState(false)

  const fetchLeads = useCallback(async () => {
    setRefreshing(true)
    try { setLeads(await getLeads()) } catch {}
    setRefreshing(false)
    setLoading(false)
  }, [])

  const fetchChatbotLeads = useCallback(async () => {
    setRefreshing(true)
    try { setChatbotLeads(await getChatbotLeads()) } catch {}
    setRefreshing(false)
  }, [])

  const fetchAll = useCallback(async () => {
    setRefreshing(true)
    try {
      const [l, c] = await Promise.all([getLeads(), getChatbotLeads()])
      setLeads(l)
      setChatbotLeads(c)
    } catch {}
    setRefreshing(false)
    setLoading(false)
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const meta = SECTION_META[section] || SECTION_META.overview
  const needsLeadRefresh = section === 'overview' || section === 'leads'
  const needsChatbotRefresh = section === 'chatbot-leads'

  const handleRefresh = needsLeadRefresh ? fetchLeads : needsChatbotRefresh ? fetchChatbotLeads : undefined

  return (
    <AdminLayout
      active={section}
      onNavigate={setSection}
      title={meta.title}
      subtitle={meta.subtitle}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    >
      {loading && (needsLeadRefresh || needsChatbotRefresh) ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {section === 'overview'      && <OverviewSection leads={leads} />}
          {section === 'leads'         && <LeadsSection leads={leads} onLeadsChange={setLeads} />}
          {section === 'chatbot-leads' && <ChatbotLeadsSection leads={chatbotLeads} onLeadsChange={setChatbotLeads} />}
          {section === 'services'      && <ServicesSection />}
          {section === 'testimonials'  && <TestimonialsSection />}
          {section === 'settings'      && <SettingsSection />}
        </>
      )}
    </AdminLayout>
  )
}
