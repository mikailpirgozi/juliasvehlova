import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ButtonProps } from './Button'

interface LinkButtonProps extends Omit<ButtonProps, 'onClick' | 'type' | 'disabled'> {
  href: string
}

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: LinkButtonProps): JSX.Element {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2'

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
    <Link
      href={href}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  )
}

