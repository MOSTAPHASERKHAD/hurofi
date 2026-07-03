const fs = require('fs');
const path = require('path');

// Correct letter names mapping
const letterNames = {
  1: { letter: "أ", name: "ألف" },
  2: { letter: "ب", name: "باء" },
  3: { letter: "ت", name: "تاء" },
  4: { letter: "ث", name: "ثاء" },
  5: { letter: "ج", name: "جيم" },
  6: { letter: "ح", name: "حاء" },
  7: { letter: "خ", name: "خاء" },
  8: { letter: "د", name: "دال" },
  9: { letter: "ذ", name: "ذال" },
  10: { letter: "ر", name: "راء" },
  11: { letter: "ز", name: "زاي" },
  12: { letter: "س", name: "سين" },
  13: { letter: "ش", name: "شين" },
  14: { letter: "ص", name: "صاد" },
  15: { letter: "ض", name: "ضاد" },
  16: { letter: "ط", name: "طاء" },
  17: { letter: "ظ", name: "ظاء" },
  18: { letter: "ع", name: "عين" },
  19: { letter: "غ", name: "غين" },
  20: { letter: "ف", name: "فاء" },
  21: { letter: "ق", name: "قاف" },
  22: { letter: "ك", name: "كاف" },
  23: { letter: "ل", name: "لام" },
  24: { letter: "م", name: "ميم" },
  25: { letter: "ن", name: "نون" },
  26: { letter: "ه", name: "هاء" },
  27: { letter: "و", name: "واو" },
  28: { letter: "ي", name: "ياء" }
};

const dir = 'D:/pro/produit nemerotique/n/hurofi/src/content/letters';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let fixed = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  
  try {
    const buf = fs.readFileSync(filePath);
    let str = buf.toString('utf8');
    
    // Fix double-encoding
    const fixedBuf = Buffer.alloc(str.length);
    for (let i = 0; i < str.length; i++) {
      fixedBuf[i] = str.charCodeAt(i) & 0xFF;
    }
    str = fixedBuf.toString('utf8');
    
    // Strip control chars and replacement chars
    str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\uFFFD]/g, '');
    
    const parsed = JSON.parse(str);
    const id = parsed.id;
    
    // Fix letter and name
    if (letterNames[id]) {
      parsed.letter = letterNames[id].letter;
      parsed.name = letterNames[id].name;
    }
    
    // Fix phoneme examples that may have corrupted names
    if (parsed.phonemes) {
      for (const ph of parsed.phonemes) {
        if (ph.example) {
          // Remove any corruption artifacts
          ph.example = ph.example.replace(/[`&\uFFFD]/g, '');
        }
      }
    }
    
    // Fix words - verify first word starts with the letter
    if (parsed.words && parsed.words.length > 0) {
      for (const word of parsed.words) {
        if (word.arabic) {
          word.arabic = word.arabic.replace(/[`&\uFFFD]/g, '');
        }
      }
    }
    
    fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
    console.log('FIXED: ' + file + ' - ' + parsed.letter + ' (' + parsed.name + ')');
    fixed++;
    
  } catch(e) {
    console.log('ERROR: ' + file + ' - ' + e.message.substring(0, 100));
  }
}

console.log('\nFixed ' + fixed + ' files');
