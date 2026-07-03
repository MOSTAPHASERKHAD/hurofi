import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")
AUDIO_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\public\audio\words")

# Words for each letter: (arabic, transliteration, english)
WORDS_MAP = {
    1:  [("أسد", "asad", "Lion"), ("أرنب", "arnab", "Rabbit"), ("أم", "umm", "Mother"), ("أنف", "anf", "Nose"), ("أذن", "udhun", "Ear")],
    2:  [("باب", "bab", "Door"), ("بطة", "batta", "Duck"), ("بحر", "bahr", "Sea"), ("برتقال", "burtuqal", "Orange"), ("بيت", "bayt", "House")],
    3:  [("تفاح", "tuffah", "Apple"), ("تمر", "tamr", "Date"), ("تين", "tin", "Fig"), ("تاج", "taj", "Crown"), ("تلميذ", "tilmidh", "Student")],
    4:  [("ثعلب", "tha'lab", "Fox"), ("ثوب", "thawb", "Dress"), ("ثمرة", "thamara", "Fruit"), ("ثلج", "thalj", "Snow"), ("ثريا", "thariya", "Chandelier")],
    5:  [("جمل", "jamal", "Camel"), ("جبل", "jabal", "Mountain"), ("جرس", "jaras", "Bell"), ("جبن", "jubn", "Cheese"), ("جزر", "jazar", "Carrot")],
    6:  [("حصان", "hisan", "Horse"), ("حليب", "halib", "Milk"), ("حذاء", "hidha'", "Shoe"), ("حديقة", "hadiqa", "Garden"), ("حمامة", "hamama", "Pigeon")],
    7:  [("خبز", "khubz", "Bread"), ("خروف", "kharuf", "Sheep"), ("خيار", "khiyar", "Cucumber"), ("خوخ", "khawkh", "Peach"), ("خاتم", "khatam", "Ring")],
    8:  [("ديك", "dik", "Rooster"), ("دراجة", "darraja", "Bicycle"), ("دفتر", "daftar", "Notebook"), ("دجاجة", "dajaja", "Hen"), ("دواء", "dawa'", "Medicine")],
    9:  [("ذئب", "dhi'b", "Wolf"), ("ذرة", "dhura", "Corn"), ("ذهب", "dhahab", "Gold"), ("ذراع", "dhira'", "Arm"), ("ذيل", "dhayl", "Tail")],
    10: [("رجل", "rajul", "Man"), ("رمان", "rumman", "Pomegranate"), ("ريشة", "risha", "Feather"), ("راديو", "radyu", "Radio"), ("رمل", "raml", "Sand")],
    11: [("زهرة", "zahra", "Flower"), ("زرع", "zar'", "Plant"), ("زرافة", "zarafa", "Giraffe"), ("زيتون", "zaytun", "Olive"), ("زر", "zarr", "Button")],
    12: [("سمكة", "samaka", "Fish"), ("سيارة", "sayyara", "Car"), ("ساعة", "sa'a", "Clock"), ("سرير", "sarir", "Bed"), ("سحاب", "sahab", "Cloud")],
    13: [("شجرة", "shajara", "Tree"), ("شمس", "shams", "Sun"), ("شباك", "shubbak", "Window"), ("شمعة", "sham'a", "Candle"), ("شرطة", "shurta", "Police")],
    14: [("صقر", "saqr", "Falcon"), ("صابون", "sabun", "Soap"), ("صندوق", "sunduq", "Box"), ("صحن", "sahn", "Plate"), ("صورة", "sura", "Picture")],
    15: [("ضفدع", "difda'", "Frog"), ("ضرس", "dirs", "Tooth"), ("ضوء", "daw'", "Light"), ("ضبع", "dabu'", "Hyena"), ("ضابط", "dabit", "Officer")],
    16: [("طائر", "ta'ir", "Bird"), ("طاولة", "tawila", "Table"), ("طباشير", "tabashir", "Chalk"), ("طماطم", "tamatim", "Tomato"), ("طريق", "tariq", "Road")],
    17: [("ظرف", "zarf", "Envelope"), ("ظل", "zill", "Shadow"), ("ظبي", "zabi", "Gazelle"), ("ظفر", "zufr", "Nail"), ("ظهيرة", "zahira", "Noon")],
    18: [("عين", "ayn", "Eye"), ("عنب", "'inab", "Grapes"), ("عصفور", "'usfur", "Bird"), ("علم", "'alam", "Flag"), ("عسل", "'asal", "Honey")],
    19: [("غزال", "ghazal", "Deer"), ("غيمة", "ghayma", "Cloud"), ("غراب", "ghurab", "Crow"), ("غابة", "ghaba", "Forest"), ("غسالة", "ghassala", "Washing Machine")],
    20: [("فيل", "fil", "Elephant"), ("فراشة", "farasha", "Butterfly"), ("فاكهة", "fakiha", "Fruit"), ("فستان", "fustan", "Dress"), ("فم", "fam", "Mouth")],
    21: [("قطة", "qitta", "Cat"), ("قلم", "qalam", "Pen"), ("قمر", "qamar", "Moon"), ("قارب", "qarib", "Boat"), ("قبعة", "qubba'a", "Hat")],
    22: [("كتاب", "kitab", "Book"), ("كرة", "kurra", "Ball"), ("كرسي", "kursi", "Chair"), ("كلب", "kalb", "Dog"), ("كوب", "kub", "Cup")],
    23: [("ليمون", "laymun", "Lemon"), ("لعبة", "lu'ba", "Toy"), ("لسان", "lisan", "Tongue"), ("لبن", "laban", "Yogurt"), ("لؤلؤ", "lu'lu'", "Pearl")],
    24: [("مدرسة", "madrasa", "School"), ("موز", "mawz", "Banana"), ("مفتاح", "miftah", "Key"), ("مسجد", "masjid", "Mosque"), ("ملعقة", "mil'aqa", "Spoon")],
    25: [("نملة", "namla", "Ant"), ("نجم", "najm", "Star"), ("نحلة", "nahla", "Bee"), ("نهر", "nahr", "River"), ("نخلة", "nakhla", "Palm Tree")],
    26: [("هدية", "hadiyya", "Gift"), ("هلال", "hilal", "Crescent"), ("هاتف", "hatif", "Phone"), ("هواء", "hawa'", "Air"), ("هدهد", "hudhud", "Hoopoe")],
    27: [("وردة", "warda", "Rose"), ("وجه", "wajh", "Face"), ("ولد", "walad", "Boy"), ("ورقة", "waraqa", "Leaf"), ("وطن", "watan", "Homeland")],
    28: [("يد", "yad", "Hand"), ("يمامة", "yamama", "Dove"), ("ياسمين", "yasmin", "Jasmine"), ("يقطين", "yaqtin", "Pumpkin"), ("ينبوع", "yambu'", "Spring")],
}

