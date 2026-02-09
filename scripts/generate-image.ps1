<#
.SYNOPSIS
    AI Image Generation Tool for Aurea Essence Massage
.DESCRIPTION
    Generates photorealistic images using AI models (Gemini/OpenAI DALL-E).
.PARAMETER Prompt
    The text description of the image to generate.
.PARAMETER OutputFile
    Full absolute path where the generated image will be saved.
.PARAMETER Provider
    The AI provider to use (default: openai for photorealism).
.PARAMETER AspectRatio
    Aspect ratio for the image (default: 1:1). Options: 1:1, 16:9, 9:16, 4:3, 3:4
.EXAMPLE
    .\generate-image.ps1 -Prompt "Professional massage therapy session" -OutputFile "C:\path\to\image.png"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$Prompt,

    [Parameter(Mandatory = $true)]
    [string]$OutputFile,

    [Parameter(Mandatory = $false)]
    [ValidateSet("gemini", "openai")]
    [string]$Provider = "openai",

    [Parameter(Mandatory = $false)]
    [ValidateSet("1:1", "16:9", "9:16", "4:3", "3:4")]
    [string]$AspectRatio = "1:1",

    [Parameter(Mandatory = $false)]
    [int]$TimeoutSeconds = 120
)

$ErrorActionPreference = "Stop"

# Get script directory for relative imports
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptDir

