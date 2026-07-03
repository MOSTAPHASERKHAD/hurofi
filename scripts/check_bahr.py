import json

root = r"D:\pro\produit nemerotique\n\hurofi\src\content\letters"

for fname in ["02-baa.json", "06-haa.json"]:
    with open(f"{root}/{fname}", "r", encoding="utf-8") as f:
        data = json.load(f)
    for w in data["words"]:
        if w["transliteration"] == "bahr":
            syllables = w.get("syllables", [])
            text = "".join(syllables)
            print(f"{fname}:")
            print(f"  Arabic: {w['arabic']}")
            print(f"  Syllables: {' | '.join(syllables)}")
            print(f"  Joined: [{text}]")
            print(f"  Position: {w['position']}")
            print()

# The script processes 02-baa.json first (sorted), so bahr text = بَ + حْر
print("Generated text used:", "بَ" + "حْر")
