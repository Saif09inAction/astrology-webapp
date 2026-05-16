export default function GlowOrb({ color = 'gold', size = 400, top, left, right, bottom, opacity = 0.15 }) {
  const colors = {
    gold: '245, 158, 11',
    purple: '139, 92, 246',
    blue: '59, 130, 246',
  }
  const rgb = colors[color] || colors.gold

  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        background: `radial-gradient(circle, rgba(${rgb}, ${opacity}) 0%, transparent 70%)`,
        filter: 'blur(40px)',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
      }}
    />
  )
}
