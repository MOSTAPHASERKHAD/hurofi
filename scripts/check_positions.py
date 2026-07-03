import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")

for jf in sorted(CONTENT_DIR.glob("*.json")):
    with open(jf, "r", encoding="utf-8") as f:
        data = json.load(f)
    positions = {}
    for w in data.get("words", []):
        p = w.get("position", "")
        positions[p] = positions.get(p, 0) + 1
    uni = " | ".join(f"{k}: {v}" for k, v in sorted(positions.items()))
    print(f"{jf.stem:20s} {uni}")
