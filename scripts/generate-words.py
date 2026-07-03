import json, sys, io, asyncio
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import edge_tts

CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")
OUTPUT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

VOICE = "ar-SA-ZariyahNeural"

LETTER_NAMES = {
    "01-alif": "alif", "02-baa": "baa", "03-taa": "taa", "04-thaa": "thaa",
    "05-jeem": "jeem", "06-haa": "haa", "07-khaa": "khaa", "08-daal": "daal",
    "09-dhal": "dhal", "10-raa": "raa", "11-zay": "zay", "12-seen": "seen",
    "13-sheen": "sheen", "14-saad": "saad", "15-daad": "daad",
    "16-taa_emph": "taa_emph", "17-thaa_emph": "thaa_emph", "18-ain": "ain",
    "19-ghain": "ghain", "20-faa": "faa", "21-qaaf": "qaaf", "22-kaaf": "kaaf",
    "23-laam": "laam", "24-meem": "meem", "25-nun": "nun", "26-haa_end": "haa_end",
    "27-waw": "waw", "28-yaa": "yaa"
}

async def generate_word(text, output_path):
    if output_path.exists():
        sz = output_path.stat().st_size
        return f"  SKIP {output_path.name} ({sz} bytes)"
    try:
        tts = edge_tts.Communicate(text, VOICE)
        await tts.save(str(output_path))
        sz = output_path.stat().st_size
        return f"  OK {output_path.name} ({sz} bytes)"
    except Exception as e:
        return f"  FAIL {output_path.name}: {e}"

async def main():
    tasks = []
    seen_filenames = set()

    for jf in sorted(CONTENT_DIR.glob("*.json")):
        stem = jf.stem
        letter_name = LETTER_NAMES.get(stem)
        if not letter_name:
            continue

        with open(jf, "r", encoding="utf-8") as f:
            data = json.load(f)

        paths = data.get("audioUrls", {}).get("words", [])
        word_objs = {w.get("transliteration", "").lower(): w for w in data.get("words", [])}

        for word_path in paths:
            if not word_path:
                continue
            fname = Path(word_path).name
            if fname in seen_filenames:
                continue
            seen_filenames.add(fname)

            stem_name = fname.replace(".mp3", "")
            text = None
            if stem_name in word_objs:
                w = word_objs[stem_name]
                syllables = w.get("syllables", [])
                text = "".join(syllables) if syllables else w.get("arabic", "")
            if not text:
                text = fname.replace(".mp3", "")

            output_path = OUTPUT_DIR / fname
            tasks.append(generate_word(text, output_path))

    total = len(tasks)
    print(f"Generating {total} unique word audio files...\n")

    batch_size = 3
    for i in range(0, len(tasks), batch_size):
        batch = tasks[i:i+batch_size]
        results = await asyncio.gather(*batch)
        for r in results:
            print(r)
        done = min(i + batch_size, total)
        print(f"  [{done}/{total}]")

    existing = len([f for f in OUTPUT_DIR.glob("*.mp3")])
    print(f"\nDone! {existing} files in output directory.")

if __name__ == "__main__":
    asyncio.run(main())
