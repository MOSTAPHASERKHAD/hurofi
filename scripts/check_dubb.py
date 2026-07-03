import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters\08-daal.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for w in data["words"]:
    if w["transliteration"] == "dubb":
        syllables = w.get("syllables", [])
        print(f"Arabic: {w['arabic']}")
        print(f"Syllables: {syllables}")
        print(f"Joined: {''.join(syllables)}")
        # Show hex codes
        joined = ''.join(syllables)
        print(f"Hex: {' '.join(hex(ord(c)) for c in joined)}")
