import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { FAQSchema } from '@/components/seo/schema-org'
import { PageBreadcrumbSchema } from '@/components/seo/page-schemas'
import { GiftVouchersPageClient } from './GiftVouchersPageClient'
import { giftVoucherFaqItems } from './faq-data'

export const metadata: Metadata = generatePageMetadata('giftVouchers')

export default function GiftVouchersPage() {
  return (
    <>
      <PageBreadcrumbSchema name="Darčekové poukážky" path="/darcekove-poukazky" />
      <FAQSchema faqs={giftVoucherFaqItems} />
      <GiftVouchersPageClient />
    </>
  )
}
