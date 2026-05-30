import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Phone, MessageCircle, Trash2, Sparkles } from 'lucide-react'
import { updateChatbotLeadStatus, deleteChatbotLead } from '../../../firebase/firestore'

const STATUS_META = {
  new:       { label: 'New',       color: '#60a5fa' },
  contacted: { label: 'Contacted', color: '#fbbf24' },
  converted: { label: 'Converted', color: '#34d399' },
}

function StatusBadge({ status }) {
  const m = STATUS_META[status] || STATUS_META.new
  return (
    <span className="font-poppins text-[10px] px-2.5 py-1 rounded-full"
      style={{ background: `${m.color}12`, color: m.color, border: `1px solid ${m.color}25` }}>
      {m.label}
    </span>
  )
}

function DeleteConfirm({ onConfirm, onCancel }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="w-full max-w-sm rounded-2xl p-6 text-center"
        style={{ background: '#0a0f1e', border: '1px solid rgba(239,68,68,0.25)' }}>
        <p className="font-cinzel text-base font-bold text-white mb-2">Delete Chatbot Lead?</p>
        <p className="font-poppins text-sm text-white/40 mb-6">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl font-poppins text-sm text-white/50 border border-white/10">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl font-poppins text-sm text-white bg-red-500">Delete</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ChatbotLeadsSection({ leads, onLeadsChange }) {
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState(null)

  const handleStatusChange = async (id, status) => {
    await updateChatbotLeadStatus(id, status)
    onLeadsChange(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await deleteChatbotLead(deleteId)
    onLeadsChange(prev => prev.filter(l => l.id !== deleteId))
    setDeleteId(null)
  }

  const filtered = leads.filter(l => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      l.name?.toLowerCase().includes(q) ||
      l.phone?.includes(q) ||
      l.category?.toLowerCase().includes(q) ||
      l.concern?.toLowerCase().includes(q) ||
      l.sourcePage?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 rounded-xl px-4 py-3"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
        <Sparkles size={18} className="text-gold-400 shrink-0" />
        <div>
          <p className="font-cinzel text-sm font-bold text-white">JyotiMitra Chatbot Leads</p>
          <p className="font-poppins text-[11px] text-white/40">{leads.length} total leads from spiritual guidance assistant</p>
        </div>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, phone, category, concern…"
          className="w-full pl-10 pr-4 py-3 rounded-xl font-poppins text-sm text-white outline-none"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6">
              {['Name', 'Phone', 'Category', 'Concern', 'Source', 'Date', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left font-poppins text-[10px] text-white/30 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-12 text-center font-poppins text-sm text-white/25">No chatbot leads yet</td></tr>
            ) : filtered.map(lead => {
              const ts = lead.createdAt?.toDate?.()
              const date = ts ? ts.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'
              return (
                <tr key={lead.id} className="border-b border-white/4 hover:bg-white/[0.015]">
                  <td className="px-4 py-3 font-poppins text-sm text-white">{lead.name || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-poppins text-sm text-white/60">{lead.phone || '—'}</span>
                      {lead.phone && (
                        <>
                          <a href={`tel:${lead.phone}`} className="text-white/20 hover:text-gold-400"><Phone size={11} /></a>
                          <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                            className="text-white/20 hover:text-green-400"><MessageCircle size={11} /></a>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-poppins text-xs text-purple-300 bg-purple-400/8 border border-purple-400/18 px-2 py-1 rounded-full">
                      {lead.category || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-[140px]">
                    <p className="font-poppins text-xs text-white/35 truncate">{lead.concern || '—'}</p>
                  </td>
                  <td className="px-4 py-3 font-poppins text-xs text-white/30">{lead.sourcePage || '—'}</td>
                  <td className="px-4 py-3 font-poppins text-xs text-white/30">{date}</td>
                  <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <select value={lead.status || 'new'} onChange={e => handleStatusChange(lead.id, e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 font-poppins text-xs text-white"
                        style={{ background: '#0a0f1e' }}>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                      </select>
                      <button onClick={() => setDeleteId(lead.id)} className="p-1 text-white/15 hover:text-red-400">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(lead => {
          const ts = lead.createdAt?.toDate?.()
          const date = ts ? ts.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'
          return (
            <div key={lead.id} className="rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex justify-between mb-2">
                <p className="font-poppins text-sm font-medium text-white">{lead.name}</p>
                <StatusBadge status={lead.status} />
              </div>
              <p className="font-poppins text-xs text-white/50 mb-1">{lead.phone}</p>
              <p className="font-poppins text-xs text-purple-300 mb-1">{lead.category}</p>
              {lead.concern && <p className="font-poppins text-[11px] text-white/35 mb-2">"{lead.concern}"</p>}
              <p className="font-poppins text-[10px] text-white/25 mb-3">{date} · {lead.sourcePage}</p>
              <div className="flex gap-2">
                <select value={lead.status || 'new'} onChange={e => handleStatusChange(lead.id, e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 font-poppins text-xs text-white"
                  style={{ background: '#0a0f1e' }}>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                </select>
                <button onClick={() => setDeleteId(lead.id)} className="p-2 text-white/15 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {deleteId && <DeleteConfirm onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
      </AnimatePresence>
    </div>
  )
}
