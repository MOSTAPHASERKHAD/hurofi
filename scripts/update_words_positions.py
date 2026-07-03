import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")

# Each letter: 3 words covering initial, medial, final
# Format: [ (arabic, transliteration, english, position, image), ... ]
NEW_WORDS = {
    "01-alif": [
        ("أسد", "asad", "Lion", "initial", "🦁"),
        ("سأل", "sa'ala", "Asked", "medial", "❓"),
        ("قرأ", "qara'a", "Read", "final", "📖"),
    ],
    "02-baa": [
        ("بطة", "batta", "Duck", "initial", "🦆"),
        ("جبل", "jabal", "Mountain", "medial", "🏔️"),
        ("كتاب", "kitab", "Book", "final", "📖"),
    ],
    "03-taa": [
        ("تمساح", "timsah", "Crocodile", "initial", "🐊"),
        ("مكتب", "maktab", "Desk", "medial", "🪑"),
        ("بيت", "bayt", "House", "final", "🏠"),
    ],
    "04-thaa": [
        ("ثعبان", "thu'ban", "Snake", "initial", "🐍"),
        ("مثلث", "muthallath", "Triangle", "medial", "🔺"),
        ("حديث", "hadith", "Talk", "final", "💬"),
    ],
    "05-jeem": [
        ("جمل", "jamal", "Camel", "initial", "🐪"),
        ("نجم", "najm", "Star", "medial", "⭐"),
        ("ثلج", "thalj", "Snow", "final", "❄️"),
    ],
    "06-haa": [
        ("حصان", "hisan", "Horse", "initial", "🐴"),
        ("نحل", "nahl", "Bees", "medial", "🐝"),
        ("صباح", "sabah", "Morning", "final", "☀️"),
    ],
    "07-khaa": [
        ("خروف", "kharuf", "Sheep", "initial", "🐑"),
        ("نخلة", "nakhlah", "Palm", "medial", "🌴"),
        ("بطيخ", "battikh", "Watermelon", "final", "🍉"),
    ],
    "08-daal": [
        ("ديك", "dik", "Rooster", "initial", "🐓"),
        ("مدرسة", "madrasah", "School", "medial", "🏫"),
        ("أسد", "asad", "Lion", "final", "🦁"),
    ],
    "09-dhal": [
        ("ذئب", "dhi'b", "Wolf", "initial", "🐺"),
        ("أذن", "udhun", "Ear", "medial", "👂"),
        ("لذيذ", "ladhidh", "Delicious", "final", "🍰"),
    ],
    "10-raa": [
        ("رجل", "rajul", "Man", "initial", "🧑"),
        ("فراشة", "farashah", "Butterfly", "medial", "🦋"),
        ("نار", "nar", "Fire", "final", "🔥"),
    ],
    "11-zay": [
        ("زرافة", "zarafah", "Giraffe", "initial", "🦒"),
        ("غزال", "ghazal", "Gazelle", "medial", "🦌"),
        ("موز", "mawz", "Banana", "final", "🍌"),
    ],
    "12-seen": [
        ("سمكة", "samakah", "Fish", "initial", "🐟"),
        ("جسر", "jisr", "Bridge", "medial", "🌉"),
        ("خس", "khass", "Lettuce", "final", "🥬"),
    ],
    "13-sheen": [
        ("شمس", "shams", "Sun", "initial", "☀️"),
        ("فرشاة", "furshah", "Brush", "medial", "🪥"),
        ("عرش", "arsh", "Throne", "final", "👑"),
    ],
    "14-saad": [
        ("صقر", "saqr", "Falcon", "initial", "🦅"),
        ("عصفور", "usfur", "Bird", "medial", "🐦"),
        ("قفص", "qafas", "Cage", "final", "🦜"),
    ],
    "15-daad": [
        ("ضفدع", "dafdi'", "Frog", "initial", "🐸"),
        ("بيضة", "baydah", "Egg", "medial", "🥚"),
        ("مريض", "marid", "Sick", "final", "🤒"),
    ],
    "16-taa_emph": [
        ("طبل", "tabl", "Drum", "initial", "🥁"),
        ("أطفال", "atfal", "Children", "medial", "👶"),
        ("قط", "qitt", "Cat", "final", "🐱"),
    ],
    "17-thaa_emph": [
        ("ظبي", "dhabi", "Gazelle", "initial", "🦌"),
        ("أظافر", "adhafir", "Nails", "medial", "💅"),
        ("يقظ", "yaqidh", "Awake", "final", "😴"),
    ],
    "18-ain": [
        ("عنب", "inab", "Grapes", "initial", "🍇"),
        ("ساعة", "sa'ah", "Clock", "medial", "🕐"),
        ("ذراع", "dhira'", "Arm", "final", "💪"),
    ],
    "19-ghain": [
        ("غابة", "ghabah", "Forest", "initial", "🌳"),
        ("نغم", "nagham", "Melody", "medial", "🎵"),
        ("صبغ", "sabagh", "Paint", "final", "🎨"),
    ],
    "20-faa": [
        ("فيل", "fil", "Elephant", "initial", "🐘"),
        ("تفاحة", "tuffahah", "Apple", "medial", "🍎"),
        ("سقف", "saqf", "Roof", "final", "🏠"),
    ],
    "21-qaaf": [
        ("قمر", "qamar", "Moon", "initial", "🌙"),
        ("بقرة", "baqarah", "Cow", "medial", "🐄"),
        ("طريق", "tariq", "Road", "final", "🛣️"),
    ],
    "22-kaaf": [
        ("كتاب", "kitab", "Book", "initial", "📖"),
        ("مكتب", "maktab", "Office", "medial", "🏢"),
        ("سمك", "samak", "Fish", "final", "🐟"),
    ],
    "23-laam": [
        ("ليمون", "laymun", "Lemon", "initial", "🍋"),
        ("تلفاز", "tilifiz", "TV", "medial", "📺"),
        ("جمل", "jamal", "Camel", "final", "🐪"),
    ],
    "24-meem": [
        ("موز", "mawz", "Banana", "initial", "🍌"),
        ("سماء", "sama'", "Sky", "medial", "☁️"),
        ("فم", "fam", "Mouth", "final", "👄"),
    ],
    "25-nun": [
        ("نجم", "najm", "Star", "initial", "⭐"),
        ("عنب", "inab", "Grapes", "medial", "🍇"),
        ("زيتون", "zaytun", "Olives", "final", "🫒"),
    ],
    "26-haa_end": [
        ("هاتف", "hatif", "Phone", "initial", "📱"),
        ("فهد", "fahd", "Cheetah", "medial", "🐆"),
        ("وجه", "wajh", "Face", "final", "😊"),
    ],
    "27-waw": [
        ("وردة", "wardah", "Rose", "initial", "🌹"),
        ("توت", "tut", "Berry", "medial", "🫐"),
        ("جرو", "jarw", "Puppy", "final", "🐶"),
    ],
    "28-yaa": [
        ("يد", "yad", "Hand", "initial", "✋"),
        ("بيت", "bayt", "House", "medial", "🏠"),
        ("كرسي", "kursiyy", "Chair", "final", "🪑"),
    ],
}

