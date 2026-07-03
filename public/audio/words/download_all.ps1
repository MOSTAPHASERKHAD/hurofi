$outputDir = "D:/pro/produit nemerotique/n/hurofi/public/audio/words"
$headers = @{"Referer"="https://translate.google.com"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

$words = @(
    @{File="kabara.mp3"; Text="ÙƒÙŽØ¨ÙŽØ±ÙŽ"},
    @{File="batta.mp3"; Text="Ø¨ÙŽØ·ÙŽÙ‘Ø©"},
    @{File="miftaah.mp3"; Text="Ù…ÙÙÙ’ØªÙŽØ§Ø­"},
    @{File="tumsaah.mp3"; Text="ØªÙÙ…Ø³ÙŽØ§Ø­"},
    @{File="tafseel.mp3"; Text="ØªÙŽÙÙ’ØµÙÙŠÙ„"},
    @{File="sawt.mp3"; Text="ØµÙŽÙˆÙ’Øª"},
    @{File="mithqaal.mp3"; Text="Ù…ÙØ«Ù’Ù‚Ø§Ù„"},
    @{File="bahth.mp3"; Text="Ø¨ÙŽØ­Ù’Ø«"},
    @{File="thalaatha.mp3"; Text="Ø«ÙŽÙ„Ø§Ø«Ø©"},
    @{File="majalla.mp3"; Text="Ù…ÙŽØ¬ÙŽÙ„ÙŽÙ‘Ø©"},
    @{File="hajj.mp3"; Text="Ø­ÙŽØ¬Ù‘"},
    @{File="jibaal.mp3"; Text="Ø¬ÙØ¨Ø§Ù„"},
    @{File="mahal.mp3"; Text="Ù…ÙŽØ­ÙŽÙ„Ù‘"},
    @{File="halaal.mp3"; Text="Ø­ÙŽÙ„Ø§Ù„"},
    @{File="mukhtabar.mp3"; Text="Ù…ÙØ®Ù’ØªÙŽØ¨ÙŽØ±"},
    @{File="khayma.mp3"; Text="Ø®ÙŽÙŠÙ…Ø©"},
    @{File="dajaaj.mp3"; Text="Ø¯ÙŽØ¬Ø§Ø¬"},
    @{File="jirradh.mp3"; Text="Ø¬ÙØ±Ù’Ø°"},
    @{File="madhhab.mp3"; Text="Ù…ÙŽØ°Ù’Ù‡ÙŽØ¨"},
    @{File="dhura.mp3"; Text="Ø°ÙØ±Ø©"},
    @{File="darb.mp3"; Text="Ø¯ÙŽØ±Ù’Ø¨"},
    @{File="rad.mp3"; Text="Ø±ÙŽØ¹Ù’Ø¯"},
    @{File="zarr.mp3"; Text="Ø²ÙØ±Ù‘"},
    @{File="saa_a.mp3"; Text="Ø³ÙŽØ§Ø¹ÙŽØ©"},
    @{File="mishit.mp3"; Text="Ù…ÙØ´Ù’Ø·"},
    @{File="nams.mp3"; Text="Ù†ÙŽÙ…Ù’Ø³"},
    @{File="masna.mp3"; Text="Ù…ÙŽØµÙ’Ù†ÙŽØ¹"},
    @{File="sanduuq.mp3"; Text="ØµÙÙ†Ù’Ø¯ÙÙˆÙ‚"},
    @{File="sajad.mp3"; Text="Ø³ÙŽØ¬ÙŽØ¯"},
    @{File="midrab.mp3"; Text="Ù…ÙØ¶Ù’Ø±ÙŽØ¨"},
    @{File="qalat.mp3"; Text="Ù‚ÙŽÙ„ÙŽØ·"},
    @{File="khatt.mp3"; Text="Ø®ÙŽØ·Ù‘"},
    @{File="tamaatim.mp3"; Text="Ø·ÙŽÙ…Ø§Ø·ÙÙ…"},
    @{File="tabakh.mp3"; Text="Ø·ÙŽØ¨Ù’Ø®"},
    @{File="mizalla.mp3"; Text="Ù…ÙØ¸ÙÙ„ÙŽÙ‘Ø©"},
    @{File="zahr.mp3"; Text="Ø¸ÙŽÙ‡Ù’Ø±"},
    @{File="zilaam.mp3"; Text="Ø¸ÙŽÙ„Ø§Ù…"},
    @{File="sama.mp3"; Text="Ø³ÙŽÙ…Ø§Ø¹"},
    @{File="usfoor.mp3"; Text="Ø¹ÙØµÙ’ÙÙÙˆØ±"},
    @{File="ghaym.mp3"; Text="ØºÙŽÙŠÙ’Ù…"},
    @{File="sayf.mp3"; Text="Ø³ÙŽÙŠÙ’Ù"},
    @{File="lab.mp3"; Text="Ù„ÙŽØ¨Ù‘"},
    @{File="shariih.mp3"; Text="Ø´ÙŽØ±ÙÙ‡ÙŒ"},
    @{File="mahna.mp3"; Text="Ù…ÙŽÙ‡Ù’Ù†ÙŽØ©"},
    @{File="hadiyya.mp3"; Text="Ù‡ÙŽØ¯ÙÙŠÙŽÙ‘Ø©"},
    @{File="hawaa.mp3"; Text="Ù‡ÙŽÙˆØ§Ø¡"},
    @{File="lahw.mp3"; Text="Ù„ÙŽÙ‡Ù’Ùˆ"},
    @{File="jarii.mp3"; Text="Ø¬ÙŽØ±ÙÙŠ"},
    @{File="kursii.mp3"; Text="ÙƒÙØ±Ù’Ø³ÙŠ"},
    @{File="yam.mp3"; Text="ÙŠÙŽÙ…Ù‘"},
    @{File="qamis.mp3"; Text="Ù‚ÙŽÙ…ÙØ³"},
    @{File="nabii_dhab.mp3"; Text="Ù†ÙŽØ¨ÙÙŠØ°"},
    @{File="maghaara.mp3"; Text="Ù…ÙŽØºÙŽØ§Ø±ÙŽØ©"},
    @{File="miftaah2.mp3"; Text="Ù…ÙÙÙ’ØªÙŽØ§Ø­"}
)

$success = 0
$failed = 0
$failedWords = @()

foreach ($word in $words) {
    $text = [uri]::EscapeDataString($word.Text)
    $url = "https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=$text"
    $outFile = Join-Path $outputDir $word.File
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outFile -Headers $headers -TimeoutSec 30
        $success++
        Write-Host "OK: $($word.File)" -ForegroundColor Green
    } catch {
        $failed++
        $failedWords += "$($word.File) ($($word.Text)): $($_.Exception.Message)"
        Write-Host "FAIL: $($word.File) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Total: $($words.Count)"
Write-Host "Succeeded: $success" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })

if ($failedWords.Count -gt 0) {
    Write-Host "`nFailed files:" -ForegroundColor Yellow
    foreach ($fw in $failedWords) {
        Write-Host "  - $fw"
    }
}
