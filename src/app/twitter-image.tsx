import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

function getLogoBase64() {
  const logoPath = path.join(process.cwd(), 'public/images/branding/logo.svg')
  const data = readFileSync(logoPath)
  return `data:image/svg+xml;base64,${data.toString('base64')}`
}

export default function Image() {
  const logo = getLogoBase64()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #FAF5F2 0%, #F0E0D6 45%, #DFC4B5 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Corner decorations - top left */}
        <div
          style={{
            position: 'absolute',
            top: 36,
            left: 36,
            width: 64,
            height: 64,
            borderTop: '2px solid rgba(180, 157, 149, 0.55)',
            borderLeft: '2px solid rgba(180, 157, 149, 0.55)',
            display: 'flex',
          }}
        />
        {/* Corner decorations - top right */}
        <div
          style={{
            position: 'absolute',
            top: 36,
            right: 36,
            width: 64,
            height: 64,
            borderTop: '2px solid rgba(180, 157, 149, 0.55)',
            borderRight: '2px solid rgba(180, 157, 149, 0.55)',
            display: 'flex',
          }}
        />
        {/* Corner decorations - bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            left: 36,
            width: 64,
            height: 64,
            borderBottom: '2px solid rgba(180, 157, 149, 0.55)',
            borderLeft: '2px solid rgba(180, 157, 149, 0.55)',
            display: 'flex',
          }}
        />
        {/* Corner decorations - bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            right: 36,
            width: 64,
            height: 64,
            borderBottom: '2px solid rgba(180, 157, 149, 0.55)',
            borderRight: '2px solid rgba(180, 157, 149, 0.55)',
            display: 'flex',
          }}
        />

        {/* Logo */}
        <img
          src={logo}
          style={{
            width: 340,
            height: 200,
            objectFit: 'contain',
            marginBottom: 36,
          }}
          alt="Julia Estetic Clinic"
        />

        {/* Divider */}
        <div
          style={{
            width: 100,
            height: 1,
            background: 'rgba(180, 157, 149, 0.7)',
            marginBottom: 28,
            display: 'flex',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: '#7A6260',
            letterSpacing: 5,
            textTransform: 'uppercase',
          }}
        >
          Estetická medicína · Malacky
        </div>

        {/* Website URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 54,
            fontSize: 17,
            color: '#B49D95',
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          juliaesteticclinic.sk
        </div>
      </div>
    ),
    { ...size }
  )
}
