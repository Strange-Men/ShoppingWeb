import type { MediaSlot, ProductCategoryId } from './types';
import { photo } from './photography.ts';

// The only switch for a release build. `pnpm build` is a noindex preview by default.
export const isPreview = process.env.SITE_MODE !== 'production';
export const site = {
  companyName: '楠轩雕塑',
  brandName: 'NanXuan', // Owner-confirmed spelling and capitalization.
  legalName: 'Shenzhen Nanxuan Crafts Co., Ltd.',
  legalNameZh: '深圳市楠轩工艺品有限公司',
  foundedYear: 2012,
  workshopAreaSqm: 4000,
  canonicalOrigin: '', // Verified public HTTPS origin, without a path.
  profile: 'Established in 2012, NanXuan creates custom sculptures in fiberglass / FRP and stainless steel. Our company is based in Shenzhen, with a workshop of approximately 4,000 square metres in Zhaoqing, Guangdong, China. We work from reference images and drawings, with services covering design and 3D modeling, sampling, production, packing and shipping, and installation guidance.',
  address: 'Company: Shenzhen · Workshop: Zhaoqing, Guangdong, China',
  businessHours: '',
  contacts: { whatsappDigits: '8613699888635', email: 'shuixingliu416@gmail.com', facebookUrl: '', instagramUrl: '' },
};
export const displayBrand = site.brandName || 'SCULPTURE STUDIO';
export const media: Record<'hero' | 'workshop' | ProductCategoryId, MediaSlot> = {
  hero: photo('hero-waterfront'),
  workshop: photo('workshop-cnc'),
  fiberglass: photo('frp-qilin'),
  'stainless-steel': photo('steel-wings'),
  'bottle-props': photo('bottle-pastel'),
};
export const materials = [
  { id: 'fiberglass', title: 'Fiberglass / FRP', heading: 'Fiberglass / FRP Sculptures', short: 'Fiberglass', description: 'Custom fiberglass sculptures, developed around your reference and project requirements.' },
  { id: 'stainless-steel', title: 'Stainless Steel', heading: 'Stainless Steel Sculptures', short: 'Stainless steel', description: 'Custom stainless steel sculpture through forging, assembly, grinding and polishing. Form, scale and finish are discussed for each project.' },
] as const;
export const productCategories = [
  ...materials,
  { id: 'bottle-props', title: 'Bottle Props', heading: 'Custom Bottle Props', description: 'Oversized bottle, cup and container props for displays and events. Share the packaging reference, dimensions and finish you have in mind.' },
] as const;
export const companyFacts = [
  { value: '2012', label: 'Established' },
  { value: '≈ 4,000 m²', label: 'Workshop area' },
  { value: 'Shenzhen', label: 'Company location' },
  { value: 'Zhaoqing', label: 'Workshop location' },
];
export const materialProcesses = [
  { material: 'Fiberglass / FRP', title: 'From model to finished form', text: 'Model-making and molding establish the shape, followed by finishing and painting. Design, dimensions and finish are agreed for your brief.' },
  { material: 'Stainless steel', title: 'Shape. Join. Refine.', text: 'Forging, assembly, grinding and polishing turn the agreed form into a finished sculpture. Material grade, surface finish and installation requirements are discussed individually.' },
];
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
  { number: '02', title: 'Sculptures and display props', text: 'Explore fiberglass / FRP sculptures, stainless steel sculptures and custom bottle props.' },
  { number: '03', title: 'Design through production', text: 'Coordinate design, 3D modeling, sampling and production within an agreed scope.' },
  { number: '04', title: 'Beyond the workshop', text: 'Plan packaging, shipping and installation guidance as part of the project conversation.' },
];
