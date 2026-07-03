import asyncio, sys, io, os
from pathlib import Path
import edge_tts

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

outdir = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words")

# List all available Arabic voices
async def list_voices():
    voices = await edge_tts.list_voices()
    arabic_voices = [v for v in voices if "ar-" in v["ShortName"]]
    print("Available Arabic voices:")
    for v in arabic_voices:
        print(f"  {v['ShortName']} - {v['Locale']} - {v['Gender']}")

async def test_all():
    # Try all Arabic voices with دُبّ
    voices_to_try = [
        "ar-SA-ZariyahNeural",
        "ar-SA-HamedNeural",
        "ar-EG-SalmaNeural", 
        "ar-EG-ShakirNeural",
        "ar-AE-FatimaNeural",
        "ar-AE-HamdanNeural",
        "ar-QA-AmalNeural",
        "ar-QA-MoazNeural",
    ]
    text = "دُبّ"
    for voice in voices_to_try:
        fname = f"dubb_{voice}.mp3"
        out = outdir / fname
        try:
            tts = edge_tts.Communicate(text, voice)
            await tts.save(str(out))
            sz = os.path.getsize(out)
            print(f"{fname} ({sz} bytes)")
        except Exception as e:
            print(f"{fname} FAILED: {e}")

async def main():
    await list_voices()
    print("\n--- Testing pronunciations ---")
    await test_all()

if __name__ == "__main__":
    asyncio.run(main())
