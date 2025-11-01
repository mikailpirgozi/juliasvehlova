import Link from 'next/link'

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'O nás', href: '/o-nas', icon: '👋' },
    { label: 'Služby', href: '/sluzby', icon: '✨' },
    { label: 'Cenník', href: '/cennik', icon: '💰' },
    { label: 'Blog', href: '/blog', icon: '📝' },
    { label: 'Kontakt', href: '#kontakt', icon: '📞' },
  ]

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com', icon: '📷' },
    { label: 'Facebook', href: 'https://facebook.com', icon: '📘' },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-primary/10 bg-gradient-to-b from-neutral-cream to-white">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent-gold shadow-lg">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-primary-dark">
                  Julia Estetic Clinic
                </h3>
                <p className="text-xs text-gray-500 font-medium">Estetická medicína</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-md">
              Profesionálne služby estetickej medicíny a permanentného make-upu v Malackách. 
              Vaša krása je naša vášeň.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent-gold/20 text-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:from-primary hover:to-accent-gold"
                  aria-label={social.label}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 font-serif text-lg font-bold text-primary-dark">
              Rýchle odkazy
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-dark"
                  >
                    <span className="text-lg transition-transform duration-300 group-hover:scale-125">
                      {link.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 font-serif text-lg font-bold text-primary-dark">Kontakt</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="tel:+421940123456"
                  className="group flex items-center gap-3 text-gray-600 transition-colors hover:text-primary-dark"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent-gold/20 text-xl transition-transform duration-300 group-hover:scale-110">
                    📞
                  </div>
                  <span>+421 940 123 456</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@juliaesteticclinic.sk"
                  className="group flex items-center gap-3 text-gray-600 transition-colors hover:text-primary-dark"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent-gold/20 text-xl transition-transform duration-300 group-hover:scale-110">
                    📧
                  </div>
                  <span className="break-all">info@juliaesteticclinic.sk</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent-gold/20 text-xl">
                    📍
                  </div>
                  <span>Malacky, Slovensko</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💎</span>
            <p className="text-sm text-gray-600">
              &copy; {currentYear} Julia Estetic Clinic. Všetky práva vyhradené.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <Link
              href="/ochrana-udajov"
              className="text-gray-600 transition-colors hover:text-primary-dark"
            >
              Ochrana osobných údajov
            </Link>
            <Link
              href="/obchodne-podmienky"
              className="text-gray-600 transition-colors hover:text-primary-dark"
            >
              Obchodné podmienky
            </Link>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-accent-gold/10 px-6 py-3 text-sm">
            <span className="text-xl">🏆</span>
            <span className="font-medium text-gray-700">
              Certifikovaná klinika estetickej medicíny
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
