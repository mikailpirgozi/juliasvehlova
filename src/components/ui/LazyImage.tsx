'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  fill?: boolean
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  fill = false,
  objectFit = 'cover',
}: LazyImageProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn('overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        quality={90}
        style={{ objectFit }}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
    </div>
  )
}

