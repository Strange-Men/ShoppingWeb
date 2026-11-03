import { isPreview, site } from '../data/site';
import { publicOrigin } from '../lib/inquiry';
export function GET() {
  const origin = publicOrigin(site.canonicalOrigin);
  return new Response(`User-agent: *\nAllow: /\n${!isPreview && origin ? `Sitemap: ${origin}/sitemap.xml\n` : '# Preview HTML declares noindex; no production sitemap is emitted.\n'}`, {headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
