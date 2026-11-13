import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, media, materials, productCategories, isPreview } from '../src/data/site.ts';
import { cases, visibleCases, casePath } from '../src/data/cases.ts';
import { applicationImages, photoRecords, presentationImages, workshopPhotos } from '../src/data/photography.ts';
import { publicOrigin, inquiryLinks, socialUrl } from '../src/lib/inquiry.ts';
import zhPhotography from '../src/i18n/photography.zh-hant.json' with { type: 'json' };
const release = process.argv.includes('--production') || !isPreview;
const root = fileURLToPath(new URL('../', import.meta.url));
const errors = [];
const assert = (value, message) => { if (!value) errors.push(message); };
for (const { id } of photoRecords) {
  assert(typeof zhPhotography[id] === 'string' && zhPhotography[id].trim(), `Missing Traditional Chinese photo text: ${id}`);
}
assert(materials.length === 2 && materials.map(item => item.id).sort().join(',') === 'fiberglass,stainless-steel', 'Only two supported materials are allowed.');
assert(productCategories.length === 3 && productCategories.map(item => item.id).sort().join(',') === 'bottle-props,fiberglass,stainless-steel', 'Expected three product categories.');
for (const category of productCategories) {
  assert(presentationImages(category.id).length >= 15, `Expected at least 15 product photos: ${category.id}`);
}
assert(new Set(cases.map(item => item.id)).size === cases.length, 'Duplicate stable case ID.');
assert(new Set(cases.map(casePath)).size === cases.length, 'Duplicate English case path.');
for (const item of cases) {
  assert(/^[a-z0-9-]+$/.test(item.id) && /^[a-z0-9-]+$/.test(item.locales.en.slug), `Unsafe case identity: ${item.id}`);
  assert(materials.some(material => material.id === item.material), `Unsupported material: ${item.id}`);
  assert(['draft','preview','published'].includes(item.status), `Invalid status: ${item.id}`);
  const en = item.locales.en;
  assert(en.title && en.summary && en.body && en.seoDescription, `Incomplete English content: ${item.id}`);
  assert(item.images.length > 0, `Case must define an image slot: ${item.id}`);
  if (item.status === 'published') {
    assert(en.reviewStatus === 'approved', `Published English content needs approval: ${item.id}`);
    assert(item.images.every(image => image.source), `Published case missing photographs: ${item.id}`);
    assert(item.finish && item.application && item.customizationNotes && item.sizeNote, `Published case missing verified details: ${item.id}`);
    assert(!/preview|pending|to be added|unpublished/i.test([en.title,en.summary,en.body,en.seoDescription].join(' ')), `Placeholder text in published case: ${item.id}`);
  }
}
for (const [key, value] of Object.entries(site.contacts)) {
  if (!value) continue;
  if (key === 'whatsappDigits') assert(/^\d{8,15}$/.test(value), 'WhatsApp must be 8–15 digits, including country code.');
  if (key === 'email') assert(inquiryLinks(site.contacts,'').email, 'Email format is invalid.');
  if (key === 'facebookUrl') assert(socialUrl(value,'facebook'), 'Facebook must be an HTTPS account URL on facebook.com.');
  if (key === 'instagramUrl') assert(socialUrl(value,'instagram'), 'Instagram must be an HTTPS account URL on instagram.com.');
}
if (site.canonicalOrigin) assert(publicOrigin(site.canonicalOrigin), 'Canonical origin must be a public HTTPS origin, not localhost/example/test.');
const slots = [
  ...Object.entries(media),
  ...workshopPhotos().map(item => [item.id, item.image]),
  ...presentationImages().flatMap(item => [
    [`presentation/${item.id}`, item.image],
    ...applicationImages(item.id).map(image => [`application/${item.id}`, image]),
  ]),
  ...cases.flatMap(item => item.images.map((image,index) => [`${item.id}/${index}`,image])),
];
const productSources = photoRecords.filter(item => item.product && item.sourceSha256).map(item => item.sourceSha256);
assert(new Set(productSources).size === productSources.length, 'Duplicate source photo in product catalog.');
for (const item of photoRecords.filter(record => record.sceneFor)) {
  assert(photoRecords.some(record => record.id === item.sceneFor && record.product), `Unlinked application image: ${item.id}`);
}
for (const [id,image] of slots) {
  assert(image.width > 0 && image.height > 0 && image.alt.trim(), `Image needs dimensions and alt: ${id}`);
  if (image.source) {
    assert(/^\/media\/[a-zA-Z0-9/_-]+\.(jpg|jpeg|png|webp|avif)$/.test(image.source), `Use a local /media/ image path: ${id}`);
    assert(['owned','licensed'].includes(image.rights) && image.credit, `Image rights/source confirmation required: ${id}`);
    try { await access(path.join(root,'public',image.source)); } catch { errors.push(`Image file missing: ${id}`); }
    for (const variant of image.variants || []) {
      assert(variant.width > 0 && variant.source.startsWith('/media/'), `Invalid responsive image variant: ${id}`);
      try { await access(path.join(root,'public',variant.source)); } catch { errors.push(`Responsive image file missing: ${id}/${variant.width}`); }
    }
  }
}
assert(visibleCases(false).every(item => item.status === 'published'), 'Production must exclude preview and draft cases.');
if (release) {
  assert(site.brandName.trim(), 'Release blocked: approved English brand missing.');
  assert(publicOrigin(site.canonicalOrigin), 'Release blocked: verified public HTTPS origin missing.');
  assert(site.profile.trim(), 'Release blocked: owner-approved company profile missing.');
  assert(site.address.trim(), 'Release blocked: public company location missing.');
  assert(site.contacts.whatsappDigits || site.contacts.email, 'Release blocked: a real primary inquiry channel is required.');
  assert(Object.values(media).every(image => image.source), 'Release blocked: main, workshop and material imagery missing.');
  assert(visibleCases(false).length > 0, 'Release blocked: no approved real cases.');
}
if (errors.length) { errors.forEach(error => console.error(error)); process.exitCode = 1; }
else console.log(`PASS content (${release ? 'production' : 'preview'}): ${materials.length} materials, ${visibleCases().length} visible cases, ${cases.filter(item=>item.status==='preview').length} explicit preview slots, ${slots.length} image slots. Empty contact accounts produce no links.`);
