import asyncio, sys, io, os
from pathlib import Path
import edge_tts

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

outdir = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words")

async def test():
    variants = [
        ("dubb_shadda", "دُبّ"),
        ("dubb_no_shadda", "دُب"),
        ("dubb_plain", "دب"),
    ]
    for fname, text in variants:
        tts = edge_tts.Communicate(text, "ar-SA-ZariyahNeural")
        out = outdir / f"{fname}.mp3"
        await tts.save(str(out))
        sz = os.path.getsize(out)
        print(f"{fname}.mp3 ({sz} bytes)")

asyncio.run(test())
