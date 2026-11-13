import assert from 'node:assert/strict';
import { inquiryLinks, publicOrigin, socialUrl } from '../src/lib/inquiry.ts';
import { visibleCases } from '../src/data/cases.ts';
const empty = { whatsappDigits:'', email:'', facebookUrl:'', instagramUrl:'' };
assert.deepEqual(inquiryLinks(empty,''),{whatsapp:null,email:null,emailWeb:null});
// Synthetic data stays in assertions; no requests or messages are sent.
const configured = {...empty,whatsappDigits:'12025550123',email:'qa@example.com'};
const title = 'A&B / sculpture? #01 中文';
const links = inquiryLinks(configured,'https://studio.example.org',title,'/en/products/fiberglass/case-01/');
assert.equal(new URL(links.whatsapp).searchParams.get('text').split('\n')[0],`Hello, I would like to discuss: ${title}.`);
assert.equal(new URL(links.email).searchParams.get('subject'),title);
for (const chinese of [false, true]) {
  const localized = inquiryLinks(configured, '', chinese ? undefined : title, '/en/contact/', chinese);
  const mailApp = new URL(localized.email);
  const gmail = new URL(localized.emailWeb);
  assert.equal(gmail.origin + gmail.pathname, 'https://mail.google.com/mail/');
  assert.equal(gmail.searchParams.get('view'), 'cm');
  assert.equal(gmail.searchParams.get('to'), configured.email);
  assert.equal(gmail.searchParams.get('su'), chinese ? '客製雕塑詢價' : title);
  assert.equal(gmail.searchParams.get('body'), mailApp.searchParams.get('body'));
}
for (const origin of ['', 'http://localhost:4321', 'https://localhost', 'https://example.com', 'https://example.org', 'https://127.0.0.1']) {
  assert.equal(publicOrigin(origin),null);
  assert(!new URL(inquiryLinks(configured,origin,title).whatsapp).searchParams.get('text').includes('Reference:'));
}
assert.equal(publicOrigin('https://sculpture.studio'), 'https://sculpture.studio');
assert.match(new URL(inquiryLinks(configured,'https://sculpture.studio',title,'/en/a/').email).searchParams.get('body'),/Reference: https:\/\/sculpture.studio\/en\/a\//);
assert.equal(socialUrl('javascript:alert(1)','facebook'),null);
assert.equal(socialUrl('https://facebook.com.bad.test/account','facebook'),null);
assert.equal(socialUrl('https://www.instagram.com/studio','instagram'),'https://www.instagram.com/studio');
assert.equal(visibleCases(false).some(item=>item.status==='preview'),false);
console.log('PASS inquiry assertions: absent accounts, URL/subject/message encoding, missing/placeholder origins, social host validation and preview exclusion. No external messages sent.');
