'use client'

import Image from 'next/image'
import Link from 'next/link'

const INSTAGRAM_HANDLE = 'juliaesteticclinic'
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`

// Instagram posts - rôzne veľkosti pre masonry layout
const instagramPosts = [
  { id: 1, image: '/images/instagram/post-1.jpg', alt: 'Instagram post 1', size: 'large' }, // 2x2
  { id: 2, image: '/images/instagram/post-2.jpg', alt: 'Instagram post 2', size: 'small' }, // 1x1
  { id: 3, image: '/images/instagram/post-3.jpg', alt: 'Instagram post 3', size: 'tall' }, // 1x2
  { id: 4, image: '/images/instagram/post-4.jpg', alt: 'Instagram post 4', size: 'wide' }, // 2x1
  { id: 5, image: '/images/instagram/post-5.jpg', alt: 'Instagram post 5', size: 'small' }, // 1x1
  { id: 6, image: '/images/instagram/post-6.jpg', alt: 'Instagram post 6', size: 'tall' }, // 1x2
]

// Funkcia na získanie grid class podľa veľkosti
const getSizeClasses = (size: string) => {
  switch (size) {
    case 'large':
      return 'md:col-span-2 md:row-span-2' // 2x2 na desktope
    case 'wide':
      return 'md:col-span-2 md:row-span-1' // 2x1 na desktope
    case 'tall':
      return 'md:col-span-1 md:row-span-2' // 1x2 na desktope
    case 'small':
    default:
      return 'md:col-span-1 md:row-span-1' // 1x1
  }
}

export function InstagramSection() {
  return (
    <section className="relative bg-white py-12 sm:py-16">
      {/* Full width container */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Masonry Grid Layout */}
        <div className="relative grid grid-cols-2 gap-2 sm:gap-3 md:auto-rows-[240px] md:grid-cols-4 lg:gap-4">
          {instagramPosts.map((post) => (
            <Link
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-lg ${getSizeClasses(post.size)} ${
                // Na mobile všetky karty sú rovnaké
                'aspect-square md:aspect-auto'
              }`}
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Instagram icon na hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg 
                  className="h-12 w-12 text-white drop-shadow-lg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </Link>
          ))}
          
          {/* Floating Instagram badge - uprostred layoutu */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto group relative"
            >
              {/* Pozadie */}
              <div className="absolute inset-0 -mx-8 -my-6 rounded-2xl bg-gradient-to-br from-black/80 via-black/90 to-black/80 backdrop-blur-md" />
              
              {/* Obsah */}
              <div className="relative px-8 py-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <svg 
                    className="h-10 w-10 text-white transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  
                  <div className="whitespace-nowrap">
                    <div className="text-[10px] font-medium tracking-[0.3em] text-white/90 uppercase sm:text-xs">
                      Sledujte nás na instagrame
                    </div>
                    <div className="mt-1 bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] bg-clip-text text-lg font-bold text-transparent sm:text-xl md:text-2xl">
                      @{INSTAGRAM_HANDLE}
                    </div>
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
