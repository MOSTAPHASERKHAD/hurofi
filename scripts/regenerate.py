import asyncio, sys, io, json
from pathlib import Path
import edge_tts

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

CONTENT = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")
OUTPUT = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words")

# Words to regenerate
targets = ["jamal", "thalj"]

# Find the first occurrence text for each (same as generation script logic)
def get_text(transliteration):
    for jf in sorted(CONTENT.glob("*.json")):
        with open(jf, "r", encoding="utf-8") as f:
            data = json.load(f)
        for w in data.get("words", []):
            if w.get("transliteration", "").lower() == transliteration:
                syllables = w.get("syllables", [])
                if syllables:
                    return "".join(syllables)
    return None

async def regenerate(name):
    text = get_text(name)
    if not text:
        print(f"  FAIL {name}: no text found")
        return
    out = OUTPUT / f"{name}.mp3"
    tts = edge_tts.Communicate(text, "ar-SA-ZariyahNeural")
    await tts.save(str(out))
    sz = out.stat().st_size
    print(f"  OK {name}.mp3 ({sz} bytes)  text=[{text}]")

async def main():
    print(f"Regenerating {len(targets)} files...")
    for t in targets:
        await regenerate(t)

if __name__ == "__main__":
    asyncio.run(main())
