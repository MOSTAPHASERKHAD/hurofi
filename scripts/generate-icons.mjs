import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'public/icons';
fs.mkdirSync(outDir, { recursive: true });

const svg = Buffer.from(`
  <svg width="512" height="512" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1A3A50" />
        <stop offset="100%" style="stop-color:#5A0460" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="64" ry="64" fill="url(#bg)" />
    <text x="256" y="300" font-family="'Traditional Arabic','Arial',sans-serif"
          font-size="300" font-weight="bold" fill="#FFFFF0"
          text-anchor="middle" dominant-baseline="middle">
      ح
    </text>
  </svg>
`);

async function main() {
  await sharp(svg).resize(512, 512).png().toFile(path.join(outDir, 'icon-512.png'));
  await sharp(svg).resize(192, 192).png().toFile(path.join(outDir, 'icon-192.png'));
  await sharp(svg).resize(180, 180).png().toFile(path.join(outDir, 'apple-touch-icon.png'));
  console.log('Icons generated');
}

main().catch(console.error);
