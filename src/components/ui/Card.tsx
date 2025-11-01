import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export function Card({
  className,
  hoverable = false,
  ...props
}: CardProps): JSX.Element {
  return (
    <div
      className={cn(
        'rounded-3xl border border-primary/10 bg-white p-6 shadow-lg',
        hoverable && 'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn('mb-4 border-b border-primary/10 pb-4', className)} {...props} />
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element {
  return (
    <h3
      className={cn('font-serif text-2xl font-bold text-primary-dark', className)}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element {
  return <p className={cn('text-sm text-gray-600 leading-relaxed', className)} {...props} />
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn('', className)} {...props} />
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn('border-t border-primary/10 pt-4', className)} {...props} />
}
