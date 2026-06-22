import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getSubcategoryBySlug,
  generateSubcategoryStaticParams,
  getMainCategoryBySlug,
  categoryHasSubcategories,
  getDirectServiceBySlug,
  getAllMainCategories,
} from '@/lib/services-new'
import { SubcategoryPageClient } from './SubcategoryPageClient'
import { DirectServicePageClient } from './DirectServicePageClient'

interface SubcategoryPageProps {
  params: Promise<{
    category: string
    subcategory: string
  }>
}

export async function generateStaticParams() {
  // Get subcategory params
  const subcategoryParams = generateSubcategoryStaticParams()
  
  // Add direct service params (for categories without subcategories)
  const directServiceParams: { category: string; subcategory: string }[] = []
  const allCategories = getAllMainCategories()
  
  allCategories.forEach((category) => {
    if (!categoryHasSubcategories(category) && category.services) {
      category.services.forEach((service) => {
        directServiceParams.push({
          category: category.slug,
          subcategory: service.slug,
        })
      })
    }
  })
  
  return [...subcategoryParams, ...directServiceParams]
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug } = await params
  
  // First check if this might be a direct service (category without subcategories)
  const category = getMainCategoryBySlug(categorySlug)
  if (category && !categoryHasSubcategories(category)) {
    const service = category.services?.find((s) => s.slug === subcategorySlug)
    if (service) {
      const durationPart = service.duration ? `${service.duration}, ` : ''
      return {
        title: `${service.name} | ${category.title} | Julia Estetic Clinic`,
        description: `${service.name} - ${durationPart}${service.price}. ${category.title} v Julia Estetic Clinic Malacky.`,
        openGraph: {
          title: `${service.name} | Julia Estetic Clinic`,
          description: `${service.name} - ${durationPart}${service.price}`,
          ...(category.image ? { images: [category.image] } : {}),
        },
        keywords: [service.name, category.title, 'Julia Estetic Clinic', 'Malacky'],
      }
    }
  }

  const result = getSubcategoryBySlug(categorySlug, subcategorySlug)

  if (!result) {
    return {
      title: 'Kategória nenájdená',
    }
  }

  const { category: cat, subcategory } = result

  return {
    title: `${subcategory.title} | ${cat.title} | Julia Estetic Clinic`,
    description:
      subcategory.description ||
      `${subcategory.title} - ${subcategory.services.length} služieb. Julia Estetic Clinic Malacky.`,
    openGraph: {
      title: `${subcategory.title} | ${cat.title} | Julia Estetic Clinic`,
      description:
        subcategory.description ||
        `${subcategory.title} - ${subcategory.services.length} služieb.`,
      images: [subcategory.image ?? cat.image],
    },
    keywords: [
      subcategory.title,
      cat.title,
      'Julia Estetic Clinic',
      'Malacky',
      ...subcategory.services.slice(0, 5).map((s) => s.name),
    ],
  }
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params
  
  // First check if this might be a direct service (category without subcategories)
  const directServiceResult = getDirectServiceBySlug(categorySlug, subcategorySlug)
  if (directServiceResult) {
    return (
      <DirectServicePageClient
        category={directServiceResult.category}
        service={directServiceResult.service}
      />
    )
  }

  const result = getSubcategoryBySlug(categorySlug, subcategorySlug)

  if (!result) {
    notFound()
  }

  return <SubcategoryPageClient category={result.category} subcategory={result.subcategory} />
}
