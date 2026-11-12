import { readFile, readdir, access, mkdir, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isPreview, site } from '../src/data/site.ts';
const root = fileURLToPath(new URL('../',import.meta.url));
const dist = path.join(root,'dist');
const files = [];
async function walk(dir) { for (const entry of await readdir(dir,{withFileTypes:true})) { const full=path.join(dir,entry.name); if(entry.isDirectory()) await walk(full); else files.push(full); } }
await walk(dist);
const errors = [], titles = new Set(), descriptions = new Set();
let links=0, scriptBytes=0, scriptGzipBytes=0, maxInlineScriptBytes=0, maxInlineScriptGzipBytes=0;
for (const file of files.filter(file=>file.endsWith('.js'))) { const data=await readFile(file); scriptBytes+=data.length; scriptGzipBytes+=gzipSync(data).length; }
for (const file of files.filter(file=>file.endsWith('.html'))) {
  const html=await readFile(file,'utf8'); const rel=path.relative(dist,file);
  if (/\bAI[\s-]+generated\b|\/media\/concept-/i.test(html)) errors.push(`Archived design concept leaked into public HTML: ${rel}`);
  if (rel.replaceAll('\\','/') === 'en/index.html') {
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
    const images = [...main.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]);
    if (images.length !== new Set(images).size) errors.push('Homepage repeats a product image.');
  }
  const inlineScripts=[...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(match=>match[1]).join('\n');
  maxInlineScriptBytes=Math.max(maxInlineScriptBytes,Buffer.byteLength(inlineScripts));
  maxInlineScriptGzipBytes=Math.max(maxInlineScriptGzipBytes,inlineScripts ? gzipSync(inlineScripts).length : 0);
  const title=html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  const description=html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1];
  if(!title || titles.has(title)) errors.push(`Missing/duplicate title: ${rel}`); titles.add(title);
  if(!description || descriptions.has(description)) errors.push(`Missing/duplicate description: ${rel}`); descriptions.add(description);
  if((html.match(/<h1(?:\s|>)/g)||[]).length!==1) errors.push(`Expected one H1: ${rel}`);
  if(!html.includes('lang="en"')) errors.push(`English lang missing: ${rel}`);
  if(isPreview && !html.includes('content="noindex, nofollow"')) errors.push(`Preview noindex missing: ${rel}`);
  if(isPreview && /rel="canonical"|hreflang=/.test(html)) errors.push(`Preview must not emit production SEO links: ${rel}`);
  if(/tongmeisculpture\.com|<form|href="#"|src="https?:\/\//i.test(html)) errors.push(`Forbidden external media/form/fake link: ${rel}`);
  for (const match of html.matchAll(/<(?:a|link|script|img)\b[^>]*?(?:href|src)="([^"]+)"/g)) {
    const href=match[1].replaceAll('&amp;','&');
    if(/^(https?:|mailto:|tel:|data:)/i.test(href)) continue;
    const [route,hash]=href.split('#');
    let target = route ? route.startsWith('/') ? path.join(dist,decodeURIComponent(route)) : path.resolve(path.dirname(file),decodeURIComponent(route)) : file;
    if(route?.endsWith('/')) target=path.join(target,'index.html');
    if(path.relative(dist,target).startsWith('..')) {errors.push(`Escaping link: ${rel} -> ${href}`); continue;}
    try { await access(target); links++; if(hash && target.endsWith('.html')) {const targetHtml=target===file?html:await readFile(target,'utf8'); if(!targetHtml.includes(`id="${hash}"`)) errors.push(`Missing fragment: ${rel} -> ${href}`);} } catch {errors.push(`Broken generated link: ${rel} -> ${href}`);}
  }
  for(const match of html.matchAll(/<img\b[^>]*>/g)) if(!/\balt="[^"]*"/.test(match[0]) || !/\bwidth="\d+"/.test(match[0]) || !/\bheight="\d+"/.test(match[0])) errors.push(`Image dimensions/alt missing: ${rel}`);
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const entry of match[1].split(',')) {
      const source=entry.trim().split(/\s+/)[0];
      if(!/^\/(?:media|brand)\/[a-zA-Z0-9/_-]+\.(?:webp|png|jpg|jpeg|avif)$/.test(source)) {errors.push(`Unexpected responsive image source: ${rel}`);continue;}
      try {await access(path.join(dist,source));links++;}catch{errors.push(`Missing srcset image: ${rel} -> ${source}`);}
    }
  }
}
if(scriptGzipBytes+maxInlineScriptGzipBytes>50*1024) errors.push('Combined compressed JavaScript exceeds 50KB.');
if(isPreview && files.some(file=>/sitemap.*\.xml$/.test(file))) errors.push('Preview must not emit sitemap.');
if(!isPreview && (!site.canonicalOrigin || !files.includes(path.join(dist,'sitemap.xml')))) errors.push('Production sitemap/origin missing.');
const report={date:new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),timezone:'Asia/Shanghai',mode:isPreview?'preview':'production',node:process.version,htmlPages:files.filter(file=>file.endsWith('.html')).length,checkedLocalLinks:links,externalScriptBytes:scriptBytes,externalScriptGzipBytes:scriptGzipBytes,maxInlineScriptBytes,maxInlineScriptGzipBytes,noindex:isPreview?'all HTML checked':'not applicable',previewSitemap:isPreview?'absent':'not applicable',errors};
if(errors.length) {errors.forEach(error=>console.error(error)); process.exitCode=1;}
else { await mkdir(path.join(root,'docs/qa'),{recursive:true}); await writeFile(path.join(root,'docs/qa/build-report.json'),JSON.stringify(report,null,2)+'\n'); console.log(`PASS static output: ${report.htmlPages} HTML pages, ${links} local links/resources, unique metadata, single H1, preview SEO, ${scriptGzipBytes+maxInlineScriptGzipBytes}B gzip JS per page (inline included). Image decoding/loading require check:media; overseas performance not measured.`); }
