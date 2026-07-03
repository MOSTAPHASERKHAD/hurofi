import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

for fname in ["13-sheen.json", "22-kaaf.json"]:
    with open(f"D:\\pro\\produit nemerotique\\n\\hurofi\\src\\content\\letters\\{fname}", "r", encoding="utf-8") as f:
        data = json.load(f)
    for w in data["words"]:
        if w["transliteration"] == "rish":
            syllables = w.get("syllables", [])
            text = "".join(syllables)
            print(f"{fname}:")
            print(f"  Arabic: {w['arabic']}")
            print(f"  Syllables: {' | '.join(syllables)}")
            print(f"  Joined: [{text}]")
