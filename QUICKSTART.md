# ⚡ Quick Start Guide

## 🚀 Deploy in 5 Minutes

### Step 1: Deploy to Vercel

1. Go to **https://vercel.com**
2. Sign up/Login (free)
3. Click **"Add New Project"**
4. Click **"Upload Files"** or connect Git
5. Upload this entire folder
6. Click **"Deploy"**
7. Wait 2-3 minutes ⏱️
8. ✅ **Done!** You'll get a live URL

### Step 2: Update Your Brand Info (Important!)

Open these files and replace placeholders:

**File: `app/layout.tsx`**
- Line 18: Replace `[Your Brand]` with your business name
- Line 36: Replace `+1-561-XXX-XXXX` with your phone number
- Line 39-44: Update your address
- Line 72-73: Update social media URLs

**File: `components/Header.tsx`**
- Line 37: Replace `[Your Brand]` with your business name

**File: `components/Footer.tsx`**
- Lines 17, 48, 90: Replace `[Your Brand]` with your business name
- Line 60: Update phone number
- Line 64: Update email
- Lines 74-86: Update social media links

### Step 3: Test Your Site

Visit your new Vercel URL and test:
- [ ] All pages load correctly
- [ ] Booking calendar works
- [ ] Mobile view looks good
- [ ] Links work

### Step 4: Add Custom Domain (Optional)

In Vercel Dashboard:
1. Go to your project
2. Settings → Domains
3. Add your domain (e.g., `yourbrand.com`)
4. Follow DNS instructions

---

## 🎨 Want to Customize?

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  cream: { ... },  // Background colors
  gold: { ... },   // Primary accent
  terracotta: { ... }, // Secondary accent
}
```

### Add Your Photos

1. Add images to `public/images/` folder
2. Update image paths in page files
3. Example: Change `src="https://images.unsplash.com/..."` to `src="/images/your-photo.jpg"`

### Update Content

All content is in the `/app` folder:
- `app/page.tsx` - Home page
- `app/services/page.tsx` - Services
- `app/packages/page.tsx` - Packages
- `app/about/page.tsx` - About Us
- `app/contact/page.tsx` - Contact/Booking

Just edit the text between the HTML tags!

---

## 🛟 Need Help?

### Local Development

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Open http://localhost:3000
```

### Build & Test

```bash
# Build for production
npm run build

# Test production build
npm start
```

### Common Issues

**Issue**: Build fails
**Fix**: Run `npm install` first

**Issue**: Images not loading
**Fix**: Check image URLs are correct

**Issue**: Booking calendar not showing
**Fix**: Check internet connection, iframe might be blocked

---

## 📞 Contact Info to Update

Search and replace these in all files:

- `[Your Brand]` → Your Business Name
- `(561) 555-1234` → Your Phone Number
- `info@yourbrand.com` → Your Email
- Social media placeholders → Your actual links

---

## ✅ Final Checklist

Before going live:

- [ ] Deployed to Vercel
- [ ] Updated business name everywhere
- [ ] Updated phone numbers
- [ ] Updated email addresses
- [ ] Tested booking calendar
- [ ] Tested on mobile device
- [ ] Added custom domain (optional)
- [ ] Replaced placeholder images (can do later)

---

## 🎉 You're Live!

Share your new website and start getting bookings!

For detailed instructions, see:
- **DEPLOYMENT.md** - Full deployment guide
- **PROJECT_SUMMARY.md** - Complete project overview
- **README.md** - Development documentation
