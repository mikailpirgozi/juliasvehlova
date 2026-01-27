/**
 * Breadcrumbs Component with JSON-LD Schema
 * Visual breadcrumb navigation with integrated structured data
 */

import Link from 'next/link'
import { ChevronRight, Home02 } from '@untitledui/icons'
import { BreadcrumbSchema, type BreadcrumbItem } from './schema-org'
import { BASE_URL } from '@/lib/seo/constants'

export interface BreadcrumbProps {
  items: Array<{
    label: string
    href?: string
  }>
  /** Show home icon/link as first item */
  showHome?: boolean
  /** Custom class name for styling */
  className?: string
}

/**
 * Generate breadcrumb items with full URLs for schema
 */
function generateBreadcrumbSchemaItems(
  items: BreadcrumbProps['items'],
  showHome: boolean
): BreadcrumbItem[] {
  const schemaItems: BreadcrumbItem[] = []

  if (showHome) {
    schemaItems.push({
      name: 'Domov',
      url: BASE_URL,
    })
  }

  items.forEach((item) => {
    schemaItems.push({
      name: item.label,
      url: item.href ? `${BASE_URL}${item.href}` : BASE_URL,
    })
  })

  return schemaItems
}

/**
 * Breadcrumbs - Visual navigation with JSON-LD schema
 */
export function Breadcrumbs({
  items,
  showHome = true,
  className = '',
}: BreadcrumbProps) {
  const schemaItems = generateBreadcrumbSchemaItems(items, showHome)

  return (
    <>
      {/* JSON-LD Schema */}
      <BreadcrumbSchema items={schemaItems} />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-sm ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {/* Home */}
          {showHome && (
            <li className="flex items-center">
              <Link
                href="/"
                className="flex items-center text-gray-500 transition-colors hover:text-brand-600"
                aria-label="Domov"
              >
                <Home02 className="h-4 w-4" />
              </Link>
              <ChevronRight className="ml-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </li>
          )}

          {/* Breadcrumb Items */}
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={item.label} className="flex items-center">
                {isLast || !item.href ? (
                  <span
                    className="font-medium text-gray-900"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="text-gray-500 transition-colors hover:text-brand-600"
                    >
                      {item.label}
                    </Link>
                    <ChevronRight
                      className="ml-1.5 h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

/**
 * Helper function to generate breadcrumbs from URL path
 */
export function generateBreadcrumbsFromPath(
  pathname: string,
  labels?: Record<string, string>
): BreadcrumbProps['items'] {
  const segments = pathname.split('/').filter(Boolean)
  const items: BreadcrumbProps['items'] = []

  let currentPath = ''

  const defaultLabels: Record<string, string> = {
    sluzby: 'Služby',
    'o-nas': 'O nás',
    cennik: 'Cenník',
    rezervacia: 'Rezervácia',
    blog: 'Blog',
    akcie: 'Akcie',
    kontakt: 'Kontakt',
    'ochrana-udajov': 'Ochrana údajov',
    'obchodne-podmienky': 'Obchodné podmienky',
    kategoria: 'Kategória',
    ...labels,
  }

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1

    const label =
      defaultLabels[segment] ||
      // Capitalize first letter and replace hyphens with spaces
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')

    items.push({
      label,
      href: isLast ? undefined : currentPath,
    })
  })

  return items
}
