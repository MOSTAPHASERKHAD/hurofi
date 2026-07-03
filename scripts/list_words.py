import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

content_dir = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")
audio_dir = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words")

print("=" * 80)
print("جميع الكلمات المطلوب تسجيلها - Words to record")
print("=" * 80)

seen = set()
for jf in sorted(content_dir.glob("*.json")):
    with open(jf, "r", encoding="utf-8") as f:
        data = json.load(f)
    letter = data.get("letter", "?")
    letter_name = data.get("name", "?")
    paths = data.get("audioUrls", {}).get("words", [])
    word_objs = {w.get("transliteration", "").lower(): w for w in data.get("words", [])}

    for word_path in paths:
        if not word_path:
            continue
        fname = Path(word_path).name
        if fname in seen:
            continue
        seen.add(fname)

        stem = fname.replace(".mp3", "")
        if stem in word_objs:
            w = word_objs[stem]
            syllables = w.get("syllables", [])
            text = "".join(syllables) if syllables else w.get("arabic", "")
            eng = w.get("english", "")
            lat = w.get("transliteration", "")
        else:
            text = fname
            eng = ""
            lat = ""

        print(f"{fname:30s} | {text:20s} | {lat:15s} | {eng}")

print(f"\nTotal: {len(seen)} unique words")
print()
print("Instructions:")
print("1. Record each word clearly")
print("2. Save as MP3 with the exact filename shown above")
print("3. Copy files to: public/audio/words/")
