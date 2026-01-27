import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'
import { Resend } from 'resend'
import { validateEnv } from '@/lib/env'

// Rate limiting store (simple in-memory, in production use Redis)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimit.get(ip)

  if (!limit || now > limit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 }) // 1 hour
    return true
  }

  if (limit.count >= 3) {
    // Max 3 requests per hour
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Validate env vars at runtime
    const env = validateEnv()
    
    // Initialize Resend
    const resend = new Resend(env.RESEND_API_KEY)

    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Príliš veľa požiadaviek. Skúste to prosím neskôr.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    // Sanitize input (basic XSS prevention)
    const sanitize = (str: string): string => {
      return str.replace(/[<>]/g, '')
    }

    const sanitizedData = {
      name: sanitize(validatedData.name),
      email: validatedData.email,
      phone: validatedData.phone ? sanitize(validatedData.phone) : undefined,
      service: validatedData.service,
      message: sanitize(validatedData.message),
    }

    // Send email to clinic
    const { error } = await resend.emails.send({
      from: 'Julia Clinic <noreply@juliaesteticclinic.sk>',
      to: env.CONTACT_EMAIL,
      replyTo: sanitizedData.email,
      subject: `Nová správa z webu - ${sanitizedData.name}`,
      html: `
        <h2>Nová správa z kontaktného formulára</h2>
        
        <p><strong>Meno:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        ${sanitizedData.phone ? `<p><strong>Telefón:</strong> ${sanitizedData.phone}</p>` : ''}
        ${sanitizedData.service ? `<p><strong>Služba:</strong> ${sanitizedData.service}</p>` : ''}
        
        <h3>Správa:</h3>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p style="color: #888; font-size: 12px;">
          Odoslané: ${new Date().toLocaleString('sk-SK')}<br>
          IP: ${ip}
        </p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Chyba pri odosielaní emailu' },
        { status: 500 }
      )
    }

    // Send auto-reply to customer
    await resend.emails.send({
      from: 'Julia Clinic <noreply@juliaesteticclinic.sk>',
      to: sanitizedData.email,
      subject: 'Ďakujeme za vašu správu - Julia Clinic',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B49D95;">Dobrý deň ${sanitizedData.name},</h2>
          
          <p>Ďakujeme za vašu správu. Prijali sme ju a odpovieme vám do 24 hodín.</p>
          
          <div style="background-color: #FAF9F7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Váš odkaz:</h3>
            <p style="color: #666;">${sanitizedData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>V prípade urgentných záležitostí nás môžete kontaktovať aj telefonicky.</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <div style="color: #888; font-size: 14px;">
            <p><strong>Julia Estetic Clinic</strong></p>
            <p>📞 +421 940 123 456</p>
            <p>📧 info@juliaesteticclinic.sk</p>
            <p>📍 Malacky, Slovensko</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Správa bola úspešne odoslaná' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Neplatné údaje vo formulári' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Interná chyba servera' },
      { status: 500 }
    )
  }
}

