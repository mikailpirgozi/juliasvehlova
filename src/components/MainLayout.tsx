import { Header, Footer, CookieConsent } from '@/components/layout'
import { ToasterProvider } from '@/components/providers/ToasterProvider'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
      <ToasterProvider />
    </div>
  )
}
