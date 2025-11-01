# Julia Estetic Clinic - Implementačný Plán

**Verzia:** 2.0  
**Dátum vytvorenia:** 1. november 2025  
**Celkový čas:** 6-8 týždňov  
**Status:** Fáza 2 hotová, Fáza 3 nasleduje

---

## 📊 Celkový prehľad

| Fáza | Názov | Status | Odhadovaný čas |
|------|-------|--------|----------------|
| 1 | Setup & Infrastructure | ✅ Hotovo | - |
| 2 | Design System & Base UI | ✅ Hotovo | - |
| 3 | Služby & Content | 🔄 In Progress | 5-7 dní |
| 4 | Kontakt & Formuláre | 📋 Pending | 3-4 dni |
| 5 | Rezervačný systém | 📋 Pending | 2-3 dni |
| 6 | Blog systém | 📋 Pending | 4-5 dní |
| 7 | Face Map & Interaktivita | 📋 Pending | 5-6 dní |
| 8 | Legal & Privacy | 📋 Pending | 2 dni |
| 9 | SEO & Analytics | 📋 Pending | 3-4 dni |
| 10 | Animácie & UX | 📋 Pending | 4-5 dní |
| 11 | Optimalizácia & Testing | 📋 Pending | 5-7 dní |

---

## ✅ Fáza 1: Setup & Infrastructure (HOTOVO)

### Dokončené úlohy:
- [x] Next.js 14 projekt iniciálny setup
- [x] TypeScript 5 strict mode konfigurácia
- [x] ESLint + Prettier s Tailwind plugin
- [x] Tailwind CSS s brand color system
- [x] Font konfigurácia (Inter + Playfair Display)
- [x] Environment variables validácia (Zod)
- [x] Git inicializácia
- [x] Package manager: pnpm only
- [x] Zero TypeScript errors ✓
- [x] Zero ESLint warnings ✓

### Výsledky:
```bash
✓ TypeScript strict mode: ALL enabled
✓ pnpm type-check: No errors
✓ pnpm lint: No warnings
✓ Port: 3000
```

---

## ✅ Fáza 2: Design System & Base UI (HOTOVO)

### Dokončené komponenty:

#### UI Primitives (`/src/components/ui/`)
- [x] **Button** - 3 varianty (primary, secondary, outline), 3 veľkosti, loading state
- [x] **Card** - hoverable, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- [x] **Badge** - UI badge komponent
- [x] **Input** - základný input field

#### Layout Components (`/src/components/layout/`)
- [x] **Header** - sticky navigation, mobile menu, responsive
- [x] **Footer** - 3-column layout, links, contact info
- [x] **CookieConsent** - GDPR compliant, localStorage persistence
- [x] **MainLayout** - wrapper pre všetky stránky

#### Homepage Sections (`/src/components/home/`)
- [x] **HeroSection** - headline, CTA buttons, certifikácia info
- [x] **ServicesSection** - grid 6 služieb s icons

#### Library (`/src/lib/`)
- [x] **utils.ts** - cn() helper pre Tailwind
- [x] **fonts.ts** - Inter + Playfair Display
- [x] **env.ts** - Zod validácia env variables

### Design System:
```typescript
// Brand Colors
primary: '#B49D95' (warm beige)
primary-dark: '#9D8680'
primary-light: '#D4C4BF'
accent-gold: '#C9A86A'
cream: '#FAF9F7'

// Typography
Headlines: Playfair Display (serif)
Body: Inter (sans-serif)
```

---

## 🔄 Fáza 3: Služby & Content (IN PROGRESS)

**Cieľ:** Detailné service pages pre všetkých 15+ služieb s cenníkom a popismi.

### Úlohy:

#### 3.1 Service Data Model
- [ ] Vytvoriť `/src/lib/services.ts` s Zod schémou
- [ ] Definovať ServiceCategory type
- [ ] Definovať Service interface:
  ```typescript
  interface Service {
    id: string
    slug: string
    title: string
    shortDescription: string
    fullDescription: string
    category: ServiceCategory
    benefits: string[]
    process: ProcessStep[]
    duration: string
    price: PriceRange | string
    contraindications?: string[]
    aftercare?: string[]
    faqs?: FAQ[]
    images: ServiceImage[]
    seoMeta: SEOMeta
  }
  ```