# Load environment variables from SyncedUpCommandCenter
$ccRoot = Split-Path -Parent $repoRoot
$envFilePath = Join-Path -Path $ccRoot -ChildPath "SyncedUpCommandCenter\.env.ai.local"
if (Test-Path -Path $envFilePath) {
    $envContent = Get-Content -Path $envFilePath -ErrorAction SilentlyContinue
    foreach ($line in $envContent) {
        if ($line -match '^\s*#' -or $line -match '^\s*$') { continue }
        if ($line -match '^([^=]+)=(.*)$') {
            $key = $Matches[1].Trim()
            $value = $Matches[2].Trim() -replace '^["'']|["'']$', ''
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}

# Result object
$result = @{
    success = $false
    outputFile = $OutputFile
    provider = $Provider
    error = $null
    timestamp = (Get-Date -Format "o")
}

# Ensure output directory exists
$outputDir = Split-Path -Parent $OutputFile
if (-not [string]::IsNullOrWhiteSpace($outputDir) -and -not (Test-Path -Path $outputDir)) {
    try {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
        Write-Host "[INFO] Created directory: $outputDir"
    }
    catch {
        $result.error = "Failed to create output directory: $($_.Exception.Message)"
        $result | ConvertTo-Json -Depth 5
        exit 1
    }
}

# ============================================================================
# OPENAI PROVIDER (DALL-E 3)
# ============================================================================
function Invoke-OpenAIImageGeneration {
    param(
        [string]$Prompt,
        [string]$OutputFile,
        [string]$AspectRatio,
        [int]$Timeout
    )

    $apiKey = [Environment]::GetEnvironmentVariable("OPENAI_API_KEY")
    if ([string]::IsNullOrWhiteSpace($apiKey)) {
        throw "OPENAI_API_KEY environment variable is not set"
    }

    Write-Host "[INFO] Generating image with OpenAI DALL-E 3..."
    Write-Host "[INFO] Prompt: $Prompt"

    # Map aspect ratio to size
    $sizeMap = @{
        "1:1"  = "1024x1024"
        "16:9" = "1792x1024"
        "9:16" = "1024x1792"
        "4:3"  = "1024x1024"
        "3:4"  = "1024x1792"
    }
    $size = $sizeMap[$AspectRatio]

    $uri = "https://api.openai.com/v1/images/generations"

    $requestBody = @{
        model = "dall-e-3"
        prompt = $Prompt
        n = 1
        size = $size
        response_format = "b64_json"
        quality = "hd"
        style = "natural"
    } | ConvertTo-Json -Depth 10

    $headers = @{
        "Authorization" = "Bearer $apiKey"
        "Content-Type" = "application/json"
    }

    try {
        $response = Invoke-RestMethod `
            -Uri $uri `
            -Method Post `
            -Headers $headers `
            -Body $requestBody `
            -TimeoutSec $Timeout

        if ($response.data -and $response.data.Count -gt 0) {
            $imageData = $response.data[0].b64_json

            if ([string]::IsNullOrWhiteSpace($imageData)) {
                throw "No image data in response"
            }

            # Decode and save
            $imageBytes = [Convert]::FromBase64String($imageData)
            [System.IO.File]::WriteAllBytes($OutputFile, $imageBytes)

            Write-Host "[SUCCESS] Image saved to: $OutputFile"
            return $true
        }
        else {
            throw "No data in response"
        }
    }
    catch {
        $errorMessage = $_.Exception.Message

        if ($_.ErrorDetails.Message) {
            $errorMessage = "$errorMessage | Details: $($_.ErrorDetails.Message)"
        }

        throw "OpenAI API error: $errorMessage"
    }
}

# ============================================================================
# GEMINI PROVIDER
# ============================================================================
function Invoke-GeminiImageGeneration {
    param(
        [string]$Prompt,
        [string]$OutputFile,
        [string]$AspectRatio,
        [int]$Timeout
    )

    $apiKey = [Environment]::GetEnvironmentVariable("GEMINI_API_KEY")
    if ([string]::IsNullOrWhiteSpace($apiKey)) {
        throw "GEMINI_API_KEY environment variable is not set"
    }

    Write-Host "[INFO] Generating image with Gemini 2.0 Flash..."
    Write-Host "[INFO] Prompt: $Prompt"

    $model = "gemini-2.0-flash-exp"
    $uri = "https://generativelanguage.googleapis.com/v1beta/models/$($model):generateContent?key=$apiKey"

    $requestBody = @{
        contents = @(
            @{
                parts = @(
                    @{
                        text = "Generate an image: $Prompt"
                    }
                )
            }
        )
        generationConfig = @{
            responseModalities = @("TEXT", "IMAGE")
        }
    } | ConvertTo-Json -Depth 10

    $headers = @{
        "Content-Type" = "application/json"
    }

    try {
        $response = Invoke-RestMethod `
            -Uri $uri `
            -Method Post `
            -Headers $headers `
            -Body $requestBody `
            -TimeoutSec $Timeout

        $candidates = $response.candidates
        if ($candidates -and $candidates.Count -gt 0) {
            $parts = $candidates[0].content.parts

            foreach ($part in $parts) {
                if ($part.inlineData -and $part.inlineData.data) {
                    $imageData = $part.inlineData.data
                    $mimeType = $part.inlineData.mimeType

                    Write-Host "[INFO] Received image with mime type: $mimeType"

                    $imageBytes = [Convert]::FromBase64String($imageData)
                    [System.IO.File]::WriteAllBytes($OutputFile, $imageBytes)

                    Write-Host "[SUCCESS] Image saved to: $OutputFile"
                    return $true
                }
            }

            throw "No image data found in response parts"
        }
        else {
            throw "No candidates in response"
        }
    }
    catch {
        $errorMessage = $_.Exception.Message

        if ($_.ErrorDetails.Message) {
            $errorMessage = "$errorMessage | Details: $($_.ErrorDetails.Message)"
        }

        throw "Gemini API error: $errorMessage"
    }
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================
try {
    switch ($Provider.ToLower()) {
        "gemini" {
            $success = Invoke-GeminiImageGeneration -Prompt $Prompt -OutputFile $OutputFile -AspectRatio $AspectRatio -Timeout $TimeoutSeconds
        }
        "openai" {
            $success = Invoke-OpenAIImageGeneration -Prompt $Prompt -OutputFile $OutputFile -AspectRatio $AspectRatio -Timeout $TimeoutSeconds
        }
        default {
            throw "Unknown provider: $Provider"
        }
    }

    $result.success = $success

    # Get file info
    if (Test-Path -Path $OutputFile) {
        $fileInfo = Get-Item -Path $OutputFile
        $result.fileSize = $fileInfo.Length
        $result.fileSizeKB = [math]::Round($fileInfo.Length / 1024, 2)
    }
}
catch {
    $result.error = $_.Exception.Message
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
}

# Output result
$result | ConvertTo-Json -Depth 5

# Exit code
if ($result.success) {
    exit 0
}
else {
    exit 1
}
