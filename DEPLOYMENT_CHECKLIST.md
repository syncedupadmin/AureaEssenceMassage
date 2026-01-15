# 🚀 Deployment Checklist

## Pre-Deployment (Do These Before Pushing to Production)

### 1. Update Domain References
- [ ] Update `app/sitemap.ts` line 4: Change `https://www.yourdomain.com` to your actual domain
- [ ] Update `app/robots.ts` line 11: Change `https://www.yourdomain.com` to your actual domain
- [ ] Update `.env.local.example` and create `.env.local` with actual values

### 2. Test Locally
```bash
npm run build
npm start
```
- [ ] Visit http://localhost:3000
- [ ] Test all navigation links
- [ ] Submit contact form (check console for data)
- [ ] Test mobile menu
- [ ] Test back-to-top button
- [ ] Check 404 page (visit /nonexistent-page)

### 3. Verify SEO Files
- [ ] Visit http://localhost:3000/sitemap.xml
- [ ] Visit http://localhost:3000/robots.txt
- [ ] Confirm all pages listed in sitemap

## Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Add enhancements: contact form, SEO, accessibility"
git push origin main
```

### 2. Deploy on Vercel
- [ ] Go to https://vercel.com
- [ ] Import project from GitHub
- [ ] Deploy (automatic if already connected)
- [ ] Wait for build to complete

### 3. Configure Environment Variables
In Vercel Dashboard → Your Project → Settings → Environment Variables:

**Required:**
- [ ] `NEXT_PUBLIC_SITE_URL` = Your actual website URL

**Optional (for contact form):**
- [ ] `EMAIL_SERVICE_API_KEY` = Your email service API key
- [ ] `EMAIL_TO` = Email address to receive form submissions
- [ ] `EMAIL_FROM` = From email address

**Optional (for analytics):**
- [ ] `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` = Your GA4 measurement ID

### 4. Verify Deployment
- [ ] Visit your Vercel URL (e.g., yourproject.vercel.app)
- [ ] Test all pages
- [ ] Test contact form
- [ ] Test on mobile device
- [ ] Check Analytics tab in Vercel

## Post-Deployment

### 1. Add Custom Domain (Optional)
- [ ] In Vercel Dashboard → Domains
- [ ] Add your custom domain
- [ ] Update DNS records with your registrar
- [ ] Wait for SSL certificate (automatic)

### 2. SEO Setup
- [ ] Go to https://search.google.com/search-console
- [ ] Add your property
- [ ] Submit sitemap: `https://yourdomain.com/sitemap.xml`
- [ ] Request indexing for main pages

### 3. Test Schema Markup
- [ ] Visit https://search.google.com/test/rich-results
- [ ] Enter your homepage URL
- [ ] Verify LocalBusiness schema is valid
- [ ] Check for any warnings

### 4. Analytics Verification
- [ ] Visit your Vercel dashboard → Analytics
- [ ] Verify page views are being tracked
- [ ] (If using GA4) Check Google Analytics dashboard

### 5. Final Functionality Tests

**All Pages:**
- [ ] Home page loads correctly
- [ ] Services page shows pricing
- [ ] Packages page loads
- [ ] About page loads
- [ ] Contact page shows form AND calendar
- [ ] Privacy policy accessible
- [ ] Terms of service accessible

**Navigation:**
- [ ] All header links work
- [ ] All footer links work
- [ ] Mobile menu works
- [ ] Sticky Book Now button works

**Forms:**
- [ ] Contact form validates required fields
- [ ] Email format validation works
- [ ] Phone format validation works
- [ ] Service dropdown shows all options
- [ ] Success message displays after submission
- [ ] Error message displays if submission fails

**Accessibility:**
- [ ] Tab through page with keyboard
- [ ] Skip to content link works (press Tab on page load)
- [ ] ESC key closes mobile menu
- [ ] All interactive elements have focus states

**Mobile:**
- [ ] Test on real mobile device
- [ ] Sticky CTA button appears
- [ ] Mobile menu works
- [ ] Forms are usable on mobile
- [ ] Images load properly
- [ ] Back to top button works

### 6. Performance Check
- [ ] Run Lighthouse audit (in Chrome DevTools)
- [ ] Aim for 90+ scores on all metrics
- [ ] Check image optimization
- [ ] Verify lazy loading works

## Monitoring & Maintenance

### Weekly
- [ ] Check Vercel Analytics for traffic
- [ ] Review contact form submissions
- [ ] Check for any build errors

### Monthly
- [ ] Review Google Search Console
- [ ] Update content if needed
- [ ] Check for package updates: `npm outdated`

## Troubleshooting

### Contact Form Not Sending Emails
1. Check that environment variables are set in Vercel
2. Verify email service API key is correct
3. Check Vercel Function logs for errors
4. Ensure `/api/contact` route is created (currently logs to console)

### Analytics Not Tracking
1. Verify `@vercel/analytics` package is installed
2. Check that `<Analytics />` component is in layout.tsx
3. Wait 24 hours for data to appear
4. Check browser console for errors

### 404 Errors on Pages
1. Verify all pages have `page.tsx` files
2. Check build output in Vercel
3. Ensure no typos in navigation links
4. Clear browser cache

### Images Not Loading
1. Check that external image domains are allowed in `next.config.js`
2. Verify Unsplash URLs are correct
3. Check browser console for CORS errors
4. Consider using local images in `/public/images/`

---

## Quick Reference

**Local Development:**
```bash
npm run dev         # Start dev server
npm run build       # Test production build
npm start           # Run production build
npm run lint        # Check for errors
```

**Important Files:**
- `.env.local.example` - Environment variable template
- `ENHANCEMENTS_SUMMARY.md` - Complete list of changes
- `README.md` - Project documentation

**Support:**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- React Hook Form: https://react-hook-form.com/

---

## ✅ Deployment Complete Checklist

Once everything above is done:

- [ ] Website is live and accessible
- [ ] All pages load correctly
- [ ] Contact form works
- [ ] SEO files accessible
- [ ] Analytics tracking
- [ ] No console errors
- [ ] Mobile experience tested
- [ ] Schema markup valid
- [ ] Sitemap submitted to Google

**Congratulations! Your luxury mobile massage website is live! 🎉**
