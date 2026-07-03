import json
from pathlib import Path

d = Path("src/content/letters")
# Restore trace and color to all letters' activities
for f in sorted(d.glob("*.json")):
    r = json.load(open(f, "r", encoding="utf-8"))
    existing = {a["type"] for a in r["activities"]}
    if "trace" not in existing:
        r["activities"].insert(0, {"type": "trace", "name": "تتبع الحرف", "config": {"difficulty": "guided"}})
    if "color" not in existing:
        r["activities"].append({"type": "color", "name": "تلوين الصورة", "config": {}})
    json.dump(r, open(f, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"  OK {f.stem}")
print("Done")
