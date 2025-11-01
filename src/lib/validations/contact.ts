import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Meno musí mať aspoň 2 znaky')
    .max(100, 'Meno môže mať maximálne 100 znakov'),
  email: z.string().email('Neplatná emailová adresa'),
  phone: z
    .string()
    .regex(/^(\+421|0)[0-9]{9}$/, 'Neplatné telefónne číslo (formát: +421912345678 alebo 0912345678)')
    .optional()
    .or(z.literal('')),
  service: z.string().optional(),
  message: z
    .string()
    .min(10, 'Správa musí mať aspoň 10 znakov')
    .max(1000, 'Správa môže mať maximálne 1000 znakov'),
  consent: z
    .boolean()
    .refine((val) => val === true, 'Musíte súhlasiť so spracovaním osobných údajov'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

