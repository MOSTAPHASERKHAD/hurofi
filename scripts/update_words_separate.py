import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")

# 5 original words in "words", 2 matching words in "matchWords"
ORIGINAL_WORDS = {
    "01-alif": [
        ("أسد", "asad", "Lion", "initial", "🦁"),
        ("أرنب", "arnab", "Rabbit", "initial", "🐰"),
        ("أم", "umm", "Mother", "initial", "👩‍👧"),
        ("أنف", "anf", "Nose", "initial", "👃"),
        ("أذن", "udhun", "Ear", "initial", "👂"),
    ],
    "02-baa": [
        ("باب", "bab", "Door", "initial", "🚪"),
        ("بطة", "batta", "Duck", "initial", "🦆"),
        ("بحر", "bahr", "Sea", "initial", "🌊"),
        ("برتقال", "burtuqal", "Orange", "initial", "🍊"),
        ("بيت", "bayt", "House", "initial", "🏠"),
    ],
    "03-taa": [
        ("تفاحة", "tuffahah", "Apple", "initial", "🍎"),
        ("تمساح", "timsah", "Crocodile", "initial", "🐊"),
        ("تين", "tin", "Fig", "initial", "🥝"),
        ("تاج", "taj", "Crown", "initial", "👑"),
        ("تلفاز", "tilifiz", "TV", "initial", "📺"),
    ],
    "04-thaa": [
        ("ثريا", "thuraya", "Chandelier", "initial", "💡"),
        ("ثعلب", "tha'lab", "Fox", "initial", "🦊"),
        ("ثلج", "thalj", "Snow", "initial", "❄️"),
        ("ثمرة", "thamara", "Fruit", "initial", "🍇"),
        ("ثوب", "thawb", "Dress", "initial", "👗"),
    ],
    "05-jeem": [
        ("جبل", "jabal", "Mountain", "initial", "🏔️"),
        ("جبن", "jubn", "Cheese", "initial", "🧀"),
        ("جرس", "jaras", "Bell", "initial", "🔔"),
        ("جزر", "jazar", "Carrots", "initial", "🥕"),
        ("جمل", "jamal", "Camel", "initial", "🐪"),
    ],
    "06-haa": [
        ("حديقة", "hadiqa", "Garden", "initial", "🌹"),
        ("حذاء", "hidha'", "Shoe", "initial", "👟"),
        ("حصان", "hisan", "Horse", "initial", "🐴"),
        ("حليب", "halib", "Milk", "initial", "🥛"),
        ("حمامة", "hamama", "Pigeon", "initial", "🕊️"),
    ],
    "07-khaa": [
        ("خاتم", "khatam", "Ring", "initial", "💍"),
        ("خبز", "khubz", "Bread", "initial", "🍞"),
        ("خروف", "kharuf", "Sheep", "initial", "🐑"),
        ("خوخ", "khawkh", "Peach", "initial", "🍑"),
        ("خيار", "khiyar", "Cucumber", "initial", "🥒"),
    ],
    "08-daal": [
        ("دجاجة", "dajaja", "Hen", "initial", "🐔"),
        ("دراجة", "darraja", "Bicycle", "initial", "🚲"),
        ("دفتر", "daftar", "Notebook", "initial", "📓"),
        ("دواء", "dawa'", "Medicine", "initial", "💊"),
        ("ديك", "dik", "Rooster", "initial", "🐓"),
    ],
    "09-dhal": [
        ("ذئب", "dhi'b", "Wolf", "initial", "🐺"),
        ("ذراع", "dhira'", "Arm", "initial", "💪"),
        ("ذرة", "dhurah", "Corn", "initial", "🌽"),
        ("ذهب", "dhahab", "Gold", "initial", "🪙"),
        ("ذيل", "dhayl", "Tail", "initial", "🐕"),
    ],
    "10-raa": [
        ("رجل", "rajul", "Man", "initial", "🧑"),
        ("رحمان", "rahman", "Merciful", "initial", "🤲"),
        ("رمان", "rumman", "Pomegranate", "initial", "🍑"),
        ("رمل", "raml", "Sand", "initial", "🏖️"),
        ("ريشة", "rishah", "Feather", "initial", "🪶"),
    ],
    "11-zay": [
        ("زر", "zirr", "Button", "initial", "🔘"),
        ("زرافة", "zarafah", "Giraffe", "initial", "🦒"),
        ("زرع", "zar'", "Plant", "initial", "🌱"),
        ("زهرة", "zahrah", "Flower", "initial", "🌸"),
        ("زيتون", "zaytun", "Olives", "initial", "🫒"),
    ],
    "12-seen": [
        ("ساعة", "sa'ah", "Watch", "initial", "⌚"),
        ("سحاب", "sahab", "Cloud", "initial", "☁️"),
        ("سرير", "sarira", "Bed", "initial", "🛏️"),
        ("سمكة", "samakah", "Fish", "initial", "🐟"),
        ("سيارة", "sayyarah", "Car", "initial", "🚗"),
    ],
    "13-sheen": [
        ("شباك", "shubbak", "Window", "initial", "🪟"),
        ("شجرة", "shajarah", "Tree", "initial", "🌳"),
        ("شرطة", "shurtah", "Police", "initial", "👮"),
        ("شمس", "shams", "Sun", "initial", "☀️"),
        ("شمعة", "sham'ah", "Candle", "initial", "🕯️"),
    ],
    "14-saad": [
        ("صابون", "sabun", "Soap", "initial", "🧼"),
        ("صحن", "sahn", "Plate", "initial", "🍽️"),
        ("صقر", "saqr", "Falcon", "initial", "🦅"),
        ("صندوق", "sanduq", "Box", "initial", "📦"),
        ("صورة", "surah", "Picture", "initial", "🖼️"),
    ],
    "15-daad": [
        ("ضابط", "dabit", "Officer", "initial", "🎖️"),
        ("ضبع", "dabu'", "Hyena", "initial", "🦁"),
        ("ضرس", "dirs", "Molar", "initial", "🦷"),
        ("ضفدع", "dafdi'", "Frog", "initial", "🐸"),
        ("ضوء", "daw'", "Light", "initial", "💡"),
    ],
    "16-taa_emph": [
        ("طائر", "ta'ir", "Bird", "initial", "🐦"),
        ("طاولة", "tawilah", "Table", "initial", "🪑"),
        ("طباشير", "tabashir", "Chalk", "initial", "✏️"),
        ("طريق", "tariq", "Road", "initial", "🛣️"),
        ("طماطم", "tamatim", "Tomato", "initial", "🍅"),
    ],
    "17-thaa_emph": [
        ("ظبي", "dhabi", "Gazelle", "initial", "🦌"),
        ("ظرف", "dharrf", "Envelope", "initial", "✉️"),
        ("ظفر", "dhufr", "Nail", "initial", "💅"),
        ("ظل", "dhill", "Shadow", "initial", "🌑"),
        ("ظهيرة", "dhahirah", "Noon", "initial", "🕛"),
    ],
    "18-ain": [
        ("عسل", "asal", "Honey", "initial", "🍯"),
        ("عصفور", "usfur", "Bird", "initial", "🐦"),
        ("علم", "alam", "Flag", "initial", "🚩"),
        ("عنب", "inab", "Grapes", "initial", "🍇"),
        ("عين", "ayn", "Eye", "initial", "👁️"),
    ],
    "19-ghain": [
        ("غابة", "ghabah", "Forest", "initial", "🌳"),
        ("غراب", "ghurab", "Crow", "initial", "🐦‍⬛"),
        ("غزال", "ghazal", "Gazelle", "initial", "🦌"),
        ("غسالة", "ghassalah", "Washer", "initial", "🧺"),
        ("غيمة", "ghaymah", "Cloud", "initial", "☁️"),
    ],
    "20-faa": [
        ("فاكهة", "fakihah", "Fruit", "initial", "🍉"),
        ("فراشة", "farashah", "Butterfly", "initial", "🦋"),
        ("فستان", "fustan", "Dress", "initial", "👗"),
        ("فم", "fam", "Mouth", "initial", "👄"),
        ("فيل", "fil", "Elephant", "initial", "🐘"),
    ],
    "21-qaaf": [
        ("قارب", "qarib", "Boat", "initial", "⛵"),
        ("قبعة", "qubba'ah", "Hat", "initial", "🧢"),
        ("قطة", "qittah", "Cat", "initial", "🐱"),
        ("قلم", "qalam", "Pen", "initial", "🖊️"),
        ("قمر", "qamar", "Moon", "initial", "🌙"),
    ],
    "22-kaaf": [
        ("كتاب", "kitab", "Book", "initial", "📖"),
        ("كرة", "kurah", "Ball", "initial", "⚽"),
        ("كرسي", "kursiyy", "Chair", "initial", "🪑"),
        ("كلب", "kalb", "Dog", "initial", "🐕"),
        ("كوب", "kub", "Cup", "initial", "🥤"),
    ],
    "23-laam": [
        ("لؤلؤ", "lu'lu'", "Pearl", "initial", "🦪"),
        ("لبن", "laban", "Yogurt", "initial", "🥛"),
        ("لسان", "lisan", "Tongue", "initial", "👅"),
        ("لعبة", "lu'bah", "Toy", "initial", "🧸"),
        ("ليمون", "laymun", "Lemon", "initial", "🍋"),
    ],
    "24-meem": [
        ("مدرسة", "madrasah", "School", "initial", "🏫"),
        ("مسجد", "masjid", "Mosque", "initial", "🕌"),
        ("مفتاح", "miftah", "Key", "initial", "🔑"),
        ("ملعقة", "mil'qah", "Spoon", "initial", "🥄"),
        ("موز", "mawz", "Banana", "initial", "🍌"),
    ],
    "25-nun": [
        ("نجم", "najm", "Star", "initial", "⭐"),
        ("نحلة", "nahlah", "Bee", "initial", "🐝"),
        ("نخلة", "nakhlah", "Palm", "initial", "🌴"),
        ("نملة", "namlah", "Ant", "initial", "🐜"),
        ("نهر", "nahr", "River", "initial", "🌊"),
    ],
    "26-haa_end": [
        ("هاتف", "hatif", "Phone", "initial", "📱"),
        ("هدهد", "hudhud", "Hoopoe", "initial", "🐦"),
        ("هدية", "hadiyyah", "Gift", "initial", "🎁"),
        ("هلال", "hilal", "Crescent", "initial", "🌙"),
        ("هواء", "hawa'", "Air", "initial", "💨"),
    ],
    "27-waw": [
        ("وجه", "wajh", "Face", "initial", "😊"),
        ("وردة", "wardah", "Rose", "initial", "🌹"),
        ("ورقة", "waraqah", "Leaf", "initial", "🌿"),
        ("وطن", "watan", "Homeland", "initial", "🏠"),
        ("ولد", "walad", "Boy", "initial", "👦"),
    ],
    "28-yaa": [
        ("ياسمين", "yasmin", "Jasmine", "initial", "🌸"),
        ("يد", "yad", "Hand", "initial", "✋"),
        ("يقطين", "yaqtin", "Pumpkin", "initial", "🎃"),
        ("يمامة", "yamamah", "Dove", "initial", "🕊️"),
        ("ينبوع", "yanbu'", "Spring", "initial", "⛲"),
    ],
}

