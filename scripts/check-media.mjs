import { readFile, readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const origin=process.argv[2] || 'http://127.0.0.1:4321';
const records=JSON.parse(await readFile('src/data/photography.json','utf8'));
const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const variants=[];
for(const record of records) {
  for(const width of [...new Set([480,800,1200,1600].map(value=>Math.min(value,record.width)))]) {
    const source=`/media/${record.id}-${width}.webp`;
    const meta=await sharp(path.join('dist',source)).metadata();
    if(meta.width!==width || !meta.height || meta.format!=='webp') throw new Error(`Invalid derivative: ${source}`);
    variants.push({source,width,height:meta.height,bytes:(await stat(path.join('dist',source))).size});
  }
}
const pages=[];
for(const route of ['/en/','/en/about/','/en/products/','/en/products/fiberglass/','/en/products/stainless-steel/']) {
  const html=await readFile(path.join('dist',route,'index.html'),'utf8');
  const normal=html.replace(/<dialog\b[\s\S]*?<\/dialog>/g,'');
  const sources=[...new Set([...normal.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match=>match[1]))];
  const imageBytes=(await Promise.all(sources.map(source=>stat(path.join('dist',source))))).reduce((sum,item)=>sum+item.size,0);
  if(route==='/en/' && imageBytes>2*1024*1024) throw new Error('Homepage image upper bound exceeds 2MB');
  pages.push({route,uniqueImages:sources.length,largestFallbackImageBytes:imageBytes,htmlBytes:Buffer.byteLength(html)});
}
const requests=[];
for(const source of ['/en/',...variants.map(item=>item.source)]) {
  const start=performance.now();const response=await fetch(new URL(source,origin),{signal:AbortSignal.timeout(10000)});const bytes=(await response.arrayBuffer()).byteLength;
  if(response.status!==200)throw new Error(`Image or page HTTP failure: ${source}`);
  requests.push({source,status:response.status,bytes,elapsedMs:Number((performance.now()-start).toFixed(2))});
}
const times=requests.map(item=>item.elapsedMs).sort((a,b)=>a-b);
const staticFiles=await readdir('dist/_astro');
const cssBytes=(await Promise.all(staticFiles.filter(name=>name.endsWith('.css')).map(name=>stat(path.join('dist/_astro',name))))).reduce((sum,item)=>sum+item.size,0);
const fontWoff2Bytes=(await Promise.all(staticFiles.filter(name=>name.endsWith('.woff2')).map(name=>stat(path.join('dist/_astro',name))))).reduce((sum,item)=>sum+item.size,0);
const report={date,timezone:'Asia/Shanghai',environment:'Local loopback HTTP; unthrottled Windows; no overseas or field CWV claim',reviewedMasters:records.length,derivatives:variants.length,largestDerivativeBytes:Math.max(...variants.map(item=>item.bytes)),cssBytes,fontWoff2Bytes,pages,localResponseMedianMs:times[Math.floor(times.length/2)],localResponseMaxMs:Math.max(...times),variants,requests};
await mkdir('docs/qa/2026-11-05',{recursive:true});await writeFile('docs/qa/2026-11-05/media-report.json',JSON.stringify(report,null,2)+'\n');
console.log(`PASS media: ${records.length} masters, ${variants.length} WebP derivatives, ${requests.length} HTTP 200 responses. Homepage largest-fallback images ${pages[0].largestFallbackImageBytes}B. Local median ${report.localResponseMedianMs}ms; not overseas performance.`);
