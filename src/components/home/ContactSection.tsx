import { ContactForm } from '@/components/contact'

export function ContactSection(): JSX.Element {
  return (
    <section id="kontakt" className="bg-gradient-to-b from-white to-neutral-cream px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent-gold">
            Kontakt
          </p>
          <h2 className="mb-4 font-serif text-4xl font-bold text-primary">Napíšte nám</h2>
          <p className="text-lg text-gray-600">
            Máte otázku alebo chcete rezervovať termín? Sme tu pre vás.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left - Contact Form */}
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="mb-6 font-serif text-2xl font-bold text-primary">Kontaktný formulár</h3>
            <ContactForm />
          </div>

          {/* Right - Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Phone */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    📞
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium text-gray-900">Telefón</h4>
                    <a
                      href="tel:+421940123456"
                      className="text-primary transition hover:text-primary-dark"
                    >
                      +421 940 123 456
                    </a>
                    <p className="mt-1 text-sm text-gray-600">Po - Pia: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    📧
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium text-gray-900">Email</h4>
                    <a
                      href="mailto:info@juliaesteticclinic.sk"
                      className="text-primary transition hover:text-primary-dark"
                    >
                      info@juliaesteticclinic.sk
                    </a>
                    <p className="mt-1 text-sm text-gray-600">Odpovieme do 24 hodín</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl">
                    📍
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium text-gray-900">Adresa</h4>
                    <p className="text-gray-700">Malacky, Slovensko</p>
                    <p className="mt-1 text-sm text-gray-600">Presnú adresu pošleme po rezervácii</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="rounded-lg border border-accent-gold/20 bg-white p-6 shadow-sm">
              <h4 className="mb-4 font-serif text-xl font-bold text-primary">Otváracie hodiny</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pondelok - Piatok:</span>
                  <span className="font-medium text-gray-900">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sobota:</span>
                  <span className="font-medium text-gray-900">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nedeľa:</span>
                  <span className="font-medium text-gray-900">Zatvorené</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                * Termíny len po objednaní vopred
              </p>
            </div>

            {/* Social */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h4 className="mb-4 font-medium text-gray-900">Sledujte nás</h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-white"
                  aria-label="Instagram"
                >
                  📷
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-white"
                  aria-label="Facebook"
                >
                  📘
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

