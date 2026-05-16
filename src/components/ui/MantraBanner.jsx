/* Scrolling Sanskrit mantra strip */
const mantras = [
  'ॐ नमः शिवाय',
  '✦',
  'जय श्री राम',
  '✦',
  'ॐ गं गणपतये नमः',
  '✦',
  'सर्वे भवन्तु सुखिनः',
  '✦',
  'ॐ श्रीं ह्रीं क्लीं',
  '✦',
  'हर हर महादेव',
  '✦',
  'ॐ नमो भगवते वासुदेवाय',
  '✦',
  'जय माता दी',
  '✦',
]

export default function MantraBanner() {
  const items = [...mantras, ...mantras, ...mantras]

  return (
    <div
      className="relative overflow-hidden py-3"
      style={{
        background: 'linear-gradient(90deg, rgba(255,107,0,0.08) 0%, rgba(245,158,11,0.1) 50%, rgba(255,107,0,0.08) 100%)',
        borderTop:    '1px solid rgba(255,107,0,0.18)',
        borderBottom: '1px solid rgba(255,107,0,0.18)',
      }}
    >
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10"
        style={{ background: 'linear-gradient(to right, #030712, transparent)' }} />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10"
        style={{ background: 'linear-gradient(to left, #030712, transparent)' }} />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'mantra-scroll 30s linear infinite' }}
      >
        {items.map((m, i) => (
          <span
            key={i}
            className="font-cinzel text-[13px] font-semibold mx-5 shrink-0"
            style={{
              color: m === '✦' ? 'rgba(255,107,0,0.4)' : 'rgba(251,191,36,0.65)',
              letterSpacing: m === '✦' ? '0' : '0.05em',
            }}
          >
            {m}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes mantra-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}
