import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const origin = process.argv[2] || 'http://127.0.0.1:4321';
const routes=[];
async function walk(dir) { for(const entry of await readdir(dir,{withFileTypes:true})) {const file=path.join(dir,entry.name);if(entry.isDirectory()) await walk(file);else if(entry.name==='index.html') routes.push('/'+path.relative('dist',dir).replaceAll('\\','/')+(dir==='dist'?'':'/'));} }
await walk('dist');
const requests=[...routes.map(route=>({route,status:200})),...['/qa-missing-page/','/en/products/fiberglass/not-a-case/','/zh-hant/','/ar/','/sitemap.xml'].map(route=>({route,status:404}))];
const results=[];
for(const request of requests) {const response=await fetch(new URL(request.route,origin),{signal:AbortSignal.timeout(10000)});const body=await response.text();results.push({...request,actual:response.status,pass:response.status===request.status && (request.status!==200 || body.includes('noindex, nofollow'))});}
await mkdir('docs/qa',{recursive:true});
await writeFile('docs/qa/http-results.json',JSON.stringify({date:'2026-11-03',origin,results},null,2)+'\n');
if(results.some(result=>!result.pass)) {console.error(results.filter(result=>!result.pass));process.exitCode=1;}else console.log(`PASS HTTP: ${routes.length} page routes return 200/noindex; ${requests.length-routes.length} missing/unpublished routes return 404. Local preview only.`);
