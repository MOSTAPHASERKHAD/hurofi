import asyncio, sys, io, os
from pathlib import Path
import edge_tts

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

outdir = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\letters")

voices = [
    "ar-SA-HamedNeural",
    "ar-EG-ShakirNeural",
    "ar-AE-HamdanNeural",
    "ar-QA-MoazNeural",
    "ar-KW-FahedNeural",
]

text = "طاء"

async def main():
    for v in voices:
        fname = f"taa_emph_{v}.mp3"
        out = outdir / fname
        try:
            tts = edge_tts.Communicate(text, v)
            await tts.save(str(out))
            sz = os.path.getsize(out)
            print(f"{fname} ({sz} bytes)")
        except Exception as e:
            print(f"{fname} FAILED: {e}")

if __name__ == "__main__":
    asyncio.run(main())
