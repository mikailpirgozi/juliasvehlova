/**
 * Page-level JSON-LD composition for Julia Estetic Clinic.
 *
 * Wires the primitive schema components (Breadcrumb / Service / MedicalProcedure
 * / Article) into ready-to-drop server components for each dynamic route. All
 * are plain SSR <script type="application/ld+json"> so the markup is in the
 * initial HTML for Google AND AI crawlers (Perplexity / ChatGPT).
 */
import {
  BreadcrumbSchema,
  ServiceSchema,
  MedicalProcedureSchema,
  ArticleSchema,
  SpeakableSchema,
  type BreadcrumbItem,
} from './schema-org'
import { BASE_URL, COMPANY_NAME } from '@/lib/seo/constants'
import type { MainCategory, Subcategory, SimpleService } from '@/lib/services-new'

/** Categories whose treatments are genuinely medical/injectable (performed by/under a physician). */
const MEDICAL_CATEGORY_SLUGS = new Set(['esteticka-medicina'])

/** Extract the first integer from a price string like "315 €" → 315. */
export function parsePrice(price: string | undefined): number | undefined {
  if (!price) return undefined
  const match = price.match(/\d+/)
  return match ? parseInt(match[0], 10) : undefined
}

function serviceDescription(service: SimpleService): string {
  return (
    service.shortDescription ||
    service.fullDescription ||
    `${service.name} v Julia Estetic Clinic Malacky.`
  )
}

/**
 * Schema for a 3-level service detail page: /sluzby/[category]/[subcategory]/[service]
 */
export function ServiceDetailSchema({
  category,
  subcategory,
  service,
}: {
  category: MainCategory
  subcategory: Subcategory
  service: SimpleService
}) {
  const url = `${BASE_URL}/sluzby/${category.slug}/${subcategory.slug}/${service.slug}`
  const description = serviceDescription(service)
  const price = parsePrice(service.price)
  const isMedical = MEDICAL_CATEGORY_SLUGS.has(category.slug)

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Domov', url: BASE_URL },
    { name: 'Služby', url: `${BASE_URL}/sluzby` },
    { name: category.title, url: `${BASE_URL}/sluzby/${category.slug}` },
    { name: subcategory.title, url: `${BASE_URL}/sluzby/${category.slug}/${subcategory.slug}` },
    { name: service.name, url },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name={service.name}
        description={description}
        url={url}
        image={category.image}
        price={price}
        duration={service.duration}
        category={category.title}
      />
      {isMedical && (
        <MedicalProcedureSchema
          name={service.name}
          description={description}
          url={url}
          image={category.image}
          procedureType="NoninvasiveProcedure"
        />
      )}
      <SpeakableSchema url={url} />
    </>
  )
}

/**
 * Schema for a direct service page (category without subcategories):
 * /sluzby/[category]/[service]
 */
export function DirectServiceSchema({
  category,
  service,
}: {
  category: MainCategory
  service: SimpleService
}) {
  const url = `${BASE_URL}/sluzby/${category.slug}/${service.slug}`
  const description = serviceDescription(service)
  const price = parsePrice(service.price)
  const isMedical = MEDICAL_CATEGORY_SLUGS.has(category.slug)

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Domov', url: BASE_URL },
    { name: 'Služby', url: `${BASE_URL}/sluzby` },
    { name: category.title, url: `${BASE_URL}/sluzby/${category.slug}` },
    { name: service.name, url },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name={service.name}
        description={description}
        url={url}
        image={category.image}
        price={price}
        duration={service.duration}
        category={category.title}
      />
      {isMedical && (
        <MedicalProcedureSchema
          name={service.name}
          description={description}
          url={url}
          image={category.image}
          procedureType="NoninvasiveProcedure"
        />
      )}
      <SpeakableSchema url={url} />
    </>
  )
}

/**
 * Breadcrumb schema for a category listing page: /sluzby/[category]
 */
