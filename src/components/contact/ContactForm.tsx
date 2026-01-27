'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { TextArea } from '@/components/base/textarea/textarea'
import { Checkbox } from '@/components/base/checkbox/checkbox'
import { Select } from '@/components/base/select/select'
import { toast } from 'sonner'
import Link from 'next/link'

const serviceOptions = [
  { id: '', label: 'Vyberte službu' },
  { id: 'botulotoxin', label: 'Botulotoxín' },
  { id: 'hyaluronic_acid', label: 'Kyselina hyalurónová' },
  { id: 'permanent_makeup', label: 'Permanentný make-up' },
  { id: 'laser_epilation', label: 'Laserová epilácia' },
  { id: 'face_procedures', label: 'Procedúry na tvár' },
  { id: 'body_procedures', label: 'Telové procedúry' },
  { id: 'consultation', label: 'Všeobecná konzultácia' },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      consent: false,
    },
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            label="Meno a priezvisko"
            placeholder="Vaše meno"
            isRequired
            isDisabled={isSubmitting}
            isInvalid={!!errors.name}
            hint={errors.name?.message}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            label="Email"
            type="email"
            placeholder="vas@email.sk"
            isRequired
            isDisabled={isSubmitting}
            isInvalid={!!errors.email}
            hint={errors.email?.message}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />

      {/* Phone */}
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Input
            label="Telefón"
            type="tel"
            placeholder="+421 912 345 678"
            isDisabled={isSubmitting}
            isInvalid={!!errors.phone}
            hint={errors.phone?.message}
            value={field.value || ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />

      {/* Service */}
      <Controller
        name="service"
        control={control}
        render={({ field }) => (
          <Select
            label="Služba (voliteľné)"
            placeholder="Vyberte službu"
            items={serviceOptions}
            isDisabled={isSubmitting}
            selectedKey={field.value || ''}
            onSelectionChange={(key) => {
              field.onChange(key === '' ? undefined : key)
            }}
          >
            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
          </Select>
        )}
      />

      {/* Message */}
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <TextArea
            label="Správa"
            placeholder="Napíšte nám vašu správu alebo otázku..."
            rows={4}
            isRequired
            isDisabled={isSubmitting}
            isInvalid={!!errors.message}
            hint={errors.message?.message}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />

      {/* Consent */}
      <div>
        <Controller
          name="consent"
          control={control}
          render={({ field }) => (
            <Checkbox
              isSelected={field.value}
              onChange={field.onChange}
              isDisabled={isSubmitting}
              label={
                <span className="text-sm text-gray-600">
                  Súhlasím so{' '}
                  <Link href="/ochrana-udajov" className="font-medium text-brand-600 hover:text-brand-700">
                    spracovaním osobných údajov
                  </Link>{' '}
                  za účelom odpovede na moju správu.
                </span>
              }
            />
          )}
        />
        {errors.consent && (
          <p className="mt-1.5 text-sm text-error-600">{errors.consent.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" color="primary" size="lg" isLoading={isSubmitting} className="w-full">
        {isSubmitting ? 'Odosiela sa...' : 'Odoslať správu'}
      </Button>

      <p className="text-center text-xs text-gray-500">
        * Povinné polia | Odpovieme do 24 hodín
      </p>
    </form>
  )
}
