import { ContactForm } from '@/components/contact'

export function ContactSection() {
  const contactInfo = [
    {
      icon: '📞',
      title: 'Telefón',
      primary: '+421 940 123 456',
      secondary: 'Po - Pia: 9:00 - 18:00',
      href: 'tel:+421940123456',
    },
    {
      icon: '📧',
      title: 'Email',
      primary: 'info@juliaesteticclinic.sk',
      secondary: 'Odpovieme do 24 hodín',
      href: 'mailto:info@juliaesteticclinic.sk',
    },
    {
      icon: '📍',
      title: 'Adresa',
      primary: 'Malacky, Slovensko',
      secondary: 'Presnú adresu pošleme po rezervácii',
      href: null,
    },
  ]

  return (
    <section id="kontakt" className="relative overflow-hidden bg-gradient-to-b from-white via-neutral-cream to-accent-rose px-4 py-20">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-gold">
            Kontakt
          </p>
          <h2 className="mb-4 font-serif text-5xl font-bold text-primary-dark">
            Napíšte nám
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Máte otázku alebo chcete rezervovať termín? Sme tu pre vás a radi vám pomôžeme
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left - Contact Form */}
          <div>
            <div className="rounded-3xl border border-primary/20 bg-white/95 backdrop-blur-sm p-8 shadow-2xl lg:p-10">
              <h3 className="mb-2 font-serif text-3xl font-bold text-primary-dark">
                Kontaktný formulár
              </h3>
              <p className="mb-8 text-gray-600">
                Vyplňte formulár a ozveme sa vám do 24 hodín
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Right - Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-white/95 backdrop-blur-sm p-6 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-gold/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent-gold/20 text-3xl shadow-md transition-transform duration-500 group-hover:scale-110">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 font-semibold text-gray-900">{info.title}</h4>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="block font-medium text-primary transition hover:text-primary-dark"
                        >
                          {info.primary}
                        </a>
                      ) : (
                        <p className="font-medium text-gray-900">{info.primary}</p>
                      )}
                      <p className="mt-1 text-sm text-gray-600">{info.secondary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Opening Hours */}
            <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-white/95 backdrop-blur-sm p-8 shadow-lg">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent-gold to-primary" />
              
              <h4 className="mb-6 font-serif text-2xl font-bold text-primary-dark flex items-center gap-2">
                <span className="text-3xl">🕐</span>
                Otváracie hodiny
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Pondelok - Piatok</span>
                  <span className="font-semibold text-primary-dark">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Sobota</span>
                  <span className="font-semibold text-primary-dark">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Nedeľa</span>
                  <span className="font-semibold text-gray-500">Zatvorené</span>
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent-gold/10 p-4">
                <p className="text-xs text-gray-700 flex items-center gap-2">
                  <span className="text-lg">ℹ️</span>
                  <span>Termíny len po objednaní vopred</span>
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary to-primary-dark backdrop-blur-sm p-8 shadow-lg text-white">
              <h4 className="mb-6 font-serif text-2xl font-bold">Sledujte nás</h4>
              <p className="mb-6 text-white/90">
                Inšpirujte sa našimi výsledkami a zostaňte v obraze o novinkách
              </p>
              <div className="flex gap-4">
                {[
                  { icon: '📷', label: 'Instagram', href: 'https://instagram.com' },
                  { icon: '📘', label: 'Facebook', href: 'https://facebook.com' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-2xl transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-lg"
                    aria-label={social.label}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

