const fs = require('fs');
const path = require('path');

const dir = 'D:/pro/produit nemerotique/n/hurofi/src/content/letters';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let fixed = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  const rawBuf = fs.readFileSync(filePath);

  let str;

  // Check if it starts with BOM
  if (rawBuf[0] === 0xEF && rawBuf[1] === 0xBB && rawBuf[2] === 0xBF) {
    str = rawBuf.slice(3).toString('utf8');
  } else {
    str = rawBuf.toString('utf8');
  }

  // If mojibake detected, try latin1 -> utf8 conversion
  if (str.includes('Ø') || str.includes('Ù')) {
    str = Buffer.from(rawBuf, 'latin1').toString('utf8');
    str = str.replace(/^\uFEFF/, '');
  }

  try {
    const parsed = JSON.parse(str);
    fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
    console.log('FIXED: ' + file);
    fixed++;
  } catch(e) {
    console.log('STILL BROKEN: ' + file + ' - ' + e.message.substring(0, 100));
  }
}

console.log('\nFixed ' + fixed + ' files out of ' + files.length);
