# Vercel Environment Variables - Configuration Checklist

## ✅ Required (MUST Configure)

### Authentication & Security
```bash
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
ADMIN_PASSWORD=your-secure-admin-password-min-8-chars
```
⚠️ **CRITICAL**: Change from default values!

### Database (Vercel KV)
```bash
KV_REST_API_URL=<auto-configured-by-vercel>
KV_REST_API_TOKEN=<auto-configured-by-vercel>
KV_URL=<auto-configured-by-vercel>
```
📌 **Note**: Automatically set when you add Vercel KV integration

### Cron Jobs
```bash
CRON_SECRET=your-random-secret-for-cron-endpoints
```
📌 Use for securing cron job endpoints

---

## 📧 Email Configuration (Recommended)

### Resend Email Service
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```
📌 Get from: https://resend.com/api-keys

**Alternative**: Configure via Admin Panel → Settings instead

### Email Addresses (Optional - Can set via Admin Panel)
```bash
FROM_EMAIL=noreply@aureaessencemassage.com
ADMIN_EMAIL=admin@syncedupsolutions.com
```

---

## 📱 SMS Configuration (Optional - Admin Panel Preferred)

### Twilio Settings
```bash
# Option 1: Set via Admin Panel (RECOMMENDED)
# Go to Admin → Settings → SMS Notifications section

# Option 2: Set as Environment Variables (Fallback)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+19064777526
TWILIO_ADMIN_PHONE=+16238062439
```

📌 **Recommendation**: Use Admin Panel for SMS settings so you can change numbers without redeploying

---

## 🌐 Site Configuration

### Public Variables
```bash
NEXT_PUBLIC_SITE_URL=https://aureaessencemassage.com
```
📌 Must start with `NEXT_PUBLIC_` to be available in browser

---

## 📋 Complete Vercel Configuration Steps

### 1. Add Vercel KV Integration
```bash
# In Vercel Dashboard:
1. Go to your project
2. Click "Storage" tab
3. Click "Create Database"
4. Select "KV (Key-Value Store)"
5. Click "Create"
```
✅ This automatically adds `KV_*` environment variables

### 2. Set Environment Variables
```bash
# In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add each variable below
3. Select environment: Production, Preview, Development
```

### 3. Minimum Required Variables (Copy-Paste Ready)
```
# Security (CHANGE THESE!)
JWT_SECRET=CHANGE_THIS_TO_RANDOM_STRING_MIN_32_CHARS
ADMIN_PASSWORD=CHANGE_THIS_SECURE_PASSWORD
CRON_SECRET=CHANGE_THIS_RANDOM_SECRET

# Site
NEXT_PUBLIC_SITE_URL=https://aureaessencemassage.com

# Email (Get from resend.com)
RESEND_API_KEY=re_YOUR_KEY_HERE
```

### 4. Optional Variables (Configure via Admin Panel Instead)
```
# These can be set via Admin Panel → Settings
# Only add if you want hardcoded fallbacks

FROM_EMAIL=noreply@aureaessencemassage.com
ADMIN_EMAIL=admin@syncedupsolutions.com

# SMS can be configured in Admin Panel
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
TWILIO_ADMIN_PHONE=+1xxxxxxxxxx
```

---

## 🎯 Priority Checklist

### Critical (Site won't work without these):
- [x] KV_REST_API_URL (from Vercel KV)
- [x] KV_REST_API_TOKEN (from Vercel KV)
- [x] JWT_SECRET
- [x] ADMIN_PASSWORD
- [x] NEXT_PUBLIC_SITE_URL

### Important (Features won't work):
- [x] RESEND_API_KEY (for email notifications)
- [x] CRON_SECRET (for scheduled reminders)

### Optional (Can configure via Admin Panel):
- [x] FROM_EMAIL
- [x] ADMIN_EMAIL
- [x] TWILIO_ACCOUNT_SID
- [x] TWILIO_AUTH_TOKEN
- [x] TWILIO_PHONE_NUMBER
- [x] TWILIO_ADMIN_PHONE

---

## 🔒 Security Best Practices

1. **Never commit .env.local to git** ✅ Already in .gitignore
2. **Use different secrets for each environment**
3. **Rotate JWT_SECRET if admin credentials are compromised**
4. **Use strong passwords** (min 12 chars, mixed case, numbers, symbols)
5. **Keep CRON_SECRET secure** to prevent unauthorized cron calls

---

## 🧪 Testing Configuration

After deploying, test each feature:

```bash
# Email notifications
1. Submit a booking form
2. Check admin email receives alert

# SMS notifications (if configured)
1. Enable SMS in Admin Panel
2. Submit a booking
3. Check customer and admin receive SMS

# Admin Panel
1. Login at /admin
2. Change password in Settings
3. Configure email/SMS settings
```

---

## 📝 Notes

- **Admin Panel Settings**: Most settings can be managed via `/admin` without redeploying
- **Environment Priority**: Admin Panel > Environment Variables > Defaults
- **KV Storage**: Stores bookings, settings, and admin credentials
- **Automatic Variables**: Vercel sets NODE_ENV automatically (production/preview/development)

---

## 🆘 Troubleshooting

**Issue**: "Database not configured"
- **Solution**: Add Vercel KV integration

**Issue**: "Email not sending"
- **Solution**: Check RESEND_API_KEY is set or configure in Admin Panel

**Issue**: "SMS not working"
- **Solution**: Enable SMS in Admin Panel → Settings → SMS Notifications

**Issue**: "Can't login to admin"
- **Solution**: Check ADMIN_PASSWORD and JWT_SECRET are set

---

Generated: 2026-02-08
Project: Aurea Essence Massage
