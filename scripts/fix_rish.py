import asyncio, sys, io
from pathlib import Path
import edge_tts

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

out = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words\rish.mp3")

# Try different voices
voice = "ar-AE-HamdanNeural"
text = "رِيش"

async def main():
    tts = edge_tts.Communicate(text, voice)
    await tts.save(str(out))
    sz = out.stat().st_size
    print(f"OK rish.mp3 ({sz} bytes)  voice={voice}")

if __name__ == "__main__":
    asyncio.run(main())
