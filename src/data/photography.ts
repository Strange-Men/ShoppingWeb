import manifest from './photography.json' with { type: 'json' };
import type { MediaSlot, ProductCategoryId } from './types';
export interface PhotoRecord {
  id: string;
  width: number;
  height: number;
  alt: string;
  sourceFile?: string;
  sourceSha256?: string;
  pdfPage?: number;
  editing: string;
  focalPoint?: string;
  authorizationDate?: string;
  kind?: 'concept';
}
export const photoRecords = manifest as PhotoRecord[];
export function photo(id: string): MediaSlot {
  const record = photoRecords.find(item => item.id === id);
  if (!record) throw new Error(`Missing approved image: ${id}`);
  const widths = [...new Set([480, 800, 1200, 1600].map(width => Math.min(width, record.width)))];
  const width = Math.max(...widths);
  return {
    source: `/media/${id}-${width}.webp`, width,
    height: Math.round(record.height * width / record.width),
    alt: record.alt, rights: 'licensed',
    credit: record.kind === 'concept'
      ? 'AI-generated design concept based on NanXuan product categories.'
      : `Owner-supplied photograph; website use and built-in image retouching authorized ${record.authorizationDate ?? '2026-11-05'}.`,
    variants: widths.map(value => ({ source: `/media/${id}-${value}.webp`, width: value })),
    focalPoint: record.focalPoint || '50% 50%',
  };
}

const workshopEntries = [
  { id: 'workshop-steel-rings', title: 'Polished Steel Rings', caption: 'Mirror-polished rings on their supports in the fabrication area.' },
  { id: 'workshop-metalwork', title: 'Metalwork in Progress', caption: 'Craftspeople shape metal sections beside templates and workbenches.' },
  { id: 'workshop-sculpture-assembly', title: 'Large Sculpture Assembly', caption: 'The team works on a tall stainless steel figure in the workshop.' },
  { id: 'workshop-ring-fitting', title: 'Fitting an Illuminated Ring', caption: 'A workshop view of the circular sculpture with its lighting switched on.' },
  { id: 'workshop-display-props', title: 'Oversized Display Props', caption: 'Ice cream display props lined up alongside colorful figures.' },
];

export function workshopPhotos() {
  return workshopEntries.map(entry => ({ ...entry, image: photo(entry.id) }));
}
export interface PresentationImage { id: string; category: ProductCategoryId; title: string; image: MediaSlot; concept: boolean }
const galleryEntries = [
  { id: 'concept-steel-wave', category: 'stainless-steel', title: 'Brushed Stainless Steel Wave Sculpture' },
  { id: 'concept-frp-crane', category: 'fiberglass', title: 'Fiberglass Crane Sculpture' },
  { id: 'concept-bottle-perfume', category: 'bottle-props', title: 'Oversized Perfume Bottle Prop' },
  { id: 'concept-steel-lattice', category: 'stainless-steel', title: 'Open Lattice Stainless Steel Sculpture' },
  { id: 'concept-frp-manta', category: 'fiberglass', title: 'Fiberglass Manta Ray Sculpture' },
  { id: 'concept-bottle-pump', category: 'bottle-props', title: 'Oversized Pump Bottle Prop' },
  { id: 'concept-steel-cover', category: 'stainless-steel', title: 'Folded Stainless Steel Sculpture' },
  { id: 'concept-frp-cover', category: 'fiberglass', title: 'Geometric Fiberglass Hare Sculpture' },
  { id: 'concept-bottle-cover', category: 'bottle-props', title: 'Oversized Bottle Display Props' },
] as const;
export function presentationImages(category?: ProductCategoryId): PresentationImage[] {
  return galleryEntries.filter(item => !category || item.category === category).map(item => ({
    ...item,
    image: photo(item.id),
    concept: photoRecords.find(record => record.id === item.id)?.kind === 'concept',
  }));
}

export function productPath(item: PresentationImage) {
  return `/en/products/design/${item.id}/`;
}
