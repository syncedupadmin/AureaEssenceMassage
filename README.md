# Luxury Mobile Massage Website

A high-end, mobile-first Next.js website for a luxury mobile massage service in South Florida.

## Features

- ✨ Elegant, minimalist design with premium typography
- 📱 Mobile-first responsive layout
- 🎨 Luxurious color palette (cream, gold, terracotta)
- 🔍 SEO optimized with Schema.org markup
- 📅 Integrated booking calendar
- ⚡ Fast performance with Next.js 14
- 🎭 Smooth animations with Framer Motion
- 💳 Ready for Vercel deployment

## Pages

1. **Home** - Hero section, services preview, testimonials, CTAs
2. **Services** - Detailed service descriptions (Swedish, Deep Tissue, Couples, Hot Stone, Prenatal, Sports)
3. **Packages** - Curated luxury packages with pricing
4. **About Us** - Brand story, team, certifications, service area
5. **Contact/Book** - Embedded booking calendar, contact info, FAQs

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Cormorant Garamond (serif) + Inter (sans-serif)
- **Animations:** Framer Motion
- **SEO:** next-seo + Schema.org markup
- **Forms:** React Hook Form

## Getting Started

### Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mobile-massage-website)

### Manual Deployment

1. Install Vercel CLI:
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. Deploy:
   \`\`\`bash
   vercel
   \`\`\`

3. Follow the prompts to link your project

### Environment Variables

No environment variables required for basic functionality. The booking calendar is embedded via iframe.

## Customization

### Update Brand Information

Replace placeholder text in:
- \`app/layout.tsx\` - Schema markup, brand name
- All page files - Replace \`[Your Brand]\` with actual brand name
- \`components/Header.tsx\` - Logo and navigation
- \`components/Footer.tsx\` - Contact information

### Update Booking Calendar

Replace the iframe URL in \`components/BookingCalendar.tsx\` with your actual booking system URL.

### Change Colors

Edit \`tailwind.config.ts\` to customize the color palette:
- \`cream\` - Background tones
- \`gold\` - Primary accent color
- \`terracotta\` - Secondary accent color
- \`charcoal\` - Text color

### Add Real Images

Replace Unsplash placeholder images with your own professional photos. Recommended image sizes:
- Hero images: 1920x1080px
- Service cards: 800x600px
- Team photos: 400x500px
- General: High-quality, optimized JPG/WebP

## SEO Configuration

### Meta Tags

Each page includes custom meta tags. Update in individual page files:
- Title
- Description
- Keywords
- Open Graph tags

### Schema Markup

Structured data is included in \`app/layout.tsx\`. Update with your actual:
- Business name
- Address
- Phone number
- Hours
- Social media URLs
- Service areas

### Local SEO

The site is optimized for South Florida from Delray Beach to Miami. Update service area information in:
- \`app/layout.tsx\` (Schema markup)
- \`app/about/page.tsx\` (Service area section)
- \`app/contact/page.tsx\` (Service area map)

## Performance

- Next.js Image optimization for all images
- Font optimization with next/font
- Automatic code splitting
- Static page generation where possible
- Optimized for Core Web Vitals

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

Private - All rights reserved

## Support

For questions or issues, contact the development team.