MATCH_WORDS = {
    "01-alif": [("سأل", "sa'ala", "Asked", "medial", "❓"), ("قرأ", "qara'a", "Read", "final", "📖")],
    "02-baa": [("جبل", "jabal", "Mountain", "medial", "🏔️"), ("كتاب", "kitab", "Book", "final", "📖")],
    "03-taa": [("كتكوت", "kutkut", "Chick", "medial", "🐤"), ("بيت", "bayt", "House", "final", "🏠")],
    "04-thaa": [("مثلث", "muthallath", "Triangle", "medial", "🔺"), ("حديث", "hadith", "Speech", "final", "💬")],
    "05-jeem": [("نجم", "najm", "Star", "medial", "⭐"), ("ثلج", "thalj", "Snow", "final", "❄️")],
    "06-haa": [("نحل", "nahl", "Bees", "medial", "🐝"), ("صباح", "sabah", "Morning", "final", "☀️")],
    "07-khaa": [("نخلة", "nakhlah", "Palm tree", "medial", "🌴"), ("بطيخ", "battikh", "Watermelon", "final", "🍉")],
    "08-daal": [("مدرسة", "madrasah", "School", "medial", "🏫"), ("أسد", "asad", "Lion", "final", "🦁")],
    "09-dhal": [("أذن", "udhun", "Ear", "medial", "👂"), ("لذيذ", "ladhidh", "Delicious", "final", "🍰")],
    "10-raa": [("فراشة", "farashah", "Butterfly", "medial", "🦋"), ("نار", "nar", "Fire", "final", "🔥")],
    "11-zay": [("غزال", "ghazal", "Gazelle", "medial", "🦌"), ("موز", "mawz", "Banana", "final", "🍌")],
    "12-seen": [("جسر", "jisr", "Bridge", "medial", "🌉"), ("خس", "khass", "Lettuce", "final", "🥬")],
    "13-sheen": [("فرشاة", "furshah", "Brush", "medial", "🪥"), ("عرش", "arsh", "Throne", "final", "👑")],
    "14-saad": [("عصفور", "usfur", "Bird", "medial", "🐦"), ("قفص", "qafas", "Cage", "final", "🦜")],
    "15-daad": [("بيضة", "baydah", "Egg", "medial", "🥚"), ("مريض", "marid", "Sick", "final", "🤒")],
    "16-taa_emph": [("أطفال", "atfal", "Children", "medial", "👶"), ("قط", "qitt", "Cat", "final", "🐱")],
    "17-thaa_emph": [("أظافر", "adhafir", "Nails", "medial", "💅"), ("يقظ", "yaqidh", "Awake", "final", "😴")],
    "18-ain": [("ساعة", "sa'ah", "Clock", "medial", "🕐"), ("ذراع", "dhira'", "Arm", "final", "💪")],
    "19-ghain": [("نغم", "nagham", "Melody", "medial", "🎵"), ("صبغ", "sabagh", "Paint", "final", "🎨")],
    "20-faa": [("تفاحة", "tuffahah", "Apple", "medial", "🍎"), ("سقف", "saqf", "Roof", "final", "🏠")],
    "21-qaaf": [("بقرة", "baqarah", "Cow", "medial", "🐄"), ("طريق", "tariq", "Road", "final", "🛣️")],
    "22-kaaf": [("مكتب", "maktab", "Desk", "medial", "🪑"), ("سمك", "samak", "Fish", "final", "🐟")],
    "23-laam": [("تلفاز", "tilifiz", "TV", "medial", "📺"), ("جمل", "jamal", "Camel", "final", "🐪")],
    "24-meem": [("سماء", "sama'", "Sky", "medial", "☁️"), ("فم", "fam", "Mouth", "final", "👄")],
    "25-nun": [("عنب", "inab", "Grapes", "medial", "🍇"), ("زيتون", "zaytun", "Olives", "final", "🫒")],
    "26-haa_end": [("فهد", "fahd", "Cheetah", "medial", "🐆"), ("وجه", "wajh", "Face", "final", "😊")],
    "27-waw": [("توت", "tut", "Berry", "medial", "🫐"), ("جرو", "jarw", "Puppy", "final", "🐶")],
    "28-yaa": [("بيت", "bayt", "House", "medial", "🏠"), ("كرسي", "kursiyy", "Chair", "final", "🪑")],
}

