# Deployment Guide for Vercel

## Quick Deploy

### Method 1: Vercel Dashboard (Recommended for First Time)

1. **Sign up/Login to Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Import Your Project**
   - Click "Add New Project"
   - Select "Import Git Repository" or "Upload Files"
   - If using Git, select this repository
   - If uploading, compress the project folder and upload

3. **Configure Build Settings**
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Leave these as default (already configured in vercel.json)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - You'll get a live URL like: `your-project-name.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Login**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy**
   \`\`\`bash
   vercel
   \`\`\`

   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time)
   - What's your project's name? Enter a name
   - In which directory is your code located? **./\`\`\`
   - Auto-detected settings? **Y**

4. **Deploy to Production**
   \`\`\`bash
   vercel --prod
   \`\`\`

## Post-Deployment Steps

### 1. Add Custom Domain

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `yourbrand.com`)
4. Follow instructions to update DNS settings with your domain registrar
5. Vercel will automatically provision SSL certificate

### 2. Update Brand Information

After deployment, update these placeholders:

**In `app/layout.tsx`:**
- Replace `[Your Brand Name]` with actual business name
- Update phone number: `+1-561-XXX-XXXX`
- Update address, city, state, zip
- Update social media URLs
- Update website URL

**In All Pages:**
- Replace `[Your Brand]` with actual brand name
- Update contact information
- Update email addresses
- Update phone numbers

**In `components/Footer.tsx`:**
- Update contact information
- Update social media links

### 3. Update Booking Calendar

The booking calendar is already integrated. The iframe loads from:
\`\`\`
https://links.syncedupsolutions.com/widget/booking/EggKHnSiJTHNpypqk4wA
\`\`\`

This should work as-is. Test it after deployment to ensure it loads correctly.

### 4. Replace Placeholder Images

Current images use Unsplash placeholders. Replace with your professional photos:

1. Add images to \`public/images/\` folder
2. Update image sources in:
   - \`app/page.tsx\` (home page)
   - \`app/services/page.tsx\`
   - \`app/packages/page.tsx\`
   - \`app/about/page.tsx\`

Example:
\`\`\`tsx
// Old
src="https://images.unsplash.com/photo-..."

// New
src="/images/your-photo.jpg"
\`\`\`

### 5. Add Favicon

1. Create a favicon (32x32 PNG or ICO file)
2. Save as \`app/favicon.ico\`
3. Redeploy

## Environment Variables (Optional)

If you need environment variables:

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add variables (e.g., for analytics, form handling, etc.)
3. Redeploy for changes to take effect

## Analytics Setup (Optional)

### Vercel Analytics

1. Go to your project in Vercel Dashboard
2. Click "Analytics" tab
3. Enable Vercel Analytics (free tier available)

### Google Analytics

1. Add GA4 tracking code to \`app/layout.tsx\`
2. Or install \`@next/third-parties/google\`

## SEO Checklist

After deployment:

- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Verify Schema markup with Google Rich Results Test
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Set up Google My Business listing
- [ ] Add business to local directories

## Monitoring

### Check Build Status
- Go to Vercel Dashboard → Deployments
- See real-time build logs
- Check for errors or warnings

### Performance Monitoring
- Use Vercel Analytics
- Monitor Core Web Vitals
- Check page load times

## Automatic Deployments

If using Git integration:
- Every push to main branch = Production deployment
- Every push to other branches = Preview deployment
- Pull requests get preview URLs automatically

## Rollback

If something goes wrong:
1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Need help? Check the README.md file

## Estimated Costs

- **Vercel Hobby Plan**: FREE
  - Perfect for this project
  - Unlimited deployments
  - Automatic SSL
  - 100GB bandwidth/month

- **Vercel Pro**: $20/month (if you need more)
  - More bandwidth
  - Analytics included
  - Priority support

Your site should stay on the free plan unless you get significant traffic.
