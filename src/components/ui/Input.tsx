import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, type = 'text', ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-medium text-gray-900">{label}</label>}
      <input
        ref={ref}
        type={type}
        className={cn(
          'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
})
