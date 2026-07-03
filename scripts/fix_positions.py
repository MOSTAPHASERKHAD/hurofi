import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")

def get_position(arabic_word: str, target_letter: str) -> str:
    if target_letter in arabic_word:
        idx = arabic_word.index(target_letter)
        if idx == 0:
            return "initial"
        elif idx == len(arabic_word) - 1:
            return "final"
        else:
            return "medial"
    return "isolated"

def main():
    for jf in sorted(CONTENT_DIR.glob("*.json")):
        with open(jf, "r", encoding="utf-8") as f:
            data = json.load(f)

        target = data["letter"].strip()
        changed = 0
        for w in data.get("words", []):
            arabic = w.get("arabic", "")
            if arabic:
                new_pos = get_position(arabic, target)
                if w.get("position") != new_pos:
                    w["position"] = new_pos
                    changed += 1

        with open(jf, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"  OK {jf.name} ({changed} positions updated)")

    print("\nDone!")

if __name__ == "__main__":
    main()
