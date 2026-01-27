#!/usr/bin/env node
/**
 * Image Download Script for Julia Estetic Clinic
 * 
 * This script downloads images from the original website (juliaesteticclinic.sk)
 * and saves them to the public/images directory with proper organization.
 * 
 * Usage: node scripts/download-images.mjs
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')
const imagesDir = path.join(projectRoot, 'public', 'images')

// Image URLs from the original website organized by category
// These are based on the WordPress uploads structure
const imageMapping = {
  // Categories - main images for homepage sections (using placeholders)
  categories: {
    'face.jpg': null,
    'body.jpg': null,
    'energy.jpg': null,
    'men.jpg': null,
    'chakra.jpg': null,
  },
  
  // Logo and branding
  branding: {
    'logo-white.svg': 'https://www.juliaesteticclinic.sk/wp-content/uploads/2025/02/JEC_logo_white_horizontal.svg',
  },
  
  // Services - individual service images
  services: {
    // Botulotoxín
    'botox-forehead.jpg': null, // Will use placeholder
    'hyperhidrosis.jpg': null,
    
    // Kyselina hyalurónová
    'lip-filler.jpg': null,
    'cheek-filler.jpg': null,
    'tear-trough.jpg': null,
    
    // Permanentný makeup
    'microblading.jpg': null,
    'powder-brows.jpg': null,
    'lip-tattoo.jpg': null,
    'hair-strokes.jpg': null,
    'powder-brows-detail.jpg': null,
    'pmu-correction.jpg': null,
    'laser-removal.jpg': null,
    'eyeliner-pmu.jpg': null,
    
    // Profesionálne líčenie
    'daily-makeup.jpg': null,
    'evening-makeup.jpg': null,
    'wedding-makeup.jpg': null,
    'trial-wedding-makeup.jpg': null,
    
    // Obočie a mihalnice
    'eyebrow-shaping.jpg': null,
    'eyebrow-tinting.jpg': null,
    'lash-tinting.jpg': null,
    'brow-lamination.jpg': null,
    'lash-lamination.jpg': null,
    'lash-lifting.jpg': null,
    
    // Estetická medicína
    'biorevitalization.jpg': null,
    'injection-lipolysis.jpg': null,
    'thread-lift.jpg': null,
    
    // Laserová epilácia
    'laser-face.jpg': null,
    'laser-legs.jpg': null,
    'laser-underarms.jpg': null,
    'laser-bikini.jpg': null,
    
    // Telové procedúry
    'cryolipolysis.jpg': null,
    
    // Muži
    'men-grooming.jpg': null,
    'men-laser-face.jpg': null,
    'men-laser-back.jpg': null,
    'men-botox.jpg': null,
    'men-filler.jpg': null,
    'men-facial.jpg': null,
    
    // Kategórie služieb
    'face-category.jpg': null,
    'body-category.jpg': null,
    
    // Energy a Chakra
    'energy-boost.jpg': null,
    'chakra-calibration.jpg': null,
    
    // Chemický peeling a microneedling
    'chemical-peel.jpg': null,
    'microneedling.jpg': null,
    
    // About images
    'doctor-portrait.jpg': null,
    'clinic-interior.jpg': null,
    
    // Testimonial avatars
    'testimonial-1.jpg': null,
    'testimonial-2.jpg': null,
    'testimonial-3.jpg': null,
    'testimonial-4.jpg': null,
    'testimonial-5.jpg': null,
    'testimonial-6.jpg': null,
  }
}

// High-quality placeholder images from Unsplash (aesthetic/beauty related)
const placeholderImages = {
  // Face treatments
  'botox-forehead.jpg': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=600&fit=crop',
  'hyperhidrosis.jpg': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=600&fit=crop',
  
  // Lip fillers
  'lip-filler.jpg': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop',
  'cheek-filler.jpg': 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&h=600&fit=crop',
  'tear-trough.jpg': 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&h=600&fit=crop',
  
  // Permanent makeup
  'microblading.jpg': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',
  'powder-brows.jpg': 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&h=600&fit=crop',
  'lip-tattoo.jpg': 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&h=600&fit=crop',
  'hair-strokes.jpg': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',
  'powder-brows-detail.jpg': 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&h=600&fit=crop',
  'pmu-correction.jpg': 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&h=600&fit=crop',
  'laser-removal.jpg': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
  'eyeliner-pmu.jpg': 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&h=600&fit=crop',
  
  // Makeup
  'daily-makeup.jpg': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop',
  'evening-makeup.jpg': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop',
  'wedding-makeup.jpg': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
  'trial-wedding-makeup.jpg': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
  
  // Eyebrows and lashes
  'eyebrow-shaping.jpg': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',
  'eyebrow-tinting.jpg': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',
  'lash-tinting.jpg': 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&h=600&fit=crop',
  'brow-lamination.jpg': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',
  'lash-lamination.jpg': 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&h=600&fit=crop',
  'lash-lifting.jpg': 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&h=600&fit=crop',
  
  // Aesthetic medicine
  'biorevitalization.jpg': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop',
  'injection-lipolysis.jpg': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
  'thread-lift.jpg': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop',
  
  // Laser hair removal
  'laser-face.jpg': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop',
  'laser-legs.jpg': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop',
  'laser-underarms.jpg': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop',
  'laser-bikini.jpg': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop',
  
  // Body procedures
  'cryolipolysis.jpg': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
  
  // Men's services
  'men-grooming.jpg': 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop',
  'men-laser-face.jpg': 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop',
  'men-laser-back.jpg': 'https://images.unsplash.com/photo-1540206395-68808572332f?w=800&h=600&fit=crop',
  'men-botox.jpg': 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop',
  'men-filler.jpg': 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop',
  'men-facial.jpg': 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop',
  
  // Category images
  'face-category.jpg': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=600&fit=crop',
  'body-category.jpg': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
  'face.jpg': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=600&fit=crop',
  'body.jpg': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
  'energy.jpg': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
  'men.jpg': 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop',
  'chakra.jpg': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop',
  
  // Energy and Chakra
  'energy-boost.jpg': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
  'chakra-calibration.jpg': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop',
  
  // About section
  'doctor-portrait.jpg': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop',
  'clinic-interior.jpg': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
  
  // Testimonial avatars
  'testimonial-1.jpg': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  'testimonial-2.jpg': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  'testimonial-3.jpg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
  'testimonial-4.jpg': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop',
  'testimonial-5.jpg': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
  'testimonial-6.jpg': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
  
  // Skin treatments
  'chemical-peel.jpg': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop',
  'microneedling.jpg': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop',
}

/**
 * Create directory if it doesn't exist
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`📁 Created directory: ${dirPath}`)
  }
}

/**
 * Download a file from URL to destination
 */
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    // Handle both http and https
    const protocol = url.startsWith('https') ? https : require('http')
    
    const file = fs.createWriteStream(destPath)
    
    const request = protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location
        if (redirectUrl) {
          downloadFile(redirectUrl, destPath).then(resolve).catch(reject)
          return
        }
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`))
        return
      }
      
      response.pipe(file)
      
      file.on('finish', () => {
        file.close()
        resolve(destPath)
      })
    })
    
    request.on('error', (err) => {
      fs.unlink(destPath, () => {}) // Delete the file on error
      reject(err)
    })
    
    file.on('error', (err) => {
      fs.unlink(destPath, () => {})
      reject(err)
    })
  })
}

/**
 * Main function to download all images
 */
async function downloadAllImages() {
  console.log('🚀 Starting image download process...\n')
  
  // Create base directories
  const directories = [
    path.join(imagesDir, 'services'),
    path.join(imagesDir, 'categories'),
    path.join(imagesDir, 'branding'),
    path.join(imagesDir, 'hero'),
    path.join(imagesDir, 'about'),
    path.join(imagesDir, 'testimonials'),
  ]
  
  directories.forEach(ensureDir)
  
  let downloaded = 0
  let failed = 0
  let skipped = 0
  
  // Download category images
  console.log('\n📦 Downloading category images...')
  for (const [filename, url] of Object.entries(imageMapping.categories)) {
    const destPath = path.join(imagesDir, 'categories', filename)
    
    // Check if file exists and is not empty
    if (fs.existsSync(destPath)) {
      const stats = fs.statSync(destPath)
      if (stats.size > 0) {
        console.log(`⏭️  Skipped (exists): ${filename}`)
        skipped++
        continue
      } else {
        // Delete empty file
        fs.unlinkSync(destPath)
      }
    }
    
    // Try original URL first, then fallback to placeholder
    const urls = [url, placeholderImages[filename]].filter(Boolean)
    
    if (urls.length === 0) {
      console.log(`⚠️  No URL for: ${filename}`)
      failed++
      continue
    }
    
    let success = false
    for (const downloadUrl of urls) {
      try {
        await downloadFile(downloadUrl, destPath)
        console.log(`✅ Downloaded: ${filename}`)
        downloaded++
        success = true
        break
      } catch (error) {
        // Try next URL
        continue
      }
    }
    
    if (!success) {
      console.log(`❌ Failed: ${filename} - All URLs failed`)
      failed++
    }
  }
  
  // Download branding images
  console.log('\n📦 Downloading branding images...')
  for (const [filename, url] of Object.entries(imageMapping.branding)) {
    const destPath = path.join(imagesDir, 'branding', filename)
    
    if (fs.existsSync(destPath)) {
      console.log(`⏭️  Skipped (exists): ${filename}`)
      skipped++
      continue
    }
    
    if (!url) {
      console.log(`⚠️  No URL for: ${filename}`)
      failed++
      continue
    }
    
    try {
      await downloadFile(url, destPath)
      console.log(`✅ Downloaded: ${filename}`)
      downloaded++
    } catch (error) {
      console.log(`❌ Failed: ${filename} - ${error.message}`)
      failed++
    }
  }
  
  // Download service images
  console.log('\n📦 Downloading service images...')
  for (const [filename, url] of Object.entries(imageMapping.services)) {
    const destPath = path.join(imagesDir, 'services', filename)
    
    if (fs.existsSync(destPath)) {
      console.log(`⏭️  Skipped (exists): ${filename}`)
      skipped++
      continue
    }
    
    // Use placeholder if original URL is not available
    const downloadUrl = url || placeholderImages[filename]
    
    if (!downloadUrl) {
      console.log(`⚠️  No URL for: ${filename}`)
      failed++
      continue
    }
    
    try {
      await downloadFile(downloadUrl, destPath)
      console.log(`✅ Downloaded: ${filename}`)
      downloaded++
    } catch (error) {
      console.log(`❌ Failed: ${filename} - ${error.message}`)
      failed++
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('📊 Download Summary:')
  console.log(`   ✅ Downloaded: ${downloaded}`)
  console.log(`   ⏭️  Skipped: ${skipped}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log('='.repeat(50))
  
  return { downloaded, skipped, failed }
}

// Run the script
downloadAllImages()
  .then(({ downloaded, failed }) => {
    if (failed > 0) {
      console.log('\n⚠️  Some images failed to download. Check the logs above.')
    } else {
      console.log('\n🎉 All images downloaded successfully!')
    }
    process.exit(failed > 0 ? 1 : 0)
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error)
    process.exit(1)
  })
