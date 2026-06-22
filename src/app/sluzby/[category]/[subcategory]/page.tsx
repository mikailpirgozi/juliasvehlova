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
import { buildServiceMetadata } from '@/lib/seo'
import { DirectServiceSchema, SubcategoryBreadcrumbSchema } from '@/components/seo/page-schemas'
import { ServiceFaq } from '@/components/services/ServiceFaq'
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
      return buildServiceMetadata({
        title: `${service.name} – ${category.title}`,
        description:
          service.shortDescription ||
          `${service.name} – ${durationPart}${service.price} v Julia Estetic Clinic Malacky. ${category.title}, profesionálny prístup a bezpečnosť.`,
        path: `/sluzby/${category.slug}/${service.slug}`,
        keywords: [service.name, category.title, `${service.name} cena`, `${service.name} malacky`],
        image: category.image,
        imageAlt: service.name,
      })
    }
  }

  const result = getSubcategoryBySlug(categorySlug, subcategorySlug)

  if (!result) {
    return {
      title: 'Kategória nenájdená',
    }
  }

  const { category: cat, subcategory } = result

  return buildServiceMetadata({
    title: `${subcategory.title} – ${cat.title}`,
    description:
      subcategory.description ||
      `${subcategory.title} v Julia Estetic Clinic Malacky – ${subcategory.services.length} služieb. Profesionálny prístup a bezpečnosť.`,
    path: `/sluzby/${cat.slug}/${subcategory.slug}`,
    keywords: [
      subcategory.title,
      cat.title,
      `${subcategory.title} malacky`,
      `${subcategory.title} cena`,
      ...subcategory.services.slice(0, 5).map((s) => s.name),
    ],
    image: subcategory.image ?? cat.image,
    imageAlt: subcategory.title,
  })
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params
  
  // First check if this might be a direct service (category without subcategories)
  const directServiceResult = getDirectServiceBySlug(categorySlug, subcategorySlug)
  if (directServiceResult) {
    return (
      <>
        <DirectServiceSchema
          category={directServiceResult.category}
          service={directServiceResult.service}
        />
        <DirectServicePageClient
          category={directServiceResult.category}
          service={directServiceResult.service}
        />
        <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <ServiceFaq
              service={directServiceResult.service}
              category={directServiceResult.category}
            />
          </div>
        </section>
      </>
    )
  }

  const result = getSubcategoryBySlug(categorySlug, subcategorySlug)

  if (!result) {
    notFound()
  }

  return (
    <>
      <SubcategoryBreadcrumbSchema category={result.category} subcategory={result.subcategory} />
      <SubcategoryPageClient category={result.category} subcategory={result.subcategory} />
    </>
  )
}
