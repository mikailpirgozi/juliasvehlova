export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Track page views
export const pageview = (url: string): void => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return

  window.gtag?.('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}): void => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return

  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Common event tracking functions
export const trackBooking = (service?: string): void => {
  event({
    action: 'booking_click',
    category: 'engagement',
    label: service || 'general',
  })
}

export const trackContactFormSubmit = (): void => {
  event({
    action: 'contact_form_submit',
    category: 'engagement',
    label: 'contact_form',
  })
}

export const trackServiceView = (serviceName: string): void => {
  event({
    action: 'service_view',
    category: 'content',
    label: serviceName,
  })
}

export const trackPhoneClick = (): void => {
  event({
    action: 'phone_click',
    category: 'engagement',
    label: 'phone_number',
  })
}

export const trackEmailClick = (): void => {
  event({
    action: 'email_click',
    category: 'engagement',
    label: 'email_address',
  })
}

