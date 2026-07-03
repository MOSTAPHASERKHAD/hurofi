import json
from pathlib import Path

CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")
AUDIO_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words")

json_files = set()
for jf in sorted(CONTENT_DIR.glob("*.json")):
    with open(jf, "r", encoding="utf-8") as f:
        data = json.load(f)
    for p in data.get("audioUrls", {}).get("words", []):
        if p:
            json_files.add(Path(p).name)

existing = {f.name for f in AUDIO_DIR.glob("*.mp3")}
extra = existing - json_files

print(f"Extra files: {len(extra)}")
for f in sorted(extra):
    (AUDIO_DIR / f).unlink()
    print(f"  Deleted: {f}")

remaining = len(list(AUDIO_DIR.glob("*.mp3")))
print(f"\nRemaining: {remaining} files")
