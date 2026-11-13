import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const source = fileURLToPath(new URL('src/assets/brand/nanxuan-mark.svg', root));
const output = fileURLToPath(new URL('public/brand/', root));
await mkdir(output, { recursive: true });
const mark = await sharp(source).trim().png().toBuffer();
for (const width of [128, 256]) {
  await sharp(mark).resize({ width }).webp({ quality: 95, alphaQuality: 100 }).toFile(`${output}/nx-mark-${width}.webp`);
}
await sharp(mark).png({ compressionLevel: 9 }).toFile(`${output}/nx-mark.png`);
for (const size of [32, 192, 180]) {
  const inset = size === 32 ? 2 : Math.round(size * 0.12);
  const symbol = await sharp(mark).resize({ width: size - inset * 2, height: size - inset * 2, fit: 'inside' }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#1a1a2e' } })
    .composite([{ input: symbol, gravity: 'centre' }]).png().toFile(`${output}/nanxuan-${size === 180 ? 'apple-touch-icon' : `favicon-${size}`}.png`);
}
console.log('Prepared NanXuan NX mark, responsive UI assets and browser/touch icons.');