def main():
    # Create directories and update JSON
    for jf in sorted(CONTENT_DIR.glob("*.json")):
        with open(jf, "r", encoding="utf-8") as f:
            data = json.load(f)

        lid = data["id"]
        letter_ar = data["letter"].strip()  # e.g. "أ"
        word_list = WORDS_MAP.get(lid, [])

        if not word_list:
            print(f"  SKIP {jf.name}")
            continue

        # Create directory
        dir_path = AUDIO_DIR / letter_ar
        dir_path.mkdir(parents=True, exist_ok=True)

        # Build new words array + audio paths
        new_words = []
        word_paths = []
        name_base = data["name"].replace(" ", "_")
        for i, (arabic, trans, eng) in enumerate(word_list):
            new_words.append({
                "id": f"{name_base}_{i+1}",
                "arabic": arabic,
                "transliteration": trans,
                "english": eng,
                "position": "initial",
                "syllables": []
            })
            word_paths.append(f"/audio/words/{letter_ar}/{arabic}.mp3")

            # Create placeholder file
            fpath = dir_path / f"{arabic}.mp3"
            if not fpath.exists():
                fpath.touch()

        data["words"] = new_words
        data["audioUrls"]["words"] = word_paths

        with open(jf, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"  OK {jf.name} ({letter_ar}) — {len(word_list)} words")

    total = sum(len(v) for v in WORDS_MAP.values())
    print(f"\nDone! 28 letters, {total} words. Placeholder MP3s created.")

if __name__ == "__main__":
    main()
