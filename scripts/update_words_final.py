import json, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

CONTENT_DIR = Path(r"D:\pro\produit nemerotique\n\hurofi\src\content\letters")

# Original 5 words (restored) + 2 extra for matching (medial + final)
# Format: [ (arabic, transliteration, english, position, image), ... ]
ALL_WORDS = {
    "01-alif": [
        ("أسد", "asad", "Lion", "initial", "🦁"),
        ("أرنب", "arnab", "Rabbit", "initial", "🐰"),
        ("أم", "umm", "Mother", "initial", "👩‍👧"),
        ("أنف", "anf", "Nose", "initial", "👃"),
        ("أذن", "udhun", "Ear", "initial", "👂"),
        ("سأل", "sa'ala", "Asked", "medial", "❓"),
        ("قرأ", "qara'a", "Read", "final", "📖"),
    ],
    "02-baa": [
        ("باب", "bab", "Door", "initial", "🚪"),
        ("بطة", "batta", "Duck", "initial", "🦆"),
        ("بحر", "bahr", "Sea", "initial", "🌊"),
        ("برتقال", "burtuqal", "Orange", "initial", "🍊"),
        ("بيت", "bayt", "House", "initial", "🏠"),
        ("جبل", "jabal", "Mountain", "medial", "🏔️"),
        ("كتاب", "kitab", "Book", "final", "📖"),
    ],
    "03-taa": [
        ("تفاحة", "tuffahah", "Apple", "initial", "🍎"),
        ("تمساح", "timsah", "Crocodile", "initial", "🐊"),
        ("تين", "tin", "Fig", "initial", "🥝"),
        ("تاج", "taj", "Crown", "initial", "👑"),
        ("تلفاز", "tilifiz", "TV", "initial", "📺"),
        ("كتكوت", "kutkut", "Chick", "medial", "🐤"),
        ("بيت", "bayt", "House", "final", "🏠"),
    ],
    "04-thaa": [
        ("ثريا", "thuraya", "Chandelier", "initial", "💡"),
        ("ثعلب", "tha'lab", "Fox", "initial", "🦊"),
        ("ثلج", "thalj", "Snow", "initial", "❄️"),
        ("ثمرة", "thamara", "Fruit", "initial", "🍇"),
        ("ثوب", "thawb", "Dress", "initial", "👗"),
        ("مثلث", "muthallath", "Triangle", "medial", "🔺"),
        ("حديث", "hadith", "Speech", "final", "💬"),
    ],
    "05-jeem": [
        ("جبل", "jabal", "Mountain", "initial", "🏔️"),
        ("جبن", "jubn", "Cheese", "initial", "🧀"),
        ("جرس", "jaras", "Bell", "initial", "🔔"),
        ("جزر", "jazar", "Carrots", "initial", "🥕"),
        ("جمل", "jamal", "Camel", "initial", "🐪"),
        ("نجم", "najm", "Star", "medial", "⭐"),
        ("ثلج", "thalj", "Snow", "final", "❄️"),
    ],
    "06-haa": [
        ("حديقة", "hadiqa", "Garden", "initial", "🌹"),
        ("حذاء", "hidha'", "Shoe", "initial", "👟"),
        ("حصان", "hisan", "Horse", "initial", "🐴"),
        ("حليب", "halib", "Milk", "initial", "🥛"),
        ("حمامة", "hamama", "Pigeon", "initial", "🕊️"),
        ("نحل", "nahl", "Bees", "medial", "🐝"),
        ("صباح", "sabah", "Morning", "final", "☀️"),
    ],
    "07-khaa": [
        ("خاتم", "khatam", "Ring", "initial", "💍"),
        ("خبز", "khubz", "Bread", "initial", "🍞"),
        ("خروف", "kharuf", "Sheep", "initial", "🐑"),
        ("خوخ", "khawkh", "Peach", "initial", "🍑"),
        ("خيار", "khiyar", "Cucumber", "initial", "🥒"),
        ("نخلة", "nakhlah", "Palm tree", "medial", "🌴"),
        ("بطيخ", "battikh", "Watermelon", "final", "🍉"),
    ],
    "08-daal": [
        ("دجاجة", "dajaja", "Hen", "initial", "🐔"),
        ("دراجة", "darraja", "Bicycle", "initial", "🚲"),
        ("دفتر", "daftar", "Notebook", "initial", "📓"),
        ("دواء", "dawa'", "Medicine", "initial", "💊"),
        ("ديك", "dik", "Rooster", "initial", "🐓"),
        ("مدرسة", "madrasah", "School", "medial", "🏫"),
        ("أسد", "asad", "Lion", "final", "🦁"),
    ],
    "09-dhal": [
        ("ذئب", "dhi'b", "Wolf", "initial", "🐺"),
        ("ذراع", "dhira'", "Arm", "initial", "💪"),
        ("ذرة", "dhurah", "Corn", "initial", "🌽"),
        ("ذهب", "dhahab", "Gold", "initial", "🪙"),
        ("ذيل", "dhayl", "Tail", "initial", "🐕"),
        ("أذن", "udhun", "Ear", "medial", "👂"),
        ("لذيذ", "ladhidh", "Delicious", "final", "🍰"),
    ],
    "10-raa": [
        ("رجل", "rajul", "Man", "initial", "🧑"),
        ("رحمان", "rahman", "Merciful", "initial", "🤲"),
        ("رمان", "rumman", "Pomegranate", "initial", "🍑"),
        ("رمل", "raml", "Sand", "initial", "🏖️"),
        ("ريشة", "rishah", "Feather", "initial", "🪶"),
        ("فراشة", "farashah", "Butterfly", "medial", "🦋"),
        ("نار", "nar", "Fire", "final", "🔥"),
    ],
    "11-zay": [
        ("زر", "zirr", "Button", "initial", "🔘"),
        ("زرافة", "zarafah", "Giraffe", "initial", "🦒"),
        ("زرع", "zar'", "Plant", "initial", "🌱"),
        ("زهرة", "zahrah", "Flower", "initial", "🌸"),
        ("زيتون", "zaytun", "Olives", "initial", "🫒"),
        ("غزال", "ghazal", "Gazelle", "medial", "🦌"),
        ("موز", "mawz", "Banana", "final", "🍌"),
    ],
    "12-seen": [
        ("ساعة", "sa'ah", "Watch", "initial", "⌚"),
        ("سحاب", "sahab", "Cloud", "initial", "☁️"),
        ("سرير", "sarira", "Bed", "initial", "🛏️"),
        ("سمكة", "samakah", "Fish", "initial", "🐟"),
        ("سيارة", "sayyarah", "Car", "initial", "🚗"),
        ("جسر", "jisr", "Bridge", "medial", "🌉"),
        ("خس", "khass", "Lettuce", "final", "🥬"),
    ],
    "13-sheen": [
        ("شباك", "shubbak", "Window", "initial", "🪟"),
        ("شجرة", "shajarah", "Tree", "initial", "🌳"),
        ("شرطة", "shurtah", "Police", "initial", "👮"),
        ("شمس", "shams", "Sun", "initial", "☀️"),
        ("شمعة", "sham'ah", "Candle", "initial", "🕯️"),
        ("فرشاة", "furshah", "Brush", "medial", "🪥"),
        ("عرش", "arsh", "Throne", "final", "👑"),
    ],
    "14-saad": [
        ("صابون", "sabun", "Soap", "initial", "🧼"),
        ("صحن", "sahn", "Plate", "initial", "🍽️"),
        ("صقر", "saqr", "Falcon", "initial", "🦅"),
        ("صندوق", "sanduq", "Box", "initial", "📦"),
        ("صورة", "surah", "Picture", "initial", "🖼️"),
        ("عصفور", "usfur", "Bird", "medial", "🐦"),
        ("قفص", "qafas", "Cage", "final", "🦜"),
    ],
    "15-daad": [
        ("ضابط", "dabit", "Officer", "initial", "🎖️"),
        ("ضبع", "dabu'", "Hyena", "initial", "🦁"),
        ("ضرس", "dirs", "Molar", "initial", "🦷"),
        ("ضفدع", "dafdi'", "Frog", "initial", "🐸"),
        ("ضوء", "daw'", "Light", "initial", "💡"),
        ("بيضة", "baydah", "Egg", "medial", "🥚"),
        ("مريض", "marid", "Sick", "final", "🤒"),
    ],
    "16-taa_emph": [
        ("طائر", "ta'ir", "Bird", "initial", "🐦"),
        ("طاولة", "tawilah", "Table", "initial", "🪑"),
        ("طباشير", "tabashir", "Chalk", "initial", "✏️"),
        ("طريق", "tariq", "Road", "initial", "🛣️"),
        ("طماطم", "tamatim", "Tomato", "initial", "🍅"),
        ("أطفال", "atfal", "Children", "medial", "👶"),
        ("قط", "qitt", "Cat", "final", "🐱"),
    ],
    "17-thaa_emph": [
        ("ظبي", "dhabi", "Gazelle", "initial", "🦌"),
        ("ظرف", "dharrf", "Envelope", "initial", "✉️"),
        ("ظفر", "dhufr", "Nail", "initial", "💅"),
        ("ظل", "dhill", "Shadow", "initial", "🌑"),
        ("ظهيرة", "dhahirah", "Noon", "initial", "🕛"),
        ("أظافر", "adhafir", "Nails", "medial", "💅"),
        ("يقظ", "yaqidh", "Awake", "final", "😴"),
    ],
    "18-ain": [
        ("عسل", "asal", "Honey", "initial", "🍯"),
        ("عصفور", "usfur", "Bird", "initial", "🐦"),
        ("علم", "alam", "Flag", "initial", "🚩"),
        ("عنب", "inab", "Grapes", "initial", "🍇"),
        ("عين", "ayn", "Eye", "initial", "👁️"),
        ("ساعة", "sa'ah", "Clock", "medial", "🕐"),
        ("ذراع", "dhira'", "Arm", "final", "💪"),
    ],
    "19-ghain": [
        ("غابة", "ghabah", "Forest", "initial", "🌳"),
        ("غراب", "ghurab", "Crow", "initial", "🐦‍⬛"),
        ("غزال", "ghazal", "Gazelle", "initial", "🦌"),
        ("غسالة", "ghassalah", "Washer", "initial", "🧺"),
        ("غيمة", "ghaymah", "Cloud", "initial", "☁️"),
        ("نغم", "nagham", "Melody", "medial", "🎵"),
        ("صبغ", "sabagh", "Paint", "final", "🎨"),
    ],
    "20-faa": [
        ("فاكهة", "fakihah", "Fruit", "initial", "🍉"),
        ("فراشة", "farashah", "Butterfly", "initial", "🦋"),
        ("فستان", "fustan", "Dress", "initial", "👗"),
        ("فم", "fam", "Mouth", "initial", "👄"),
        ("فيل", "fil", "Elephant", "initial", "🐘"),
        ("تفاحة", "tuffahah", "Apple", "medial", "🍎"),
        ("سقف", "saqf", "Roof", "final", "🏠"),
    ],
    "21-qaaf": [
        ("قارب", "qarib", "Boat", "initial", "⛵"),
        ("قبعة", "qubba'ah", "Hat", "initial", "🧢"),
        ("قطة", "qittah", "Cat", "initial", "🐱"),
        ("قلم", "qalam", "Pen", "initial", "🖊️"),
        ("قمر", "qamar", "Moon", "initial", "🌙"),
        ("بقرة", "baqarah", "Cow", "medial", "🐄"),
        ("طريق", "tariq", "Road", "final", "🛣️"),
    ],
    "22-kaaf": [
        ("كتاب", "kitab", "Book", "initial", "📖"),
        ("كرة", "kurah", "Ball", "initial", "⚽"),
        ("كرسي", "kursiyy", "Chair", "initial", "🪑"),
        ("كلب", "kalb", "Dog", "initial", "🐕"),
        ("كوب", "kub", "Cup", "initial", "🥤"),
        ("مكتب", "maktab", "Desk", "medial", "🪑"),
        ("سمك", "samak", "Fish", "final", "🐟"),
    ],
    "23-laam": [
        ("لؤلؤ", "lu'lu'", "Pearl", "initial", "🦪"),
        ("لبن", "laban", "Yogurt", "initial", "🥛"),
        ("لسان", "lisan", "Tongue", "initial", "👅"),
        ("لعبة", "lu'bah", "Toy", "initial", "🧸"),
        ("ليمون", "laymun", "Lemon", "initial", "🍋"),
        ("تلفاز", "tilifiz", "TV", "medial", "📺"),
        ("جمل", "jamal", "Camel", "final", "🐪"),
    ],
    "24-meem": [
        ("مدرسة", "madrasah", "School", "initial", "🏫"),
        ("مسجد", "masjid", "Mosque", "initial", "🕌"),
        ("مفتاح", "miftah", "Key", "initial", "🔑"),
        ("ملعقة", "mil'qah", "Spoon", "initial", "🥄"),
        ("موز", "mawz", "Banana", "initial", "🍌"),
        ("سماء", "sama'", "Sky", "medial", "☁️"),
        ("فم", "fam", "Mouth", "final", "👄"),
    ],
    "25-nun": [
        ("نجم", "najm", "Star", "initial", "⭐"),
        ("نحلة", "nahlah", "Bee", "initial", "🐝"),
        ("نخلة", "nakhlah", "Palm", "initial", "🌴"),
        ("نملة", "namlah", "Ant", "initial", "🐜"),
        ("نهر", "nahr", "River", "initial", "🌊"),
        ("عنب", "inab", "Grapes", "medial", "🍇"),
        ("زيتون", "zaytun", "Olives", "final", "🫒"),
    ],
    "26-haa_end": [
        ("هاتف", "hatif", "Phone", "initial", "📱"),
        ("هدهد", "hudhud", "Hoopoe", "initial", "🐦"),
        ("هدية", "hadiyyah", "Gift", "initial", "🎁"),
        ("هلال", "hilal", "Crescent", "initial", "🌙"),
        ("هواء", "hawa'", "Air", "initial", "💨"),
        ("فهد", "fahd", "Cheetah", "medial", "🐆"),
        ("وجه", "wajh", "Face", "final", "😊"),
    ],
    "27-waw": [
        ("وجه", "wajh", "Face", "initial", "😊"),
        ("وردة", "wardah", "Rose", "initial", "🌹"),
        ("ورقة", "waraqah", "Leaf", "initial", "🌿"),
        ("وطن", "watan", "Homeland", "initial", "🏠"),
        ("ولد", "walad", "Boy", "initial", "👦"),
        ("توت", "tut", "Berry", "medial", "🫐"),
        ("جرو", "jarw", "Puppy", "final", "🐶"),
    ],
    "28-yaa": [
        ("ياسمين", "yasmin", "Jasmine", "initial", "🌸"),
        ("يد", "yad", "Hand", "initial", "✋"),
        ("يقطين", "yaqtin", "Pumpkin", "initial", "🎃"),
        ("يمامة", "yamamah", "Dove", "initial", "🕊️"),
        ("ينبوع", "yanbu'", "Spring", "initial", "⛲"),
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
    if letter_key not in ALL_WORDS:
        print(f"  SKIP {letter_key}")
        continue

    word_list = ALL_WORDS[letter_key]
    arabic_folder = letter_name_to_arabic_folder(letter_key)

    updated_words = []
    audio_urls = []

    for i, (arabic, translit, english, position, image) in enumerate(word_list):
        wid = f"{data['name']}_{i+1}"
        updated_words.append({
            "id": wid,
            "arabic": arabic,
            "transliteration": translit,
            "english": english,
            "position": position,
            "syllables": [],
            "image": image,
        })
        audio_urls.append(f"/audio/words/{arabic_folder}/{arabic}.mp3")

    data["words"] = updated_words
    data["audioUrls"]["words"] = audio_urls

    with open(jf, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"  OK {letter_key} ({len(word_list)} words, positions: {set(w[3] for w in word_list)})")
    updates += 1

print(f"\n✅ Updated {updates} letter files")
