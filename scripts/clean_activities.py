import json
from pathlib import Path

d = Path("src/content/letters")
KEEP_TYPES = {"phonics_wheel", "match", "find"}

for f in sorted(d.glob("*.json")):
    r = json.load(open(f, "r", encoding="utf-8"))
    r["activities"] = [a for a in r["activities"] if a["type"] in KEEP_TYPES]
    json.dump(r, open(f, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"  OK {f.stem}")

print("Done")
