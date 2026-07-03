const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/letters');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const lettersData = [
  {
    id: 3, letter: "ت", name: "تاء",
    forms: { isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت" },
    words: [
      { id: "taa_1", arabic: "تفاحة", transliteration: "tuffaha", english: "Apple", position: "initial", syllables: ["تُفْ", "فَا", "حَة"] },
      { id: "taa_2", arabic: "تمساح", transliteration: "timsah", english: "Crocodile", position: "initial", syllables: ["تِمْ", "سَاح"] },
      { id: "taa_3", arabic: "كتاب", transliteration: "kitab", english: "Book", position: "medial", syllables: ["كِ", "تَاب"] },
      { id: "taa_4", arabic: "بيت", transliteration: "bayt", english: "House", position: "final", syllables: ["بَيْت"] }
    ],
    phonemes: [
      { sound: "تَ", diacritic: "فتحة", example: "تَمر" },
      { sound: "تُ", diacritic: "ضمة", example: "تُفاحة" },
      { sound: "تِ", diacritic: "كسرة", example: "تِمساح" }
    ]
  },
  {
    id: 4, letter: "ث", name: "ثاء",
    forms: { isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث" },
    words: [
      { id: "thaa_1", arabic: "ثعلب", transliteration: "tha'lab", english: "Fox", position: "initial", syllables: ["ثَعْ", "لَب"] },
      { id: "thaa_2", arabic: "ثعبان", transliteration: "thu'ban", english: "Snake", position: "initial", syllables: ["ثُعْ", "بَان"] },
      { id: "thaa_3", arabic: "مثلث", transliteration: "muthallath", english: "Triangle", position: "medial", syllables: ["مُ", "ثَلْ", "لَث"] },
      { id: "thaa_4", arabic: "محراث", transliteration: "mihrath", english: "Plow", position: "final", syllables: ["مِحْ", "رَاث"] }
    ],
    phonemes: [
      { sound: "ثَ", diacritic: "فتحة", example: "ثَعلب" },
      { sound: "ثُ", diacritic: "ضمة", example: "ثُعبان" },
      { sound: "ثِ", diacritic: "كسرة", example: "ثِمار" }
    ]
  },
  {
    id: 5, letter: "ج", name: "جيم",
    forms: { isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج" },
    words: [
      { id: "jeem_1", arabic: "جمل", transliteration: "jamal", english: "Camel", position: "initial", syllables: ["جَ", "مَل"] },
      { id: "jeem_2", arabic: "جزر", transliteration: "jazar", english: "Carrot", position: "initial", syllables: ["جَ", "زَر"] },
      { id: "jeem_3", arabic: "شجرة", transliteration: "shajara", english: "Tree", position: "medial", syllables: ["شَ", "جَ", "رَة"] },
      { id: "jeem_4", arabic: "ثلج", transliteration: "thalj", english: "Snow", position: "final", syllables: ["ثَلْج"] }
    ],
    phonemes: [
      { sound: "جَ", diacritic: "فتحة", example: "جَمل" },
      { sound: "جُ", diacritic: "ضمة", example: "جُبن" },
      { sound: "جِ", diacritic: "كسرة", example: "جِدار" }
    ]
  },
  {
    id: 6, letter: "ح", name: "حاء",
    forms: { isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح" },
    words: [
      { id: "haa_1", arabic: "حصان", transliteration: "hisan", english: "Horse", position: "initial", syllables: ["حِ", "صَان"] },
      { id: "haa_2", arabic: "حليب", transliteration: "halib", english: "Milk", position: "initial", syllables: ["حَ", "لِيب"] },
      { id: "haa_3", arabic: "بحر", transliteration: "bahr", english: "Sea", position: "medial", syllables: ["بَحْر"] },
      { id: "haa_4", arabic: "ملح", transliteration: "milh", english: "Salt", position: "final", syllables: ["مِلْح"] }
    ],
    phonemes: [
      { sound: "حَ", diacritic: "فتحة", example: "حَليب" },
      { sound: "حُ", diacritic: "ضمة", example: "حُوت" },
      { sound: "حِ", diacritic: "كسرة", example: "حِصان" }
    ]
  },
  {
    id: 7, letter: "خ", name: "خاء",
    forms: { isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ" },
    words: [
      { id: "khaa_1", arabic: "خروف", transliteration: "kharuf", english: "Sheep", position: "initial", syllables: ["خَ", "رُوف"] },
      { id: "khaa_2", arabic: "خبز", transliteration: "khubz", english: "Bread", position: "initial", syllables: ["خُبْز"] },
      { id: "khaa_3", arabic: "نخلة", transliteration: "nakhla", english: "Palm Tree", position: "medial", syllables: ["نَخْ", "لَة"] },
      { id: "khaa_4", arabic: "بطيخ", transliteration: "battikh", english: "Watermelon", position: "final", syllables: ["بِطْ", "طِيخ"] }
    ],
    phonemes: [
      { sound: "خَ", diacritic: "فتحة", example: "خَروف" },
      { sound: "خُ", diacritic: "ضمة", example: "خُبز" },
      { sound: "خِ", diacritic: "كسرة", example: "خِيار" }
    ]
  },
  {
    id: 8, letter: "د", name: "دال",
    forms: { isolated: "د", initial: "د", medial: "ـد", final: "ـد" },
    words: [
      { id: "daal_1", arabic: "دجاجة", transliteration: "dajaja", english: "Hen", position: "initial", syllables: ["دَ", "جَا", "جَة"] },
      { id: "daal_2", arabic: "دب", transliteration: "dubb", english: "Bear", position: "initial", syllables: ["دُبّ"] },
      { id: "daal_3", arabic: "مدرسة", transliteration: "madrasa", english: "School", position: "medial", syllables: ["مَدْ", "رَ", "سَة"] },
      { id: "daal_4", arabic: "قرد", transliteration: "qird", english: "Monkey", position: "final", syllables: ["قِرْد"] }
    ],
    phonemes: [
      { sound: "دَ", diacritic: "فتحة", example: "دَجاجة" },
      { sound: "دُ", diacritic: "ضمة", example: "دُب" },
      { sound: "دِ", diacritic: "كسرة", example: "دِيك" }
    ]
  },
  {
    id: 9, letter: "ذ", name: "ذال",
    forms: { isolated: "ذ", initial: "ذ", medial: "ـذ", final: "ـذ" },
    words: [
      { id: "dhal_1", arabic: "ذئب", transliteration: "dhi'b", english: "Wolf", position: "initial", syllables: ["ذِئْب"] },
      { id: "dhal_2", arabic: "ذرة", transliteration: "dhura", english: "Corn", position: "initial", syllables: ["ذُ", "رَة"] },
      { id: "dhal_3", arabic: "بذور", transliteration: "budhur", english: "Seeds", position: "medial", syllables: ["بُ", "ذُور"] },
      { id: "dhal_4", arabic: "قنفذ", transliteration: "qunfudh", english: "Hedgehog", position: "final", syllables: ["قُنْ", "فُذ"] }
    ],
    phonemes: [
      { sound: "ذَ", diacritic: "فتحة", example: "ذَهب" },
      { sound: "ذُ", diacritic: "ضمة", example: "ذُرة" },
      { sound: "ذِ", diacritic: "كسرة", example: "ذِئب" }
    ]
  },
  {
    id: 10, letter: "ر", name: "راء",
    forms: { isolated: "ر", initial: "ر", medial: "ـر", final: "ـر" },
    words: [
      { id: "raa_1", arabic: "رجل", transliteration: "rajul", english: "Man", position: "initial", syllables: ["رَ", "جُل"] },
      { id: "raa_2", arabic: "رمان", transliteration: "rumman", english: "Pomegranate", position: "initial", syllables: ["رُمّ", "مَان"] },
      { id: "raa_3", arabic: "فراشة", transliteration: "farasha", english: "Butterfly", position: "medial", syllables: ["فَ", "رَا", "شَة"] },
      { id: "raa_4", arabic: "قمر", transliteration: "qamar", english: "Moon", position: "final", syllables: ["قَ", "مَر"] }
    ],
    phonemes: [
      { sound: "رَ", diacritic: "فتحة", example: "رَجل" },
      { sound: "رُ", diacritic: "ضمة", example: "رُمان" },
      { sound: "رِ", diacritic: "كسرة", example: "رِيشة" }
    ]
  },
  {
    id: 11, letter: "ز", name: "زاي",
    forms: { isolated: "ز", initial: "ز", medial: "ـز", final: "ـز" },
    words: [
      { id: "zay_1", arabic: "زرافة", transliteration: "zarafa", english: "Giraffe", position: "initial", syllables: ["زَ", "رَا", "فَة"] },
      { id: "zay_2", arabic: "زهور", transliteration: "zuhur", english: "Flowers", position: "initial", syllables: ["زُ", "هُور"] },
      { id: "zay_3", arabic: "جزر", transliteration: "jazar", english: "Carrot", position: "medial", syllables: ["جَ", "زَر"] },
      { id: "zay_4", arabic: "خبز", transliteration: "khubz", english: "Bread", position: "final", syllables: ["خُبْز"] }
    ],
    phonemes: [
      { sound: "زَ", diacritic: "فتحة", example: "زَرافة" },
      { sound: "زُ", diacritic: "ضمة", example: "زُهور" },
      { sound: "زِ", diacritic: "كسرة", example: "زِر" }
    ]
  },
  {
    id: 12, letter: "س", name: "سين",
    forms: { isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس" },
    words: [
      { id: "seen_1", arabic: "سمكة", transliteration: "samaka", english: "Fish", position: "initial", syllables: ["سَ", "مَ", "كَة"] },
      { id: "seen_2", arabic: "سلحفاة", transliteration: "sulhufa", english: "Turtle", position: "initial", syllables: ["سُلْ", "حُ", "فَاة"] },
      { id: "seen_3", arabic: "تمساح", transliteration: "timsah", english: "Crocodile", position: "medial", syllables: ["تِمْ", "سَاح"] },
      { id: "seen_4", arabic: "شمس", transliteration: "shams", english: "Sun", position: "final", syllables: ["شَمْس"] }
    ],
    phonemes: [
      { sound: "سَ", diacritic: "فتحة", example: "سَمكة" },
      { sound: "سُ", diacritic: "ضمة", example: "سُلحفاة" },
      { sound: "سِ", diacritic: "كسرة", example: "سِكين" }
    ]
  },
  {
    id: 13, letter: "ش", name: "شين",
    forms: { isolated: "ش", initial: "شـ", medial: "ـشـ", final: "ـش" },
    words: [
      { id: "sheen_1", arabic: "شمس", transliteration: "shams", english: "Sun", position: "initial", syllables: ["شَمْس"] },
      { id: "sheen_2", arabic: "شجرة", transliteration: "shajara", english: "Tree", position: "initial", syllables: ["شَ", "جَ", "رَة"] },
      { id: "sheen_3", arabic: "عشب", transliteration: "'ushb", english: "Grass", position: "medial", syllables: ["عُشْب"] },
      { id: "sheen_4", arabic: "ريش", transliteration: "rish", english: "Feathers", position: "final", syllables: ["رِيش"] }
    ],
    phonemes: [
      { sound: "شَ", diacritic: "فتحة", example: "شَمس" },
      { sound: "شُ", diacritic: "ضمة", example: "شُرطي" },
      { sound: "شِ", diacritic: "كسرة", example: "شِراع" }
    ]
  },
  {
    id: 14, letter: "ص", name: "صاد",
    forms: { isolated: "ص", initial: "صـ", medial: "ـصـ", final: "ـص" },
    words: [
      { id: "saad_1", arabic: "صقر", transliteration: "saqr", english: "Falcon", position: "initial", syllables: ["صَقْر"] },
      { id: "saad_2", arabic: "صاروخ", transliteration: "sarukh", english: "Rocket", position: "initial", syllables: ["صَا", "رُوخ"] },
      { id: "saad_3", arabic: "بصل", transliteration: "basal", english: "Onion", position: "medial", syllables: ["بَ", "صَل"] },
      { id: "saad_4", arabic: "مقص", transliteration: "miqass", english: "Scissors", position: "final", syllables: ["مِ", "قَصّ"] }
    ],
    phonemes: [
      { sound: "صَ", diacritic: "فتحة", example: "صَقر" },
      { sound: "صُ", diacritic: "ضمة", example: "صُندوق" },
      { sound: "صِ", diacritic: "كسرة", example: "صِغار" }
    ]
  },
  {
    id: 15, letter: "ض", name: "ضاد",
    forms: { isolated: "ض", initial: "ضـ", medial: "ـضـ", final: "ـض" },
    words: [
      { id: "daad_1", arabic: "ضفدع", transliteration: "difda'", english: "Frog", position: "initial", syllables: ["ضِفْ", "دَع"] },
      { id: "daad_2", arabic: "ضرس", transliteration: "dirs", english: "Tooth", position: "initial", syllables: ["ضِرْس"] },
      { id: "daad_3", arabic: "مضرب", transliteration: "midrab", english: "Racket", position: "medial", syllables: ["مِضْ", "رَب"] },
      { id: "daad_4", arabic: "أرض", transliteration: "ard", english: "Earth", position: "final", syllables: ["أَرْض"] }
    ],
    phonemes: [
      { sound: "ضَ", diacritic: "فتحة", example: "ضَبع" },
      { sound: "ضُ", diacritic: "ضمة", example: "ضُباط" },
      { sound: "ضِ", diacritic: "كسرة", example: "ضِفدع" }
    ]
  },
  {
    id: 16, letter: "ط", name: "طاء",
    forms: { isolated: "ط", initial: "طـ", medial: "ـطـ", final: "ـط" },
    words: [
      { id: "taa_emph_1", arabic: "طائرة", transliteration: "ta'ira", english: "Airplane", position: "initial", syllables: ["طَا", "ئِ", "رَة"] },
      { id: "taa_emph_2", arabic: "طيور", transliteration: "tuyur", english: "Birds", position: "initial", syllables: ["طُ", "يُور"] },
      { id: "taa_emph_3", arabic: "بطة", transliteration: "batta", english: "Duck", position: "medial", syllables: ["بَطْ", "طَة"] },
      { id: "taa_emph_4", arabic: "قط", transliteration: "qitt", english: "Cat", position: "final", syllables: ["قِطّ"] }
    ],
    phonemes: [
      { sound: "طَ", diacritic: "فتحة", example: "طَائرة" },
      { sound: "طُ", diacritic: "ضمة", example: "طُيور" },
      { sound: "طِ", diacritic: "كسرة", example: "طِفل" }
    ]
  },
  {
    id: 17, letter: "ظ", name: "ظاء",
    forms: { isolated: "ظ", initial: "ظـ", medial: "ـظـ", final: "ـظ" },
    words: [
      { id: "thaa_emph_1", arabic: "ظرف", transliteration: "zarf", english: "Envelope", position: "initial", syllables: ["ظَرْف"] },
      { id: "thaa_emph_2", arabic: "ظل", transliteration: "zill", english: "Shadow", position: "initial", syllables: ["ظِلّ"] },
      { id: "thaa_emph_3", arabic: "مظلة", transliteration: "mizalla", english: "Umbrella", position: "medial", syllables: ["مِ", "ظَلْ", "لَة"] },
      { id: "thaa_emph_4", arabic: "حافظ", transliteration: "hafiz", english: "Kept", position: "final", syllables: ["حَا", "فِظ"] }
    ],
    phonemes: [
      { sound: "ظَ", diacritic: "فتحة", example: "ظَرف" },
      { sound: "ظُ", diacritic: "ضمة", example: "ظُروف" },
      { sound: "ظِ", diacritic: "كسرة", example: "ظِل" }
    ]
  },
  {
    id: 18, letter: "ع", name: "عين",
    forms: { isolated: "ع", initial: "عـ", medial: "ـعـ", final: "ـع" },
    words: [
      { id: "ain_1", arabic: "عصفور", transliteration: "'usfur", english: "Bird", position: "initial", syllables: ["عُصْ", "فُور"] },
      { id: "ain_2", arabic: "عنب", transliteration: "'inab", english: "Grapes", position: "initial", syllables: ["عِ", "نَب"] },
      { id: "ain_3", arabic: "ثعلب", transliteration: "tha'lab", english: "Fox", position: "medial", syllables: ["ثَعْ", "لَب"] },
      { id: "ain_4", arabic: "ضفدع", transliteration: "difda'", english: "Frog", position: "final", syllables: ["ضِفْ", "دَع"] }
    ],
    phonemes: [
      { sound: "عَ", diacritic: "فتحة", example: "عَين" },
      { sound: "عُ", diacritic: "ضمة", example: "عُصفور" },
      { sound: "عِ", diacritic: "كسرة", example: "عِنب" }
    ]
  },
  {
    id: 19, letter: "غ", name: "غين",
    forms: { isolated: "غ", initial: "غـ", medial: "ـغـ", final: "ـغ" },
    words: [
      { id: "ghain_1", arabic: "غزال", transliteration: "ghazal", english: "Deer", position: "initial", syllables: ["غَ", "زَال"] },
      { id: "ghain_2", arabic: "غراب", transliteration: "ghurab", english: "Crow", position: "initial", syllables: ["غُ", "رَاب"] },
      { id: "ghain_3", arabic: "ببغاء", transliteration: "babagha'", english: "Parrot", position: "medial", syllables: ["بَبْ", "بَ", "غَاء"] },
      { id: "ghain_4", arabic: "صمغ", transliteration: "samgh", english: "Glue", position: "final", syllables: ["صَمْغ"] }
    ],
    phonemes: [
      { sound: "غَ", diacritic: "فتحة", example: "غَزال" },
      { sound: "غُ", diacritic: "ضمة", example: "غُراب" },
      { sound: "غِ", diacritic: "كسرة", example: "غِطاء" }
    ]
  },
  {
    id: 20, letter: "ف", name: "فاء",
    forms: { isolated: "ف", initial: "فـ", medial: "ـفـ", final: "ـف" },
    words: [
      { id: "faa_1", arabic: "فيل", transliteration: "fil", english: "Elephant", position: "initial", syllables: ["فِيل"] },
      { id: "faa_2", arabic: "فراشة", transliteration: "farasha", english: "Butterfly", position: "initial", syllables: ["فَ", "رَا", "شَة"] },
      { id: "faa_3", arabic: "تفاحة", transliteration: "tuffaha", english: "Apple", position: "medial", syllables: ["تُفْ", "فَا", "حَة"] },
      { id: "faa_4", arabic: "هاتف", transliteration: "hatif", english: "Phone", position: "final", syllables: ["هَا", "تِف"] }
    ],
    phonemes: [
      { sound: "فَ", diacritic: "فتحة", example: "فَراشة" },
      { sound: "فُ", diacritic: "ضمة", example: "فُستان" },
      { sound: "فِ", diacritic: "كسرة", example: "فِيل" }
    ]
  },
  {
    id: 21, letter: "ق", name: "قاف",
    forms: { isolated: "ق", initial: "قـ", medial: "ـقـ", final: "ـق" },
    words: [
      { id: "qaaf_1", arabic: "قرد", transliteration: "qird", english: "Monkey", position: "initial", syllables: ["قِرْد"] },
      { id: "qaaf_2", arabic: "قطار", transliteration: "qitar", english: "Train", position: "initial", syllables: ["قِ", "طَار"] },
      { id: "qaaf_3", arabic: "بقرة", transliteration: "baqara", english: "Cow", position: "medial", syllables: ["بَ", "قَ", "رَة"] },
      { id: "qaaf_4", arabic: "ورق", transliteration: "waraq", english: "Paper", position: "final", syllables: ["وَ", "رَق"] }
    ],
    phonemes: [
      { sound: "قَ", diacritic: "فتحة", example: "قَلم" },
      { sound: "قُ", diacritic: "ضمة", example: "قُبعة" },
      { sound: "قِ", diacritic: "كسرة", example: "قِرد" }
    ]
  },
  {
    id: 22, letter: "ك", name: "كاف",
    forms: { isolated: "ك", initial: "كـ", medial: "ـكـ", final: "ـك" },
    words: [
      { id: "kaaf_1", arabic: "كلب", transliteration: "kalb", english: "Dog", position: "initial", syllables: ["كَلْب"] },
      { id: "kaaf_2", arabic: "كتاب", transliteration: "kitab", english: "Book", position: "initial", syllables: ["كِ", "تَاب"] },
      { id: "kaaf_3", arabic: "سمكة", transliteration: "samaka", english: "Fish", position: "medial", syllables: ["سَ", "مَ", "كَة"] },
      { id: "kaaf_4", arabic: "ديك", transliteration: "dik", english: "Rooster", position: "final", syllables: ["دِيك"] }
    ],
    phonemes: [
      { sound: "كَ", diacritic: "فتحة", example: "كَلب" },
      { sound: "كُ", diacritic: "ضمة", example: "كُرسي" },
      { sound: "كِ", diacritic: "كسرة", example: "كِتاب" }
    ]
  },
  {
    id: 23, letter: "ل", name: "لام",
    forms: { isolated: "ل", initial: "لـ", medial: "ـلـ", final: "ـل" },
    words: [
      { id: "laam_1", arabic: "ليمون", transliteration: "laymun", english: "Lemon", position: "initial", syllables: ["لَيْ", "مُون"] },
      { id: "laam_2", arabic: "لعبة", transliteration: "lu'ba", english: "Toy", position: "initial", syllables: ["لُعْ", "بَة"] },
      { id: "laam_3", arabic: "ثعلب", transliteration: "tha'lab", english: "Fox", position: "medial", syllables: ["ثَعْ", "لَب"] },
      { id: "laam_4", arabic: "جمل", transliteration: "jamal", english: "Camel", position: "final", syllables: ["جَ", "مَل"] }
    ],
    phonemes: [
      { sound: "لَ", diacritic: "فتحة", example: "لَيمون" },
      { sound: "لُ", diacritic: "ضمة", example: "لُعبة" },
      { sound: "لِ", diacritic: "كسرة", example: "لِسان" }
    ]
  },
  {
    id: 24, letter: "م", name: "ميم",
    forms: { isolated: "م", initial: "مـ", medial: "ـمـ", final: "ـم" },
    words: [
      { id: "meem_1", arabic: "موز", transliteration: "mawz", english: "Banana", position: "initial", syllables: ["مَوْز"] },
      { id: "meem_2", arabic: "مفتاح", transliteration: "miftah", english: "Key", position: "initial", syllables: ["مِفْ", "تَاح"] },
      { id: "meem_3", arabic: "شمس", transliteration: "shams", english: "Sun", position: "medial", syllables: ["شَمْس"] },
      { id: "meem_4", arabic: "قلم", transliteration: "qalam", english: "Pen", position: "final", syllables: ["قَ", "لَم"] }
    ],
    phonemes: [
      { sound: "مَ", diacritic: "فتحة", example: "مَوز" },
      { sound: "مُ", diacritic: "ضمة", example: "مُعلم" },
      { sound: "مِ", diacritic: "كسرة", example: "مِفتاح" }
    ]
  },
  {
    id: 25, letter: "ن", name: "نون",
    forms: { isolated: "ن", initial: "نـ", medial: "ـنـ", final: "ـن" },
    words: [
      { id: "nun_1", arabic: "نمر", transliteration: "namir", english: "Tiger", position: "initial", syllables: ["نَ", "مِر"] },
      { id: "nun_2", arabic: "نجمة", transliteration: "najma", english: "Star", position: "initial", syllables: ["نَجْ", "مَة"] },
      { id: "nun_3", arabic: "عنب", transliteration: "'inab", english: "Grapes", position: "medial", syllables: ["عِ", "نَب"] },
      { id: "nun_4", arabic: "عين", transliteration: "'ayn", english: "Eye", position: "final", syllables: ["عَيْن"] }
    ],
    phonemes: [
      { sound: "نَ", diacritic: "فتحة", example: "نَمر" },
      { sound: "نُ", diacritic: "ضمة", example: "نُجوم" },
      { sound: "نِ", diacritic: "كسرة", example: "نِسر" }
    ]
  },
  {
    id: 26, letter: "ه", name: "هاء",
    forms: { isolated: "ه", initial: "هـ", medial: "ـهـ", final: "ـه" },
    words: [
      { id: "haa_end_1", arabic: "هدهد", transliteration: "hudhud", english: "Hoopoe", position: "initial", syllables: ["هُدْ", "هُد"] },
      { id: "haa_end_2", arabic: "هلال", transliteration: "hilal", english: "Crescent", position: "initial", syllables: ["هِ", "لَال"] },
      { id: "haa_end_3", arabic: "فهد", transliteration: "fahd", english: "Leopard", position: "medial", syllables: ["فَهْد"] },
      { id: "haa_end_4", arabic: "وجه", transliteration: "wajh", english: "Face", position: "final", syllables: ["وَجْه"] }
    ],
    phonemes: [
      { sound: "هَ", diacritic: "فتحة", example: "هَرم" },
      { sound: "هُ", diacritic: "ضمة", example: "هُدهد" },
      { sound: "هِ", diacritic: "كسرة", example: "هِلال" }
    ]
  },
  {
    id: 27, letter: "و", name: "واو",
    forms: { isolated: "و", initial: "و", medial: "ـو", final: "ـو" },
    words: [
      { id: "waw_1", arabic: "وردة", transliteration: "warda", english: "Rose", position: "initial", syllables: ["وَرْ", "دَة"] },
      { id: "waw_2", arabic: "وسادة", transliteration: "wisada", english: "Pillow", position: "initial", syllables: ["وِ", "سَا", "دَة"] },
      { id: "waw_3", arabic: "طيور", transliteration: "tuyur", english: "Birds", position: "medial", syllables: ["طُ", "يُور"] },
      { id: "waw_4", arabic: "جرو", transliteration: "jarw", english: "Puppy", position: "final", syllables: ["جَرْو"] }
    ],
    phonemes: [
      { sound: "وَ", diacritic: "فتحة", example: "وَرقة" },
      { sound: "وُ", diacritic: "ضمة", example: "وُجوه" },
      { sound: "وِ", diacritic: "كسرة", example: "وِسادة" }
    ]
  },
  {
    id: 28, letter: "ي", name: "ياء",
    forms: { isolated: "ي", initial: "يـ", medial: "ـيـ", final: "ـي" },
    words: [
      { id: "yaa_1", arabic: "يد", transliteration: "yad", english: "Hand", position: "initial", syllables: ["يَد"] },
      { id: "yaa_2", arabic: "يقطين", transliteration: "yaqtin", english: "Pumpkin", position: "initial", syllables: ["يَقْ", "طِين"] },
      { id: "yaa_3", arabic: "سيارة", transliteration: "sayyara", english: "Car", position: "medial", syllables: ["سَيّ", "يَا", "رَة"] },
      { id: "yaa_4", arabic: "كرسي", transliteration: "kursi", english: "Chair", position: "final", syllables: ["كُرْ", "سِي"] }
    ],
    phonemes: [
      { sound: "يَ", diacritic: "فتحة", example: "يَد" },
      { sound: "يُ", diacritic: "ضمة", example: "يُوسفي" },
      { sound: "يِ", diacritic: "كسرة", example: "يِ" } // rare in initial
    ]
  }
];

lettersData.forEach(data => {
  // Fill in the rest of the generic fields based on alif/baa structure
  const baseLetterEng = data.words[0].id.split('_')[0];
  
  data.activities = [
    {type: "trace", name: "تتبع الحرف", config: {difficulty: "guided"}},
    {type: "phonics_wheel", name: "عجلة الصوتيات", config: {diacritics: ["fatha", "damma", "kasra"]}},
    {type: "match", name: "مطابقة الحرف بالصورة", config: {type: "letter_image"}},
    {type: "find", name: "ابحث عن الحرف", config: {gridSize: 12}}
  ];
  data.reviewGame = {type: "bingo", name: "بنغو الحروف", config: {letters: ["أ", "ب", "ت", "ث", "ج", "ح", "خ"]}};
  data.montessoriTip = `دع الطفل يمسح حرف '${data.letter}' بإصبعه على ورقة صنفرة ويقول: '${data.letter} ${data.letter} ${data.letter}... ${data.words[0].arabic}' - يربط الحرف بالصوت والصورة الحقيقية.`;
  
  data.audioUrls = {
    letter: `/audio/letters/${baseLetterEng}.mp3`,
    words: data.words.map(w => `/audio/words/${w.transliteration}.mp3`),
    encouragement: "/audio/encouragement/mashallah.mp3"
  };

  const filename = `${String(data.id).padStart(2, '0')}-${baseLetterEng}.json`;
  fs.writeFileSync(path.join(dir, filename), JSON.stringify(data, null, 2), 'utf8');
  console.log(`Generated: ${filename}`);
});
