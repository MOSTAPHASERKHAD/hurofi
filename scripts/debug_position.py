import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")

# Check specific letter: Baa (ب) - words
# باب should have ب at start (initial) and end (final)
# برتقال should have ب at start (initial)
# etc.

for jf in sorted(CONTENT_DIR.glob("*.json")):
    with open(jf, "r", encoding="utf-8") as f:
        data = json.load(f)

    target = data["letter"].strip()
    for w in data.get("words", []):
        arabic = w.get("arabic", "")
        if target in arabic:
            idx = arabic.index(target)
            if idx == 0:
                pos_found = "initial"
            elif idx == len(arabic) - 1:
                pos_found = "final"
            else:
                pos_found = "medial"
        else:
            pos_found = "isolated"

        if pos_found != w.get("position", ""):
            print(f"  {jf.stem}: [{arabic}] target=[{target}] current_pos={w['position']} correct_pos={pos_found}")
