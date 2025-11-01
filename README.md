# Julia Estetic Clinic - Website

Professional aesthetic medicine clinic website built with Next.js 14, TypeScript, Tailwind CSS, and modern best practices.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (package manager)

### Setup

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev
# Open http://localhost:3000
```

## 📋 Available Scripts

- `pnpm dev` - Start development server (port 3000)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript compiler
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── ui/                 # UI primitives
│   ├── layout/             # Layout components
│   ├── home/               # Homepage sections
│   └── services/           # Service components
├── lib/
│   ├── env.ts              # Environment variables validation
│   ├── fonts.ts            # Font configuration
│   ├── utils.ts            # Utility functions
│   └── services.ts         # Service data (to be created)
├── features/               # Feature modules (by-feature structure)
└── config/                 # Configuration files
```

## 🎨 Design System

### Brand Colors
- **Primary**: #B49D95 (Warm beige)
- **Primary Dark**: #9D8680
- **Primary Light**: #D4C4BF
- **Accent Gold**: #C9A86A
- **Cream**: #FAF9F7

### Typography
- **Headlines**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## ⚙️ Configuration

### TypeScript
- Strict mode enabled
- All strict compiler options active:
  - `noUnusedLocals`, `noUnusedParameters`
  - `noImplicitReturns`, `noFallthroughCasesInSwitch`
  - `noUncheckedIndexedAccess`

### ESLint & Prettier
- Configured for TypeScript best practices
- No `any` types allowed
- Tailwind CSS class sorting enabled in Prettier

### Environment Variables
See `.env.example` for required variables.

## 🔄 Implementation Phases

### ✅ Phase 1: Setup & Infrastructure (COMPLETE)
- Next.js project initialization
- TypeScript strict mode
- ESLint & Prettier configuration
- Tailwind CSS with brand colors
- Font configuration
- Environment variables validation
- Git initialization

### 📝 Phase 2: Design System & Base Configuration (NEXT)
- Base UI components
- Layout wrapper
- Responsive grid system

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **Analytics**: Google Analytics 4
- **Notifications**: Sonner
- **Animations**: Framer Motion

## ✨ Key Features (Planned)

- ✅ TypeScript strict mode
- ✅ Zero console warnings/errors
- 📋 Dynamic service pages (15+ services)
- 📋 Interactive face map for service selection
- 📋 Service pricing and details
- 📋 Contact form with email integration
- 📋 Bookio booking integration
- 📋 Blog with MDX support
- 📋 SEO optimization
- 📋 Mobile responsive design

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari 12+
- Android Chrome

## 📊 Performance Targets

- Lighthouse Performance: >90
- First Contentful Paint: <1.5s
- Core Web Vitals: All green

## 📝 Commit Convention

Following Conventional Commits:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation
- `style:` formatting
- `refactor:` code restructuring
- `test:` testing
- `chore:` build/dependency changes

## 🔐 Security

- All API inputs validated with Zod
- Environment variables validated at startup
- No sensitive data in client-side code
- CSRF protection ready
- Input sanitization ready

## 📄 License

Private project for Julia Estetic Clinic

## 👥 Team

- Development: Single developer
- Timeline: 6-8 weeks
- Status: Phase 1 complete, Phase 2 in progress

---

**Next Step:** Begin Phase 2 - Design System & Base Components
