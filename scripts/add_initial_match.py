import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

d = Path("src/content/letters")
for f in sorted(d.glob("*.json")):
    r = json.load(open(f, "r", encoding="utf-8"))
    words = r["words"]
    match = r.get("matchWords", [])
    # Check if match already has an "initial" word
    has_initial = any(w.get("position") == "initial" for w in match)
    if not has_initial and words:
        # Use first original word as the initial example
        w = words[0]
        match.insert(0, {
            "id": w["id"] + "_form",
            "arabic": w["arabic"],
            "transliteration": w["transliteration"],
            "english": w["english"],
            "position": "initial",
            "syllables": [],
            "image": w.get("image", ""),
        })
        r["matchWords"] = match
        json.dump(r, open(f, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        print(f"  OK {f.stem} → added initial: {w['arabic']}")
    else:
        print(f"  SKIP {f.stem} (already has initial or no words)")

print("Done")
