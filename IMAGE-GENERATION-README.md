# Image Generation System

## 🎯 Quick Start

**Double-click `GENERATE-IMAGES.bat`** to generate all website images automatically!

---

## 📋 What Gets Generated

### Core Services (7 images)
- ✅ Swedish Massage - Professional spa therapy photo
- ✅ Deep Tissue Massage - Targeted muscle therapy photo
- ✅ Reflexology - Foot pressure point therapy photo
- ✅ Lymphatic Drainage - Gentle therapeutic massage photo
- ✅ Post-Surgical Massage - Medical spa treatment photo
- ✅ Couples Massage - Side-by-side luxury spa photo
- ✅ Prenatal Massage - Safe maternity massage photo

### Add-Ons (3 images)
- ✅ Hot Stones - Heated basalt stones on back
- ✅ CBD Oil - Professional product photography
- ✅ Aromatherapy - Essential oils and diffuser

### Hero Images (4 images)
- ✅ Main Hero - Luxury spa treatment room
- ✅ About Page - Professional therapist portrait
- ✅ Events Page - Spa party event setup
- ✅ Gift Cards - Elegant gift card display

### Background (1 image)
- ✅ Testimonials - Soft-focus spa background

**Total: 15 professional images**

---

## 🎨 Image Quality

All images are generated with:
- **DALL-E 3 HD** for maximum photorealism
- **16:9 aspect ratio** for modern web design
- **Natural photography style** (NOT illustrated/painted)
- **Professional spa aesthetic**
- Warm, inviting lighting
- Realistic anatomy and skin tones
- No text or symbols in images

---

## 🚀 Usage

### Method 1: Generate All Images (Recommended)
```bash
# Double-click this file:
GENERATE-IMAGES.bat

# Or run manually:
powershell -ExecutionPolicy Bypass -File ".\scripts\generate-all-images.ps1" -Provider openai
```

### Method 2: Generate Single Image
```powershell
.\scripts\generate-image.ps1 `
  -Prompt "Your custom prompt here" `
  -OutputFile ".\public\images\generated\my-image.png" `
  -Provider "openai" `
  -AspectRatio "16:9"
```

### Method 3: Regenerate Specific Images
```powershell
# Regenerate without skipping existing
.\scripts\generate-all-images.ps1 -Provider openai -SkipExisting:$false
```

---

## ⚙️ Configuration

### API Keys Required

The script looks for API keys in:
```
C:\Users\nicho\OneDrive\Desktop\CURRENT PROJECTS\SyncedUpCommandCenter\.env.ai.local
```

Required keys:
- `OPENAI_API_KEY` - For DALL-E 3 (recommended)
- `GEMINI_API_KEY` - Alternative provider

### Change Provider

OpenAI DALL-E 3 (default - best photorealism):
```powershell
.\scripts\generate-all-images.ps1 -Provider openai
```

Google Gemini (alternative):
```powershell
.\scripts\generate-all-images.ps1 -Provider gemini
```

---

## 📊 Generation Time

- **Per image**: ~20-30 seconds
- **All 15 images**: ~10-15 minutes
- Includes 5-second delays between requests for rate limiting

---

## 🎯 Image Prompts Philosophy

All prompts are designed to create **photorealistic professional spa photography**, not AI-looking illustrations:

✅ **DO:**
- Professional spa photography terminology
- Natural lighting descriptions
- Realistic anatomy and skin tones
- High-end spa aesthetic
- Professional camera techniques

❌ **AVOID:**
- Illustrated or painted styles
- Unnatural anatomy (6 fingers, extra limbs)
- Unrealistic lighting or colors
- Text or symbols in images
- Overly stylized or fantastical elements

---

## 📁 Output Location

All generated images are saved to:
```
public/images/generated/
```

These paths are already configured in:
```
config/business.ts
```

---

## 🔧 Troubleshooting

### "API Key not found"
- Check that `.env.ai.local` exists in SyncedUpCommandCenter
- Verify the file contains `OPENAI_API_KEY=your-key-here`

### "Image looks AI-generated"
- DALL-E 3 with "natural" style and "hd" quality produces the most realistic results
- Try regenerating individual images if needed
- Adjust prompts in `generate-all-images.ps1` for more specific guidance

### "Generation failed"
- Check internet connection
- Verify API key is valid and has credits
- Check OpenAI/Gemini service status
- Increase timeout: add `-TimeoutSeconds 300` parameter

---

## 💡 Tips

1. **Skip existing files**: Default behavior prevents overwriting. Use `-SkipExisting:$false` to force regeneration.

2. **Batch processing**: The script automatically handles rate limiting with 5-second delays.

3. **Custom images**: Use `generate-image.ps1` directly for one-off custom images.

4. **Cost estimate**:
   - DALL-E 3 HD: ~$0.08 per image
   - 15 images: ~$1.20 total
   - Gemini: Free tier available

---

## 📝 Customization

To modify image prompts, edit:
```
scripts/generate-all-images.ps1
```

Find the `$images` array and update the `prompt` field for any image.

Example:
```powershell
@{
    name = "service-swedish.png"
    prompt = "Your custom photorealistic prompt here..."
}
```

---

**Ready to generate?** Double-click `GENERATE-IMAGES.bat` to start! 🚀
