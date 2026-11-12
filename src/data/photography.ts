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
  product?: { category: ProductCategoryId; title: string };
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
    credit: `Owner-supplied photograph; website use authorized ${record.authorizationDate ?? '2026-11-05'}.`,
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
export interface PresentationImage { id: string; category: ProductCategoryId; title: string; image: MediaSlot }
export function presentationImages(category?: ProductCategoryId): PresentationImage[] {
  return photoRecords.flatMap(({ id, product }) =>
    product && (!category || product.category === category) ? [{ id, ...product, image: photo(id) }] : []
  );
}

export function productPath(item: PresentationImage) {
  return `/en/products/design/${item.id}/`;
}
