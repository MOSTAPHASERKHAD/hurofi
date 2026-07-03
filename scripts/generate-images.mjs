import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const LETTERS = [
  { id: 1,  letter: 'أ', name: 'alif',   primary: '#E63946', light: '#FFE0E3', dark: '#B5202D' },
  { id: 2,  letter: 'ب', name: 'baa',    primary: '#E07B39', light: '#FFE8D0', dark: '#B85A1F' },
  { id: 3,  letter: 'ت', name: 'taa',    primary: '#C9952A', light: '#FFF5D4', dark: '#9E7318' },
  { id: 4,  letter: 'ث', name: 'thaa',   primary: '#1F8A7E', light: '#D0F5F0', dark: '#156B62' },
  { id: 5,  letter: 'ج', name: 'jeem',   primary: '#1A3A50', light: '#D0DDE3', dark: '#0F2636' },
  { id: 6,  letter: 'ح', name: 'haa',    primary: '#5A0460', light: '#E8D0ED', dark: '#3E0242' },
  { id: 7,  letter: 'خ', name: 'khaa',   primary: '#7A4F72', light: '#F0E4ED', dark: '#5C3855' },
  { id: 8,  letter: 'د', name: 'daal',   primary: '#142D47', light: '#CDD8E8', dark: '#0A1A2E' },
  { id: 9,  letter: 'ذ', name: 'dhal',   primary: '#2E6183', light: '#D4E5F0', dark: '#1D4663' },
  { id: 10, letter: 'ر', name: 'raa',    primary: '#5AABB0', light: '#E8F7F8', dark: '#3D8E94' },
  { id: 11, letter: 'ز', name: 'zay',    primary: '#D98B0A', light: '#FFEDCC', dark: '#A86C06' },
  { id: 12, letter: 'س', name: 'seen',   primary: '#05A37A', light: '#D4FAEA', dark: '#037D5C' },
  { id: 13, letter: 'ش', name: 'sheen',  primary: '#0D6E8D', light: '#CCE8F3', dark: '#085068' },
  { id: 14, letter: 'ص', name: 'saad',   primary: '#052D39', light: '#C4D5DC', dark: '#031C25' },
  { id: 15, letter: 'ض', name: 'daad',   primary: '#6A1FB0', light: '#E0CCFA', dark: '#4E158A' },
  { id: 16, letter: 'ط', name: 'taa_emph', primary: '#CC0058', light: '#FFD0E0', dark: '#990042' },
  { id: 17, letter: 'ظ', name: 'thaa_emph', primary: '#C94405', light: '#FFD9C4', dark: '#963304' },
  { id: 18, letter: 'ع', name: 'ain',    primary: '#2D9E52', light: '#DCFFE5', dark: '#1E7A3C' },
  { id: 19, letter: 'غ', name: 'ghain',  primary: '#8AAD1A', light: '#EEFFD4', dark: '#6A8513' },
  { id: 20, letter: 'ف', name: 'faa',    primary: '#D4705E', light: '#FFF0ED', dark: '#B05040' },
  { id: 21, letter: 'ق', name: 'qaaf',   primary: '#C4786E', light: '#FFF5F2', dark: '#A05548' },
  { id: 22, letter: 'ك', name: 'kaaf',   primary: '#A08882', light: '#FFFAF9', dark: '#7A6560' },
  { id: 23, letter: 'ل', name: 'laam',   primary: '#C4846E', light: '#FFF8F4', dark: '#A06050' },
  { id: 24, letter: 'م', name: 'meem',   primary: '#6E8C7E', light: '#F4F7F5', dark: '#4E6C5E' },
  { id: 25, letter: 'ن', name: 'nun',    primary: '#9E8E7E', light: '#FAF8F5', dark: '#7A6E5E' },
  { id: 26, letter: 'ه', name: 'haa_end', primary: '#CC7058', light: '#FFEEEA', dark: '#A85040' },
  { id: 27, letter: 'و', name: 'waw',    primary: '#C06068', light: '#FFDEDF', dark: '#984850' },
  { id: 28, letter: 'ي', name: 'yaa',    primary: '#8E5860', light: '#F0DDE1', dark: '#6E4048' },
];

async function generateImage(letterData) {
  const { id, letter, name, primary, light, dark } = letterData;
  const paddedId = String(id).padStart(2, '0');
  const outputPath = path.resolve(`public/images/letters/${paddedId}.jpg`);

  const size = 512;
  const half = size / 2;

  // SVG overlay with the letter - using system Arabic fonts
  const letterSvg = Buffer.from(`
    <svg width="${size}" height="${size}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${light}" />
          <stop offset="100%" style="stop-color:${light}" />
        </linearGradient>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${primary}20" />
          <stop offset="100%" style="stop-color:${dark}15" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="32" ry="32" fill="url(#bg)" />
      <rect x="8" y="8" width="${size-16}" height="${size-16}" rx="28" ry="28" fill="none" stroke="${primary}30" stroke-width="2" />
      <circle cx="${half}" cy="${half}" r="140" fill="url(#glow)" />
      <text x="${half}" y="${half + 50}" font-family="'Traditional Arabic','Arabic Typesetting','Arial',sans-serif" font-size="240" font-weight="bold" fill="${dark}" text-anchor="middle" dominant-baseline="middle">
        ${letter}
      </text>
    </svg>
  `);

  try {
    await sharp(letterSvg)
      .resize(size, size)
      .jpeg({ quality: 90 })
      .toFile(outputPath);
    console.log(`✓ ${paddedId}-${name}.jpg`);
  } catch (err) {
    console.error(`✗ ${paddedId}-${name}.jpg: ${err.message}`);
  }
}

async function main() {
  const outDir = path.resolve('public/images/letters');
  fs.mkdirSync(outDir, { recursive: true });

  for (const letter of LETTERS) {
    await generateImage(letter);
  }
  console.log('\nDone!');
}

main();