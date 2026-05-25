import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'

export default function PageBreadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 font-poppins text-[12px] text-white/30">
        <li>
          <Link to="/" className="hover:text-gold-400/80 transition-colors flex items-center gap-1">
            <Home size={12} />
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={11} className="opacity-40" />
            {item.href ? (
              <Link to={item.href} className="hover:text-gold-400/80 transition-colors">{item.label}</Link>
            ) : (
              <span className="text-white/50">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