export function CategoryBreadcrumbSchema({ category }: { category: MainCategory }) {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Domov', url: BASE_URL },
    { name: 'Služby', url: `${BASE_URL}/sluzby` },
    { name: category.title, url: `${BASE_URL}/sluzby/${category.slug}` },
  ]
  return <BreadcrumbSchema items={breadcrumbs} />
}

/**
 * Breadcrumb schema for a subcategory listing page: /sluzby/[category]/[subcategory]
 */
export function SubcategoryBreadcrumbSchema({
  category,
  subcategory,
}: {
  category: MainCategory
  subcategory: Subcategory
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Domov', url: BASE_URL },
    { name: 'Služby', url: `${BASE_URL}/sluzby` },
    { name: category.title, url: `${BASE_URL}/sluzby/${category.slug}` },
    { name: subcategory.title, url: `${BASE_URL}/sluzby/${category.slug}/${subcategory.slug}` },
  ]
  return <BreadcrumbSchema items={breadcrumbs} />
}

// =============================================================================
// ABOUT / TEAM SCHEMA (E-E-A-T)
// =============================================================================

/**
 * Key team members surfaced as schema.org Person entities. This is the YMYL
 * E-E-A-T signal: it ties named, credentialed people (incl. the medical doctor)
 * to the clinic so search + AI engines can attribute expertise/authority.
 */
const TEAM = [
  {
    name: 'Júlia Švehlová',
    jobTitle: 'Zakladateľka a estetička',
    image: '/images/team/julia-svehlova.png',
    description:
      'Zakladateľka Julia Estetic Clinic s viac než 28 rokmi praxe v kozmetológii, vizážistike, permanentnom make-upe a estetickej starostlivosti.',
  },
  {
    name: 'MUDr. Yasmin Betáková',
    jobTitle: 'Estetická lekárka',
    image: '/images/team/yasmin-betakova.png',
    physician: true,
    description:
      'Lekárka so zázemím v psychiatrii, ktorá v Julia Estetic Clinic vykonáva injekčné estetické zákroky (botulotoxín, výplne kyselinou hyalurónovou, biorevitalizácia).',
  },
  {
    name: 'Daria Shmuliak',
    jobTitle: 'Kozmetička',
    image: '/images/team/daria-shmuliak.png',
    description:
      'Kozmetička s medzinárodnými skúsenosťami, špecializuje sa na liečbu problematickej pleti a akné.',
  },
  {
    name: 'Bc. Tatiana Kubovič',
    jobTitle: 'Fyzioterapeutka a piercerka',
    image: '/images/team/tatiana-kubovic.png',
    description:
      'Fyzioterapeutka a piercerka prepájajúca fyzioterapiu s masážnymi a regeneračnými technikami.',
  },
] as const

/**
 * About page schema: BreadcrumbList + a Person/Physician entity per key team
 * member, each linked to the clinic Organization.
 */
export function AboutTeamSchema() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Domov', url: BASE_URL },
    { name: 'O nás', url: `${BASE_URL}/o-nas` },
  ]

  const people = TEAM.map((member) => ({
    '@context': 'https://schema.org',
    '@type': 'physician' in member && member.physician ? ['Person', 'Physician'] : 'Person',
    name: member.name,
    jobTitle: member.jobTitle,
    description: member.description,
    image: `${BASE_URL}${member.image}`,
    url: `${BASE_URL}/o-nas`,
    worksFor: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: COMPANY_NAME,
    },
  }))

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      {people.map((person, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
      ))}
    </>
  )
}

/**
 * Schema for a blog post: Article + BreadcrumbList.
 */
export function BlogPostSchema({
  title,
  description,
  slug,
  image,
  datePublished,
  dateModified,
  author,
  reviewedBy,
}: {
  title: string
  description: string
  slug: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: string
  reviewedBy?: string
}) {
  const url = `${BASE_URL}/blog/${slug}`
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Domov', url: BASE_URL },
    { name: 'Blog', url: `${BASE_URL}/blog` },
    { name: title, url },
  ]
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema
        headline={title}
        description={description}
        url={url}
        image={image}
        datePublished={datePublished}
        dateModified={dateModified}
        author={author}
        reviewedBy={reviewedBy}
      />
    </>
  )
}
