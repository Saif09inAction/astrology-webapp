import { motion } from 'framer-motion'

export default function SectionHeading({ subtitle, title, description, centered = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <p
          className="text-[10px] tracking-[0.35em] uppercase mb-3"
          style={{ fontFamily: "'Cinzel', serif", color: 'rgba(251,191,36,0.7)' }}
        >
          ✦ {subtitle} ✦
        </p>
      )}
      <h2
        className="text-3xl md:text-4xl font-bold text-white leading-tight"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {title}
      </h2>
      {/* Divider */}
      <div className="flex items-center justify-center mt-4 gap-2" style={{ justifyContent: centered ? 'center' : 'flex-start' }}>
        <div className="h-px w-8" style={{ background: 'rgba(245,158,11,0.25)' }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(245,158,11,0.6)' }} />
        <div className="h-px w-8" style={{ background: 'rgba(245,158,11,0.25)' }} />
      </div>
      {description && (
        <p
          className="text-[15px] leading-relaxed mt-5 max-w-2xl"
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: 'rgba(255,255,255,0.45)',
            margin: centered ? '1.25rem auto 0' : '1.25rem 0 0',
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
