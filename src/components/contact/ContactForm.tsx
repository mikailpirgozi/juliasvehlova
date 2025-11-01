'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { Button, Input } from '@/components/ui'
import { toast } from 'sonner'

export function ContactForm(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Chyba pri odosielaní správy')
      }

      toast.success('Správa bola úspešne odoslaná!', {
        description: 'Odpovieme vám do 24 hodín.',
      })

      reset()
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Nepodarilo sa odoslať správu', {
        description: 'Skúste to prosím znova alebo nás kontaktujte telefonicky.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
          Meno a priezvisko <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Vaše meno"
          {...register('name')}
          error={errors.name?.message}
          disabled={isSubmitting}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          placeholder="vas@email.sk"
          {...register('email')}
          error={errors.email?.message}
          disabled={isSubmitting}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
          Telefón
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="+421 912 345 678"
          {...register('phone')}
          error={errors.phone?.message}
          disabled={isSubmitting}
        />
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className="mb-2 block text-sm font-medium text-gray-700">
          Služba (voliteľné)
        </label>
        <select
          id="service"
          {...register('service')}
          disabled={isSubmitting}
          className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          <option value="">Vyberte službu</option>
          <option value="botulotoxin">Botulotoxín</option>
          <option value="hyaluronic_acid">Kyselina hyalurónová</option>
          <option value="permanent_makeup">Permanentný make-up</option>
          <option value="laser_epilation">Laserová epilácia</option>
          <option value="face_procedures">Procedúry na tvár</option>
          <option value="body_procedures">Telové procedúry</option>
          <option value="consultation">Všeobecná konzultácia</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
          Správa <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Napíšte nám vašu správu alebo otázku..."
          {...register('message')}
          disabled={isSubmitting}
          className={`w-full rounded-md border px-4 py-2 transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100 ${
            errors.message
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 focus:border-primary focus:ring-primary/20'
          }`}
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          {...register('consent')}
          disabled={isSubmitting}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary/20"
        />
        <label htmlFor="consent" className="text-sm text-gray-700">
          Súhlasím so{' '}
          <a href="/ochrana-udajov" className="text-primary underline hover:text-primary-dark">
            spracovaním osobných údajov
          </a>{' '}
          za účelom odpovede na moju správu. <span className="text-red-500">*</span>
        </label>
      </div>
      {errors.consent && <p className="text-sm text-red-500">{errors.consent.message}</p>}

      {/* Submit Button */}
      <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full">
        {isSubmitting ? 'Odosiela sa...' : 'Odoslať správu'}
      </Button>

      <p className="text-center text-xs text-gray-500">
        * Povinné polia | Odpovieme do 24 hodín
      </p>
    </form>
  )
}

