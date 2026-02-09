<#
.SYNOPSIS
    Generate ALL realistic images for Aurea Essence Massage website
.DESCRIPTION
    Generates photorealistic images for all services using DALL-E 3 HD quality.
    Prompts are designed to look like professional spa photography.
#>

param(
    [Parameter(Mandatory = $false)]
    [ValidateSet("openai", "gemini")]
    [string]$Provider = "openai",

    [Parameter(Mandatory = $false)]
    [switch]$SkipExisting = $true
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptDir
$outputDir = Join-Path -Path $repoRoot -ChildPath "public\images\generated"

# Ensure output directory exists
if (-not (Test-Path -Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "AUREA ESSENCE MASSAGE IMAGE GENERATION" -ForegroundColor Cyan
Write-Host "Photorealistic Professional Photography" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Provider: $Provider" -ForegroundColor Yellow
Write-Host "Output: $outputDir" -ForegroundColor Gray
Write-Host ""

# Define all images with PHOTOREALISTIC prompts
$images = @(
    @{
        name = "service-swedish.png"
        prompt = "Professional spa photography: Licensed massage therapist performing Swedish massage on a client lying face down on a professional massage table. The therapist's hands are using long, flowing strokes on the client's back. Warm, natural lighting from a nearby window. Calming neutral tones - cream linens, bamboo floors, soft beige walls. Fresh white towels, a small dish with massage oil. The scene feels serene and professional. Shot with a professional camera, shallow depth of field, natural color grading. Photorealistic, high-end spa aesthetic."
    },
    @{
        name = "service-deep-tissue.png"
        prompt = "Professional spa photography: Close-up of a massage therapist's hands applying firm, targeted pressure to a client's shoulder and upper back muscles during a deep tissue massage. The therapist uses their forearm and elbow for deeper pressure. Professional massage table with clean white linens. Warm, professional lighting. The client's body shows relaxed positioning. Natural skin tones, realistic anatomy. Shot like a high-end spa brochure photo - sharp focus on the hands and treatment area, soft bokeh background. Photorealistic professional wellness photography."
    },
    @{
        name = "service-reflexology.png"
        prompt = "Professional spa photography: Licensed reflexology therapist performing foot reflexology treatment. Close-up of therapist's hands applying precise thumb pressure to specific reflex points on a client's foot. The client is seated comfortably in a reclining chair with legs elevated. Warm, inviting spa environment with soft natural lighting. Clean, professional setting with cream and earth tones. A small bowl of warm water and essential oils nearby. Shot with professional camera equipment, natural color palette, sharp focus on the hands and foot. Photorealistic wellness photography."
    },
    @{
        name = "service-lymphatic-drainage.png"
        prompt = "Professional spa photography: Gentle lymphatic drainage massage being performed on a client's leg. The therapist's hands are using very light, rhythmic movements with specialized lymphatic drainage technique - flat hands making gentle pumping motions. Professional massage table with soft white linens. Calm, clean spa environment with natural window light. Peaceful atmosphere with plants and neutral colors. The movements are visibly gentle and therapeutic. Shot like a medical spa brochure - professional, clean, trustworthy aesthetic. Photorealistic healthcare photography style."
    },
    @{
        name = "service-post-surgical.png"
        prompt = "Professional medical spa photography: Licensed massage therapist performing gentle post-surgical massage on a client's abdomen or leg area (no visible surgical scars). The therapist uses extremely gentle, specialized techniques with careful hand placement. Clean, professional medical spa setting with excellent lighting. The scene conveys healing, safety, and medical professionalism. White linens, clean surfaces, professional equipment. Natural lighting, calming environment. Shot like a medical wellness facility brochure - professional, trustworthy, clinical but warm. Photorealistic medical spa photography."
    },
    @{
        name = "service-couples.png"
        prompt = "Professional spa photography: Two separate massage tables positioned side by side in a luxurious spa room, each with a client receiving a massage from their own therapist. The couples are lying face down, relaxed. The room has romantic, upscale ambiance - soft candlelight, rose petals, warm earthy tones. Large windows with sheer curtains letting in natural light. Professional massage therapists working simultaneously. High-end luxury spa aesthetic. Shot with professional camera, cinematic composition, warm color grading. Photorealistic luxury spa photography."
    },
    @{
        name = "service-prenatal.png"
        prompt = "Professional spa photography: Pregnant woman (side profile showing pregnancy) lying comfortably on her side on a specially designed prenatal massage table with supportive cushions and pillows. A certified prenatal massage therapist is gently massaging her lower back using safe, nurturing techniques. The woman looks peaceful and relaxed. Warm, soft lighting creates a nurturing atmosphere. Calm colors - soft pink, cream, natural wood. Fresh flowers in the background. Shot with professional camera - natural, warm, caring aesthetic. Photorealistic maternity wellness photography."
    },
    @{
        name = "addon-hot-stones.png"
        prompt = "Professional spa photography: Close-up of smooth, heated black basalt massage stones placed in a line down a client's spine. The client is lying face down on a massage table with white linens. The stones are glistening slightly with massage oil. Warm, ambient spa lighting. Bamboo mat visible under the table, small candles in the background. Steam or heat shimmer subtly visible from the stones. Shot with macro lens, shallow depth of field focusing on the stones. Warm color temperature. Photorealistic luxury spa detail photography."
    },
    @{
        name = "addon-cbd-oil.png"
        prompt = "Professional product photography: Elegant amber glass dropper bottle of CBD massage oil on a clean spa counter, with a small amount of oil pooled on a natural stone surface. Hemp leaves artfully placed nearby (legal hemp plant). Professional spa setting with soft natural light from a window. Neutral background - white marble or light wood. Clean, minimalist, high-end aesthetic. Shot with professional camera, sharp focus on the product, soft background blur. Natural color grading. Photorealistic product photography for wellness brand."
    },
    @{
        name = "addon-aromatherapy.png"
        prompt = "Professional spa photography: Collection of small essential oil bottles in amber and blue glass arranged on a natural wood tray. Soft morning light coming through a nearby window. Fresh lavender sprigs, eucalyptus leaves, and rose petals artfully placed around the bottles. An oil diffuser creating a light mist in the background. Clean, natural spa aesthetic - white surfaces, wood accents, green plants. Shot with professional camera, natural light, sharp product focus with soft bokeh. Photorealistic luxury spa product photography."
    },
    @{
        name = "hero-main.png"
        prompt = "Professional spa photography: Wide shot of a serene, high-end spa treatment room. A massage table with pristine white linens is centered in the frame. Large windows with sheer white curtains let in soft, natural sunlight. The room features warm wood floors, cream walls, potted plants, and subtle spa decor. A small side table holds massage oils, candles, and fresh flowers. The space feels luxurious, peaceful, and inviting. Shot with professional camera, wide angle lens, natural lighting, warm color palette. Photorealistic luxury spa interior photography."
    },
    @{
        name = "hero-about.png"
        prompt = "Professional portrait photography: Professional female massage therapist (age 25-40) standing confidently in a beautiful spa room, wearing clean professional spa attire (neutral-colored tunic). She has a warm, welcoming smile and professional demeanor. Soft natural window lighting illuminates her face. Background shows a clean, organized spa treatment room with massage table, plants, and calming decor - slightly out of focus. Shot with professional portrait lens (85mm), natural color grading, warm tones. Photorealistic professional portrait for wellness business."
    },
    @{
        name = "hero-events.png"
        prompt = "Professional event photography: Elegant spa party setup in a beautiful, spacious room. Multiple massage tables arranged with ample space between them, each with white linens and rolled towels. Decorative elements include string lights, fresh flower arrangements, champagne glasses on a refreshment table, and gift bags. Large windows with natural light. The space looks ready for a bridal shower or corporate wellness event. Upscale, celebratory, yet professional atmosphere. Shot with professional camera, wide angle, natural + ambient lighting. Photorealistic event venue photography."
    },
    @{
        name = "hero-gift-cards.png"
        prompt = "Professional product photography: Elegant physical gift card or gift certificate for a spa, displayed on a marble surface with gold accents. The card features a minimalist design with spa imagery - perhaps a small gold foil lotus or abstract wave pattern. Surrounded by luxury spa elements: a silk ribbon, fresh white flowers (orchid or gardenia), and soft fabric. Soft natural window light creates a high-end feel. Shot with professional camera, shallow depth of field, luxury brand aesthetic. Warm, inviting tones. Photorealistic luxury gift photography."
    },
    @{
        name = "bg-testimonials.png"
        prompt = "Professional spa photography: Soft-focus background image of a peaceful spa environment. Out-of-focus view of a massage table with white linens, candles creating a warm glow, and green plants. Window light creating a soft, dreamy bokeh effect. Warm cream and gold tones. Very soft, subtle, meant to be a non-distracting background image. Shot with professional camera at wide aperture (f/1.8), intentionally out of focus, warm color grading, peaceful mood. Photorealistic environmental spa photography."
    }
)

$generateScript = Join-Path -Path $scriptDir -ChildPath "generate-image.ps1"
$successCount = 0
$skipCount = 0
$failCount = 0
$totalCount = $images.Count

foreach ($img in $images) {
    $outputFile = Join-Path -Path $outputDir -ChildPath $img.name
    $currentNum = $images.IndexOf($img) + 1

    Write-Host "[$currentNum/$totalCount] Processing: $($img.name)" -ForegroundColor Cyan

    # Skip if exists and SkipExisting is enabled
    if ($SkipExisting -and (Test-Path -Path $outputFile)) {
        Write-Host "  [SKIP] File already exists" -ForegroundColor Yellow
        $skipCount++
        continue
    }

    try {
        Write-Host "  Generating with $Provider..." -ForegroundColor Gray

        $startTime = Get-Date

        & $generateScript `
            -Prompt $img.prompt `
            -OutputFile $outputFile `
            -Provider $Provider `
            -AspectRatio "16:9" `
            -TimeoutSeconds 180

        $duration = (Get-Date) - $startTime

        if (Test-Path -Path $outputFile) {
            $fileSize = [math]::Round((Get-Item $outputFile).Length / 1024, 2)
            Write-Host "  [SUCCESS] $($img.name) ($fileSize KB) - $([math]::Round($duration.TotalSeconds, 1))s" -ForegroundColor Green
            $successCount++
        }
        else {
            throw "Output file not created"
        }
    }
    catch {
        Write-Host "  [FAILED] $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }

    # Rate limiting delay between API calls
    if ($currentNum -lt $totalCount) {
        Write-Host "  Waiting 5 seconds before next generation..." -ForegroundColor DarkGray
        Start-Sleep -Seconds 5
    }

    Write-Host ""
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "GENERATION COMPLETE" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Success: $successCount" -ForegroundColor Green
Write-Host "Skipped: $skipCount" -ForegroundColor Yellow
Write-Host "Failed: $failCount" -ForegroundColor $(if ($failCount -eq 0) { "Green" } else { "Red" })
Write-Host ""
Write-Host "Images saved to: $outputDir" -ForegroundColor Gray
