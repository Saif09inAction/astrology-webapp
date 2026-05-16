import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { getLeads, updateLeadStatus, filterLeadsByStatus } from '../../firebase/firestore'
import { Users, TrendingUp, Clock, CheckCircle, Search, LogOut, RefreshCw, Star, Filter, Phone, MessageCircle } from 'lucide-react'

const STATUS_COLORS = {
  new: { bg: 'bg-blue-400/15', text: 'text-blue-400', border: 'border-blue-400/30', label: 'New' },
  contacted: { bg: 'bg-yellow-400/15', text: 'text-yellow-400', border: 'border-yellow-400/30', label: 'Contacted' },
  converted: { bg: 'bg-green-400/15', text: 'text-green-400', border: 'border-green-400/30', label: 'Converted' },
}

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.new
  return (
    <span className={`font-poppins text-xs px-2.5 py-1 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
      {s.label}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="glass border border-white/8 rounded-2xl p-5">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
        <Icon size={18} className="text-white" />
      </div>
      <p className="font-cinzel text-2xl font-bold text-white">{value}</p>
      <p className="font-poppins text-xs text-white/45 mt-1">{label}</p>
    </div>
  )
}

function LeadRow({ lead, onStatusChange }) {
  const [updating, setUpdating] = useState(false)
  const ts = lead.createdAt?.toDate?.()
  const date = ts ? ts.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
  const time = ts ? ts.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : ''

  const handleStatus = async (s) => {
    setUpdating(true)
    await onStatusChange(lead.id, s)
    setUpdating(false)
  }

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-white/5 hover:bg-white/2 transition-colors"
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400/30 to-purple-400/30 flex items-center justify-center shrink-0">
            <span className="font-cinzel text-xs font-bold text-gold-400">
              {lead.name?.[0]?.toUpperCase() || '?'}
            </span>
          </div>
          <div>
            <p className="font-poppins text-sm font-medium text-white">{lead.name || '—'}</p>
            <p className="font-poppins text-xs text-white/35">{date} {time && `• ${time}`}</p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <p className="font-poppins text-sm text-white/70">{lead.phone || '—'}</p>
          {lead.phone && (
            <div className="flex gap-1">
              <a href={`tel:${lead.phone}`} className="text-white/25 hover:text-gold-400 transition-colors">
                <Phone size={12} />
              </a>
              <a href={`https://wa.me/${lead.phone?.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-green-400 transition-colors">
                <MessageCircle size={12} />
              </a>
            </div>
          )}
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="font-poppins text-xs text-purple-300 bg-purple-400/10 border border-purple-400/20 px-2.5 py-1 rounded-full">
          {lead.problem || '—'}
        </span>
      </td>

      <td className="px-5 py-4">
        <p className="font-poppins text-xs text-white/45 max-w-[200px] truncate" title={lead.message}>
          {lead.message || '—'}
        </p>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <StatusBadge status={lead.status} />
          {updating && <div className="w-3 h-3 border border-gold-400/50 border-t-gold-400 rounded-full animate-spin" />}
        </div>
      </td>

      <td className="px-5 py-4">
        <select
          value={lead.status || 'new'}
          onChange={e => handleStatus(e.target.value)}
          disabled={updating}
          className="bg-navy-800 border border-white/10 rounded-lg px-2 py-1.5 font-poppins text-xs text-white focus:outline-none focus:border-gold-400/40 cursor-pointer disabled:opacity-50"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
        </select>
      </td>
    </motion.tr>
  )
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [refreshing, setRefreshing] = useState(false)

  const fetchLeads = useCallback(async () => {
    setRefreshing(true)
    try {
      const data = await getLeads()
      setLeads(data)
      setFiltered(data)
    } catch {}
    setRefreshing(false)
    setLoading(false)
  }, [])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  useEffect(() => {
    let result = leads
    if (statusFilter !== 'all') result = result.filter(l => l.status === statusFilter)
    if (search) result = result.filter(l =>
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.includes(search) ||
      l.problem?.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(result)
  }, [search, statusFilter, leads])

  const handleStatusChange = async (id, status) => {
    await updateLeadStatus(id, status)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  const stats = [
    { icon: Users, label: 'Total Leads', value: leads.length, color: 'bg-blue-500/20' },
    { icon: Clock, label: 'New', value: leads.filter(l => l.status === 'new').length, color: 'bg-yellow-500/20' },
    { icon: TrendingUp, label: 'Contacted', value: leads.filter(l => l.status === 'contacted').length, color: 'bg-orange-500/20' },
    { icon: CheckCircle, label: 'Converted', value: leads.filter(l => l.status === 'converted').length, color: 'bg-green-500/20' },
  ]

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Header */}
      <header className="bg-navy-900/80 backdrop-blur-xl border-b border-white/8 px-6 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-gold-400/50 flex items-center justify-center">
              <Star size={14} className="text-gold-400" fill="#f59e0b" />
            </div>
            <div>
              <p className="font-cinzel text-sm font-bold text-white">Admin Dashboard</p>
              <p className="font-poppins text-[10px] text-white/35">Pandit Ji Astrology</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              disabled={refreshing}
              className="flex items-center gap-1.5 font-poppins text-xs text-white/50 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={() => signOut(auth)}
              className="flex items-center gap-1.5 font-poppins text-xs text-white/50 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-400/5"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Filters */}
        <div className="glass border border-white/8 rounded-2xl p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search by name, phone, problem..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 font-poppins text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold-400/40 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={15} className="text-white/30" />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-navy-800 border border-white/10 rounded-xl px-3 py-2.5 font-poppins text-sm text-white focus:outline-none focus:border-gold-400/40 cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="glass border border-white/8 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <Users size={32} className="text-white/15 mb-3" />
              <p className="font-poppins text-sm text-white/35">
                {leads.length === 0 ? 'No inquiries yet' : 'No results match your search'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/8">
                    {['Client', 'Phone', 'Problem', 'Message', 'Status', 'Update'].map(h => (
                      <th key={h} className="px-5 py-3 text-left font-poppins text-xs text-white/35 uppercase tracking-wider font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(lead => (
                    <LeadRow key={lead.id} lead={lead} onStatusChange={handleStatusChange} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filtered.length > 0 && (
          <p className="font-poppins text-xs text-white/25 mt-4 text-right">
            Showing {filtered.length} of {leads.length} inquiries
          </p>
        )}
      </div>
    </div>
  )
}
