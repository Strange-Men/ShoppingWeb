import type { MediaSlot } from './types';

// The only switch for a release build. `pnpm build` is a noindex preview by default.
export const isPreview = process.env.SITE_MODE !== 'production';
export const site = {
  companyName: '楠轩雕塑',
  brandName: '', // Owner-approved English brand; intentionally unconfirmed.
  legalName: '',
  canonicalOrigin: '', // Verified public HTTPS origin, without a path.
  profile: '',
  address: '',
  businessHours: '',
  contacts: { whatsappDigits: '', email: '', facebookUrl: '', instagramUrl: '' },
};
export const displayBrand = site.brandName || 'SCULPTURE STUDIO';
export const media: Record<'hero' | 'workshop' | 'fiberglass' | 'stainless-steel', MediaSlot> = {
  hero: { source: null, width: 2000, height: 850, alt: 'Main sculpture photograph awaiting owner-supplied imagery', rights: 'pending', credit: '' },
  workshop: { source: null, width: 1200, height: 1000, alt: 'Workshop photograph awaiting owner-supplied imagery', rights: 'pending', credit: '' },
  fiberglass: { source: null, width: 1200, height: 800, alt: 'Fiberglass sculpture photograph awaiting owner-supplied imagery', rights: 'pending', credit: '' },
  'stainless-steel': { source: null, width: 1200, height: 800, alt: 'Stainless steel sculpture photograph awaiting owner-supplied imagery', rights: 'pending', credit: '' },
};
export const materials = [
  { id: 'fiberglass', title: 'Fiberglass / FRP', short: 'Fiberglass', description: 'Custom fiberglass sculptures, developed around your reference and project requirements.' },
  { id: 'stainless-steel', title: 'Stainless Steel', short: 'Stainless steel', description: 'Custom stainless steel sculptures, with form, scale and finish discussed for each project.' },
] as const;
export const services = [
  { title: 'Your reference', text: 'Begin with a drawing, an image or a project brief. Discuss form, dimensions, quantity and location.' },
  { title: 'Design & 3D modeling', text: 'Develop the design and review the proposed shape and proportions.' },
  { title: 'Sampling', text: 'Discuss whether a sample is needed and agree the scope before production.' },
  { title: 'Production', text: 'Make the sculpture to the agreed design and project requirements.' },
  { title: 'Packing & shipping', text: 'Agree packaging and transport arrangements for the project.' },
  { title: 'Installation guidance', text: 'Discuss site requirements and the installation guidance needed for your sculpture.' },
];
export const capabilities = [
  { number: '01', title: 'Made to your reference', text: 'Bring an image, drawing or concept as the starting point for a custom sculpture.' },
  { number: '02', title: 'Two material directions', text: 'Explore fiberglass / FRP and stainless steel. Discuss material suitability for your setting.' },
  { number: '03', title: 'Design through production', text: 'Coordinate design, 3D modeling, sampling and production within an agreed scope.' },
  { number: '04', title: 'Beyond the workshop', text: 'Plan packaging, shipping and installation guidance as part of the project conversation.' },
];
