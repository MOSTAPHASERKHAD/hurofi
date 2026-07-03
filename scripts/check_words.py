import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")

total = 0
missing_syllables = 0

for jf in sorted(CONTENT_DIR.glob("*.json")):
    with open(jf, "r", encoding="utf-8") as f:
        data = json.load(f)
    paths = data.get("audioUrls", {}).get("words", [])
    word_objs = {w.get("transliteration", "").lower(): w for w in data.get("words", [])}
    for p in paths:
        if not p:
            continue
        fname = Path(p).name
        stem = fname.replace(".mp3", "")
        total += 1
        if stem in word_objs:
            w = word_objs[stem]
            syllables = w.get("syllables", [])
            if syllables:
                text = "".join(syllables)
                print(f"OK  {fname:25s} {text}")
            else:
                text = w.get("arabic", "")
                print(f"NOSYLL {fname:25s} {text}")
                missing_syllables += 1
        else:
            print(f"NOMATCH {fname:25s}")

print(f"\nTotal: {total} word paths, {missing_syllables} missing syllables")