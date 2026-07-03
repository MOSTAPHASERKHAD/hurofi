import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

AUDIO_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words")
CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")

# Map JSON letter to expected folder
expected = {}
for jf in sorted(CONTENT_DIR.glob("*.json")):
    with open(jf, "r", encoding="utf-8") as f:
        data = json.load(f)
    expected[data["letter"].strip()] = data["id"]

# Check each folder
for folder in sorted(AUDIO_DIR.iterdir()):
    if not folder.is_dir():
        continue
    letter = folder.name
    mp3s = [f for f in folder.iterdir() if f.suffix == ".mp3" and f.stat().st_size > 100]
    non_empty = len(mp3s)
    expected_id = expected.get(letter, "??")
    status = "OK" if non_empty == 5 else "ISSUE"
    sizes = ", ".join(f"{f.name}: {f.stat().st_size}B" for f in mp3s)
    print(f"{status} [{letter}] (id={expected_id}) -> {non_empty} files")
    if non_empty != 5:
        print(f"  Files: {sizes}")
