# Client Information Needed to Complete Website

## 🎯 Critical Information (Required Before Launch)

### 1. Brand Identity
- [ ] **Business Name** - Replace all instances of `[Your Brand]`
  - Currently appears in: layout.tsx, all page titles, footer

- [ ] **Tagline/Slogan** (optional)
  - For hero section if different from current

### 2. Contact Information
- [ ] **Primary Phone Number** - Replace `(561) 555-1234`
  - Format preference: (561) 555-1234 or +1-561-555-1234
  - Will appear in: Header, Footer, Contact page

- [ ] **Business Email** - Replace `info@yourbrand.com`
  - For contact form submissions
  - For footer display

- [ ] **Physical Address** (or service area description)
  - Current: "Serving South Florida from Delray Beach to Miami"
  - Update if different service area
  - Used in: Footer, Schema markup, About page

### 3. Website & Domain
- [ ] **Custom Domain Name**
  - Replace `https://www.yourdomain.com` in:
    - app/sitemap.ts (line 4)
    - app/robots.ts (line 11)
    - .env.local.example
  - Add to Vercel after purchase

### 4. Pricing Structure
**All services currently show `$XXX` placeholder**

**Individual Services** (app/services/page.tsx):
- [ ] Swedish Massage: 60 min $____, 90 min $____, 120 min $____
- [ ] Deep Tissue: 60 min $____, 90 min $____, 120 min $____
- [ ] Back-to-Back Couples: 120 min $____, 180 min $____
- [ ] Hot Stone: 75 min $____, 90 min $____, 120 min $____
- [ ] Prenatal: 60 min $____, 90 min $____
- [ ] Sports Massage: 60 min $____, 90 min $____, 120 min $____

**Package Pricing** (app/packages/page.tsx):
- [ ] Executive Stress Relief (90 min): $____
- [ ] Couples Retreat (180 min total): $____
- [ ] Athlete Recovery (75 min): $____
- [ ] Ultimate Indulgence (120 min): $____

**Add-Ons** (if you want to show pricing):
- [ ] Aromatherapy: $____
- [ ] CBD Oil Treatment: $____
- [ ] Extended Time (+30 min): $____

### 5. Booking System
- [ ] **Booking Calendar Provider**
  - Current: Placeholder iframe in BookingCalendar.tsx
  - Options: Calendly, Acuity, Square, custom system
  - Need: Embed code/iframe URL

- [ ] **Booking Page URL** (if using external link)
  - To replace calendar or add as alternative

### 6. Social Media
- [ ] **Facebook Page URL** - Replace `https://www.facebook.com/[YourPage]`
- [ ] **Instagram Handle/URL** - Replace `https://www.instagram.com/[YourPage]`
- [ ] **Other platforms?**
  - Twitter/X
  - LinkedIn
  - TikTok
  - Yelp

### 7. Legal Information
- [ ] **Business Legal Name** (if different from brand)
- [ ] **Business Registration Number/License** (for schema markup)
- [ ] **Therapist Licenses/Certifications** (to display on About page)

---

## 📧 Email Service Setup (For Contact Form)

The contact form currently logs to console. To make it functional:

### Choose Email Service Provider:
- [ ] **Option 1: SendGrid** (Recommended - has free tier)
  - Need: API Key from SendGrid dashboard
  - Free tier: 100 emails/day

- [ ] **Option 2: Mailgun**
  - Need: API Key and domain
  - Free tier: 5,000 emails/month for 3 months

- [ ] **Option 3: AWS SES**
  - Need: AWS credentials
  - Very cheap but more technical setup

- [ ] **Option 4: Resend** (Modern, developer-friendly)
  - Need: API Key
  - Free tier: 3,000 emails/month

### Email Configuration:
- [ ] **Email to receive form submissions**: ________________
- [ ] **From email address**: noreply@yourdomain.com (or preferred)
- [ ] **Reply-to email**: info@yourdomain.com (or preferred)

---

## 🎨 Branding Assets (Optional but Recommended)

### Logo
- [ ] **Primary Logo** (for header)
  - Preferred format: SVG or PNG with transparent background
  - Recommended size: 200px × 60px (or proportional)

- [ ] **Icon/Favicon** (for browser tab)
  - Size: 32×32px, 64×64px, 128×128px
  - Format: PNG or ICO

### Images (if replacing Unsplash placeholders)
- [ ] **Hero Image** (home page) - High quality, 1920×1080px minimum
- [ ] **Service Images** (6 images for each service type)
- [ ] **Team Photos** (for About page therapist profiles)
- [ ] **Package Images** (4 images for package cards)

### Brand Colors (if different from current)
Current theme:
- Gold: #D4AF37
- Terracotta: #E07856
- Charcoal: #2D2D2D
- Cream: #FAF7F2

- [ ] Keep current colors? **Yes / No**
- [ ] If No, provide:
  - Primary color: #______
  - Accent color: #______
  - Background color: #______

---

## 📊 Analytics & Tracking

### Google Analytics
- [ ] **Google Analytics 4 Property ID**
  - Format: G-XXXXXXXXXX
  - Get from: https://analytics.google.com/
  - Add to: .env.local as `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`

### Other Tracking (Optional)
- [ ] Facebook Pixel ID
- [ ] Google Tag Manager ID
- [ ] LinkedIn Insight Tag

