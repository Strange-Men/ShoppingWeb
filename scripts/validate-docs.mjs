import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  'README.md', 'CHANGELOG.md', 'docs/README.md', 'docs/PRD.md', 'docs/ARCHITECTURE.md',
  'docs/I18N_SEO.md', 'docs/CONTENT_ASSETS.md', 'docs/DEPLOYMENT_COST.md',
  'docs/ACCEPTANCE.md', 'docs/DECISIONS.md', 'docs/GOVERNANCE.md', 'docs/PLAN.md',
  'docs/adr/0001-static-site.md', 'docs/research/REFERENCE_ANALYSIS.md',
  'docs/research/SOURCES.md', 'docs/research/reference-evidence.json', 'docs/DEVELOPMENT_HANDOFF.md',
  'docs/IMPLEMENTATION_STATUS.md', 'docs/qa/README.md', 'docs/THIRD_PARTY.md',
  'docs/IMAGE_ASSETS.md', 'docs/IMAGE_EDIT_PROMPTS.md', 'docs/qa/2026-11-05/README.md',
];
const errors = [];
for (const file of required) { try { await access(path.join(root, file)); } catch { errors.push(`Missing required file: ${file}`); } }
async function markdowns(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (['.git', '.research-cache', 'node_modules', 'dist', '.astro'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await markdowns(full));
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}
const files = await markdowns(root);
let linkCount = 0;
for (const file of files) {
  const content = await readFile(file, 'utf8');
  if (!content.startsWith('# ')) errors.push(`Missing main title: ${path.relative(root, file)}`);
  if (content.includes('\uFFFD')) errors.push(`Invalid decoding marker: ${path.relative(root, file)}`);
  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1].replace(/^<|>$/g, '');
    if (/^(https?:|mailto:|tel:|#)/i.test(target)) continue;
    const dest = decodeURIComponent(target.split('#')[0]);
    if (!dest) continue;
    const resolved = path.resolve(path.dirname(file), dest);
    if (path.relative(root, resolved).startsWith('..')) { errors.push(`Link escapes project: ${target}`); continue; }
    linkCount++;
    try { await access(resolved); } catch { errors.push(`Broken link: ${path.relative(root, file)} -> ${target}`); }
  }
}
const prd = await readFile(path.join(root, 'docs/PRD.md'), 'utf8');
const acceptance = await readFile(path.join(root, 'docs/ACCEPTANCE.md'), 'utf8');
const definitions = [...prd.matchAll(/^\| ((?:NFR|FR)-\d{3}) \|/gm)].map(m => m[1]);
const checks = [...acceptance.matchAll(/^\| ((?:NFR|FR)-\d{3}) \|/gm)].map(m => m[1]);
for (const [label, ids] of [['PRD', definitions], ['Acceptance', checks]]) {
  if (ids.length !== new Set(ids).size) errors.push(`Duplicate requirement row in ${label}`);
}
for (const id of definitions) if (!checks.includes(id)) errors.push(`No acceptance row: ${id}`);
for (const id of checks) if (!definitions.includes(id)) errors.push(`Undefined acceptance requirement: ${id}`);
if (definitions.length !== 18) errors.push(`Expected current baseline of 18 requirements, got ${definitions.length}; update validator deliberately when baseline changes`);
const evidence = JSON.parse(await readFile(path.join(root, 'docs/research/reference-evidence.json'), 'utf8'));
if (evidence.results.length !== 8) errors.push('Expected eight bounded reference resources');
for (const r of evidence.results) {
  if (r.error || r.status !== 200 || !/^[a-f0-9]{64}$/.test(r.sha256 || '')) errors.push(`Reference capture failed or incomplete: ${r.id}`);
}
const ignore = await readFile(path.join(root, '.gitignore'), 'utf8');
if (!ignore.includes('.research-cache/')) errors.push('Raw research cache must be gitignored');
if (errors.length) { errors.forEach(e => console.error(e)); process.exitCode = 1; }
else console.log(`PASS: ${files.length} Markdown files, ${linkCount} local links, ${definitions.length} requirements with matching acceptance rows, ${evidence.results.length} reference records. External links, browser behavior and product functionality not tested.`);
