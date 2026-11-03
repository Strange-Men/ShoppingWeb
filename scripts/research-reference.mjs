// Read-only public-resource reconnaissance. No login, form submission or private endpoint access.
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://tongmeisculpture.com';
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const cache = path.join(root, '.research-cache', date);
await mkdir(cache, { recursive: true });
const strip = s => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const attrs = s => Object.fromEntries([...s.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(m => [m[1], m[3].replaceAll('&#038;', '&').replaceAll('&amp;', '&')]));
const resources = [
  ['home', '/'], ['about', '/about-us/'], ['products', '/products/'],
  ['product-detail', '/products/weather-resistant-stainless-steel-sculpture-for-urban-landscape/'],
  ['contact', '/contact-us/'], ['blog', '/blog/'],
  ['theme-css', '/wp-content/themes/tongmei-child/style.css?ver=1.0.1'],
  ['translation-js', '/wp-content/plugins/gtranslate/js/dropdown.js?ver=5.0.1'],
];
const results = [];
for (const [id, resource] of resources) {
  const url = origin + resource;
  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'ShoppingWeb-public-reference-research/1.0' }, signal: AbortSignal.timeout(25000) });
    const body = await response.text();
    const rawFile = path.join(cache, `${id}.txt`);
    await writeFile(rawFile, body, 'utf8');
    const result = {
      id, requestedUrl: url, finalUrl: response.url, checkedAt: new Date().toISOString(),
      status: response.status, bytes: Buffer.byteLength(body), sha256: createHash('sha256').update(body).digest('hex'),
      headers: Object.fromEntries(['content-type', 'server', 'x-powered-by'].map(k => [k, response.headers.get(k)]).filter(([, v]) => v)),
    };
    if (id.endsWith('css')) {
      result.colors = [...new Set(body.match(/#[0-9a-fA-F]{3,8}\b/g))].slice(0, 35);
      result.fontFamilies = [...new Set([...body.matchAll(/font-family\s*:\s*([^;}]+)/g)].map(m => m[1].trim()))];
      result.mediaQueries = [...new Set([...body.matchAll(/@media\s*([^{}]+)/g)].map(m => m[1].trim()))];
    } else if (id.endsWith('js')) {
      // Markers only, not copied third-party source code.
      result.markers = ['translate.google.com', 'translate.googleapis.com', 'cdn.gtranslate.net', 'gtranslate', 'url_structure', 'googtrans', 'fetch(', 'createElement'].filter(s => body.includes(s));
      result.externalOrigins = [...new Set([...body.matchAll(/https?:\/\/[a-zA-Z0-9.-]+/g)].map(m => m[0]))].slice(0, 20);
    } else {
      const tags = [...body.matchAll(/<(?:script|link|meta)\b[^>]*>/gi)].map(m => attrs(m[0]));
      result.generators = tags.filter(a => a.name === 'generator').map(a => a.content);
      result.assetPaths = [...new Set(tags.map(a => a.src || a.href).filter(s => s && /wp-content|wp-includes|fonts\.googleapis/.test(s)))];
      result.canonical = tags.filter(a => a.rel === 'canonical').map(a => a.href);
      result.hreflang = tags.filter(a => a.hreflang).map(a => ({ language: a.hreflang, href: a.href }));
      result.h1Count = [...body.matchAll(/<h1\b/gi)].length;
      // Structural labels only; do not archive full marketing copy or contact details.
      result.sectionCount = [...body.matchAll(/<h2\b/gi)].length;
      result.pluginDirectories = [...new Set([...body.matchAll(/\/wp-content\/plugins\/([\w-]+)\//g)].map(m => m[1]))];
      result.themeDirectories = [...new Set([...body.matchAll(/\/wp-content\/themes\/([\w-]+)\//g)].map(m => m[1]))];
      result.translationConfigs = [...body.matchAll(/window\.gtranslateSettings\[[^\]]+\]\s*=\s*(\{[^;]+\})/g)].flatMap(m => { try { return [JSON.parse(m[1])]; } catch { return []; } });
      result.forms = [...body.matchAll(/<form\b[^>]*>/gi)].map(m => { const a = attrs(m[0]); return { id: a.id, method: a.method, action: a.action || '(not explicitly set)', class: a.class }; });
      result.externalContactTypes = [...new Set([...body.matchAll(/<a\b[^>]*>/gi)].flatMap(m => {
        const href = attrs(m[0]).href || '';
        return /^mailto:/i.test(href) ? ['email-link'] : /^tel:/i.test(href) ? ['telephone-link'] : /wa\.me|api\.whatsapp/.test(href) ? ['whatsapp'] : /facebook\.com/.test(href) ? ['facebook'] : /instagram\.com/.test(href) ? ['instagram'] : [];
      }))];
      result.inlineContactText = { hasEmailText: /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(strip(body.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ''))), hasContactFormDemoLabel: strip(body).includes('Contact Form Demo') };
      result.internalRoutes = [...new Set([...body.matchAll(/<a\b[^>]*>/gi)].map(m => attrs(m[0]).href).filter(Boolean).flatMap(href => { try { const u = new URL(href, origin); return u.origin === origin ? [u.pathname] : []; } catch { return []; } }))].slice(0, 60);
      result.inlineBehaviorMarkers = ['closeMenu()', 'toggleMenu()', 'position:fixed', 'position:sticky', 'setTimeout', 'pum_popups', 'fluentform', 'Swiper'].filter(s => body.includes(s));
    }
    results.push(result);
    console.log(`${id}: HTTP ${response.status}, ${result.bytes} bytes`);
  } catch (error) { results.push({ id, requestedUrl: url, error: error.message }); console.log(`${id}: ${error.message}`); }
}
await mkdir(path.join(root, 'docs', 'research'), { recursive: true });
await writeFile(path.join(root, 'docs', 'research', 'reference-evidence.json'), JSON.stringify({ researchDate: date, method: 'Public GET requests; static-response analysis only; no browser rendering or translation execution', cachePolicy: 'Raw responses are local ignored files; repository stores metadata only', results }, null, 2) + '\n');