---

## 📝 Content Details

### Service Descriptions
Current descriptions are generic. Do you want to customize?
- [ ] Keep current service descriptions? **Yes / No**
- [ ] If No, provide custom text for each service

### About Page Content
- [ ] **Owner/Founder Bio**
  - Name: ________________
  - Photo: (provide)
  - Background/story: ________________

- [ ] **Therapist Profiles** (if you have a team)
  - Name: ________________
  - Photo: (provide)
  - Specialties: ________________
  - Certifications: ________________
  - (Repeat for each therapist)

- [ ] **Years in Business**: ____
- [ ] **Certifications/Awards**: ________________

### Testimonials/Reviews
Current testimonials are placeholder examples:
- [ ] Keep placeholder testimonials? **Yes / No**
- [ ] If No, provide 3-6 real testimonials with:
  - Client first name + last initial
  - Review text (2-3 sentences)
  - Date (optional)
  - Rating (all currently 5 stars)

### Service Area Details
- [ ] **Specific cities/zip codes served**
  - Currently: "South Florida from Delray Beach to Miami"
  - Be specific for better local SEO

- [ ] **Service radius** (if applicable)
  - E.g., "30-mile radius from Delray Beach"

- [ ] **Travel fees** (if applicable)
  - Within X miles: no charge
  - Beyond X miles: $__ per mile

---

## 🔒 Legal Pages Content

### Privacy Policy
- [ ] Use generic template? **Yes / No**
- [ ] If No, client should provide or hire lawyer
- [ ] Need to specify:
  - How you collect data
  - What data you collect (name, email, phone)
  - How you use it (booking, communication)
  - Third-party services (email provider, analytics)

### Terms of Service
- [ ] Use generic template? **Yes / No**
- [ ] Need to specify:
  - Cancellation policy (how many hours notice?)
  - Payment terms (when is payment due?)
  - Refund policy
  - Liability disclaimers
  - Age restrictions (if any)
  - Health/medical disclaimers

---

## 💳 Payment Information (If Applicable)

- [ ] **Accept online payments?** **Yes / No**
- [ ] If Yes, preferred method:
  - [ ] Stripe
  - [ ] Square
  - [ ] PayPal
  - [ ] Venmo/Zelle (for deposits)

- [ ] **Deposit required?**
  - Amount: $____ or ____%
  - Refundable? **Yes / No**

---

## 📱 Additional Features (Optional)

- [ ] **Gift Certificates/Vouchers?**
  - Need purchase page and redemption system

- [ ] **Membership/Subscription Program?**
  - Current page mentions it but no details
  - Monthly price: $____
  - What's included: ________________

- [ ] **Online Store** (products like oils, accessories)?

- [ ] **Blog/Articles** section?

- [ ] **Before/After Photos**?
  - Need client permission/releases

---

## 🎯 Quick Start Minimum

**To launch with basic functionality, you MUST have:**

1. ✅ Business name
2. ✅ Phone number
3. ✅ Email address
4. ✅ Domain name
5. ✅ Pricing for all services
6. ✅ Booking calendar embed code OR email service setup
7. ✅ Social media links (at minimum, Facebook or Instagram)

**Everything else can be updated after launch.**

---

## 📋 Information Gathering Form

You can copy this and send to client:

```
MOBILE MASSAGE WEBSITE - CLIENT INFORMATION FORM

BUSINESS BASICS:
- Business Name: ___________________________
- Phone: ___________________________
- Email: ___________________________
- Domain (if purchased): ___________________________

SERVICE AREA:
- Cities/Regions Served: ___________________________
- Travel Fees (if any): ___________________________

PRICING - SERVICES:
Swedish Massage: 60min $____ | 90min $____ | 120min $____
Deep Tissue: 60min $____ | 90min $____ | 120min $____
Back-to-Back Couples: 120min $____ | 180min $____
Hot Stone: 75min $____ | 90min $____ | 120min $____
Prenatal: 60min $____ | 90min $____
Sports: 60min $____ | 90min $____ | 120min $____

PRICING - PACKAGES:
Executive Stress Relief (90min): $____
Couples Retreat (180min total): $____
Athlete Recovery (75min): $____
Ultimate Indulgence (120min): $____

BOOKING SYSTEM:
Using: Calendly / Acuity / Square / Other: ___________
Embed Code or URL: ___________________________

SOCIAL MEDIA:
Facebook: ___________________________
Instagram: ___________________________
Other: ___________________________

LEGAL:
Cancellation Policy: ___ hours notice required
Payment: Due at booking / Due at appointment / Other: ______
Refund Policy: ___________________________
```

---

## 🚀 Implementation Priority

**Phase 1 - Pre-Launch (Required):**
- Business name, contact info, domain
- Pricing
- Booking system integration
- Email service for contact form

**Phase 2 - Launch Week:**
- Logo and favicon
- Social media links
- Real testimonials
- Analytics setup

**Phase 3 - Post-Launch:**
- Professional photos
- Team bios
- Legal pages (detailed)
- Additional features

---

**Next Steps:**
1. Send this document to client
2. Schedule call to review responses
3. Update files with real information
4. Test everything before final launch
5. Submit sitemap to Google Search Console
