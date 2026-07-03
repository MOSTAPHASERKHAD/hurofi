import asyncio, sys, io
from pathlib import Path
import edge_tts

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

output = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words\bahr.mp3")
text = "بَحْر"

async def main():
    tts = edge_tts.Communicate(text, "ar-SA-ZariyahNeural")
    await tts.save(str(output))
    sz = output.stat().st_size
    print(f"Regenerated. Size: {sz} bytes")

if __name__ == "__main__":
    asyncio.run(main())
