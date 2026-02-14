# Instagram Section - Implementation Guide

## What Was Created

I've added a beautiful Instagram feed section to your homepage that showcases 6 recent posts in an elegant grid layout. The section is styled to match your brand's aesthetic with your signature colors and modern design patterns.

## Features

### Design Elements
- **Gradient Background**: Subtle gradient from white through brand-25 to white with decorative blur elements
- **Brand Colors**: Uses your Dusty Rose (#D8A7B1) brand colors and the blue-gray (#9ab0b9) from your hero section
- **Gold Accent**: Incorporates the signature gold color (#CDA882) from your design system
- **Responsive Grid**: 
  - Mobile: 2 columns
  - Tablet: 3 columns  
  - Desktop: 6 columns (horizontal scrolling feed)

### Interactive Features
- **Hover Effects**: 
  - Images scale up smoothly
  - Gradient overlay appears
  - "Pozrieť" button fades in
  - Likes counter appears
  - Gold accent corner shows
- **Click Through**: All images link to your Instagram profile
- **Animations**: Staggered fade-in animations for visual interest

## File Structure

```
src/
├── components/
│   └── home/
│       ├── InstagramSection.tsx  (NEW - The Instagram feed component)
│       └── index.ts               (UPDATED - Added export)
└── app/
    └── HomePageClient.tsx         (UPDATED - Added section to homepage)

public/
└── images/
    └── instagram/                 (NEW - Folder for Instagram images)
        ├── README.md              (Guide for adding images)
        ├── post-1.jpg             (ADD YOUR IMAGES HERE)
        ├── post-2.jpg
        ├── post-3.jpg
        ├── post-4.jpg
        ├── post-5.jpg
        └── post-6.jpg
```

## Customization

### 1. Update Instagram Handle

Open `src/components/home/InstagramSection.tsx` and update line 17:

```typescript
const INSTAGRAM_HANDLE = 'juliasvehlova'  // Change to your actual handle
```

### 2. Add Your Instagram Images

Place 6 square images (1080x1080px recommended) in:
```
public/images/instagram/
```

Name them:
- `post-1.jpg`
- `post-2.jpg`
- `post-3.jpg`
- `post-4.jpg`
- `post-5.jpg`
- `post-6.jpg`

**Image Guidelines:**
- Format: JPG or WebP
- Size: 1080x1080px (1:1 ratio)
- Optimize for web (200-300KB per image)
- Content: Show transformations, happy clients, treatments, before/after results

### 3. Update Post Metadata (Optional)

In `InstagramSection.tsx`, update the `instagramPosts` array (lines 22-51):

```typescript
const instagramPosts = [
  {
    id: 1,
    image: '/images/instagram/post-1.jpg',
    alt: 'Your custom description',  // Update alt text for SEO
    likes: 245,                       // Update with actual likes
  },
  // ... repeat for all 6 posts
]
```

### 4. Change Number of Posts

To show more or fewer posts:

1. Update the `instagramPosts` array
2. Add/remove corresponding images
3. Adjust the grid breakpoints in the className if needed:
   ```tsx
   <div className="... lg:grid-cols-6">  // Change 6 to your desired number
   ```

### 5. Modify Colors

The section uses these color combinations:
- **Background**: `bg-gradient-to-b from-white via-brand-25 to-white`
- **Button**: `from-[#9ab0b9] to-[#8a9eaa]` (your hero section colors)
- **Accent**: `#CDA882` (your signature gold)
- **Text**: `text-brand-600` for emphasis

All colors are defined in your `globals.css` file and can be adjusted there.

### 6. Change Section Position

The Instagram section is currently placed between Testimonials and Contact sections.

To move it:
1. Open `src/app/HomePageClient.tsx`
2. Move the `<InstagramSection />` line to your desired position

Example:
```tsx
return (
  <>
    <HeroSection />
    <ServicesSection />
    <AboutSection />
    <InstagramSection />      {/* Move this line */}
    <TestimonialsSection />
    <ContactSection />
  </>
)
```

## Advanced: Connect to Instagram API

For automatic feed updates, you have several options:

### Option 1: Instagram Basic Display API
- Requires Facebook Developer account
- Shows your own posts automatically
- Needs token refresh every 60 days

### Option 2: Third-Party Services
- **Juicer.io** - Free tier available
- **EmbedSocial** - Paid service
- **Smash Balloon** - WordPress plugin alternative

### Option 3: Static Site Generation
Use Next.js ISR (Incremental Static Regeneration):

```typescript
// Example: Fetch from Instagram API at build time
export async function getInstagramPosts() {
  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=${process.env.INSTAGRAM_TOKEN}`
  )
  return response.json()
}
```

## Testing

1. **Start the development server:**
   ```bash
   pnpm dev
   ```

2. **View the homepage:**
   ```
   http://localhost:3000
   ```

3. **Check responsiveness:**
   - Test on mobile (320px - 768px)
   - Test on tablet (768px - 1024px)
   - Test on desktop (1024px+)

4. **Test interactions:**
   - Hover over images
   - Click to verify Instagram link works
   - Test with different image sizes

## Browser Support

The component uses modern CSS features supported in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

All features degrade gracefully in older browsers.

## Performance

- **Lazy Loading**: Images use Next.js Image component with automatic lazy loading
- **Optimized Sizes**: Responsive `sizes` attribute ensures optimal image loading
- **Dynamic Imports**: Section is code-split and loaded after critical content

## Accessibility

- All images have descriptive `alt` text
- Links have proper `rel="noopener noreferrer"` for external links
- Interactive elements have proper contrast ratios
- Keyboard navigation fully supported

## Inspiration & Design Decisions

This section was inspired by mousse.sk but adapted to match your brand:

1. **Color Palette**: Used your Dusty Rose brand color and hero section's blue-gray
2. **Typography**: Matched your existing serif headings and sans-serif body text
3. **Spacing**: Consistent with your other sections (py-16 sm:py-24)
4. **Animations**: Subtle FadeIn effects matching your AboutSection
5. **Modern Approach**: Added interactive hover states and smooth transitions

The design follows best practices from leading aesthetic clinics and beauty brands while maintaining your unique identity.

## Need Help?

If you need to make changes:
1. The main file is `src/components/home/InstagramSection.tsx`
2. Styling uses Tailwind CSS with your custom theme
3. All colors reference your design system in `globals.css`

## Next Steps

1. ✅ Component created and integrated
2. ⏳ Add your Instagram images to `public/images/instagram/`
3. ⏳ Update the `INSTAGRAM_HANDLE` constant
4. ⏳ Test on local development server
5. ⏳ Deploy to production

Enjoy your new Instagram section! 🎨✨
