import { Button } from '@/components/ui'

export function HeroSection(): JSX.Element {
  return (
    <section className="relative min-h-[70vh] bg-gradient-to-b from-primary/10 to-accent-gold/5 px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 font-serif text-5xl font-bold text-primary md:text-6xl">
          Vaša Krása v Skúsených Rukách
        </h1>

        <p className="mb-8 text-xl text-gray-700">
          Komplexné služby estetickej medicíny, permanentného make-upu a profesionálneho líčenia.
          Viac ako 10 rokov skúseností a tisícky spokojných klientok.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button variant="primary" size="lg" className="text-base">
            Rezervovať konzultáciu
          </Button>
          <Button variant="outline" size="lg" className="text-base">
            Pozrite si naše služby
          </Button>
        </div>

        <p className="mt-12 text-sm text-gray-600">
          Certifikovaná príslušníčka v odbore estetická medicína | Bezpečné a overené metódy
        </p>
      </div>
    </section>
  )
}
