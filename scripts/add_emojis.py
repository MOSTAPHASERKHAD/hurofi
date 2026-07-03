import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")

# Emoji for each word keyed by transliteration
EMOJI_MAP = {
    # Alif
    "asad": "🦁", "arnab": "🐰", "umm": "👩‍👧", "anf": "👃", "udhun": "👂",
    # Baa
    "bab": "🚪", "batta": "🦆", "bahr": "🌊", "burtuqal": "🍊", "bayt": "🏠",
    # Taa
    "tuffah": "🍎", "tamr": "🌴", "tin": "🥝", "taj": "👑", "tilmidh": "🎒",
    # Thaa
    "tha'lab": "🦊", "thawb": "👗", "thamara": "🍇", "thalj": "❄️", "thariya": "💡",
    # Jeem
    "jamal": "🐪", "jabal": "⛰️", "jaras": "🔔", "jubn": "🧀", "jazar": "🥕",
    # Haa
    "hisan": "🐴", "halib": "🥛", "hidha'": "👟", "hadiqa": "🌳", "hamama": "🕊️",
    # Khaa
    "khubz": "🍞", "kharuf": "🐑", "khiyar": "🥒", "khawkh": "🍑", "khatam": "💍",
    # Daal
    "dik": "🐓", "darraja": "🚲", "daftar": "📓", "dajaja": "🐔", "dawa'": "💊",
    # Dhaal
    "dhi'b": "🐺", "dhura": "🌽", "dhahab": "✨", "dhira'": "💪", "dhayl": "🦊",
    # Raa
    "rajul": "🧍", "rumman": "🍅", "risha": "🪶", "rahman": "☪️", "raml": "🏖️",
    # Zay
    "zahra": "🌸", "zar'": "🌱", "zarafa": "🦒", "zaytun": "🫒", "zarr": "🔘",
    # Seen
    "samaka": "🐟", "sayyara": "🚗", "sa'a": "⌚", "sarir": "🛏️", "sahab": "☁️",
    # Sheen
    "shajara": "🌳", "shams": "☀️", "shubbak": "🪟", "sham'a": "🕯️", "shurta": "👮",
    # Saad
    "saqr": "🦅", "sabun": "🧼", "sunduq": "📦", "sahn": "🍽️", "sura": "🖼️",
    # Daad
    "difda'": "🐸", "dirs": "🦷", "daw'": "💡", "dabu'": "🐺", "dabit": "👮‍♂️",
    # Taa emph
    "ta'ir": "🐦", "tawila": "🪑", "tabashir": "✏️", "tamatim": "🍅", "tariq": "🛣️",
    # Thaa emph
    "zarf": "✉️", "zill": "👤", "zabi": "🦌", "zufr": "💅", "zahira": "☀️",
    # Ayn
    "ayn": "👁️", "'inab": "🍇", "'usfur": "🐦", "'alam": "🚩", "'asal": "🍯",
    # Ghayn
    "ghazal": "🦌", "ghayma": "☁️", "ghurab": "🐦‍⬛", "ghaba": "🌲", "ghassala": "🧺",
    # Faa
    "fil": "🐘", "farasha": "🦋", "fakiha": "🍉", "fustan": "👗", "fam": "👄",
    # Qaf
    "qitta": "🐱", "qalam": "🖊️", "qamar": "🌙", "qarib": "⛵", "qubba'a": "🧢",
    # Kaf
    "kitab": "📖", "kurra": "⚽", "kursi": "🪑", "kalb": "🐕", "kub": "🥤",
    # Lam
    "laymun": "🍋", "lu'ba": "🧸", "lisan": "👅", "laban": "🥛", "lu'lu'": "🪸",
    # Meem
    "madrasa": "🏫", "mawz": "🍌", "miftah": "🔑", "masjid": "🕌", "mil'aqa": "🥄",
    # Nun
    "namla": "🐜", "najm": "⭐", "nahla": "🐝", "nahr": "🌊", "nakhla": "🌴",
    # Haa end
    "hadiyya": "🎁", "hilal": "🌙", "hatif": "📱", "hawa'": "💨", "hudhud": "🐦",
    # Waw
    "warda": "🌹", "wajh": "😊", "walad": "👦", "waraqa": "📄", "watan": "🏡",
    # Yaa
    "yad": "✋", "yamama": "🕊️", "yasmin": "🌸", "yaqtin": "🎃", "yambu'": "⛲",
}

def main():
    for jf in sorted(CONTENT_DIR.glob("*.json")):
        with open(jf, "r", encoding="utf-8") as f:
            data = json.load(f)

        changed = 0
        for w in data.get("words", []):
            trans = w.get("transliteration", "").lower()
            if trans in EMOJI_MAP:
                w["image"] = EMOJI_MAP[trans]
                changed += 1

        with open(jf, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"  OK {jf.name} ({changed} words)")

    print(f"\nDone!")

if __name__ == "__main__":
    main()
