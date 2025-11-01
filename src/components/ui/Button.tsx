import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps): JSX.Element {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2'

  const variants = {
    primary: 'bg-gradient-to-r from-primary to-accent-gold text-white shadow-lg hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary active:scale-95',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-md hover:shadow-lg',
    outline: 'border-2 border-primary text-primary-dark hover:bg-primary/10 hover:border-primary-dark hover:text-primary-dark shadow-sm hover:shadow-md',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}
