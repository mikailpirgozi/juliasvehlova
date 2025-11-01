import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FadeIn, Button } from '@/components/ui'
import { ServiceCard } from '@/components/services'
import { allServices, categoryMetadata, type ServiceCategory } from '@/lib/services'

interface CategoryPageProps {
  params: {
    category: string
  }
}

const categorySlugMap: Record<string, ServiceCategory> = {
  tvar: 'face',
  telo: 'body',
  energy: 'energy',
  'chakra-calibration': 'chakra_calibration',
  muzi: 'men',
}

export function generateStaticParams() {
  return Object.keys(categorySlugMap).map((slug) => ({
    category: slug,
  }))
}

export function generateMetadata({ params }: CategoryPageProps) {
  const categoryKey = categorySlugMap[params.category]
  if (!categoryKey) return {}

  const metadata = categoryMetadata[categoryKey]
  return {
    title: `${metadata.title} | Julia Esthetic Clinic`,
    description: metadata.description,
  }
}

export default function CategoryPage({ params }: CategoryPageProps): JSX.Element {
  const categoryKey = categorySlugMap[params.category]

  if (!categoryKey) {
    notFound()
  }

  const metadata = categoryMetadata[categoryKey]
  const services = allServices.filter((s) => s.category === categoryKey)

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-6xl">{metadata.icon}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{metadata.title}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{metadata.description}</p>
          </div>
        </FadeIn>

        {services.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {services.map((service, index) => (
                <FadeIn key={service.id} delay={index * 0.1}>
                  <ServiceCard service={service} />
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.6}>
              <div className="text-center p-8 bg-primary/5 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Zaujíma vás niektorá z týchto služieb?</h3>
                <p className="text-gray-700 mb-6">
                  Rezervujte si konzultáciu a radi vám poradíme s výberom najvhodnejšej procedúry.
                </p>
                <Link href="/rezervacia">
                  <Button variant="primary" size="lg">
                    Rezervovať konzultáciu
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </>
        ) : (
          <FadeIn>
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 mb-8">
                Služby v tejto kategórii sú práve v príprave.
              </p>
              <Link href="/sluzby">
                <Button variant="outline" size="lg">
                  ← Späť na všetky služby
                </Button>
              </Link>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  )
}

