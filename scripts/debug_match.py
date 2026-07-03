import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")

def letter_positions_in_word(arabic, target):
    positions = set()
    for i, ch in enumerate(arabic):
        if ch == target:
            if i == 0:
                positions.add("initial")
            elif i == len(arabic) - 1:
                positions.add("final")
            else:
                positions.add("medial")
    return positions

errors = []
for jf in sorted(CONTENT_DIR.glob("*.json")):
    with open(jf, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    letter = data["letter"]
    for w in data.get("words", []):
        arabic = w["arabic"]
        expected_pos = w["position"]
        detected = letter_positions_in_word(arabic, letter)
        
        if expected_pos not in detected:
            errors.append(f"{jf.stem}: [{arabic}] letter=[{letter}] expected=[{expected_pos}] detected={detected}")
            print(f"❌ {jf.stem}: [{arabic}] target=[{letter}] expected=[{expected_pos}] detected={detected}")
        
        # Also check if the letter appears at all in the word
        if not detected:
            errors.append(f"{jf.stem}: [{arabic}] letter=[{letter}] NOT FOUND in word!")

if not errors:
    print("✅ All words match their expected positions correctly!")
else:
    print(f"\n⚠️ {len(errors)} mismatches found")
