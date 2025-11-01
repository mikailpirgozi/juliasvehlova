import { Card, CardTitle, CardDescription } from '@/components/ui'

const services = [
  {
    title: 'Botulotoxín',
    description: 'Redukcia vrások a jemných línií s prírodzeným výsledkom.',
    icon: '✨',
  },
  {
    title: 'Kyselina hyalurónová',
    description: 'Hydratácia a zväčšenie pier s elegantným účinkom.',
    icon: '💧',
  },
  {
    title: 'Permanentný make-up',
    description: 'Trvalý make-up pier, obočia a očných liniek.',
    icon: '💄',
  },
  {
    title: 'Laserová epilácia',
    description: 'Bezpečná a účinná odstránenie nežiaducich chĺpkov.',
    icon: '✨',
  },
  {
    title: 'Procedúry na tvár',
    description: 'Zdravie a lesk vašej kože s modernými metódami.',
    icon: '🌟',
  },
  {
    title: 'Liposukcia',
    description: 'Modelovanie postávy s bezpečným prístupom.',
    icon: '💪',
  },
]

export function ServicesSection(): JSX.Element {
  return (
    <section id="services" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-primary">Naše Služby</h2>
          <p className="text-lg text-gray-600">
            Ponúkame širokú paletu estetických služieb tailored na vaše potreby
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} hoverable className="flex flex-col">
              <div className="mb-4 text-4xl">{service.icon}</div>
              <CardTitle className="mb-2">{service.title}</CardTitle>
              <CardDescription className="text-base">{service.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
