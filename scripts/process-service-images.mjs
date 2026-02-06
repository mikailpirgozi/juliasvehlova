#!/usr/bin/env node
/**
 * Script to process service images:
 * 1. Convert to WebP format
 * 2. Compress for optimal file size
 * 3. Copy to appropriate folders in public/images/services/
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const execAsync = promisify(exec)

// Source folder
const SOURCE_DIR = '/Users/mikailpirgozi/Downloads/Fotky na web'
// Destination folder
const DEST_DIR = '/Users/mikailpirgozi/Projects/Juliasvehlova/public/images/services'

// Mapping of source folders to destination folder names
const FOLDER_MAPPING = {
  'Chakra Calibration': 'chakra-calibration',
  'Laserová epilácia': 'laserova-epilacia',
  'Masáže a maderoterapia': 'masaze-maderoterapia',
  'Piercing': 'piercing',
  'Profesionálne líčenie': 'profesionalne-licenie',
  'Tetovanie': 'tetovanie',
}

// Nested folder mappings for Estetická medicína
const ESTETICKA_MEDICINA_MAPPING = {
  'Biorevitalizácia pleti': 'biorevitalizacia-pleti',
  'Botulotoxín': 'botulotoxin',
  'Výplne kys. hyalurónovou': 'vyplne-kyselinou-hyaluronovou',
}

// Nested folder mappings for Kozmetika
const KOZMETIKA_MAPPING = {
  'Kozmetické ošetrenia': 'kozmeticke-osetrenia',
  'Doplnkové kozmetické služby/Permanentný Make-Up': 'permanentny-makeup',
}

// WebP quality setting (0-100, higher = better quality but larger file)
const WEBP_QUALITY = 80

// Maximum image dimension (for resizing)
const MAX_DIMENSION = 1920

/**
 * Convert and compress image to WebP
 */
async function convertToWebP(sourcePath, destPath) {
  // Use cwebp with quality and resize options
  const command = `cwebp -q ${WEBP_QUALITY} -resize ${MAX_DIMENSION} 0 "${sourcePath}" -o "${destPath}"`
  
  try {
    await execAsync(command)
    return true
  } catch (error) {
    console.error(`Error converting ${sourcePath}:`, error.message)
    return false
  }
}

/**
 * Check if a filename is a duplicate (e.g. "IMG_0010 2.jpg", "IMG_0029 (1).jpg")
 */
function isDuplicateFile(filename) {
  const name = path.basename(filename, path.extname(filename))
  // Match patterns like " 2", " (1)", " (1) 2", " copy" at the end of filename
  return / \d+$/.test(name) || / \(\d+\)/.test(name) || / copy/i.test(name)
}

/**
 * Get all image files from a directory, filtering out duplicates
 */
async function getImageFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  const imageFiles = []
  let skippedDuplicates = 0
  
  for (const entry of entries) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase()
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        if (isDuplicateFile(entry.name)) {
          skippedDuplicates++
          continue
        }
        imageFiles.push(path.join(dirPath, entry.name))
      }
    }
  }
  
  if (skippedDuplicates > 0) {
    console.log(`  Skipped ${skippedDuplicates} duplicate files`)
  }
  
  return imageFiles.sort()
}

/**
 * Process a folder of images
 */
