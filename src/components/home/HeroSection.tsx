'use client'

import { useRouter } from 'next/navigation'

interface ClickableArea {
  id: string
  label: string
  href: string
  top: string
  left: string
  width: string
  height: string
}

const clickableAreas: ClickableArea[] = [
  {
    id: 'forehead',
    label: 'Čelo',
    href: '/sluzby/botulotoxin-mimicke-vrasky',
    top: '24%',
    left: '25%',
    width: '50%',
    height: '8%',
  },
  {
    id: 'eyebrows',
    label: 'Obočie',
    href: '/sluzby/permanentny-makeup-hair-strokes',
    top: '32%',
    left: '25%',
    width: '50%',
    height: '5%',
  },
  {
    id: 'eyes',
    label: 'Oči/Mihalnice',
    href: '/sluzby/lash-lifting',
    top: '37%',
    left: '20%',
    width: '60%',
    height: '6%',
  },
  {
    id: 'cheeks',
    label: 'Líca',
    href: '/sluzby/kyselina-hyaluronova-modelovanie-lic',
    top: '48%',
    left: '15%',
    width: '70%',
    height: '12%',
  },
  {
    id: 'lips',
    label: 'Pery',
    href: '/sluzby/permanentny-makeup-tetovanie-pier',
    top: '59%',
    left: '30%',
    width: '40%',
    height: '8%',
  },
]

export function HeroSection(): JSX.Element {
  const router = useRouter()

  const handleAreaClick = (href: string) => {
    router.push(href)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/klinika_tvar_3.webm" type="video/webm" />
        <source src="/videos/klinika_tvar_3.mp4" type="video/mp4" />
      </video>

        {/* Clickable Areas Overlay */}
        <div className="absolute inset-0 z-10">
          {clickableAreas.map((area) => (
            <button
              key={area.id}
              onClick={() => handleAreaClick(area.href)}
              className="absolute group cursor-pointer"
              style={{
                top: area.top,
                left: area.left,
                width: area.width,
                height: area.height,
              }}
              aria-label={`Prejsť na ${area.label}`}
            >
              {/* Invisible interactive area */}
              <div className="absolute inset-0" />
              
              {/* Subtle glow border on hover - updated with rose gold */}
              <div className="absolute inset-0 rounded-xl border-2 border-white/0 group-hover:border-white/70 transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(216,167,177,0.6)]" />
              
              {/* Modern tooltip badge with rose gold accent */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="relative">
                  {/* Glassmorphism background with rose tint */}
                  <div className="backdrop-blur-md bg-white/25 border border-white/50 rounded-full px-5 py-2.5 shadow-2xl">
                    <span className="text-white font-semibold text-sm drop-shadow-lg whitespace-nowrap">
                      {area.label}
                    </span>
                  </div>
                  {/* Rose gold gradient glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent-gold/30 to-primary/30 blur-xl rounded-full -z-10" />
                </div>
              </div>

              {/* Corner indicators - minimalistic */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/0 group-hover:border-white/80 rounded-tl-lg transition-all duration-300" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/0 group-hover:border-white/80 rounded-tr-lg transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/0 group-hover:border-white/80 rounded-bl-lg transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/0 group-hover:border-white/80 rounded-br-lg transition-all duration-300" />
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
