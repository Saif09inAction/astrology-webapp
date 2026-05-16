/**
 * Premium Button System
 *
 * Variants:
 *   primary   — gold gradient + shimmer sweep + deep glow on hover
 *   secondary — glassmorphism + gold border glow on hover
 *   ghost     — minimal, border-only
 *
 * Props:
 *   as         — 'a' | 'button' (default: 'button')
 *   variant    — 'primary' | 'secondary' | 'ghost'
 *   size       — 'sm' | 'md' | 'lg' (default: 'md')
 *   nav        — true → compact sizing for navbar
 *   icon       — ReactNode shown BEFORE the label (gets nudge animation)
 *   iconAfter  — ReactNode shown AFTER the label (gets nudge animation)
 *   className  — extra classes
 *   ...rest    — forwarded to the underlying element
 */
export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  nav = false,
  icon,
  iconAfter,
  children,
  className = '',
  ...rest
}) {
  const sizeMap = {
    sm: nav ? 'btn-nav-primary' : 'text-[13px]',
    md: '',
    lg: 'text-[15px]',
  }

  const variantMap = {
    primary:   'btn btn-primary',
    secondary: 'btn btn-secondary',
    ghost:     'btn btn-ghost',
  }

  const navSuffix = nav
    ? variant === 'primary' ? ' btn-nav-primary' : ' btn-nav-secondary'
    : ''

  const classes = [
    variantMap[variant] ?? variantMap.primary,
    navSuffix,
    sizeMap[size] ?? '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Tag className={classes} {...rest}>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
      {iconAfter && <span className="btn-icon">{iconAfter}</span>}
    </Tag>
  )
}
