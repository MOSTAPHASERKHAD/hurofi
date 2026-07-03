const fs = require('fs');
const path = require('path');

const dir = 'D:/pro/produit nemerotique/n/hurofi/src/content/letters';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let fixed = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file has double-encoded Arabic (mojibake)
  // Pattern: characters like Ø, Ù, §, ¡ etc. which are Latin-1 chars
  // that represent broken UTF-8 sequences
  if (/[ØÙ§¡]/.test(raw)) {
    // The UTF-8 text was first interpreted as Windows-1252, then encoded back to UTF-8
    // To fix: encode the string as Windows-1252 bytes, then decode as UTF-8
    const buf = Buffer.from(raw, 'latin1');
    const fixed = buf.toString('utf8');
    
    try {
      JSON.parse(fixed); // validate
      fs.writeFileSync(filePath, JSON.stringify(JSON.parse(fixed), null, 2), 'utf8');
      console.log('FIXED double-encode: ' + file);
    } catch(e) {
      console.log('STILL BROKEN: ' + file + ' - ' + e.message.substring(0, 80));
    }
  } else {
    // File looks OK, just validate
    try {
      JSON.parse(raw);
      console.log('OK: ' + file);
    } catch(e) {
      console.log('PARSE ERROR: ' + file);
    }
  }
}
