@echo off
echo ========================================
echo AUREA ESSENCE MASSAGE IMAGE GENERATOR
echo ========================================
echo.
echo This will generate ALL website images with photorealistic quality.
echo Using: OpenAI DALL-E 3 HD
echo Time: ~10-15 minutes for all images
echo.
pause

powershell -ExecutionPolicy Bypass -File ".\scripts\generate-all-images.ps1" -Provider openai

echo.
echo ========================================
echo DONE!
echo ========================================
echo Check public\images\generated\ for your new images
pause
