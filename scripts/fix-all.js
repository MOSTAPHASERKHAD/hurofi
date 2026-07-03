const fs = require('fs');
const path = require('path');

const dir = 'D:/pro/produit nemerotique/n/hurofi/src/content/letters';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let fixedCount = 0;
let errorCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  
  try {
    const buf = fs.readFileSync(filePath);
    let str = buf.toString('utf8');
    
    // Check if it has mojibake (double-encoded)
    const hasMojibake = /[\u00C2\u00C3\u00D8\u00D9]/.test(str) && !/^[アイウエオ]/.test(str);
    
    if (hasMojibake) {
      // Fix double-encoding: charCode -> byte -> UTF-8 decode
      const fixedBuf = Buffer.alloc(str.length);
      for (let i = 0; i < str.length; i++) {
        fixedBuf[i] = str.charCodeAt(i) & 0xFF;
      }
      str = fixedBuf.toString('utf8');
    }
    
    // Strip control characters
    str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
    // Also strip replacement character
    str = str.replace(/\uFFFD/g, '');
    
    // Fix common UTF-8 corruption patterns
    // PowerShell ConvertTo-Json sometimes inserts \r\n as literal chars in strings
    str = str.replace(/\\r\\n/g, '\\n');
    
    const parsed = JSON.parse(str);
    
    // Write clean JSON
    fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
    console.log('FIXED: ' + file + ' - ' + parsed.letter + ' (' + parsed.name + ')');
    fixedCount++;
    
  } catch(e) {
    console.log('ERROR: ' + file + ' - ' + e.message.substring(0, 100));
    errorCount++;
  }
}

console.log('\nResult: Fixed ' + fixedCount + ', Errors ' + errorCount);
