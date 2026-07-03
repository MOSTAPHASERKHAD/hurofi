import json
from pathlib import Path

d = Path("src/content/letters")
for f in sorted(d.glob("*.json")):
    r = json.load(open(f, "r", encoding="utf-8"))
    r["audioUrls"]["encouragement"] = {
        "correct": "/audio/encouragement/correct.mp3",
        "wrong": "/audio/encouragement/wrong.mp3",
        "complete": "/audio/encouragement/complete.mp3"
    }
    json.dump(r, open(f, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"  OK {f.stem}")

print("Done")
