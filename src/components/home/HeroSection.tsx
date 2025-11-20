'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface InteractivePoint {
  id: string
  label: string
  href: string
  top: string
  left: string
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
        top: '21%',
        left: '50%',
      },
      {
        id: 'eyebrows',
        label: 'Obočie',
        href: '/sluzby/permanentny-makeup-hair-strokes',
        top: '33%',
        left: '50%',
      },
      {
        id: 'eyes-left',
        label: 'Oči',
        href: '/sluzby/lash-lifting',
        top: '36%',
        left: '32%',
      },
      {
        id: 'eyes-right',
        label: 'Oči',
        href: '/sluzby/lash-lifting',
        top: '36%',
        left: '68%',
      },
      {
        id: 'cheeks-left',
        label: 'Líca',
        href: '/sluzby/kyselina-hyaluronova-modelovanie-lic',
        top: '48%',
        left: '24%',
      },
      {
        id: 'cheeks-right',
        label: 'Líca',
        href: '/sluzby/kyselina-hyaluronova-modelovanie-lic',
        top: '48%',
        left: '76%',
      },
      {
        id: 'lips',
        label: 'Pery',
        href: '/sluzby/permanentny-makeup-tetovanie-pier',
        top: '58%',
        left: '50%',
      },
    ],
  },
  {
    id: 'body',
    label: 'Telo',
    icon: '👗',
    imageSrc: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop',
    points: [
      {
        id: 'chest',
        label: 'Hrudník',
        href: '/sluzby/sluzby-telo',
        top: '30%',
        left: '50%',
      },
      {
        id: 'abdomen',
        label: 'Brušo',
        href: '/sluzby/kryolipolyza-redukcia-tuku',
        top: '50%',
        left: '50%',
      },
      {
        id: 'arms-left',
        label: 'Paže',
        href: '/sluzby/laserova-epilacia-tvar',
        top: '40%',
        left: '20%',
      },
      {
        id: 'arms-right',
        label: 'Paže',
        href: '/sluzby/laserova-epilacia-tvar',
        top: '40%',
        left: '80%',
      },
    ],
  },
]

export function HeroSection(): JSX.Element {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<'face' | 'body'>('face')
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null)

  const currentSection = sections.find((s) => s.id === activeSection)!
  const isFaceSection = activeSection === 'face'

  const handlePointClick = (href: string) => {
    router.push(href)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background - Video for Face, Image for Body */}
      {isFaceSection ? (
        <video
          key="video"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={`${currentSection.videoSrc}.webm`} type="video/webm" />
          <source src={`${currentSection.videoSrc}.mp4`} type="video/mp4" />
        </video>
      ) : (
        <img
          key="image"
          src={currentSection.imageSrc}
          alt="Telo"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 z-5" />

      {/* Section Toggle - Left Sidebar */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-6">
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
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
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
        {currentSection.points.map((point) => (
          <button
            key={point.id}
            onClick={() => handlePointClick(point.href)}
            className="absolute group cursor-pointer"
            style={{
              top: point.top,
              left: point.left,
              width: '2rem',
              height: '2rem',
              transform: 'translate(-50%, -50%)',
            }}
            aria-label={`Prejsť na ${point.label}`}
            onMouseEnter={() => setHoveredPoint(point.id)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            {/* Main circle dot */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                hoveredPoint === point.id
                  ? 'bg-white/60 scale-100 shadow-[0_0_30px_rgba(255,255,255,0.8)]'
                  : 'bg-white/40 scale-75'
              }`}
            />

            {/* Ring animation on hover */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-white transition-all duration-300 ${
                hoveredPoint === point.id
                  ? 'scale-150 opacity-50'
                  : 'scale-100 opacity-0'
              }`}
            />

            {/* Tooltip Label */}
            {hoveredPoint === point.id && (
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
        ))}
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
