'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface InteractivePoint {
  id: string
  label: string
  href: string
  top: string
  left: string
  topMobile?: string
  leftMobile?: string
  topTablet?: string
  leftTablet?: string
}

type BreakPoint = 'mobile' | 'tablet' | 'desktop'

// Hook na detekciu breakpointu
function useBreakpoint(): BreakPoint {
  const [breakpoint, setBreakpoint] = useState<BreakPoint>('desktop')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBreakpoint('mobile')
      } else if (window.innerWidth < 1024) {
        setBreakpoint('tablet')
      } else {
        setBreakpoint('desktop')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}

interface SectionConfig {
  id: 'face' | 'body'
  label: string
  icon: string
  videoSrc?: string
  imageSrc?: string
  points: InteractivePoint[]
}

const sections: SectionConfig[] = [
  {
    id: 'face',
    label: 'Tvár',
    icon: '👤',
    videoSrc: '/videos/klinika_tvar_3',
    points: [
      {
        id: 'forehead',
        label: 'Čelo',
        href: '/sluzby/botulotoxin-mimicke-vrasky',
        top: '26.79%',
        left: '49.41%',
        topMobile: '28.29%',
        leftMobile: '47.95%',
        topTablet: '27.54%',
        leftTablet: '48.68%',
      },
      {
        id: 'eyebrows',
        label: 'Obočie',
        href: '/sluzby/permanentny-makeup-hair-strokes',
        top: '33.96%',
        left: '55.62%',
        topMobile: '34.72%',
        leftMobile: '59.07%',
        topTablet: '34.34%',
        leftTablet: '57.35%',
      },
      {
        id: 'eyes-left',
        label: 'Oči',
        href: '/sluzby/lash-lifting',
        top: '41.31%',
        left: '42.34%',
        topMobile: '42.33%',
        leftMobile: '31.05%',
        topTablet: '41.82%',
        leftTablet: '36.70%',
      },
      {
        id: 'cheeks-left',
        label: 'Líca',
        href: '/sluzby/kyselina-hyaluronova-modelovanie-lic',
        top: '50.50%',
        left: '40.93%',
        topMobile: '54.95%',
        leftMobile: '30.76%',
        topTablet: '52.73%',
        leftTablet: '35.85%',
      },
      {
        id: 'lips',
        label: 'Pery',
        href: '/sluzby/permanentny-makeup-tetovanie-pier',
        top: '64.84%',
        left: '50.20%',
        topMobile: '64.99%',
        leftMobile: '51.15%',
        topTablet: '64.92%',
        leftTablet: '50.68%',
      },
    ],
  },
  {
    id: 'body',
    label: 'Telo',
    icon: '👗',
    videoSrc: '/videos/klinika_body_3_blur',
    points: [
      {
        id: 'chest',
        label: 'Hrudník / Dekolt',
        href: '/sluzby/kategoria/energy',
        top: '28%',
        left: '50%',
        topMobile: '23.23%',
        leftMobile: '55.47%',
        topTablet: '25.65%',
        leftTablet: '52.74%',
      },
      {
        id: 'abdomen',
        label: 'Brušo',
        href: '/sluzby/kategoria/energy',
        top: '48%',
        left: '50%',
        topMobile: '37.58%',
        leftMobile: '55.92%',
        topTablet: '42.79%',
        leftTablet: '52.96%',
      },
      {
        id: 'arms-right',
        label: 'Paže',
        href: '/sluzby/laserova-epilacia-podpazie',
        top: '22.03%',
        left: '47.32%',
        topMobile: '22.42%',
        leftMobile: '44.38%',
        topTablet: '22.23%',
        leftTablet: '45.85%',
      },
      {
        id: 'legs',
        label: 'Nohy',
        href: '/sluzby/laserova-epilacia-nohy-cele',
        top: '68.84%',
        left: '58.37%',
        topMobile: '69.80%',
        leftMobile: '67.81%',
        topTablet: '69.32%',
        leftTablet: '63.09%',
      },
      {
        id: 'bikini',
        label: 'Bikini zóna',
        href: '/sluzby/laserova-epilacia-bikini',
        top: '50.48%',
        left: '52.42%',
        topMobile: '51.27%',
        leftMobile: '56.67%',
        topTablet: '50.88%',
        leftTablet: '54.55%',
      },
    ],
  },
]

