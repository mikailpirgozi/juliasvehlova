import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { GiftVouchersPageClient } from './GiftVouchersPageClient'

export const metadata: Metadata = generatePageMetadata('giftVouchers')

export default function GiftVouchersPage() {
  return <GiftVouchersPageClient />
}