#### 3.2 Service Categories
1. **Botulotoxín** (Botox)
   - Úprava mimických vrások
   - Lifting obočia
   - Korekcia brady
   - Hyperhidróza (potenie)

2. **Kyselina hyalurónová**
   - Zväčšenie pier
   - Modelovanie líc
   - Výplň nososlzných rýh
   - Výplň nazolabialnych záhybov
   - Nechirurgická rhinoplastika

3. **Permanentný make-up**
   - Microblading obočia
   - Powder brows
   - Permanent liner (očné linky)
   - Permanent lips (pery)

4. **Laserová epilácia**
   - Celé telo
   - Tvár
   - Bikini línia
   - Podpazušie

5. **Procedúry na tvár**
   - Chemický peeling
   - Microneedling
   - Hydrafacial
   - LED terapia
   - Mezoterapia

6. **Telové procedúry**
   - Liposukcia
   - Kryolipolýza
   - RF lifting tela
   - Anticelulitídna liečba

#### 3.3 Service Pages Štruktúra
- [ ] `/src/app/sluzby/page.tsx` - Zoznam všetkých služieb
- [ ] `/src/app/sluzby/[slug]/page.tsx` - Detail služby
- [ ] `/src/components/services/ServiceCard.tsx` - Card pre service listing
- [ ] `/src/components/services/ServiceDetail.tsx` - Detail view
- [ ] `/src/components/services/ServiceHero.tsx` - Hero pre service page
- [ ] `/src/components/services/PriceTable.tsx` - Cenník tabuľka
- [ ] `/src/components/services/ProcessTimeline.tsx` - Proces zákroku
- [ ] `/src/components/services/BeforeAfterGallery.tsx` - Before/After fotky

#### 3.4 About Section
- [ ] `/src/components/home/AboutSection.tsx`
  - Príbeh MUDr. Julie
  - 10+ rokov skúseností
  - Certifikáty a kvalifikácie
  - Spokojnosť klientov (testimonials preview)
- [ ] `/src/app/o-nas/page.tsx` - Full about page
- [ ] `/src/components/about/Timeline.tsx` - Career timeline
- [ ] `/src/components/about/Certificates.tsx` - Certifikáty gallery

#### 3.5 Testimonials
- [ ] `/src/lib/testimonials.ts` - Data model
- [ ] `/src/components/home/TestimonialsSection.tsx`
- [ ] `/src/components/testimonials/TestimonialCard.tsx`

**Výstupy Fázy 3:**
- 15+ detailných service pages
- Zod validované service data
- SEO optimalizované service URLs
- Responzívne service cards
- Full about page s certifikátmi

---

## 📋 Fáza 4: Kontakt & Formuláre (PENDING)

**Cieľ:** Funkčný kontaktný formulár s email integráciou.

### Úlohy:

#### 4.1 Contact Form
- [ ] `/src/components/contact/ContactForm.tsx`
  - React Hook Form setup
  - Zod validačná schéma:
    ```typescript
    contactFormSchema = z.object({
      name: z.string().min(2).max(100),
      email: z.string().email(),
      phone: z.string().regex(/^\\+421\\d{9}$/),
      service: z.string().optional(),
      message: z.string().min(10).max(1000),
      consent: z.boolean().refine(val => val === true)
    })
    ```
  - Loading states
  - Success/error toast notifications (sonner)

#### 4.2 Email Integration
- [ ] `/src/app/api/contact/route.ts` - API endpoint
- [ ] Resend email template setup
- [ ] Email validation a sanitization
- [ ] Rate limiting protection
- [ ] Auto-reply email pre klienta

#### 4.3 Contact Section
- [ ] `/src/components/home/ContactSection.tsx`
- [ ] Mapa (Google Maps embed alebo Mapbox)
- [ ] Kontaktné informácie:
  - Telefón: +421 940 XXX XXX
  - Email: info@juliaesteticclinic.sk
  - Adresa: Malacky, Slovensko
  - Otváracie hodiny
- [ ] Social media links (Instagram, Facebook)

#### 4.4 Booking CTA Components
- [ ] `/src/components/ui/BookingCTA.tsx` - Reusable booking CTA
- [ ] Floating booking button (sticky bottom)

**Výstupy Fázy 4:**
- Plne funkčný kontaktný formulár
- Email notifikácie cez Resend
- Validácia a rate limiting
- Responzívna contact sekcia s mapou

---

## 📋 Fáza 5: Rezervačný Systém (PENDING)

