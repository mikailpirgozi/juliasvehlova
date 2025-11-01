import { LinkButton } from '@/components/ui'

export default function NotFound(): JSX.Element {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-accent-rose via-neutral-cream to-white px-4">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-2xl text-center">
        <div className="mb-12">
          <div className="mb-6 inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent-gold/20 text-6xl shadow-xl">
            😔
          </div>
          <h1 className="mb-4 font-serif text-9xl font-bold bg-gradient-to-r from-primary to-accent-gold bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="mb-6 text-4xl font-bold text-primary-dark">
            Stránka nebola nájdená
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Ospravedlňujeme sa, ale stránka ktorú hľadáte neexistuje alebo bola presunutá.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-12">
          <LinkButton href="/" variant="primary" size="lg">
            ← Späť na hlavnú stránku
          </LinkButton>
          <LinkButton href="/sluzby" variant="outline" size="lg">
            Pozrieť služby
          </LinkButton>
        </div>

        <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-xl border border-primary/10">
          <p className="mb-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Možno vás zaujmú
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <LinkButton href="/cennik" variant="secondary" size="sm">
              💰 Cenník
            </LinkButton>
            <LinkButton href="/o-nas" variant="secondary" size="sm">
              👋 O nás
            </LinkButton>
            <LinkButton href="/blog" variant="secondary" size="sm">
              📝 Blog
            </LinkButton>
            <LinkButton href="/rezervacia" variant="secondary" size="sm">
              📅 Rezervácia
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}