def make_word(id_prefix, arabic, translit, english, position, image, idx):
    return {
        "id": f"{id_prefix}_{idx}",
        "arabic": arabic,
        "transliteration": translit,
        "english": english,
        "position": position,
        "syllables": [],
        "image": image,
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

    key = jf.stem
    if key not in ORIGINAL_WORDS or key not in MATCH_WORDS:
        print(f"  SKIP {key}")
        continue

    arabic_folder = letter_name_to_arabic_folder(key)
    name = data["name"]

    # Build words (5 originals)
    words = []
    audio_urls = []
    for i, (ar, tr, en, pos, img) in enumerate(ORIGINAL_WORDS[key], 1):
        words.append(make_word(name, ar, tr, en, pos, img, i))
        audio_urls.append(f"/audio/words/{arabic_folder}/{ar}.mp3")

    # Build matchWords (2 extra)
    match_words = []
    for i, (ar, tr, en, pos, img) in enumerate(MATCH_WORDS[key], 1):
        match_words.append(make_word(name, ar, tr, en, pos, img, i))

    data["words"] = words
    data["matchWords"] = match_words
    data["audioUrls"]["words"] = audio_urls

    with open(jf, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"  OK {key} ({len(words)} main + {len(match_words)} match)")
    updates += 1

print(f"\n✅ Updated {updates} letter files")