**Cieľ:** Bookio widget integrácia pre online rezervácie.

### Úlohy:

#### 5.1 Bookio Integration
- [ ] `/src/components/booking/BookioWidget.tsx`
- [ ] Bookio iframe embed
- [ ] Loading state pre widget
- [ ] Mobile responsive wrapper
- [ ] Env variable: `NEXT_PUBLIC_BOOKIO_WIDGET_URL`

#### 5.2 Booking Pages
- [ ] `/src/app/rezervacia/page.tsx` - Dedicated booking page
- [ ] Booking modal alternative (optional)
- [ ] Service pre-selection z service pages

#### 5.3 Booking Flow UX
- [ ] Select service → Bookio widget
- [ ] Booking confirmation handling
- [ ] Thank you page po rezervácii

**Výstupy Fázy 5:**
- Funkčný Bookio widget
- Seamless booking experience
- Service pre-selection flow

---

## 📋 Fáza 6: Blog Systém (PENDING)

**Cieľ:** MDX blog pre educational content a SEO.

### Úlohy:

#### 6.1 MDX Setup
- [ ] Next.js MDX plugin konfigurácia (už nainštalované)
- [ ] MDX components library:
  - Custom headings
  - Code blocks
  - Images
  - Callouts/alerts
  - YouTube embeds

#### 6.2 Blog Data Layer
- [ ] `/src/lib/blog.ts` - MDX file loader
- [ ] Blog post frontmatter type:
  ```typescript
  interface BlogPost {
    slug: string
    title: string
    excerpt: string
    author: string
    date: string
    category: string
    tags: string[]
    coverImage: string
    readingTime: number
    seoMeta: SEOMeta
  }
  ```
- [ ] Reading time calculator
- [ ] Blog post search/filter utility

#### 6.3 Blog Pages
- [ ] `/src/app/blog/page.tsx` - Blog listing (grid layout)
- [ ] `/src/app/blog/[slug]/page.tsx` - Single post
- [ ] `/src/app/blog/kategoria/[category]/page.tsx` - Category archive
- [ ] `/src/components/blog/BlogCard.tsx`
- [ ] `/src/components/blog/BlogPost.tsx` - Post layout wrapper
- [ ] `/src/components/blog/RelatedPosts.tsx`
- [ ] `/src/components/blog/TableOfContents.tsx`

#### 6.4 Blog Content (10+ articles)
Témy:
1. [x] Botulotoxín - bezpečnosť a mýty (už existuje: `botulotoxin-bezpecne.mdx`)
2. [ ] Kyselina hyalurónová - všetko čo potrebujete vedieť
3. [ ] Ako sa pripraviť na permanentný makeup
4. [ ] Laserová epilácia vs. klasické metódy
5. [ ] Aftercare po botulotoxíne
6. [ ] Microblading vs. Powder brows
7. [ ] Korekcia pier - prírodný vs. dramatický look
8. [ ] Chemický peeling - typy a benefity
9. [ ] Anti-aging rutina v 30tich/40tich/50tich
10. [ ] Lip filler migration - príčiny a prevencia

#### 6.5 Blog SEO
- [ ] Dynamic sitemap pre blog posts
- [ ] Structured data (Article schema)
- [ ] Social share meta tags
- [ ] RSS feed generation

**Výstupy Fázy 6:**
- Plne funkčný MDX blog systém
- 10+ kvalitných blog článkov
- SEO optimalizované blog pages
- Related posts suggestions

---

## 📋 Fáza 7: Face Map & Interaktivita (PENDING)

**Cieľ:** Interaktívna mapa tváre pre intuítivny výber služieb.

### Úlohy:

#### 7.1 Face Map Component
- [ ] `/src/components/services/FaceMap.tsx`
- [ ] SVG face illustration s hover areas:
  - Čelo (botox, peeling)
  - Oči (botox, filler)
  - Líca (filler, lift)
  - Nos (rhinoplastika)
  - Pery (filler, permanent)
  - Brada (botox, filler)
  - Krk (lift, mezoterapia)
- [ ] Hover tooltips s service info
- [ ] Click → redirect na service detail
- [ ] Mobile touch support

#### 7.2 Interactive Service Selector
- [ ] Multi-select face areas
- [ ] Show combined price estimate
- [ ] "Vytvor balíček" CTA
- [ ] Save selected services do localStorage

