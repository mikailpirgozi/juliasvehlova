import { Button } from '@/components/base/buttons/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold text-brand-600">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Stránka nebola nájdená
        </h1>
        <p className="mt-4 text-gray-500">
          Ospravedlňujeme sa, ale stránka ktorú hľadáte neexistuje alebo bola presunutá.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/" color="primary" size="md">
            Späť na hlavnú stránku
          </Button>
          <Button href="/sluzby" color="secondary" size="md">
            Pozrieť služby
          </Button>
        </div>

        <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm font-medium text-gray-900">Možno vás zaujmú</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button href="/cennik" color="tertiary" size="sm">
              Cenník
            </Button>
            <Button href="/o-nas" color="tertiary" size="sm">
              O nás
            </Button>
            <Button href="/blog" color="tertiary" size="sm">
              Blog
            </Button>
            <Button href="/rezervacia" color="tertiary" size="sm">
              Rezervácia
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
