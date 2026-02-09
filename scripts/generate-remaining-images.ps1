<#
.SYNOPSIS
    Generate the remaining images that were blocked by OpenAI filters
.DESCRIPTION
    Uses Gemini with environment-focused prompts to avoid content filters
#>

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptDir
$outputDir = Join-Path -Path $repoRoot -ChildPath "public\images\generated"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "GENERATING REMAINING IMAGES WITH GEMINI" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Revised prompts focusing on environment and hands-only views
$images = @(
    @{
        name = "service-swedish.png"
        prompt = "Professional spa photography of a serene massage room setup for Swedish massage. Massage table with soft cream linens in the center, small bottles of massage oils on a wooden side table, warm ambient lighting from a nearby window creating golden tones on bamboo floors. Fresh white towels neatly rolled, a small dish with oil, calming neutral beige walls. The room exudes peace and professional care. No people visible - just the beautiful, ready treatment space. Photorealistic, high-end spa interior."
    },
    @{
        name = "service-deep-tissue.png"
        prompt = "Professional spa treatment room prepared for deep tissue massage session. Massage table with white linens, specialized massage tools (wooden rollers, therapy balls) arranged on a tray. Warm professional lighting highlighting the clean, organized space. Earth tones and natural wood furniture. A chart showing muscle groups on the wall. The space conveys strength and therapeutic expertise. No people - just the professional setup. Photorealistic wellness facility interior."
    },
    @{
        name = "service-reflexology.png"
        prompt = "Elegant reflexology treatment space with a comfortable reclining chair, footrest elevated, small bowls of warm water with flower petals, reflexology foot chart on the wall, essential oil bottles on a nearby shelf. Warm inviting lighting, cream and earth tones, plants in corners. The setup is ready for a relaxing foot treatment session. No people present - environment focus. Photorealistic professional wellness space."
    },
    @{
        name = "service-lymphatic-drainage.png"
        prompt = "Clean, calming medical spa treatment room set up for lymphatic drainage therapy. Massage table with soft white linens, natural window light creating a peaceful atmosphere, plants adding life, neutral colors throughout. Clinical but warm environment - white surfaces, wood accents. A detailed lymphatic system diagram on the wall. Space conveys healing and gentle care. No people - just the pristine therapeutic environment. Photorealistic medical spa interior."
    },
    @{
        name = "service-post-surgical.png"
        prompt = "Professional medical spa recovery room designed for post-surgical massage therapy. Clean, bright space with medical-grade massage table, white linens, excellent lighting from large windows. Professional but comforting atmosphere with plants and soft colors. A medical certification plaque on the wall. Everything is organized and sterile yet welcoming. The space radiates safety and healing. No people visible - environmental shot. Photorealistic medical wellness facility."
    },
    @{
        name = "service-prenatal.png"
        prompt = "Nurturing prenatal massage treatment room with specialized massage table featuring supportive pregnancy cushions and pillows arranged to show side-lying position support. Soft pink and cream tones, natural wood furniture, fresh flowers in a vase, warm lighting creating a caring atmosphere. Calming decor and comfortable seating. The space is designed for expectant mothers' comfort. No people - just the caring environment setup. Photorealistic maternity wellness space."
    },
    @{
        name = "addon-hot-stones.png"
        prompt = "Professional spa still life of smooth, black basalt hot massage stones arranged artistically on a bamboo mat. Some stones are stacked, others laid in a line, all glistening with massage oil. A stone warmer device visible in the background, soft candlelight creating warm ambiance. Natural textures - bamboo, stone, wood surfaces. Close-up product photography showing the quality and preparation of hot stone therapy. No people - focus on the stones and setup. Photorealistic spa detail photography."
    }
)

$generateScript = Join-Path -Path $scriptDir -ChildPath "generate-image.ps1"
$successCount = 0
$failCount = 0

foreach ($img in $images) {
    $outputFile = Join-Path -Path $outputDir -ChildPath $img.name
    $currentNum = $images.IndexOf($img) + 1
    $totalCount = $images.Count

    Write-Host "[$currentNum/$totalCount] Generating: $($img.name)" -ForegroundColor Cyan

    try {
        & $generateScript `
            -Prompt $img.prompt `
            -OutputFile $outputFile `
            -Provider "gemini" `
            -AspectRatio "16:9" `
            -TimeoutSeconds 180

        if (Test-Path -Path $outputFile) {
            $fileSize = [math]::Round((Get-Item $outputFile).Length / 1024, 2)
            Write-Host "  [SUCCESS] $($img.name) ($fileSize KB)" -ForegroundColor Green
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

    if ($currentNum -lt $totalCount) {
        Write-Host "  Waiting 3 seconds..." -ForegroundColor DarkGray
        Start-Sleep -Seconds 3
    }
    Write-Host ""
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "COMPLETE" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Success: $successCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor $(if ($failCount -eq 0) { "Green" } else { "Red" })
