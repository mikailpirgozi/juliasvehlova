'use client'

import Image from 'next/image'
import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface BeforeAfterImage {
  before: {
    url: string
    alt: string
  }
  after: {
    url: string
    alt: string
  }
  label?: string
}

interface BeforeAfterGalleryProps {
  images: BeforeAfterImage[]
  className?: string
}

function BeforeAfterSlider({ image }: { image: BeforeAfterImage }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      const container = containerRef.current
      if (!container) return
      
      const rect = container.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const percentage = (x / rect.width) * 100
      setSliderPosition(percentage)
    },
    []
  )

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (touch) {
      handleMove(touch.clientX)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-xl bg-gray-100"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={image.after.url}
          alt={image.after.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />
        <div className="absolute bottom-3 right-3 rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white shadow-md">
          Po
        </div>
      </div>

      {/* Before Image (Overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={image.before.url}
          alt={image.before.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />
        <div className="absolute bottom-3 left-3 rounded-full bg-gray-800 px-3 py-1 text-xs font-medium text-white shadow-md">
          Pred
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 z-10 w-1 cursor-ew-resize bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-600 shadow-lg">
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </div>
      </div>

      {/* Label */}
      {image.label && (
        <div className="absolute top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          {image.label}
        </div>
      )}
    </div>
  )
}

export function BeforeAfterGallery({ images, className }: BeforeAfterGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-lg">
        {images[activeIndex] && <BeforeAfterSlider image={images[activeIndex]} />}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'relative aspect-[4/3] w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                activeIndex === index
                  ? 'border-brand-600 shadow-md'
                  : 'border-gray-200 opacity-70 hover:opacity-100'
              )}
            >
              <Image
                src={image.after.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-white">
                {index + 1}
              </span>
            </button>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-gray-500">
        Posuňte posuvník pre porovnanie výsledkov pred a po zákroku
      </p>
    </div>
  )
}
