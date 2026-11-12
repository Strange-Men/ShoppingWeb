import { readFile, mkdir, access, readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
const root = fileURLToPath(new URL('../',import.meta.url));
const manifest = JSON.parse(await readFile(path.join(root,'src/data/photography.json'),'utf8'));
const masters = path.join(root,'src/assets/photos');
const masterIds = new Set((await readdir(masters)).filter(name => name.endsWith('.webp')).map(name => path.parse(name).name));
const output = path.join(root,'public/media');
await mkdir(output,{recursive:true});
let count=0;
const expected = new Set();
for (const item of manifest) {
  const input=path.join(masters,`${item.id}.webp`);
  const metadata=await sharp(input).metadata();
  if(metadata.width!==item.width || metadata.height!==item.height) throw new Error(`Photo dimensions do not match manifest: ${item.id}`);
  const widths=[...new Set([480,800,1200,1600].map(width=>Math.min(width,item.width)))];
  for(const width of widths) {
    const dest=path.join(output,`${item.id}-${width}.webp`);
    expected.add(path.basename(dest));
    await sharp(input).rotate().resize({width,withoutEnlargement:true}).webp({quality:item.id==='hero-waterfront'?82:80,effort:5}).toFile(dest);
    await access(dest);count++;
  }
}
// Remove obsolete generated variants, including variants of retired masters.
for(const name of await readdir(output)) {
  const match = name.match(/^([a-z0-9-]+)-\d+\.webp$/);
  if (!match || !masterIds.has(match[1]) || expected.has(name)) continue;
  const obsolete=path.resolve(output,name);
  if(!obsolete.startsWith(path.resolve(output)+path.sep)) throw new Error('Generated media path escaped output directory');
  await unlink(obsolete);
}
console.log(`Prepared ${count} responsive WebP files from ${manifest.length} reviewed masters. Original Alan files are unchanged.`);
