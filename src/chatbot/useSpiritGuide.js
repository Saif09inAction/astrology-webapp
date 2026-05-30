import { useState, useCallback, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { submitLead, submitChatbotLead } from '../firebase/firestore'
import { useApp } from '../context/AppContext'
import { trackLeadSubmit, trackWhatsAppClick } from '../analytics/meta'
import {
  ASSISTANT,
  MAIN_CATEGORIES,
  CATEGORY_FLOWS,
  FAQ_ITEMS,
  TRUST_MESSAGE,
  LEAD_PROMPTS,
} from './config'

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

function buildLeadPayload({ name, phone, concern, categoryLabel, path, sourcePage }) {
  const pathNote = path.length ? `Chat path: ${path.join(' → ')}` : ''
  const parts = [concern?.trim(), pathNote, sourcePage ? `Page: ${sourcePage}` : ''].filter(Boolean)
  return {
    name: name.trim(),
    phone,
    service: categoryLabel || 'General Guidance',
    message: parts.join(' · '),
    source: 'jyotimitra-chatbot',
    sourcePage,
    chatPath: path,
    category: categoryLabel || 'General Guidance',
    concern: concern?.trim() || '',
  }
}

function buildWhatsAppMessage({ panditName, category, name, concern, path }) {
  const detail = path.length ? `\n\nDetails: ${path.join(' → ')}` : ''
  const extra = concern ? `\n\nConcern: ${concern}` : ''
  return `Hello ${panditName},\nI need guidance regarding ${category}.\n\nMy name is ${name}.${detail}${extra}`
}

export default function useSpiritGuide() {
  const { settings } = useApp()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [options, setOptions] = useState([])
  const [inputMode, setInputMode] = useState(null) // 'name' | 'phone' | 'concern' | null
  const [inputValue, setInputValue] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [completed, setCompleted] = useState(false)

  const stateRef = useRef({
    phase: 'welcome',
    category: null,
    categoryLabel: null,
    stepIndex: 0,
    path: [],
    name: '',
    phone: '',
    concern: '',
    faqMode: false,
  })

  const scrollRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, typing, options, inputMode, scrollToBottom])

  const addBot = useCallback((text, delay = 700) => {
    setTyping(true)
    return new Promise(resolve => {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: uid(), role: 'bot', text }])
        setTyping(false)
        resolve()
      }, delay)
    })
  }, [])

  const addUser = useCallback((text) => {
    setMessages(prev => [...prev, { id: uid(), role: 'user', text }])
    setOptions([])
  }, [])

  const showWelcome = useCallback(async () => {
    stateRef.current = {
      phase: 'welcome',
      category: null,
      categoryLabel: null,
      stepIndex: 0,
      path: [],
      name: '',
      phone: '',
      concern: '',
      faqMode: false,
    }
    setCompleted(false)
    setInputMode(null)
    setInputValue('')
    setMessages([])
    await addBot(`Welcome.\n\nI am **${ASSISTANT.name}**, ${ASSISTANT.title}.\n\nHow may I assist you today?`, 500)
    setOptions([
      ...MAIN_CATEGORIES.map(c => ({ type: 'category', id: c.id, label: c.label })),
      { type: 'faq-menu', id: 'faq', label: 'Common Questions' },
    ])
  }, [addBot])

  const startLeadCapture = useCallback(async () => {
    stateRef.current.phase = 'lead-name'
    await addBot(TRUST_MESSAGE, 600)
    await addBot(LEAD_PROMPTS.name, 500)
    setInputMode('name')
  }, [addBot])

  const askCategoryStep = useCallback(async () => {
    const s = stateRef.current
    const flow = CATEGORY_FLOWS[s.category]
    if (!flow || s.stepIndex >= flow.steps.length) {
      await startLeadCapture()
      return
    }
    const step = flow.steps[s.stepIndex]
    stateRef.current.phase = `step-${s.stepIndex}`
    await addBot(step.question, 600)
    setOptions(step.options.map(o => ({ type: 'step', id: o.id, label: o.label })))
  }, [addBot, startLeadCapture])

  const handleCategory = useCallback(async (categoryId, label) => {
    addUser(label)
    stateRef.current.category = categoryId
    stateRef.current.categoryLabel = CATEGORY_FLOWS[categoryId]?.label || label
    stateRef.current.path = [stateRef.current.categoryLabel]
    stateRef.current.stepIndex = 0
    await addBot(`I understand you seek guidance for **${stateRef.current.categoryLabel}**. Let me ask a few gentle questions.`, 700)
    await askCategoryStep()
  }, [addUser, addBot, askCategoryStep])

  const handleStep = useCallback(async (optionId, label) => {
    addUser(label)
    stateRef.current.path.push(label)
    stateRef.current.stepIndex += 1
    await askCategoryStep()
  }, [addUser, askCategoryStep])

  const showFaqMenu = useCallback(async () => {
    stateRef.current.faqMode = true
    stateRef.current.phase = 'faq'
    await addBot('Here are answers to common questions. Select one, or book a personal consultation.', 600)
    setOptions([
      ...FAQ_ITEMS.map(f => ({ type: 'faq', id: f.id, label: f.label })),
      { type: 'consult', id: 'book', label: 'Book Personal Consultation' },
    ])
  }, [addBot])

  const handleFaq = useCallback(async (faqId) => {
    const item = FAQ_ITEMS.find(f => f.id === faqId)
    if (!item) return
    addUser(item.label)
    await addBot(item.answer, 500)
    setOptions([
      { type: 'faq-menu', id: 'more-faq', label: 'Another Question' },
      { type: 'consult', id: 'book-faq', label: 'Book Consultation' },
    ])
  }, [addUser, addBot])

  const handleConsultFromFaq = useCallback(async () => {
    addUser('Book Personal Consultation')
    stateRef.current.category = 'general'
    stateRef.current.categoryLabel = 'General Guidance'
    stateRef.current.path = ['Common Questions', 'Book Consultation']
    await startLeadCapture()
  }, [addUser, startLeadCapture])

  const handleOption = useCallback(async (option) => {
    if (option.type === 'category') {
      const cat = MAIN_CATEGORIES.find(c => c.id === option.id)
      await handleCategory(option.id, option.label)
    } else if (option.type === 'step') {
      await handleStep(option.id, option.label)
    } else if (option.type === 'faq-menu') {
      addUser('Common Questions')
      await showFaqMenu()
    } else if (option.type === 'faq') {
      await handleFaq(option.id)
    } else if (option.type === 'consult') {
      await handleConsultFromFaq()
    } else if (option.type === 'skip') {
      await handleSkipConcern()
    }
  }, [handleCategory, handleStep, showFaqMenu, handleFaq, handleConsultFromFaq, addUser])

  const submitLeadToFirebase = useCallback(async () => {
    const s = stateRef.current
    setSubmitting(true)
    const payload = buildLeadPayload({
      name: s.name,
      phone: s.phone,
      concern: s.concern,
      categoryLabel: s.categoryLabel,
      path: s.path,
      sourcePage: pathname,
    })
    try {
      await Promise.all([
        submitLead(payload),
        submitChatbotLead({
          name: payload.name,
          phone: payload.phone,
          concern: payload.concern,
          category: payload.category,
          chatPath: payload.chatPath,
          sourcePage: payload.sourcePage,
          source: payload.source,
        }),
      ])
      trackLeadSubmit({
        name: payload.name,
        phone: payload.phone,
        service: payload.service,
        source: 'chatbot',
      })
    } catch (err) {
      console.error('JyotiMitra lead save failed:', err)
    }
    setSubmitting(false)
    setCompleted(true)
    stateRef.current.phase = 'complete'
    await addBot('Thank you. Pandit Ji will personally guide you.\n\nOpening WhatsApp for your private consultation…', 800)

    const msg = encodeURIComponent(buildWhatsAppMessage({
      panditName: settings.panditName,
      category: s.categoryLabel,
      name: s.name,
      concern: s.concern,
      path: s.path,
    }))
    trackWhatsAppClick({ source: 'chatbot_handoff', service: s.categoryLabel })
    setTimeout(() => {
      window.open(`${settings.whatsappBase}?text=${msg}`, '_blank', 'noopener,noreferrer')
    }, 1200)
  }, [addBot, pathname, settings])

  const handleInputSubmit = useCallback(async () => {
    const val = inputValue.trim()
    const s = stateRef.current

    if (inputMode === 'name') {
      if (val.length < 2) return
      s.name = val
      addUser(val)
      setInputValue('')
      setInputMode(null)
      stateRef.current.phase = 'lead-phone'
      await addBot(LEAD_PROMPTS.phone, 500)
      setInputMode('phone')
    } else if (inputMode === 'phone') {
      const digits = val.replace(/\D/g, '')
      if (digits.length < 10) return
      s.phone = digits.startsWith('91') ? `+${digits}` : `+91${digits}`
      addUser(s.phone)
      setInputValue('')
      setInputMode(null)
      stateRef.current.phase = 'lead-concern'
      await addBot(LEAD_PROMPTS.concern, 500)
      setInputMode('concern')
      setOptions([{ type: 'skip', id: 'skip', label: 'Skip — Connect on WhatsApp' }])
    } else if (inputMode === 'concern') {
      s.concern = val
      if (val) addUser(val)
      else addUser('Skip')
      setInputValue('')
      setInputMode(null)
      setOptions([])
      await submitLeadToFirebase()
    }
  }, [inputMode, inputValue, addUser, addBot, submitLeadToFirebase])

  const handleSkipConcern = useCallback(async () => {
    addUser('Skip')
    setInputMode(null)
    setInputValue('')
    setOptions([])
    await submitLeadToFirebase()
  }, [addUser, submitLeadToFirebase])

  const openChat = useCallback(() => {
    setOpen(true)
    if (messages.length === 0) showWelcome()
  }, [messages.length, showWelcome])

  const closeChat = useCallback(() => setOpen(false), [])

  const resetChat = useCallback(() => showWelcome(), [showWelcome])

  return {
    open,
    openChat,
    closeChat,
    resetChat,
    messages,
    typing,
    options,
    inputMode,
    inputValue,
    setInputValue,
    handleOption,
    handleInputSubmit,
    handleSkipConcern,
    submitting,
    completed,
    scrollRef,
  }
}
