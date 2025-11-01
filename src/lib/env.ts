import { z } from 'zod'

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  CONTACT_EMAIL: z.string().email('CONTACT_EMAIL must be a valid email'),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_BOOKIO_WIDGET_URL: z.string().url().optional(),
})

export const env = envSchema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_BOOKIO_WIDGET_URL: process.env.NEXT_PUBLIC_BOOKIO_WIDGET_URL,
})
