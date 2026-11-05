import manifest from './photography.json' with { type: 'json' };
import type { MediaSlot, MaterialId } from './types';
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
export interface PresentationImage { id: string; material: MaterialId; title: string; image: MediaSlot }
const galleryEntries = [
  { id: 'steel-wings', material: 'stainless-steel', title: 'Sculptural wings' },
  { id: 'frp-qilin', material: 'fiberglass', title: 'Figurative sculpture' },
  { id: 'steel-leaf', material: 'stainless-steel', title: 'Organic metal forms' },
  { id: 'frp-phoenix', material: 'fiberglass', title: 'Large-scale sculpture' },
  { id: 'steel-ring', material: 'stainless-steel', title: 'Circular forms' },
  { id: 'frp-mascot', material: 'fiberglass', title: 'Character sculpture' },
  { id: 'steel-faceted', material: 'stainless-steel', title: 'Geometric forms' },
  { id: 'frp-letters', material: 'fiberglass', title: 'Dimensional lettering' },
] as const;
export function presentationImages(material?: MaterialId): PresentationImage[] {
  return galleryEntries.filter(item => !material || item.material === material).map(item => ({...item,image:photo(item.id)}));
}
