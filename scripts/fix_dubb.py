import asyncio, sys, io
from pathlib import Path
import edge_tts

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

out = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words\dubb.mp3")

# Correct: دُبّ (dammah on daal, shadda on baa)
text = "دُبّ"

async def main():
    tts = edge_tts.Communicate(text, "ar-SA-ZariyahNeural")
    await tts.save(str(out))
    sz = out.stat().st_size
    print(f"OK dubb.mp3 ({sz} bytes)  text=[{text}]")

if __name__ == "__main__":
    asyncio.run(main())
