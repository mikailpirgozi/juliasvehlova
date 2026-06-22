import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getMainCategoryBySlug,
  generateCategoryStaticParams,
  getCategoryServiceCount,
} from '@/lib/services-new'
import { buildServiceMetadata } from '@/lib/seo'
import { CategoryBreadcrumbSchema } from '@/components/seo/page-schemas'
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
  const description =
    category.description ||
    `${category.title} v Julia Estetic Clinic Malacky – ${serviceCount} služieb. Profesionálny prístup, bezpečnosť a individuálny prístup ku každému klientovi.`

  return buildServiceMetadata({
    title: category.title,
    description,
    path: `/sluzby/${category.slug}`,
    keywords: [
      category.title,
      `${category.title} malacky`,
      `${category.title} cena`,
      'estetická medicína',
    ],
    image: category.image,
    imageAlt: category.title,
  })
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params
  const category = getMainCategoryBySlug(categorySlug)

  if (!category) {
    notFound()
  }

  return (
    <>
      <CategoryBreadcrumbSchema category={category} />
      <CategoryPageClient category={category} />
    </>
  )
}
