'use client'

import { useEffect, useState } from 'react'

interface ShareButtonsProps {
  title: string
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    // Reading initial value from window - this is safe to do synchronously on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentUrl(window.location.href)
  }, [])

  const handleCopyLink = (): void => {
    navigator.clipboard.writeText(currentUrl)
    alert('Link skopírovaný!')
  }

  const facebookShareUrl = currentUrl ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` : '#'
  const twitterShareUrl = currentUrl ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}` : '#'

  return (
    <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
      <h3 className="mb-4 font-medium text-gray-900">Zdieľajte články</h3>
      <div className="flex gap-3">
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-primary transition"
        >
          📘 Facebook
        </a>
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-primary transition"
        >
          𝕏 Twitter
        </a>
        <button
          onClick={handleCopyLink}
          className="text-gray-600 hover:text-primary transition"
          disabled={!currentUrl}
        >
          🔗 Kopírovať odkaz
        </button>
      </div>
    </div>
  )
}

