import asyncio, sys, io
from pathlib import Path
import edge_tts

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

OUTPUT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\encouragement")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

VOICE = "ar-SA-ZariyahNeural"

PHRASES = [
    ("mumtaz", "ممتاز! أحسنت!"),
    ("ahayt", "أحسنت! عمل رائع!"),
    ("gheil", "غيل! استمر!"),
    ("ray", "رائع جداً!"),
    ("allah_tayyib", "بارك الله فيك!"),
]

async def generate():
    for fname, text in PHRASES:
        out = OUTPUT_DIR / f"{fname}.mp3"
        if out.exists():
            print(f"  SKIP {fname}.mp3")
            continue
        tts = edge_tts.Communicate(text, VOICE)
        await tts.save(str(out))
        sz = out.stat().st_size
        print(f"  OK {fname}.mp3 ({sz} bytes)")

if __name__ == "__main__":
    asyncio.run(generate())
