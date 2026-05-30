import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, ChevronRight } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import useSpiritGuide from '../../chatbot/useSpiritGuide'
import useDraggableFab from '../../chatbot/useDraggableFab'
import { ASSISTANT } from '../../chatbot/config'

function TypingIndicator() {
  return (
    <div className="spirit-guide-bubble spirit-guide-bubble--bot inline-flex items-center gap-2 px-5 py-4">
      {[0, 1, 2].map(i => (
        <motion.span key={i} className="w-2 h-2 rounded-full bg-gold-400/70"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </div>
  )
}

function BotMessage({ text }) {
  const lines = text.split('\n').filter(l => l.trim() !== '')
  return (
    <div className="spirit-guide-bubble spirit-guide-bubble--bot max-w-[92%]">
      <div className="flex flex-col gap-3">
        {lines.map((line, li) => (
          <p key={li} className="font-poppins text-[13.5px] leading-[1.65] text-white/88 m-0">
            {line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={i} className="text-gold-400 font-semibold">{part.slice(2, -2)}</strong>
                : part
            )}
          </p>
        ))}
      </div>
    </div>
  )
}

function UserMessage({ text }) {
  return (
    <div className="spirit-guide-bubble spirit-guide-bubble--user max-w-[88%]">
      <p className="font-poppins text-[13.5px] leading-[1.6] text-white/92 m-0">{text}</p>
    </div>
  )
}

function SacredParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
      {[...Array(12)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 3 === 0 ? '#fbbf24' : '#a78bfa',
            left: `${8 + (i * 7.5) % 85}%`,
            top: `${10 + (i * 11) % 80}%`,
            opacity: 0.35,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  )
}

export default function SpiritGuideWidget() {
  const { pathname } = useLocation()
  const chat = useSpiritGuide()
  const { pos, onPointerDown, onPointerMove, onPointerUp } = useDraggableFab()

  const {
    open, openChat, closeChat, resetChat,
    messages, typing, options, inputMode, inputValue, setInputValue,
    handleOption, handleInputSubmit,
    submitting, completed, scrollRef,
  } = chat

  useEffect(() => {
    if (!open || pathname.startsWith('/admin')) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open, pathname])

  if (pathname.startsWith('/admin')) return null

  const handleFabPointerUp = (e) => {
    if (!onPointerUp(e)) openChat()
  }

  return (
    <>
      {/* ── Draggable FAB (default: above WhatsApp, right side) ── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed z-[55] touch-none select-none flex flex-col items-center gap-2"
            style={{ left: pos.x, top: pos.y, width: 54 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 1.4 }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={handleFabPointerUp}
          >
            <span className="spirit-guide-fab-label pointer-events-none whitespace-nowrap">
              {ASSISTANT.tooltip}
            </span>
            <button
              type="button"
              title={ASSISTANT.tooltip}
              aria-label={ASSISTANT.tooltip}
              className="spirit-guide-fab group relative cursor-grab active:cursor-grabbing"
            >
              <span className="spirit-guide-fab__aura" aria-hidden="true" />
              <span className="spirit-guide-fab__ring" aria-hidden="true" />
              <span className="spirit-guide-fab__symbol font-cinzel">ॐ</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[58] md:bg-black/40 md:backdrop-blur-sm"
              onClick={closeChat}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="spirit-guide-panel fixed z-[60] flex flex-col overflow-hidden
                top-3 left-3 right-3 bottom-3 rounded-[1.35rem]
                md:top-auto md:left-auto md:bottom-6 md:right-4 md:w-[420px] md:h-[min(660px,calc(100vh-56px))] md:rounded-3xl"
              style={{
                background: 'linear-gradient(180deg, #0a0f1e 0%, #030712 100%)',
                border: '1px solid rgba(245,158,11,0.15)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.55), 0 0 60px rgba(245,158,11,0.06)',
              }}
              onClick={e => e.stopPropagation()}
            >
              <SacredParticles />

              {/* Header */}
              <div className="relative shrink-0 px-5 pt-5 pb-4 border-b border-white/6"
                style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, transparent 100%)' }}>
                <div className="flex items-center gap-3.5">
                  <div className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(139,92,246,0.08))',
                      border: '1px solid rgba(245,158,11,0.25)',
                      boxShadow: '0 0 20px rgba(245,158,11,0.15)',
                    }}>
                    <span className="font-cinzel text-gold-400 text-lg font-bold leading-none">ॐ</span>
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-[#0a0f1e]"
                      style={{ boxShadow: '0 0 8px rgba(52,211,153,0.6)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-cinzel text-[15px] font-bold text-white tracking-wide">{ASSISTANT.name}</p>
                    <p className="font-poppins text-[9px] tracking-[0.16em] text-gold-400/60 uppercase mt-1">
                      {ASSISTANT.title}
                    </p>
                  </div>
                  <button onClick={closeChat} aria-label="Close chat"
                    className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-5 right-5 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.35), transparent)' }} />
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="relative flex-1 overflow-y-auto px-4 py-4 md:px-5 md:py-5 scroll-smooth">
                <div className="flex flex-col gap-5">
                  {messages.map(msg => (
                    <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'bot' ? <BotMessage text={msg.text} /> : <UserMessage text={msg.text} />}
                    </motion.div>
                  ))}
                  {typing && <div className="flex justify-start"><TypingIndicator /></div>}
                </div>

                {options.length > 0 && !typing && !inputMode && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="spirit-guide-options mt-6 pt-5 border-t border-white/[0.06]">
                    {options.map(opt => {
                      const isPrimary = opt.type === 'consult' || opt.type === 'skip'
                      return (
                        <button key={opt.id + opt.label} type="button" onClick={() => handleOption(opt)}
                          className={`spirit-guide-option w-full ${isPrimary ? 'spirit-guide-option--gold' : ''}`}>
                          <span className="spirit-guide-option__text">{opt.label}</span>
                          <ChevronRight size={15} className="spirit-guide-option__chevron shrink-0 opacity-40" />
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </div>

              {/* Input area */}
              <div className="relative shrink-0 px-4 pb-4 pt-3 md:px-5 md:pb-5 border-t border-white/6"
                style={{ background: 'rgba(3,7,18,0.97)' }}>
                {completed ? (
                  <button type="button" onClick={resetChat}
                    className="w-full py-3.5 rounded-2xl font-poppins text-[13px] font-medium text-gold-400 transition-colors hover:bg-gold-400/5"
                    style={{ border: '1px solid rgba(245,158,11,0.25)' }}>
                    Start New Conversation
                  </button>
                ) : inputMode ? (
                  <form onSubmit={e => { e.preventDefault(); handleInputSubmit() }} className="spirit-guide-input-row">
                    <input
                      type={inputMode === 'phone' ? 'tel' : 'text'}
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      placeholder={
                        inputMode === 'name' ? 'Your full name' :
                        inputMode === 'phone' ? '+91 XXXXX XXXXX' :
                        'Briefly describe your concern…'
                      }
                      autoFocus
                      className="spirit-guide-input"
                    />
                    <button type="submit" disabled={submitting} aria-label="Send" className="spirit-guide-send">
                      <Send size={18} strokeWidth={2.2} />
                    </button>
                  </form>
                ) : (
                  <p className="text-center font-poppins text-[10px] text-white/28 tracking-wide py-2">
                    Confidential · Pay After Results · 24×7 Available
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
