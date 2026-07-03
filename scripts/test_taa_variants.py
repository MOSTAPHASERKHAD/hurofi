import asyncio, sys, io, os
from pathlib import Path
import edge_tts

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

outdir = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\letters")
voice = "ar-AE-HamdanNeural"

variants = [
    ("taa_v1", "طاء"),
    ("taa_v2", "طا"),
    ("taa_v3", "طَاء"),
    ("taa_v4", "ط"),
    ("taa_v5", "طه"),
    ("taa_v6", "طوط"),
]

async def main():
    for fname, text in variants:
        out = outdir / f"{fname}.mp3"
        tts = edge_tts.Communicate(text, voice)
        await tts.save(str(out))
        sz = os.path.getsize(out)
        print(f"{fname}.mp3 ({sz} bytes) text=[{text}]")

if __name__ == "__main__":
    asyncio.run(main())
