import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

letters_dir = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")
audio_dir = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\letters")

files_map = {}
errors = []

for jf in sorted(letters_dir.glob("*.json")):
    with open(jf, "r", encoding="utf-8") as f:
        data = json.load(f)
    path = data.get("audioUrls", {}).get("letter", "")
    fname = Path(path).name
    key = fname
    if key in files_map:
        errors.append(f"DUPLICATE: {fname} used by both {files_map[key]} and {jf.name}")
    files_map[key] = jf.name
    actual = audio_dir / fname
    if not actual.exists():
        errors.append(f"MISSING: {fname} referenced by {jf.name} not found in audio/letters")

print(f"Total unique paths: {len(files_map)}")
for fname, src in sorted(files_map.items()):
    print(f"  {fname:30s} <- {src}")

if errors:
    print("\nERRORS:")
    for e in errors:
        print(f"  {e}")
else:
    print("\nNo errors! All paths are unique and files exist.")
