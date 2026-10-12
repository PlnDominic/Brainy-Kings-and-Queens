// Small decorative pieces shared by the homepage sections.

export const GOLD = '#E2B45A'

export function Sparkle({ className, color = GOLD }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill={color} />
    </svg>
  )
}

export function Crown({ className, color = GOLD }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 64 48" aria-hidden="true" className={className} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M6 38 3 12l17 13L32 4l12 21 17-13-3 26H6Z" />
      <path d="M8 45h48" />
      <circle cx="32" cy="4" r="2.5" fill={color} />
    </svg>
  )
}

export function Squiggle({ className, color = GOLD }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 24" aria-hidden="true" className={className} fill="none">
      <path d="M2 12c10-12 20-12 30 0s20 12 30 0 20-12 30 0 20 12 26 0" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ backgroundImage: 'radial-gradient(currentColor 1.4px, transparent 1.4px)', backgroundSize: '16px 16px' }}
    />
  )
}

/** Soft wave that sits at the bottom of a section and blends into the next colour. */
export function Wave({ fill, className, flip }: { fill: string; className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <path d="M0 45C180 90 360 90 540 60S900 0 1080 15s270 45 360 45v30H0Z" fill={fill} />
    </svg>
  )
}

export function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] ${light ? 'text-[#E2B45A]' : 'text-primary'}`}>
      <Sparkle className="h-3 w-3" color={light ? GOLD : '#B31B1B'} />
      {children}
    </div>
  )
}
