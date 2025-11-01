import Link from 'next/link'

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-lg font-bold text-primary">Julia Estetic Clinic</h3>
            <p className="mt-2 text-sm text-gray-600">
              Profesionálne služby estetickej medicíny a permanentného make-upu v Malackách.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-gray-900">Rýchle odkazy</h4>
            <ul className="mt-4 space-y-2">
              {[
                { label: 'O nás', href: '#about' },
                { label: 'Služby', href: '#services' },
                { label: 'Blog', href: '/blog' },
                { label: 'Kontakt', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-600 hover:text-primary transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-gray-900">Kontakt</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <a href="tel:+421940123456" className="hover:text-primary transition">
                  +421 940 123 456
                </a>
              </li>
              <li>
                <a href="mailto:info@juliaesteticclinic.sk" className="hover:text-primary transition">
                  info@juliaesteticclinic.sk
                </a>
              </li>
              <li>
                <p>Malacky, Slovensko</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200" />

        {/* Copyright & Links */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} Julia Estetic Clinic. Všetky práva vyhradené.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-600 hover:text-primary transition">
              Ochrana osobných údajov
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-primary transition">
              Podmienky používania
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