export function HeroSection(): JSX.Element {
  const router = useRouter()
  const breakpoint = useBreakpoint()
  const [activeSection, setActiveSection] = useState<'face' | 'body'>('face')
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null)
  const [debugMode, setDebugMode] = useState(false)
  const [positions, setPositions] = useState<Record<string, { top: string; left: string }>>({})
  const containerRef = React.useRef<HTMLDivElement>(null)
  const draggingRef = React.useRef<string | null>(null)

  const currentSection = sections.find((s) => s.id === activeSection)!
  const isFaceSection = activeSection === 'face'

  // Logika na získanie správnej pozície podľa breakpointu
  const getResponsivePosition = (point: InteractivePoint) => {
    if (breakpoint === 'mobile' && point.topMobile && point.leftMobile) {
      return { top: point.topMobile, left: point.leftMobile }
    }
    if (breakpoint === 'tablet' && point.topTablet && point.leftTablet) {
      return { top: point.topTablet, left: point.leftTablet }
    }
    return { top: point.top, left: point.left }
  }

  const handlePointClick = (href: string) => {
    if (debugMode) return
    router.push(href)
  }

  const handlePointerDown = (e: React.PointerEvent, pointId: string) => {
    if (!debugMode) return
    e.preventDefault()
    e.stopPropagation()
    draggingRef.current = pointId
  }

  React.useEffect(() => {
    if (!debugMode || !containerRef.current) return

    const container = containerRef.current

    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingRef.current || !container) return

      const rect = container.getBoundingClientRect()
      const top = ((e.clientY - rect.top) / rect.height) * 100
      const left = ((e.clientX - rect.left) / rect.width) * 100

      setPositions((prev) => ({
        ...prev,
        [draggingRef.current!]: {
          top: `${Math.max(0, Math.min(100, top))}%`,
          left: `${Math.max(0, Math.min(100, left))}%`,
        },
      }))
    }

    const handlePointerUp = () => {
      draggingRef.current = null
    }

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
    }
  }, [debugMode])

  const getPointPosition = (pointId: string, defaultTop: string, defaultLeft: string) => {
    if (positions[pointId]) return positions[pointId]
    return { top: defaultTop, left: defaultLeft }
  }

  const exportPositions = () => {
    const output = currentSection.points
      .map((p) => {
        const pos = getPointPosition(p.id, p.top, p.left)
        return `{
        id: '${p.id}',
        label: '${p.label}',
        href: '${p.href}',
        top: '${pos.top}',
        left: '${pos.left}',
      },`
      })
      .join('\n')

    // eslint-disable-next-line no-console
    console.log(output)
    alert('Pozície kopírované do console! Otvor Developer Tools (F12) a skopíruj text.')
  }

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh] lg:h-screen overflow-hidden">
      {/* Background - Video for Face, Image for Body */}
      <div
        ref={containerRef}
        className="absolute inset-0"
      >
               {currentSection?.videoSrc ? (
          <video
            key={`video-${currentSection.id}`}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              // Optimizes video display on mobile by focusing on center content
              objectPosition: 'center 30%',
            }}
          >
            <source src={`${currentSection.videoSrc}.webm`} type="video/webm" />
            <source src={`${currentSection.videoSrc}.mp4`} type="video/mp4" />
          </video>
        ) : currentSection?.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key="image"
            src={currentSection.imageSrc}
            alt="Media"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : null}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 z-5" />

        {/* Debug Mode Toggle */}
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={() => {
              setDebugMode(!debugMode)
              setPositions({})
            }}
            className="absolute top-4 right-4 z-50 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
          >
            {debugMode ? '❌ Vypnúť Debug' : '🐛 Debug Režim'}
          </button>
        )}

        {/* Export Button (visible only in debug mode) */}
        {debugMode && (
          <button
            onClick={exportPositions}
            className="absolute top-4 right-28 z-50 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
          >
            ✅ Exportovať Pozície
          </button>
        )}
      </div>

      {/* Section Toggle - Left Sidebar */}
      <div className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 sm:gap-4 md:gap-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`group relative flex flex-col items-center gap-2 transition-all duration-300 ${
              activeSection === section.id ? 'scale-110' : 'opacity-60 hover:opacity-100'
            }`}
            aria-label={`Prepnúť na ${section.label}`}
          >
            {/* Icon with background */}
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-white/30 backdrop-blur-md border border-white/50 shadow-lg shadow-primary/40'
                  : 'bg-white/15 backdrop-blur-sm border border-white/20 group-hover:bg-white/25'
              }`}
            >
              {section.icon}
            </div>
            {/* Label */}
            <span
              className={`text-xs font-semibold whitespace-nowrap drop-shadow-lg transition-all duration-300 ${
                activeSection === section.id
                  ? 'text-white opacity-100'
                  : 'text-white/70 opacity-0 group-hover:opacity-100'
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>

      {/* Interactive Points Overlay */}
      <div className="absolute inset-0 z-10">
        {currentSection.points.map((point) => {
          const responsivePos = getResponsivePosition(point)
          const pos = getPointPosition(point.id, responsivePos.top, responsivePos.left)
          return (
            <button
              key={point.id}
              onClick={() => handlePointClick(point.href)}
              className={`absolute group cursor-pointer ${debugMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
              style={{
                top: pos.top,
                left: pos.left,
                width: '2rem',
                height: '2rem',
                transform: 'translate(-50%, -50%)',
              }}
              aria-label={`Prejsť na ${point.label}`}
              onMouseEnter={() => setHoveredPoint(point.id)}
              onMouseLeave={() => setHoveredPoint(null)}
              onPointerDown={(e) => handlePointerDown(e, point.id)}
            >
              {/* Main circle dot */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  hoveredPoint === point.id
                    ? 'bg-white/60 scale-100 shadow-[0_0_30px_rgba(255,255,255,0.8)]'
                    : 'bg-white/40 scale-75'
                } ${debugMode ? 'border-2 border-yellow-400' : ''}`}
              />

              {/* Ring animation on hover */}
              <div
                className={`absolute inset-0 rounded-full border-2 border-white transition-all duration-300 ${
                  hoveredPoint === point.id
                    ? 'scale-150 opacity-50'
                    : 'scale-100 opacity-0'
                }`}
              />

              {/* Debug Label (visible in debug mode) */}
              {debugMode && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 z-30 whitespace-nowrap mt-2">
                  <div className="flex flex-col gap-1 items-center">
                    <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-bold">
                      {point.label}
                    </div>
                    <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold">
                      {pos.top} / {pos.left}
                    </div>
                  </div>
                </div>
              )}

              {/* Tooltip Label */}
              {hoveredPoint === point.id && !debugMode && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                  <div className="relative">
                    {/* Glassmorphism badge */}
                    <div className="backdrop-blur-md bg-white/25 border border-white/50 rounded-full px-4 py-1.5 shadow-2xl whitespace-nowrap">
                      <span className="text-white font-semibold text-xs drop-shadow-lg">
                        {point.label}
                      </span>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent-gold/30 to-primary/30 blur-lg rounded-full -z-10" />
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-white drop-shadow-lg"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
