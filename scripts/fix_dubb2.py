import asyncio, sys, io
from pathlib import Path
import edge_tts

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

out = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words\dubb.mp3")

# Try different voices for comparison
# Also try without shadda: دُب instead of دُبّ
texts = [
    ("ar-SA-ZariyahNeural", "دُبّ"),
    ("ar-EG-SalmaNeural", "دُبّ"),
    ("ar-SA-ZariyahNeural", "دُب"),
]

async def main():
    # Use Egyptian Arabic voice (Salma) as alternative
    tts = edge_tts.Communicate(texts[1][1], texts[1][0])
    await tts.save(str(out))
    sz = out.stat().st_size
    print(f"OK dubb.mp3 ({sz} bytes)  voice={texts[1][0]} text=[{texts[1][1]}]")
    print(f"Hex bytes: {' '.join(hex(b) for b in texts[1][1].encode('utf-8'))}")

if __name__ == "__main__":
    asyncio.run(main())