async function processFolder(sourceFolderPath, destFolderName, limit = 12) {
  const destFolderPath = path.join(DEST_DIR, destFolderName)
  
  // Create destination folder if it doesn't exist
  await fs.mkdir(destFolderPath, { recursive: true })
  
  // Get all image files
  const imageFiles = await getImageFiles(sourceFolderPath)
  
  if (imageFiles.length === 0) {
    console.log(`  No images found in ${sourceFolderPath}`)
    return
  }
  
  console.log(`  Found ${imageFiles.length} images, selecting up to ${limit} with even spacing...`)
  
  // Select images with even spacing across the collection for visual diversity
  let filesToProcess
  if (imageFiles.length <= limit) {
    filesToProcess = imageFiles
  } else {
    filesToProcess = []
    const step = imageFiles.length / limit
    for (let i = 0; i < limit; i++) {
      const index = Math.floor(i * step)
      filesToProcess.push(imageFiles[index])
    }
  }
  let processed = 0
  
  for (let i = 0; i < filesToProcess.length; i++) {
    const sourcePath = filesToProcess[i]
    const destFileName = `${destFolderName}-${(i + 1).toString().padStart(2, '0')}.webp`
    const destPath = path.join(destFolderPath, destFileName)
    
    const success = await convertToWebP(sourcePath, destPath)
    if (success) {
      processed++
      
      // Get file sizes for comparison
      const sourceStats = await fs.stat(sourcePath)
      const destStats = await fs.stat(destPath)
      const reduction = Math.round((1 - destStats.size / sourceStats.size) * 100)
      
      console.log(`    ✓ ${destFileName} (${reduction}% smaller)`)
    }
  }
  
  console.log(`  Processed ${processed}/${filesToProcess.length} images`)
  
  // Copy first image as main category image (hero)
  if (processed > 0) {
    const heroSource = path.join(destFolderPath, `${destFolderName}-01.webp`)
    const heroDestName = `${destFolderName}.webp`
    const heroDest = path.join(DEST_DIR, heroDestName)
    
    try {
      await fs.copyFile(heroSource, heroDest)
      console.log(`    ✓ Hero image: ${heroDestName}`)
    } catch (error) {
      console.error(`    ✗ Failed to copy hero image:`, error.message)
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Service Image Processor')
  console.log('=' .repeat(50))
  console.log('')
  
  // Verify source directory exists
  try {
    await fs.access(SOURCE_DIR)
  } catch {
    console.error(`Source directory not found: ${SOURCE_DIR}`)
    process.exit(1)
  }
  
  // Process main folders
  console.log('📁 Processing main folders...\n')
  
  for (const [sourceFolder, destFolder] of Object.entries(FOLDER_MAPPING)) {
    const sourcePath = path.join(SOURCE_DIR, sourceFolder)
    console.log(`\n🔄 ${sourceFolder} → ${destFolder}`)
    
    try {
      await fs.access(sourcePath)
      await processFolder(sourcePath, destFolder)
    } catch {
      console.log(`  ⚠️  Folder not found: ${sourcePath}`)
    }
  }
  
  // Process Estetická medicína subfolders
  console.log('\n\n📁 Processing Estetická medicína...\n')
  
  for (const [sourceFolder, destFolder] of Object.entries(ESTETICKA_MEDICINA_MAPPING)) {
    const sourcePath = path.join(SOURCE_DIR, 'Estetická medicína', sourceFolder)
    console.log(`\n🔄 Estetická medicína/${sourceFolder} → ${destFolder}`)
    
    try {
      await fs.access(sourcePath)
      await processFolder(sourcePath, destFolder)
    } catch {
      console.log(`  ⚠️  Folder not found: ${sourcePath}`)
    }
  }
  
  // Process Kozmetika subfolders
  console.log('\n\n📁 Processing Kozmetika...\n')
  
  for (const [sourceFolder, destFolder] of Object.entries(KOZMETIKA_MAPPING)) {
    const sourcePath = path.join(SOURCE_DIR, 'Kozmetika', sourceFolder)
    console.log(`\n🔄 Kozmetika/${sourceFolder} → ${destFolder}`)
    
    try {
      await fs.access(sourcePath)
      await processFolder(sourcePath, destFolder)
    } catch {
      console.log(`  ⚠️  Folder not found: ${sourcePath}`)
    }
  }
  
  console.log('\n\n✅ Processing complete!')
  console.log(`   Images saved to: ${DEST_DIR}`)
}

main().catch(console.error)
