import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getMainCategoryBySlug,
  generateCategoryStaticParams,
  getCategoryServiceCount,
} from '@/lib/services-new'
import { CategoryPageClient } from './CategoryPageClient'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  return generateCategoryStaticParams()
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = getMainCategoryBySlug(categorySlug)

  if (!category) {
    return {
      title: 'Kategória nenájdená',
    }
  }

  const serviceCount = getCategoryServiceCount(category)

  return {
    title: `${category.title} | Julia Estetic Clinic`,
    description: category.description,
    openGraph: {
      title: `${category.title} | Julia Estetic Clinic`,
      description: category.description,
      images: [category.image],
    },
    keywords: [
      category.title,
      'Julia Estetic Clinic',
      'Malacky',
      'estetická medicína',
      `${serviceCount} služieb`,
    ],
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params
  const category = getMainCategoryBySlug(categorySlug)

  if (!category) {
    notFound()
  }

  return <CategoryPageClient category={category} />
}
