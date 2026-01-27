'use client'

interface PageBackgroundProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'white'
  className?: string
}

export function PageBackground({
  children,
  variant = 'primary',
  className = '',
}: PageBackgroundProps) {
  const baseStyles = 'relative overflow-hidden'
  
  const variantStyles = {
    primary: 'bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20',
    secondary: 'bg-gradient-to-b from-brand-50/50 via-white to-brand-50/30',
    white: 'bg-white',
  }

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute top-20 right-10 h-64 w-64 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-10 h-80 w-80 rounded-full bg-[#CDA882]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/20 blur-3xl" />
      
      {/* Additional decorative circles */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-[#CDA882]/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-brand-300/15 blur-2xl" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Simpler section background for alternating sections
export function SectionBackground({
  children,
  variant = 'light',
  className = '',
}: {
  children: React.ReactNode
  variant?: 'light' | 'accent' | 'white'
  className?: string
}) {
  const variantStyles = {
    light: 'bg-gradient-to-br from-brand-50/40 via-white to-brand-50/30',
    accent: 'bg-gradient-to-br from-brand-100/50 via-brand-50/30 to-[#CDA882]/10',
    white: 'bg-white',
  }

  return (
    <div className={`relative overflow-hidden ${variantStyles[variant]} ${className}`}>
      {/* Subtle decorative elements */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#CDA882]/15 blur-3xl" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
