/**
 * Service Images Helper
 * Maps service categories and subcategories to their image paths
 */

// Available image folders and their image counts
const IMAGE_FOLDERS: Record<string, number> = {
  'biorevitalizacia-pleti': 12,
  'botulotoxin': 12,
  'chakra-calibration': 2,
  'kozmeticke-osetrenia': 12,
  'laserova-epilacia': 12,
  'masaze-maderoterapia': 12,
  'permanentny-makeup': 12,
  'piercing': 10,
  'profesionalne-licenie': 12,
  'tetovanie': 12,
  'vyplne-kyselinou-hyaluronovou': 12,
}

// Map subcategory slugs to image folder names
const SUBCATEGORY_TO_IMAGE_FOLDER: Record<string, string> = {
  // Estetická medicína
  'biorevitalizacia-pleti': 'biorevitalizacia-pleti',
  'botulotoxin': 'botulotoxin',
  'vyplne-kyselinou-hyaluronovou': 'vyplne-kyselinou-hyaluronovou',
  'injekcna-lipolyza': 'biorevitalizacia-pleti', // fallback
  'konzultacia': 'biorevitalizacia-pleti', // fallback
  'liftingove-nite': 'botulotoxin', // fallback
  
  // Kozmetika
  'kozmeticke-osetrenia': 'kozmeticke-osetrenia',
  'permanentny-makeup': 'permanentny-makeup',
  'liecba-akne': 'kozmeticke-osetrenia', // fallback
  'prevencia-starnutia': 'kozmeticke-osetrenia', // fallback
  'pristrojove-osetrenia': 'kozmeticke-osetrenia', // fallback
  'doplnkove-kozmeticke-sluzby': 'permanentny-makeup',
  
  // Regenerácia tela
  'masaze': 'masaze-maderoterapia',
  'maderoterapia': 'masaze-maderoterapia',
  
  // Laserová epilácia
  'laserova-epilacia-damy': 'laserova-epilacia',
  'laserova-epilacia-pani': 'laserova-epilacia',
  
  // Piercing
  'microdermal': 'piercing',
  'piercing-trupu': 'piercing',
  'piercing-tvare': 'piercing',
  'piercing-usnej-chrupavky': 'piercing',
  'piercing-usneho-laloka': 'piercing',
  'skratenie-sperku-alebo-vymena': 'piercing',
}

// Map category slugs to image folder names (for categories without subcategories)
const CATEGORY_TO_IMAGE_FOLDER: Record<string, string> = {
  'esteticka-medicina': 'biorevitalizacia-pleti',
  'kozmetika': 'kozmeticke-osetrenia',
  'laserova-epilacia': 'laserova-epilacia',
  'regeneracia-tela': 'masaze-maderoterapia',
  'piercing': 'piercing',
  'profesionalne-licenie': 'profesionalne-licenie',
  'tetovanie': 'tetovanie',
  'vikendove-vip-sluzby': 'chakra-calibration',
  'chakra-calibration': 'chakra-calibration',
}

/**
 * Get hero image for a subcategory
 */
export function getSubcategoryHeroImage(subcategorySlug: string): string {
  const folder = SUBCATEGORY_TO_IMAGE_FOLDER[subcategorySlug]
  if (folder && IMAGE_FOLDERS[folder]) {
    return `/images/services/${folder}.webp`
  }
  // Fallback to default
  return '/images/services/kozmeticke-osetrenia.webp'
}

/**
 * Get hero image for a category (for categories without subcategories)
 */
export function getCategoryHeroImage(categorySlug: string): string {
  const folder = CATEGORY_TO_IMAGE_FOLDER[categorySlug]
  if (folder && IMAGE_FOLDERS[folder]) {
    return `/images/services/${folder}.webp`
  }
  // Fallback
  return '/images/services/kozmeticke-osetrenia.webp'
}

/**
 * Get gallery images for a subcategory/category
 */
export function getServiceGalleryImages(slug: string, count: number = 6): string[] {
  // Try subcategory first, then category
  const folder = SUBCATEGORY_TO_IMAGE_FOLDER[slug] || CATEGORY_TO_IMAGE_FOLDER[slug]
  
  if (!folder || !IMAGE_FOLDERS[folder]) {
    return []
  }
  
  const maxImages = IMAGE_FOLDERS[folder]
  const imagesToReturn = Math.min(count, maxImages)
  
  const images: string[] = []
  for (let i = 1; i <= imagesToReturn; i++) {
    images.push(`/images/services/${folder}/${folder}-${i.toString().padStart(2, '0')}.webp`)
  }
  
  return images
}

/**
 * Get a single image from the gallery (useful for service cards)
 */
export function getServiceImage(slug: string, index: number = 1): string {
  const folder = SUBCATEGORY_TO_IMAGE_FOLDER[slug] || CATEGORY_TO_IMAGE_FOLDER[slug]
  
  if (!folder || !IMAGE_FOLDERS[folder]) {
    return `/images/services/${folder || 'kozmeticke-osetrenia'}.webp`
  }
  
  const maxImages = IMAGE_FOLDERS[folder]
  const safeIndex = ((index - 1) % maxImages) + 1
  
  return `/images/services/${folder}/${folder}-${safeIndex.toString().padStart(2, '0')}.webp`
}

/**
 * Check if a slug has dedicated images
 */
export function hasServiceImages(slug: string): boolean {
  const folder = SUBCATEGORY_TO_IMAGE_FOLDER[slug] || CATEGORY_TO_IMAGE_FOLDER[slug]
  return !!folder && !!IMAGE_FOLDERS[folder]
}
