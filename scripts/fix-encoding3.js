const fs = require('fs');
const path = require('path');

const dir = 'D:/pro/produit nemerotique/n/hurofi/src/content/letters';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let fixed = 0;
let failed = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  
  try {
    // Read raw bytes
    const rawBuf = fs.readFileSync(filePath);
    
    // Strategy 1: Try reading as UTF-8 directly
    let content = rawBuf.toString('utf8');
    content = content.replace(/^\uFEFF/, ''); // strip BOM
    
    // Remove control characters from strings (except normal whitespace)
    content = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
    
    try {
      const parsed = JSON.parse(content);
      fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
      console.log('FIXED (utf8): ' + file);
      fixed++;
      continue;
    } catch(e) {}
    
    // Strategy 2: Double-decode: read as latin1 -> utf8 -> strip control chars
    let content2 = Buffer.from(rawBuf, 'latin1').toString('utf8');
    content2 = content2.replace(/^\uFEFF/, '');
    content2 = content2.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
    
    try {
      const parsed = JSON.parse(content2);
      fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
      console.log('FIXED (double-decode): ' + file);
      fixed++;
      continue;
    } catch(e) {}
    
    console.log('FAILED: ' + file);
    failed++;
  } catch(e) {
    console.log('ERROR: ' + file + ' - ' + e.message.substring(0, 80));
    failed++;
  }
}

console.log('\nFixed: ' + fixed + ', Failed: ' + failed);
