import json, sys, io
from pathlib import Path
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

d = Path("src/content/letters")
for f in sorted(d.glob("*.json")):
    r = json.load(open(f, "r", encoding="utf-8"))
    wc = len(r["words"])
    mc = len(r.get("matchWords", []))
    mw = ", ".join(w["arabic"] for w in r.get("matchWords", []))
    print(f"{f.stem:20s} words={wc}  matchWords={mc}  [{mw}]")
