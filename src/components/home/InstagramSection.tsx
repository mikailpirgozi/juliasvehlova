'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const INSTAGRAM_HANDLE = 'juliaesteticclinic'
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`

interface InstagramPost {
  id: number
  video: string
  poster: string
  alt: string
  link: string
  featured?: boolean
}

// 8 reels - 2 featured (wider) + 6 normal
const instagramPosts: InstagramPost[] = [
  { id: 1, video: '/videos/instagram/reel-1.mp4', poster: '/videos/instagram/reel-1-poster.jpg', alt: 'Estetický zákrok', link: 'https://www.instagram.com/p/DBN0BZ5OeGY/', featured: true },
  { id: 2, video: '/videos/instagram/reel-5.mp4', poster: '/videos/instagram/reel-5-poster.jpg', alt: 'Kozmetický zákrok', link: INSTAGRAM_URL },
  { id: 3, video: '/videos/instagram/reel-9.mp4', poster: '/videos/instagram/reel-9-poster.jpg', alt: 'Výsledky ošetrenia', link: 'https://www.instagram.com/p/DSaNuwOjJHR/' },
  { id: 4, video: '/videos/instagram/reel-3.mp4', poster: '/videos/instagram/reel-3-poster.jpg', alt: 'Profesionálne ošetrenie', link: 'https://www.instagram.com/p/DTwAFFKDJwb/' },
  { id: 5, video: '/videos/instagram/reel-12.mp4', poster: '/videos/instagram/reel-12-poster.jpg', alt: 'Kozmetické ošetrenie', link: 'https://www.instagram.com/p/DUllFZuDM5k/' },
  { id: 6, video: '/videos/instagram/reel-7.mp4', poster: '/videos/instagram/reel-7-poster.jpg', alt: 'Starostlivosť o pleť', link: 'https://www.instagram.com/p/DUYsVAGDI2s/' },
  { id: 7, video: '/videos/instagram/reel-2.mp4', poster: '/videos/instagram/reel-2-poster.jpg', alt: 'Ošetrenie pleti', link: 'https://www.instagram.com/p/DBYPBffuo_z/' },
  { id: 8, video: '/videos/instagram/reel-8.mp4', poster: '/videos/instagram/reel-8-poster.jpg', alt: 'Klinika Julia', link: 'https://www.instagram.com/p/DTAZrjLDHss/' },
]

const INSTAGRAM_ICON_PATH =
  'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'

function VideoCard({ post }: { post: InstagramPost }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  const playVideo = useCallback(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  const pauseVideo = useCallback(() => {
    videoRef.current?.pause()
  }, [])

  useEffect(() => {
    if (!isMobile) return
    if (isVisible) playVideo(); else pauseVideo()
  }, [isMobile, isVisible, playVideo, pauseVideo])

  useEffect(() => {
    if (isMobile) return
    if (isHovered && isVisible) playVideo(); else pauseVideo()
  }, [isMobile, isHovered, isVisible, playVideo, pauseVideo])

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-lg aspect-square ${
        post.id > 6 ? 'hidden md:block' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={post.alt}
      />

      <video
        ref={videoRef}
        poster={post.poster}
        preload="none"
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      >
        {isVisible && <source src={post.video} type="video/mp4" />}
      </video>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Instagram icon on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-brand-900/30 mix-blend-overlay" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <svg
          className="h-7 w-7 text-white drop-shadow-lg md:h-8 md:w-8"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d={INSTAGRAM_ICON_PATH} />
        </svg>
      </div>

      {/* Play indicator */}
      <div className="absolute bottom-1.5 left-1.5 flex items-center rounded-full bg-black/40 p-1 opacity-60 transition-opacity group-hover:opacity-0 md:bottom-2 md:left-2 md:p-1.5">
        <svg className="h-2.5 w-2.5 text-white md:h-3 md:w-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  )
}

export function InstagramSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-[#faf7f5]/30 py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Compact grid - square cells, fits on one screen */}
        <div className="relative grid grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-4 md:gap-3">
          {instagramPosts.map((post) => (
            <VideoCard key={post.id} post={post} />
          ))}

          {/* Floating Instagram badge */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto group relative"
            >
              <div className="absolute inset-0 -mx-2 -my-1.5 rounded-lg bg-black/70 backdrop-blur-sm md:-mx-5 md:-my-3 md:rounded-xl md:bg-gradient-to-br md:from-black/80 md:via-black/90 md:to-black/80 md:backdrop-blur-md shadow-2xl ring-1 ring-white/10" />
              <div className="relative flex items-center gap-1.5 px-2 py-1.5 md:flex-col md:gap-2 md:px-6 md:py-4 md:text-center animate-pulse-slow hover:animate-none">
                <svg
                  className="h-4 w-4 shrink-0 text-brand-300 transition-transform duration-300 group-hover:scale-110 md:h-8 md:w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={INSTAGRAM_ICON_PATH} />
                </svg>
                <div className="whitespace-nowrap">
                  <div className="hidden text-[10px] font-bold tracking-[0.25em] text-white/80 uppercase md:block">
                    Sledujte nás na instagrame
                  </div>
                  <div className="bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] bg-clip-text text-sm font-bold text-transparent md:mt-1 md:text-lg lg:text-xl">
                    @{INSTAGRAM_HANDLE}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
