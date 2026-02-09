<#
.SYNOPSIS
    Generate remaining images with ultra-safe prompts for OpenAI
.DESCRIPTION
    Environment and equipment-only prompts to avoid content filters
#>

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptDir
$outputDir = Join-Path -Path $repoRoot -ChildPath "public\images\generated"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "GENERATING WITH SAFE PROMPTS (OPENAI)" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Ultra-safe prompts - NO people, NO touch, just spa environments
$images = @(
    @{
        name = "service-swedish.png"
        prompt = "Luxurious spa treatment room interior. Empty massage table with cream-colored linens perfectly made, small wooden table with massage oil bottles, bamboo floors, large window with natural sunlight, potted plants, calm beige walls, rolled white towels on a shelf. The peaceful, empty room awaits a relaxing Swedish massage session. Professional interior photography, warm natural lighting, 16:9 composition."
    },
    @{
        name = "service-deep-tissue.png"
        prompt = "Professional massage therapy room setup. Empty treatment table with white linens, therapy tools (wooden massage rollers, therapy balls) neatly arranged on a tray, muscle anatomy poster on wall, warm wood furniture, professional lighting. Clean, organized therapeutic wellness space ready for deep tissue work. No people present. Interior photography, professional aesthetic, natural tones."
    },
    @{
        name = "service-reflexology.png"
        prompt = "Serene reflexology treatment area. Comfortable recliner chair in upright position, elevated footrest, small side table with essential oil bottles, reflexology chart visible on wall, warm lighting, plants in corners, spa decor. The empty, welcoming space is prepared for foot reflexology therapy. Interior design photography, calm earth tones, professional wellness environment."
    },
    @{
        name = "service-lymphatic-drainage.png"
        prompt = "Bright medical spa treatment room. Empty massage table with fresh white linens, large windows with natural light, green plants, lymphatic system educational poster on wall, clean white and wood surfaces. The pristine, empty clinical yet calming space designed for lymphatic drainage treatments. Healthcare facility photography, professional and welcoming."
    },
    @{
        name = "service-post-surgical.png"
        prompt = "Clean medical wellness recovery room. Professional-grade empty massage table, white medical linens, bright natural window lighting, medical certifications framed on wall, organized shelving with supplies, plants adding warmth. The sterile yet comfortable empty space designed for post-operative recovery massage. Medical facility interior photography, trustworthy aesthetic."
    },
    @{
        name = "service-prenatal.png"
        prompt = "Nurturing maternity wellness room. Specialized massage table with pregnancy support pillows arranged to show comfort features, soft pink and cream decor, fresh flowers in vase, natural wood furniture, warm ambient lighting. The empty, caring space designed specifically for prenatal massage therapy. Interior photography, maternal care aesthetic, gentle tones."
    },
    @{
        name = "addon-hot-stones.png"
        prompt = "Professional spa product photography. Smooth black basalt massage stones artistically arranged on bamboo mat, some stones stacked in zen formation, others in a line, all glistening with oil. Stone warmer heating device visible, lit candles, natural wood surface. Still life composition focused on hot stone therapy equipment. Product photography, warm lighting, spa aesthetic."
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
            -Provider "openai" `
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
        Write-Host "  Waiting 5 seconds..." -ForegroundColor DarkGray
        Start-Sleep -Seconds 5
    }
    Write-Host ""
}

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "COMPLETE" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Success: $successCount / $totalCount" -ForegroundColor $(if ($successCount -eq $totalCount) { "Green" } else { "Yellow" })
if ($failCount -gt 0) {
    Write-Host "Failed: $failCount" -ForegroundColor Red
}
