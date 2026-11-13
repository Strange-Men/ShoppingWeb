import type { MediaSlot, ProductCategoryId } from './types';
import { photo } from './photography.ts';

// The only switch for a release build. `pnpm build` is a noindex preview by default.
export const isPreview = process.env.SITE_MODE !== 'production';
export const site = {
  companyName: '楠軒雕塑',
  brandName: 'NanXuan', // Owner-confirmed spelling and capitalization.
  legalName: 'Shenzhen Nanxuan Crafts Co., Ltd.',
  legalNameZh: '深圳市楠軒工藝品有限公司',
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
  fiberglass: photo('frp-woodland'),
  'stainless-steel': photo('steel-orbits'),
  'bottle-props': photo('bottle-pastel'),
};
export const materials = [
  { id: 'fiberglass', title: 'Fiberglass / FRP Sculptures', heading: 'Fiberglass / FRP Sculptures', short: 'Fiberglass', description: 'Custom fiberglass sculptures made to your design, dimensions and finish.' },
  { id: 'stainless-steel', title: 'Stainless Steel Sculptures', heading: 'Stainless Steel Sculptures', short: 'Stainless steel', description: 'Custom stainless steel sculpture with forging, assembly, grinding and polishing.' },
] as const;
export const productCategories = [
  ...materials,
  { id: 'bottle-props', title: 'Bottle Props', heading: 'Custom Bottle Props', description: 'Oversized bottle, cup and container props made to your packaging reference.' },
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
  { title: 'Custom Manufacturing', text: 'Share a drawing or reference image. We discuss the form, dimensions and finish for your project.' },
  { title: 'Sculptures and Display Props', text: 'Choose from fiberglass sculptures, stainless steel sculptures and oversized bottle props.' },
  { title: 'Design and Production', text: 'Services include design, 3D modeling, sampling and fabrication.' },
  { title: 'Shipping and Installation Guidance', text: 'Discuss packing, shipping and installation guidance for your project.' },
];
