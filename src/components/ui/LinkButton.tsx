'use client'

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
    'inline-flex items-center justify-center rounded font-medium transition duration-200'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
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

