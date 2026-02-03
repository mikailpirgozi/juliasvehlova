#!/usr/bin/env node

/**
 * Download placeholder testimonial images
 * 
 * Usage: node scripts/download-testimonial-images.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const OUTPUT_DIR = join(__dirname, '..', 'public', 'images', 'testimonials')

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Professional portrait placeholder images from Unsplash
const images = [
  {
    filename: 'ema-fajnor.jpg',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop',
    description: 'Young woman portrait for Ema Fajnor testimonial'
  },
  {
    filename: 'majself.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
    description: 'Man portrait for Majself testimonial'
  },
  {
    filename: 'testimonial-3.jpg',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop',
    description: 'Woman portrait for Petra K.'
  },
  {
    filename: 'testimonial-4.jpg',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop',
    description: 'Woman portrait for Zuzana H.'
  },
  {
    filename: 'testimonial-5.jpg',
    url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=800&fit=crop',
    description: 'Woman portrait for Jana B.'
  },
  {
    filename: 'testimonial-6.jpg',
    url: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&h=800&fit=crop',
    description: 'Woman portrait for Katarína V.'
  }
]

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject)
        return
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`))
        return
      }

      const chunks = []
      response.on('data', (chunk) => chunks.push(chunk))
      response.on('end', () => {
        writeFileSync(filepath, Buffer.concat(chunks))
        resolve()
      })
      response.on('error', reject)
    }).on('error', reject)
  })
}

async function main() {
  console.log('📥 Downloading testimonial placeholder images...\n')

  for (const image of images) {
    const filepath = join(OUTPUT_DIR, image.filename)
    
    if (existsSync(filepath)) {
      console.log(`⏭️  Skipping ${image.filename} (already exists)`)
      continue
    }

    try {
      console.log(`⬇️  Downloading ${image.filename}...`)
      await downloadImage(image.url, filepath)
      console.log(`✅ ${image.filename} downloaded successfully`)
    } catch (error) {
      console.error(`❌ Failed to download ${image.filename}:`, error.message)
    }
  }

  console.log('\n✨ Done! Placeholder images downloaded.')
  console.log('\n⚠️  IMPORTANT: Replace these placeholder images with real client photos')
  console.log('   (with proper consent) before launching the website.')
}

main().catch(console.error)