def letter_name_to_arabic_folder(name: str) -> str:
    mapping = {
        "01-alif": "أ", "02-baa": "ب", "03-taa": "ت", "04-thaa": "ث",
        "05-jeem": "ج", "06-haa": "ح", "07-khaa": "خ", "08-daal": "د",
        "09-dhal": "ذ", "10-raa": "ر", "11-zay": "ز", "12-seen": "س",
        "13-sheen": "ش", "14-saad": "ص", "15-daad": "ض", "16-taa_emph": "ط",
        "17-thaa_emph": "ظ", "18-ain": "ع", "19-ghain": "غ", "20-faa": "ف",
        "21-qaaf": "ق", "22-kaaf": "ك", "23-laam": "ل", "24-meem": "م",
        "25-nun": "ن", "26-haa_end": "ه", "27-waw": "و", "28-yaa": "ي",
    }
    return mapping.get(name, name)

updates = 0
for jf in sorted(CONTENT_DIR.glob("*.json")):
    with open(jf, "r", encoding="utf-8") as f:
        data = json.load(f)

    letter_key = jf.stem
    if letter_key not in NEW_WORDS:
        print(f"  SKIP {letter_key} (no word list)")
        continue

    new_word_list = NEW_WORDS[letter_key]
    arabic_folder = letter_name_to_arabic_folder(letter_key)
    
    old_words = data.get("words", [])
    old_word_map = {w.get("arabic", ""): w for w in old_words}
    
    updated_words = []
    audio_urls = []
    
    for i, (arabic, translit, english, position, image) in enumerate(new_word_list):
        wid = f"{data['name']}_{i+1}"
        
        # Check if we're keeping an old word or adding a new one
        new_word = {
            "id": wid,
            "arabic": arabic,
            "transliteration": translit,
            "english": english,
            "position": position,
            "syllables": [],
            "image": image,
        }
        updated_words.append(new_word)
        audio_urls.append(f"/audio/words/{arabic_folder}/{arabic}.mp3")
    
    data["words"] = updated_words
    data["audioUrls"]["words"] = audio_urls
    
    with open(jf, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"  OK {letter_key} ({len(new_word_list)} words)")
    updates += 1

print(f"\n✅ Updated {updates} letter files")
