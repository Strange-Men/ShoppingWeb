import { isPreview, site } from '../data/site';
import { publishedPaths } from '../lib/seo';
import { publicOrigin } from '../lib/inquiry';
export function getStaticPaths() { return !isPreview && publicOrigin(site.canonicalOrigin) ? [{params:{map:'sitemap'}}] : []; }
export function GET() { return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publishedPaths().map(path => `<url><loc>${new URL(path, site.canonicalOrigin).href}</loc></url>`).join('')}</urlset>`, {headers:{'Content-Type':'application/xml'}}); }
