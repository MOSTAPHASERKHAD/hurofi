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

existing_files = {f.name for f in AUDIO_DIR.glob("*.mp3")}

missing = json_files - existing_files
extra = existing_files - json_files

print(f"JSON references: {len(json_files)} unique files")
print(f"Existing audio:  {len(existing_files)} files")
print(f"Missing:         {len(missing)} files")
print(f"Extra:           {len(extra)} files")

if missing:
    print("\nMissing files:")
    for m in sorted(missing):
        print(f"  {m}")

# Show JSON file that references each missing file
if missing:
    print("\nWhich JSON files reference missing audio:")
    for m in sorted(missing):
        for jf in sorted(CONTENT_DIR.glob("*.json")):
            with open(jf, "r", encoding="utf-8") as f:
                data = json.load(f)
            for p in data.get("audioUrls", {}).get("words", []):
                if p and Path(p).name == m:
                    print(f"  {m} <- {jf.name}")
                    break

if extra:
    print(f"\nExtra files (not referenced by any JSON):")
    for e in sorted(extra):
        print(f"  {e}")
