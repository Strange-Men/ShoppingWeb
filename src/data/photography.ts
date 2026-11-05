import manifest from './photography.json' with { type: 'json' };
import type { MediaSlot, ProductCategoryId } from './types';
export interface PhotoRecord {
  id: string;
  width: number;
  height: number;
  alt: string;
  sourceFile: string;
  sourceSha256: string;
  pdfPage?: number;
  editing: string;
  focalPoint?: string;
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
    credit: 'Owner-supplied Alan assets; website use and built-in image retouching authorized 2026-11-05. Presentation use; not a verified project case study.',
    variants: widths.map(value => ({ source: `/media/${id}-${value}.webp`, width: value })),
    focalPoint: record.focalPoint || '50% 50%',
  };
}
export interface PresentationImage { id: string; category: ProductCategoryId; title: string; image: MediaSlot }
const galleryEntries = [
  { id: 'steel-ribbon', category: 'stainless-steel', title: 'Twisting steel ribbon' },
  { id: 'frp-mosaic', category: 'fiberglass', title: 'Patchwork dolphin' },
  { id: 'bottle-pastel', category: 'bottle-props', title: 'Pastel bottle display' },
  { id: 'steel-wings', category: 'stainless-steel', title: 'Sculptural wings' },
  { id: 'frp-qilin', category: 'fiberglass', title: 'Figurative sculpture' },
  { id: 'bottle-cups', category: 'bottle-props', title: 'Oversized cup props' },
  { id: 'steel-orbits', category: 'stainless-steel', title: 'Polished steel flock' },
  { id: 'frp-woodland', category: 'fiberglass', title: 'Woodland characters' },
  { id: 'bottle-display', category: 'bottle-props', title: 'Bottle and container props' },
  { id: 'steel-leaf', category: 'stainless-steel', title: 'Organic metal forms' },
  { id: 'frp-phoenix', category: 'fiberglass', title: 'Large-scale sculpture' },
  { id: 'steel-ring', category: 'stainless-steel', title: 'Circular forms' },
  { id: 'frp-mascot', category: 'fiberglass', title: 'Character sculpture' },
  { id: 'steel-faceted', category: 'stainless-steel', title: 'Geometric forms' },
  { id: 'frp-letters', category: 'fiberglass', title: 'Dimensional lettering' },
] as const;
export function presentationImages(category?: ProductCategoryId): PresentationImage[] {
  return galleryEntries.filter(item => !category || item.category === category).map(item => ({...item,image:photo(item.id)}));
}
