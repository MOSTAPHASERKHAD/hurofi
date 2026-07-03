const fs = require('fs');
const path = require('path');

const dir = 'D:/pro/produit nemerotique/n/hurofi/src/content/letters';

const letters = [
  {
    id: 1, letter: "أ", name: "ألف",
    phonemes: [
      {sound: "أَ", diacritic: "فتحة", example: "أَسد"},
      {sound: "أُ", diacritic: "ضمة", example: "أُرنب"},
      {sound: "إِ", diacritic: "كسرة", example: "إِسمع"},
      {sound: "آ", diacritic: "مدة", example: "آذان"}
    ],
    forms: {isolated: "أ", initial: "أ", medial: "ـأ", final: "ـأ"},
    words: [
      {id: "alif_2", arabic: "أسد", transliteration: "asad", english: "Lion", position: "initial", syllables: ["أَ", "سَد"]},
      {id: "alif_5", arabic: "أرنب", transliteration: "arnab", english: "Rabbit", position: "initial", syllables: ["أَرْ", "نَب"]},
      {id: "alif_1", arabic: "أب", transliteration: "ab", english: "Father", position: "isolated", syllables: ["أَب"]},
      {id: "alif_3", arabic: "سأَلَ", transliteration: "sa'ala", english: "He asked", position: "medial", syllables: ["سَأَ", "لَ"]},
      {id: "alif_4", arabic: "قرأ", transliteration: "qara'a", english: "He read", position: "final", syllables: ["قَرَأ"]}
    ],
    activities: [
      {type: "trace", name: "تتبع الحرف", config: {difficulty: "guided"}},
      {type: "phonics_wheel", name: "عجلة الصوتيات", config: {diacritics: ["fatha", "damma", "kasra", "madda"]}},
      {type: "match", name: "مطابقة الحرف بالصورة", config: {type: "letter_image"}},
      {type: "find", name: "ابحث عن الحرف", config: {gridSize: 12}}
    ],
    reviewGame: {type: "bingo", name: "بنغو الحروف", config: {letters: ["أ", "ب", "ت", "ث", "ج", "ح", "خ"]}},
    montessoriTip: "دع الطفل يمسح حرف 'أ' بإصبعه على ورقة صنفرة ويقول: 'أأأ... أسد' - يربط الحرف بالصوت والصورة الحقيقية.",
    audioUrls: {
      letter: "/audio/letters/alif.mp3",
      words: ["/audio/words/asad.mp3", "/audio/words/arnab.mp3", "/audio/words/ab.mp3", "/audio/words/sa'ala.mp3", "/audio/words/qara'a.mp3"],
      encouragement: "/audio/encouragement/mashallah.mp3"
    }
  },
  {
    id: 2, letter: "ب", name: "باء",
    phonemes: [
      {sound: "بَ", diacritic: "فتحة", example: "بَاب"},
      {sound: "بُ", diacritic: "ضمة", example: "بُطة"},
      {sound: "بِ", diacritic: "كسرة", example: "بِت"}
    ],
    forms: {isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب"},
    words: [
      {id: "baa_1", arabic: "باب", transliteration: "bab", english: "Door", position: "initial", syllables: ["بَ", "ا", "ب"]},
      {id: "baa_5", arabic: "بَحْر", transliteration: "bahr", english: "Sea", position: "initial", syllables: ["بَحْ", "ر"]},
      {id: "baa_4", arabic: "بَطَّة", transliteration: "batta", english: "Duck", position: "initial", syllables: ["بَطَّ", "ة"]},
      {id: "baa_iso", arabic: "أب", transliteration: "ab", english: "Father", position: "isolated", syllables: ["أَب"]},
      {id: "baa_2", arabic: "كَبَرَ", transliteration: "kabara", english: "He grew", position: "medial", syllables: ["كَ", "بَ", "رَ"]},
      {id: "baa_3", arabic: "كِتَاب", transliteration: "kitaab", english: "Book", position: "final", syllables: ["كِ", "تَا", "ب"]}
    ],
    activities: [
      {type: "trace", name: "تتبع الحرف", config: {difficulty: "guided"}},
      {type: "phonics_wheel", name: "عجلة الصوتيات", config: {diacritics: ["fatha", "damma", "kasra"]}},
      {type: "match", name: "مطابقة الحرف بالصورة", config: {type: "letter_image"}},
      {type: "find", name: "ابحث عن الحرف", config: {gridSize: 12}}
    ],
    reviewGame: {type: "bingo", name: "بنغو الحروف", config: {letters: ["أ", "ب", "ت", "ث", "ج", "ح", "خ"]}},
    montessoriTip: "استخدم قطعة خشب بحرف الباء ودع الطفل يلمسها ويقول 'ببب... باب'. يمكن أيضاً استخدام حبوب العدس لترتيبها على شكل باء.",
    audioUrls: {
      letter: "/audio/letters/baa.mp3",
      words: ["/audio/words/bab.mp3", "/audio/words/bahr.mp3", "/audio/words/batta.mp3", "/audio/words/ab.mp3", "/audio/words/kabara.mp3", "/audio/words/kitaab.mp3"],
      encouragement: "/audio/encouragement/mashallah.mp3"
    }
  }
];

// For remaining letters (3-28), read and fix
for (let id = 3; id <= 28; id++) {
  const padded = String(id).padStart(2, '0');
  const files = fs.readdirSync(dir).filter(f => f.startsWith(padded));
  if (files.length === 0) continue;
  
  const filePath = path.join(dir, files[0]);
  const buf = fs.readFileSync(filePath);
  let str = buf.toString('utf8');
  
  // Fix double-encoding
  const fixedBuf = Buffer.alloc(str.length);
  for (let i = 0; i < str.length; i++) {
    fixedBuf[i] = str.charCodeAt(i) & 0xFF;
  }
  str = fixedBuf.toString('utf8');
  str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\uFFFD]/g, '');
  
  try {
    const parsed = JSON.parse(str);
    // Fix letter and name
    const nameMap = {
      3: {letter: "ت", name: "تاء"}, 4: {letter: "ث", name: "ثاء"},
      5: {letter: "ج", name: "جيم"}, 6: {letter: "ح", name: "حاء"},
      7: {letter: "خ", name: "خاء"}, 8: {letter: "د", name: "دال"},
      9: {letter: "ذ", name: "ذال"}, 10: {letter: "ر", name: "راء"},
      11: {letter: "ز", name: "زاي"}, 12: {letter: "س", name: "سين"},
      13: {letter: "ش", name: "شين"}, 14: {letter: "ص", name: "صاد"},
      15: {letter: "ض", name: "ضاد"}, 16: {letter: "ط", name: "طاء"},
      17: {letter: "ظ", name: "ظاء"}, 18: {letter: "ع", name: "عين"},
      19: {letter: "غ", name: "غين"}, 20: {letter: "ف", name: "فاء"},
      21: {letter: "ق", name: "قاف"}, 22: {letter: "ك", name: "كاف"},
      23: {letter: "ل", name: "لام"}, 24: {letter: "م", name: "ميم"},
      25: {letter: "ن", name: "نون"}, 26: {letter: "ه", name: "هاء"},
      27: {letter: "و", name: "واو"}, 28: {letter: "ي", name: "ياء"}
    };
    
    if (nameMap[id]) {
      parsed.letter = nameMap[id].letter;
      parsed.name = nameMap[id].name;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
  } catch(e) {
    console.log('Parse error: ' + files[0] + ' - ' + e.message.substring(0, 80));
  }
}

// Write the two clean files
for (const data of letters) {
  const padded = String(data.id).padStart(2, '0');
  const files = fs.readdirSync(dir).filter(f => f.startsWith(padded));
  if (files.length > 0) {
    fs.writeFileSync(path.join(dir, files[0]), JSON.stringify(data, null, 2), 'utf8');
    console.log('Written: ' + files[0]);
  }
}

console.log('Done!');