#### 7.3 Integration
- [ ] Add Face Map do homepage (`/src/components/home/FaceMapSection.tsx`)
- [ ] `/src/app/vybrat-sluzby/page.tsx` - Full-page face map selector

**Výstupy Fázy 7:**
- Interaktívna SVG face map
- Intuitive service selection UX
- Mobile-friendly implementation
- Package builder functionality

---

## 📋 Fáza 8: Legal & Privacy (PENDING)

**Cieľ:** GDPR compliant privacy policy a terms of service.

### Úlohy:

#### 8.1 Privacy Policy
- [ ] `/src/app/ochrana-udajov/page.tsx`
- [ ] SK-specific GDPR content:
  - Zber osobných údajov
  - Účel spracovania
  - Práva používateľov
  - Cookies policy
  - Kontakt na DPO (ak potrebné)

#### 8.2 Terms of Service
- [ ] `/src/app/obchodne-podmienky/page.tsx`
- [ ] Content:
  - Všeobecné podmienky
  - Storno politika
  - Reklamácie
  - Zodpovednosť

#### 8.3 Legal Components
- [ ] `/src/components/legal/LegalLayout.tsx` - Wrapper pre legal pages
- [ ] Last updated timestamps
- [ ] Print-friendly styling

**Výstupy Fázy 8:**
- GDPR compliant privacy policy
- Profesionálne obchodné podmienky
- Legal page layout template

---

## 📋 Fáza 9: SEO & Analytics (PENDING)

**Cieľ:** Kompletná SEO optimalizácia a tracking.

### Úlohy:

#### 9.1 SEO Meta Tags
- [ ] Dynamic meta tags pre všetky pages
- [ ] Open Graph tags
- [ ] Twitter Cards
- [ ] Canonical URLs
- [ ] Structured data (JSON-LD):
  - Organization
  - LocalBusiness
  - Service
  - Article (blog)
  - BreadcrumbList

#### 9.2 Sitemap & Robots
- [ ] `/src/app/sitemap.ts` - Dynamic sitemap generation
- [ ] `/src/app/robots.ts` - Robots.txt configuration
- [ ] XML sitemap pre všetky services
- [ ] XML sitemap pre blog posts

#### 9.3 Google Analytics 4
- [ ] GA4 tracking setup
- [ ] Custom events:
  - Booking button clicks
  - Contact form submissions
  - Service page views
  - Blog post engagement
- [ ] Conversion tracking
- [ ] Cookie consent integration

#### 9.4 Performance Optimization
- [ ] Next.js Image optimization pre všetky obrázky
- [ ] Lazy loading images
- [ ] Font optimization (already done)
- [ ] Code splitting audit
- [ ] Bundle size optimization

#### 9.5 Lighthouse Targets
- [ ] Performance: >90
- [ ] Accessibility: 100
- [ ] Best Practices: 100
- [ ] SEO: 100
- [ ] Core Web Vitals: All green

**Výstupy Fázy 9:**
- Perfektný SEO score
- Dynamické sitemaps
- GA4 tracking
- Structured data na všetkých pages
- Lighthouse score >90

---

## 📋 Fáza 10: Animácie & UX (PENDING)

**Cieľ:** Smooth transitions a delightful UX s Framer Motion.

### Úlohy:

#### 10.1 Scroll Animations
- [ ] Fade in na scroll (sections)
- [ ] Slide up na scroll (cards)
- [ ] Parallax effects (hero background)
- [ ] Progress indicator na blog posts

#### 10.2 Page Transitions
- [ ] Smooth page transition animations
- [ ] Loading states pre navigation
- [ ] Skeleton loaders pre content

#### 10.3 Micro-interactions
- [ ] Button hover states (already done)
- [ ] Card hover effects (already done)
- [ ] Input focus animations
- [ ] Form validation feedback animations
- [ ] Success checkmark animations
- [ ] Toast notifications (sonner - už nainštalované)

#### 10.4 Mobile UX Enhancements
- [ ] Swipe gestures pre galérie
- [ ] Pull-to-refresh (optional)
- [ ] Mobile menu animations
- [ ] Touch feedback

#### 10.5 Accessibility
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] ARIA labels
- [ ] Screen reader testing
- [ ] Color contrast audit (WCAG AA)

**Výstupy Fázy 10:**
- Buttery smooth animations
- Enhanced user experience
- Mobile-optimized interactions
- Full accessibility compliance

---

## 📋 Fáza 11: Optimalizácia & Testing (PENDING)

**Cieľ:** Production-ready aplikácia s testami.

### Úlohy:

#### 11.1 Unit Testing (Optional - podľa času)
- [ ] Vitest setup
- [ ] Utils function tests
- [ ] Form validation tests
- [ ] Service data model tests

#### 11.2 E2E Testing (Optional)
- [ ] Playwright setup
- [ ] Critical user flows:
  - Homepage → Service detail → Booking
  - Contact form submission
  - Blog navigation

#### 11.3 Performance Testing
- [ ] Lighthouse CI setup
- [ ] Bundle analyzer
- [ ] Image optimization audit
- [ ] Core Web Vitals monitoring

#### 11.4 Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] iOS Safari
- [ ] Android Chrome

#### 11.5 Final Optimization
- [ ] Minifikácia CSS/JS
- [ ] Tree shaking unused code
- [ ] Remove console.logs
- [ ] Compression (gzip/brotli)
- [ ] CDN setup (Vercel Edge)

#### 11.6 Deployment
- [ ] Environment variables setup (production)
- [ ] Vercel deployment konfigurácia
- [ ] Custom domain setup
- [ ] SSL certificate
- [ ] Production build test
- [ ] Smoke tests on production

**Výstupy Fázy 11:**
- Production-ready build
- Zero errors/warnings
- Lighthouse >90
- Deployed na vlastnú doménu
- Analytics tracking aktívne

---

## 🎯 Kritické míľniky

| Míľnik | Dátum (odhad) | Status |
|--------|---------------|--------|
| MVP (Fázy 1-4) | Týždeň 3 | 🔄 |
| Content Complete (Fázy 5-6) | Týždeň 5 | 📋 |
| Full Feature Set (Fázy 7-9) | Týždeň 7 | 📋 |
| Production Launch | Týždeň 8 | 📋 |

---

## 📦 Tech Stack Summary

**Frontend:**
- Next.js 14 (App Router)
- TypeScript 5 (strict mode)
- Tailwind CSS 3
- Framer Motion (animations)
- Lucide React (icons)

**Forms & Validation:**
- React Hook Form
- Zod

**Email:**
- Resend

**Content:**
- MDX (blog)
- Gray Matter (frontmatter)

**Analytics:**
- Google Analytics 4
- Vercel Analytics

**Hosting:**
- Vercel (CDN + Edge Functions)

**Testing (Optional):**
- Vitest (unit)
- Playwright (E2E)

---

## 🚀 Next Steps

**Immediate (This Week):**
1. ✅ Dokončiť Fázu 2 audit
2. 🔄 Začať Fázu 3 - Services data model
3. 🔄 Vytvoriť 5 service detail pages
4. 📋 About section implementácia

**Short Term (Next Week):**
1. Fáza 4 - Contact form + email
2. Fáza 5 - Bookio integration
3. Začať blog content writing

**Medium Term (2-3 týždne):**
1. Fáza 6 - Blog system complete
2. Fáza 7 - Face map
3. Fáza 8 - Legal pages

**Long Term (4-6 týždňov):**
1. Fázy 9-11 - SEO, animations, optimization
2. Testing & QA
3. Production deployment

---

## 📝 Notes & Decisions

### Design Decisions:
- **Warm & Elegant:** Primary beige (#B49D95) + gold accent (#C9A86A)
- **Serif headlines:** Playfair Display pre luxusný feel
- **Sans-serif body:** Inter pre čitateľnosť
- **Minimalist approach:** Clean, modern, profesionálny

### Technical Decisions:
- **No runtime errors:** ZERO tolerance policy
- **TypeScript strict:** Všetky strict flags enabled
- **Zod everywhere:** Input/output validation
- **By-feature structure:** Features > components/layout split
- **No `any` types:** Strict typing enforcement

### Content Strategy:
- **Service-first:** Services sú hlavný obsah
- **Educational blog:** Establish authority, SEO
- **Client testimonials:** Social proof
- **Before/after gallery:** Visual results (with consent)
- **Trust signals:** Certifikáty, experience, safety

---

## 🔄 Changelog

**v2.0 (1. november 2025)**
- Initial implementation plan
- Fáza 1-2 audit complete
- 11 implementation phases defined
- Tech stack finalized

---

**Status:** 🔄 Actively developing  
**Next Update:** Po dokončení Fázy 3

